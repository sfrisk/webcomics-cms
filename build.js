var metalsmith = require('metalsmith'),
markdown = require('metalsmith-markdown'),
layouts = require('metalsmith-layouts'),
handlebars = require('handlebars'),
permalinks = require('metalsmith-permalinks'),
collections = require('metalsmith-collections'),
serve = require('metalsmith-serve'),
watch = require('metalsmith-watch');

handlebars.registerHelper('moment', require('helper-moment'));

metalsmith(__dirname)
  .metadata({
    site: {
      name: 'Webcomic CMS',
      description: "a cms for webcomics"
    }
  })
  .source('./src')
  .destination('./build')
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
    },
    pages: {
      pattern: 'pages/**/*.md'
    }
  }))
  .use(markdown())
  .use(permalinks({
    pattern: ':title',
    relative: false,
    linksets: [
      {
        match: { collection: 'posts' },
        pattern: 'posts/:title'
      },
      {
        match: { collection: 'comics' },
        pattern: 'comics/:title'
      }
      ,
      {
        match: { collection: 'pages' },
        pattern: 'wuuuuut/:title'
      }
    ]
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