const gulp = require('gulp')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const pug = require('gulp-pug')

const args = {
  build: {
    html: {
      src: 'src/views/*.pug',
      dest: 'www/'
    },
    appJS: {
      src: [
        'src/app.module.js',
        'src/controllers/*.js',
        'src/directives/*.js'
      ],
      dest: 'www/'
    },
    vendorJS: {
      src: [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/jquery-ui/ui/widget.js',
        'node_modules/blueimp-file-upload/js/jquery.fileupload.js',
        'node_modules/angular/angular.js'
      ],
      dest: 'www/'
    },
    vendorCSS: {
      src: [
        'node_modules/bootstrap/dist/css/bootstrap.css'
      ],
      dest: 'www/'
    }
  }
}

/** npm run build */
gulp.task('build', ['build:html', 'build:js', 'build:css'])

/** npm run build:html */
gulp.task('build:html', () => {
  gulp.src(args.build.html.src)
    .pipe(pug())
    .pipe(gulp.dest(args.build.html.dest))
})
gulp.task('watch:html', ['watch:html'])

/** npm run build:js */
gulp.task('build:js', ['build:js:vendor', 'build:js:app'])
gulp.task('watch:js', ['watch:js'])

/** npm run build:js:vendor */
gulp.task('build:js:vendor', () => {
  gulp.src(args.build.vendorJS.src)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(args.build.vendorJS.dest))
})

/** npm run build:js:app */
gulp.task('build:js:app', () => {
  gulp.src(args.build.appJS.src)
    .pipe(babel({compact: false}))
    .pipe(concat('app.js'))
    .pipe(gulp.dest(args.build.appJS.dest))
})

/** npm run build:css */
gulp.task('build:css', () => {
  gulp.src(args.build.vendorCSS.src)
    .pipe(concat('app.css'))
    .pipe(gulp.dest(args.build.vendorCSS.dest))
})

/** npm run watch */
gulp.task('watch', () => {
  gulp.watch([
    args.build.html.src,
    args.build.appJS.src
  ], ['build'])
})

/** npm run watch:html */
gulp.task('watch:html', () => {
  gulp.watch(args.build.html.src, ['build:html'])
})

/** npm run watch:js */
gulp.task('watch:js', () => {
  gulp.watch(args.build.appJS.src, ['build:js'])
})

/** npm run watch:css */
gulp.task('watch:css', () => {
  gulp.watch(args.build.vendorCSS.src, ['build:css'])
})
