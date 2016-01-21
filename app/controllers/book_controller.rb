class BookController < ApplicationController
  def index
    render json: Book.all
  end

  def create
    book = Book.new(private_params(Book))
    book.user = User.find_by_token(params[:token])

    if book.save
      render json: book
    else
      render json: {errors: book.errors}, status: 418
    end
  end

  def show
    render json: Book.find_by_id(params[:id])
  end
end
