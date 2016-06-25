class User
  include MongoMapper::Document
  include ActiveModel::Validations

  key :email,                 String
  key :username,              String,   :required => true
  key :password,              String,   :required => true
  key :authentication_token,  String,   :unique => true
  key :password_reset_token,  String,   :unique => true
  # active used for indefinitely closing an account
  key :active,                Boolean,  :default => true
  # confirmed determines if the user has clicked the link sent to them after signing up
  key :confirmed,             Boolean,  :default => false
  key :message_ids,           Array
  key :conversation_ids,      Array
  key :salt,                  String
  key :unread_conversations,  Array

  validates :email, :presence => true, :email => true
  validates_uniqueness_of :email, :case_sensitive => false
  validates_uniqueness_of :username, :case_sensitive => false

  many :books
  many :messages, :in => :message_ids
  many :conversations, :in => :conversation_ids

  attr_accessible :email,
                  :username,
                  :password,
                  :active

  before_create do
    encrypt_password!

    # generate tokens now as they must be unique to be saved
    generate_token!(:authentication_token)
    generate_token!(:password_reset_token)
  end

  # automatically activate/deactivate user's books
  def active=(value)
    value == true ? books.each(&:activate!) : books.each(&:deactivate!)
    super
  end

  def self.find_from_authentication_token(params)
    User.find_by_username_and_authentication_token(params[:username], params[:authentication_token])
  end

  def self.find_from_any_case_username(username)
    User.where(:username => { :$regex => /^#{username}$/i }).first
  end

  def self.find_from_any_case_email(email)
    User.where(:email => { :$regex => /^#{email}$/i }).first
  end

  def encrypt_password!
    self.salt = SecureRandom.base64(8)
    self.password = Digest::SHA2.hexdigest(self.salt + self.password)
  end

  def generate_token!(column)
    begin
      self[column] = Digest::SHA1.hexdigest([Time.now, rand].join)
    end while User.exists?(column => self[column])
  end

  def update_unread_conversations(action, conversation_id)
    # convert BSON ID to string for array keys
    conversation_id = conversation_id.to_s

    if action == 'remove'
      self.unread_conversations -= [conversation_id]
    end

    if action == 'add'
      # if the conversation_id isn't already present in unread_conversations[]
      if unread_conversations.index(conversation_id) == nil
        self.unread_conversations.push(conversation_id)
      end
    end

    save
  end
end
