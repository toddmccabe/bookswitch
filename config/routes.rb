Rails.application.routes.draw do
  scope '/api', defaults: { format: :json } do
    post 'user/confirm',                to: 'user#confirm'
    get  'user/notifications',          to: 'user#notifications'

    get  'user/password_reset_request(/:usernameEmail)',
      to: 'user#password_reset_request',
      # allow @ and . characters in optional email address
      constraints: { usernameEmail: /[^\/]+/ }

    post 'user/password_reset_update',  to: 'user#password_reset_update'
    get  'metadata',                    to: 'metadata#show'
    get  'image/:id',                   to: 'image#show'

    resources :user,
              :book,
              :session,
              :conversation
  end
end
