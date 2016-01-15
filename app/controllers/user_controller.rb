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
    render json: User.find_by_username(params[:id]).as_json(:only => [:username])
  end

  private

  def private_params
    params.permit(User.column_names)
  end
end
