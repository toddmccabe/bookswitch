class Conversation
  include MongoMapper::Document

  key :book_ids, Array
  key :user_ids, Array

  many :messages
  many :books, :in => :book_ids
  many :users, :in => :user_ids

  attr_accessible :messages,
                  :books,
                  :users

  validate :two_users_present
  validates :messages, :presence => true

  timestamps!

  after_save :associate_with_users!,
             :notify_recipient,
             :add_to_recipient_unread_conversations

  # this is used as a conversation preview
  # include only relevant properties
  def most_recent_message
    # todo: find non-as_json way to including the results of methods
    messages.last.as_json(only: [:created_at, :body, :read], methods: :sender_username)
  end

  # mark all messages in the conversation as read if user is the recipient
  def mark_messages_as_read!(user)
    unread_messages = false

    messages.where(:read => false, :recipient_id => user.id.to_s).each do |message|
      if !message.read
        message.read = true
        message.save

        unread_messages = true
      end
    end

    if unread_messages
      user.update_unread_conversations('remove', id)
    end
  end

  def usernames
    users.collect.each do |user|
      user.username
    end
  end

  # find the other person in the conversation
  def other_user(me)
    users.first == me ? users.last : users.first
  end

  # if the user isn't part of the conversation, return error
  def authenticate(user)
    if !users.include?(user)
      # todo: don't render from a model. fix this
      render json: {errors: 'Unable to access conversation. Please make sure you are logged in.'}
    end
  end

  private

  def associate_with_users!
    users.each do |user|
      user.conversations << self
      user.save
    end
  end

  def two_users_present
    if users.count != 2
      errors.add(:recipient, 'can\'t be blank')
    end
  end

  def notify_recipient
    message = messages.last
    book = message.conversation.books.last
    book_title = book ? book.title : nil

    if message.recipient.active
      UserMailer.new_message(
        message.recipient.email,
        message.sender_username,
        message.body,
        book_title,
        message.conversation.id.to_s
      ).deliver_later
    end
  end

  def add_to_recipient_unread_conversations
    recipient = messages.last.recipient
    recipient.update_unread_conversations('add', id)
  end
end
