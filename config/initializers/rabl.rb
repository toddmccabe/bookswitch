require 'rabl'

Rabl.configure do |config|
  config.include_json_root = false
  config.raise_on_missing_attribute = true
end
