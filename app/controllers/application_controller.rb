class ApplicationController < ActionController::API
  private

  # mongodb saves everything, remove any non-class defined attributes
  def private_params(_class)
    params.permit(_class.column_names)
  end
end
