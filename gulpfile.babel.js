'use strict';

import gulp from 'gulp';
import jshint from 'gulp-jshint';
import gutil from 'gulp-util';
import plumber from 'gulp-plumber';
import newer from 'gulp-newer';
import imagemin from 'gulp-imagemin';
import sourcemaps from 'gulp-sourcemaps'; //used for debugging
import nodemon from 'gulp-nodemon';
import livereload from 'gulp-livereload';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import assign from 'object-assign';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import gulpif from 'gulp-if';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import sass from 'gulp-sass';
import del from 'del';

//Project Paths:
var basePath = {
  src: 'src/',
  dest: 'dist/'
};
var srcPublic = {
  styles : basePath.src + 'app/public/css/',
  scripts: basePath.src + 'app/public/js/',
  images : basePath.src + 'app/public/images/'
};

var destPublic = {
  styles : basePath.dest + 'dist/public/css/',
  scripts: basePath.dest + 'dist/public/js/',
  images : basePath.dest + 'dist/public/images/'
};

var onError = function(err) {
  gutil.log(gutil.colors.green(err));
};

function bundle(brfy, lr) {
  return brfy.bundle()
    .on('error', (e) => {
      console.error(e.stack);
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(srcPublic.scripts))
    .pipe(gulpif(lr, livereload()));
}

// ### DEVELOPMENT ###

//JS
gulp.task('jshint', function() {
  return gulp.src([srcPublic.scripts + '**/*.js', '!' + srcPublic.scripts + 'bundle.js'])
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(livereload());
});

//CSS TASK
gulp.task('css', function() {
  return gulp.src(srcPublic.styles + '**/*.css')
    .pipe(livereload());
});

//SCSS TASK
gulp.task('sass', function() {
  return gulp.src(basePath.src+'app/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(srcPublic.styles))
    .pipe(livereload());
});

//client-app TASKS
gulp.task('build', function() {
  const brfy = browserify(basePath.src + 'app/client-app/index.js', { debug: true })
    .transform(babelify);
  return bundle(brfy, false);
});

gulp.task('build-lr', function() {
  const brfy = browserify(basePath.src + 'app/client-app/index.js', { debug: true })
    .transform(babelify);
  return bundle(brfy, true);
});

gulp.task('browserify-watch', function() {
  const brfy = browserify(basePath.src + 'app/client-app/index.js', assign({ debug: true }, watchify.args ))
    .transform(babelify);
  const wfy = watchify(brfy, {poll: true, ignoreWatch: true})
    .on('update', () => bundle(wfy, true))
    .on('log', gutil.log);
  return bundle(wfy, true);
});

//WATCH TASK
gulp.task('watch', function() {
  //NG2 SCSS
  gulp.watch([basePath.src + 'app/scss/**/*.scss'], ['build-lr']);
  
  //JS
  gulp.watch([basePath.src + 'app/client-app/**/*.js'], ['jshint']);

  //CSS
  gulp.watch([srcPublic.styles + '**/*.css'], ['css']);

  //HTML
  gulp.watch([basePath.src + 'app/client-app/**/*.html'], ['build-lr']);
});

//SERVER TASK
gulp.task('server', function() {
  livereload.listen();

  nodemon({
    script: basePath.src + 'api/server.js',
    ext: 'js'
  }).on('readable', function(){
    gulp.src(basePath.src + 'api/server.js')
      .pipe(livereload.reload());
  });
});

gulp.task('development', ['server', 'watch', 'browserify-watch']);

/// ### PRODUCTION ###

//IMAGE MINIFICATION
gulp.task('minify-images', function() {
  return gulp.src(srcPublic.images+'*')
    .pipe(newer(destPublic.images))
    .pipe(imagemin())
    .pipe(gulp.dest(destPublic.images));
});

//CSS MINIFICATION
gulp.task('minify-css', function() {
  return gulp.src(srcPublic.styles + '*.css')
    .pipe(sourcemaps.init())
      .pipe(concat('app.min.css'))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(destPublic.styles));
});

//JS MINIFICATION
gulp.task('minify-js', function() {
  return gulp.src([
      srcPublic.scripts + 'vendor/jquery.js', //jquery before b/c foundation dependency
      basePath.src + 'bower_components/web-animations-js/web-animations.min.js',
      srcPublic.scripts + '**/*.js'
    ])
    .pipe(sourcemaps.init())
      .pipe(concat('bundle.min.js'))
      .pipe(uglify({ mangle: false }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(destPublic.scripts));
});

//COPY TASKS (SERVER FILES)
gulp.task('copy', function() {
  gulp.src(basePath.src + 'serverConfig/**')
    .pipe(gulp.dest(basePath.dest + 'serverConfig'));

  gulp.src(basePath.src + 'serverObjects/**')
    .pipe(gulp.dest(basePath.dest + 'serverObjects'));
    
  gulp.src(basePath.src + 'server.js')
    .pipe(gulp.dest(basePath.dest));

  gulp.src(basePath.src + 'routes.js')
    .pipe(gulp.dest(basePath.dest));
});

//FONT TASK
// Fonts
gulp.task('fonts', function() {
  return gulp.src(['app/bower_components/font-awesome/fonts/fontawesome-webfont.*'])
    .pipe(gulp.dest(basePath.dest + 'public/fonts/'));
});

//CLEAN TASK
gulp.task('clean', function() {
  del(['dist/**', '!dist', '!dist/public', '!dist/public/index.html']);
});

gulp.task('production', ['minify-images', 'minify-css', 'minify-js', 'fonts', 'copy']);

