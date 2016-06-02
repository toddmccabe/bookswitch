class ImageController < ApplicationController
  def show
    image = Image.find(params[:id])

    if image
      send_data image.data, :type => 'image/jpeg', :disposition => 'inline'
    else
      head 404
    end
  end
end
