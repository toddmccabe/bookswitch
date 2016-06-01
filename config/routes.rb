Rails.application.routes.draw do
  scope '/api', defaults: { format: :json } do
    post 'user/confirm', to: 'user#confirm'
    get 'metadata', to: 'metadata#show'

    resources :user, :book, :session, :conversation
  end
end
