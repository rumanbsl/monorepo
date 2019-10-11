// @ts-nocheck
import gulp from "gulp";
import iconfont from "gulp-iconfont";

import { parallel } from "async";
import { resolve } from "path";
import consolidate from "gulp-consolidate";
import rename from "gulp-rename";
import ttf2eot from "gulp-ttf2eot";
import ttf2svg from "gulp-ttf-svg";
import ttf2woff from "gulp-ttf2woff";
import ttf2woff2 from "gulp-ttf2woff2";
import debug from "gulp-debug";
import { readdir } from "fs";
import runSequence from "run-sequence";

const runTimestamp = Math.round(Date.now() / 1000);
gulp.task("web-font", (callback) => {
  runSequence("create_eot", "create_svg", "create_woff", "create_woff2", "create_css", callback);
});

const fontsPath = resolve(__dirname, "./gulp-assets/fonts");
const fontsInputDir = ["gulp-assets/fonts/*.ttf"];
const fontsOutputPath = "src/assets/fonts";

gulp.task("create_eot", (done) => {
  gulp.src(fontsInputDir)
    .pipe(debug())
    .pipe(ttf2eot())
    .pipe(gulp.dest(fontsOutputPath))
    .on("finish", done);
});

gulp.task("create_svg", (done) => {
  gulp.src(fontsInputDir)
    .pipe(debug())
    .pipe(ttf2svg())
    .pipe(gulp.dest(fontsOutputPath))
    .on("finish", done);
});

gulp.task("create_woff", (done) => {
  gulp.src(fontsInputDir)
    .pipe(debug())
    .pipe(ttf2woff())
    .pipe(gulp.dest(fontsOutputPath))
    .on("finish", done);
});

gulp.task("create_woff2", (done) => {
  gulp.src(fontsInputDir)
    .pipe(debug())
    .pipe(ttf2woff2())
    .pipe(gulp.dest(fontsOutputPath))
    .on("finish", done);
});

gulp.task("create_css", (done) => {
  const fonts = [];
  readdir(fontsPath, (err, files) => {
    if (err) {
      return;
    }

    files.forEach((file) => {
      const fontFilename = file.toLowerCase();
      let fontWeight = "normal";
      let fontStyle = "normal"; // 400

      if (fontFilename.indexOf("thin") !== -1) {
        fontWeight = "100";
      }
      if (fontFilename.indexOf("light") !== -1) {
        fontWeight = "300";
      }
      if (fontFilename.indexOf("extralight") !== -1) {
        fontWeight = "200";
      }
      if (fontFilename.indexOf("medium") !== -1) {
        fontWeight = "500";
      }
      if (fontFilename.indexOf("bold") !== -1) {
        fontWeight = "700";
      }
      if (fontFilename.indexOf("semibold") !== -1) {
        fontWeight = "600";
      }
      if (fontFilename.indexOf("extrabold") !== -1) {
        fontWeight = "800";
      }
      if (fontFilename.indexOf("black") !== -1) {
        fontWeight = "900";
      }
      if (fontFilename.indexOf("italic") !== -1) {

        fontStyle = "italic";
      }
      fonts.push({
        family: file.split("-")[0],
        filename: file.split(".")[0],
        path: "../fonts/",
        style: fontStyle,
        weight: fontWeight,
      });
    });
  });

  gulp.src("gulp-assets/templates/fonts.scss.tpl")
    .pipe(

      consolidate("lodash", { fonts }),
    )
    .pipe(
      rename({
        basename: "_fonts",
        extname: ".scss",
      }),
    )
    .pipe(gulp.dest("src/assets/styles/"))
    .on("finish", done);
});

gulp.task("icon-font", (done) => {
  const iconStream = gulp.src(["gulp-assets/icons/*.svg"]).pipe(
    iconfont({
      fontName: "Fbly-icons",
      formats: ["ttf", "eot", "woff", "woff2", "svg"], // default, 'woff2' and 'svg' are available
      prependUnicode: false,
      timestamp: runTimestamp, // recommended to get consistent builds when watching files
      normalize: true,
      fontHeight: 1000,
      // startUnicode: lastUnicode
    }),
  );

  const iconClassName = "icon";

  parallel(
    [
      function handleGlyphs(cb) {
        iconStream.on("glyphs", (glyphs) => {
          gulp.src("gulp-assets/templates/icons.scss.tpl")
            .pipe(

              consolidate("lodash", {
                className: iconClassName,
                fontName: "Fbly-icons",
                fontPath: "../icon-fonts/",
                glyphs,
              }),
            )
            .pipe(
              rename({
                basename: "_icons",
                extname: ".scss",
              }),
            )
            .pipe(gulp.dest("src/assets/styles/"))
            .on("finish", cb);
        });
      },
      function handleFonts(cb) {
        iconStream.pipe(gulp.dest("src/assets/icon-fonts")).on("finish", cb);
      },
      function createStorybook(cb) {

        iconStream.on("glyphs", (glyphs) => {
          gulp.src("gulp-assets/templates/icons.story.tpl")
            .pipe(

              consolidate("lodash", {
                className: iconClassName,
                glyphs,
              }),
            )
            .pipe(
              rename({
                basename: "icons.story",
                extname: ".ts",
              }),
            )
            .pipe(gulp.dest("src/components/"))
            .on("finish", cb); // set path to export your sample HTML
        });
      },
    ],
    done,
  );
});

gulp.task("default", ["icon-font", "web-font"]);
