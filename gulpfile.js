var gulp = require('gulp');
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var deepExtend = require('deep-extend');
var DeepMerge = require('deep-merge');
var nodemon = require('nodemon');
var nodeExternals = require('webpack-node-externals');

// var configMerge = function(target, source) {
// 	deepExtend(target, source);
// 	console.log(target);
// 	return target;
// };

var deepmerge = DeepMerge(function(target, source, key) {
  if(target instanceof Array) {
    return [].concat(target, source);
  }
  return source;
});

var defaultConfig = {
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
    ]
  }
};

if(process.env.NODE_ENV !== 'production') {
  defaultConfig.devtool = '#eval-source-map';
  defaultConfig.debug = true;
}

function config(overrides) {
  return deepmerge(defaultConfig, overrides || {});
}

// frontend

var frontendConfig = config({
  entry: './src/app/client-app/entry.js',
  output: {
    path: path.join(__dirname, 'src/app/public/js'),
    filename: 'app.bundle.js'
  },
  module: {
  	loaders: [
  		{
          test: /jquery\.js/,
          loader: 'null-loader',
          exclude: path.resolve('node_modules/foundation-sites/')
      }
  	]
  }
});

// backend

var backendConfig = config({
  entry: './src/api/server.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'src/api/build'),
    filename: 'backend.js'
  },
  node: {
    __dirname: true,
    __filename: true
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin('require("source-map-support").install();',
                             { raw: true, entryOnly: false })
  ]
});

// tasks

function onBuild(done) {
  return function(err, stats) {
    if(err) {
      console.log('Error', err);
    }
    else {
      console.log(stats.toString());
    }

    if(done) {
      done();
    }
  }
}

gulp.task('frontend-build', function(done) {
  webpack(frontendConfig).run(onBuild(done));
});

gulp.task('frontend-watch', function() {
  webpack(frontendConfig).watch(100, onBuild());
});

gulp.task('backend-build', function(done) {
  webpack(backendConfig).run(onBuild(done));
});

gulp.task('backend-watch', function() {
  webpack(backendConfig).watch(100, function(err, stats) {
    onBuild()(err, stats);
    nodemon.restart();
  });
});

gulp.task('build', ['frontend-build', 'backend-build']);
gulp.task('watch', ['frontend-watch', 'backend-watch']);

gulp.task('run', ['backend-watch', 'frontend-watch'], function() {
  nodemon({
    execMap: {
      js: 'node'
    },
    script: path.join(__dirname, 'build/backend'),
    ignore: ['*'],
    watch: ['foo/'],
    ext: 'noop'
  }).on('restart', function() {
    console.log('Restarted!');
  });
});
