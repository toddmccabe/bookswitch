class BookController < ApplicationController
  def index
    sort = params[:sort]
    query = params[:query]
    username = params[:username]
    direction = params[:direction] || 'asc'
    page = params[:page] ? params[:page].to_i : 1

    if username
      user = User.find_from_any_case_username(username)
      if user && user.active
        books = user.books
      else
        head 404
        return
      end
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
    if page > 1
      books = books.offset((page - 1) * Rails.configuration.x.results_per_page)
    end

    # apply sort and direction (asc/desc), with created_at being default
    # note: mongodb doesn't allow case insensitive sorting
    if Book.column_names.include?(sort)
      books = books.sort(sort.to_sym.instance_eval(direction))
    else
      books = books.sort(:created_at.desc)
    end

    # limit to X books per page
    books = books.limit(Rails.configuration.x.results_per_page)

    render json: {
      books: books.as_json(methods: :username),
      total_count: books.count
    }
  end

  def create
    book = Book.new(private_params(Book))
    book.user = User.find_from_token(params)

    if book.save
      render json: book
    else
      render json: {errors: book.errors}, status: 418
    end
  end

  def show
    book = Book.find(params[:id])

    if book && book.user.active
      render json: book.as_json(methods: :username)
    else
      render json: {errors: 'We were unable to find that book.'}, status: 404
    end
  end

  def update
    book = Book.find(params[:id])
    user = User.find_from_token(params)

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
    book = Book.find(params[:id])
    user = User.find_from_token(params)

    if book && user && book.user == user
      book.delete
      
      head 200
    else
      head 401
    end
  end
end
