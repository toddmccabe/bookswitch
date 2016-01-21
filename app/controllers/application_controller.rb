class ApplicationController < ActionController::API
  private

  def private_params(_class)
    params.permit(_class.column_names)
  end
end
