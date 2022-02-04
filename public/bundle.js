/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/dom-keyboard/dom_keyboard.js":
/*!***************************************************!*\
  !*** ./node_modules/dom-keyboard/dom_keyboard.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _modules_layout_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/layout.mjs */ \"./node_modules/dom-keyboard/modules/layout.mjs\");\n\n\nlet layouts = [];\n\nfunction makeLayout(width, id) {\n  let layout = new _modules_layout_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"](width, id);\n  layout.fillKeys();\n  layouts.push(layout);\n  return [layout.container, layout.allKeys];\n}\n\nfunction DOMKeyboard(width, id) {\n  [this.node, this.keys] = makeLayout(width, id);\n  this.addEvents();\n}\n\nDOMKeyboard.prototype = {\n  constructor: Keyboard,\n\n  addEvents() {\n    document.addEventListener('keydown', defaultKeyDown.bind(this));\n    document.addEventListener('keyup', defaultKeyUp.bind(this));\n  },\n\n  getKey(selected) {\n    return this.keys.find(k => k.match(selected));\n  },\n\n  onKeyDown(...args) {\n    document.addEventListener('keydown', (e) => keyEvent.call(this, e, args));\n  },\n\n  onKeyUp(...args) {\n    document.addEventListener('keyup', (e) => keyEvent.call(this, e, args));\n  },\n\n  press(selected, time = 100) {\n    let matches = this.keys.filter( key => key.match(selected));\n\n    if (matches.length === 1 && selected === matches[0].shift) {\n      let key = matches[0];\n      let shiftSide = key.side === \"Left\" ? \"Right\" : \"Left\";\n      this.getKey(`Shift${shiftSide}`).press(time * 2);\n      setTimeout(() => key.press(time), time);\n    } else {\n      matches.forEach(key => key.press(time));\n    }\n  },\n\n  typeInto(node, text) {\n    let characters = text.split('');\n    let index = 0;\n    let interval = setInterval(() => {\n      let character = characters[index];\n      this.press(character);\n      node.innerHTML += character;\n      index += 1;\n      if (index >= characters.length) clearInterval(interval);\n    }, 200);\n  },\n}\n\nfunction defaultKeyDown(event) {\n  let key = this.getKey(event.code);\n  key.down();\n}\n\nfunction defaultKeyUp(event) {\n  let key = this.getKey(event.code);\n  key.up();\n}\n\nfunction keyMatch({ key, code }, selected) {\n  return selected.includes(key) || selected.includes(code);\n}\n\nfunction keyEvent(event, args) {\n  let [selected, callback] = parseKeyEventArgs(args);\n  let key = this.getKey(event.code);\n\n  if (selected === null || key.match(selected)) {\n    callback(key);\n  }\n}\n\nfunction parseKeyEventArgs(args) {\n  let selected;\n  let callback;\n\n  if (typeof args[0] === 'function') {\n    selected = null;\n    callback = args[0];\n  } else {\n    selected = args[0];\n    callback = args[1];\n  }\n\n  return [selected, callback];\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOMKeyboard);\n\n\n//# sourceURL=webpack://monkeys/./node_modules/dom-keyboard/dom_keyboard.js?");

/***/ }),

/***/ "./public/javascripts/main.js":
/*!************************************!*\
  !*** ./public/javascripts/main.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_monkey_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/monkey.mjs */ \"./public/javascripts/modules/monkey.mjs\");\n/* harmony import */ var _utils_templates_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/templates.mjs */ \"./public/javascripts/utils/templates.mjs\");\n\n\n\nconst DB_URL = \"http://localhost:3001\";\nconst LEADERBOARD_REFRESH_TIME = 15000;\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  initialPageLoad();\n  setInterval(() => updateLeaderboard(), LEADERBOARD_REFRESH_TIME);\n  const form = document.getElementById(\"picker\");\n  const dataList = document.getElementById(\"choice\");\n\n  form.addEventListener('submit', (e) => {\n    e.preventDefault();\n    addMonkey(form.firstElementChild.value);\n  });\n});\n\nfunction initialPageLoad() {\n  getAllData()\n    .then(monkeys => {\n      const leaderboard = document.getElementById(\"leaderboard\");\n      const names = [];\n      monkeys = monkeys.map(monkey => {\n        names.push(monkey.name);\n        return toTemplateFormat(monkey);\n      });\n      leaderboard.innerHTML = _utils_templates_mjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].leaderboard({ monkeys });\n      fillSelect(names);\n    })\n}\n\nfunction fillSelect(names) {\n  const dataList = document.getElementById(\"choice\");\n  names.forEach(name => {\n    const opt = document.createElement(\"option\");\n    opt.value = name;\n    opt.innerHTML = name;\n    dataList.appendChild(opt);\n  });\n}\n\nfunction getAllData() {\n  return fetch(DB_URL)\n          .then(answer => answer.json());\n}\n\nfunction updateLeaderboard() {\n  getAllData()\n    .then(monkeys => {\n      const leaderboard = document.getElementById(\"leaderboard\");\n\n      monkeys = monkeys.map(toTemplateFormat);\n      leaderboard.innerHTML = _utils_templates_mjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].leaderboard({ monkeys });\n    })\n    .catch(e => console.log(e));\n}\n\nfunction toTemplateFormat({ name, presses, correct, best })  {\n  return {\n    name,\n    fullData: {\n      presses,\n      correct,\n      best,\n    },\n  };\n}\n\nfunction addMonkey(name) {\n  const monkeys = document.getElementById(\"monkeys\");\n\n  const node = document.createElement(\"div\");\n  const monkey = new _modules_monkey_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"](name, node);\n\n  monkeys.appendChild(monkey.node);\n  monkey.run();\n}\n\nconst IDs = {\n  \"Trevor\": 1,\n  \"Josh\": 2,\n  \"Wes\": 3,\n  \"Will\": 4,\n};\nconst HAMLET = \"FRANCISCO at his post. Enter to him BERNARDO\";\n\n\n\n//# sourceURL=webpack://monkeys/./public/javascripts/main.js?");

/***/ }),

/***/ "./node_modules/dom-keyboard/modules/key.mjs":
/*!***************************************************!*\
  !*** ./node_modules/dom-keyboard/modules/key.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction Key({ code, character, shift, flex, side }) {\n  this.code = code;\n  this.node = document.createElement('div');\n  this.node.classList.add('keyboard-key-up');\n  this.node.style.flex = flex;\n  this.character = character;\n  this.shift = shift;\n  this.side = side;\n  this.setType();\n  this.setContent(code);\n}\n\nKey.prototype = {\n  constructor: Key,\n\n  setContent(code) {\n    this.node.dataset.key = code;\n    if (this.type === \"letter\" || this.type === \"arrow\") {\n      this.node.innerHTML = this.character.toUpperCase();\n    } else {\n      let topChar = document.createElement(\"p\");\n      let bottomChar = document.createElement(\"p\");\n      topChar.innerHTML = this.shift || \" \";\n      bottomChar.innerHTML = this.character || \" \";\n      this.node.appendChild(topChar);\n      this.node.appendChild(bottomChar);\n    }\n  },\n\n  setType() {\n    this.type = getType(this.code);\n    this.node.classList.add(`keyboard-key-${this.type}`);\n  },\n\n  down() {\n    this.node.classList.add('keyboard-key-down');\n  },\n\n  up() {\n    this.node.classList.remove('keyboard-key-down');\n  },\n\n  match(selected) {\n    if (selected === null) return false;\n\n    if (Array.isArray(selected)) {\n      return selected.includes(this.code)\n             || selected.includes(this.character)\n             || selected.includes(this.type)\n             || selected.includes(this.shift);\n    } else {\n      return selected === this.code\n             || selected === this.character\n             || selected === this.type\n             || selected === this.shift;\n    }\n  },\n\n  press(time = 100) {\n    this.down();\n    setTimeout(() => this.up(), time);\n  },\n\n  style(cssStyle, newValue) {\n    this.node.style[cssStyle] = newValue\n  },\n};\n\nconst CONTROL_KEYS = [\n  \"Tab\", \"Backspace\", \"Enter\", \"ShiftLeft\", \"ShiftRight\", \"ControlLeft\", \"fn\",\n  \"AltLeft\", \"MetaLeft\", \"MetaRight\", \"AltRight\", \"CapsLock\"\n];\n\nfunction getType(code) {\n  if (code.includes(\"Arrow\")) {\n    return \"arrow\";\n  } else if (code.includes(\"Key\")) {\n    return \"letter\";\n  } else if (code.includes(\"Digit\")) {\n    return \"number\";\n  } else if (CONTROL_KEYS.includes(code)) {\n    return 'control';\n  } else {\n    return \"special\";\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Key);\n\n\n\n//# sourceURL=webpack://monkeys/./node_modules/dom-keyboard/modules/key.mjs?");

/***/ }),

/***/ "./node_modules/dom-keyboard/modules/key_data.mjs":
/*!********************************************************!*\
  !*** ./node_modules/dom-keyboard/modules/key_data.mjs ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst KEY_CODES_BY_ROW = [\n  [\n    \"Backquote\", \"Digit1\", \"Digit2\", \"Digit3\", \"Digit4\", \"Digit5\", \"Digit6\",\n    \"Digit7\", \"Digit8\", \"Digit9\", \"Digit0\", \"Minus\", \"Equal\", \"Backspace\"\n  ],\n  [\n    \"Tab\", \"KeyQ\", \"KeyW\", \"KeyE\", \"KeyR\", \"KeyT\", \"KeyY\", \"KeyU\", \"KeyI\",\n    \"KeyO\", \"KeyP\", \"BracketLeft\", \"BracketRight\", \"Backslash\"\n  ],\n  [\n    \"CapsLock\", \"KeyA\", \"KeyS\", \"KeyD\", \"KeyF\", \"KeyG\", \"KeyH\", \"KeyJ\",\n    \"KeyK\", \"KeyL\", \"Semicolon\", \"Quote\", \"Enter\"\n  ],\n  [\n    \"ShiftLeft\", \"KeyZ\", \"KeyX\", \"KeyC\", \"KeyV\", \"KeyB\", \"KeyN\", \"KeyM\", \"Comma\", \"Period\", \"Slash\", \"ShiftRight\"\n  ],\n  [\n    \"fn\", \"ControlLeft\", \"AltLeft\", \"MetaLeft\", \"Space\", \"MetaRight\", \"AltRight\"\n  ]\n];\n\nconst KEY_DATA_BY_ROW = [\n  {\n    characters: \"`1234567890-=\".split('').concat(\"delete\"),\n    shifts: \"~!@#$%^&*()_+\".split('').concat(null),\n    flexes: (new Array(13).fill(1)).concat(1.5),\n    sides: (new Array(7).fill(\"Left\")).concat(...(new Array(7).fill(\"Right\"))),\n  },\n  {\n    characters: [\"tab\"].concat(\"qwertyuiop[]\\\\\".split('')),\n    shifts: [null].concat(\"QWERTYUIOP{}|\".split('')),\n    flexes: [1.5].concat(new Array(13).fill(1)),\n    sides: (new Array(6).fill(\"Left\")).concat(...(new Array(8).fill(\"Right\"))),\n  },\n  {\n    characters: [\"caps\"].concat(\"asdfghjkl;'\".split('')).concat(\"return\"),\n    shifts: [null].concat(\"ASDFGHJKL:\\\"\".split('')).concat(\"enter\"),\n    flexes: [1.8333].concat(new Array(11).fill(1)).concat(1.8333),\n    sides: (new Array(6).fill(\"Left\")).concat(...(new Array(7).fill(\"Right\"))),\n  },\n  {\n    characters: [\"shift\"].concat(\"zxcvbnm,./\".split('')).concat(\"shift\"),\n    shifts: [null].concat(\"ZXCVBNM<>?\".split('')).concat(null),\n    flexes: [2.413].concat(new Array(10).fill(1)).concat(2.413),\n    sides: (new Array(6).fill(\"Left\")).concat(...(new Array(6).fill(\"Right\"))),\n  },\n  {\n    characters: [\"fn\", \"control\", \"option\", \"command\", \" \", \"command\", \"option\"],\n    shifts: [null, null, \"alt\", \"\\u2318\", null, \"\\u2318\", \"alt\", null],\n    flexes: [1, 1, 1, 1.24, 5.66, 1.25, 1],\n    sides: (new Array(5).fill(\"Left\")).concat(...(new Array(2).fill(\"Right\"))),\n  },\n];\n\nconst UNICODE_ARROWS = {\n  'ArrowUp': \"\\u25B2\",\n  'ArrowLeft': \"\\u25C0\",\n  'ArrowDown': \"\\u25BC\",\n  'ArrowRight': \"\\u25BA\",\n};\n\nconst KEY_DATA = {\n  KEY_CODES_BY_ROW,\n  KEY_DATA_BY_ROW,\n  UNICODE_ARROWS,\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (KEY_DATA);\n\n\n//# sourceURL=webpack://monkeys/./node_modules/dom-keyboard/modules/key_data.mjs?");

/***/ }),

/***/ "./node_modules/dom-keyboard/modules/layout.mjs":
/*!******************************************************!*\
  !*** ./node_modules/dom-keyboard/modules/layout.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _key_data_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./key_data.mjs */ \"./node_modules/dom-keyboard/modules/key_data.mjs\");\n/* harmony import */ var _key_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./key.mjs */ \"./node_modules/dom-keyboard/modules/key.mjs\");\n/* harmony import */ var _styles_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.mjs */ \"./node_modules/dom-keyboard/modules/styles.mjs\");\n\n\n\n\nfunction assignStyles(width) {\n  this.container.classList.add('keyboard-container');\n  this.sizingContainer.classList.add('keyboard-sizing-container');\n  this.container.style.width = width;\n  this.rowsContainer.classList.add('keyboard-all-rows');\n  _styles_mjs__WEBPACK_IMPORTED_MODULE_2__[\"default\"].createCSS(width);\n  setFontSize(this.container);\n}\n\nfunction setFontSize(container) {\n  const width = container.clientWidth\n  container.style.fontSize = `${container.clientWidth / 50}px`;\n  const resizeWatch = new ResizeObserver( () => {\n    const width = container.clientWidth\n    const fontSize = Math.round(container.clientWidth / 50);\n    container.style.fontSize = `${fontSize}px`;\n  });\n\n  resizeWatch.observe(container);\n}\n\nfunction Layout(width, id) {\n  this.container  = document.createElement('div');\n  if (id) this.container.id = id;\n  this.sizingContainer = document.createElement('div');\n  this.rowsContainer = document.createElement('div');\n  this.container.appendChild(this.sizingContainer);\n  this.sizingContainer.appendChild(this.rowsContainer);\n  this.allKeys = [];\n  assignStyles.call(this, width);\n}\n\nLayout.prototype = {\n  constructor: Layout,\n\n  fillKeys() {\n    _key_data_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].KEY_CODES_BY_ROW.forEach( (rowOfCodes, rowNumber) => {\n      let rowNode = document.createElement('div');\n      rowNode.classList.add('keyboard-single-row');\n\n      let rowData = _key_data_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].KEY_DATA_BY_ROW[rowNumber];\n      rowOfCodes.forEach( (code, keyNumber) => {\n        let keyData = {\n          code: code,\n          character: rowData.characters[keyNumber],\n          shift: rowData.shifts[keyNumber],\n          flex: rowData.flexes[keyNumber],\n          side: rowData.sides[keyNumber],\n        };\n        let key = new _key_mjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"](keyData);\n        rowNode.appendChild(key.node);\n        this.allKeys.push(key);\n      });\n      this.rowsContainer.appendChild(rowNode);\n    });\n    let arrowKeysDiv = this.makeArrows();\n    this.rowsContainer.lastElementChild.appendChild(arrowKeysDiv);\n  },\n\n  makeArrows() {\n    let arrowsDiv = document.createElement('div');\n    arrowsDiv.classList.add(\"keyboard-arrows-container\");\n\n    let topDiv = document.createElement('div');\n    this.makeTopArrow(topDiv);\n\n    let bottomDiv = document.createElement('div');\n    this.makeBottomArrows(bottomDiv);\n\n    topDiv.classList.add('keyboard-arrow-row');\n    bottomDiv.classList.add('keyboard-arrow-row');\n\n    arrowsDiv.appendChild(topDiv);\n    arrowsDiv.appendChild(bottomDiv);\n    return arrowsDiv;\n  },\n\n  makeTopArrow(topDiv) {\n    let key = this.makeArrow(\"ArrowUp\");\n    topDiv.appendChild(key.node);\n  },\n\n  makeBottomArrows(bottomDiv) {\n    let keyNames = [\"ArrowLeft\", \"ArrowDown\", \"ArrowRight\"];\n    keyNames.forEach( keyCode => {\n      let key = this.makeArrow(keyCode);\n      bottomDiv.appendChild(key.node);\n    });\n  },\n\n  makeArrow(code) {\n    let arrow = {\n      code: code,\n      character: _key_data_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].UNICODE_ARROWS[code],\n      shift: null,\n      flex: 0.3,\n      side: \"Right\",\n    }\n\n    let key = new _key_mjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"](arrow);\n    this.allKeys.push(key);\n    return key;\n  },\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);\n\n\n//# sourceURL=webpack://monkeys/./node_modules/dom-keyboard/modules/layout.mjs?");

/***/ }),

/***/ "./node_modules/dom-keyboard/modules/styles.mjs":
/*!******************************************************!*\
  !*** ./node_modules/dom-keyboard/modules/styles.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet cssString = \"\";\n\nfunction addCSSClass(name, styles) {\n  let string = `.${name} {`;\n  Object.keys(styles).forEach(attribute => {\n    let attributeName = convertToCssString(attribute);\n    let value = styles[attribute];\n\n    string += `${attributeName}: ${value}; `;\n  });\n\n  cssString += string + \"}\\n\";\n};\n\nfunction convertToCssString(name) {\n  let capital = name.match(/[A-Z]/);\n  while (capital) {\n    let arr = name.split('');\n    let lowercase = capital[0].toLowerCase();\n    arr[capital.index] = `-${lowercase}`;\n    name = arr.join('')\n    capital = name.match(/[A-Z]/);\n  }\n  return name;\n}\n\nconst CLASSES = {};\n\nCLASSES[\"keyboard-key-up\"] = {\n  backgroundColor: \"black\",\n  borderRadius: \"0.25em\",\n  display: \"flex\",\n  justifyContent: \"center\",\n  alignItems: \"center\",\n  borderBottom: \"0.3vw solid grey\",\n  boxShadow: \"-0.2vw 0.2vw lightskyblue\",\n}\n\nCLASSES[\"keyboard-key-down\"] = {\n  position: 'relative',\n  top: \"0.2vw\",\n  left: \"-0.1vw\",\n  boxShadow: \"0 0 lightskyblue\",\n  borderBottom: \"0 solid grey\",\n  transition: \"all 0.1s\",\n}\n\nCLASSES[\"keyboard-key-control\"] = {\n  fontSize: \"0.6em\",\n  flexDirection: \"column\",\n  justifyContent: \"space-around\",\n}\n\nCLASSES[\"keyboard-container\"] = {\n  fontFamily: \"sans-serif\",\n  position: \"relative\",\n  color: \"white\",\n};\n\nCLASSES[\"keyboard-sizing-container\"] = {\n  paddingBottom: \"34%\",\n}\n\nCLASSES[\"keyboard-all-rows\"] = {\n  position: \"absolute\",\n  top: 0,\n  bottom: 0,\n  left: 0,\n  right: 0,\n  display: \"flex\",\n  flexDirection: \"column\",\n};\n\nCLASSES[\"keyboard-single-row\"] = {\n  display: \"flex\",\n  gap: \"1%\",\n  padding: \"0.5%\",\n  alignItems: \"stretch\",\n  alignContent: \"stretch\",\n  justifyContent: \"space-between\",\n  height: \"20%\",\n}\n\nCLASSES[\"keyboard-arrows-container\"] = {\n  flex: 3.33,\n  font: \"0.5em serif\",\n  display: \"flex\",\n  flexDirection: \"column\",\n  alignItems: \"stretch\",\n}\n\nCLASSES[\"keyboard-arrow-row\"] = {\n  flex: 1,\n  display: \"flex\",\n  justifyContent: \"space-around\",\n}\n\nconst TWO_SYMBOL_KEYS_CSS = {\n  flexDirection: \"column\",\n  justifyContent: \"space-around\",\n}\n\naddCSSClass('keyboard-key-number, .keyboard-key-special', TWO_SYMBOL_KEYS_CSS);\n\nconst Style = {};\n\nStyle.createCSS = function(width) {\n  CLASSES[\"keyboard-container\"].width = width;\n\n  Object.keys(CLASSES).forEach(cssClass => {\n    addCSSClass(cssClass, CLASSES[cssClass]);\n  });\n\n  let style = document.createElement('style');\n  style.type = 'text/css';\n  style.innerHTML = cssString;\n  document.head.appendChild(style);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Style);\n\n\n//# sourceURL=webpack://monkeys/./node_modules/dom-keyboard/modules/styles.mjs?");

/***/ }),

/***/ "./public/javascripts/modules/monkey.mjs":
/*!***********************************************!*\
  !*** ./public/javascripts/modules/monkey.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var dom_keyboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dom-keyboard */ \"./node_modules/dom-keyboard/dom_keyboard.js\");\n/* harmony import */ var _utils_templates_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/templates.mjs */ \"./public/javascripts/utils/templates.mjs\");\n\n\n\nconst DB_LOCATION = \"http://localhost:3001/\";\nconst LEFT_PAW = \"../../images/monkey_hand_left.png\";\nconst RIGHT_PAW = \"../../images/monkey_hand_right.png\";\n\nfunction Monkey(name, node) {\n  this.name = name;\n  this.hamletIndex = 0;\n  this.fullData = {\n    presses: 0,\n    correct: 0,\n    best: \"\",\n    hits: {},\n  };\n  this.sendData = {\n    presses: 0,\n    correct: 0,\n    best: \"\",\n    hits: {},\n  };\n  buildMonkeyNode.call(this, node, name);\n}\n\nMonkey.prototype = {\n  constructor: Monkey,\n\n  async hitKey() {\n    const letter = randomLetter();\n    const key = this.keyboard.getKey(letter);\n    await pawPressLetter.call(this, key);\n    key.press();\n    this.output.innerHTML += letter;\n    await pawReset.call(this);\n    this.fullData.presses += 1;\n    this.sendData.presses += 1;\n    this.checkHamlet(letter);\n    this.stats.innerHTML = _utils_templates_mjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].stats(this);\n    if (this.sendData.presses > 100) this.send();\n  },\n\n  checkHamlet(letter) {\n    if (isHamlet.call(this, letter)) {\n      this.hamletIndex += 1;\n      const hamletSlice = HAMLET.slice(0, this.hamletIndex);\n      this.updateCorrect(hamletSlice);\n      if (this.hamletIndex > this.fullData.best.length) {\n        this.fullData.best = hamletSlice\n        this.sendData.best = hamletSlice;\n      }\n    } else {\n      this.hamletIndex = 0;\n      this.output.innerHTML = \"\";\n    }\n  },\n\n  updateCorrect(hamletSlice) {\n    this.fullData.correct += 1;\n    this.sendData.correct += 1;\n\n    this.fullData.hits[hamletSlice] ||= 0;\n    this.fullData.hits[hamletSlice] += 1;\n\n    this.sendData.hits[hamletSlice] ||= 0;\n    this.sendData.hits[hamletSlice] += 1;\n  },\n\n  async run() {\n    await this.hitKey();\n    this.run();\n  },\n\n  send() {\n    const req = new XMLHttpRequest();\n    req.open(\"POST\", DB_LOCATION + `update/${this.name}`);\n    req.setRequestHeader(\"Content-Type\", \"application/json\");\n\n    const data = { ...this.sendData, name: this.name };\n    this.sendData = {\n      ...this.sendData,\n      presses: 0,\n      correct: 0,\n      hits: {},\n    }\n\n    req.send(JSON.stringify(data));\n  },\n}\n\nfunction isHamlet(letter) {\n  let correct = HAMLET[this.hamletIndex];\n  while (/[^a-z]/i.test(correct)) {\n    this.hamletIndex += 1;\n    correct = HAMLET[this.hamletIndex];\n  }\n  return correct.toLowerCase() === letter;\n}\n\nfunction buildMonkeyNode(node, name) {\n  this.node = node;\n  this.keyboard = new dom_keyboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"100%\", `${name}-keyboard`);\n\n  this.node.innerHTML = _utils_templates_mjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].monkey(this);\n  this.output = this.node.getElementsByClassName(\"output\")[0];\n  this.stats = this.node.getElementsByClassName(\"stats\")[0];\n\n  this.paws = buildPaws.call(this);\n\n  this.node.appendChild(this.keyboard.node);\n  this.node.classList.add(\"monkey\");\n}\n\nfunction buildPaws() {\n  const left = document.createElement(\"img\");\n  const right = document.createElement(\"img\");\n\n  left.src = LEFT_PAW;\n  left.alt = \"Left Paw\";\n  right.src = RIGHT_PAW;\n  right.alt = \"Right Paw\";\n\n  left.classList.add(\"paw\", \"left-paw\");\n  right.classList.add(\"paw\", \"right-paw\");\n\n  this.node.appendChild(left)\n  this.node.appendChild(right)\n\n  return { left, right }\n}\n\nfunction pawPressLetter(key) {\n  const promise = new Promise((resolve, reject) => {\n    if (key.side === \"Left\") {\n      const paw = this.paws.left;\n      paw.style.top = `${key.node.offsetTop + (parseInt(paw.height) / 2) + key.node.offsetHeight}px`;\n      paw.style.left = `${key.node.offsetLeft - (parseInt(paw.width) / 2) - key.node.offsetWidth}px`\n    } else {\n      const paw = this.paws.right;\n      paw.style.top = `${key.node.offsetTop + (parseInt(paw.height) / 2) + key.node.offsetHeight}px`;\n      paw.style.left = `${key.node.offsetLeft}px`\n    }\n    setTimeout( () => resolve(), 500);\n  });\n  return promise;\n}\n\nfunction pawReset() {\n  const promise = new Promise((resolve, reject) => {\n    this.paws.left.style.left = null;\n    this.paws.left.style.top = null;\n    this.paws.right.style.left = null;\n    this.paws.right.style.top = null;\n    setTimeout( () => resolve(), 500);\n  });\n  return promise;\n}\n\nconst HAMLET = \"FRANCISCO at his post. Enter to him BERNARDO\";\nconst LETTERS = \"qwertyuiopasdfghjklzxcvbnm\".split(\"\");\n\nfunction randomLetter() {\n  const i = Math.floor(Math.random() * LETTERS.length);\n  return LETTERS[i];\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Monkey);\n\n\n//# sourceURL=webpack://monkeys/./public/javascripts/modules/monkey.mjs?");

/***/ }),

/***/ "./public/javascripts/utils/templates.mjs":
/*!************************************************!*\
  !*** ./public/javascripts/utils/templates.mjs ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Templates = {}\n\nfunction compileTemplate(name) {\n  const node = document.getElementById(name);\n  const template = Handlebars.compile(node.innerHTML);\n\n  if (node.dataset.type = \"partial\") {\n    Handlebars.registerPartial(name, template);\n  }\n\n  name = name.slice(0, name.indexOf(\"_template\"));\n\n  Templates[name] = template;\n  node.remove();\n}\n\ncompileTemplate(\"stats_template\");\ncompileTemplate(\"monkey_template\");\ncompileTemplate(\"leaderboard_template\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Templates);\n\n\n//# sourceURL=webpack://monkeys/./public/javascripts/utils/templates.mjs?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./public/javascripts/main.js");
/******/ 	
/******/ })()
;