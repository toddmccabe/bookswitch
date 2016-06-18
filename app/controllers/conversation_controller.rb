class ConversationController < ApplicationController
  def index
    page = (params[:page].try :to_i) || 1
    user = User.find_from_token(params)

    if !user
      render json: {errors: 'Unable to retrieve conversations. Please make sure you are logged in.'}, status: 404
      return
    end

    conversations = user.conversations
    # preserve total number of conversations before we paginate
    total_count = conversations.count

    # sort by updated at, and reverse to show newest to oldest
    conversations.sort_by!(&:updated_at).reverse!

    # apply page number and limit
    start = (page - 1) * Rails.configuration.x.results_per_page
    conversations = conversations[start, Rails.configuration.x.results_per_page]

    render json: {
      conversations: conversations.as_json(methods: [:most_recent_message, :usernames]),
      total_count: total_count
    }
  end

  def create
    sender = User.find_from_token(params)
    recipient = User.find_by_username(params[:toUsername])
    book = Book.find(params[:bookId])
    
    message = Message.new(body: params[:messageBody], recipient_id: recipient.id)
    conversation = Conversation.new(users: [sender, recipient])

    message.conversation = conversation
    conversation.books << book if book

    conversation.messages << message

    if message.valid? && conversation.valid?
      message.save
      conversation.save

      render json: {id: conversation.id}
    else
      render json: {errors: !message.valid? ? message.errors : conversation.errors }, status: 418
    end
  end

  def update
    conversation = Conversation.find(params[:id])
    sender = User.find_from_token(params)
    recipient = conversation.other_user(sender)

    conversation.authenticate(sender)

    if !recipient.active
      head 418
      return
    end

    message = Message.new(body: params[:messageBody], recipient_id: recipient.id, conversation: conversation)

    conversation.messages << message

    if message.valid? && conversation.valid?
      message.save
      conversation.save

      render json: {id: conversation.id}
    else
      render json: {errors: !message.valid? ? message.errors : conversation.errors }, status: 418
    end
  end

  def show
    @conversation = Conversation.find(params[:id])
    user = User.find_from_token(params)

    # check if conversation exists
    if !@conversation
      render json: {errors: 'Unable to retrieve conversation. Please make sure you are logged in.'}, status: 404
      return
    end

    # ensure user is present in conversation.users
    # todo: fix this
    @conversation.authenticate(user)

    # mark the conversation messages as read for user
    @conversation.mark_messages_as_read!(user)

    # show messages from oldest -> newest
    @conversation.messages.sort_by!(&:created_at)

    render
  end
end
