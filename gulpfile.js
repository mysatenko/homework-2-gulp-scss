const { src, dest, watch } = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const concat = require("gulp-concat");

// gulp.task("default", function (cb) {
// 	console.log("gulp run");
// 	cb();
// });

const path = {
	src: {
		server: "./src",
		styles: "./src/scss",
		js: "./src/js",
	},
	dest: {
		server: "./dist/",
		styles: "./dist/css",
		js: "./dist/js",
	},
};

let mode = "dev";
const serve = function () {
	browserSync.init({
		server: {
			baseDir: path.src.server,
		},
		port: 5500,
		browser: "google chrome",
	});
};

const sassFn = function () {
	const route = mode === "dev" ? "src" : "dest";
	return src(path.src.styles + "/**/*.scss")
		.pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
		.pipe(dest(path[route].server));
};

const scripts = function () {
	const route = mode === "dev" ? "src" : "dest";
	return src(path.src.server + "/**/*.js")
		.pipe(concat("bundle.js"))
		.pipe(dest(path[route].server));
};

const defaultTask = function () {
	serve();
	sassFn();
	scripts();
	// watch(path.src + "/**/*.html").on("change", function () {
	// 	browserSync.reload();
	// });
	watch(path.src.server + "/**/*.html", function (cb) {
		browserSync.reload();
		cb();
	});
	watch(path.src.styles + "/**/*.scss", function (cb) {
		sassFn();
		browserSync.reload();
		cb();
	});
};

const prod = function (cb) {
	mode = "prod";
	sassFn();
	scripts();

	cb();
};
exports.default = defaultTask;
exports.sass = sassFn;
// exports.prodScripts = prodScripts;
exports.prod = prod;
