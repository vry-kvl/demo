(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/nouislider/dist/nouislider.js
  var require_nouislider = __commonJS({
    "node_modules/nouislider/dist/nouislider.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.noUiSlider = {}));
      })(exports, function(exports2) {
        "use strict";
        exports2.PipsMode = void 0;
        (function(PipsMode) {
          PipsMode["Range"] = "range";
          PipsMode["Steps"] = "steps";
          PipsMode["Positions"] = "positions";
          PipsMode["Count"] = "count";
          PipsMode["Values"] = "values";
        })(exports2.PipsMode || (exports2.PipsMode = {}));
        exports2.PipsType = void 0;
        (function(PipsType) {
          PipsType[PipsType["None"] = -1] = "None";
          PipsType[PipsType["NoValue"] = 0] = "NoValue";
          PipsType[PipsType["LargeValue"] = 1] = "LargeValue";
          PipsType[PipsType["SmallValue"] = 2] = "SmallValue";
        })(exports2.PipsType || (exports2.PipsType = {}));
        function isValidFormatter(entry) {
          return isValidPartialFormatter(entry) && typeof entry.from === "function";
        }
        function isValidPartialFormatter(entry) {
          return typeof entry === "object" && typeof entry.to === "function";
        }
        function removeElement(el) {
          el.parentElement.removeChild(el);
        }
        function isSet(value) {
          return value !== null && value !== void 0;
        }
        function preventDefault(e) {
          e.preventDefault();
        }
        function unique(array) {
          return array.filter(function(a) {
            return !this[a] ? this[a] = true : false;
          }, {});
        }
        function closest(value, to) {
          return Math.round(value / to) * to;
        }
        function offset(elem, orientation) {
          var rect = elem.getBoundingClientRect();
          var doc = elem.ownerDocument;
          var docElem = doc.documentElement;
          var pageOffset = getPageOffset(doc);
          if (/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)) {
            pageOffset.x = 0;
          }
          return orientation ? rect.top + pageOffset.y - docElem.clientTop : rect.left + pageOffset.x - docElem.clientLeft;
        }
        function isNumeric(a) {
          return typeof a === "number" && !isNaN(a) && isFinite(a);
        }
        function addClassFor(element, className, duration) {
          if (duration > 0) {
            addClass(element, className);
            setTimeout(function() {
              removeClass(element, className);
            }, duration);
          }
        }
        function limit(a) {
          return Math.max(Math.min(a, 100), 0);
        }
        function asArray(a) {
          return Array.isArray(a) ? a : [a];
        }
        function countDecimals(numStr) {
          numStr = String(numStr);
          var pieces = numStr.split(".");
          return pieces.length > 1 ? pieces[1].length : 0;
        }
        function addClass(el, className) {
          if (el.classList && !/\s/.test(className)) {
            el.classList.add(className);
          } else {
            el.className += " " + className;
          }
        }
        function removeClass(el, className) {
          if (el.classList && !/\s/.test(className)) {
            el.classList.remove(className);
          } else {
            el.className = el.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
          }
        }
        function hasClass(el, className) {
          return el.classList ? el.classList.contains(className) : new RegExp("\\b" + className + "\\b").test(el.className);
        }
        function getPageOffset(doc) {
          var supportPageOffset = window.pageXOffset !== void 0;
          var isCSS1Compat = (doc.compatMode || "") === "CSS1Compat";
          var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? doc.documentElement.scrollLeft : doc.body.scrollLeft;
          var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? doc.documentElement.scrollTop : doc.body.scrollTop;
          return {
            x,
            y
          };
        }
        function getActions() {
          return window.navigator.pointerEnabled ? {
            start: "pointerdown",
            move: "pointermove",
            end: "pointerup"
          } : window.navigator.msPointerEnabled ? {
            start: "MSPointerDown",
            move: "MSPointerMove",
            end: "MSPointerUp"
          } : {
            start: "mousedown touchstart",
            move: "mousemove touchmove",
            end: "mouseup touchend"
          };
        }
        function getSupportsPassive() {
          var supportsPassive = false;
          try {
            var opts = Object.defineProperty({}, "passive", {
              get: function() {
                supportsPassive = true;
              }
            });
            window.addEventListener("test", null, opts);
          } catch (e) {
          }
          return supportsPassive;
        }
        function getSupportsTouchActionNone() {
          return window.CSS && CSS.supports && CSS.supports("touch-action", "none");
        }
        function subRangeRatio(pa, pb) {
          return 100 / (pb - pa);
        }
        function fromPercentage(range, value, startRange) {
          return value * 100 / (range[startRange + 1] - range[startRange]);
        }
        function toPercentage(range, value) {
          return fromPercentage(range, range[0] < 0 ? value + Math.abs(range[0]) : value - range[0], 0);
        }
        function isPercentage(range, value) {
          return value * (range[1] - range[0]) / 100 + range[0];
        }
        function getJ(value, arr) {
          var j = 1;
          while (value >= arr[j]) {
            j += 1;
          }
          return j;
        }
        function toStepping(xVal, xPct, value) {
          if (value >= xVal.slice(-1)[0]) {
            return 100;
          }
          var j = getJ(value, xVal);
          var va = xVal[j - 1];
          var vb = xVal[j];
          var pa = xPct[j - 1];
          var pb = xPct[j];
          return pa + toPercentage([va, vb], value) / subRangeRatio(pa, pb);
        }
        function fromStepping(xVal, xPct, value) {
          if (value >= 100) {
            return xVal.slice(-1)[0];
          }
          var j = getJ(value, xPct);
          var va = xVal[j - 1];
          var vb = xVal[j];
          var pa = xPct[j - 1];
          var pb = xPct[j];
          return isPercentage([va, vb], (value - pa) * subRangeRatio(pa, pb));
        }
        function getStep(xPct, xSteps, snap, value) {
          if (value === 100) {
            return value;
          }
          var j = getJ(value, xPct);
          var a = xPct[j - 1];
          var b = xPct[j];
          if (snap) {
            if (value - a > (b - a) / 2) {
              return b;
            }
            return a;
          }
          if (!xSteps[j - 1]) {
            return value;
          }
          return xPct[j - 1] + closest(value - xPct[j - 1], xSteps[j - 1]);
        }
        var Spectrum = function() {
          function Spectrum2(entry, snap, singleStep) {
            this.xPct = [];
            this.xVal = [];
            this.xSteps = [];
            this.xNumSteps = [];
            this.xHighestCompleteStep = [];
            this.xSteps = [singleStep || false];
            this.xNumSteps = [false];
            this.snap = snap;
            var index;
            var ordered = [];
            Object.keys(entry).forEach(function(index2) {
              ordered.push([asArray(entry[index2]), index2]);
            });
            ordered.sort(function(a, b) {
              return a[0][0] - b[0][0];
            });
            for (index = 0; index < ordered.length; index++) {
              this.handleEntryPoint(ordered[index][1], ordered[index][0]);
            }
            this.xNumSteps = this.xSteps.slice(0);
            for (index = 0; index < this.xNumSteps.length; index++) {
              this.handleStepPoint(index, this.xNumSteps[index]);
            }
          }
          Spectrum2.prototype.getDistance = function(value) {
            var distances = [];
            for (var index = 0; index < this.xNumSteps.length - 1; index++) {
              distances[index] = fromPercentage(this.xVal, value, index);
            }
            return distances;
          };
          Spectrum2.prototype.getAbsoluteDistance = function(value, distances, direction) {
            var xPct_index = 0;
            if (value < this.xPct[this.xPct.length - 1]) {
              while (value > this.xPct[xPct_index + 1]) {
                xPct_index++;
              }
            } else if (value === this.xPct[this.xPct.length - 1]) {
              xPct_index = this.xPct.length - 2;
            }
            if (!direction && value === this.xPct[xPct_index + 1]) {
              xPct_index++;
            }
            if (distances === null) {
              distances = [];
            }
            var start_factor;
            var rest_factor = 1;
            var rest_rel_distance = distances[xPct_index];
            var range_pct = 0;
            var rel_range_distance = 0;
            var abs_distance_counter = 0;
            var range_counter = 0;
            if (direction) {
              start_factor = (value - this.xPct[xPct_index]) / (this.xPct[xPct_index + 1] - this.xPct[xPct_index]);
            } else {
              start_factor = (this.xPct[xPct_index + 1] - value) / (this.xPct[xPct_index + 1] - this.xPct[xPct_index]);
            }
            while (rest_rel_distance > 0) {
              range_pct = this.xPct[xPct_index + 1 + range_counter] - this.xPct[xPct_index + range_counter];
              if (distances[xPct_index + range_counter] * rest_factor + 100 - start_factor * 100 > 100) {
                rel_range_distance = range_pct * start_factor;
                rest_factor = (rest_rel_distance - 100 * start_factor) / distances[xPct_index + range_counter];
                start_factor = 1;
              } else {
                rel_range_distance = distances[xPct_index + range_counter] * range_pct / 100 * rest_factor;
                rest_factor = 0;
              }
              if (direction) {
                abs_distance_counter = abs_distance_counter - rel_range_distance;
                if (this.xPct.length + range_counter >= 1) {
                  range_counter--;
                }
              } else {
                abs_distance_counter = abs_distance_counter + rel_range_distance;
                if (this.xPct.length - range_counter >= 1) {
                  range_counter++;
                }
              }
              rest_rel_distance = distances[xPct_index + range_counter] * rest_factor;
            }
            return value + abs_distance_counter;
          };
          Spectrum2.prototype.toStepping = function(value) {
            value = toStepping(this.xVal, this.xPct, value);
            return value;
          };
          Spectrum2.prototype.fromStepping = function(value) {
            return fromStepping(this.xVal, this.xPct, value);
          };
          Spectrum2.prototype.getStep = function(value) {
            value = getStep(this.xPct, this.xSteps, this.snap, value);
            return value;
          };
          Spectrum2.prototype.getDefaultStep = function(value, isDown, size) {
            var j = getJ(value, this.xPct);
            if (value === 100 || isDown && value === this.xPct[j - 1]) {
              j = Math.max(j - 1, 1);
            }
            return (this.xVal[j] - this.xVal[j - 1]) / size;
          };
          Spectrum2.prototype.getNearbySteps = function(value) {
            var j = getJ(value, this.xPct);
            return {
              stepBefore: {
                startValue: this.xVal[j - 2],
                step: this.xNumSteps[j - 2],
                highestStep: this.xHighestCompleteStep[j - 2]
              },
              thisStep: {
                startValue: this.xVal[j - 1],
                step: this.xNumSteps[j - 1],
                highestStep: this.xHighestCompleteStep[j - 1]
              },
              stepAfter: {
                startValue: this.xVal[j],
                step: this.xNumSteps[j],
                highestStep: this.xHighestCompleteStep[j]
              }
            };
          };
          Spectrum2.prototype.countStepDecimals = function() {
            var stepDecimals = this.xNumSteps.map(countDecimals);
            return Math.max.apply(null, stepDecimals);
          };
          Spectrum2.prototype.hasNoSize = function() {
            return this.xVal[0] === this.xVal[this.xVal.length - 1];
          };
          Spectrum2.prototype.convert = function(value) {
            return this.getStep(this.toStepping(value));
          };
          Spectrum2.prototype.handleEntryPoint = function(index, value) {
            var percentage;
            if (index === "min") {
              percentage = 0;
            } else if (index === "max") {
              percentage = 100;
            } else {
              percentage = parseFloat(index);
            }
            if (!isNumeric(percentage) || !isNumeric(value[0])) {
              throw new Error("noUiSlider: 'range' value isn't numeric.");
            }
            this.xPct.push(percentage);
            this.xVal.push(value[0]);
            var value1 = Number(value[1]);
            if (!percentage) {
              if (!isNaN(value1)) {
                this.xSteps[0] = value1;
              }
            } else {
              this.xSteps.push(isNaN(value1) ? false : value1);
            }
            this.xHighestCompleteStep.push(0);
          };
          Spectrum2.prototype.handleStepPoint = function(i, n) {
            if (!n) {
              return;
            }
            if (this.xVal[i] === this.xVal[i + 1]) {
              this.xSteps[i] = this.xHighestCompleteStep[i] = this.xVal[i];
              return;
            }
            this.xSteps[i] = fromPercentage([this.xVal[i], this.xVal[i + 1]], n, 0) / subRangeRatio(this.xPct[i], this.xPct[i + 1]);
            var totalSteps = (this.xVal[i + 1] - this.xVal[i]) / this.xNumSteps[i];
            var highestStep = Math.ceil(Number(totalSteps.toFixed(3)) - 1);
            var step = this.xVal[i] + this.xNumSteps[i] * highestStep;
            this.xHighestCompleteStep[i] = step;
          };
          return Spectrum2;
        }();
        var defaultFormatter = {
          to: function(value) {
            return value === void 0 ? "" : value.toFixed(2);
          },
          from: Number
        };
        var cssClasses = {
          target: "target",
          base: "base",
          origin: "origin",
          handle: "handle",
          handleLower: "handle-lower",
          handleUpper: "handle-upper",
          touchArea: "touch-area",
          horizontal: "horizontal",
          vertical: "vertical",
          background: "background",
          connect: "connect",
          connects: "connects",
          ltr: "ltr",
          rtl: "rtl",
          textDirectionLtr: "txt-dir-ltr",
          textDirectionRtl: "txt-dir-rtl",
          draggable: "draggable",
          drag: "state-drag",
          tap: "state-tap",
          active: "active",
          tooltip: "tooltip",
          pips: "pips",
          pipsHorizontal: "pips-horizontal",
          pipsVertical: "pips-vertical",
          marker: "marker",
          markerHorizontal: "marker-horizontal",
          markerVertical: "marker-vertical",
          markerNormal: "marker-normal",
          markerLarge: "marker-large",
          markerSub: "marker-sub",
          value: "value",
          valueHorizontal: "value-horizontal",
          valueVertical: "value-vertical",
          valueNormal: "value-normal",
          valueLarge: "value-large",
          valueSub: "value-sub"
        };
        var INTERNAL_EVENT_NS = {
          tooltips: ".__tooltips",
          aria: ".__aria"
        };
        function testStep(parsed, entry) {
          if (!isNumeric(entry)) {
            throw new Error("noUiSlider: 'step' is not numeric.");
          }
          parsed.singleStep = entry;
        }
        function testKeyboardPageMultiplier(parsed, entry) {
          if (!isNumeric(entry)) {
            throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.");
          }
          parsed.keyboardPageMultiplier = entry;
        }
        function testKeyboardMultiplier(parsed, entry) {
          if (!isNumeric(entry)) {
            throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric.");
          }
          parsed.keyboardMultiplier = entry;
        }
        function testKeyboardDefaultStep(parsed, entry) {
          if (!isNumeric(entry)) {
            throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.");
          }
          parsed.keyboardDefaultStep = entry;
        }
        function testRange(parsed, entry) {
          if (typeof entry !== "object" || Array.isArray(entry)) {
            throw new Error("noUiSlider: 'range' is not an object.");
          }
          if (entry.min === void 0 || entry.max === void 0) {
            throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
          }
          parsed.spectrum = new Spectrum(entry, parsed.snap || false, parsed.singleStep);
        }
        function testStart(parsed, entry) {
          entry = asArray(entry);
          if (!Array.isArray(entry) || !entry.length) {
            throw new Error("noUiSlider: 'start' option is incorrect.");
          }
          parsed.handles = entry.length;
          parsed.start = entry;
        }
        function testSnap(parsed, entry) {
          if (typeof entry !== "boolean") {
            throw new Error("noUiSlider: 'snap' option must be a boolean.");
          }
          parsed.snap = entry;
        }
        function testAnimate(parsed, entry) {
          if (typeof entry !== "boolean") {
            throw new Error("noUiSlider: 'animate' option must be a boolean.");
          }
          parsed.animate = entry;
        }
        function testAnimationDuration(parsed, entry) {
          if (typeof entry !== "number") {
            throw new Error("noUiSlider: 'animationDuration' option must be a number.");
          }
          parsed.animationDuration = entry;
        }
        function testConnect(parsed, entry) {
          var connect = [false];
          var i;
          if (entry === "lower") {
            entry = [true, false];
          } else if (entry === "upper") {
            entry = [false, true];
          }
          if (entry === true || entry === false) {
            for (i = 1; i < parsed.handles; i++) {
              connect.push(entry);
            }
            connect.push(false);
          } else if (!Array.isArray(entry) || !entry.length || entry.length !== parsed.handles + 1) {
            throw new Error("noUiSlider: 'connect' option doesn't match handle count.");
          } else {
            connect = entry;
          }
          parsed.connect = connect;
        }
        function testOrientation(parsed, entry) {
          switch (entry) {
            case "horizontal":
              parsed.ort = 0;
              break;
            case "vertical":
              parsed.ort = 1;
              break;
            default:
              throw new Error("noUiSlider: 'orientation' option is invalid.");
          }
        }
        function testMargin(parsed, entry) {
          if (!isNumeric(entry)) {
            throw new Error("noUiSlider: 'margin' option must be numeric.");
          }
          if (entry === 0) {
            return;
          }
          parsed.margin = parsed.spectrum.getDistance(entry);
        }
        function testLimit(parsed, entry) {
          if (!isNumeric(entry)) {
            throw new Error("noUiSlider: 'limit' option must be numeric.");
          }
          parsed.limit = parsed.spectrum.getDistance(entry);
          if (!parsed.limit || parsed.handles < 2) {
            throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.");
          }
        }
        function testPadding(parsed, entry) {
          var index;
          if (!isNumeric(entry) && !Array.isArray(entry)) {
            throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
          }
          if (Array.isArray(entry) && !(entry.length === 2 || isNumeric(entry[0]) || isNumeric(entry[1]))) {
            throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
          }
          if (entry === 0) {
            return;
          }
          if (!Array.isArray(entry)) {
            entry = [entry, entry];
          }
          parsed.padding = [parsed.spectrum.getDistance(entry[0]), parsed.spectrum.getDistance(entry[1])];
          for (index = 0; index < parsed.spectrum.xNumSteps.length - 1; index++) {
            if (parsed.padding[0][index] < 0 || parsed.padding[1][index] < 0) {
              throw new Error("noUiSlider: 'padding' option must be a positive number(s).");
            }
          }
          var totalPadding = entry[0] + entry[1];
          var firstValue = parsed.spectrum.xVal[0];
          var lastValue = parsed.spectrum.xVal[parsed.spectrum.xVal.length - 1];
          if (totalPadding / (lastValue - firstValue) > 1) {
            throw new Error("noUiSlider: 'padding' option must not exceed 100% of the range.");
          }
        }
        function testDirection(parsed, entry) {
          switch (entry) {
            case "ltr":
              parsed.dir = 0;
              break;
            case "rtl":
              parsed.dir = 1;
              break;
            default:
              throw new Error("noUiSlider: 'direction' option was not recognized.");
          }
        }
        function testBehaviour(parsed, entry) {
          if (typeof entry !== "string") {
            throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
          }
          var tap = entry.indexOf("tap") >= 0;
          var drag = entry.indexOf("drag") >= 0;
          var fixed = entry.indexOf("fixed") >= 0;
          var snap = entry.indexOf("snap") >= 0;
          var hover = entry.indexOf("hover") >= 0;
          var unconstrained = entry.indexOf("unconstrained") >= 0;
          var dragAll = entry.indexOf("drag-all") >= 0;
          if (fixed) {
            if (parsed.handles !== 2) {
              throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles");
            }
            testMargin(parsed, parsed.start[1] - parsed.start[0]);
          }
          if (unconstrained && (parsed.margin || parsed.limit)) {
            throw new Error("noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit");
          }
          parsed.events = {
            tap: tap || snap,
            drag,
            dragAll,
            fixed,
            snap,
            hover,
            unconstrained
          };
        }
        function testTooltips(parsed, entry) {
          if (entry === false) {
            return;
          }
          if (entry === true || isValidPartialFormatter(entry)) {
            parsed.tooltips = [];
            for (var i = 0; i < parsed.handles; i++) {
              parsed.tooltips.push(entry);
            }
          } else {
            entry = asArray(entry);
            if (entry.length !== parsed.handles) {
              throw new Error("noUiSlider: must pass a formatter for all handles.");
            }
            entry.forEach(function(formatter) {
              if (typeof formatter !== "boolean" && !isValidPartialFormatter(formatter)) {
                throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.");
              }
            });
            parsed.tooltips = entry;
          }
        }
        function testHandleAttributes(parsed, entry) {
          if (entry.length !== parsed.handles) {
            throw new Error("noUiSlider: must pass a attributes for all handles.");
          }
          parsed.handleAttributes = entry;
        }
        function testAriaFormat(parsed, entry) {
          if (!isValidPartialFormatter(entry)) {
            throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");
          }
          parsed.ariaFormat = entry;
        }
        function testFormat(parsed, entry) {
          if (!isValidFormatter(entry)) {
            throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");
          }
          parsed.format = entry;
        }
        function testKeyboardSupport(parsed, entry) {
          if (typeof entry !== "boolean") {
            throw new Error("noUiSlider: 'keyboardSupport' option must be a boolean.");
          }
          parsed.keyboardSupport = entry;
        }
        function testDocumentElement(parsed, entry) {
          parsed.documentElement = entry;
        }
        function testCssPrefix(parsed, entry) {
          if (typeof entry !== "string" && entry !== false) {
            throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
          }
          parsed.cssPrefix = entry;
        }
        function testCssClasses(parsed, entry) {
          if (typeof entry !== "object") {
            throw new Error("noUiSlider: 'cssClasses' must be an object.");
          }
          if (typeof parsed.cssPrefix === "string") {
            parsed.cssClasses = {};
            Object.keys(entry).forEach(function(key) {
              parsed.cssClasses[key] = parsed.cssPrefix + entry[key];
            });
          } else {
            parsed.cssClasses = entry;
          }
        }
        function testOptions(options) {
          var parsed = {
            margin: null,
            limit: null,
            padding: null,
            animate: true,
            animationDuration: 300,
            ariaFormat: defaultFormatter,
            format: defaultFormatter
          };
          var tests = {
            step: { r: false, t: testStep },
            keyboardPageMultiplier: { r: false, t: testKeyboardPageMultiplier },
            keyboardMultiplier: { r: false, t: testKeyboardMultiplier },
            keyboardDefaultStep: { r: false, t: testKeyboardDefaultStep },
            start: { r: true, t: testStart },
            connect: { r: true, t: testConnect },
            direction: { r: true, t: testDirection },
            snap: { r: false, t: testSnap },
            animate: { r: false, t: testAnimate },
            animationDuration: { r: false, t: testAnimationDuration },
            range: { r: true, t: testRange },
            orientation: { r: false, t: testOrientation },
            margin: { r: false, t: testMargin },
            limit: { r: false, t: testLimit },
            padding: { r: false, t: testPadding },
            behaviour: { r: true, t: testBehaviour },
            ariaFormat: { r: false, t: testAriaFormat },
            format: { r: false, t: testFormat },
            tooltips: { r: false, t: testTooltips },
            keyboardSupport: { r: true, t: testKeyboardSupport },
            documentElement: { r: false, t: testDocumentElement },
            cssPrefix: { r: true, t: testCssPrefix },
            cssClasses: { r: true, t: testCssClasses },
            handleAttributes: { r: false, t: testHandleAttributes }
          };
          var defaults = {
            connect: false,
            direction: "ltr",
            behaviour: "tap",
            orientation: "horizontal",
            keyboardSupport: true,
            cssPrefix: "noUi-",
            cssClasses,
            keyboardPageMultiplier: 5,
            keyboardMultiplier: 1,
            keyboardDefaultStep: 10
          };
          if (options.format && !options.ariaFormat) {
            options.ariaFormat = options.format;
          }
          Object.keys(tests).forEach(function(name) {
            if (!isSet(options[name]) && defaults[name] === void 0) {
              if (tests[name].r) {
                throw new Error("noUiSlider: '" + name + "' is required.");
              }
              return;
            }
            tests[name].t(parsed, !isSet(options[name]) ? defaults[name] : options[name]);
          });
          parsed.pips = options.pips;
          var d = document.createElement("div");
          var msPrefix = d.style.msTransform !== void 0;
          var noPrefix = d.style.transform !== void 0;
          parsed.transformRule = noPrefix ? "transform" : msPrefix ? "msTransform" : "webkitTransform";
          var styles = [
            ["left", "top"],
            ["right", "bottom"]
          ];
          parsed.style = styles[parsed.dir][parsed.ort];
          return parsed;
        }
        function scope(target, options, originalOptions) {
          var actions = getActions();
          var supportsTouchActionNone = getSupportsTouchActionNone();
          var supportsPassive = supportsTouchActionNone && getSupportsPassive();
          var scope_Target = target;
          var scope_Base;
          var scope_Handles;
          var scope_Connects;
          var scope_Pips;
          var scope_Tooltips;
          var scope_Spectrum = options.spectrum;
          var scope_Values = [];
          var scope_Locations = [];
          var scope_HandleNumbers = [];
          var scope_ActiveHandlesCount = 0;
          var scope_Events = {};
          var scope_Document = target.ownerDocument;
          var scope_DocumentElement = options.documentElement || scope_Document.documentElement;
          var scope_Body = scope_Document.body;
          var scope_DirOffset = scope_Document.dir === "rtl" || options.ort === 1 ? 0 : 100;
          function addNodeTo(addTarget, className) {
            var div = scope_Document.createElement("div");
            if (className) {
              addClass(div, className);
            }
            addTarget.appendChild(div);
            return div;
          }
          function addOrigin(base, handleNumber) {
            var origin = addNodeTo(base, options.cssClasses.origin);
            var handle = addNodeTo(origin, options.cssClasses.handle);
            addNodeTo(handle, options.cssClasses.touchArea);
            handle.setAttribute("data-handle", String(handleNumber));
            if (options.keyboardSupport) {
              handle.setAttribute("tabindex", "0");
              handle.addEventListener("keydown", function(event) {
                return eventKeydown(event, handleNumber);
              });
            }
            if (options.handleAttributes !== void 0) {
              var attributes_1 = options.handleAttributes[handleNumber];
              Object.keys(attributes_1).forEach(function(attribute) {
                handle.setAttribute(attribute, attributes_1[attribute]);
              });
            }
            handle.setAttribute("role", "slider");
            handle.setAttribute("aria-orientation", options.ort ? "vertical" : "horizontal");
            if (handleNumber === 0) {
              addClass(handle, options.cssClasses.handleLower);
            } else if (handleNumber === options.handles - 1) {
              addClass(handle, options.cssClasses.handleUpper);
            }
            return origin;
          }
          function addConnect(base, add) {
            if (!add) {
              return false;
            }
            return addNodeTo(base, options.cssClasses.connect);
          }
          function addElements(connectOptions, base) {
            var connectBase = addNodeTo(base, options.cssClasses.connects);
            scope_Handles = [];
            scope_Connects = [];
            scope_Connects.push(addConnect(connectBase, connectOptions[0]));
            for (var i = 0; i < options.handles; i++) {
              scope_Handles.push(addOrigin(base, i));
              scope_HandleNumbers[i] = i;
              scope_Connects.push(addConnect(connectBase, connectOptions[i + 1]));
            }
          }
          function addSlider(addTarget) {
            addClass(addTarget, options.cssClasses.target);
            if (options.dir === 0) {
              addClass(addTarget, options.cssClasses.ltr);
            } else {
              addClass(addTarget, options.cssClasses.rtl);
            }
            if (options.ort === 0) {
              addClass(addTarget, options.cssClasses.horizontal);
            } else {
              addClass(addTarget, options.cssClasses.vertical);
            }
            var textDirection = getComputedStyle(addTarget).direction;
            if (textDirection === "rtl") {
              addClass(addTarget, options.cssClasses.textDirectionRtl);
            } else {
              addClass(addTarget, options.cssClasses.textDirectionLtr);
            }
            return addNodeTo(addTarget, options.cssClasses.base);
          }
          function addTooltip(handle, handleNumber) {
            if (!options.tooltips || !options.tooltips[handleNumber]) {
              return false;
            }
            return addNodeTo(handle.firstChild, options.cssClasses.tooltip);
          }
          function isSliderDisabled() {
            return scope_Target.hasAttribute("disabled");
          }
          function isHandleDisabled(handleNumber) {
            var handleOrigin = scope_Handles[handleNumber];
            return handleOrigin.hasAttribute("disabled");
          }
          function removeTooltips() {
            if (scope_Tooltips) {
              removeEvent("update" + INTERNAL_EVENT_NS.tooltips);
              scope_Tooltips.forEach(function(tooltip) {
                if (tooltip) {
                  removeElement(tooltip);
                }
              });
              scope_Tooltips = null;
            }
          }
          function tooltips() {
            removeTooltips();
            scope_Tooltips = scope_Handles.map(addTooltip);
            bindEvent("update" + INTERNAL_EVENT_NS.tooltips, function(values, handleNumber, unencoded) {
              if (!scope_Tooltips || !options.tooltips) {
                return;
              }
              if (scope_Tooltips[handleNumber] === false) {
                return;
              }
              var formattedValue = values[handleNumber];
              if (options.tooltips[handleNumber] !== true) {
                formattedValue = options.tooltips[handleNumber].to(unencoded[handleNumber]);
              }
              scope_Tooltips[handleNumber].innerHTML = formattedValue;
            });
          }
          function aria() {
            removeEvent("update" + INTERNAL_EVENT_NS.aria);
            bindEvent("update" + INTERNAL_EVENT_NS.aria, function(values, handleNumber, unencoded, tap, positions) {
              scope_HandleNumbers.forEach(function(index) {
                var handle = scope_Handles[index];
                var min = checkHandlePosition(scope_Locations, index, 0, true, true, true);
                var max = checkHandlePosition(scope_Locations, index, 100, true, true, true);
                var now = positions[index];
                var text = String(options.ariaFormat.to(unencoded[index]));
                min = scope_Spectrum.fromStepping(min).toFixed(1);
                max = scope_Spectrum.fromStepping(max).toFixed(1);
                now = scope_Spectrum.fromStepping(now).toFixed(1);
                handle.children[0].setAttribute("aria-valuemin", min);
                handle.children[0].setAttribute("aria-valuemax", max);
                handle.children[0].setAttribute("aria-valuenow", now);
                handle.children[0].setAttribute("aria-valuetext", text);
              });
            });
          }
          function getGroup(pips2) {
            if (pips2.mode === exports2.PipsMode.Range || pips2.mode === exports2.PipsMode.Steps) {
              return scope_Spectrum.xVal;
            }
            if (pips2.mode === exports2.PipsMode.Count) {
              if (pips2.values < 2) {
                throw new Error("noUiSlider: 'values' (>= 2) required for mode 'count'.");
              }
              var interval = pips2.values - 1;
              var spread = 100 / interval;
              var values = [];
              while (interval--) {
                values[interval] = interval * spread;
              }
              values.push(100);
              return mapToRange(values, pips2.stepped);
            }
            if (pips2.mode === exports2.PipsMode.Positions) {
              return mapToRange(pips2.values, pips2.stepped);
            }
            if (pips2.mode === exports2.PipsMode.Values) {
              if (pips2.stepped) {
                return pips2.values.map(function(value) {
                  return scope_Spectrum.fromStepping(scope_Spectrum.getStep(scope_Spectrum.toStepping(value)));
                });
              }
              return pips2.values;
            }
            return [];
          }
          function mapToRange(values, stepped) {
            return values.map(function(value) {
              return scope_Spectrum.fromStepping(stepped ? scope_Spectrum.getStep(value) : value);
            });
          }
          function generateSpread(pips2) {
            function safeIncrement(value, increment) {
              return Number((value + increment).toFixed(7));
            }
            var group = getGroup(pips2);
            var indexes = {};
            var firstInRange = scope_Spectrum.xVal[0];
            var lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length - 1];
            var ignoreFirst = false;
            var ignoreLast = false;
            var prevPct = 0;
            group = unique(group.slice().sort(function(a, b) {
              return a - b;
            }));
            if (group[0] !== firstInRange) {
              group.unshift(firstInRange);
              ignoreFirst = true;
            }
            if (group[group.length - 1] !== lastInRange) {
              group.push(lastInRange);
              ignoreLast = true;
            }
            group.forEach(function(current, index) {
              var step;
              var i;
              var q;
              var low = current;
              var high = group[index + 1];
              var newPct;
              var pctDifference;
              var pctPos;
              var type;
              var steps;
              var realSteps;
              var stepSize;
              var isSteps = pips2.mode === exports2.PipsMode.Steps;
              if (isSteps) {
                step = scope_Spectrum.xNumSteps[index];
              }
              if (!step) {
                step = high - low;
              }
              if (high === void 0) {
                high = low;
              }
              step = Math.max(step, 1e-7);
              for (i = low; i <= high; i = safeIncrement(i, step)) {
                newPct = scope_Spectrum.toStepping(i);
                pctDifference = newPct - prevPct;
                steps = pctDifference / (pips2.density || 1);
                realSteps = Math.round(steps);
                stepSize = pctDifference / realSteps;
                for (q = 1; q <= realSteps; q += 1) {
                  pctPos = prevPct + q * stepSize;
                  indexes[pctPos.toFixed(5)] = [scope_Spectrum.fromStepping(pctPos), 0];
                }
                type = group.indexOf(i) > -1 ? exports2.PipsType.LargeValue : isSteps ? exports2.PipsType.SmallValue : exports2.PipsType.NoValue;
                if (!index && ignoreFirst && i !== high) {
                  type = 0;
                }
                if (!(i === high && ignoreLast)) {
                  indexes[newPct.toFixed(5)] = [i, type];
                }
                prevPct = newPct;
              }
            });
            return indexes;
          }
          function addMarking(spread, filterFunc, formatter) {
            var _a, _b;
            var element = scope_Document.createElement("div");
            var valueSizeClasses = (_a = {}, _a[exports2.PipsType.None] = "", _a[exports2.PipsType.NoValue] = options.cssClasses.valueNormal, _a[exports2.PipsType.LargeValue] = options.cssClasses.valueLarge, _a[exports2.PipsType.SmallValue] = options.cssClasses.valueSub, _a);
            var markerSizeClasses = (_b = {}, _b[exports2.PipsType.None] = "", _b[exports2.PipsType.NoValue] = options.cssClasses.markerNormal, _b[exports2.PipsType.LargeValue] = options.cssClasses.markerLarge, _b[exports2.PipsType.SmallValue] = options.cssClasses.markerSub, _b);
            var valueOrientationClasses = [options.cssClasses.valueHorizontal, options.cssClasses.valueVertical];
            var markerOrientationClasses = [options.cssClasses.markerHorizontal, options.cssClasses.markerVertical];
            addClass(element, options.cssClasses.pips);
            addClass(element, options.ort === 0 ? options.cssClasses.pipsHorizontal : options.cssClasses.pipsVertical);
            function getClasses(type, source) {
              var a = source === options.cssClasses.value;
              var orientationClasses = a ? valueOrientationClasses : markerOrientationClasses;
              var sizeClasses = a ? valueSizeClasses : markerSizeClasses;
              return source + " " + orientationClasses[options.ort] + " " + sizeClasses[type];
            }
            function addSpread(offset2, value, type) {
              type = filterFunc ? filterFunc(value, type) : type;
              if (type === exports2.PipsType.None) {
                return;
              }
              var node = addNodeTo(element, false);
              node.className = getClasses(type, options.cssClasses.marker);
              node.style[options.style] = offset2 + "%";
              if (type > exports2.PipsType.NoValue) {
                node = addNodeTo(element, false);
                node.className = getClasses(type, options.cssClasses.value);
                node.setAttribute("data-value", String(value));
                node.style[options.style] = offset2 + "%";
                node.innerHTML = String(formatter.to(value));
              }
            }
            Object.keys(spread).forEach(function(offset2) {
              addSpread(offset2, spread[offset2][0], spread[offset2][1]);
            });
            return element;
          }
          function removePips() {
            if (scope_Pips) {
              removeElement(scope_Pips);
              scope_Pips = null;
            }
          }
          function pips(pips2) {
            removePips();
            var spread = generateSpread(pips2);
            var filter = pips2.filter;
            var format = pips2.format || {
              to: function(value) {
                return String(Math.round(value));
              }
            };
            scope_Pips = scope_Target.appendChild(addMarking(spread, filter, format));
            return scope_Pips;
          }
          function baseSize() {
            var rect = scope_Base.getBoundingClientRect();
            var alt = "offset" + ["Width", "Height"][options.ort];
            return options.ort === 0 ? rect.width || scope_Base[alt] : rect.height || scope_Base[alt];
          }
          function attachEvent(events, element, callback, data) {
            var method = function(event) {
              var e = fixEvent(event, data.pageOffset, data.target || element);
              if (!e) {
                return false;
              }
              if (isSliderDisabled() && !data.doNotReject) {
                return false;
              }
              if (hasClass(scope_Target, options.cssClasses.tap) && !data.doNotReject) {
                return false;
              }
              if (events === actions.start && e.buttons !== void 0 && e.buttons > 1) {
                return false;
              }
              if (data.hover && e.buttons) {
                return false;
              }
              if (!supportsPassive) {
                e.preventDefault();
              }
              e.calcPoint = e.points[options.ort];
              callback(e, data);
              return;
            };
            var methods = [];
            events.split(" ").forEach(function(eventName) {
              element.addEventListener(eventName, method, supportsPassive ? { passive: true } : false);
              methods.push([eventName, method]);
            });
            return methods;
          }
          function fixEvent(e, pageOffset, eventTarget) {
            var touch = e.type.indexOf("touch") === 0;
            var mouse = e.type.indexOf("mouse") === 0;
            var pointer = e.type.indexOf("pointer") === 0;
            var x = 0;
            var y = 0;
            if (e.type.indexOf("MSPointer") === 0) {
              pointer = true;
            }
            if (e.type === "mousedown" && !e.buttons && !e.touches) {
              return false;
            }
            if (touch) {
              var isTouchOnTarget = function(checkTouch) {
                var target2 = checkTouch.target;
                return target2 === eventTarget || eventTarget.contains(target2) || e.composed && e.composedPath().shift() === eventTarget;
              };
              if (e.type === "touchstart") {
                var targetTouches = Array.prototype.filter.call(e.touches, isTouchOnTarget);
                if (targetTouches.length > 1) {
                  return false;
                }
                x = targetTouches[0].pageX;
                y = targetTouches[0].pageY;
              } else {
                var targetTouch = Array.prototype.find.call(e.changedTouches, isTouchOnTarget);
                if (!targetTouch) {
                  return false;
                }
                x = targetTouch.pageX;
                y = targetTouch.pageY;
              }
            }
            pageOffset = pageOffset || getPageOffset(scope_Document);
            if (mouse || pointer) {
              x = e.clientX + pageOffset.x;
              y = e.clientY + pageOffset.y;
            }
            e.pageOffset = pageOffset;
            e.points = [x, y];
            e.cursor = mouse || pointer;
            return e;
          }
          function calcPointToPercentage(calcPoint) {
            var location2 = calcPoint - offset(scope_Base, options.ort);
            var proposal = location2 * 100 / baseSize();
            proposal = limit(proposal);
            return options.dir ? 100 - proposal : proposal;
          }
          function getClosestHandle(clickedPosition) {
            var smallestDifference = 100;
            var handleNumber = false;
            scope_Handles.forEach(function(handle, index) {
              if (isHandleDisabled(index)) {
                return;
              }
              var handlePosition = scope_Locations[index];
              var differenceWithThisHandle = Math.abs(handlePosition - clickedPosition);
              var clickAtEdge = differenceWithThisHandle === 100 && smallestDifference === 100;
              var isCloser = differenceWithThisHandle < smallestDifference;
              var isCloserAfter = differenceWithThisHandle <= smallestDifference && clickedPosition > handlePosition;
              if (isCloser || isCloserAfter || clickAtEdge) {
                handleNumber = index;
                smallestDifference = differenceWithThisHandle;
              }
            });
            return handleNumber;
          }
          function documentLeave(event, data) {
            if (event.type === "mouseout" && event.target.nodeName === "HTML" && event.relatedTarget === null) {
              eventEnd(event, data);
            }
          }
          function eventMove(event, data) {
            if (navigator.appVersion.indexOf("MSIE 9") === -1 && event.buttons === 0 && data.buttonsProperty !== 0) {
              return eventEnd(event, data);
            }
            var movement = (options.dir ? -1 : 1) * (event.calcPoint - data.startCalcPoint);
            var proposal = movement * 100 / data.baseSize;
            moveHandles(movement > 0, proposal, data.locations, data.handleNumbers, data.connect);
          }
          function eventEnd(event, data) {
            if (data.handle) {
              removeClass(data.handle, options.cssClasses.active);
              scope_ActiveHandlesCount -= 1;
            }
            data.listeners.forEach(function(c) {
              scope_DocumentElement.removeEventListener(c[0], c[1]);
            });
            if (scope_ActiveHandlesCount === 0) {
              removeClass(scope_Target, options.cssClasses.drag);
              setZindex();
              if (event.cursor) {
                scope_Body.style.cursor = "";
                scope_Body.removeEventListener("selectstart", preventDefault);
              }
            }
            data.handleNumbers.forEach(function(handleNumber) {
              fireEvent("change", handleNumber);
              fireEvent("set", handleNumber);
              fireEvent("end", handleNumber);
            });
          }
          function eventStart(event, data) {
            if (data.handleNumbers.some(isHandleDisabled)) {
              return;
            }
            var handle;
            if (data.handleNumbers.length === 1) {
              var handleOrigin = scope_Handles[data.handleNumbers[0]];
              handle = handleOrigin.children[0];
              scope_ActiveHandlesCount += 1;
              addClass(handle, options.cssClasses.active);
            }
            event.stopPropagation();
            var listeners = [];
            var moveEvent = attachEvent(actions.move, scope_DocumentElement, eventMove, {
              target: event.target,
              handle,
              connect: data.connect,
              listeners,
              startCalcPoint: event.calcPoint,
              baseSize: baseSize(),
              pageOffset: event.pageOffset,
              handleNumbers: data.handleNumbers,
              buttonsProperty: event.buttons,
              locations: scope_Locations.slice()
            });
            var endEvent = attachEvent(actions.end, scope_DocumentElement, eventEnd, {
              target: event.target,
              handle,
              listeners,
              doNotReject: true,
              handleNumbers: data.handleNumbers
            });
            var outEvent = attachEvent("mouseout", scope_DocumentElement, documentLeave, {
              target: event.target,
              handle,
              listeners,
              doNotReject: true,
              handleNumbers: data.handleNumbers
            });
            listeners.push.apply(listeners, moveEvent.concat(endEvent, outEvent));
            if (event.cursor) {
              scope_Body.style.cursor = getComputedStyle(event.target).cursor;
              if (scope_Handles.length > 1) {
                addClass(scope_Target, options.cssClasses.drag);
              }
              scope_Body.addEventListener("selectstart", preventDefault, false);
            }
            data.handleNumbers.forEach(function(handleNumber) {
              fireEvent("start", handleNumber);
            });
          }
          function eventTap(event) {
            event.stopPropagation();
            var proposal = calcPointToPercentage(event.calcPoint);
            var handleNumber = getClosestHandle(proposal);
            if (handleNumber === false) {
              return;
            }
            if (!options.events.snap) {
              addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
            }
            setHandle(handleNumber, proposal, true, true);
            setZindex();
            fireEvent("slide", handleNumber, true);
            fireEvent("update", handleNumber, true);
            if (!options.events.snap) {
              fireEvent("change", handleNumber, true);
              fireEvent("set", handleNumber, true);
            } else {
              eventStart(event, { handleNumbers: [handleNumber] });
            }
          }
          function eventHover(event) {
            var proposal = calcPointToPercentage(event.calcPoint);
            var to = scope_Spectrum.getStep(proposal);
            var value = scope_Spectrum.fromStepping(to);
            Object.keys(scope_Events).forEach(function(targetEvent) {
              if (targetEvent.split(".")[0] === "hover") {
                scope_Events[targetEvent].forEach(function(callback) {
                  callback.call(scope_Self, value);
                });
              }
            });
          }
          function eventKeydown(event, handleNumber) {
            if (isSliderDisabled() || isHandleDisabled(handleNumber)) {
              return false;
            }
            var horizontalKeys = ["Left", "Right"];
            var verticalKeys = ["Down", "Up"];
            var largeStepKeys = ["PageDown", "PageUp"];
            var edgeKeys = ["Home", "End"];
            if (options.dir && !options.ort) {
              horizontalKeys.reverse();
            } else if (options.ort && !options.dir) {
              verticalKeys.reverse();
              largeStepKeys.reverse();
            }
            var key = event.key.replace("Arrow", "");
            var isLargeDown = key === largeStepKeys[0];
            var isLargeUp = key === largeStepKeys[1];
            var isDown = key === verticalKeys[0] || key === horizontalKeys[0] || isLargeDown;
            var isUp = key === verticalKeys[1] || key === horizontalKeys[1] || isLargeUp;
            var isMin = key === edgeKeys[0];
            var isMax = key === edgeKeys[1];
            if (!isDown && !isUp && !isMin && !isMax) {
              return true;
            }
            event.preventDefault();
            var to;
            if (isUp || isDown) {
              var direction = isDown ? 0 : 1;
              var steps = getNextStepsForHandle(handleNumber);
              var step = steps[direction];
              if (step === null) {
                return false;
              }
              if (step === false) {
                step = scope_Spectrum.getDefaultStep(scope_Locations[handleNumber], isDown, options.keyboardDefaultStep);
              }
              if (isLargeUp || isLargeDown) {
                step *= options.keyboardPageMultiplier;
              } else {
                step *= options.keyboardMultiplier;
              }
              step = Math.max(step, 1e-7);
              step = (isDown ? -1 : 1) * step;
              to = scope_Values[handleNumber] + step;
            } else if (isMax) {
              to = options.spectrum.xVal[options.spectrum.xVal.length - 1];
            } else {
              to = options.spectrum.xVal[0];
            }
            setHandle(handleNumber, scope_Spectrum.toStepping(to), true, true);
            fireEvent("slide", handleNumber);
            fireEvent("update", handleNumber);
            fireEvent("change", handleNumber);
            fireEvent("set", handleNumber);
            return false;
          }
          function bindSliderEvents(behaviour) {
            if (!behaviour.fixed) {
              scope_Handles.forEach(function(handle, index) {
                attachEvent(actions.start, handle.children[0], eventStart, {
                  handleNumbers: [index]
                });
              });
            }
            if (behaviour.tap) {
              attachEvent(actions.start, scope_Base, eventTap, {});
            }
            if (behaviour.hover) {
              attachEvent(actions.move, scope_Base, eventHover, {
                hover: true
              });
            }
            if (behaviour.drag) {
              scope_Connects.forEach(function(connect, index) {
                if (connect === false || index === 0 || index === scope_Connects.length - 1) {
                  return;
                }
                var handleBefore = scope_Handles[index - 1];
                var handleAfter = scope_Handles[index];
                var eventHolders = [connect];
                var handlesToDrag = [handleBefore, handleAfter];
                var handleNumbersToDrag = [index - 1, index];
                addClass(connect, options.cssClasses.draggable);
                if (behaviour.fixed) {
                  eventHolders.push(handleBefore.children[0]);
                  eventHolders.push(handleAfter.children[0]);
                }
                if (behaviour.dragAll) {
                  handlesToDrag = scope_Handles;
                  handleNumbersToDrag = scope_HandleNumbers;
                }
                eventHolders.forEach(function(eventHolder) {
                  attachEvent(actions.start, eventHolder, eventStart, {
                    handles: handlesToDrag,
                    handleNumbers: handleNumbersToDrag,
                    connect
                  });
                });
              });
            }
          }
          function bindEvent(namespacedEvent, callback) {
            scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
            scope_Events[namespacedEvent].push(callback);
            if (namespacedEvent.split(".")[0] === "update") {
              scope_Handles.forEach(function(a, index) {
                fireEvent("update", index);
              });
            }
          }
          function isInternalNamespace(namespace) {
            return namespace === INTERNAL_EVENT_NS.aria || namespace === INTERNAL_EVENT_NS.tooltips;
          }
          function removeEvent(namespacedEvent) {
            var event = namespacedEvent && namespacedEvent.split(".")[0];
            var namespace = event ? namespacedEvent.substring(event.length) : namespacedEvent;
            Object.keys(scope_Events).forEach(function(bind) {
              var tEvent = bind.split(".")[0];
              var tNamespace = bind.substring(tEvent.length);
              if ((!event || event === tEvent) && (!namespace || namespace === tNamespace)) {
                if (!isInternalNamespace(tNamespace) || namespace === tNamespace) {
                  delete scope_Events[bind];
                }
              }
            });
          }
          function fireEvent(eventName, handleNumber, tap) {
            Object.keys(scope_Events).forEach(function(targetEvent) {
              var eventType = targetEvent.split(".")[0];
              if (eventName === eventType) {
                scope_Events[targetEvent].forEach(function(callback) {
                  callback.call(scope_Self, scope_Values.map(options.format.to), handleNumber, scope_Values.slice(), tap || false, scope_Locations.slice(), scope_Self);
                });
              }
            });
          }
          function checkHandlePosition(reference, handleNumber, to, lookBackward, lookForward, getValue) {
            var distance;
            if (scope_Handles.length > 1 && !options.events.unconstrained) {
              if (lookBackward && handleNumber > 0) {
                distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber - 1], options.margin, false);
                to = Math.max(to, distance);
              }
              if (lookForward && handleNumber < scope_Handles.length - 1) {
                distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber + 1], options.margin, true);
                to = Math.min(to, distance);
              }
            }
            if (scope_Handles.length > 1 && options.limit) {
              if (lookBackward && handleNumber > 0) {
                distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber - 1], options.limit, false);
                to = Math.min(to, distance);
              }
              if (lookForward && handleNumber < scope_Handles.length - 1) {
                distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber + 1], options.limit, true);
                to = Math.max(to, distance);
              }
            }
            if (options.padding) {
              if (handleNumber === 0) {
                distance = scope_Spectrum.getAbsoluteDistance(0, options.padding[0], false);
                to = Math.max(to, distance);
              }
              if (handleNumber === scope_Handles.length - 1) {
                distance = scope_Spectrum.getAbsoluteDistance(100, options.padding[1], true);
                to = Math.min(to, distance);
              }
            }
            to = scope_Spectrum.getStep(to);
            to = limit(to);
            if (to === reference[handleNumber] && !getValue) {
              return false;
            }
            return to;
          }
          function inRuleOrder(v, a) {
            var o = options.ort;
            return (o ? a : v) + ", " + (o ? v : a);
          }
          function moveHandles(upward, proposal, locations, handleNumbers, connect) {
            var proposals = locations.slice();
            var firstHandle = handleNumbers[0];
            var b = [!upward, upward];
            var f = [upward, !upward];
            handleNumbers = handleNumbers.slice();
            if (upward) {
              handleNumbers.reverse();
            }
            if (handleNumbers.length > 1) {
              handleNumbers.forEach(function(handleNumber, o) {
                var to = checkHandlePosition(proposals, handleNumber, proposals[handleNumber] + proposal, b[o], f[o], false);
                if (to === false) {
                  proposal = 0;
                } else {
                  proposal = to - proposals[handleNumber];
                  proposals[handleNumber] = to;
                }
              });
            } else {
              b = f = [true];
            }
            var state = false;
            handleNumbers.forEach(function(handleNumber, o) {
              state = setHandle(handleNumber, locations[handleNumber] + proposal, b[o], f[o]) || state;
            });
            if (state) {
              handleNumbers.forEach(function(handleNumber) {
                fireEvent("update", handleNumber);
                fireEvent("slide", handleNumber);
              });
              if (connect != void 0) {
                fireEvent("drag", firstHandle);
              }
            }
          }
          function transformDirection(a, b) {
            return options.dir ? 100 - a - b : a;
          }
          function updateHandlePosition(handleNumber, to) {
            scope_Locations[handleNumber] = to;
            scope_Values[handleNumber] = scope_Spectrum.fromStepping(to);
            var translation = transformDirection(to, 0) - scope_DirOffset;
            var translateRule = "translate(" + inRuleOrder(translation + "%", "0") + ")";
            scope_Handles[handleNumber].style[options.transformRule] = translateRule;
            updateConnect(handleNumber);
            updateConnect(handleNumber + 1);
          }
          function setZindex() {
            scope_HandleNumbers.forEach(function(handleNumber) {
              var dir = scope_Locations[handleNumber] > 50 ? -1 : 1;
              var zIndex = 3 + (scope_Handles.length + dir * handleNumber);
              scope_Handles[handleNumber].style.zIndex = String(zIndex);
            });
          }
          function setHandle(handleNumber, to, lookBackward, lookForward, exactInput) {
            if (!exactInput) {
              to = checkHandlePosition(scope_Locations, handleNumber, to, lookBackward, lookForward, false);
            }
            if (to === false) {
              return false;
            }
            updateHandlePosition(handleNumber, to);
            return true;
          }
          function updateConnect(index) {
            if (!scope_Connects[index]) {
              return;
            }
            var l = 0;
            var h = 100;
            if (index !== 0) {
              l = scope_Locations[index - 1];
            }
            if (index !== scope_Connects.length - 1) {
              h = scope_Locations[index];
            }
            var connectWidth = h - l;
            var translateRule = "translate(" + inRuleOrder(transformDirection(l, connectWidth) + "%", "0") + ")";
            var scaleRule = "scale(" + inRuleOrder(connectWidth / 100, "1") + ")";
            scope_Connects[index].style[options.transformRule] = translateRule + " " + scaleRule;
          }
          function resolveToValue(to, handleNumber) {
            if (to === null || to === false || to === void 0) {
              return scope_Locations[handleNumber];
            }
            if (typeof to === "number") {
              to = String(to);
            }
            to = options.format.from(to);
            if (to !== false) {
              to = scope_Spectrum.toStepping(to);
            }
            if (to === false || isNaN(to)) {
              return scope_Locations[handleNumber];
            }
            return to;
          }
          function valueSet(input, fireSetEvent, exactInput) {
            var values = asArray(input);
            var isInit = scope_Locations[0] === void 0;
            fireSetEvent = fireSetEvent === void 0 ? true : fireSetEvent;
            if (options.animate && !isInit) {
              addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
            }
            scope_HandleNumbers.forEach(function(handleNumber) {
              setHandle(handleNumber, resolveToValue(values[handleNumber], handleNumber), true, false, exactInput);
            });
            var i = scope_HandleNumbers.length === 1 ? 0 : 1;
            if (isInit && scope_Spectrum.hasNoSize()) {
              exactInput = true;
              scope_Locations[0] = 0;
              if (scope_HandleNumbers.length > 1) {
                var space_1 = 100 / (scope_HandleNumbers.length - 1);
                scope_HandleNumbers.forEach(function(handleNumber) {
                  scope_Locations[handleNumber] = handleNumber * space_1;
                });
              }
            }
            for (; i < scope_HandleNumbers.length; ++i) {
              scope_HandleNumbers.forEach(function(handleNumber) {
                setHandle(handleNumber, scope_Locations[handleNumber], true, true, exactInput);
              });
            }
            setZindex();
            scope_HandleNumbers.forEach(function(handleNumber) {
              fireEvent("update", handleNumber);
              if (values[handleNumber] !== null && fireSetEvent) {
                fireEvent("set", handleNumber);
              }
            });
          }
          function valueReset(fireSetEvent) {
            valueSet(options.start, fireSetEvent);
          }
          function valueSetHandle(handleNumber, value, fireSetEvent, exactInput) {
            handleNumber = Number(handleNumber);
            if (!(handleNumber >= 0 && handleNumber < scope_HandleNumbers.length)) {
              throw new Error("noUiSlider: invalid handle number, got: " + handleNumber);
            }
            setHandle(handleNumber, resolveToValue(value, handleNumber), true, true, exactInput);
            fireEvent("update", handleNumber);
            if (fireSetEvent) {
              fireEvent("set", handleNumber);
            }
          }
          function valueGet(unencoded) {
            if (unencoded === void 0) {
              unencoded = false;
            }
            if (unencoded) {
              return scope_Values.length === 1 ? scope_Values[0] : scope_Values.slice(0);
            }
            var values = scope_Values.map(options.format.to);
            if (values.length === 1) {
              return values[0];
            }
            return values;
          }
          function destroy() {
            removeEvent(INTERNAL_EVENT_NS.aria);
            removeEvent(INTERNAL_EVENT_NS.tooltips);
            Object.keys(options.cssClasses).forEach(function(key) {
              removeClass(scope_Target, options.cssClasses[key]);
            });
            while (scope_Target.firstChild) {
              scope_Target.removeChild(scope_Target.firstChild);
            }
            delete scope_Target.noUiSlider;
          }
          function getNextStepsForHandle(handleNumber) {
            var location2 = scope_Locations[handleNumber];
            var nearbySteps = scope_Spectrum.getNearbySteps(location2);
            var value = scope_Values[handleNumber];
            var increment = nearbySteps.thisStep.step;
            var decrement = null;
            if (options.snap) {
              return [
                value - nearbySteps.stepBefore.startValue || null,
                nearbySteps.stepAfter.startValue - value || null
              ];
            }
            if (increment !== false) {
              if (value + increment > nearbySteps.stepAfter.startValue) {
                increment = nearbySteps.stepAfter.startValue - value;
              }
            }
            if (value > nearbySteps.thisStep.startValue) {
              decrement = nearbySteps.thisStep.step;
            } else if (nearbySteps.stepBefore.step === false) {
              decrement = false;
            } else {
              decrement = value - nearbySteps.stepBefore.highestStep;
            }
            if (location2 === 100) {
              increment = null;
            } else if (location2 === 0) {
              decrement = null;
            }
            var stepDecimals = scope_Spectrum.countStepDecimals();
            if (increment !== null && increment !== false) {
              increment = Number(increment.toFixed(stepDecimals));
            }
            if (decrement !== null && decrement !== false) {
              decrement = Number(decrement.toFixed(stepDecimals));
            }
            return [decrement, increment];
          }
          function getNextSteps() {
            return scope_HandleNumbers.map(getNextStepsForHandle);
          }
          function updateOptions(optionsToUpdate, fireSetEvent) {
            var v = valueGet();
            var updateAble = [
              "margin",
              "limit",
              "padding",
              "range",
              "animate",
              "snap",
              "step",
              "format",
              "pips",
              "tooltips"
            ];
            updateAble.forEach(function(name) {
              if (optionsToUpdate[name] !== void 0) {
                originalOptions[name] = optionsToUpdate[name];
              }
            });
            var newOptions = testOptions(originalOptions);
            updateAble.forEach(function(name) {
              if (optionsToUpdate[name] !== void 0) {
                options[name] = newOptions[name];
              }
            });
            scope_Spectrum = newOptions.spectrum;
            options.margin = newOptions.margin;
            options.limit = newOptions.limit;
            options.padding = newOptions.padding;
            if (options.pips) {
              pips(options.pips);
            } else {
              removePips();
            }
            if (options.tooltips) {
              tooltips();
            } else {
              removeTooltips();
            }
            scope_Locations = [];
            valueSet(isSet(optionsToUpdate.start) ? optionsToUpdate.start : v, fireSetEvent);
          }
          function setupSlider() {
            scope_Base = addSlider(scope_Target);
            addElements(options.connect, scope_Base);
            bindSliderEvents(options.events);
            valueSet(options.start);
            if (options.pips) {
              pips(options.pips);
            }
            if (options.tooltips) {
              tooltips();
            }
            aria();
          }
          setupSlider();
          var scope_Self = {
            destroy,
            steps: getNextSteps,
            on: bindEvent,
            off: removeEvent,
            get: valueGet,
            set: valueSet,
            setHandle: valueSetHandle,
            reset: valueReset,
            __moveHandles: function(upward, proposal, handleNumbers) {
              moveHandles(upward, proposal, scope_Locations, handleNumbers);
            },
            options: originalOptions,
            updateOptions,
            target: scope_Target,
            removePips,
            removeTooltips,
            getPositions: function() {
              return scope_Locations.slice();
            },
            getTooltips: function() {
              return scope_Tooltips;
            },
            getOrigins: function() {
              return scope_Handles;
            },
            pips
          };
          return scope_Self;
        }
        function initialize(target, originalOptions) {
          if (!target || !target.nodeName) {
            throw new Error("noUiSlider: create requires a single element, got: " + target);
          }
          if (target.noUiSlider) {
            throw new Error("noUiSlider: Slider was already initialized.");
          }
          var options = testOptions(originalOptions);
          var api = scope(target, options, originalOptions);
          target.noUiSlider = api;
          return api;
        }
        var nouislider = {
          __spectrum: Spectrum,
          cssClasses,
          create: initialize
        };
        exports2.create = initialize;
        exports2.cssClasses = cssClasses;
        exports2["default"] = nouislider;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    }
  });

  // app/scripts/common/function/price-range.js
  var import_nouislider = __toModule(require_nouislider());
  var rangePrice = class extends HTMLElement {
    constructor() {
      super();
      const numbers = this.querySelectorAll("input[type=number]");
      numbers?.forEach((el) => {
        el.oninput = () => {
          var number1 = +numbers[0].value, number2 = +numbers[1].value;
          if (number1 > number2) {
            var tmp = number1;
            numbers[0].value = number2;
            numbers[1].value = tmp;
          }
          this.waiting != null && clearTimeout(this.waiting);
          this.waiting = setTimeout(() => {
            el.dispatchEvent(new Event("change"));
            this.waiting = null;
          }, 500);
          this.slider.noUiSlider && this.slider?.noUiSlider.set([+numbers[0].value, +numbers[1].value]);
        };
      });
    }
    initSlider() {
      const slider = this.querySelector(".js-range-slider");
      const numbers = this.querySelectorAll("input[type=number]");
      const min = +this.dataset.min;
      const max = +this.dataset.max;
      const minValue = +this.dataset.minValue;
      const maxValue = +this.dataset.maxValue;
      import_nouislider.default.create(slider, {
        start: [minValue, maxValue],
        connect: true,
        step: 1,
        direction: theme.settings.themeLayout,
        range: {
          "min": min,
          "max": max
        }
      });
      slider.noUiSlider.on("slide", (values) => {
        numbers[0].value = +values[0];
        numbers[1].value = +values[1];
      });
      slider.noUiSlider.on("set", (values) => {
        this.waiting != null && clearTimeout(this.waiting);
        this.waiting = setTimeout(() => {
          numbers[0].dispatchEvent(new Event("change"));
          this.waiting = null;
        }, 300);
      });
      this.slider = slider;
      this.sliderCreated = true;
    }
  };
  customElements.define("price-range-slider", rangePrice);

  // app/scripts/common/function/collection-filter.js
  var collectionFilter = class extends HTMLElement {
    constructor() {
      super();
      this.cache = [];
      this.container = this.closest("[data-section-type]");
      this.filterType = this.dataset.type;
      this.andLogic = JSON.parse(this.dataset.andLogic || "false");
      this.form = this.querySelector("form");
      this.init();
    }
    init() {
      this.container.querySelectorAll("input.js-filter")?.forEach((input) => {
        input.addEventListener("change", (e) => {
          let timeout = 100;
          input.type == "range" && (timeout = 300);
          if (this.waiting != null)
            clearTimeout(this.waiting);
          this.waiting = setTimeout(() => {
            !this.andLogic && this.container.querySelectorAll(`input.js-filter[name="${input.name}"]`)?.forEach((i) => i.id != input.id && (i.removeAttribute("checked"), i.checked = false));
            this.updateSort(input);
            this.fetch();
            this.waiting = null;
          }, timeout);
        });
      });
      this.container.querySelector(".js-select-sort")?.addEventListener("change", (e) => {
        const input = this.container.querySelector(`input[value="${e.target.value}"]`);
        input.checked = true;
        input?.dispatchEvent(new Event("change"));
      });
      this.container.dataset.filterStyle == "sidebar" && !this.container.querySelector("price-range-slider")?.sliderCreated && this.container.querySelector("price-range-slider")?.initSlider();
    }
    updateSort(e) {
      if (!e.closest(".js-collection-sort"))
        return;
      this.container.querySelectorAll(".js-sort-label")?.forEach((i) => {
        i.innerHTML = e.tagName == "INPUT" ? e.nextElementSibling.textContent.trim() : e.value;
      });
    }
    getQueryString() {
      const formData = new FormData(this.form);
      const query = new URLSearchParams(formData).toString();
      if (this.filterType == "attribute")
        return query;
      const arrayFilter = [];
      let sort = "";
      query.split("&").map((i) => {
        !i.includes("sort_by=") ? arrayFilter.push(i.split("=")[1]) : sort = i;
      });
      return arrayFilter.join("+") + (sort.length ? `?${sort}` : "");
    }
    fetch() {
      const query = this.getQueryString();
      const findInCache = this.cache.find((i) => i.query == query);
      if (findInCache) {
        const div = document.createElement("div");
        div.innerHTML = findInCache.html;
        this.render(div, findInCache.query);
        div.remove();
        return;
      }
      let url = this.form.action;
      url += this.filterType == "attribute" ? "?" : "/";
      url += query;
      url += this.filterType == "attribute" || query.includes("?") ? "&" : "?";
      url += `section_id=${this.container.dataset.sectionId}`;
      fetch(url).then((e) => e.text()).then((html) => {
        const div = document.createElement("div");
        div.innerHTML = html;
        this.cache.push({
          query,
          html
        });
        this.render(div, query);
        div.remove();
      });
    }
    render(result, searchParams = null) {
      document.querySelectorAll(".js-filter-facet")?.forEach((item, index) => {
        const id = item.dataset.filterIndex ? `[data-filter-index="${item.dataset.filterIndex}"]` : item.id ? `[id="${item.id}"]` : `[class="${item.className}"]`;
        const target = result.querySelector(id);
        if (item.tagName == "INPUT") {
          if (item.type == "radio" || item.type == "checkbox") {
            target?.hasAttribute("checked") ? item.setAttribute("checked", "") : item.removeAttribute("checked");
          } else {
            item.value = target?.value || "";
          }
        } else if (item.tagName == "SELECT") {
          item.value = target?.value || "";
        } else {
          item.innerHTML = target?.innerHTML;
        }
      });
      if (searchParams) {
        let splitCharacter = this.filterType == "attribute" ? "?" : !searchParams.includes("?") || searchParams.includes("?") && searchParams.split("?")[0].length ? "/" : "";
        history.pushState({ searchParams }, "", `${this.form.action}${searchParams && splitCharacter.concat(searchParams)}`);
      }
    }
    toggle() {
      if (this.closest("#sidebar")) {
        this.closest("#sidebar").classList.toggle("active");
        document.body.classList.toggle("sidebar-opened");
        return;
      }
      this.classList.toggle("active");
      this.style.setProperty("max-height", (this.classList.contains("active") ? this.scrollHeight : 0) + "px");
      this.container.dataset.filterStyle == "dropdown" && !this.container.querySelector("price-range-slider")?.sliderCreated && this.container.querySelector("price-range-slider")?.initSlider();
    }
  };
  customElements.define("collection-filter", collectionFilter);

  // app/scripts/common/function/collection-view.js
  var collectionView = class extends HTMLElement {
    constructor() {
      super();
      this.querySelectorAll(".js-collection-view")?.forEach((i) => {
        i.addEventListener("click", (e) => {
          this.changeView(i);
        });
      });
    }
    resize() {
      return [
        {
          match: window.matchMedia(`(max-width: 749px)`).matches,
          run: () => this.querySelector(".js-collection-index-0").dispatchEvent(new Event("click"))
        }
      ];
    }
    changeView(button) {
      this.querySelectorAll(".js-collection-view.active")?.forEach((i) => i.classList.remove("active"));
      button.classList.add("active");
      this.grid = document.querySelector(".js-product-grid");
      if (!this.grid)
        return;
      let classToRemove = [];
      this.grid.classList.forEach((i) => {
        !!i.replace(/[^\d]/g, "").length && classToRemove.push(i);
      });
      this.grid.classList.remove(...classToRemove);
      this.grid.classList.add(...button.dataset.class.split(" "));
      this.setAttribute(button.dataset.class);
    }
    setAttribute(value) {
      if (this.isPosting != null)
        clearTimeout(this.isPosting);
      const attributes = { collectionView: value };
      this.isPosting = fetch(`${theme.routes.cartUpdate}`, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json;"
        },
        body: JSON.stringify({ attributes })
      }).then((e) => {
        e.json().then((e2) => {
          this.isPosting = null;
        });
      }).catch((e) => {
        this.isPosting = null;
      });
    }
  };
  customElements.define("collection-view", collectionView);

  // app/scripts/common/function/infinite-loading.js
  var infiniteLoading = class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      if (!this.dataset.url.length)
        return;
      this.removeEvents();
      window.addEventListener("scroll", this.onScrollHandler.bind(this), false);
    }
    disconnectedCallback() {
      this.removeEvents();
    }
    removeEvents(remove) {
      window.removeEventListener("scroll", this.onScrollHandler.bind(this), false);
      remove && this.remove();
    }
    onScrollHandler() {
      if (this.getBoundingClientRect().top < 1 || this.getBoundingClientRect().top > window.innerHeight || this.waiting)
        return;
      this.fetch();
    }
    fetch() {
      this.waiting = true;
      this.classList.add("loading");
      if (!this.dataset.url.length) {
        this.disconnectedCallback();
        return;
      }
      var url = this.dataset.url;
      url += url.includes("?") ? "&" : "?";
      url += "section_id=" + this.dataset.sectionId;
      fetch(url).then((e) => e.text()).then((html) => {
        const div = document.createElement("div");
        div.innerHTML = html;
        this.render(div);
        div.remove();
      });
    }
    render(newContent) {
      Array.from(newContent.querySelector(".js-product-grid").children)?.forEach((item) => {
        document.querySelector(".js-product-grid").insertAdjacentElement("beforeend", item);
      });
      this.setAttribute("data-url", newContent.querySelector(this.tagName)?.dataset.url);
      this.waiting = false;
      this.classList.remove("loading");
      if (!this.dataset.url.length) {
        this.removeEvents(true);
      }
    }
  };
  customElements.define("infinite-loading", infiniteLoading);

  // app/scripts/common/function/collection-paginate.js
  var collectionPaginate = class {
    constructor(element) {
      this.el = element;
      this.container = this.el.closest("[data-section-id]");
      this.el.querySelectorAll(".js-paginate")?.forEach((i) => {
        i.addEventListener("click", (e) => {
          this.change(i);
        });
      });
    }
    change(button) {
      this.el.querySelectorAll(".js-paginate.active")?.forEach((i) => i.classList.remove("active"));
      button.classList.add("active");
      let value = button.textContent.trim();
      this.el.querySelector(".js-collection-paginate-value").innerHTML = value;
      this.setAttribute(value);
    }
    setAttribute(value) {
      if (this.isPosting != null)
        clearTimeout(this.isPosting);
      const attributes = { collectionPaginate: value };
      this.isPosting = fetch(`${theme.routes.cartUpdate}`, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json;"
        },
        body: JSON.stringify({
          attributes,
          sections: [this.container.dataset.sectionId],
          sections_url: this.el.dataset.base + location.href.split(this.el.dataset.base)[1]
        })
      }).then((e) => {
        e.json().then((e2) => {
          this.isPosting = null;
          let div = document.createElement("div");
          div.innerHTML = e2.sections[this.container.dataset.sectionId];
          this.render(div);
          div.remove();
        });
      }).catch((e) => {
        this.isPosting = null;
      });
    }
    render(div) {
      document.getElementById("mainProducts").innerHTML = div.querySelector("#mainProducts").innerHTML;
    }
  };

  // app/scripts/collection-page.js
  register("collection-page", {
    onLoad: function() {
      const arrayItems = [".js-filter-btn", ".js-collection-sort", ".js-select-sort"];
      arrayItems.forEach((selector) => {
        this.container.querySelector(selector)?.addEventListener("click", (e) => {
          selector == ".js-filter-btn" && e.preventDefault();
          let template = document.querySelector("template#collectionFilter");
          if (template) {
            template.replaceWith(template.content.firstElementChild);
          }
          if (selector == ".js-filter-btn") {
            document.querySelector("collection-filter")?.toggle();
          }
        });
      });
      this.container.querySelector(".js-sidebar-close")?.addEventListener("click", (e) => {
        const sidebar = e.target.closest("#sidebar.active");
        sidebar?.classList.remove("active");
      });
      var paginate = document.querySelector(".js-collection-paginate");
      if (paginate) {
        this.paginate = new collectionPaginate(paginate);
      }
    },
    onUnload: function() {
      this.container.querySelector("collection-view")?.setAttribute(null);
      this.paginate?.setAttribute(null);
    }
  });
  load("*");
})();
