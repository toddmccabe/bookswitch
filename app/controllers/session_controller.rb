class SessionController < ApplicationController
  # validate a session
  def show
    if User.find_by_username_and_token(params[:username], params[:id])
      head 200
    else
      head 401
    end
  end

  def create
    # find user by username
    user = User.where(:username => { :$regex => /^#{params[:usernameEmail]}$/i }).first
    # or, find user by email
    user ||= User.where(:email => { :$regex => /^#{params[:usernameEmail]}$/i }).first

    # if user exists, and password matches encrypted submitted password
    if user && user.password == Digest::SHA2.hexdigest(user.salt + params[:password])
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
