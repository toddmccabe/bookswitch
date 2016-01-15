Rails.application.routes.draw do
  scope '/api', defaults: { format: :json } do
    post 'user/confirm', to: 'user#confirm'

    resources :user, :book, :session
  end
end
