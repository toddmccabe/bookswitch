class BookController < ApplicationController
  def index
    render json: Book.all
  end

  def show
    render json: Book.find_by_id(params[:id])
  end
end