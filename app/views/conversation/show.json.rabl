object @conversation

attributes :id, :usernames

child :messages, :object_root => false do
  attributes :created_at, :body, :sender_username
end

code :book do
  {id: @conversation.book_ids.last}
end
