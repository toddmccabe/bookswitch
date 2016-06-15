class UserController < ApplicationController
  def create
    user = User.new(private_params(User))

    if user.save
      UserMailer.confirmation(user.email, user.token).deliver_later
    else
      render json: {errors: user.errors}, status: 418
    end
  end

  def confirm
    user = User.find_by_token(params[:token])

    if user
      user.confirmed = true
      user.save
    else
      head 401
    end
  end

  def show
    user = User.find_from_any_case_username(params[:id])

    if !user || !user.active
      head 404
    elsif user.token === params[:token]
      render json: user.as_json(:only => [:username, :email])
    else
      render json: user.as_json(:only => [:username])
    end
  end

  def update
    user = User.find_by_username_and_token(params[:id], params[:token])

    if user
      user.attributes = private_params(User)

      # if they submitted a new password, encrypt it
      if params[:password]
        user.encrypt_password!
      end

      if user.save
        head 200
      else
        render json: {errors: user.errors}, status: 418
      end
    else
      head 401
    end
  end

  def notifications
    user = User.find_from_token(params)

    if !user
      head 418
      return
    end

    render json: {
      unread_conversations: user.unread_conversations.count
    }
  end
end
