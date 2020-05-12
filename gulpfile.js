const gulp = require("gulp");
const browserSync = require('browser-sync').create();
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");


function styles() {
    return gulp.src('./src/scss/main.scss')
     .pipe(sass().on('error', sass.logError))
     .pipe(cleanCSS())
     .pipe(autoprefixer('last 2 versions'))
     .pipe(gulp.dest('./src'))
     
};


function dist(done) {
    gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'));

    gulp.src('./src/main.css')
    .pipe(gulp.dest('./dist'));

    gulp.src('./src/js/*')
        .pipe(gulp.dest('./dist/js'));

    gulp.src('./src/images/*')
    .pipe(gulp.dest('./dist/images'));



    done();
};

function server() {
    console.log("\r\n Starting BrowserSync \r\n" );

    browserSync.init({
        server: {
            baseDir: './src',
            index: 'index.html'
        },
    });
};

function reload(done) {
    browserSync.reload();
    done();
};

function watchFiles(done) {
    
    gulp.watch('./src/*.html', reload);

    gulp.watch('./src/scss/*.scss', gulp.series(styles,reload));

    gulp.watch('./src/js/*.js', reload)
    
};



//Make a server and watch HTML, JS, & SCSS files
exports.watch = gulp.series(styles,gulp.parallel(server, watchFiles));

//Move html, css and js files to dist folder
exports.dist = dist;

//Concatenate Sass files, autoprefix and clean, then process into CSS
exports.styles = styles;

exports.default = gulp.series(styles, gulp.parallel(server, watchFiles));



