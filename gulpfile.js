const gulp = require('gulp');
const browserSync = require('browser-sync').create();

function watch() {
    browserSync.init({
        server: "./app",
    });
    gulp.watch('app/**/*').on('change', browserSync.reload);
}

exports.default = gulp.series(watch);