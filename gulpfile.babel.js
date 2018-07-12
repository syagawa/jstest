import gulp from "gulp";
import nodemon from "gulp-nodemon";

import webpackStream from "webpack-stream";
import webpack from "webpack";
import webpackConfig from "./webpack.config";

import notifier from "node-notifier";

import browser from "browser-sync";

import del from "del";

const errorHandler = function(error){
  var message;
  if(error.message){
    message = error.message;
  }else{
    message = error;
  }
  notifier.notify(
    {
      title: 'Error occured in gulp or Webpack processing.',
      wait: true,
      message: message
    },
    function(){
      console.log(error);
    }
  );
};

const webpackJSError = function(){
  errorHandler("Webpack Error : JS");
  this.emit("end");
};
const webpackCSSError = function(){
  errorHandler("Webpack Error : CSS");
  this.emit("end");
};

export function js(){
  return webpackStream(webpackConfig.js, webpack)
          .on("error", webpackJSError)
          .pipe(gulp.dest("public"))
          .pipe(browser.reload({stream:true}));
}

export function css(){
  return webpackStream(webpackConfig.css, webpack)
          .on("error", webpackCSSError)
          .pipe(gulp.dest("public"))
          .pipe(browser.reload({stream:true}));
}

export function watch(){
  gulp.watch(["src/js/**/*.js","!src/js/min/**/*.js"], gulp.series(["js"]));
  gulp.watch("src/scss/**/*.scss", gulp.series(["css"]));
}

export function deleteFiles(){
  return del([
    'public/tmp.*'
  ]);
}

export function server(){
  browser({
    server:{
      baseDir: "./",
      index:"index.html"
    },
    port:9009,
    browser: "chrome"
  });
  browser.reload({stream:true});
}


const build = gulp.series( js, css, deleteFiles );
gulp.task("build", build);

const start = gulp.parallel(build, server, watch);
gulp.task("start", start);

export default start;