;require('/Users/ruman/Documents/dev/express-test/node_modules/source-map-support/source-map-support.js').install();
exports.id = "main";
exports.modules = {

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routes */ "./src/routes/index.ts");


/**
 * @description Express Class
 * @export
 * @class App
 */
class App {
    /**
     *Creates an instance of App.
     * @param {Application} app
     * @memberof App
     */
    constructor() {
        this.app = express__WEBPACK_IMPORTED_MODULE_0___default()();
        this.addMiddleWares();
    }
    /**
     * @description
     * @memberof App
     */
    addMiddleWares() {
        this.app = Object(_routes__WEBPACK_IMPORTED_MODULE_1__["default"])(this.app);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (() => { const { app } = new App(); return app; });


/***/ })

};
//# sourceMappingURL=main.5937769a19543c636159.hot-update.js.map