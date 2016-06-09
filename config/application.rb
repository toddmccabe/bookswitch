require File.expand_path('../boot', __FILE__)

require "rails"
require "active_model/railtie"
require "active_job/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "sprockets/railtie"
require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module BookSwitch
  class Application < Rails::Application
    config.autoload_paths += %W(#{config.root}/lib)

    config.generators do |g|
      g.orm :mongo_mapper
    end

    # number of results to return
    config.x.results_per_page = 10
  end
end
