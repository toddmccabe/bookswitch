Rails.application.routes.draw do
  scope '/api', defaults: { format: :json } do
    post 'user/confirm',       to: 'user#confirm'
    get  'user/notifications', to: 'user#notifications'
    get  'metadata',           to: 'metadata#show'
    get  'image/:id',          to: 'image#show'

    resources :user,
              :book,
              :session,
              :conversation
  end
end
