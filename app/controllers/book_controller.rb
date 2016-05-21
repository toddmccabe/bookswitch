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

    # capitalize the first letter of title and author
    # these should always be capitalized but it fixes
    # mongodb's inability to sort case-insensitive
    [:title, :author].each do |param|
      if !book[param].blank?
        book[param][0] = book[param][0].capitalize
      end
    end

    book.user = User.find_by_token(params[:token])

    if book.save
      render json: book
    else
      render json: {errors: book.errors}, status: 418
    end
  end

  def show
    book = Book.find_by_id(params[:id])
    # replace database identifier with actual username
    book.user_id = book.user.username

    render json: book
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
