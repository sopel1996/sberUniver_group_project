var gulp = require('gulp');
 
const gulpPutFile = require("gulp-putfile");

gulp.task('deploy', function () {
return gulp.src("dist/*").pipe(
  gulpPutFile({
    dest: "/var/www/html",
    host: "212.6.44.82",
    username: "",
    password: "",
    port: 22,
  })
);
});

//add test_branch