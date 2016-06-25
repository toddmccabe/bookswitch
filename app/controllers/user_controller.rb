class UserController < ApplicationController
  def create
    user = User.new(private_params(User))

    if user.save
      UserMailer.confirmation(user.email, user.authentication_token).deliver_later
    else
      render json: {errors: user.errors}, status: 418
    end
  end

  def confirm
    user = User.find_by_authentication_token(params[:authentication_token])

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
    elsif user.authentication_token === params[:authentication_token]
      render json: user.as_json(:only => [:username, :email])
    else
      render json: user.as_json(:only => [:username])
    end
  end

  def update
    user = User.find_by_username_and_authentication_token(params[:id], params[:authentication_token])

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
    user = User.find_from_authentication_token(params)

    if !user
      head 418
      return
    end

    render json: {
      unread_conversations: user.unread_conversations.count
    }
  end

  # request a new password
  def password_reset_request
    if !params[:usernameEmail]
      render json: {errors: 'Your username or email can\'t be blank'}, status: 418
      return
    end

    # find user by username
    user = User.find_from_any_case_username(params[:usernameEmail])
    # or, find user by email
    user ||= User.find_from_any_case_email(params[:usernameEmail])

    if user
      user.generate_token!(:password_reset_token)
      user.save

      UserMailer.password_reset(user.email, user.password_reset_token).deliver_later
    end

    # return success even if username or email are invalid
    head 200
  end

  # set new password
  def password_reset_update
    user = User.find_by_password_reset_token(params[:password_reset_token])

    if !user
      head 401
      return
    end

    user.password = params[:password]

    if user.valid?
      user.encrypt_password!
      # generate a new password reset token to invalidate the old one
      user.generate_token!(:password_reset_token)
      user.save

      head 200
    else
      render json: {errors: user.errors}, status: 418
    end
  end
end
