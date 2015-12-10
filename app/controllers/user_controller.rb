class UserController < ApplicationController
  # def index
  #   render json: User.all.as_json(:only => [:id])
  # end

  def show
    render json: User.find_by_id(params[:id]).as_json(:only => [:id])
  end
end