webpackHotUpdate("static/development/pages/index.js",{

/***/ "./containers/ItemsTable/ItemsTable.container.tsx":
/*!********************************************************!*\
  !*** ./containers/ItemsTable/ItemsTable.container.tsx ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd_lib_modal_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd/lib/modal/style/css */ "../node_modules/antd/lib/modal/style/css.js");
/* harmony import */ var antd_lib_modal_style_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_modal_style_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_lib_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd/lib/modal */ "../node_modules/antd/lib/modal/index.js");
/* harmony import */ var antd_lib_modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd_lib_button_style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd/lib/button/style/css */ "../node_modules/antd/lib/button/style/css.js");
/* harmony import */ var antd_lib_button_style_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd_lib_button_style_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd_lib_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd/lib/button */ "../node_modules/antd/lib/button/index.js");
/* harmony import */ var antd_lib_button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd_lib_button__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_flexview__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-flexview */ "../node_modules/react-flexview/lib/index.js");
/* harmony import */ var react_flexview__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_flexview__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_DataTable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/DataTable */ "./containers/ItemsTable/components/DataTable/index.ts");
/* harmony import */ var _components_ItemForm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/ItemForm */ "./containers/ItemsTable/components/ItemForm/index.ts");
/* harmony import */ var _components_FilterEditor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/FilterEditor */ "./containers/ItemsTable/components/FilterEditor/index.ts");




var _jsxFileName = "/Users/abox/han4wluc/next-ts/src/containers/ItemsTable/ItemsTable.container.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement;






function ItemsTable(props) {
  var s = props.store,
      renderAction = props.renderAction;
  return __jsx(react_flexview__WEBPACK_IMPORTED_MODULE_5___default.a, {
    grow: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, __jsx(react_flexview__WEBPACK_IMPORTED_MODULE_5___default.a, {
    column: true,
    grow: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, __jsx(_components_FilterEditor__WEBPACK_IMPORTED_MODULE_8__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: this
  }), __jsx(react_flexview__WEBPACK_IMPORTED_MODULE_5___default.a, {
    hAlignContent: "right",
    height: "64px",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }, __jsx(antd_lib_button__WEBPACK_IMPORTED_MODULE_3___default.a, {
    type: "primary",
    onClick: s.showCreateModal,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  }, "Create")), __jsx(_components_DataTable__WEBPACK_IMPORTED_MODULE_6__["default"], {
    items: s.items,
    loading: s.itemsLoading,
    columns: s.columns,
    deleteItem: s.deleteItem,
    renderAction: renderAction,
    pageInfo: s.pageInfo,
    fetchData: s.fetchData,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: this
  })), __jsx(antd_lib_modal__WEBPACK_IMPORTED_MODULE_1___default.a, {
    title: s.modalTitle,
    onCancel: s.hideModal,
    visible: s.modalVisible,
    width: "60%",
    footer: null,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: this
  }, __jsx(_components_ItemForm__WEBPACK_IMPORTED_MODULE_7__["default"], {
    key: String(s.modalVisible),
    columns: s.columns,
    mode: s.modalMode,
    item: s.currentEditItem,
    loading: s.createItemLoading,
    onSubmit: s.onSubmitForm,
    okText: s.modalTitle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: this
  })));
}

/* harmony default export */ __webpack_exports__["default"] = (ItemsTable);

/***/ }),

/***/ "./containers/ItemsTable/components/FilterEditor/FilterEditor.view.tsx":
/*!*****************************************************************************!*\
  !*** ./containers/ItemsTable/components/FilterEditor/FilterEditor.view.tsx ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/Users/abox/han4wluc/next-ts/src/containers/ItemsTable/components/FilterEditor/FilterEditor.view.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


function FilterEditor() {
  return __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }, "OK");
}

/* harmony default export */ __webpack_exports__["default"] = (FilterEditor);

/***/ }),

/***/ "./containers/ItemsTable/components/FilterEditor/index.ts":
/*!****************************************************************!*\
  !*** ./containers/ItemsTable/components/FilterEditor/index.ts ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FilterEditor_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FilterEditor.view */ "./containers/ItemsTable/components/FilterEditor/FilterEditor.view.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _FilterEditor_view__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ })

})
//# sourceMappingURL=index.js.fe56407f59ad4d5ea089.hot-update.js.map