class UserController < ApplicationController
  def create
    user = User.new(private_params)

    if user.save
      UserMailer.confirmation(user).deliver_now
    else
      render json: {errors: user.errors}, status: 418
    end
  end

  def confirm
    user = User.find_by_token(params[:token])

    if user
      user.active = true
      user.save
    else
      head 401
    end
  end

  def show
    user = User.find_by_username(params[:id])

    if user.token === params[:token]
      render json: user.as_json(:only => [:username, :email])
    else
      render json: user.as_json(:only => [:username])
    end
  end

  def update
    user = User.find_by_username_and_token(params[:id], params[:token])

    if user
      user.attributes = private_params

      if user.save
        head 200
      else
        render json: {errors: user.errors}, status: 418
      end
    else
      head 401
    end
  end

  private

  def private_params
    params.permit(User.column_names)
  end
end
