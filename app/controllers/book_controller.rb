class BookController < ApplicationController
  def index
    sort = params[:sort]
    query = params[:query]
    username = params[:username]
    direction = params[:direction] || 'asc'
    page = params[:page] ? params[:page].to_i : 1

    # query user's books
    if username
      user = User.find_from_any_case_username(username)

      if !user || !user.active
        head 404
        return
      end

      books = user.books
    else
      # query all books
      if query
        queryRegEx = Regexp.new(Regexp.escape(query), true);

        books = Book.where({
          :active => true,
          :$or => [
            {:title   => queryRegEx},
            {:author  => queryRegEx},
            {:isbn10  => queryRegEx},
            {:isbn13  => queryRegEx},
            {:upc     => queryRegEx},
          ]
        })
      else
        books = Book.where({:active => true})
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
    book = Book.new(book_params)
    book.user = User.find_from_authentication_token(params)

    if book.save
      render json: {id: book.id}
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
    user = User.find_from_authentication_token(params)

    if !user || user != book.user
      head 401
      return
    end

    book.attributes = book_params

    if book.save
      head 200
    else
      render json: {errors: book.errors}, status: 418
    end
  end

  def destroy
    book = Book.find(params[:id])
    user = User.find_from_authentication_token(params)

    if !user || user != book.user
      head 401
      return
    end

    book.delete
  end

  private

  def book_params
    params.permit(
      :title,
      :author,
      :price,
      :image,
      :isbn10,
      :isbn13,
      :upc
    )
  end
end
