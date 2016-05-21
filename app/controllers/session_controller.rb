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
    # attempt to log in with username and password
    user = User.where(:username => { :$regex => /^#{params[:usernameEmail]}$/i },
                      :password => params[:password]).first

    # if that failed, attempt to log in with email and password
    user ||= User.where(:email => { :$regex => /^#{params[:usernameEmail]}$/i },
                      :password => params[:password]).first

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
