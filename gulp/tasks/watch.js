import connect from 'gulp-connect';
import gulp from 'gulp';

gulp.task('watch', gulp.series('build', () => {
  gulp.watch('source/static/**', gulp.series('static'));
  gulp.watch([
    'source/**/*.njk',
    '.eleventy.js',
    'source/notes/*',
    'lib/*'
  ], gulp.series('html'));
  gulp.watch('source/stylesheets/**', gulp.series('stylesheets'));
  gulp.watch('source/javascript/**', gulp.series('javascript'));
  gulp.watch('source/images/**', gulp.series('images'));

  connect.server({
    port: process.env.PORT,
    root: 'build',
    livereload: true,
    fallback: 'build/index.html'
  });
}));
