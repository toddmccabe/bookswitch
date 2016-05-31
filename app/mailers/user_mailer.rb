class UserMailer < ApplicationMailer
  def confirmation(user)
    @user = user
    
    mail(to: @user.email, subject: 'Please confirm your account')
  end

  def new_message(user, message, book)
    @user = user
    @message = message
    @book = book

    mail(to: @user.email, subject: 'You have a new message')
  end
end
