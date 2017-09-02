'use strict';
var metalsmith = require('metalsmith'),
markdown = require('metalsmith-markdown'),
layouts = require('metalsmith-layouts'),
handlebars = require('handlebars'),
permalinks = require('metalsmith-permalinks'),
collections = require('metalsmith-collections'),
serve = require('metalsmith-serve'),
watch = require('metalsmith-watch');
var env = process.argv[2];
var devBuild = (env || "dev").trim().toLowerCase() !== 'prod';


handlebars.registerHelper('moment', require('helper-moment'));

var app = metalsmith(__dirname)
  .clean(true)
  .metadata({
    site: {
      name: 'Webcomic CMS',
      description: "a cms for webcomics"
    }
  })
  .source('./src')
  .destination('./build')
  .use(collections({
    pages: {
      pattern: 'pages/**/*.md',
      sortBy: 'title',
      reverse: false
    },
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

if (devBuild) {
  app.use(serve({
    port: 8080,
    verbose: true
  }))
  .use(watch({
    paths: {
      "${source}/**/*": true,
      "layout/**/*": "**/*",
    }
  }))
}

app.build(function (err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log('Webcomic CMS built!');
  }
});