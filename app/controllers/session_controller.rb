class SessionController < ApplicationController
  def create
    user = User.find_by_username_and_password(params[:usernameEmail], params[:password])
    user ||= User.find_by_email_and_password(params[:usernameEmail], params[:password])

    if user
      # reactivate account on login
      if !user.active
        user.active = true
        user.save
      end

      if user.confirmed
        render json: user.as_json(:only => [:username, :token])
      else
        render json: {error: "Your account has not been confirmed. Please check your email."}, status: 401
      end
    else
      render json: {error: "Login failed. Please check your credentials."}, status: 401
    end
  end

  def destroy
    user = User.find_by_token(params[:id])

    if user
      user.generate_token!
      user.save
    end
  end
end
