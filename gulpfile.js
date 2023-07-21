"use strict";

const {src, dest} = require("gulp");
const gulp = require("gulp");
const pathTo = require("path");
const autoprefixer = require("gulp-autoprefixer");
const cssbeautify = require("gulp-cssbeautify");
const removeComments = require('gulp-strip-css-comments');
const rename = require("gulp-rename");
const sass = require('gulp-sass')(require('sass'));
const cssnano = require("gulp-cssnano");
const pxtorem = require('gulp-pxtorem');
const plumber = require("gulp-plumber");
const del = require("del");
const notify = require("gulp-notify");
const webpackStream = require('webpack-stream');
const browserSync = require("browser-sync").create();
const pug = require('gulp-pug');
const frontMatter  = require('gulp-front-matter');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const htmlbeautify = require('gulp-html-beautify');
const purgecss = require('gulp-purgecss');
const svgSprite = require('gulp-svg-sprites');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const base64 = require('gulp-base64-inline');
const tiny = require('gulp-tinypng-nokey');

const htmlImport = require('gulp-html-import');


const realFavicon = require ('gulp-real-favicon');
const fs = require('fs');

/* Paths */
const srcPath = 'src/';
const distPath = 'www/';

const path = {
    build: {
        pughtml:   distPath,
        html:   distPath,
        js:     distPath + "assets/js/",
        css:    distPath + "assets/css/",
        img:    distPath + "assets/images/",
        svg:    distPath + "assets/icons/",
        fonts:  distPath + "assets/fonts/"
    },
    src: {
        pughtml:   srcPath + "**/*.pug",
        html:   srcPath + "**/*.html",
        js:     srcPath + "assets/js/**/*.js",
        scss:   srcPath + "assets/scss/*.{sass,scss}",
        css:    srcPath + "assets/scss/**/*.css",
        img:    srcPath + "assets/images/**/*.{mp4,cur,jpg,png,svg,gif,ico,webp,webmanifest,xml,json}",
        svg:    srcPath + "assets/icons/*.svg",
        fonts:  srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}"
    },
    watch: {
        pughtml:   srcPath + "**/*.pug",
        html:   srcPath + "**/*.html",
        js:     srcPath + "assets/js/**/*.js",
        scss:   srcPath + "assets/scss/**/*.{sass,scss}",
        css:    srcPath + "assets/scss/**/*.css",
        img:    srcPath + "assets/images/**/*.{mp4,cur,jpg,png,svg,gif,ico,webp,webmanifest,xml,json}",
        svg:    srcPath + "assets/icons/*.svg",
        fonts:  srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}"
    },
    clean: "./" + distPath
}



/* Tasks */

function serve() {
    browserSync.init({
        server: {
            baseDir: "./" + distPath
        }
    });
}

function pughtml(cb) {
    return src(path.src.pughtml, {base: srcPath})
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(frontMatter({ property: 'data' }))
        .pipe(pug({
                pretty: true
            })
        )
        .pipe(htmlbeautify(
            {indentSize: 2}
        ))
        .pipe(dest(path.build.pughtml))
        .pipe(browserSync.reload({stream: true}));

    cb();
}

function html(cb) {
    return src(path.src.html, {base: srcPath})
        .pipe(htmlImport('./src/includes/'))
        .pipe(frontMatter({ property: 'data' }))
        .pipe(dest(path.build.html))
        .pipe(browserSync.reload({stream: true}));

    cb();
}

function scss(cb) {
    return src(path.src.scss, {base: srcPath + "assets/scss/"})
        .pipe(plumber({
            errorHandler : function(err) {
                notify.onError({
                    title:    "SCSS Error",
                    message:  "Error: <%= error.message %>"
                })(err);
                this.emit('end');
            }
        }))
        .pipe(sass({
            includePaths: './node_modules/',
            outputStyle: 'compressed'
        }))
        .pipe(base64('../icons'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions', '> 1%', 'ie 9'],
            cascade: true
        }))
        .pipe(cssbeautify())
        .pipe(dest(path.build.css))
        .pipe(cssnano({
            zindex: false,
            autoprefixer: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(pxtorem({
			rootValue: 10,
			unitPrecision: 5,
		    propList: ['top', 'left', 'right', 'bottom', 'font', 'font-size', 'line-height', 'letter-spacing', 'margin', 'margin-top', 'padding', 'height', 'min-height', 'max-height', 'width', 'max-width', 'flex'],
		    selectorBlackList: ['.fancybox-button', '.slick-slider', 'slick'],
		    replace: true,
		    mediaQuery: false,
		    minPixelValue: 18
		}))
        .pipe(removeComments())
        .pipe(rename({
            suffix: '.min',
            extname: ".css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browserSync.reload({stream: true}));

    cb();
}

function scssWatch(cb) {
    return src(path.src.scss, {base: srcPath + "assets/scss/"})
        .pipe(plumber({
            errorHandler : function(err) {
                notify.onError({
                    title:    "SCSS Error",
                    message:  "Error: <%= error.message %>"
                })(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: './node_modules/',
            outputStyle: 'compressed'
        }))
        .pipe(pxtorem({
            rootValue: 10,
            unitPrecision: 5,
            propList: ['top', 'left', 'right', 'bottom', 'font', 'font-size', 'line-height', 'letter-spacing', 'margin', 'margin-top', 'padding', 'height', 'min-height', 'max-height', 'width', 'max-width', 'flex'],
            selectorBlackList: ['.fancybox-button'],
            replace: true,
            mediaQuery: false,
            minPixelValue: 18
        }))
        .pipe(rename({
            suffix: '.min',
            extname: ".css"
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(base64('../icons'))
        .pipe(dest(path.build.css))
        .pipe(browserSync.reload({stream: true}));

    cb();
}

function css(cb) {
    return src(path.src.css)
        .pipe(dest(path.build.css))
        .pipe(browserSync.reload({stream: true}));

    cb();
}

function cssWatch(cb) {
    return src(path.src.css)
        .pipe(dest(path.build.css))
        .pipe(browserSync.reload({stream: true}));

    cb();
}

function cleancss(cb) {
    return src(path.build.css + 'plugins.min.css')
        .pipe(purgecss({
            content: ['www/*.html']
        }))
        .pipe(rename({
            suffix: '.purge',
            extname: '.css'
        }))
        .pipe(dest(path.build.css))
        .pipe(browserSync.reload({stream: true}));

    cb();
}

function jsPlugins(cb) {
	return gulp.src([
        pathTo.resolve('node_modules', 'jquery/*/jquery.min.js'),
        pathTo.resolve('node_modules', 'locomotive-scroll/dist/locomotive-scroll.min.js'),
        pathTo.resolve('node_modules', 'swiper/swiper-bundle.min.js')
	])
    .pipe(plumber({
		errorHandler: notify.onError("Error: <%= error.message %>")
	}))
    .pipe(concat('plugins.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js + '/plugins/'))
	.pipe(browserSync.reload({ stream: true }))

    cb();
};

function js(cb) {
    return src(path.src.js, {base: srcPath + 'assets/js/'})
        .pipe(plumber({
            errorHandler : function(err) {
                notify.onError({
                    title:    "JS Error",
                    message:  "Error: <%= error.message %>"
                })(err);
                this.emit('end');
            }
        }))
        // .pipe(sourcemaps.init())
        // .pipe(webpackStream({
        //   mode: "production",
        //   output: {
        //     filename: 'app.min.js',
        //   },
        //   module: {
        //     rules: [
        //       {
        //         test: /\.(js)$/,
        //         exclude: /(node_modules)/,
        //         loader: 'babel-loader',
        //         query: {
        //           presets: ['@babel/preset-env']
        //         }
        //       }
        //     ]
        //   }
        // }))
        // .pipe(sourcemaps.write('.'))
        .pipe(dest(path.build.js))
        .pipe(browserSync.reload({stream: true}));

    cb();
}

function jsWatch(cb) {
    return src(path.src.js, {base: srcPath + 'assets/js/'})
        .pipe(plumber({
            errorHandler : function(err) {
                notify.onError({
                    title:    "JS Error",
                    message:  "Error: <%= error.message %>"
                })(err);
                this.emit('end');
            }
        }))
        // .pipe(webpackStream({
        //   mode: "development",
        //   output: {
        //     filename: 'app.min.js',
        //   }
        // }))
        .pipe(dest(path.build.js))
        .pipe(browserSync.reload({stream: true}));

    cb();
}

function imgWatch(cb) {
    return src(path.src.img)
        .pipe(dest(path.build.img))
        .pipe(browserSync.reload({stream: true}));

    cb();
}

function img(cb) {
    return src(path.src.img)
        // .pipe(tiny())
        .pipe(dest(path.build.img))
        .pipe(browserSync.reload({stream: true}));

    cb();
}

function svg(cb) {
    return src(path.src.svg)
        // .pipe(cheerio({
        //     // run: function ($) {
        //     //     $('[fill]').removeAttr('fill');
        //     //     $('[style]').removeAttr('style');
        //     // },
        //     parserOptions: { xmlMode: true }
        // }))
        // .pipe(replace('&gt;', '>'))
        // .pipe(svgSprite({
        //         mode: "symbols",
        //         preview: false,
        //         selector: "%f",
        //         svg: {
        //             symbols: 'sprites.svg'
        //         }
        //     }
        // ))
        .pipe(gulp.dest(path.build.svg))
        .pipe(browserSync.reload({stream: true}));
        cb();
}

function fonts(cb) {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
        .pipe(browserSync.reload({stream: true}));

    cb();
}

function clean(cb) {
    return del(path.clean);

    cb();
}

function watchFiles() {
    gulp.watch([path.watch.pughtml], pughtml);
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.scss], scssWatch);
    gulp.watch([path.watch.css], cssWatch);
    gulp.watch([path.watch.js], jsWatch);
    gulp.watch([path.watch.img], imgWatch);
    gulp.watch([path.watch.svg], svg);
    gulp.watch([path.watch.fonts], fonts);
}

const build = gulp.series(clean, gulp.parallel(pughtml, html, img, svg, scss, css, js, jsPlugins, fonts));
const watch = gulp.parallel(build, watchFiles, serve);

/* Exports Tasks */
exports.pughtml = pughtml;
exports.html = html;
exports.scss = scss;
exports.css = css;
exports.js = js;
exports.js = jsPlugins;
exports.img = img;
exports.svg = svg;
exports.fonts = fonts;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;
exports.cleancss = cleancss;



// File where the favicon markups are stored
var FAVICON_DATA_FILE = 'faviconData.json';

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function(done) {
	realFavicon.generateFavicon({
		masterPicture: 'src/assets/images/logo.svg',
		dest: 'www/assets/favicons',
		iconsPath: '/',
		design: {
			ios: {
				pictureAspect: 'noChange',
				assets: {
					ios6AndPriorIcons: false,
					ios7AndLaterIcons: false,
					precomposedIcons: false,
					declareOnlyDefaultIcon: true
				}
			},
			desktopBrowser: {
				design: 'raw'
			},
			windows: {
				pictureAspect: 'noChange',
				backgroundColor: '#da532c',
				onConflict: 'override',
				assets: {
					windows80Ie10Tile: false,
					windows10Ie11EdgeTiles: {
						small: false,
						medium: true,
						big: false,
						rectangle: false
					}
				}
			},
			androidChrome: {
				pictureAspect: 'noChange',
				themeColor: '#ffffff',
				manifest: {
					display: 'standalone',
					orientation: 'notSet',
					onConflict: 'override',
					declared: true
				},
				assets: {
					legacyIcon: false,
					lowResolutionIcons: false
				}
			},
			safariPinnedTab: {
				pictureAspect: 'silhouette',
				themeColor: '#5bbad5'
			}
		},
		settings: {
			scalingAlgorithm: 'Mitchell',
			errorOnImageTooSmall: false,
			readmeFile: false,
			htmlCodeFile: false,
			usePathAsIs: false
		},
		markupFile: FAVICON_DATA_FILE
	}, function() {
		done();
	});
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function() {
	return gulp.src(['www/*.html'])
		.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
		.pipe(gulp.dest('www'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
	var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
	realFavicon.checkForUpdates(currentVersion, function(err) {
		if (err) {
			throw err;
		}
	});
});