# My Marriage - Static Sites with Ruby on Heroku/Cedar
# using a [Rack](http://rack.rubyforge.org/) app.

Your folder should be organized like this:

```
- MySite
  |- config.ru
  |- Gemfile
  |- public
    |- index.html
    |- images
    |- js
    |- css
```

In `Gemfile` file add the following:

```ruby
source :rubygems

gem 'rack'
```

You should use [bundler](https://devcenter.heroku.com/articles/bundler) to generate the `Gemfile.lock` file:

```
GEM
  remote: http://rubygems.org/
  specs:
    rack (1.4.1)

PLATFORMS
  ruby

DEPENDENCIES
  rack
```

In `config.ru` file add the following:

```ruby
use Rack::Static,
  :urls => ["/images", "/js", "css"],
  :root => "public"

run lambda { |env|
  [
    200,
    {
      'Content-Type'  => 'text/html',
      'Cache-Control' => 'public, max-age=86400'
    },
    File.open('public/index.html', File::RDONLY)
  ]
}
```

This assumes that your template uses relative references to the images and stylesheets. Go ahead and deploy the app. If you are not sure how to deploy to Heroku check out the [quickstart guide](https://devcenter.heroku.com/articles/quickstart).

And there you go, a static site being served on Heroku completely cached and easily served using a single [dyno](https://devcenter.heroku.com/articles/dynos).


run the server:
$ rackup