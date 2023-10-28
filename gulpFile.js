var gulp = require("gulp"),
  concat = require("gulp-concat"),
  prefix = require("gulp-autoprefixer"),
  sass = require("gulp-sass")(require("sass"));
pug = require("gulp-pug");
livereload = require("gulp-livereload");
sourcemaps = require("gulp-sourcemaps");
uglify = require("gulp-uglify");
notify = require("gulp-notify");
zip = require("gulp-zip");
// ftp = require("vinyl-ftp");

// HTML Task
gulp.task("html", async function () {
  require("./server.js");
  return gulp
    .src("project/index.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("dist"))
    .pipe(notify("HTML task is done!"))
    .pipe(livereload());
});

// Css Task
gulp.task("css", async function () {
  return gulp
    .src("project/css/main.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(prefix())
    .pipe(concat("main.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(livereload());
});

// JS Task
gulp.task("js", async function () {
  return gulp
    .src(["project/js/*.js", "!project/js/two.js"])
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
    .pipe(livereload());
});

// Compress files
gulp.task("compress", async function () {
  return gulp
    .src("dist/**/*.*")
    .pipe(zip("website.zip"))
    .pipe(gulp.dest("."))
    .pipe(notify("Files compressed succesfully!"));
});

// Deploy design with ftp
// gulp.task("deploy", function () {
//   var conn = ftp.create({
//     host: "elmobarmij.net",
//     user: "",
//     password: "",
//     parallel: 10,
//   });

//   return gulp
//     .src(["dist/**/*.*"], { base: ".", buffer: false })
//     .pipe(conn.newer("/public_html")) // only upload newer files
//     .pipe(conn.dest("/public_html"))
//     .pipe(livereload());
// });

// Watch Tasks
gulp.task("watch", async function () {
  require("./server.js");
  livereload.listen();
  gulp.watch("project/**/*.pug", gulp.series("html"));
  gulp.watch("project/css/**/*.scss", gulp.series("css"));
  gulp.watch("project/js/*.js", gulp.series("js"));
  gulp.watch("dist/**/*.*", gulp.series("compress"));
  // gulp.watch("dist/**/*.*", gulp.series("deploy"));
});

// Default TASK
gulp.task("default", gulp.series("watch"));
