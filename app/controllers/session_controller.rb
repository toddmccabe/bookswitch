class SessionController < ApplicationController
  # validate a session
  def show
    if User.find_by_username_and_authentication_token(params[:username], params[:id])
      head 200
    else
      head 401
    end
  end

  def create
    # find user by username
    user = User.find_from_any_case_username(params[:usernameEmail])
    # or, find user by email
    user ||= User.find_from_any_case_email(params[:usernameEmail])

    # if user exists, and password matches encrypted submitted password
    if user && user.password == Digest::SHA2.hexdigest(user.salt + params[:password])
      # reactivate account on login
      if !user.active
        user.active = true
        user.save
      end

      if user.confirmed
        render json: user.as_json(:only => [:username, :authentication_token])
      else
        render json: {error: "Your account has not been confirmed. Please check your email."}, status: 401
      end
    else
      render json: {error: "Login failed. Please check your credentials."}, status: 401
    end
  end

  def destroy
    user = User.find_by_username_and_authentication_token(params[:username], params[:id])

    if user
      user.generate_token!(:authentication_token)
      user.save
    end
  end
end
