 const gulp = require('gulp');
 const browserSync = require('browser-sync').create(); 
 const sass = require('gulp-sass');
 const rename = require("gulp-rename");
 const autoprefixer = require('gulp-autoprefixer');
 const cleancss = require('gulp-clean-css');
 const imagemin = require('gulp-imagemin');
 const newer = require('gulp-newer');
 const webpack = require("webpack-stream");

// const dist = "./dist/";
const dist = "C:/OpenServer/domains/Test";

 function browsersync() {
 	browserSync.init({ 
 		server: { baseDir: 'src/' }
  
 	});
 }

 function buildJs() {
    return gulp.src("src/js/main.js")
                    .pipe(webpack({
                        mode: 'development',
                        output: {
                            filename: 'bundle.js'
                        },
                        watch: false,
                        devtool: "source-map",
                        module: {
                            rules: [
                              {
                                test: /\.m?js$/,
                                exclude: /(node_modules|bower_components)/,
                                use: {
                                  loader: 'babel-loader',
                                  options: {
                                    presets: [['@babel/preset-env', {
                                        debug: true,
                                        corejs: 3,
                                        useBuiltIns: "usage"
                                    }]]
                                  }
                                }
                              }
                            ]
                          }
                    }))
                    .pipe(gulp.dest('src/js/'))
                    .pipe(browserSync.stream());
  }

 function styles() {
 	return gulp.src("src/sass/**/*.+(scss|sass)")
 	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
 	.pipe(rename({suffix: '.min', prefix: ''}))
 	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Создадим префиксы с помощью Autoprefixer
 	.pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) // Минифицируем стили
 	.pipe(gulp.dest('src/css/')) // Выгрузим результат в папку "app/css/"
 	.pipe(browserSync.stream()) // Сделаем инъекцию в браузер
 }
 function images() {
 	return gulp.src('src/images/original/*') // Берём все изображения из папки источника
 	.pipe(newer('src/images/newer/')) // Проверяем, было ли изменено (сжато) изображение ранее
 	.pipe(imagemin()) // Сжимаем и оптимизируем изображеня
 	.pipe(gulp.dest('src/images/newer/')) // Выгружаем оптимизированные изображения в папку назначения
 }
 function startwatch() { //следим за изменениями и запускаем соответствующую функцию
     gulp.watch(['src/**/*.js', '!src/js/bundle.js'], gulp.series(buildJs, buildcopy));
     gulp.watch('src/sass/**/*.+(scss|sass|css)', gulp.series(styles, buildcopy));
     gulp.watch('src/*.html').on('change', browserSync.reload);
     gulp.watch('src/images/origin/*', gulp.series(images, buildcopy));
 }

 function buildcopy() {
	return gulp.src([ // Выбираем нужные файлы
    'src/css/**/*.min.css',
    'src/css/**/*.min.css.map',
    'src/js/bundle.js',
    'src/js/bundle.js.map',
		'src/images/newer/**/*',
        'src/**/*.html',
        'src/icons/**/*',
		], { base: 'src' }) // Параметр "base" сохраняет структуру проекта при копировании
	.pipe(gulp.dest(dist)) // Выгружаем в папку с финальной сборкой
}



 exports.browsersync = browsersync;
 exports.styles = styles;
 exports.images = images;
 exports.startwatch = startwatch;
 exports.buildJs = buildJs;
 exports.buildcopy = buildcopy;
 exports.build = gulp.parallel(styles, buildJs, images, buildcopy, startwatch);

 exports.default = gulp.parallel(startwatch, images, styles, browsersync, buildJs);

