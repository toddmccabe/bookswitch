class Message
  include MongoMapper::Document

  key :body
  key :recipient_id, String,  :required => true
  key :read,         Boolean, :default => false

  belongs_to :conversation

  attr_accessible :body, :recipient_id, :conversation

  validate :body_not_blank
  validates :conversation, :presence => true

  after_create :associate_with_recipient!

  timestamps!

  def sender
    sender = nil

    conversation.users.each do |user|
      if user.id.to_s != recipient_id
        sender = user
      end
    end

    sender
  end

  def sender_username
    sender.username
  end

  def recipient
    User.find(recipient_id)
  end

  private

  def associate_with_recipient!
    recipient.messages << self
    recipient.save
  end

  def body_not_blank
    if body.blank?
      errors.add(:message, 'can\'t be blank')
    end
  end
end
