
// Общее
const {src, dest, series, watch, tree} = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const del = require('del');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const rev = require('gulp-rev');
const revRewrite = require('gulp-rev-rewrite');
const revDel = require('gulp-rev-delete-original');
const { readFileSync } = require('fs');
const concat = require('gulp-concat');
const fs = require ('fs');

let isProd = false; // dev by default

const fileInclude = require('gulp-file-include'); // импорт файлов
const gulpif = require('gulp-if');
const rename = require('gulp-rename'); // Переименование файлов
const notify = require('gulp-notify'); // Обработка ошибок

// Работа с HTML

const webphtml = require('gulp-webp-html'); // Вставляет в код webp и jpg  формат Через тег picture
const htmlmin = require('gulp-htmlmin'); // Минификация HTML

// Работа с CSS

const sass = require('gulp-sass'); // Препроцессор в CSS
// const webpcss = require('gulp-webp-css'); // Добавление webp формата
const groupcssmedia = require('gulp-group-css-media-queries'); // Сборка медиа запросов и групировка
const cleanCSS = require('gulp-clean-css'); // Минификация CSS файла

// Работа с IMG и SVG 

const webp = require('gulp-webp'); // Конвертирвоание в webp картинок
const imagemin = require('gulp-imagemin'); // Сжатие ихзображений
const svgSprite = require('gulp-svg-sprite'); // Сборка спрайта

// Работа с шрифтами

const ttf2woff2 = require ('gulp-ttf2woff2'); // Работа с шрифтами


// WATCHING SRC

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "./app"
    },
  });
  watch('./src/partials/*.html', html);
  watch('./src/*.html', html);
  watch('./src/scss/**/*.scss', styles);
  watch('./src/img/*.{jpg,jpeg,png,svg}', img);
	watch('./src/img/**/*.{jpg,jpeg,png}', img);
  watch('./src/img/svg/**.svg', svgSprites);
  watch('./src/js/**/*.js', scripts);
  watch('./src/resources/**', resources);
  watch('./src/resources/fonts/*.ttf', fonts);
  watch('./src/resources/**', fontsStyle);

}

// Таски с HTML

const html = () => {
  return src(['./src/*.html'])
  .pipe(fileInclude())
  .pipe(webphtml())
  // .pipe(htmlmin({
  //   collapseWhitespace: true
  // }))
  .pipe(dest('./app'))
  .pipe(browserSync.stream());
}

// Таски CSS

const styles = () => {
  return src('./src/scss/**/*.scss')
  .pipe(gulpif(!isProd, sourcemaps.init()))
  .pipe(sass({
    outputStyle:'expanded'
  }).on("error", notify.onError()))
  // .pipe(
  //   webpcss({
  //       webpClass: ' ',
  //       noWebpClass: '.no-webp'
  // }))
  .pipe(groupcssmedia())
  .pipe(autoprefixer({
        overrideBrowserslist: ['last 5 version'],
        cascade: false
  }))
  .pipe(gulpif(isProd, cleanCSS({ level: 2 })))
  .pipe(gulpif(!isProd, sourcemaps.write('.')))
  .pipe(dest('./app/css/'))
  // .pipe(cleanCSS())
  // .pipe(rename({      
  //   extname: '.min.css'
  // }))
  .pipe(dest('./app/css/'))
  .pipe(browserSync.stream());
}

// Таски с изображением

const img = () => {
  return src([
    		'./src/img/**.jpg',
    		'./src/img/**.png',
    		'./src/img/**.jpeg',
    		'./src/img/*.svg',
    		'./src/img/**/*.jpg',
    		'./src/img/**/*.png',
    		'./src/img/**/*.jpeg'
    		])
  .pipe(
      webp({
          quality: 70
        })
  )
  .pipe(dest('./app/img'))
  .pipe (src([
        './src/img/**.jpg',
        './src/img/**.png',
        './src/img/**.jpeg',
        './src/img/*.svg',
        './src/img/**/*.jpg',
        './src/img/**/*.png',
        './src/img/**/*.jpeg'
        ]))
  .pipe(
    imagemin({          
        provressive: true,
        svgoPlugins:[{ removeViewBox: false}],
        interlaced: true,
        optimizationLevel: 3
    })
  )
  .pipe(dest('./app/img'))
  .pipe(browserSync.stream());
}

// Работа с SVG

const svgSprites = () => {
  return src('./src/img/svg/**.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../sprite.svg" //sprite file name
        }
      },
    }))
    .pipe(dest('./app/img'));
}

// Таски с шрифтами

const fonts = () => {
  return src('./src/resources/fonts/*.ttf')
  .pipe(ttf2woff2())
  .pipe(dest('./app/fonts'));
}



let srcFonts = './src/scss/_fonts.scss';
let appFonts = './app/fonts/'

const  fontsStyle = (done) => {
	let file_content = fs.readFileSync(srcFonts);

  fs.writeFile(srcFonts, '', cb);
  fs.readdir(appFonts, function(err, items) {
    if(items) {
      let c_fontname;
      for(var i = 0; i < items.length; i++) {
        let fontname = items[i].split('.');
        fontname = fontname[0];
        let font = fontname.split('-')[0];

        if (c_fontname != fontname) {
          // fs.appendFile(srcFonts, '@include font-face("' + font + '", "' + fontname + '", '+ weight +', + 'style' +);\r\n', cb);

          fs.appendFile(srcFonts, `@include font-face("${font}", "${fontname}", "400", "normal");\r\n`, cb);


        }
        c_fontname = fontname;
      }
    }
  })

  done();
}

// Таски с JS

const scripts = () => {
	src('./src/js/vendor/**.js')
		.pipe(concat('vendor.js'))
		.pipe(gulpif(isProd, uglify().on("error", notify.onError())))
		.pipe(dest('./app/js/'))
  return src(
    ['./src/js/global.js', './src/js/components/**.js', './src/js/main.js'])
    .pipe(gulpif(!isProd, sourcemaps.init()))
		.pipe(babel({
			presets: ['@babel/env']
		}))
    .pipe(concat('main.js'))
    .pipe(gulpif(isProd, uglify().on("error", notify.onError())))
    .pipe(gulpif(!isProd, sourcemaps.write('.')))
    .pipe(dest('./app/js'))
    .pipe(browserSync.stream());
}

// Ресурсы

const resources = () => {
  return src('./src/resources/**/')
    .pipe(dest('./app'))
}

// Очистка сборки 

const clean = () => {
	return del(['app/*'])
}

const cb = ()  => {}

const toProd = (done) => {
  isProd = true;
  done();
};

exports.default = series(clean, html, fonts, scripts, styles, img, svgSprites, fontsStyle, resources, watchFiles);

// exports.build = series(toProd, clean, html, scripts, styles, resources, img, svgSprites, html);




// ПОКА НЕ ИСПОЛЬЗУЮ


// const stylesBackend = () => {
// 	return src('./src/scss/**/*.scss')
// 		.pipe(sass().on("error", notify.onError()))
//     .pipe(autoprefixer({
//       cascade: false,
// 		}))
// 		.pipe(dest('./app/css/'))
// };

// const scriptsBackend = () => {
// 	src('./src/js/vendor/**.js')
//     .pipe(concat('vendor.js'))
//     .pipe(gulpif(isProd, uglify().on("error", notify.onError())))
// 		.pipe(dest('./app/js/'))
// 	return src(['./src/js/functions/**.js', './src/js/components/**.js', './src/js/main.js'])
//     .pipe(dest('./app/js'))
// };

// const cache = () => {
//   return src('app/**/*.{css,js,svg,png,jpg,jpeg,woff2}', {
//     base: 'app'})
//     .pipe(rev())
//     .pipe(revDel())
// 		.pipe(dest('app'))
//     .pipe(rev.manifest('rev.json'))
//     .pipe(dest('app'));
// };

// const rewrite = () => {
//   const manifest = readFileSync('app/rev.json');
// 	src('app/css/*.css')
// 		.pipe(revRewrite({
//       manifest
//     }))
// 		.pipe(dest('app/css'));
//   return src('app/**/*.html')
//     .pipe(revRewrite({
//       manifest
//     }))
//     .pipe(dest('app'));
// }

// exports.cache = series(cache, rewrite);

// exports.backend = series(toProd, clean, html, scriptsBackend, stylesBackend, resources, img, svgSprites);
