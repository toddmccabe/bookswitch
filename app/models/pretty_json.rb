# https://gist.github.com/jmoe/3418205
class PrettyJson
  def self.dump(object)
    JSON.pretty_generate(object, {:indent => "  "})
  end
end
