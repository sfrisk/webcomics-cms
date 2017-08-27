var metalsmith = require('metalsmith'),
markdown = require('metalsmith-markdown'),
layouts = require('metalsmith-layouts'),
handlebars = require('handlebars'),
permalinks = require('metalsmith-permalinks'),
collections = require('metalsmith-collections'),
serve = require('metalsmith-serve'),
watch = require('metalsmith-watch');

metalsmith(__dirname)
  .metadata({
    site: {
      name: 'Webcomic CMS',
      description: "a cms for webcomics"
    }
  })
  .source('./src')
  .destination('./build')
  .use(markdown())
  .use(permalinks({
    relative: false,
    pattern: ':title',
  }))
  .use(layouts({
    engine: 'handlebars',
    directory: './layouts',
    default: 'page.html',
    pattern: ["*/*/*html","*/*html","*html"],
    partials: {
      header: 'partials/header',
      footer: 'partials/footer'
    }
  }))
  .use(collections({
    posts: {
      pattern: 'posts/**/*.md',
      sortBy: 'date',
      reverse: true
    },
    comics: {
      pattern: 'comics/**/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(serve({
    port: 8080,
    verbose: true
  }))
  .use(watch({
    paths: {
      "${source}/**/*": true,
      "layout/**/*": "**/*",
    }
  }))
  .build(function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Webcomic CMS built!');
    }
  });