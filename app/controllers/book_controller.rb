class BookController < ApplicationController
  def index
    query = params[:query]
    username = params[:username]
    page = params[:page] ? params[:page].to_i : 1
    sort = params[:sort]
    direction = params[:direction] || 'asc'

    if username && user = User.find_by_username(username)
      books = user.books
    else
      # find books that match query
      if query
        queryRegEx = Regexp.new(Regexp.escape(query), true);

        books = Book.where(:$or => [{:title => queryRegEx}, {:author => queryRegEx}, {:isbn => queryRegEx}])
      else
        books = Book.where()
      end
    end

    # apply page number
    if page > 0
      books = books.offset((page - 1) * Rails.configuration.x.results_per_page)
    end

    # apply sort and direction (asc/desc), with title being default
    # note: mongodb doesn't allow case insensitive sorting
    books = books.sort((Book.column_names.include?(sort) ? sort : :title).to_sym.instance_eval(direction))

    # limit to X books per page
    books = books.limit(Rails.configuration.x.results_per_page)

    render json: {books: books, total_count: books.count}
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
    book = Book.find_by_id(params[:id])

    if book
      # replace database identifier with username for user friendly urls
      book.user_id = book.user.username

      render json: book
    else
      render json: {errors: 'We were unable to find that book.'}, status: 404
    end
  end

  def update
    book = Book.find_by_id(params[:id])
    user = User.find_by_username_and_token(params[:username], params[:token])

    if book && user && book.user == user
      book.attributes = private_params(Book)

      if book.save
        head 200
      else
        render json: {errors: book.errors}, status: 418
      end
    else
      head 401
    end
  end

  def destroy
    book = Book.find_by_id(params[:id])
    user = User.find_by_username_and_token(params[:username], params[:token])

    if book && user && book.user == user
      book.delete
      
      head 200
    else
      head 401
    end
  end
end
