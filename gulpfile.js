'use strict';
// gulpコマンドの省略
const { src, dest, watch, series, parallel, task } = require('gulp');

// EJS
const fs = require('fs'); //Node.jsでファイルを操作するための公式モジュール
const htmlMin = require('gulp-htmlmin');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
// Sass,CSS
const sass = require('gulp-dart-sass');
const sassGlob = require('gulp-sass-glob-use-forward');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const postCss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cssNano = require('gulp-cssnano');
// JavaScript
const babel = require('gulp-babel');
const terser = require('gulp-terser'); //ES6(ES2015)の圧縮に対応
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackStream = require('webpack-stream');
// 画像
const imageMin = require('gulp-imagemin');
const pngQuant = require('imagemin-pngquant');
const mozJpeg = require('imagemin-mozjpeg');
const svgo = require('gulp-svgo');
const webp = require('gulp-webp'); //webpに変換
const changed = require('gulp-changed');
// ブラウザ同期
const browserSync = require('browser-sync').create();
// 削除
const clean = require('gulp-clean');

/* ------------------------------------------------------
パス設定
------------------------------------------------------ */
const paths = {
  ejs: {
    src: ['./src/**/*.ejs', '!./src/**/_*.ejs'],
    dist: './public/',
    watch: './src/**/*.ejs',
  },
  styles: {
    src: './src/assets/scss/**/*.scss',
    copy: [
      './src/assets/css/vendors/*.css',
      '!./src/assets/css/vendors/_*.css',
    ],
    dist: './public/assets/css/',
    distCopy: './public/assets/css/vendors/',
  },
  scripts: {
    src: ['./src/assets/js/**/*.js', '!./src/assets/js/**/vendors/*.js'], //外部のライブラリファイルはコンパイルしない
    copy: [
      './src/assets/js/**/vendors/*.js',
      '!./src/assets/js/**/vendors/_*.js',
    ],
    dist: './public/assets/js/',
  },
  images: {
    src: './src/assets/images/**/*.{jpg,jpeg,png,gif,svg}',
    srcWebp: './src/assets/images/**/*.{jpg,jpeg,png}',
    dist: './public/assets/images/',
  },
  fonts: {
    src: './src/assets/fonts/*.{off,ttf,woff,woff2}',
    dist: './public/assets/fonts/',
  },
  clean: {
    all: './public/',
    assets: ['./public/assets/css/', './public/assets/js/'],
    html: './public/!(assets)**',
    css: './public/assets/css/',
    js: './public/assets/js/',
    images: './public/assets/images/',
    fonts: './public/assets/fonts/',
  },
};

/* ------------------------------------------------------
ejsコンパイル
------------------------------------------------------ */

const ejsCompile = () => {
  // ejsの設定を読み込む
  const data = JSON.parse(fs.readFileSync('./ejs-config.json', 'utf8'));
  return src(paths.ejs.src)
    .pipe(
      plumber({
        // エラーがあっても処理を止めない
        errorHandler: notify.onError('Error: <%= error.message %>'),
      })
    )
    .pipe(ejs(data))
    .pipe(
      rename({
        extname: '.html',
      })
    )
    .pipe(
      htmlMin({
        //圧縮時のオプション
        minifyCSS: true, //style要素とstyle属性の圧縮
        minifyJS: true, //js要素とjs属性の圧縮
        removeComments: true, //コメントを削除
        collapseWhitespace: true, //余白を詰める
        collapseInlineTagWhitespace: true, //inline要素間のスペース削除（spanタグ同士の改行などを詰める
        preserveLineBreaks: true, //タグ間の余白を詰める,
        /*
         *オプション参照：https://github.com/kangax/html-minifier
         */
      })
    )
    .pipe(replace(/[\s\S]*?(<!DOCTYPE)/, '$1'))
    .pipe(dest(paths.ejs.dist))
    .pipe(browserSync.stream()); //変更があった所のみコンパイル
};

/* ------------------------------------------------------
Sassコンパイル
------------------------------------------------------ */
const sassCompile = () => {
  return (
    src(paths.styles.src, {
      // ソースマップの出力の有無
      sourcemaps: true,
    })
      .pipe(
        plumber({
          // エラーがあっても処理を止めない
          errorHandler: notify.onError('Error: <%= error.message %>'),
        })
      )
      //Glob有効化
      .pipe(sassGlob())
      // scss→cssコンパイル
      .pipe(
        sass({
          includePaths: ['src/scss'], //フォルダ名と合わせる
          outputStyle: 'compressed',
          /*
          outputStyle 詳細
           *https://utano.jp/entry/2018/02/hello-sass-output-style/
           */
        }).on('error', sass.logError)
      )
      .pipe(
        postCss([
          autoprefixer({
            //ベンダープレフィックス追加※設定はpackage.jsonに記述
            cascade: false, // プロパティのインデントを整形しない
            grid: 'autoplace', // IE11のgrid対応
          }),
        ])
      )
      //メディアクエリをまとめる
      .pipe(gcmq())
      //CSS圧縮
      .pipe(cssNano())
      // 出力
      .pipe(
        dest(paths.styles.dist, {
          // ソースマップ出力先のパス
          sourcemaps: './map',
        })
      )
      //変更があった所のみコンパイル
      .pipe(browserSync.stream())
  );
};

/* ------------------------------------------------------
JavaScriptコンパイル（webpackを通さない場合）
------------------------------------------------------ */
const jsCompile = () => {
  return src(paths.scripts.src)
    .pipe(
      plumber({
        // エラーがあっても処理を止めない
        errorHandler: notify.onError('Error: <%= error.message %>'),
      })
    )
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      })
    )
    .pipe(terser()) //圧縮
    .pipe(dest(paths.scripts.dist));
};

/* ------------------------------------------------------
webpack設定
------------------------------------------------------ */
const jsBundle = () => {
  //webpackStreamの第2引数にwebpackを渡す
  return webpackStream(webpackConfig, webpack)
    .on('error', function () {
      this.emit('end'); //エラーが出ても処理を止めない
    })
    .pipe(dest(paths.scripts.dist));
};

/* ------------------------------------------------------
画像圧縮
------------------------------------------------------ */
const imagesCompress = () => {
  return src(
    paths.images.src
    // , {since: lastRun(imagesCompress)}//gulp起動中にファイルを追加しても圧縮されないため無効化
  )
    .pipe(changed(paths.images.dist)) //新しく変更があったもののみ適用
    .pipe(
      plumber({
        // エラーがあっても処理を止めない
        errorHandler: notify.onError('Error: <%= error.message %>'),
      })
    )
    .pipe(
      imageMin(
        [
          // JPG,JPEGの圧縮
          mozJpeg({
            quality: 80, //画質
          }),
          // PNGの圧縮
          pngQuant(
            [0.7, 0.9] //画質の最小,最大
          ),
        ],
        {
          verbose: true, //メタ情報削除
        }
      )
    )
    .pipe(
      // SVGの圧縮
      svgo({
        plugins: [
          {
            removeViewbox: false, //フォトショやイラレで書きだされるviewboxを消すかどうか※表示崩れの原因になるのでfalse推奨。以降はお好みで。
          },
          {
            removeMetadata: false, //<metadata>を削除するかどうか
          },
          {
            convertColors: false, //rgbをhexに変換、または#ffffffを#fffに変換するかどうか
          },
          {
            removeUnknownsAndDefaults: false, //不明なコンテンツや属性を削除するかどうか→アニメーションに影響するのでfalse
          },
          {
            convertShapeToPath: false, //コードが短くなる場合だけ<path>に変換するかどうか→アニメーションに影響するのでfalse
          },
          { collapseGroups: false }, // 重複や不要な`<g>`タグを削除する→アニメーションに影響するのでfalse
          {
            cleanupIDs: false, //SVG内に<style>や<script>がなければidを削除するかどうか
          },
          // {
          //   mergePaths: false,//複数のPathを一つに統合するかどうか
          // },
        ],
      })
    )
    .pipe(dest(paths.images.dist));
};
/* ------------------------------------------------------
webp変換
------------------------------------------------------ */
const webpConvert = () => {
  return src(
    paths.images.srcWebp
    // , {since: lastRun(webpConvert)}//gulp起動中にファイルを追加しても圧縮されないため無効化
  )
    .pipe(
      plumber({
        // エラーがあっても処理を止めない
        errorHandler: notify.onError('Error: <%= error.message %>'),
      })
    )
    .pipe(
      webp({
        // quality: 80,
      })
    )
    .pipe(dest(paths.images.dist));
};

// CSSファイルコピー（外部ファイルをsrcから取り込む場合、vendorsフォルダの中身はコンパイルしない。swiper,slickなど
const cssCopy = () => {
  return src(paths.styles.copy).pipe(dest(paths.styles.distCopy));
};

// JSファイルコピー（外部ファイルをsrcから取り込む場合、vendorsフォルダの中身はコンパイルしない
const jsCopy = () => {
  return src(paths.scripts.copy).pipe(dest(paths.scripts.dist));
};

// fontコピー（ローカルフォント使用する場合
const fontsCopy = () => {
  return src(paths.fonts.src).pipe(dest(paths.fonts.dist));
};

/* ------------------------------------------------------
ローカルサーバー起動 browser-syncではreturnではなくコールバック関数
------------------------------------------------------ */
const browserSyncFunc = (done) => {
  browserSync.init({
    notify: false, //デフォルトの connected のメッセージ非表示
    server: {
      baseDir: './',
    },
    startPath: './public/index.html',
    reloadOnRestart: true,
  });
  done();
};

/* ------------------------------------------------------
ブラウザリロード browser-syncではreturnではなくコールバック関数
------------------------------------------------------ */
const browserReloadFunc = (done) => {
  browserSync.reload();
  done();
};

/* ------------------------------------------------------
削除
------------------------------------------------------ */

// public 内をすべて削除
const cleanAll = () => {
  return src(paths.clean.all, { read: false }).pipe(clean());
};
// HTML フォルダ、ファイルのみ削除（ assets 以外削除）
const cleanHtml = () => {
  return src(paths.clean.html, { read: false }).pipe(clean());
};
//public 内の CSS と JS を削除
const cleanCssJs = () => {
  return src(paths.clean.assets, { read: false }).pipe(clean());
};
//public 内の画像を削除
const cleanImages = () => {
  return src(paths.clean.images, { read: false }).pipe(clean());
};

// ファイル監視
const watchFiles = () => {
  watch(paths.ejs.watch, series(ejsCompile, browserReloadFunc));
  watch(paths.styles.src, series(sassCompile));
  watch(paths.styles.copy, series(cssCopy));
  watch(paths.scripts.src, series(jsBundle, browserReloadFunc));
  watch(paths.scripts.copy, series(jsCopy, browserReloadFunc));
  watch(
    paths.images.src,
    series(imagesCompress, webpConvert, browserReloadFunc)
  );
  watch(paths.fonts.src, series(fontsCopy, browserReloadFunc));
};

// npx gulp のコマンドで実行される処理（画像圧縮・webp変換は差分処理の実装ができていないので初回コマンドでは実行しない）
exports.default = series(
  parallel(
    ejsCompile,
    sassCompile,
    cssCopy,
    jsBundle,
    jsCopy,
    // imagesCompress,
    // webpConvert,
    fontsCopy
  ),
  parallel(watchFiles, browserSyncFunc)
);

// その他のコマンド 例： npx gulp コマンド名(exportsに続く単語) の形で入力
exports.jsBundleStart = series(jsBundle); //webpack処理
exports.cleanAll = series(cleanAll); //public内すべて削除
exports.cleanExcludeHtml = series(cleanHtml); //assets以外削除
exports.cleanCssJs = series(cleanCssJs); //css,jsを削除
exports.cleanImages = series(cleanImages); //imagesを削除
