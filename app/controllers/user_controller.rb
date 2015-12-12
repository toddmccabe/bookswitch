class UserController < ApplicationController
  def show
    render json: User.find_by_username(params[:id]).as_json(:only => [:username])
  end
end