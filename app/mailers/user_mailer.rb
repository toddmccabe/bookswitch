class UserMailer < ApplicationMailer
  def confirmation(to, authentication_token)
    @authentication_token = authentication_token
    
    mail(to: to, subject: 'Please confirm your account')
  end

  def new_message(to, from_username, message_body, book_title, conversation_id)
    @message_body = message_body
    @book_title = book_title
    @conversation_id = conversation_id

    mail(to: to, subject: "You have a new message from #{from_username}")
  end

  def password_reset(to, password_reset_token)
    @password_reset_token = password_reset_token

    mail(to: to, subject: 'Password reset requested')
  end
end
