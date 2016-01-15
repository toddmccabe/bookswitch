class SessionController < ApplicationController
  def create
    user = User.find_by_username_and_password(params[:usernameEmail], params[:password])
    user ||= User.find_by_email_and_password(params[:usernameEmail], params[:password])

    if user
      render json: user.as_json(:only => [:username, :token])
    else
      head 401
    end
  end
end
