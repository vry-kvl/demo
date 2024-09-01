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

  // node_modules/lazysizes/lazysizes.js
  var require_lazysizes = __commonJS({
    "node_modules/lazysizes/lazysizes.js"(exports, module) {
      (function(window2, factory) {
        var lazySizes = factory(window2, window2.document, Date);
        window2.lazySizes = lazySizes;
        if (typeof module == "object" && module.exports) {
          module.exports = lazySizes;
        }
      })(typeof window != "undefined" ? window : {}, function l(window2, document2, Date2) {
        "use strict";
        var lazysizes, lazySizesCfg;
        (function() {
          var prop;
          var lazySizesDefaults = {
            lazyClass: "lazyload",
            loadedClass: "lazyloaded",
            loadingClass: "lazyloading",
            preloadClass: "lazypreload",
            errorClass: "lazyerror",
            autosizesClass: "lazyautosizes",
            fastLoadedClass: "ls-is-cached",
            iframeLoadMode: 0,
            srcAttr: "data-src",
            srcsetAttr: "data-srcset",
            sizesAttr: "data-sizes",
            minSize: 40,
            customMedia: {},
            init: true,
            expFactor: 1.5,
            hFac: 0.8,
            loadMode: 2,
            loadHidden: true,
            ricTimeout: 0,
            throttleDelay: 125
          };
          lazySizesCfg = window2.lazySizesConfig || window2.lazysizesConfig || {};
          for (prop in lazySizesDefaults) {
            if (!(prop in lazySizesCfg)) {
              lazySizesCfg[prop] = lazySizesDefaults[prop];
            }
          }
        })();
        if (!document2 || !document2.getElementsByClassName) {
          return {
            init: function() {
            },
            cfg: lazySizesCfg,
            noSupport: true
          };
        }
        var docElem = document2.documentElement;
        var supportPicture = window2.HTMLPictureElement;
        var _addEventListener = "addEventListener";
        var _getAttribute = "getAttribute";
        var addEventListener2 = window2[_addEventListener].bind(window2);
        var setTimeout2 = window2.setTimeout;
        var requestAnimationFrame2 = window2.requestAnimationFrame || setTimeout2;
        var requestIdleCallback = window2.requestIdleCallback;
        var regPicture = /^picture$/i;
        var loadEvents = ["load", "error", "lazyincluded", "_lazyloaded"];
        var regClassCache = {};
        var forEach = Array.prototype.forEach;
        var hasClass = function(ele, cls) {
          if (!regClassCache[cls]) {
            regClassCache[cls] = new RegExp("(\\s|^)" + cls + "(\\s|$)");
          }
          return regClassCache[cls].test(ele[_getAttribute]("class") || "") && regClassCache[cls];
        };
        var addClass = function(ele, cls) {
          if (!hasClass(ele, cls)) {
            ele.setAttribute("class", (ele[_getAttribute]("class") || "").trim() + " " + cls);
          }
        };
        var removeClass = function(ele, cls) {
          var reg;
          if (reg = hasClass(ele, cls)) {
            ele.setAttribute("class", (ele[_getAttribute]("class") || "").replace(reg, " "));
          }
        };
        var addRemoveLoadEvents = function(dom, fn, add) {
          var action = add ? _addEventListener : "removeEventListener";
          if (add) {
            addRemoveLoadEvents(dom, fn);
          }
          loadEvents.forEach(function(evt) {
            dom[action](evt, fn);
          });
        };
        var triggerEvent = function(elem, name, detail, noBubbles, noCancelable) {
          var event = document2.createEvent("Event");
          if (!detail) {
            detail = {};
          }
          detail.instance = lazysizes;
          event.initEvent(name, !noBubbles, !noCancelable);
          event.detail = detail;
          elem.dispatchEvent(event);
          return event;
        };
        var updatePolyfill = function(el, full) {
          var polyfill;
          if (!supportPicture && (polyfill = window2.picturefill || lazySizesCfg.pf)) {
            if (full && full.src && !el[_getAttribute]("srcset")) {
              el.setAttribute("srcset", full.src);
            }
            polyfill({ reevaluate: true, elements: [el] });
          } else if (full && full.src) {
            el.src = full.src;
          }
        };
        var getCSS = function(elem, style) {
          return (getComputedStyle(elem, null) || {})[style];
        };
        var getWidth = function(elem, parent, width) {
          width = width || elem.offsetWidth;
          while (width < lazySizesCfg.minSize && parent && !elem._lazysizesWidth) {
            width = parent.offsetWidth;
            parent = parent.parentNode;
          }
          return width;
        };
        var rAF = function() {
          var running, waiting;
          var firstFns = [];
          var secondFns = [];
          var fns = firstFns;
          var run = function() {
            var runFns = fns;
            fns = firstFns.length ? secondFns : firstFns;
            running = true;
            waiting = false;
            while (runFns.length) {
              runFns.shift()();
            }
            running = false;
          };
          var rafBatch = function(fn, queue) {
            if (running && !queue) {
              fn.apply(this, arguments);
            } else {
              fns.push(fn);
              if (!waiting) {
                waiting = true;
                (document2.hidden ? setTimeout2 : requestAnimationFrame2)(run);
              }
            }
          };
          rafBatch._lsFlush = run;
          return rafBatch;
        }();
        var rAFIt = function(fn, simple) {
          return simple ? function() {
            rAF(fn);
          } : function() {
            var that = this;
            var args = arguments;
            rAF(function() {
              fn.apply(that, args);
            });
          };
        };
        var throttle = function(fn) {
          var running;
          var lastTime = 0;
          var gDelay = lazySizesCfg.throttleDelay;
          var rICTimeout = lazySizesCfg.ricTimeout;
          var run = function() {
            running = false;
            lastTime = Date2.now();
            fn();
          };
          var idleCallback = requestIdleCallback && rICTimeout > 49 ? function() {
            requestIdleCallback(run, { timeout: rICTimeout });
            if (rICTimeout !== lazySizesCfg.ricTimeout) {
              rICTimeout = lazySizesCfg.ricTimeout;
            }
          } : rAFIt(function() {
            setTimeout2(run);
          }, true);
          return function(isPriority) {
            var delay;
            if (isPriority = isPriority === true) {
              rICTimeout = 33;
            }
            if (running) {
              return;
            }
            running = true;
            delay = gDelay - (Date2.now() - lastTime);
            if (delay < 0) {
              delay = 0;
            }
            if (isPriority || delay < 9) {
              idleCallback();
            } else {
              setTimeout2(idleCallback, delay);
            }
          };
        };
        var debounce = function(func) {
          var timeout, timestamp;
          var wait = 99;
          var run = function() {
            timeout = null;
            func();
          };
          var later = function() {
            var last = Date2.now() - timestamp;
            if (last < wait) {
              setTimeout2(later, wait - last);
            } else {
              (requestIdleCallback || run)(run);
            }
          };
          return function() {
            timestamp = Date2.now();
            if (!timeout) {
              timeout = setTimeout2(later, wait);
            }
          };
        };
        var loader = function() {
          var preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;
          var eLvW, elvH, eLtop, eLleft, eLright, eLbottom, isBodyHidden;
          var regImg = /^img$/i;
          var regIframe = /^iframe$/i;
          var supportScroll = "onscroll" in window2 && !/(gle|ing)bot/.test(navigator.userAgent);
          var shrinkExpand = 0;
          var currentExpand = 0;
          var isLoading = 0;
          var lowRuns = -1;
          var resetPreloading = function(e) {
            isLoading--;
            if (!e || isLoading < 0 || !e.target) {
              isLoading = 0;
            }
          };
          var isVisible = function(elem) {
            if (isBodyHidden == null) {
              isBodyHidden = getCSS(document2.body, "visibility") == "hidden";
            }
            return isBodyHidden || !(getCSS(elem.parentNode, "visibility") == "hidden" && getCSS(elem, "visibility") == "hidden");
          };
          var isNestedVisible = function(elem, elemExpand) {
            var outerRect;
            var parent = elem;
            var visible = isVisible(elem);
            eLtop -= elemExpand;
            eLbottom += elemExpand;
            eLleft -= elemExpand;
            eLright += elemExpand;
            while (visible && (parent = parent.offsetParent) && parent != document2.body && parent != docElem) {
              visible = (getCSS(parent, "opacity") || 1) > 0;
              if (visible && getCSS(parent, "overflow") != "visible") {
                outerRect = parent.getBoundingClientRect();
                visible = eLright > outerRect.left && eLleft < outerRect.right && eLbottom > outerRect.top - 1 && eLtop < outerRect.bottom + 1;
              }
            }
            return visible;
          };
          var checkElements = function() {
            var eLlen, i, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal, beforeExpandVal, defaultExpand, preloadExpand, hFac;
            var lazyloadElems = lazysizes.elements;
            if ((loadMode = lazySizesCfg.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)) {
              i = 0;
              lowRuns++;
              for (; i < eLlen; i++) {
                if (!lazyloadElems[i] || lazyloadElems[i]._lazyRace) {
                  continue;
                }
                if (!supportScroll || lazysizes.prematureUnveil && lazysizes.prematureUnveil(lazyloadElems[i])) {
                  unveilElement(lazyloadElems[i]);
                  continue;
                }
                if (!(elemExpandVal = lazyloadElems[i][_getAttribute]("data-expand")) || !(elemExpand = elemExpandVal * 1)) {
                  elemExpand = currentExpand;
                }
                if (!defaultExpand) {
                  defaultExpand = !lazySizesCfg.expand || lazySizesCfg.expand < 1 ? docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370 : lazySizesCfg.expand;
                  lazysizes._defEx = defaultExpand;
                  preloadExpand = defaultExpand * lazySizesCfg.expFactor;
                  hFac = lazySizesCfg.hFac;
                  isBodyHidden = null;
                  if (currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document2.hidden) {
                    currentExpand = preloadExpand;
                    lowRuns = 0;
                  } else if (loadMode > 1 && lowRuns > 1 && isLoading < 6) {
                    currentExpand = defaultExpand;
                  } else {
                    currentExpand = shrinkExpand;
                  }
                }
                if (beforeExpandVal !== elemExpand) {
                  eLvW = innerWidth + elemExpand * hFac;
                  elvH = innerHeight + elemExpand;
                  elemNegativeExpand = elemExpand * -1;
                  beforeExpandVal = elemExpand;
                }
                rect = lazyloadElems[i].getBoundingClientRect();
                if ((eLbottom = rect.bottom) >= elemNegativeExpand && (eLtop = rect.top) <= elvH && (eLright = rect.right) >= elemNegativeExpand * hFac && (eLleft = rect.left) <= eLvW && (eLbottom || eLright || eLleft || eLtop) && (lazySizesCfg.loadHidden || isVisible(lazyloadElems[i])) && (isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4) || isNestedVisible(lazyloadElems[i], elemExpand))) {
                  unveilElement(lazyloadElems[i]);
                  loadedSomething = true;
                  if (isLoading > 9) {
                    break;
                  }
                } else if (!loadedSomething && isCompleted && !autoLoadElem && isLoading < 4 && lowRuns < 4 && loadMode > 2 && (preloadElems[0] || lazySizesCfg.preloadAfterLoad) && (preloadElems[0] || !elemExpandVal && (eLbottom || eLright || eLleft || eLtop || lazyloadElems[i][_getAttribute](lazySizesCfg.sizesAttr) != "auto"))) {
                  autoLoadElem = preloadElems[0] || lazyloadElems[i];
                }
              }
              if (autoLoadElem && !loadedSomething) {
                unveilElement(autoLoadElem);
              }
            }
          };
          var throttledCheckElements = throttle(checkElements);
          var switchLoadingClass = function(e) {
            var elem = e.target;
            if (elem._lazyCache) {
              delete elem._lazyCache;
              return;
            }
            resetPreloading(e);
            addClass(elem, lazySizesCfg.loadedClass);
            removeClass(elem, lazySizesCfg.loadingClass);
            addRemoveLoadEvents(elem, rafSwitchLoadingClass);
            triggerEvent(elem, "lazyloaded");
          };
          var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);
          var rafSwitchLoadingClass = function(e) {
            rafedSwitchLoadingClass({ target: e.target });
          };
          var changeIframeSrc = function(elem, src) {
            var loadMode2 = elem.getAttribute("data-load-mode") || lazySizesCfg.iframeLoadMode;
            if (loadMode2 == 0) {
              elem.contentWindow.location.replace(src);
            } else if (loadMode2 == 1) {
              elem.src = src;
            }
          };
          var handleSources = function(source) {
            var customMedia;
            var sourceSrcset = source[_getAttribute](lazySizesCfg.srcsetAttr);
            if (customMedia = lazySizesCfg.customMedia[source[_getAttribute]("data-media") || source[_getAttribute]("media")]) {
              source.setAttribute("media", customMedia);
            }
            if (sourceSrcset) {
              source.setAttribute("srcset", sourceSrcset);
            }
          };
          var lazyUnveil = rAFIt(function(elem, detail, isAuto, sizes, isImg) {
            var src, srcset, parent, isPicture, event, firesLoad;
            if (!(event = triggerEvent(elem, "lazybeforeunveil", detail)).defaultPrevented) {
              if (sizes) {
                if (isAuto) {
                  addClass(elem, lazySizesCfg.autosizesClass);
                } else {
                  elem.setAttribute("sizes", sizes);
                }
              }
              srcset = elem[_getAttribute](lazySizesCfg.srcsetAttr);
              src = elem[_getAttribute](lazySizesCfg.srcAttr);
              if (isImg) {
                parent = elem.parentNode;
                isPicture = parent && regPicture.test(parent.nodeName || "");
              }
              firesLoad = detail.firesLoad || "src" in elem && (srcset || src || isPicture);
              event = { target: elem };
              addClass(elem, lazySizesCfg.loadingClass);
              if (firesLoad) {
                clearTimeout(resetPreloadingTimer);
                resetPreloadingTimer = setTimeout2(resetPreloading, 2500);
                addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
              }
              if (isPicture) {
                forEach.call(parent.getElementsByTagName("source"), handleSources);
              }
              if (srcset) {
                elem.setAttribute("srcset", srcset);
              } else if (src && !isPicture) {
                if (regIframe.test(elem.nodeName)) {
                  changeIframeSrc(elem, src);
                } else {
                  elem.src = src;
                }
              }
              if (isImg && (srcset || isPicture)) {
                updatePolyfill(elem, { src });
              }
            }
            if (elem._lazyRace) {
              delete elem._lazyRace;
            }
            removeClass(elem, lazySizesCfg.lazyClass);
            rAF(function() {
              var isLoaded = elem.complete && elem.naturalWidth > 1;
              if (!firesLoad || isLoaded) {
                if (isLoaded) {
                  addClass(elem, lazySizesCfg.fastLoadedClass);
                }
                switchLoadingClass(event);
                elem._lazyCache = true;
                setTimeout2(function() {
                  if ("_lazyCache" in elem) {
                    delete elem._lazyCache;
                  }
                }, 9);
              }
              if (elem.loading == "lazy") {
                isLoading--;
              }
            }, true);
          });
          var unveilElement = function(elem) {
            if (elem._lazyRace) {
              return;
            }
            var detail;
            var isImg = regImg.test(elem.nodeName);
            var sizes = isImg && (elem[_getAttribute](lazySizesCfg.sizesAttr) || elem[_getAttribute]("sizes"));
            var isAuto = sizes == "auto";
            if ((isAuto || !isCompleted) && isImg && (elem[_getAttribute]("src") || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesCfg.errorClass) && hasClass(elem, lazySizesCfg.lazyClass)) {
              return;
            }
            detail = triggerEvent(elem, "lazyunveilread").detail;
            if (isAuto) {
              autoSizer.updateElem(elem, true, elem.offsetWidth);
            }
            elem._lazyRace = true;
            isLoading++;
            lazyUnveil(elem, detail, isAuto, sizes, isImg);
          };
          var afterScroll = debounce(function() {
            lazySizesCfg.loadMode = 3;
            throttledCheckElements();
          });
          var altLoadmodeScrollListner = function() {
            if (lazySizesCfg.loadMode == 3) {
              lazySizesCfg.loadMode = 2;
            }
            afterScroll();
          };
          var onload = function() {
            if (isCompleted) {
              return;
            }
            if (Date2.now() - started < 999) {
              setTimeout2(onload, 999);
              return;
            }
            isCompleted = true;
            lazySizesCfg.loadMode = 3;
            throttledCheckElements();
            addEventListener2("scroll", altLoadmodeScrollListner, true);
          };
          return {
            _: function() {
              started = Date2.now();
              lazysizes.elements = document2.getElementsByClassName(lazySizesCfg.lazyClass);
              preloadElems = document2.getElementsByClassName(lazySizesCfg.lazyClass + " " + lazySizesCfg.preloadClass);
              addEventListener2("scroll", throttledCheckElements, true);
              addEventListener2("resize", throttledCheckElements, true);
              addEventListener2("pageshow", function(e) {
                if (e.persisted) {
                  var loadingElements = document2.querySelectorAll("." + lazySizesCfg.loadingClass);
                  if (loadingElements.length && loadingElements.forEach) {
                    requestAnimationFrame2(function() {
                      loadingElements.forEach(function(img) {
                        if (img.complete) {
                          unveilElement(img);
                        }
                      });
                    });
                  }
                }
              });
              if (window2.MutationObserver) {
                new MutationObserver(throttledCheckElements).observe(docElem, { childList: true, subtree: true, attributes: true });
              } else {
                docElem[_addEventListener]("DOMNodeInserted", throttledCheckElements, true);
                docElem[_addEventListener]("DOMAttrModified", throttledCheckElements, true);
                setInterval(throttledCheckElements, 999);
              }
              addEventListener2("hashchange", throttledCheckElements, true);
              ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function(name) {
                document2[_addEventListener](name, throttledCheckElements, true);
              });
              if (/d$|^c/.test(document2.readyState)) {
                onload();
              } else {
                addEventListener2("load", onload);
                document2[_addEventListener]("DOMContentLoaded", throttledCheckElements);
                setTimeout2(onload, 2e4);
              }
              if (lazysizes.elements.length) {
                checkElements();
                rAF._lsFlush();
              } else {
                throttledCheckElements();
              }
            },
            checkElems: throttledCheckElements,
            unveil: unveilElement,
            _aLSL: altLoadmodeScrollListner
          };
        }();
        var autoSizer = function() {
          var autosizesElems;
          var sizeElement = rAFIt(function(elem, parent, event, width) {
            var sources, i, len;
            elem._lazysizesWidth = width;
            width += "px";
            elem.setAttribute("sizes", width);
            if (regPicture.test(parent.nodeName || "")) {
              sources = parent.getElementsByTagName("source");
              for (i = 0, len = sources.length; i < len; i++) {
                sources[i].setAttribute("sizes", width);
              }
            }
            if (!event.detail.dataAttr) {
              updatePolyfill(elem, event.detail);
            }
          });
          var getSizeElement = function(elem, dataAttr, width) {
            var event;
            var parent = elem.parentNode;
            if (parent) {
              width = getWidth(elem, parent, width);
              event = triggerEvent(elem, "lazybeforesizes", { width, dataAttr: !!dataAttr });
              if (!event.defaultPrevented) {
                width = event.detail.width;
                if (width && width !== elem._lazysizesWidth) {
                  sizeElement(elem, parent, event, width);
                }
              }
            }
          };
          var updateElementsSizes = function() {
            var i;
            var len = autosizesElems.length;
            if (len) {
              i = 0;
              for (; i < len; i++) {
                getSizeElement(autosizesElems[i]);
              }
            }
          };
          var debouncedUpdateElementsSizes = debounce(updateElementsSizes);
          return {
            _: function() {
              autosizesElems = document2.getElementsByClassName(lazySizesCfg.autosizesClass);
              addEventListener2("resize", debouncedUpdateElementsSizes);
            },
            checkElems: debouncedUpdateElementsSizes,
            updateElem: getSizeElement
          };
        }();
        var init = function() {
          if (!init.i && document2.getElementsByClassName) {
            init.i = true;
            autoSizer._();
            loader._();
          }
        };
        setTimeout2(function() {
          if (lazySizesCfg.init) {
            init();
          }
        });
        lazysizes = {
          cfg: lazySizesCfg,
          autoSizer,
          loader,
          init,
          uP: updatePolyfill,
          aC: addClass,
          rC: removeClass,
          hC: hasClass,
          fire: triggerEvent,
          gW: getWidth,
          rAF
        };
        return lazysizes;
      });
    }
  });

  // node_modules/lazysizes/plugins/unveilhooks/ls.unveilhooks.js
  var require_ls_unveilhooks = __commonJS({
    "node_modules/lazysizes/plugins/unveilhooks/ls.unveilhooks.js"(exports, module) {
      (function(window2, factory) {
        var globalInstall = function() {
          factory(window2.lazySizes);
          window2.removeEventListener("lazyunveilread", globalInstall, true);
        };
        factory = factory.bind(null, window2, window2.document);
        if (typeof module == "object" && module.exports) {
          factory(require_lazysizes());
        } else if (typeof define == "function" && define.amd) {
          define(["lazysizes"], factory);
        } else if (window2.lazySizes) {
          globalInstall();
        } else {
          window2.addEventListener("lazyunveilread", globalInstall, true);
        }
      })(window, function(window2, document2, lazySizes) {
        "use strict";
        var bgLoad, regBgUrlEscape;
        var uniqueUrls = {};
        if (document2.addEventListener) {
          regBgUrlEscape = /\(|\)|\s|'/;
          bgLoad = function(url, cb) {
            var img = document2.createElement("img");
            img.onload = function() {
              img.onload = null;
              img.onerror = null;
              img = null;
              cb();
            };
            img.onerror = img.onload;
            img.src = url;
            if (img && img.complete && img.onload) {
              img.onload();
            }
          };
          addEventListener("lazybeforeunveil", function(e) {
            if (e.detail.instance != lazySizes) {
              return;
            }
            var tmp, load, bg, poster;
            if (!e.defaultPrevented) {
              var target = e.target;
              if (target.preload == "none") {
                target.preload = target.getAttribute("data-preload") || "auto";
              }
              if (target.getAttribute("data-autoplay") != null) {
                if (target.getAttribute("data-expand") && !target.autoplay) {
                  try {
                    target.play();
                  } catch (er) {
                  }
                } else {
                  requestAnimationFrame(function() {
                    target.setAttribute("data-expand", "-10");
                    lazySizes.aC(target, lazySizes.cfg.lazyClass);
                  });
                }
              }
              tmp = target.getAttribute("data-link");
              if (tmp) {
                addStyleScript(tmp, true);
              }
              tmp = target.getAttribute("data-script");
              if (tmp) {
                e.detail.firesLoad = true;
                load = function() {
                  e.detail.firesLoad = false;
                  lazySizes.fire(target, "_lazyloaded", {}, true, true);
                };
                addStyleScript(tmp, null, load);
              }
              tmp = target.getAttribute("data-require");
              if (tmp) {
                if (lazySizes.cfg.requireJs) {
                  lazySizes.cfg.requireJs([tmp]);
                } else {
                  addStyleScript(tmp);
                }
              }
              bg = target.getAttribute("data-bg");
              if (bg) {
                e.detail.firesLoad = true;
                load = function() {
                  target.style.backgroundImage = "url(" + (regBgUrlEscape.test(bg) ? JSON.stringify(bg) : bg) + ")";
                  e.detail.firesLoad = false;
                  lazySizes.fire(target, "_lazyloaded", {}, true, true);
                };
                bgLoad(bg, load);
              }
              poster = target.getAttribute("data-poster");
              if (poster) {
                e.detail.firesLoad = true;
                load = function() {
                  target.poster = poster;
                  e.detail.firesLoad = false;
                  lazySizes.fire(target, "_lazyloaded", {}, true, true);
                };
                bgLoad(poster, load);
              }
            }
          }, false);
        }
        function addStyleScript(src, style, cb) {
          if (uniqueUrls[src]) {
            return;
          }
          var elem = document2.createElement(style ? "link" : "script");
          var insertElem = document2.getElementsByTagName("script")[0];
          if (style) {
            elem.rel = "stylesheet";
            elem.href = src;
          } else {
            elem.onload = function() {
              elem.onerror = null;
              elem.onload = null;
              cb();
            };
            elem.onerror = elem.onload;
            elem.src = src;
          }
          uniqueUrls[src] = true;
          uniqueUrls[elem.src || elem.href] = true;
          insertElem.parentNode.insertBefore(elem, insertElem);
        }
      });
    }
  });

  // node_modules/lazysizes/plugins/parent-fit/ls.parent-fit.js
  var require_ls_parent_fit = __commonJS({
    "node_modules/lazysizes/plugins/parent-fit/ls.parent-fit.js"(exports, module) {
      (function(window2, factory) {
        if (!window2) {
          return;
        }
        var globalInstall = function() {
          factory(window2.lazySizes);
          window2.removeEventListener("lazyunveilread", globalInstall, true);
        };
        factory = factory.bind(null, window2, window2.document);
        if (typeof module == "object" && module.exports) {
          factory(require_lazysizes());
        } else if (typeof define == "function" && define.amd) {
          define(["lazysizes"], factory);
        } else if (window2.lazySizes) {
          globalInstall();
        } else {
          window2.addEventListener("lazyunveilread", globalInstall, true);
        }
      })(typeof window != "undefined" ? window : 0, function(window2, document2, lazySizes) {
        "use strict";
        if (!window2.addEventListener) {
          return;
        }
        var regDescriptors = /\s+(\d+)(w|h)\s+(\d+)(w|h)/;
        var regCssFit = /parent-fit["']*\s*:\s*["']*(contain|cover|width)/;
        var regCssObject = /parent-container["']*\s*:\s*["']*(.+?)(?=(\s|$|,|'|"|;))/;
        var regPicture = /^picture$/i;
        var cfg = lazySizes.cfg;
        var getCSS = function(elem) {
          return getComputedStyle(elem, null) || {};
        };
        var parentFit = {
          getParent: function(element, parentSel) {
            var parent = element;
            var parentNode = element.parentNode;
            if ((!parentSel || parentSel == "prev") && parentNode && regPicture.test(parentNode.nodeName || "")) {
              parentNode = parentNode.parentNode;
            }
            if (parentSel != "self") {
              if (parentSel == "prev") {
                parent = element.previousElementSibling;
              } else if (parentSel && (parentNode.closest || window2.jQuery)) {
                parent = (parentNode.closest ? parentNode.closest(parentSel) : jQuery(parentNode).closest(parentSel)[0]) || parentNode;
              } else {
                parent = parentNode;
              }
            }
            return parent;
          },
          getFit: function(element) {
            var tmpMatch, parentObj;
            var css = getCSS(element);
            var content = css.content || css.fontFamily;
            var obj = {
              fit: element._lazysizesParentFit || element.getAttribute("data-parent-fit")
            };
            if (!obj.fit && content && (tmpMatch = content.match(regCssFit))) {
              obj.fit = tmpMatch[1];
            }
            if (obj.fit) {
              parentObj = element._lazysizesParentContainer || element.getAttribute("data-parent-container");
              if (!parentObj && content && (tmpMatch = content.match(regCssObject))) {
                parentObj = tmpMatch[1];
              }
              obj.parent = parentFit.getParent(element, parentObj);
            } else {
              obj.fit = css.objectFit;
            }
            return obj;
          },
          getImageRatio: function(element) {
            var i, srcset, media, ratio, match, width, height;
            var parent = element.parentNode;
            var elements = parent && regPicture.test(parent.nodeName || "") ? parent.querySelectorAll("source, img") : [element];
            for (i = 0; i < elements.length; i++) {
              element = elements[i];
              srcset = element.getAttribute(cfg.srcsetAttr) || element.getAttribute("srcset") || element.getAttribute("data-pfsrcset") || element.getAttribute("data-risrcset") || "";
              media = element._lsMedia || element.getAttribute("media");
              media = cfg.customMedia[element.getAttribute("data-media") || media] || media;
              if (srcset && (!media || (window2.matchMedia && matchMedia(media) || {}).matches)) {
                ratio = parseFloat(element.getAttribute("data-aspectratio"));
                if (!ratio) {
                  match = srcset.match(regDescriptors);
                  if (match) {
                    if (match[2] == "w") {
                      width = match[1];
                      height = match[3];
                    } else {
                      width = match[3];
                      height = match[1];
                    }
                  } else {
                    width = element.getAttribute("width");
                    height = element.getAttribute("height");
                  }
                  ratio = width / height;
                }
                break;
              }
            }
            return ratio;
          },
          calculateSize: function(element, width) {
            var displayRatio, height, imageRatio, retWidth;
            var fitObj = this.getFit(element);
            var fit = fitObj.fit;
            var fitElem = fitObj.parent;
            if (fit != "width" && (fit != "contain" && fit != "cover" || !(imageRatio = this.getImageRatio(element)))) {
              return width;
            }
            if (fitElem) {
              width = fitElem.clientWidth;
            } else {
              fitElem = element;
            }
            retWidth = width;
            if (fit == "width") {
              retWidth = width;
            } else {
              height = fitElem.clientHeight;
              if ((displayRatio = width / height) && (fit == "cover" && displayRatio < imageRatio || fit == "contain" && displayRatio > imageRatio)) {
                retWidth = width * (imageRatio / displayRatio);
              }
            }
            return retWidth;
          }
        };
        lazySizes.parentFit = parentFit;
        document2.addEventListener("lazybeforesizes", function(e) {
          if (e.defaultPrevented || e.detail.instance != lazySizes) {
            return;
          }
          var element = e.target;
          e.detail.width = parentFit.calculateSize(element, e.detail.width);
        });
      });
    }
  });

  // node_modules/lazysizes/plugins/object-fit/ls.object-fit.js
  var require_ls_object_fit = __commonJS({
    "node_modules/lazysizes/plugins/object-fit/ls.object-fit.js"(exports, module) {
      (function(window2, factory) {
        if (!window2) {
          return;
        }
        var globalInstall = function(initialEvent) {
          factory(window2.lazySizes, initialEvent);
          window2.removeEventListener("lazyunveilread", globalInstall, true);
        };
        factory = factory.bind(null, window2, window2.document);
        if (typeof module == "object" && module.exports) {
          factory(require_lazysizes());
        } else if (typeof define == "function" && define.amd) {
          define(["lazysizes"], factory);
        } else if (window2.lazySizes) {
          globalInstall();
        } else {
          window2.addEventListener("lazyunveilread", globalInstall, true);
        }
      })(typeof window != "undefined" ? window : 0, function(window2, document2, lazySizes, initialEvent) {
        "use strict";
        var cloneElementClass;
        var style = document2.createElement("a").style;
        var fitSupport = "objectFit" in style;
        var positionSupport = fitSupport && "objectPosition" in style;
        var regCssFit = /object-fit["']*\s*:\s*["']*(contain|cover)/;
        var regCssPosition = /object-position["']*\s*:\s*["']*(.+?)(?=($|,|'|"|;))/;
        var blankSrc = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
        var regBgUrlEscape = /\(|\)|'/;
        var positionDefaults = {
          center: "center",
          "50% 50%": "center"
        };
        function getObject(element) {
          var css = getComputedStyle(element, null) || {};
          var content = css.fontFamily || "";
          var objectFit = content.match(regCssFit) || "";
          var objectPosition = objectFit && content.match(regCssPosition) || "";
          if (objectPosition) {
            objectPosition = objectPosition[1];
          }
          return {
            fit: objectFit && objectFit[1] || "",
            position: positionDefaults[objectPosition] || objectPosition || "center"
          };
        }
        function generateStyleClass() {
          if (cloneElementClass) {
            return;
          }
          var styleElement = document2.createElement("style");
          cloneElementClass = lazySizes.cfg.objectFitClass || "lazysizes-display-clone";
          document2.querySelector("head").appendChild(styleElement);
        }
        function removePrevClone(element) {
          var prev = element.previousElementSibling;
          if (prev && lazySizes.hC(prev, cloneElementClass)) {
            prev.parentNode.removeChild(prev);
            element.style.position = prev.getAttribute("data-position") || "";
            element.style.visibility = prev.getAttribute("data-visibility") || "";
          }
        }
        function initFix(element, config) {
          var switchClassesAdded, addedSrc, styleElement, styleElementStyle;
          var lazysizesCfg = lazySizes.cfg;
          var onChange = function() {
            var src = element.currentSrc || element.src;
            if (src && addedSrc !== src) {
              addedSrc = src;
              styleElementStyle.backgroundImage = "url(" + (regBgUrlEscape.test(src) ? JSON.stringify(src) : src) + ")";
              if (!switchClassesAdded) {
                switchClassesAdded = true;
                lazySizes.rC(styleElement, lazysizesCfg.loadingClass);
                lazySizes.aC(styleElement, lazysizesCfg.loadedClass);
              }
            }
          };
          var rafedOnChange = function() {
            lazySizes.rAF(onChange);
          };
          element._lazysizesParentFit = config.fit;
          element.addEventListener("lazyloaded", rafedOnChange, true);
          element.addEventListener("load", rafedOnChange, true);
          lazySizes.rAF(function() {
            var hideElement = element;
            var container = element.parentNode;
            if (container.nodeName.toUpperCase() == "PICTURE") {
              hideElement = container;
              container = container.parentNode;
            }
            removePrevClone(hideElement);
            if (!cloneElementClass) {
              generateStyleClass();
            }
            styleElement = element.cloneNode(false);
            styleElementStyle = styleElement.style;
            styleElement.addEventListener("load", function() {
              var curSrc = styleElement.currentSrc || styleElement.src;
              if (curSrc && curSrc != blankSrc) {
                styleElement.src = blankSrc;
                styleElement.srcset = "";
              }
            });
            lazySizes.rC(styleElement, lazysizesCfg.loadedClass);
            lazySizes.rC(styleElement, lazysizesCfg.lazyClass);
            lazySizes.rC(styleElement, lazysizesCfg.autosizesClass);
            lazySizes.aC(styleElement, lazysizesCfg.loadingClass);
            lazySizes.aC(styleElement, cloneElementClass);
            [
              "data-parent-fit",
              "data-parent-container",
              "data-object-fit-polyfilled",
              lazysizesCfg.srcsetAttr,
              lazysizesCfg.srcAttr
            ].forEach(function(attr) {
              styleElement.removeAttribute(attr);
            });
            styleElement.src = blankSrc;
            styleElement.srcset = "";
            styleElementStyle.backgroundRepeat = "no-repeat";
            styleElementStyle.backgroundPosition = config.position;
            styleElementStyle.backgroundSize = config.fit;
            styleElement.setAttribute("data-position", hideElement.style.position);
            styleElement.setAttribute("data-visibility", hideElement.style.visibility);
            hideElement.style.visibility = "hidden";
            hideElement.style.position = "absolute";
            element.setAttribute("data-parent-fit", config.fit);
            element.setAttribute("data-parent-container", "prev");
            element.setAttribute("data-object-fit-polyfilled", "");
            element._objectFitPolyfilledDisplay = styleElement;
            container.insertBefore(styleElement, hideElement);
            if (element._lazysizesParentFit) {
              delete element._lazysizesParentFit;
            }
            if (element.complete) {
              onChange();
            }
          });
        }
        if (!fitSupport || !positionSupport) {
          var onRead = function(e) {
            if (e.detail.instance != lazySizes) {
              return;
            }
            var element = e.target;
            var obj = getObject(element);
            if (obj.fit && (!fitSupport || obj.position != "center")) {
              initFix(element, obj);
              return true;
            }
            return false;
          };
          window2.addEventListener("lazybeforesizes", function(e) {
            if (e.detail.instance != lazySizes) {
              return;
            }
            var element = e.target;
            if (element.getAttribute("data-object-fit-polyfilled") != null && !element._objectFitPolyfilledDisplay) {
              if (!onRead(e)) {
                lazySizes.rAF(function() {
                  element.removeAttribute("data-object-fit-polyfilled");
                });
              }
            }
          });
          window2.addEventListener("lazyunveilread", onRead, true);
          if (initialEvent && initialEvent.detail) {
            onRead(initialEvent);
          }
        }
      });
    }
  });

  // node_modules/lazysizes/plugins/bgset/ls.bgset.js
  var require_ls_bgset = __commonJS({
    "node_modules/lazysizes/plugins/bgset/ls.bgset.js"(exports, module) {
      (function(window2, factory) {
        var globalInstall = function() {
          factory(window2.lazySizes);
          window2.removeEventListener("lazyunveilread", globalInstall, true);
        };
        factory = factory.bind(null, window2, window2.document);
        if (typeof module == "object" && module.exports) {
          factory(require_lazysizes());
        } else if (typeof define == "function" && define.amd) {
          define(["lazysizes"], factory);
        } else if (window2.lazySizes) {
          globalInstall();
        } else {
          window2.addEventListener("lazyunveilread", globalInstall, true);
        }
      })(window, function(window2, document2, lazySizes) {
        "use strict";
        if (!window2.addEventListener) {
          return;
        }
        var lazySizesCfg = lazySizes.cfg;
        var regWhite = /\s+/g;
        var regSplitSet = /\s*\|\s+|\s+\|\s*/g;
        var regSource = /^(.+?)(?:\s+\[\s*(.+?)\s*\])(?:\s+\[\s*(.+?)\s*\])?$/;
        var regType = /^\s*\(*\s*type\s*:\s*(.+?)\s*\)*\s*$/;
        var regBgUrlEscape = /\(|\)|'/;
        var allowedBackgroundSize = { contain: 1, cover: 1 };
        var proxyWidth = function(elem) {
          var width = lazySizes.gW(elem, elem.parentNode);
          if (!elem._lazysizesWidth || width > elem._lazysizesWidth) {
            elem._lazysizesWidth = width;
          }
          return elem._lazysizesWidth;
        };
        var getBgSize = function(elem) {
          var bgSize;
          bgSize = (getComputedStyle(elem) || { getPropertyValue: function() {
          } }).getPropertyValue("background-size");
          if (!allowedBackgroundSize[bgSize] && allowedBackgroundSize[elem.style.backgroundSize]) {
            bgSize = elem.style.backgroundSize;
          }
          return bgSize;
        };
        var setTypeOrMedia = function(source, match) {
          if (match) {
            var typeMatch = match.match(regType);
            if (typeMatch && typeMatch[1]) {
              source.setAttribute("type", typeMatch[1]);
            } else {
              source.setAttribute("media", lazySizesCfg.customMedia[match] || match);
            }
          }
        };
        var createPicture = function(sets, elem, img) {
          var picture = document2.createElement("picture");
          var sizes = elem.getAttribute(lazySizesCfg.sizesAttr);
          var ratio = elem.getAttribute("data-ratio");
          var optimumx = elem.getAttribute("data-optimumx");
          if (elem._lazybgset && elem._lazybgset.parentNode == elem) {
            elem.removeChild(elem._lazybgset);
          }
          Object.defineProperty(img, "_lazybgset", {
            value: elem,
            writable: true
          });
          Object.defineProperty(elem, "_lazybgset", {
            value: picture,
            writable: true
          });
          sets = sets.replace(regWhite, " ").split(regSplitSet);
          picture.style.display = "none";
          img.className = lazySizesCfg.lazyClass;
          if (sets.length == 1 && !sizes) {
            sizes = "auto";
          }
          sets.forEach(function(set) {
            var match;
            var source = document2.createElement("source");
            if (sizes && sizes != "auto") {
              source.setAttribute("sizes", sizes);
            }
            if (match = set.match(regSource)) {
              source.setAttribute(lazySizesCfg.srcsetAttr, match[1]);
              setTypeOrMedia(source, match[2]);
              setTypeOrMedia(source, match[3]);
            } else {
              source.setAttribute(lazySizesCfg.srcsetAttr, set);
            }
            picture.appendChild(source);
          });
          if (sizes) {
            img.setAttribute(lazySizesCfg.sizesAttr, sizes);
            elem.removeAttribute(lazySizesCfg.sizesAttr);
            elem.removeAttribute("sizes");
          }
          if (optimumx) {
            img.setAttribute("data-optimumx", optimumx);
          }
          if (ratio) {
            img.setAttribute("data-ratio", ratio);
          }
          picture.appendChild(img);
          elem.appendChild(picture);
        };
        var proxyLoad = function(e) {
          if (!e.target._lazybgset) {
            return;
          }
          var image = e.target;
          var elem = image._lazybgset;
          var bg = image.currentSrc || image.src;
          if (bg) {
            var useSrc = regBgUrlEscape.test(bg) ? JSON.stringify(bg) : bg;
            var event = lazySizes.fire(elem, "bgsetproxy", {
              src: bg,
              useSrc,
              fullSrc: null
            });
            if (!event.defaultPrevented) {
              elem.style.backgroundImage = event.detail.fullSrc || "url(" + event.detail.useSrc + ")";
            }
          }
          if (image._lazybgsetLoading) {
            lazySizes.fire(elem, "_lazyloaded", {}, false, true);
            delete image._lazybgsetLoading;
          }
        };
        addEventListener("lazybeforeunveil", function(e) {
          var set, image, elem;
          if (e.defaultPrevented || !(set = e.target.getAttribute("data-bgset"))) {
            return;
          }
          elem = e.target;
          image = document2.createElement("img");
          image.alt = "";
          image._lazybgsetLoading = true;
          e.detail.firesLoad = true;
          createPicture(set, elem, image);
          setTimeout(function() {
            lazySizes.loader.unveil(image);
            lazySizes.rAF(function() {
              lazySizes.fire(image, "_lazyloaded", {}, true, true);
              if (image.complete) {
                proxyLoad({ target: image });
              }
            });
          });
        });
        document2.addEventListener("load", proxyLoad, true);
        window2.addEventListener("lazybeforesizes", function(e) {
          if (e.detail.instance != lazySizes) {
            return;
          }
          if (e.target._lazybgset && e.detail.dataAttr) {
            var elem = e.target._lazybgset;
            var bgSize = getBgSize(elem);
            if (allowedBackgroundSize[bgSize]) {
              e.target._lazysizesParentFit = bgSize;
              lazySizes.rAF(function() {
                e.target.setAttribute("data-parent-fit", bgSize);
                if (e.target._lazysizesParentFit) {
                  delete e.target._lazysizesParentFit;
                }
              });
            }
          }
        }, true);
        document2.documentElement.addEventListener("lazybeforesizes", function(e) {
          if (e.defaultPrevented || !e.target._lazybgset || e.detail.instance != lazySizes) {
            return;
          }
          e.detail.width = proxyWidth(e.target._lazybgset);
        });
      });
    }
  });

  // node_modules/lazysizes/plugins/respimg/ls.respimg.js
  var require_ls_respimg = __commonJS({
    "node_modules/lazysizes/plugins/respimg/ls.respimg.js"(exports, module) {
      (function(window2, factory) {
        if (!window2) {
          return;
        }
        var globalInstall = function() {
          factory(window2.lazySizes);
          window2.removeEventListener("lazyunveilread", globalInstall, true);
        };
        factory = factory.bind(null, window2, window2.document);
        if (typeof module == "object" && module.exports) {
          factory(require_lazysizes());
        } else if (typeof define == "function" && define.amd) {
          define(["lazysizes"], factory);
        } else if (window2.lazySizes) {
          globalInstall();
        } else {
          window2.addEventListener("lazyunveilread", globalInstall, true);
        }
      })(typeof window != "undefined" ? window : 0, function(window2, document2, lazySizes) {
        "use strict";
        var polyfill;
        var lazySizesCfg = lazySizes.cfg;
        var img = document2.createElement("img");
        var supportSrcset = "sizes" in img && "srcset" in img;
        var regHDesc = /\s+\d+h/g;
        var fixEdgeHDescriptor = function() {
          var regDescriptors = /\s+(\d+)(w|h)\s+(\d+)(w|h)/;
          var forEach = Array.prototype.forEach;
          return function() {
            var img2 = document2.createElement("img");
            var removeHDescriptors = function(source) {
              var ratio, match;
              var srcset = source.getAttribute(lazySizesCfg.srcsetAttr);
              if (srcset) {
                if (match = srcset.match(regDescriptors)) {
                  if (match[2] == "w") {
                    ratio = match[1] / match[3];
                  } else {
                    ratio = match[3] / match[1];
                  }
                  if (ratio) {
                    source.setAttribute("data-aspectratio", ratio);
                  }
                  source.setAttribute(lazySizesCfg.srcsetAttr, srcset.replace(regHDesc, ""));
                }
              }
            };
            var handler = function(e) {
              if (e.detail.instance != lazySizes) {
                return;
              }
              var picture = e.target.parentNode;
              if (picture && picture.nodeName == "PICTURE") {
                forEach.call(picture.getElementsByTagName("source"), removeHDescriptors);
              }
              removeHDescriptors(e.target);
            };
            var test = function() {
              if (!!img2.currentSrc) {
                document2.removeEventListener("lazybeforeunveil", handler);
              }
            };
            document2.addEventListener("lazybeforeunveil", handler);
            img2.onload = test;
            img2.onerror = test;
            img2.srcset = "data:,a 1w 1h";
            if (img2.complete) {
              test();
            }
          };
        }();
        if (!lazySizesCfg.supportsType) {
          lazySizesCfg.supportsType = function(type) {
            return !type;
          };
        }
        if (window2.HTMLPictureElement && supportSrcset) {
          if (!lazySizes.hasHDescriptorFix && document2.msElementsFromPoint) {
            lazySizes.hasHDescriptorFix = true;
            fixEdgeHDescriptor();
          }
          return;
        }
        if (window2.picturefill || lazySizesCfg.pf) {
          return;
        }
        lazySizesCfg.pf = function(options) {
          var i, len;
          if (window2.picturefill) {
            return;
          }
          for (i = 0, len = options.elements.length; i < len; i++) {
            polyfill(options.elements[i]);
          }
        };
        polyfill = function() {
          var ascendingSort = function(a, b) {
            return a.w - b.w;
          };
          var regPxLength = /^\s*\d+\.*\d*px\s*$/;
          var reduceCandidate = function(srces) {
            var lowerCandidate, bonusFactor;
            var len = srces.length;
            var candidate = srces[len - 1];
            var i = 0;
            for (i; i < len; i++) {
              candidate = srces[i];
              candidate.d = candidate.w / srces.w;
              if (candidate.d >= srces.d) {
                if (!candidate.cached && (lowerCandidate = srces[i - 1]) && lowerCandidate.d > srces.d - 0.13 * Math.pow(srces.d, 2.2)) {
                  bonusFactor = Math.pow(lowerCandidate.d - 0.6, 1.6);
                  if (lowerCandidate.cached) {
                    lowerCandidate.d += 0.15 * bonusFactor;
                  }
                  if (lowerCandidate.d + (candidate.d - srces.d) * bonusFactor > srces.d) {
                    candidate = lowerCandidate;
                  }
                }
                break;
              }
            }
            return candidate;
          };
          var parseWsrcset = function() {
            var candidates;
            var regWCandidates = /(([^,\s].[^\s]+)\s+(\d+)w)/g;
            var regMultiple = /\s/;
            var addCandidate = function(match, candidate, url, wDescriptor) {
              candidates.push({
                c: candidate,
                u: url,
                w: wDescriptor * 1
              });
            };
            return function(input) {
              candidates = [];
              input = input.trim();
              input.replace(regHDesc, "").replace(regWCandidates, addCandidate);
              if (!candidates.length && input && !regMultiple.test(input)) {
                candidates.push({
                  c: input,
                  u: input,
                  w: 99
                });
              }
              return candidates;
            };
          }();
          var runMatchMedia = function() {
            if (runMatchMedia.init) {
              return;
            }
            runMatchMedia.init = true;
            addEventListener("resize", function() {
              var timer;
              var matchMediaElems = document2.getElementsByClassName("lazymatchmedia");
              var run = function() {
                var i, len;
                for (i = 0, len = matchMediaElems.length; i < len; i++) {
                  polyfill(matchMediaElems[i]);
                }
              };
              return function() {
                clearTimeout(timer);
                timer = setTimeout(run, 66);
              };
            }());
          };
          var createSrcset = function(elem, isImage) {
            var parsedSet;
            var srcSet = elem.getAttribute("srcset") || elem.getAttribute(lazySizesCfg.srcsetAttr);
            if (!srcSet && isImage) {
              srcSet = !elem._lazypolyfill ? elem.getAttribute(lazySizesCfg.srcAttr) || elem.getAttribute("src") : elem._lazypolyfill._set;
            }
            if (!elem._lazypolyfill || elem._lazypolyfill._set != srcSet) {
              parsedSet = parseWsrcset(srcSet || "");
              if (isImage && elem.parentNode) {
                parsedSet.isPicture = elem.parentNode.nodeName.toUpperCase() == "PICTURE";
                if (parsedSet.isPicture) {
                  if (window2.matchMedia) {
                    lazySizes.aC(elem, "lazymatchmedia");
                    runMatchMedia();
                  }
                }
              }
              parsedSet._set = srcSet;
              Object.defineProperty(elem, "_lazypolyfill", {
                value: parsedSet,
                writable: true
              });
            }
          };
          var getX = function(elem) {
            var dpr = window2.devicePixelRatio || 1;
            var optimum = lazySizes.getX && lazySizes.getX(elem);
            return Math.min(optimum || dpr, 2.5, dpr);
          };
          var matchesMedia = function(media) {
            if (window2.matchMedia) {
              matchesMedia = function(media2) {
                return !media2 || (matchMedia(media2) || {}).matches;
              };
            } else {
              return !media;
            }
            return matchesMedia(media);
          };
          var getCandidate = function(elem) {
            var sources, i, len, media, source, srces, src, width;
            source = elem;
            createSrcset(source, true);
            srces = source._lazypolyfill;
            if (srces.isPicture) {
              for (i = 0, sources = elem.parentNode.getElementsByTagName("source"), len = sources.length; i < len; i++) {
                if (lazySizesCfg.supportsType(sources[i].getAttribute("type"), elem) && matchesMedia(sources[i].getAttribute("media"))) {
                  source = sources[i];
                  createSrcset(source);
                  srces = source._lazypolyfill;
                  break;
                }
              }
            }
            if (srces.length > 1) {
              width = source.getAttribute("sizes") || "";
              width = regPxLength.test(width) && parseInt(width, 10) || lazySizes.gW(elem, elem.parentNode);
              srces.d = getX(elem);
              if (!srces.src || !srces.w || srces.w < width) {
                srces.w = width;
                src = reduceCandidate(srces.sort(ascendingSort));
                srces.src = src;
              } else {
                src = srces.src;
              }
            } else {
              src = srces[0];
            }
            return src;
          };
          var p = function(elem) {
            if (supportSrcset && elem.parentNode && elem.parentNode.nodeName.toUpperCase() != "PICTURE") {
              return;
            }
            var candidate = getCandidate(elem);
            if (candidate && candidate.u && elem._lazypolyfill.cur != candidate.u) {
              elem._lazypolyfill.cur = candidate.u;
              candidate.cached = true;
              elem.setAttribute(lazySizesCfg.srcAttr, candidate.u);
              elem.setAttribute("src", candidate.u);
            }
          };
          p.parse = parseWsrcset;
          return p;
        }();
        if (lazySizesCfg.loadedClass && lazySizesCfg.loadingClass) {
          (function() {
            var sels = [];
            ['img[sizes$="px"][srcset].', "picture > img:not([srcset])."].forEach(function(sel) {
              sels.push(sel + lazySizesCfg.loadedClass);
              sels.push(sel + lazySizesCfg.loadingClass);
            });
            lazySizesCfg.pf({
              elements: document2.querySelectorAll(sels.join(", "))
            });
          })();
        }
      });
    }
  });

  // node_modules/lazysizes/plugins/rias/ls.rias.js
  var require_ls_rias = __commonJS({
    "node_modules/lazysizes/plugins/rias/ls.rias.js"(exports, module) {
      (function(window2, factory) {
        var globalInstall = function() {
          factory(window2.lazySizes);
          window2.removeEventListener("lazyunveilread", globalInstall, true);
        };
        factory = factory.bind(null, window2, window2.document);
        if (typeof module == "object" && module.exports) {
          factory(require_lazysizes());
        } else if (typeof define == "function" && define.amd) {
          define(["lazysizes"], factory);
        } else if (window2.lazySizes) {
          globalInstall();
        } else {
          window2.addEventListener("lazyunveilread", globalInstall, true);
        }
      })(window, function(window2, document2, lazySizes) {
        "use strict";
        var config, riasCfg;
        var lazySizesCfg = lazySizes.cfg;
        var replaceTypes = { string: 1, number: 1 };
        var regNumber = /^\-*\+*\d+\.*\d*$/;
        var regPicture = /^picture$/i;
        var regWidth = /\s*\{\s*width\s*\}\s*/i;
        var regHeight = /\s*\{\s*height\s*\}\s*/i;
        var regPlaceholder = /\s*\{\s*([a-z0-9]+)\s*\}\s*/ig;
        var regObj = /^\[.*\]|\{.*\}$/;
        var regAllowedSizes = /^(?:auto|\d+(px)?)$/;
        var anchor = document2.createElement("a");
        var img = document2.createElement("img");
        var buggySizes = "srcset" in img && !("sizes" in img);
        var supportPicture = !!window2.HTMLPictureElement && !buggySizes;
        (function() {
          var prop;
          var noop = function() {
          };
          var riasDefaults = {
            prefix: "",
            postfix: "",
            srcAttr: "data-src",
            absUrl: false,
            modifyOptions: noop,
            widthmap: {},
            ratio: false,
            traditionalRatio: false,
            aspectratio: false
          };
          config = lazySizes && lazySizes.cfg;
          if (!config.supportsType) {
            config.supportsType = function(type) {
              return !type;
            };
          }
          if (!config.rias) {
            config.rias = {};
          }
          riasCfg = config.rias;
          if (!("widths" in riasCfg)) {
            riasCfg.widths = [];
            (function(widths) {
              var width;
              var i = 0;
              while (!width || width < 3e3) {
                i += 5;
                if (i > 30) {
                  i += 1;
                }
                width = 36 * i;
                widths.push(width);
              }
            })(riasCfg.widths);
          }
          for (prop in riasDefaults) {
            if (!(prop in riasCfg)) {
              riasCfg[prop] = riasDefaults[prop];
            }
          }
        })();
        function getElementOptions(elem, src, options) {
          var attr, parent, setOption, prop, opts;
          var elemStyles = window2.getComputedStyle(elem);
          if (!options) {
            parent = elem.parentNode;
            options = {
              isPicture: !!(parent && regPicture.test(parent.nodeName || ""))
            };
          } else {
            opts = {};
            for (prop in options) {
              opts[prop] = options[prop];
            }
            options = opts;
          }
          setOption = function(attr2, run) {
            var attrVal = elem.getAttribute("data-" + attr2);
            if (!attrVal) {
              var styles = elemStyles.getPropertyValue("--ls-" + attr2);
              if (styles) {
                attrVal = styles.trim();
              }
            }
            if (attrVal) {
              if (attrVal == "true") {
                attrVal = true;
              } else if (attrVal == "false") {
                attrVal = false;
              } else if (regNumber.test(attrVal)) {
                attrVal = parseFloat(attrVal);
              } else if (typeof riasCfg[attr2] == "function") {
                attrVal = riasCfg[attr2](elem, attrVal);
              } else if (regObj.test(attrVal)) {
                try {
                  attrVal = JSON.parse(attrVal);
                } catch (e) {
                }
              }
              options[attr2] = attrVal;
            } else if (attr2 in riasCfg && typeof riasCfg[attr2] != "function" && !options[attr2]) {
              options[attr2] = riasCfg[attr2];
            } else if (run && typeof riasCfg[attr2] == "function") {
              options[attr2] = riasCfg[attr2](elem, attrVal);
            }
          };
          for (attr in riasCfg) {
            setOption(attr);
          }
          src.replace(regPlaceholder, function(full, match) {
            if (!(match in options)) {
              setOption(match, true);
            }
          });
          return options;
        }
        function replaceUrlProps(url, options) {
          var candidates = [];
          var replaceFn = function(full, match) {
            return replaceTypes[typeof options[match]] ? options[match] : full;
          };
          candidates.srcset = [];
          if (options.absUrl) {
            anchor.setAttribute("href", url);
            url = anchor.href;
          }
          url = ((options.prefix || "") + url + (options.postfix || "")).replace(regPlaceholder, replaceFn);
          options.widths.forEach(function(width) {
            var widthAlias = options.widthmap[width] || width;
            var ratio = options.aspectratio || options.ratio;
            var traditionalRatio = !options.aspectratio && riasCfg.traditionalRatio;
            var candidate = {
              u: url.replace(regWidth, widthAlias).replace(regHeight, ratio ? traditionalRatio ? Math.round(width * ratio) : Math.round(width / ratio) : ""),
              w: width
            };
            candidates.push(candidate);
            candidates.srcset.push(candidate.c = candidate.u + " " + width + "w");
          });
          return candidates;
        }
        function setSrc(src, opts, elem) {
          var elemW = 0;
          var elemH = 0;
          var sizeElement = elem;
          if (!src) {
            return;
          }
          if (opts.ratio === "container") {
            elemW = sizeElement.scrollWidth;
            elemH = sizeElement.scrollHeight;
            while ((!elemW || !elemH) && sizeElement !== document2) {
              sizeElement = sizeElement.parentNode;
              elemW = sizeElement.scrollWidth;
              elemH = sizeElement.scrollHeight;
            }
            if (elemW && elemH) {
              opts.ratio = opts.traditionalRatio ? elemH / elemW : elemW / elemH;
            }
          }
          src = replaceUrlProps(src, opts);
          src.isPicture = opts.isPicture;
          if (buggySizes && elem.nodeName.toUpperCase() == "IMG") {
            elem.removeAttribute(config.srcsetAttr);
          } else {
            elem.setAttribute(config.srcsetAttr, src.srcset.join(", "));
          }
          Object.defineProperty(elem, "_lazyrias", {
            value: src,
            writable: true
          });
        }
        function createAttrObject(elem, src) {
          var opts = getElementOptions(elem, src);
          riasCfg.modifyOptions.call(elem, { target: elem, details: opts, detail: opts });
          lazySizes.fire(elem, "lazyriasmodifyoptions", opts);
          return opts;
        }
        function getSrc(elem) {
          return elem.getAttribute(elem.getAttribute("data-srcattr") || riasCfg.srcAttr) || elem.getAttribute(config.srcsetAttr) || elem.getAttribute(config.srcAttr) || elem.getAttribute("data-pfsrcset") || "";
        }
        addEventListener("lazybeforesizes", function(e) {
          if (e.detail.instance != lazySizes) {
            return;
          }
          var elem, src, elemOpts, sourceOpts, parent, sources, i, len, sourceSrc, sizes, detail, hasPlaceholder, modified, emptyList;
          elem = e.target;
          if (!e.detail.dataAttr || e.defaultPrevented || riasCfg.disabled || !((sizes = elem.getAttribute(config.sizesAttr) || elem.getAttribute("sizes")) && regAllowedSizes.test(sizes))) {
            return;
          }
          src = getSrc(elem);
          elemOpts = createAttrObject(elem, src);
          hasPlaceholder = regWidth.test(elemOpts.prefix) || regWidth.test(elemOpts.postfix);
          if (elemOpts.isPicture && (parent = elem.parentNode)) {
            sources = parent.getElementsByTagName("source");
            for (i = 0, len = sources.length; i < len; i++) {
              if (hasPlaceholder || regWidth.test(sourceSrc = getSrc(sources[i]))) {
                sourceOpts = getElementOptions(sources[i], sourceSrc, elemOpts);
                setSrc(sourceSrc, sourceOpts, sources[i]);
                modified = true;
              }
            }
          }
          if (hasPlaceholder || regWidth.test(src)) {
            setSrc(src, elemOpts, elem);
            modified = true;
          } else if (modified) {
            emptyList = [];
            emptyList.srcset = [];
            emptyList.isPicture = true;
            Object.defineProperty(elem, "_lazyrias", {
              value: emptyList,
              writable: true
            });
          }
          if (modified) {
            if (supportPicture) {
              elem.removeAttribute(config.srcAttr);
            } else if (sizes != "auto") {
              detail = {
                width: parseInt(sizes, 10)
              };
              polyfill({
                target: elem,
                detail
              });
            }
          }
        }, true);
        var polyfill = function() {
          var ascendingSort = function(a, b) {
            return a.w - b.w;
          };
          var reduceCandidate = function(srces) {
            var lowerCandidate, bonusFactor;
            var len = srces.length;
            var candidate = srces[len - 1];
            var i = 0;
            for (i; i < len; i++) {
              candidate = srces[i];
              candidate.d = candidate.w / srces.w;
              if (candidate.d >= srces.d) {
                if (!candidate.cached && (lowerCandidate = srces[i - 1]) && lowerCandidate.d > srces.d - 0.13 * Math.pow(srces.d, 2.2)) {
                  bonusFactor = Math.pow(lowerCandidate.d - 0.6, 1.6);
                  if (lowerCandidate.cached) {
                    lowerCandidate.d += 0.15 * bonusFactor;
                  }
                  if (lowerCandidate.d + (candidate.d - srces.d) * bonusFactor > srces.d) {
                    candidate = lowerCandidate;
                  }
                }
                break;
              }
            }
            return candidate;
          };
          var getWSet = function(elem, testPicture) {
            var src;
            if (!elem._lazyrias && lazySizes.pWS && (src = lazySizes.pWS(elem.getAttribute(config.srcsetAttr || ""))).length) {
              Object.defineProperty(elem, "_lazyrias", {
                value: src,
                writable: true
              });
              if (testPicture && elem.parentNode) {
                src.isPicture = elem.parentNode.nodeName.toUpperCase() == "PICTURE";
              }
            }
            return elem._lazyrias;
          };
          var getX = function(elem) {
            var dpr = window2.devicePixelRatio || 1;
            var optimum = lazySizes.getX && lazySizes.getX(elem);
            return Math.min(optimum || dpr, 2.4, dpr);
          };
          var getCandidate = function(elem, width) {
            var sources, i, len, media, srces, src;
            srces = elem._lazyrias;
            if (srces.isPicture && window2.matchMedia) {
              for (i = 0, sources = elem.parentNode.getElementsByTagName("source"), len = sources.length; i < len; i++) {
                if (getWSet(sources[i]) && !sources[i].getAttribute("type") && (!(media = sources[i].getAttribute("media")) || (matchMedia(media) || {}).matches)) {
                  srces = sources[i]._lazyrias;
                  break;
                }
              }
            }
            if (!srces.w || srces.w < width) {
              srces.w = width;
              srces.d = getX(elem);
              src = reduceCandidate(srces.sort(ascendingSort));
            }
            return src;
          };
          var polyfill2 = function(e) {
            if (e.detail.instance != lazySizes) {
              return;
            }
            var candidate;
            var elem = e.target;
            if (!buggySizes && (window2.respimage || window2.picturefill || lazySizesCfg.pf)) {
              document2.removeEventListener("lazybeforesizes", polyfill2);
              return;
            }
            if (!("_lazyrias" in elem) && (!e.detail.dataAttr || !getWSet(elem, true))) {
              return;
            }
            candidate = getCandidate(elem, e.detail.width);
            if (candidate && candidate.u && elem._lazyrias.cur != candidate.u) {
              elem._lazyrias.cur = candidate.u;
              candidate.cached = true;
              lazySizes.rAF(function() {
                elem.setAttribute(config.srcAttr, candidate.u);
                elem.setAttribute("src", candidate.u);
              });
            }
          };
          if (!supportPicture) {
            addEventListener("lazybeforesizes", polyfill2);
          } else {
            polyfill2 = function() {
            };
          }
          return polyfill2;
        }();
      });
    }
  });

  // app/scripts/plugin.js
  var import_ls = __toModule(require_ls_unveilhooks());
  var import_ls2 = __toModule(require_ls_parent_fit());
  var import_ls3 = __toModule(require_ls_object_fit());
  var import_ls4 = __toModule(require_ls_bgset());
  var import_lazysizes = __toModule(require_lazysizes());
  var import_ls5 = __toModule(require_ls_respimg());
  var import_ls6 = __toModule(require_ls_rias());
  var tns = function() {
    var win = window;
    var raf = win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.msRequestAnimationFrame || function(cb) {
      return setTimeout(cb, 16);
    };
    var win$1 = window;
    var caf = win$1.cancelAnimationFrame || win$1.mozCancelAnimationFrame || function(id) {
      clearTimeout(id);
    };
    function extend() {
      var obj, name, copy, target = arguments[0] || {}, i = 1, length = arguments.length;
      for (; i < length; i++) {
        if ((obj = arguments[i]) !== null) {
          for (name in obj) {
            copy = obj[name];
            if (target === copy) {
              continue;
            } else if (copy !== void 0) {
              target[name] = copy;
            }
          }
        }
      }
      return target;
    }
    function checkStorageValue(value) {
      return ["true", "false"].indexOf(value) >= 0 ? JSON.parse(value) : value;
    }
    function setLocalStorage(storage, key, value, access) {
      if (access) {
        try {
          storage.setItem(key, value);
        } catch (e) {
        }
      }
      return value;
    }
    function getSlideId() {
      var id = window.tnsId;
      window.tnsId = !id ? 1 : id + 1;
      return "tns" + window.tnsId;
    }
    function getBody() {
      var doc = document, body = doc.body;
      if (!body) {
        body = doc.createElement("body");
        body.fake = true;
      }
      return body;
    }
    var docElement = document.documentElement;
    function setFakeBody(body) {
      var docOverflow = "";
      if (body.fake) {
        docOverflow = docElement.style.overflow;
        body.style.background = "";
        body.style.overflow = docElement.style.overflow = "hidden";
        docElement.appendChild(body);
      }
      return docOverflow;
    }
    function resetFakeBody(body, docOverflow) {
      if (body.fake) {
        body.remove();
        docElement.style.overflow = docOverflow;
        docElement.offsetHeight;
      }
    }
    function calc() {
      var doc = document, body = getBody(), docOverflow = setFakeBody(body), div = doc.createElement("div"), result = false;
      body.appendChild(div);
      try {
        var str = "(10px * 10)", vals = ["calc" + str, "-moz-calc" + str, "-webkit-calc" + str], val;
        for (var i = 0; i < 3; i++) {
          val = vals[i];
          div.style.width = val;
          if (div.offsetWidth === 100) {
            result = val.replace(str, "");
            break;
          }
        }
      } catch (e) {
      }
      body.fake ? resetFakeBody(body, docOverflow) : div.remove();
      return result;
    }
    function percentageLayout() {
      var doc = document, body = getBody(), docOverflow = setFakeBody(body), wrapper = doc.createElement("div"), outer = doc.createElement("div"), str = "", count = 70, perPage = 3, supported = false;
      wrapper.className = "tns-t-subp2";
      outer.className = "tns-t-ct";
      for (var i = 0; i < count; i++) {
        str += "<div></div>";
      }
      outer.innerHTML = str;
      wrapper.appendChild(outer);
      body.appendChild(wrapper);
      supported = Math.abs(wrapper.getBoundingClientRect().left - outer.children[count - perPage].getBoundingClientRect().left) < 2;
      body.fake ? resetFakeBody(body, docOverflow) : wrapper.remove();
      return supported;
    }
    function mediaquerySupport() {
      if (window.matchMedia || window.msMatchMedia) {
        return true;
      }
      var doc = document, body = getBody(), docOverflow = setFakeBody(body), div = doc.createElement("div"), style = doc.createElement("style"), rule = "@media all and (min-width:1px){.tns-mq-test{position:absolute}}", position;
      style.type = "text/css";
      div.className = "tns-mq-test";
      body.appendChild(style);
      body.appendChild(div);
      if (style.styleSheet) {
        style.styleSheet.cssText = rule;
      } else {
        style.appendChild(doc.createTextNode(rule));
      }
      position = window.getComputedStyle ? window.getComputedStyle(div).position : div.currentStyle["position"];
      body.fake ? resetFakeBody(body, docOverflow) : div.remove();
      return position === "absolute";
    }
    function createStyleSheet(media, nonce) {
      var style = document.createElement("style");
      if (media) {
        style.setAttribute("media", media);
      }
      if (nonce) {
        style.setAttribute("nonce", nonce);
      }
      document.querySelector("head").appendChild(style);
      return style.sheet ? style.sheet : style.styleSheet;
    }
    function addCSSRule(sheet, selector, rules, index) {
      "insertRule" in sheet ? sheet.insertRule(selector + "{" + rules + "}", index) : sheet.addRule(selector, rules, index);
    }
    function removeCSSRule(sheet, index) {
      "deleteRule" in sheet ? sheet.deleteRule(index) : sheet.removeRule(index);
    }
    function getCssRulesLength(sheet) {
      var rule = "insertRule" in sheet ? sheet.cssRules : sheet.rules;
      return rule.length;
    }
    function toDegree(y, x) {
      return Math.atan2(y, x) * (180 / Math.PI);
    }
    function getTouchDirection(angle, range) {
      var direction = false, gap = Math.abs(90 - Math.abs(angle));
      if (gap >= 90 - range) {
        direction = "horizontal";
      } else if (gap <= range) {
        direction = "vertical";
      }
      return direction;
    }
    function forEach(arr, callback, scope) {
      for (var i = 0, l = arr.length; i < l; i++) {
        callback.call(scope, arr[i], i);
      }
    }
    var classListSupport = "classList" in document.createElement("_");
    var hasClass = classListSupport ? function(el, str) {
      return el.classList.contains(str);
    } : function(el, str) {
      return el.className.indexOf(str) >= 0;
    };
    var addClass = classListSupport ? function(el, str) {
      if (!hasClass(el, str)) {
        el.classList.add(str);
      }
    } : function(el, str) {
      if (!hasClass(el, str)) {
        el.className += " " + str;
      }
    };
    var removeClass = classListSupport ? function(el, str) {
      if (hasClass(el, str)) {
        el.classList.remove(str);
      }
    } : function(el, str) {
      if (hasClass(el, str)) {
        el.className = el.className.replace(str, "");
      }
    };
    function hasAttr(el, attr) {
      return el.hasAttribute(attr);
    }
    function getAttr(el, attr) {
      return el.getAttribute(attr);
    }
    function isNodeList(el) {
      return typeof el.item !== "undefined";
    }
    function setAttrs(els, attrs) {
      els = isNodeList(els) || els instanceof Array ? els : [els];
      if (Object.prototype.toString.call(attrs) !== "[object Object]") {
        return;
      }
      for (var i = els.length; i--; ) {
        for (var key in attrs) {
          els[i].setAttribute(key, attrs[key]);
        }
      }
    }
    function removeAttrs(els, attrs) {
      els = isNodeList(els) || els instanceof Array ? els : [els];
      attrs = attrs instanceof Array ? attrs : [attrs];
      var attrLength = attrs.length;
      for (var i = els.length; i--; ) {
        for (var j = attrLength; j--; ) {
          els[i].removeAttribute(attrs[j]);
        }
      }
    }
    function arrayFromNodeList(nl) {
      var arr = [];
      for (var i = 0, l = nl.length; i < l; i++) {
        arr.push(nl[i]);
      }
      return arr;
    }
    function hideElement(el, forceHide) {
      if (el.style.display !== "none") {
        el.style.display = "none";
      }
    }
    function showElement(el, forceHide) {
      if (el.style.display === "none") {
        el.style.display = "";
      }
    }
    function isVisible(el) {
      return window.getComputedStyle(el).display !== "none";
    }
    function whichProperty(props) {
      if (typeof props === "string") {
        var arr = [props], Props = props.charAt(0).toUpperCase() + props.substr(1), prefixes = ["Webkit", "Moz", "ms", "O"];
        prefixes.forEach(function(prefix) {
          if (prefix !== "ms" || props === "transform") {
            arr.push(prefix + Props);
          }
        });
        props = arr;
      }
      var el = document.createElement("fakeelement"), len = props.length;
      for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        if (el.style[prop] !== void 0) {
          return prop;
        }
      }
      return false;
    }
    function has3DTransforms(tf) {
      if (!tf) {
        return false;
      }
      if (!window.getComputedStyle) {
        return false;
      }
      var doc = document, body = getBody(), docOverflow = setFakeBody(body), el = doc.createElement("p"), has3d, cssTF = tf.length > 9 ? "-" + tf.slice(0, -9).toLowerCase() + "-" : "";
      cssTF += "transform";
      body.insertBefore(el, null);
      el.style[tf] = "translate3d(1px,1px,1px)";
      has3d = window.getComputedStyle(el).getPropertyValue(cssTF);
      body.fake ? resetFakeBody(body, docOverflow) : el.remove();
      return has3d !== void 0 && has3d.length > 0 && has3d !== "none";
    }
    function getEndProperty(propIn, propOut) {
      var endProp = false;
      if (/^Webkit/.test(propIn)) {
        endProp = "webkit" + propOut + "End";
      } else if (/^O/.test(propIn)) {
        endProp = "o" + propOut + "End";
      } else if (propIn) {
        endProp = propOut.toLowerCase() + "end";
      }
      return endProp;
    }
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
    var passiveOption = supportsPassive ? { passive: true } : false;
    function addEvents(el, obj, preventScrolling) {
      for (var prop in obj) {
        var option = ["touchstart", "touchmove"].indexOf(prop) >= 0 && !preventScrolling ? passiveOption : false;
        el.addEventListener(prop, obj[prop], option);
      }
    }
    function removeEvents(el, obj) {
      for (var prop in obj) {
        var option = ["touchstart", "touchmove"].indexOf(prop) >= 0 ? passiveOption : false;
        el.removeEventListener(prop, obj[prop], option);
      }
    }
    function Events() {
      return {
        topics: {},
        on: function(eventName, fn) {
          this.topics[eventName] = this.topics[eventName] || [];
          this.topics[eventName].push(fn);
        },
        off: function(eventName, fn) {
          if (this.topics[eventName]) {
            for (var i = 0; i < this.topics[eventName].length; i++) {
              if (this.topics[eventName][i] === fn) {
                this.topics[eventName].splice(i, 1);
                break;
              }
            }
          }
        },
        emit: function(eventName, data) {
          data.type = eventName;
          if (this.topics[eventName]) {
            this.topics[eventName].forEach(function(fn) {
              fn(data, eventName);
            });
          }
        }
      };
    }
    function jsTransform(element, attr, prefix, postfix, to, duration, callback) {
      var tick = Math.min(duration, 10), unit = to.indexOf("%") >= 0 ? "%" : "px", to = to.replace(unit, ""), from = Number(element.style[attr].replace(prefix, "").replace(postfix, "").replace(unit, "")), positionTick = (to - from) / duration * tick, running;
      setTimeout(moveElement, tick);
      function moveElement() {
        duration -= tick;
        from += positionTick;
        element.style[attr] = prefix + from + unit + postfix;
        if (duration > 0) {
          setTimeout(moveElement, tick);
        } else {
          callback();
        }
      }
    }
    if (!Object.keys) {
      Object.keys = function(object) {
        var keys = [];
        for (var name in object) {
          if (Object.prototype.hasOwnProperty.call(object, name)) {
            keys.push(name);
          }
        }
        return keys;
      };
    }
    if (!("remove" in Element.prototype)) {
      Element.prototype.remove = function() {
        if (this.parentNode) {
          this.parentNode.removeChild(this);
        }
      };
    }
    var tns2 = function(options) {
      options = extend({
        container: ".slider",
        mode: "carousel",
        axis: "horizontal",
        items: 1,
        gutter: 0,
        edgePadding: 0,
        fixedWidth: false,
        autoWidth: false,
        viewportMax: false,
        slideBy: 1,
        center: false,
        controls: true,
        controlsPosition: "top",
        controlsText: ["prev", "next"],
        controlsContainer: false,
        prevButton: false,
        nextButton: false,
        nav: true,
        navPosition: "top",
        navContainer: false,
        navAsThumbnails: false,
        arrowKeys: false,
        speed: 300,
        autoplay: false,
        autoplayPosition: "top",
        autoplayTimeout: 5e3,
        autoplayDirection: "forward",
        autoplayText: ["start", "stop"],
        autoplayHoverPause: false,
        autoplayButton: false,
        autoplayButtonOutput: true,
        autoplayResetOnVisibility: true,
        animateIn: "tns-fadeIn",
        animateOut: "tns-fadeOut",
        animateNormal: "tns-normal",
        animateDelay: false,
        loop: true,
        rewind: false,
        autoHeight: false,
        responsive: false,
        lazyload: false,
        lazyloadSelector: ".tns-lazy-img",
        touch: true,
        mouseDrag: false,
        swipeAngle: 15,
        nested: false,
        preventActionWhenRunning: false,
        preventScrollOnTouch: false,
        freezable: true,
        onInit: false,
        useLocalStorage: true,
        nonce: false
      }, options || {});
      var doc = document, win2 = window, KEYS = {
        ENTER: 13,
        SPACE: 32,
        LEFT: 37,
        RIGHT: 39
      }, tnsStorage = {}, localStorageAccess = options.useLocalStorage;
      if (localStorageAccess) {
        var browserInfo = navigator.userAgent;
        var uid = new Date();
        try {
          tnsStorage = win2.localStorage;
          if (tnsStorage) {
            tnsStorage.setItem(uid, uid);
            localStorageAccess = tnsStorage.getItem(uid) == uid;
            tnsStorage.removeItem(uid);
          } else {
            localStorageAccess = false;
          }
          if (!localStorageAccess) {
            tnsStorage = {};
          }
        } catch (e) {
          localStorageAccess = false;
        }
        if (localStorageAccess) {
          if (tnsStorage["tnsApp"] && tnsStorage["tnsApp"] !== browserInfo) {
            ["tC", "tPL", "tMQ", "tTf", "t3D", "tTDu", "tTDe", "tADu", "tADe", "tTE", "tAE"].forEach(function(item) {
              tnsStorage.removeItem(item);
            });
          }
          localStorage["tnsApp"] = browserInfo;
        }
      }
      var CALC = tnsStorage["tC"] ? checkStorageValue(tnsStorage["tC"]) : setLocalStorage(tnsStorage, "tC", calc(), localStorageAccess), PERCENTAGELAYOUT = tnsStorage["tPL"] ? checkStorageValue(tnsStorage["tPL"]) : setLocalStorage(tnsStorage, "tPL", percentageLayout(), localStorageAccess), CSSMQ = tnsStorage["tMQ"] ? checkStorageValue(tnsStorage["tMQ"]) : setLocalStorage(tnsStorage, "tMQ", mediaquerySupport(), localStorageAccess), TRANSFORM = tnsStorage["tTf"] ? checkStorageValue(tnsStorage["tTf"]) : setLocalStorage(tnsStorage, "tTf", whichProperty("transform"), localStorageAccess), HAS3DTRANSFORMS = tnsStorage["t3D"] ? checkStorageValue(tnsStorage["t3D"]) : setLocalStorage(tnsStorage, "t3D", has3DTransforms(TRANSFORM), localStorageAccess), TRANSITIONDURATION = tnsStorage["tTDu"] ? checkStorageValue(tnsStorage["tTDu"]) : setLocalStorage(tnsStorage, "tTDu", whichProperty("transitionDuration"), localStorageAccess), TRANSITIONDELAY = tnsStorage["tTDe"] ? checkStorageValue(tnsStorage["tTDe"]) : setLocalStorage(tnsStorage, "tTDe", whichProperty("transitionDelay"), localStorageAccess), ANIMATIONDURATION = tnsStorage["tADu"] ? checkStorageValue(tnsStorage["tADu"]) : setLocalStorage(tnsStorage, "tADu", whichProperty("animationDuration"), localStorageAccess), ANIMATIONDELAY = tnsStorage["tADe"] ? checkStorageValue(tnsStorage["tADe"]) : setLocalStorage(tnsStorage, "tADe", whichProperty("animationDelay"), localStorageAccess), TRANSITIONEND = tnsStorage["tTE"] ? checkStorageValue(tnsStorage["tTE"]) : setLocalStorage(tnsStorage, "tTE", getEndProperty(TRANSITIONDURATION, "Transition"), localStorageAccess), ANIMATIONEND = tnsStorage["tAE"] ? checkStorageValue(tnsStorage["tAE"]) : setLocalStorage(tnsStorage, "tAE", getEndProperty(ANIMATIONDURATION, "Animation"), localStorageAccess);
      var supportConsoleWarn = win2.console && typeof win2.console.warn === "function", tnsList = ["container", "controlsContainer", "prevButton", "nextButton", "navContainer", "autoplayButton"], optionsElements = {};
      tnsList.forEach(function(item) {
        if (typeof options[item] === "string") {
          var str = options[item], el = doc.querySelector(str);
          optionsElements[item] = str;
          if (el && el.nodeName) {
            options[item] = el;
          } else {
            if (supportConsoleWarn) {
              console.warn("Can't find", options[item]);
            }
            return;
          }
        }
      });
      if (options.container.children.length < 1) {
        if (supportConsoleWarn) {
          console.warn("No slides found in", options.container);
        }
        return;
      }
      var responsive = options.responsive, nested = options.nested, carousel = options.mode === "carousel" ? true : false;
      if (responsive) {
        if (0 in responsive) {
          options = extend(options, responsive[0]);
          delete responsive[0];
        }
        var responsiveTem = {};
        for (var key in responsive) {
          var val = responsive[key];
          val = typeof val === "number" ? { items: val } : val;
          responsiveTem[key] = val;
        }
        responsive = responsiveTem;
        responsiveTem = null;
      }
      function updateOptions(obj) {
        for (var key2 in obj) {
          if (!carousel) {
            if (key2 === "slideBy") {
              obj[key2] = "page";
            }
            if (key2 === "edgePadding") {
              obj[key2] = false;
            }
            if (key2 === "autoHeight") {
              obj[key2] = false;
            }
          }
          if (key2 === "responsive") {
            updateOptions(obj[key2]);
          }
        }
      }
      if (!carousel) {
        updateOptions(options);
      }
      if (!carousel) {
        options.axis = "horizontal";
        options.slideBy = "page";
        options.edgePadding = false;
        var animateIn = options.animateIn, animateOut = options.animateOut, animateDelay = options.animateDelay, animateNormal = options.animateNormal;
      }
      var horizontal = options.axis === "horizontal" ? true : false, outerWrapper = doc.createElement("div"), innerWrapper = doc.createElement("div"), middleWrapper, container = options.container, containerParent = container.parentNode, containerHTML = container.outerHTML, slideItems = container.children, slideCount = slideItems.length, breakpointZone, windowWidth = getWindowWidth(), isOn = false;
      if (responsive) {
        setBreakpointZone();
      }
      if (carousel) {
        container.className += " tns-vpfix";
      }
      var autoWidth = options.autoWidth, fixedWidth = getOption("fixedWidth"), edgePadding = getOption("edgePadding"), gutter = getOption("gutter"), viewport = getViewportWidth(), center = getOption("center"), items = !autoWidth ? Math.floor(getOption("items")) : 1, slideBy = getOption("slideBy"), viewportMax = options.viewportMax || options.fixedWidthViewportWidth, arrowKeys = getOption("arrowKeys"), speed = getOption("speed"), rewind = options.rewind, loop = rewind ? false : options.loop, autoHeight = getOption("autoHeight"), controls = getOption("controls"), controlsText = getOption("controlsText"), nav = getOption("nav"), touch = getOption("touch"), mouseDrag = getOption("mouseDrag"), autoplay = getOption("autoplay"), autoplayTimeout = getOption("autoplayTimeout"), autoplayText = getOption("autoplayText"), autoplayHoverPause = getOption("autoplayHoverPause"), autoplayResetOnVisibility = getOption("autoplayResetOnVisibility"), sheet = createStyleSheet(null, getOption("nonce")), lazyload = options.lazyload, lazyloadSelector = options.lazyloadSelector, slidePositions, slideItemsOut = [], cloneCount = loop ? getCloneCountForLoop() : 0, slideCountNew = !carousel ? slideCount + cloneCount : slideCount + cloneCount * 2, hasRightDeadZone = (fixedWidth || autoWidth) && !loop ? true : false, rightBoundary = fixedWidth ? getRightBoundary() : null, updateIndexBeforeTransform = !carousel || !loop ? true : false, transformAttr = horizontal ? "left" : "top", transformPrefix = "", transformPostfix = "", getIndexMax = function() {
        if (fixedWidth) {
          return function() {
            return center && !loop ? slideCount - 1 : Math.ceil(-rightBoundary / (fixedWidth + gutter));
          };
        } else if (autoWidth) {
          return function() {
            for (var i = 0; i < slideCountNew; i++) {
              if (slidePositions[i] >= -rightBoundary) {
                return i;
              }
            }
          };
        } else {
          return function() {
            if (center && carousel && !loop) {
              return slideCount - 1;
            } else {
              return loop || carousel ? Math.max(0, slideCountNew - Math.ceil(items)) : slideCountNew - 1;
            }
          };
        }
      }(), index = getStartIndex(getOption("startIndex")), indexCached = index, displayIndex = getCurrentSlide(), indexMin = 0, indexMax = !autoWidth ? getIndexMax() : null, resizeTimer, preventActionWhenRunning = options.preventActionWhenRunning, swipeAngle = options.swipeAngle, moveDirectionExpected = swipeAngle ? "?" : true, running = false, onInit = options.onInit, events = new Events(), newContainerClasses = " tns-slider tns-" + options.mode, slideId = container.id || getSlideId(), disable = getOption("disable"), disabled = false, freezable = options.freezable, freeze = freezable && !autoWidth ? getFreeze() : false, frozen = false, controlsEvents = {
        click: onControlsClick,
        keydown: onControlsKeydown
      }, navEvents = {
        click: onNavClick,
        keydown: onNavKeydown
      }, hoverEvents = {
        mouseover: mouseoverPause,
        mouseout: mouseoutRestart
      }, visibilityEvent = { visibilitychange: onVisibilityChange }, docmentKeydownEvent = { keydown: onDocumentKeydown }, touchEvents = {
        touchstart: onPanStart,
        touchmove: onPanMove,
        touchend: onPanEnd,
        touchcancel: onPanEnd
      }, dragEvents = {
        mousedown: onPanStart,
        mousemove: onPanMove,
        mouseup: onPanEnd,
        mouseleave: onPanEnd
      }, hasControls = hasOption("controls"), hasNav = hasOption("nav"), navAsThumbnails = autoWidth ? true : options.navAsThumbnails, hasAutoplay = hasOption("autoplay"), hasTouch = hasOption("touch"), hasMouseDrag = hasOption("mouseDrag"), slideActiveClass = "tns-slide-active", slideClonedClass = "tns-slide-cloned", imgCompleteClass = "tns-complete", imgEvents = {
        load: onImgLoaded,
        error: onImgFailed
      }, imgsComplete, liveregionCurrent, preventScroll = options.preventScrollOnTouch === "force" ? true : false;
      if (hasControls) {
        var controlsContainer = options.controlsContainer, controlsContainerHTML = options.controlsContainer ? options.controlsContainer.outerHTML : "", prevButton = options.prevButton, nextButton = options.nextButton, prevButtonHTML = options.prevButton ? options.prevButton.outerHTML : "", nextButtonHTML = options.nextButton ? options.nextButton.outerHTML : "", prevIsButton, nextIsButton;
      }
      if (hasNav) {
        var navContainer = options.navContainer, navContainerHTML = options.navContainer ? options.navContainer.outerHTML : "", navItems, pages = autoWidth ? slideCount : getPages(), pagesCached = 0, navClicked = -1, navCurrentIndex = getCurrentNavIndex(), navCurrentIndexCached = navCurrentIndex, navActiveClass = "tns-nav-active", navStr = "Carousel Page ", navStrCurrent = " (Current Slide)";
      }
      if (hasAutoplay) {
        var autoplayDirection = options.autoplayDirection === "forward" ? 1 : -1, autoplayButton = options.autoplayButton, autoplayButtonHTML = options.autoplayButton ? options.autoplayButton.outerHTML : "", autoplayHtmlStrings = ["<span class='tns-visually-hidden'>", " animation</span>"], autoplayTimer, animating, autoplayHoverPaused, autoplayUserPaused, autoplayVisibilityPaused;
      }
      if (hasTouch || hasMouseDrag) {
        var initPosition = {}, lastPosition = {}, translateInit, disX, disY, panStart = false, rafIndex, getDist = horizontal ? function(a, b) {
          return a.x - b.x;
        } : function(a, b) {
          return a.y - b.y;
        };
      }
      if (!autoWidth) {
        resetVariblesWhenDisable(disable || freeze);
      }
      if (TRANSFORM) {
        transformAttr = TRANSFORM;
        transformPrefix = "translate";
        if (HAS3DTRANSFORMS) {
          transformPrefix += horizontal ? "3d(" : "3d(0px, ";
          transformPostfix = horizontal ? ", 0px, 0px)" : ", 0px)";
        } else {
          transformPrefix += horizontal ? "X(" : "Y(";
          transformPostfix = ")";
        }
      }
      if (carousel) {
        container.className = container.className.replace("tns-vpfix", "");
      }
      initStructure();
      initSheet();
      initSliderTransform();
      function resetVariblesWhenDisable(condition) {
        if (condition) {
          controls = nav = touch = mouseDrag = arrowKeys = autoplay = autoplayHoverPause = autoplayResetOnVisibility = false;
        }
      }
      function getCurrentSlide() {
        var tem = carousel ? index - cloneCount : index;
        while (tem < 0) {
          tem += slideCount;
        }
        return tem % slideCount + 1;
      }
      function getStartIndex(ind) {
        ind = ind ? Math.max(0, Math.min(loop ? slideCount - 1 : slideCount - items, ind)) : 0;
        return carousel ? ind + cloneCount : ind;
      }
      function getAbsIndex(i) {
        if (i == null) {
          i = index;
        }
        if (carousel) {
          i -= cloneCount;
        }
        while (i < 0) {
          i += slideCount;
        }
        return Math.floor(i % slideCount);
      }
      function getCurrentNavIndex() {
        var absIndex = getAbsIndex(), result;
        result = navAsThumbnails ? absIndex : fixedWidth || autoWidth ? Math.ceil((absIndex + 1) * pages / slideCount - 1) : Math.floor(absIndex / items);
        if (!loop && carousel && index === indexMax) {
          result = pages - 1;
        }
        return result;
      }
      function getItemsMax() {
        if (autoWidth || fixedWidth && !viewportMax) {
          return slideCount - 1;
        } else {
          var str = fixedWidth ? "fixedWidth" : "items", arr = [];
          if (fixedWidth || options[str] < slideCount) {
            arr.push(options[str]);
          }
          if (responsive) {
            for (var bp in responsive) {
              var tem = responsive[bp][str];
              if (tem && (fixedWidth || tem < slideCount)) {
                arr.push(tem);
              }
            }
          }
          if (!arr.length) {
            arr.push(0);
          }
          return Math.ceil(fixedWidth ? viewportMax / Math.min.apply(null, arr) : Math.max.apply(null, arr));
        }
      }
      function getCloneCountForLoop() {
        var itemsMax = getItemsMax(), result = carousel ? Math.ceil((itemsMax * 5 - slideCount) / 2) : itemsMax * 4 - slideCount;
        result = Math.max(itemsMax, result);
        return hasOption("edgePadding") ? result + 1 : result;
      }
      function getWindowWidth() {
        return win2.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
      }
      function getInsertPosition(pos) {
        return pos === "top" ? "afterbegin" : "beforeend";
      }
      function getClientWidth(el) {
        if (el == null) {
          return;
        }
        var div = doc.createElement("div"), rect, width;
        el.appendChild(div);
        rect = div.getBoundingClientRect();
        width = rect.right - rect.left;
        div.remove();
        return width || getClientWidth(el.parentNode);
      }
      function getViewportWidth() {
        var gap = edgePadding ? edgePadding * 2 - gutter : 0;
        return getClientWidth(containerParent) - gap;
      }
      function hasOption(item) {
        if (options[item]) {
          return true;
        } else {
          if (responsive) {
            for (var bp in responsive) {
              if (responsive[bp][item]) {
                return true;
              }
            }
          }
          return false;
        }
      }
      function getOption(item, ww) {
        if (ww == null) {
          ww = windowWidth;
        }
        if (item === "items" && fixedWidth) {
          return Math.floor((viewport + gutter) / (fixedWidth + gutter)) || 1;
        } else {
          var result = options[item];
          if (responsive) {
            for (var bp in responsive) {
              if (ww >= parseInt(bp)) {
                if (item in responsive[bp]) {
                  result = responsive[bp][item];
                }
              }
            }
          }
          if (item === "slideBy" && result === "page") {
            result = getOption("items");
          }
          if (!carousel && (item === "slideBy" || item === "items")) {
            result = Math.floor(result);
          }
          return result;
        }
      }
      function getSlideMarginLeft(i) {
        return CALC ? CALC + "(" + i * 100 + "% / " + slideCountNew + ")" : i * 100 / slideCountNew + "%";
      }
      function getInnerWrapperStyles(edgePaddingTem, gutterTem, fixedWidthTem, speedTem, autoHeightBP) {
        var str = "";
        if (edgePaddingTem !== void 0) {
          var gap = edgePaddingTem;
          if (gutterTem) {
            gap -= gutterTem;
          }
          str = horizontal ? "margin: 0 " + gap + "px 0 " + edgePaddingTem + "px;" : "margin: " + edgePaddingTem + "px 0 " + gap + "px 0;";
        } else if (gutterTem && !fixedWidthTem) {
          var gutterTemUnit = "-" + gutterTem + "px", dir = horizontal ? gutterTemUnit + " 0 0" : "0 " + gutterTemUnit + " 0";
          str = "margin: 0 " + dir + ";";
        }
        if (!carousel && autoHeightBP && TRANSITIONDURATION && speedTem) {
          str += getTransitionDurationStyle(speedTem);
        }
        return str;
      }
      function getContainerWidth(fixedWidthTem, gutterTem, itemsTem) {
        if (fixedWidthTem) {
          return (fixedWidthTem + gutterTem) * slideCountNew + "px";
        } else {
          return CALC ? CALC + "(" + slideCountNew * 100 + "% / " + itemsTem + ")" : slideCountNew * 100 / itemsTem + "%";
        }
      }
      function getSlideWidthStyle(fixedWidthTem, gutterTem, itemsTem) {
        var width;
        if (fixedWidthTem) {
          width = fixedWidthTem + gutterTem + "px";
        } else {
          if (!carousel) {
            itemsTem = Math.floor(itemsTem);
          }
          var dividend = carousel ? slideCountNew : itemsTem;
          width = CALC ? CALC + "(100% / " + dividend + ")" : 100 / dividend + "%";
        }
        width = "width:" + width;
        return nested !== "inner" ? width + ";" : width + " !important;";
      }
      function getSlideGutterStyle(gutterTem) {
        var str = "";
        if (gutterTem !== false) {
          var prop = horizontal ? "padding-" : "margin-", dir = horizontal ? "right" : "bottom";
          str = prop + dir + ": " + gutterTem + "px;";
        }
        return str;
      }
      function getCSSPrefix(name, num) {
        var prefix = name.substring(0, name.length - num).toLowerCase();
        if (prefix) {
          prefix = "-" + prefix + "-";
        }
        return prefix;
      }
      function getTransitionDurationStyle(speed2) {
        return getCSSPrefix(TRANSITIONDURATION, 18) + "transition-duration:" + speed2 / 1e3 + "s;";
      }
      function getAnimationDurationStyle(speed2) {
        return getCSSPrefix(ANIMATIONDURATION, 17) + "animation-duration:" + speed2 / 1e3 + "s;";
      }
      function initStructure() {
        var classOuter = "tns-outer", classInner = "tns-inner", hasGutter = hasOption("gutter");
        outerWrapper.className = classOuter;
        innerWrapper.className = classInner;
        outerWrapper.id = slideId + "-ow";
        innerWrapper.id = slideId + "-iw";
        if (container.id === "") {
          container.id = slideId;
        }
        newContainerClasses += PERCENTAGELAYOUT || autoWidth ? " tns-subpixel" : " tns-no-subpixel";
        newContainerClasses += CALC ? " tns-calc" : " tns-no-calc";
        if (autoWidth) {
          newContainerClasses += " tns-autowidth";
        }
        newContainerClasses += " tns-" + options.axis;
        container.className += newContainerClasses;
        if (carousel) {
          middleWrapper = doc.createElement("div");
          middleWrapper.id = slideId + "-mw";
          middleWrapper.className = "tns-ovh";
          outerWrapper.appendChild(middleWrapper);
          middleWrapper.appendChild(innerWrapper);
        } else {
          outerWrapper.appendChild(innerWrapper);
        }
        if (autoHeight) {
          var wp = middleWrapper ? middleWrapper : innerWrapper;
          wp.className += " tns-ah";
        }
        containerParent.insertBefore(outerWrapper, container);
        innerWrapper.appendChild(container);
        forEach(slideItems, function(item, i) {
          addClass(item, "tns-item");
          if (!item.id) {
            item.id = slideId + "-item" + i;
          }
          if (!carousel && animateNormal) {
            addClass(item, animateNormal);
          }
          setAttrs(item, {
            "aria-hidden": "true",
            tabindex: "-1"
          });
        });
        if (cloneCount) {
          var fragmentBefore = doc.createDocumentFragment(), fragmentAfter = doc.createDocumentFragment();
          for (var j = cloneCount; j--; ) {
            var num = j % slideCount, cloneFirst = slideItems[num].cloneNode(true);
            addClass(cloneFirst, slideClonedClass);
            removeAttrs(cloneFirst, "id");
            fragmentAfter.insertBefore(cloneFirst, fragmentAfter.firstChild);
            if (carousel) {
              var cloneLast = slideItems[slideCount - 1 - num].cloneNode(true);
              addClass(cloneLast, slideClonedClass);
              removeAttrs(cloneLast, "id");
              fragmentBefore.appendChild(cloneLast);
            }
          }
          container.insertBefore(fragmentBefore, container.firstChild);
          container.appendChild(fragmentAfter);
          slideItems = container.children;
        }
      }
      function initSliderTransform() {
        if (hasOption("autoHeight") || autoWidth || !horizontal) {
          var imgs = container.querySelectorAll("img");
          forEach(imgs, function(img) {
            var src = img.src;
            if (!lazyload) {
              if (src && src.indexOf("data:image") < 0) {
                img.src = "";
                addEvents(img, imgEvents);
                addClass(img, "loading");
                img.src = src;
              } else {
                imgLoaded(img);
              }
            }
          });
          raf(function() {
            imgsLoadedCheck(arrayFromNodeList(imgs), function() {
              imgsComplete = true;
            });
          });
          if (hasOption("autoHeight")) {
            imgs = getImageArray(index, Math.min(index + items - 1, slideCountNew - 1));
          }
          lazyload ? initSliderTransformStyleCheck() : raf(function() {
            imgsLoadedCheck(arrayFromNodeList(imgs), initSliderTransformStyleCheck);
          });
        } else {
          if (carousel) {
            doContainerTransformSilent();
          }
          initTools();
          initEvents();
        }
      }
      function initSliderTransformStyleCheck() {
        if (autoWidth && slideCount > 1) {
          var num = loop ? index : slideCount - 1;
          (function stylesApplicationCheck() {
            var left = slideItems[num].getBoundingClientRect().left;
            var right = slideItems[num - 1].getBoundingClientRect().right;
            Math.abs(left - right) <= 1 ? initSliderTransformCore() : setTimeout(function() {
              stylesApplicationCheck();
            }, 16);
          })();
        } else {
          initSliderTransformCore();
        }
      }
      function initSliderTransformCore() {
        if (!horizontal || autoWidth) {
          setSlidePositions();
          if (autoWidth) {
            rightBoundary = getRightBoundary();
            if (freezable) {
              freeze = getFreeze();
            }
            indexMax = getIndexMax();
            resetVariblesWhenDisable(disable || freeze);
          } else {
            updateContentWrapperHeight();
          }
        }
        if (carousel) {
          doContainerTransformSilent();
        }
        initTools();
        initEvents();
      }
      function initSheet() {
        if (!carousel) {
          for (var i = index, l = index + Math.min(slideCount, items); i < l; i++) {
            var item = slideItems[i];
            item.style.left = (i - index) * 100 / items + "%";
            addClass(item, animateIn);
            removeClass(item, animateNormal);
          }
        }
        if (horizontal) {
          if (PERCENTAGELAYOUT || autoWidth) {
            addCSSRule(sheet, "#" + slideId + " > .tns-item", "font-size:" + win2.getComputedStyle(slideItems[0]).fontSize + ";", getCssRulesLength(sheet));
            addCSSRule(sheet, "#" + slideId, "font-size:0;", getCssRulesLength(sheet));
          } else if (carousel) {
            forEach(slideItems, function(slide, i2) {
              slide.style.marginLeft = getSlideMarginLeft(i2);
            });
          }
        }
        if (CSSMQ) {
          if (TRANSITIONDURATION) {
            var str = middleWrapper && options.autoHeight ? getTransitionDurationStyle(options.speed) : "";
            addCSSRule(sheet, "#" + slideId + "-mw", str, getCssRulesLength(sheet));
          }
          str = getInnerWrapperStyles(options.edgePadding, options.gutter, options.fixedWidth, options.speed, options.autoHeight);
          addCSSRule(sheet, "#" + slideId + "-iw", str, getCssRulesLength(sheet));
          if (carousel) {
            str = horizontal && !autoWidth ? "width:" + getContainerWidth(options.fixedWidth, options.gutter, options.items) + ";" : "";
            if (TRANSITIONDURATION) {
              str += getTransitionDurationStyle(speed);
            }
            addCSSRule(sheet, "#" + slideId, str, getCssRulesLength(sheet));
          }
          str = horizontal && !autoWidth ? getSlideWidthStyle(options.fixedWidth, options.gutter, options.items) : "";
          if (options.gutter) {
            str += getSlideGutterStyle(options.gutter);
          }
          if (!carousel) {
            if (TRANSITIONDURATION) {
              str += getTransitionDurationStyle(speed);
            }
            if (ANIMATIONDURATION) {
              str += getAnimationDurationStyle(speed);
            }
          }
          if (str) {
            addCSSRule(sheet, "#" + slideId + " > .tns-item", str, getCssRulesLength(sheet));
          }
        } else {
          update_carousel_transition_duration();
          innerWrapper.style.cssText = getInnerWrapperStyles(edgePadding, gutter, fixedWidth, autoHeight);
          if (carousel && horizontal && !autoWidth) {
            container.style.width = getContainerWidth(fixedWidth, gutter, items);
          }
          var str = horizontal && !autoWidth ? getSlideWidthStyle(fixedWidth, gutter, items) : "";
          if (gutter) {
            str += getSlideGutterStyle(gutter);
          }
          if (str) {
            addCSSRule(sheet, "#" + slideId + " > .tns-item", str, getCssRulesLength(sheet));
          }
        }
        if (responsive && CSSMQ) {
          for (var bp in responsive) {
            bp = parseInt(bp);
            var opts2 = responsive[bp], str = "", middleWrapperStr = "", innerWrapperStr = "", containerStr = "", slideStr = "", itemsBP = !autoWidth ? getOption("items", bp) : null, fixedWidthBP = getOption("fixedWidth", bp), speedBP = getOption("speed", bp), edgePaddingBP = getOption("edgePadding", bp), autoHeightBP = getOption("autoHeight", bp), gutterBP = getOption("gutter", bp);
            if (TRANSITIONDURATION && middleWrapper && getOption("autoHeight", bp) && "speed" in opts2) {
              middleWrapperStr = "#" + slideId + "-mw{" + getTransitionDurationStyle(speedBP) + "}";
            }
            if ("edgePadding" in opts2 || "gutter" in opts2) {
              innerWrapperStr = "#" + slideId + "-iw{" + getInnerWrapperStyles(edgePaddingBP, gutterBP, fixedWidthBP, speedBP, autoHeightBP) + "}";
            }
            if (carousel && horizontal && !autoWidth && ("fixedWidth" in opts2 || "items" in opts2 || fixedWidth && "gutter" in opts2)) {
              containerStr = "width:" + getContainerWidth(fixedWidthBP, gutterBP, itemsBP) + ";";
            }
            if (TRANSITIONDURATION && "speed" in opts2) {
              containerStr += getTransitionDurationStyle(speedBP);
            }
            if (containerStr) {
              containerStr = "#" + slideId + "{" + containerStr + "}";
            }
            if ("fixedWidth" in opts2 || fixedWidth && "gutter" in opts2 || !carousel && "items" in opts2) {
              slideStr += getSlideWidthStyle(fixedWidthBP, gutterBP, itemsBP);
            }
            if ("gutter" in opts2) {
              slideStr += getSlideGutterStyle(gutterBP);
            }
            if (!carousel && "speed" in opts2) {
              if (TRANSITIONDURATION) {
                slideStr += getTransitionDurationStyle(speedBP);
              }
              if (ANIMATIONDURATION) {
                slideStr += getAnimationDurationStyle(speedBP);
              }
            }
            if (slideStr) {
              slideStr = "#" + slideId + " > .tns-item{" + slideStr + "}";
            }
            str = middleWrapperStr + innerWrapperStr + containerStr + slideStr;
            if (str) {
              sheet.insertRule("@media (min-width: " + bp / 16 + "em) {" + str + "}", sheet.cssRules.length);
            }
          }
        }
      }
      function initTools() {
        updateSlideStatus();
        outerWrapper.insertAdjacentHTML("afterbegin", '<div class="tns-liveregion tns-visually-hidden" aria-live="polite" aria-atomic="true">slide <span class="current">' + getLiveRegionStr() + "</span>  of " + slideCount + "</div>");
        liveregionCurrent = outerWrapper.querySelector(".tns-liveregion .current");
        if (hasAutoplay) {
          var txt = autoplay ? "stop" : "start";
          if (autoplayButton) {
            setAttrs(autoplayButton, { "data-action": txt });
          } else if (options.autoplayButtonOutput) {
            outerWrapper.insertAdjacentHTML(getInsertPosition(options.autoplayPosition), '<button type="button" data-action="' + txt + '">' + autoplayHtmlStrings[0] + txt + autoplayHtmlStrings[1] + autoplayText[0] + "</button>");
            autoplayButton = outerWrapper.querySelector("[data-action]");
          }
          if (autoplayButton) {
            addEvents(autoplayButton, { click: toggleAutoplay });
          }
          if (autoplay) {
            startAutoplay();
            if (autoplayHoverPause) {
              addEvents(container, hoverEvents);
            }
            if (autoplayResetOnVisibility) {
              addEvents(container, visibilityEvent);
            }
          }
        }
        if (hasNav) {
          var initIndex = !carousel ? 0 : cloneCount;
          if (navContainer) {
            setAttrs(navContainer, { "aria-label": "Carousel Pagination" });
            navItems = navContainer.children;
            forEach(navItems, function(item, i2) {
              setAttrs(item, {
                "data-nav": i2,
                tabindex: "-1",
                "aria-label": navStr + (i2 + 1),
                "aria-controls": slideId
              });
            });
          } else {
            var navHtml = "", hiddenStr = navAsThumbnails ? "" : 'style="display:none"';
            for (var i = 0; i < slideCount; i++) {
              navHtml += '<button type="button" data-nav="' + i + '" tabindex="-1" aria-controls="' + slideId + '" ' + hiddenStr + ' aria-label="' + navStr + (i + 1) + '"></button>';
            }
            navHtml = '<div class="tns-nav" aria-label="Carousel Pagination">' + navHtml + "</div>";
            outerWrapper.insertAdjacentHTML(getInsertPosition(options.navPosition), navHtml);
            navContainer = outerWrapper.querySelector(".tns-nav");
            navItems = navContainer.children;
          }
          updateNavVisibility();
          if (TRANSITIONDURATION) {
            var prefix = TRANSITIONDURATION.substring(0, TRANSITIONDURATION.length - 18).toLowerCase(), str = "transition: all " + speed / 1e3 + "s";
            if (prefix) {
              str = "-" + prefix + "-" + str;
            }
            addCSSRule(sheet, "[aria-controls^=" + slideId + "-item]", str, getCssRulesLength(sheet));
          }
          setAttrs(navItems[navCurrentIndex], { "aria-label": navStr + (navCurrentIndex + 1) + navStrCurrent });
          removeAttrs(navItems[navCurrentIndex], "tabindex");
          addClass(navItems[navCurrentIndex], navActiveClass);
          addEvents(navContainer, navEvents);
        }
        if (hasControls) {
          if (!controlsContainer && (!prevButton || !nextButton)) {
            outerWrapper.insertAdjacentHTML(getInsertPosition(options.controlsPosition), '<div class="tns-controls" aria-label="Carousel Navigation" tabindex="0"><button type="button" data-controls="prev" tabindex="-1" aria-controls="' + slideId + '">' + controlsText[0] + '</button><button type="button" data-controls="next" tabindex="-1" aria-controls="' + slideId + '">' + controlsText[1] + "</button></div>");
            controlsContainer = outerWrapper.querySelector(".tns-controls");
          }
          if (!prevButton || !nextButton) {
            prevButton = controlsContainer.children[0];
            nextButton = controlsContainer.children[1];
          }
          if (options.controlsContainer) {
            setAttrs(controlsContainer, {
              "aria-label": "Carousel Navigation",
              tabindex: "0"
            });
          }
          if (options.controlsContainer || options.prevButton && options.nextButton) {
            setAttrs([prevButton, nextButton], {
              "aria-controls": slideId,
              tabindex: "-1"
            });
          }
          if (options.controlsContainer || options.prevButton && options.nextButton) {
            setAttrs(prevButton, { "data-controls": "prev" });
            setAttrs(nextButton, { "data-controls": "next" });
          }
          prevIsButton = isButton(prevButton);
          nextIsButton = isButton(nextButton);
          updateControlsStatus();
          if (controlsContainer) {
            addEvents(controlsContainer, controlsEvents);
          } else {
            addEvents(prevButton, controlsEvents);
            addEvents(nextButton, controlsEvents);
          }
        }
        disableUI();
      }
      function initEvents() {
        if (carousel && TRANSITIONEND) {
          var eve = {};
          eve[TRANSITIONEND] = onTransitionEnd;
          addEvents(container, eve);
        }
        if (touch) {
          addEvents(container, touchEvents, options.preventScrollOnTouch);
        }
        if (mouseDrag) {
          addEvents(container, dragEvents);
        }
        if (arrowKeys) {
          addEvents(doc, docmentKeydownEvent);
        }
        if (nested === "inner") {
          events.on("outerResized", function() {
            resizeTasks();
            events.emit("innerLoaded", info());
          });
        } else if (responsive || fixedWidth || autoWidth || autoHeight || !horizontal) {
          addEvents(win2, { resize: onResize });
        }
        if (autoHeight) {
          if (nested === "outer") {
            events.on("innerLoaded", doAutoHeight);
          } else if (!disable) {
            doAutoHeight();
          }
        }
        doLazyLoad();
        if (disable) {
          disableSlider();
        } else if (freeze) {
          freezeSlider();
        }
        events.on("indexChanged", additionalUpdates);
        if (nested === "inner") {
          events.emit("innerLoaded", info());
        }
        if (typeof onInit === "function") {
          onInit(info());
        }
        isOn = true;
      }
      function destroy() {
        sheet.disabled = true;
        if (sheet.ownerNode) {
          sheet.ownerNode.remove();
        }
        removeEvents(win2, { resize: onResize });
        if (arrowKeys) {
          removeEvents(doc, docmentKeydownEvent);
        }
        if (controlsContainer) {
          removeEvents(controlsContainer, controlsEvents);
        }
        if (navContainer) {
          removeEvents(navContainer, navEvents);
        }
        removeEvents(container, hoverEvents);
        removeEvents(container, visibilityEvent);
        if (autoplayButton) {
          removeEvents(autoplayButton, { click: toggleAutoplay });
        }
        if (autoplay) {
          clearInterval(autoplayTimer);
        }
        if (carousel && TRANSITIONEND) {
          var eve = {};
          eve[TRANSITIONEND] = onTransitionEnd;
          removeEvents(container, eve);
        }
        if (touch) {
          removeEvents(container, touchEvents);
        }
        if (mouseDrag) {
          removeEvents(container, dragEvents);
        }
        var htmlList = [
          containerHTML,
          controlsContainerHTML,
          prevButtonHTML,
          nextButtonHTML,
          navContainerHTML,
          autoplayButtonHTML
        ];
        tnsList.forEach(function(item, i) {
          var el = item === "container" ? outerWrapper : options[item];
          if (typeof el === "object" && el) {
            var prevEl = el.previousElementSibling ? el.previousElementSibling : false, parentEl = el.parentNode;
            el.outerHTML = htmlList[i];
            options[item] = prevEl ? prevEl.nextElementSibling : parentEl.firstElementChild;
          }
        });
        tnsList = animateIn = animateOut = animateDelay = animateNormal = horizontal = outerWrapper = innerWrapper = container = containerParent = containerHTML = slideItems = slideCount = breakpointZone = windowWidth = autoWidth = fixedWidth = edgePadding = gutter = viewport = items = slideBy = viewportMax = arrowKeys = speed = rewind = loop = autoHeight = sheet = lazyload = slidePositions = slideItemsOut = cloneCount = slideCountNew = hasRightDeadZone = rightBoundary = updateIndexBeforeTransform = transformAttr = transformPrefix = transformPostfix = getIndexMax = index = indexCached = indexMin = indexMax = resizeTimer = swipeAngle = moveDirectionExpected = running = onInit = events = newContainerClasses = slideId = disable = disabled = freezable = freeze = frozen = controlsEvents = navEvents = hoverEvents = visibilityEvent = docmentKeydownEvent = touchEvents = dragEvents = hasControls = hasNav = navAsThumbnails = hasAutoplay = hasTouch = hasMouseDrag = slideActiveClass = imgCompleteClass = imgEvents = imgsComplete = controls = controlsText = controlsContainer = controlsContainerHTML = prevButton = nextButton = prevIsButton = nextIsButton = nav = navContainer = navContainerHTML = navItems = pages = pagesCached = navClicked = navCurrentIndex = navCurrentIndexCached = navActiveClass = navStr = navStrCurrent = autoplay = autoplayTimeout = autoplayDirection = autoplayText = autoplayHoverPause = autoplayButton = autoplayButtonHTML = autoplayResetOnVisibility = autoplayHtmlStrings = autoplayTimer = animating = autoplayHoverPaused = autoplayUserPaused = autoplayVisibilityPaused = initPosition = lastPosition = translateInit = disX = disY = panStart = rafIndex = getDist = touch = mouseDrag = null;
        for (var a in this) {
          if (a !== "rebuild") {
            this[a] = null;
          }
        }
        isOn = false;
      }
      function onResize(e) {
        raf(function() {
          resizeTasks(getEvent(e));
        });
      }
      function resizeTasks(e) {
        if (!isOn) {
          return;
        }
        if (nested === "outer") {
          events.emit("outerResized", info(e));
        }
        windowWidth = getWindowWidth();
        var bpChanged, breakpointZoneTem = breakpointZone, needContainerTransform = false;
        if (responsive) {
          setBreakpointZone();
          bpChanged = breakpointZoneTem !== breakpointZone;
          if (bpChanged) {
            events.emit("newBreakpointStart", info(e));
          }
        }
        var indChanged, itemsChanged, itemsTem = items, disableTem = disable, freezeTem = freeze, arrowKeysTem = arrowKeys, controlsTem = controls, navTem = nav, touchTem = touch, mouseDragTem = mouseDrag, autoplayTem = autoplay, autoplayHoverPauseTem = autoplayHoverPause, autoplayResetOnVisibilityTem = autoplayResetOnVisibility, indexTem = index;
        if (bpChanged) {
          var fixedWidthTem = fixedWidth, autoHeightTem = autoHeight, controlsTextTem = controlsText, centerTem = center, autoplayTextTem = autoplayText;
          if (!CSSMQ) {
            var gutterTem = gutter, edgePaddingTem = edgePadding;
          }
        }
        arrowKeys = getOption("arrowKeys");
        controls = getOption("controls");
        nav = getOption("nav");
        touch = getOption("touch");
        center = getOption("center");
        mouseDrag = getOption("mouseDrag");
        autoplay = getOption("autoplay");
        autoplayHoverPause = getOption("autoplayHoverPause");
        autoplayResetOnVisibility = getOption("autoplayResetOnVisibility");
        if (bpChanged) {
          disable = getOption("disable");
          fixedWidth = getOption("fixedWidth");
          speed = getOption("speed");
          autoHeight = getOption("autoHeight");
          controlsText = getOption("controlsText");
          autoplayText = getOption("autoplayText");
          autoplayTimeout = getOption("autoplayTimeout");
          if (!CSSMQ) {
            edgePadding = getOption("edgePadding");
            gutter = getOption("gutter");
          }
        }
        resetVariblesWhenDisable(disable);
        viewport = getViewportWidth();
        if ((!horizontal || autoWidth) && !disable) {
          setSlidePositions();
          if (!horizontal) {
            updateContentWrapperHeight();
            needContainerTransform = true;
          }
        }
        if (fixedWidth || autoWidth) {
          rightBoundary = getRightBoundary();
          indexMax = getIndexMax();
        }
        if (bpChanged || fixedWidth) {
          items = getOption("items");
          slideBy = getOption("slideBy");
          itemsChanged = items !== itemsTem;
          if (itemsChanged) {
            if (!fixedWidth && !autoWidth) {
              indexMax = getIndexMax();
            }
            updateIndex();
          }
        }
        if (bpChanged) {
          if (disable !== disableTem) {
            if (disable) {
              disableSlider();
            } else {
              enableSlider();
            }
          }
        }
        if (freezable && (bpChanged || fixedWidth || autoWidth)) {
          freeze = getFreeze();
          if (freeze !== freezeTem) {
            if (freeze) {
              doContainerTransform(getContainerTransformValue(getStartIndex(0)));
              freezeSlider();
            } else {
              unfreezeSlider();
              needContainerTransform = true;
            }
          }
        }
        resetVariblesWhenDisable(disable || freeze);
        if (!autoplay) {
          autoplayHoverPause = autoplayResetOnVisibility = false;
        }
        if (arrowKeys !== arrowKeysTem) {
          arrowKeys ? addEvents(doc, docmentKeydownEvent) : removeEvents(doc, docmentKeydownEvent);
        }
        if (controls !== controlsTem) {
          if (controls) {
            if (controlsContainer) {
              showElement(controlsContainer);
            } else {
              if (prevButton) {
                showElement(prevButton);
              }
              if (nextButton) {
                showElement(nextButton);
              }
            }
          } else {
            if (controlsContainer) {
              hideElement(controlsContainer);
            } else {
              if (prevButton) {
                hideElement(prevButton);
              }
              if (nextButton) {
                hideElement(nextButton);
              }
            }
          }
        }
        if (nav !== navTem) {
          if (nav) {
            showElement(navContainer);
            updateNavVisibility();
          } else {
            hideElement(navContainer);
          }
        }
        if (touch !== touchTem) {
          touch ? addEvents(container, touchEvents, options.preventScrollOnTouch) : removeEvents(container, touchEvents);
        }
        if (mouseDrag !== mouseDragTem) {
          mouseDrag ? addEvents(container, dragEvents) : removeEvents(container, dragEvents);
        }
        if (autoplay !== autoplayTem) {
          if (autoplay) {
            if (autoplayButton) {
              showElement(autoplayButton);
            }
            if (!animating && !autoplayUserPaused) {
              startAutoplay();
            }
          } else {
            if (autoplayButton) {
              hideElement(autoplayButton);
            }
            if (animating) {
              stopAutoplay();
            }
          }
        }
        if (autoplayHoverPause !== autoplayHoverPauseTem) {
          autoplayHoverPause ? addEvents(container, hoverEvents) : removeEvents(container, hoverEvents);
        }
        if (autoplayResetOnVisibility !== autoplayResetOnVisibilityTem) {
          autoplayResetOnVisibility ? addEvents(doc, visibilityEvent) : removeEvents(doc, visibilityEvent);
        }
        if (bpChanged) {
          if (fixedWidth !== fixedWidthTem || center !== centerTem) {
            needContainerTransform = true;
          }
          if (autoHeight !== autoHeightTem) {
            if (!autoHeight) {
              innerWrapper.style.height = "";
            }
          }
          if (controls && controlsText !== controlsTextTem) {
            prevButton.innerHTML = controlsText[0];
            nextButton.innerHTML = controlsText[1];
          }
          if (autoplayButton && autoplayText !== autoplayTextTem) {
            var i = autoplay ? 1 : 0, html = autoplayButton.innerHTML, len = html.length - autoplayTextTem[i].length;
            if (html.substring(len) === autoplayTextTem[i]) {
              autoplayButton.innerHTML = html.substring(0, len) + autoplayText[i];
            }
          }
        } else {
          if (center && (fixedWidth || autoWidth)) {
            needContainerTransform = true;
          }
        }
        if (itemsChanged || fixedWidth && !autoWidth) {
          pages = getPages();
          updateNavVisibility();
        }
        indChanged = index !== indexTem;
        if (indChanged) {
          events.emit("indexChanged", info());
          needContainerTransform = true;
        } else if (itemsChanged) {
          if (!indChanged) {
            additionalUpdates();
          }
        } else if (fixedWidth || autoWidth) {
          doLazyLoad();
          updateSlideStatus();
          updateLiveRegion();
        }
        if (itemsChanged && !carousel) {
          updateGallerySlidePositions();
        }
        if (!disable && !freeze) {
          if (bpChanged && !CSSMQ) {
            if (edgePadding !== edgePaddingTem || gutter !== gutterTem) {
              innerWrapper.style.cssText = getInnerWrapperStyles(edgePadding, gutter, fixedWidth, speed, autoHeight);
            }
            if (horizontal) {
              if (carousel) {
                container.style.width = getContainerWidth(fixedWidth, gutter, items);
              }
              var str = getSlideWidthStyle(fixedWidth, gutter, items) + getSlideGutterStyle(gutter);
              removeCSSRule(sheet, getCssRulesLength(sheet) - 1);
              addCSSRule(sheet, "#" + slideId + " > .tns-item", str, getCssRulesLength(sheet));
            }
          }
          if (autoHeight) {
            doAutoHeight();
          }
          if (needContainerTransform) {
            doContainerTransformSilent();
            indexCached = index;
          }
        }
        if (bpChanged) {
          events.emit("newBreakpointEnd", info(e));
        }
      }
      function getFreeze() {
        if (!fixedWidth && !autoWidth) {
          var a = center ? items - (items - 1) / 2 : items;
          return slideCount <= a;
        }
        var width = fixedWidth ? (fixedWidth + gutter) * slideCount : slidePositions[slideCount], vp = edgePadding ? viewport + edgePadding * 2 : viewport + gutter;
        if (center) {
          vp -= fixedWidth ? (viewport - fixedWidth) / 2 : (viewport - (slidePositions[index + 1] - slidePositions[index] - gutter)) / 2;
        }
        return width <= vp;
      }
      function setBreakpointZone() {
        breakpointZone = 0;
        for (var bp in responsive) {
          bp = parseInt(bp);
          if (windowWidth >= bp) {
            breakpointZone = bp;
          }
        }
      }
      var updateIndex = function() {
        return loop ? carousel ? function() {
          var leftEdge = indexMin, rightEdge = indexMax;
          leftEdge += slideBy;
          rightEdge -= slideBy;
          if (edgePadding) {
            leftEdge += 1;
            rightEdge -= 1;
          } else if (fixedWidth) {
            if ((viewport + gutter) % (fixedWidth + gutter)) {
              rightEdge -= 1;
            }
          }
          if (cloneCount) {
            if (index > rightEdge) {
              index -= slideCount;
            } else if (index < leftEdge) {
              index += slideCount;
            }
          }
        } : function() {
          if (index > indexMax) {
            while (index >= indexMin + slideCount) {
              index -= slideCount;
            }
          } else if (index < indexMin) {
            while (index <= indexMax - slideCount) {
              index += slideCount;
            }
          }
        } : function() {
          index = Math.max(indexMin, Math.min(indexMax, index));
        };
      }();
      function disableUI() {
        if (!autoplay && autoplayButton) {
          hideElement(autoplayButton);
        }
        if (!nav && navContainer) {
          hideElement(navContainer);
        }
        if (!controls) {
          if (controlsContainer) {
            hideElement(controlsContainer);
          } else {
            if (prevButton) {
              hideElement(prevButton);
            }
            if (nextButton) {
              hideElement(nextButton);
            }
          }
        }
      }
      function enableUI() {
        if (autoplay && autoplayButton) {
          showElement(autoplayButton);
        }
        if (nav && navContainer) {
          showElement(navContainer);
        }
        if (controls) {
          if (controlsContainer) {
            showElement(controlsContainer);
          } else {
            if (prevButton) {
              showElement(prevButton);
            }
            if (nextButton) {
              showElement(nextButton);
            }
          }
        }
      }
      function freezeSlider() {
        if (frozen) {
          return;
        }
        if (edgePadding) {
          innerWrapper.style.margin = "0px";
        }
        if (cloneCount) {
          var str = "tns-transparent";
          for (var i = cloneCount; i--; ) {
            if (carousel) {
              addClass(slideItems[i], str);
            }
            addClass(slideItems[slideCountNew - i - 1], str);
          }
        }
        disableUI();
        frozen = true;
      }
      function unfreezeSlider() {
        if (!frozen) {
          return;
        }
        if (edgePadding && CSSMQ) {
          innerWrapper.style.margin = "";
        }
        if (cloneCount) {
          var str = "tns-transparent";
          for (var i = cloneCount; i--; ) {
            if (carousel) {
              removeClass(slideItems[i], str);
            }
            removeClass(slideItems[slideCountNew - i - 1], str);
          }
        }
        enableUI();
        frozen = false;
      }
      function disableSlider() {
        if (disabled) {
          return;
        }
        sheet.disabled = true;
        container.className = container.className.replace(newContainerClasses.substring(1), "");
        removeAttrs(container, ["style"]);
        if (loop) {
          for (var j = cloneCount; j--; ) {
            if (carousel) {
              hideElement(slideItems[j]);
            }
            hideElement(slideItems[slideCountNew - j - 1]);
          }
        }
        if (!horizontal || !carousel) {
          removeAttrs(innerWrapper, ["style"]);
        }
        if (!carousel) {
          for (var i = index, l = index + slideCount; i < l; i++) {
            var item = slideItems[i];
            removeAttrs(item, ["style"]);
            removeClass(item, animateIn);
            removeClass(item, animateNormal);
          }
        }
        disableUI();
        disabled = true;
      }
      function enableSlider() {
        if (!disabled) {
          return;
        }
        sheet.disabled = false;
        container.className += newContainerClasses;
        doContainerTransformSilent();
        if (loop) {
          for (var j = cloneCount; j--; ) {
            if (carousel) {
              showElement(slideItems[j]);
            }
            showElement(slideItems[slideCountNew - j - 1]);
          }
        }
        if (!carousel) {
          for (var i = index, l = index + slideCount; i < l; i++) {
            var item = slideItems[i], classN = i < index + items ? animateIn : animateNormal;
            item.style.left = (i - index) * 100 / items + "%";
            addClass(item, classN);
          }
        }
        enableUI();
        disabled = false;
      }
      function updateLiveRegion() {
        var str = getLiveRegionStr();
        if (liveregionCurrent.innerHTML !== str) {
          liveregionCurrent.innerHTML = str;
        }
      }
      function getLiveRegionStr() {
        var arr = getVisibleSlideRange(), start = arr[0] + 1, end = arr[1] + 1;
        return start === end ? start + "" : start + " to " + end;
      }
      function getVisibleSlideRange(val2) {
        if (val2 == null) {
          val2 = getContainerTransformValue();
        }
        var start = index, end, rangestart, rangeend;
        if (center || edgePadding) {
          if (autoWidth || fixedWidth) {
            rangestart = -(parseFloat(val2) + edgePadding);
            rangeend = rangestart + viewport + edgePadding * 2;
          }
        } else {
          if (autoWidth) {
            rangestart = slidePositions[index];
            rangeend = rangestart + viewport;
          }
        }
        if (autoWidth) {
          slidePositions.forEach(function(point, i) {
            if (i < slideCountNew) {
              if ((center || edgePadding) && point <= rangestart + 0.5) {
                start = i;
              }
              if (rangeend - point >= 0.5) {
                end = i;
              }
            }
          });
        } else {
          if (fixedWidth) {
            var cell = fixedWidth + gutter;
            if (center || edgePadding) {
              start = Math.floor(rangestart / cell);
              end = Math.ceil(rangeend / cell - 1);
            } else {
              end = start + Math.ceil(viewport / cell) - 1;
            }
          } else {
            if (center || edgePadding) {
              var a = items - 1;
              if (center) {
                start -= a / 2;
                end = index + a / 2;
              } else {
                end = index + a;
              }
              if (edgePadding) {
                var b = edgePadding * items / viewport;
                start -= b;
                end += b;
              }
              start = Math.floor(start);
              end = Math.ceil(end);
            } else {
              end = start + items - 1;
            }
          }
          start = Math.max(start, 0);
          end = Math.min(end, slideCountNew - 1);
        }
        return [start, end];
      }
      function doLazyLoad() {
        if (lazyload && !disable) {
          var arg = getVisibleSlideRange();
          arg.push(lazyloadSelector);
          getImageArray.apply(null, arg).forEach(function(img) {
            if (!hasClass(img, imgCompleteClass)) {
              var eve = {};
              eve[TRANSITIONEND] = function(e) {
                e.stopPropagation();
              };
              addEvents(img, eve);
              addEvents(img, imgEvents);
              img.src = getAttr(img, "data-src");
              var srcset = getAttr(img, "data-srcset");
              if (srcset) {
                img.srcset = srcset;
              }
              addClass(img, "loading");
            }
          });
        }
      }
      function onImgLoaded(e) {
        imgLoaded(getTarget(e));
      }
      function onImgFailed(e) {
        imgFailed(getTarget(e));
      }
      function imgLoaded(img) {
        addClass(img, "loaded");
        imgCompleted(img);
      }
      function imgFailed(img) {
        addClass(img, "failed");
        imgCompleted(img);
      }
      function imgCompleted(img) {
        addClass(img, imgCompleteClass);
        removeClass(img, "loading");
        removeEvents(img, imgEvents);
      }
      function getImageArray(start, end, imgSelector) {
        var imgs = [];
        if (!imgSelector) {
          imgSelector = "img";
        }
        while (start <= end) {
          forEach(slideItems[start].querySelectorAll(imgSelector), function(img) {
            imgs.push(img);
          });
          start++;
        }
        return imgs;
      }
      function doAutoHeight() {
        var imgs = getImageArray.apply(null, getVisibleSlideRange());
        raf(function() {
          imgsLoadedCheck(imgs, updateInnerWrapperHeight);
        });
      }
      function imgsLoadedCheck(imgs, cb) {
        if (imgsComplete) {
          return cb();
        }
        imgs.forEach(function(img, index2) {
          if (!lazyload && img.complete) {
            imgCompleted(img);
          }
          if (hasClass(img, imgCompleteClass)) {
            imgs.splice(index2, 1);
          }
        });
        if (!imgs.length) {
          return cb();
        }
        raf(function() {
          imgsLoadedCheck(imgs, cb);
        });
      }
      function additionalUpdates() {
        doLazyLoad();
        updateSlideStatus();
        updateLiveRegion();
        updateControlsStatus();
        updateNavStatus();
      }
      function update_carousel_transition_duration() {
        if (carousel && autoHeight) {
          middleWrapper.style[TRANSITIONDURATION] = speed / 1e3 + "s";
        }
      }
      function getMaxSlideHeight(slideStart, slideRange) {
        var heights = [];
        for (var i = slideStart, l = Math.min(slideStart + slideRange, slideCountNew); i < l; i++) {
          heights.push(slideItems[i].offsetHeight);
        }
        return Math.max.apply(null, heights);
      }
      function updateInnerWrapperHeight() {
        var maxHeight = autoHeight ? getMaxSlideHeight(index, items) : getMaxSlideHeight(cloneCount, slideCount), wp = middleWrapper ? middleWrapper : innerWrapper;
        if (wp.style.height !== maxHeight) {
          wp.style.height = maxHeight + "px";
        }
      }
      function setSlidePositions() {
        slidePositions = [0];
        var attr = horizontal ? "left" : "top", attr2 = horizontal ? "right" : "bottom", base = slideItems[0].getBoundingClientRect()[attr];
        forEach(slideItems, function(item, i) {
          if (i) {
            slidePositions.push(item.getBoundingClientRect()[attr] - base);
          }
          if (i === slideCountNew - 1) {
            slidePositions.push(item.getBoundingClientRect()[attr2] - base);
          }
        });
      }
      function updateSlideStatus() {
        var range = getVisibleSlideRange(), start = range[0], end = range[1];
        forEach(slideItems, function(item, i) {
          if (i >= start && i <= end) {
            if (hasAttr(item, "aria-hidden")) {
              removeAttrs(item, ["aria-hidden", "tabindex"]);
              addClass(item, slideActiveClass);
            }
          } else {
            if (!hasAttr(item, "aria-hidden")) {
              setAttrs(item, {
                "aria-hidden": "true",
                tabindex: "-1"
              });
              removeClass(item, slideActiveClass);
            }
          }
        });
      }
      function updateGallerySlidePositions() {
        var l = index + Math.min(slideCount, items);
        for (var i = slideCountNew; i--; ) {
          var item = slideItems[i];
          if (i >= index && i < l) {
            addClass(item, "tns-moving");
            item.style.left = (i - index) * 100 / items + "%";
            addClass(item, animateIn);
            removeClass(item, animateNormal);
          } else if (item.style.left) {
            item.style.left = "";
            addClass(item, animateNormal);
            removeClass(item, animateIn);
          }
          removeClass(item, animateOut);
        }
        setTimeout(function() {
          forEach(slideItems, function(el) {
            removeClass(el, "tns-moving");
          });
        }, 300);
      }
      function updateNavStatus() {
        if (nav) {
          navCurrentIndex = navClicked >= 0 ? navClicked : getCurrentNavIndex();
          navClicked = -1;
          if (navCurrentIndex !== navCurrentIndexCached) {
            var navPrev = navItems[navCurrentIndexCached], navCurrent = navItems[navCurrentIndex];
            setAttrs(navPrev, {
              tabindex: "-1",
              "aria-label": navStr + (navCurrentIndexCached + 1)
            });
            removeClass(navPrev, navActiveClass);
            setAttrs(navCurrent, { "aria-label": navStr + (navCurrentIndex + 1) + navStrCurrent });
            removeAttrs(navCurrent, "tabindex");
            addClass(navCurrent, navActiveClass);
            navCurrentIndexCached = navCurrentIndex;
          }
        }
      }
      function getLowerCaseNodeName(el) {
        return el.nodeName.toLowerCase();
      }
      function isButton(el) {
        return getLowerCaseNodeName(el) === "button";
      }
      function isAriaDisabled(el) {
        return el.getAttribute("aria-disabled") === "true";
      }
      function disEnableElement(isButton2, el, val2) {
        if (isButton2) {
          el.disabled = val2;
        } else {
          el.setAttribute("aria-disabled", val2.toString());
        }
      }
      function updateControlsStatus() {
        if (!controls || rewind || loop) {
          return;
        }
        var prevDisabled = prevIsButton ? prevButton.disabled : isAriaDisabled(prevButton), nextDisabled = nextIsButton ? nextButton.disabled : isAriaDisabled(nextButton), disablePrev = index <= indexMin ? true : false, disableNext = !rewind && index >= indexMax ? true : false;
        if (disablePrev && !prevDisabled) {
          disEnableElement(prevIsButton, prevButton, true);
        }
        if (!disablePrev && prevDisabled) {
          disEnableElement(prevIsButton, prevButton, false);
        }
        if (disableNext && !nextDisabled) {
          disEnableElement(nextIsButton, nextButton, true);
        }
        if (!disableNext && nextDisabled) {
          disEnableElement(nextIsButton, nextButton, false);
        }
      }
      function resetDuration(el, str) {
        if (TRANSITIONDURATION) {
          el.style[TRANSITIONDURATION] = str;
        }
      }
      function getSliderWidth() {
        return fixedWidth ? (fixedWidth + gutter) * slideCountNew : slidePositions[slideCountNew];
      }
      function getCenterGap(num) {
        if (num == null) {
          num = index;
        }
        var gap = edgePadding ? gutter : 0;
        return autoWidth ? (viewport - gap - (slidePositions[num + 1] - slidePositions[num] - gutter)) / 2 : fixedWidth ? (viewport - fixedWidth) / 2 : (items - 1) / 2;
      }
      function getRightBoundary() {
        var gap = edgePadding ? gutter : 0, result = viewport + gap - getSliderWidth();
        if (center && !loop) {
          result = fixedWidth ? -(fixedWidth + gutter) * (slideCountNew - 1) - getCenterGap() : getCenterGap(slideCountNew - 1) - slidePositions[slideCountNew - 1];
        }
        if (result > 0) {
          result = 0;
        }
        return result;
      }
      function getContainerTransformValue(num) {
        if (num == null) {
          num = index;
        }
        var val2;
        if (horizontal && !autoWidth) {
          if (fixedWidth) {
            val2 = -(fixedWidth + gutter) * num;
            if (center) {
              val2 += getCenterGap();
            }
          } else {
            var denominator = TRANSFORM ? slideCountNew : items;
            if (center) {
              num -= getCenterGap();
            }
            val2 = -num * 100 / denominator;
          }
        } else {
          val2 = -slidePositions[num];
          if (center && autoWidth) {
            val2 += getCenterGap();
          }
        }
        if (hasRightDeadZone) {
          val2 = Math.max(val2, rightBoundary);
        }
        val2 += horizontal && !autoWidth && !fixedWidth ? "%" : "px";
        return val2;
      }
      function doContainerTransformSilent(val2) {
        resetDuration(container, "0s");
        doContainerTransform(val2);
      }
      function doContainerTransform(val2) {
        if (val2 == null) {
          val2 = getContainerTransformValue();
        }
        if (document.body.dir == "rtl" && val2.charAt(0) === "-") {
          val2 = val2.substr(1);
        }
        container.style[transformAttr] = transformPrefix + val2 + transformPostfix;
      }
      function animateSlide(number, classOut, classIn, isOut) {
        var l = number + items;
        if (!loop) {
          l = Math.min(l, slideCountNew);
        }
        for (var i = number; i < l; i++) {
          var item = slideItems[i];
          if (!isOut) {
            item.style.left = (i - index) * 100 / items + "%";
          }
          if (animateDelay && TRANSITIONDELAY) {
            item.style[TRANSITIONDELAY] = item.style[ANIMATIONDELAY] = animateDelay * (i - number) / 1e3 + "s";
          }
          removeClass(item, classOut);
          addClass(item, classIn);
          if (isOut) {
            slideItemsOut.push(item);
          }
        }
      }
      var transformCore = function() {
        return carousel ? function() {
          resetDuration(container, "");
          if (TRANSITIONDURATION || !speed) {
            doContainerTransform();
            if (!speed || !isVisible(container)) {
              onTransitionEnd();
            }
          } else {
            jsTransform(container, transformAttr, transformPrefix, transformPostfix, getContainerTransformValue(), speed, onTransitionEnd);
          }
          if (!horizontal) {
            updateContentWrapperHeight();
          }
        } : function() {
          slideItemsOut = [];
          var eve = {};
          eve[TRANSITIONEND] = eve[ANIMATIONEND] = onTransitionEnd;
          removeEvents(slideItems[indexCached], eve);
          addEvents(slideItems[index], eve);
          animateSlide(indexCached, animateIn, animateOut, true);
          animateSlide(index, animateNormal, animateIn);
          if (!TRANSITIONEND || !ANIMATIONEND || !speed || !isVisible(container)) {
            onTransitionEnd();
          }
        };
      }();
      function render(e, sliderMoved) {
        if (updateIndexBeforeTransform) {
          updateIndex();
        }
        if (index !== indexCached || sliderMoved) {
          events.emit("indexChanged", info());
          events.emit("transitionStart", info());
          if (autoHeight) {
            doAutoHeight();
          }
          if (animating && e && ["click", "keydown"].indexOf(e.type) >= 0) {
            stopAutoplay();
          }
          running = true;
          transformCore();
        }
      }
      function strTrans(str) {
        return str.toLowerCase().replace(/-/g, "");
      }
      function onTransitionEnd(event) {
        if (carousel || running) {
          events.emit("transitionEnd", info(event));
          if (!carousel && slideItemsOut.length > 0) {
            for (var i = 0; i < slideItemsOut.length; i++) {
              var item = slideItemsOut[i];
              item.style.left = "";
              if (ANIMATIONDELAY && TRANSITIONDELAY) {
                item.style[ANIMATIONDELAY] = "";
                item.style[TRANSITIONDELAY] = "";
              }
              removeClass(item, animateOut);
              addClass(item, animateNormal);
            }
          }
          if (!event || !carousel && event.target.parentNode === container || event.target === container && strTrans(event.propertyName) === strTrans(transformAttr)) {
            if (!updateIndexBeforeTransform) {
              var indexTem = index;
              updateIndex();
              if (index !== indexTem) {
                events.emit("indexChanged", info());
                doContainerTransformSilent();
              }
            }
            if (nested === "inner") {
              events.emit("innerLoaded", info());
            }
            running = false;
            indexCached = index;
          }
        }
      }
      function goTo(targetIndex, e) {
        if (freeze) {
          return;
        }
        if (targetIndex === "prev") {
          onControlsClick(e, -1);
        } else if (targetIndex === "next") {
          onControlsClick(e, 1);
        } else {
          if (running) {
            if (preventActionWhenRunning) {
              return;
            } else {
              onTransitionEnd();
            }
          }
          var absIndex = getAbsIndex(), indexGap = 0;
          if (targetIndex === "first") {
            indexGap = -absIndex;
          } else if (targetIndex === "last") {
            indexGap = carousel ? slideCount - items - absIndex : slideCount - 1 - absIndex;
          } else {
            if (typeof targetIndex !== "number") {
              targetIndex = parseInt(targetIndex);
            }
            if (!isNaN(targetIndex)) {
              if (!e) {
                targetIndex = Math.max(0, Math.min(slideCount - 1, targetIndex));
              }
              indexGap = targetIndex - absIndex;
            }
          }
          if (!carousel && indexGap && Math.abs(indexGap) < items) {
            var factor = indexGap > 0 ? 1 : -1;
            indexGap += index + indexGap - slideCount >= indexMin ? slideCount * factor : slideCount * 2 * factor * -1;
          }
          index += indexGap;
          if (carousel && loop) {
            if (index < indexMin) {
              index += slideCount;
            }
            if (index > indexMax) {
              index -= slideCount;
            }
          }
          if (getAbsIndex(index) !== getAbsIndex(indexCached)) {
            render(e);
          }
        }
      }
      function onControlsClick(e, dir) {
        if (running) {
          if (preventActionWhenRunning) {
            return;
          } else {
            onTransitionEnd();
          }
        }
        var passEventObject;
        if (!dir) {
          e = getEvent(e);
          var target = getTarget(e);
          while (target !== controlsContainer && [prevButton, nextButton].indexOf(target) < 0) {
            target = target.parentNode;
          }
          var targetIn = [prevButton, nextButton].indexOf(target);
          if (targetIn >= 0) {
            passEventObject = true;
            dir = targetIn === 0 ? -1 : 1;
          }
        }
        if (rewind) {
          if (index === indexMin && dir === -1) {
            goTo("last", e);
            return;
          } else if (index === indexMax && dir === 1) {
            goTo("first", e);
            return;
          }
        }
        if (dir) {
          index += slideBy * dir;
          if (autoWidth) {
            index = Math.floor(index);
          }
          render(passEventObject || e && e.type === "keydown" ? e : null);
        }
      }
      function onNavClick(e) {
        if (running) {
          if (preventActionWhenRunning) {
            return;
          } else {
            onTransitionEnd();
          }
        }
        e = getEvent(e);
        var target = getTarget(e), navIndex;
        while (target !== navContainer && !hasAttr(target, "data-nav")) {
          target = target.parentNode;
        }
        if (hasAttr(target, "data-nav")) {
          var navIndex = navClicked = Number(getAttr(target, "data-nav")), targetIndexBase = fixedWidth || autoWidth ? navIndex * slideCount / pages : navIndex * items, targetIndex = navAsThumbnails ? navIndex : Math.min(Math.ceil(targetIndexBase), slideCount - 1);
          goTo(targetIndex, e);
          if (navCurrentIndex === navIndex) {
            if (animating) {
              stopAutoplay();
            }
            navClicked = -1;
          }
        }
      }
      function setAutoplayTimer() {
        autoplayTimer = setInterval(function() {
          onControlsClick(null, autoplayDirection);
        }, autoplayTimeout);
        animating = true;
      }
      function stopAutoplayTimer() {
        clearInterval(autoplayTimer);
        animating = false;
      }
      function updateAutoplayButton(action, txt) {
        setAttrs(autoplayButton, { "data-action": action });
        autoplayButton.innerHTML = autoplayHtmlStrings[0] + action + autoplayHtmlStrings[1] + txt;
      }
      function startAutoplay() {
        setAutoplayTimer();
        if (autoplayButton) {
          updateAutoplayButton("stop", autoplayText[1]);
        }
      }
      function stopAutoplay() {
        stopAutoplayTimer();
        if (autoplayButton) {
          updateAutoplayButton("start", autoplayText[0]);
        }
      }
      function play() {
        if (autoplay && !animating) {
          startAutoplay();
          autoplayUserPaused = false;
        }
      }
      function pause() {
        if (animating) {
          stopAutoplay();
          autoplayUserPaused = true;
        }
      }
      function toggleAutoplay() {
        if (animating) {
          stopAutoplay();
          autoplayUserPaused = true;
        } else {
          startAutoplay();
          autoplayUserPaused = false;
        }
      }
      function onVisibilityChange() {
        if (doc.hidden) {
          if (animating) {
            stopAutoplayTimer();
            autoplayVisibilityPaused = true;
          }
        } else if (autoplayVisibilityPaused) {
          setAutoplayTimer();
          autoplayVisibilityPaused = false;
        }
      }
      function mouseoverPause() {
        if (animating) {
          stopAutoplayTimer();
          autoplayHoverPaused = true;
        }
      }
      function mouseoutRestart() {
        if (autoplayHoverPaused) {
          setAutoplayTimer();
          autoplayHoverPaused = false;
        }
      }
      function onDocumentKeydown(e) {
        e = getEvent(e);
        var keyIndex = [KEYS.LEFT, KEYS.RIGHT].indexOf(e.keyCode);
        if (keyIndex >= 0) {
          onControlsClick(e, keyIndex === 0 ? -1 : 1);
        }
      }
      function onControlsKeydown(e) {
        e = getEvent(e);
        var keyIndex = [KEYS.LEFT, KEYS.RIGHT].indexOf(e.keyCode);
        if (keyIndex >= 0) {
          if (keyIndex === 0) {
            if (!prevButton.disabled) {
              onControlsClick(e, -1);
            }
          } else if (!nextButton.disabled) {
            onControlsClick(e, 1);
          }
        }
      }
      function setFocus(el) {
        el.focus();
      }
      function onNavKeydown(e) {
        e = getEvent(e);
        var curElement = doc.activeElement;
        if (!hasAttr(curElement, "data-nav")) {
          return;
        }
        var keyIndex = [KEYS.LEFT, KEYS.RIGHT, KEYS.ENTER, KEYS.SPACE].indexOf(e.keyCode), navIndex = Number(getAttr(curElement, "data-nav"));
        if (keyIndex >= 0) {
          if (keyIndex === 0) {
            if (navIndex > 0) {
              setFocus(navItems[navIndex - 1]);
            }
          } else if (keyIndex === 1) {
            if (navIndex < pages - 1) {
              setFocus(navItems[navIndex + 1]);
            }
          } else {
            navClicked = navIndex;
            goTo(navIndex, e);
          }
        }
      }
      function getEvent(e) {
        e = e || win2.event;
        return isTouchEvent(e) ? e.changedTouches[0] : e;
      }
      function getTarget(e) {
        return e.target || win2.event.srcElement;
      }
      function isTouchEvent(e) {
        return e.type.indexOf("touch") >= 0;
      }
      function preventDefaultBehavior(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
      }
      function getMoveDirectionExpected() {
        return getTouchDirection(toDegree(lastPosition.y - initPosition.y, lastPosition.x - initPosition.x), swipeAngle) === options.axis;
      }
      function onPanStart(e) {
        if (running) {
          if (preventActionWhenRunning) {
            return;
          } else {
            onTransitionEnd();
          }
        }
        if (autoplay && animating) {
          stopAutoplayTimer();
        }
        panStart = true;
        if (rafIndex) {
          caf(rafIndex);
          rafIndex = null;
        }
        var $ = getEvent(e);
        events.emit(isTouchEvent(e) ? "touchStart" : "dragStart", info(e));
        if (!isTouchEvent(e) && ["img", "a"].indexOf(getLowerCaseNodeName(getTarget(e))) >= 0) {
          preventDefaultBehavior(e);
        }
        lastPosition.x = initPosition.x = $.clientX;
        lastPosition.y = initPosition.y = $.clientY;
        if (carousel) {
          translateInit = parseFloat(container.style[transformAttr].replace(transformPrefix, ""));
          resetDuration(container, "0s");
        }
      }
      function onPanMove(e) {
        if (panStart) {
          var $ = getEvent(e);
          lastPosition.x = $.clientX;
          lastPosition.y = $.clientY;
          if (carousel) {
            if (!rafIndex) {
              rafIndex = raf(function() {
                panUpdate(e);
              });
            }
          } else {
            if (moveDirectionExpected === "?") {
              moveDirectionExpected = getMoveDirectionExpected();
            }
            if (moveDirectionExpected) {
              preventScroll = true;
            }
          }
          if ((typeof e.cancelable !== "boolean" || e.cancelable) && preventScroll) {
            e.preventDefault();
          }
        }
      }
      function panUpdate(e) {
        if (!moveDirectionExpected) {
          panStart = false;
          return;
        }
        caf(rafIndex);
        if (panStart) {
          rafIndex = raf(function() {
            panUpdate(e);
          });
        }
        if (moveDirectionExpected === "?") {
          moveDirectionExpected = getMoveDirectionExpected();
        }
        if (moveDirectionExpected) {
          if (!preventScroll && isTouchEvent(e)) {
            preventScroll = true;
          }
          try {
            if (e.type) {
              events.emit(isTouchEvent(e) ? "touchMove" : "dragMove", info(e));
            }
          } catch (err) {
          }
          var x = translateInit, dist = getDist(lastPosition, initPosition);
          if (!horizontal || fixedWidth || autoWidth) {
            x += dist;
            x += "px";
          } else {
            var percentageX = TRANSFORM ? dist * items * 100 / ((viewport + gutter) * slideCountNew) : dist * 100 / (viewport + gutter);
            x += percentageX;
            x += "%";
          }
          container.style[transformAttr] = transformPrefix + x + transformPostfix;
        }
      }
      function onPanEnd(e) {
        if (panStart) {
          if (rafIndex) {
            caf(rafIndex);
            rafIndex = null;
          }
          if (carousel) {
            resetDuration(container, "");
          }
          panStart = false;
          var $ = getEvent(e);
          lastPosition.x = $.clientX;
          lastPosition.y = $.clientY;
          var dist = getDist(lastPosition, initPosition);
          if (Math.abs(dist)) {
            if (!isTouchEvent(e)) {
              var target = getTarget(e);
              addEvents(target, {
                click: function preventClick(e2) {
                  preventDefaultBehavior(e2);
                  removeEvents(target, { click: preventClick });
                }
              });
            }
            if (carousel) {
              rafIndex = raf(function() {
                if (horizontal && !autoWidth) {
                  var indexMoved = -dist * items / (viewport + gutter);
                  indexMoved = dist > 0 ? Math.floor(indexMoved) : Math.ceil(indexMoved);
                  if (document.body.dir == "rtl") {
                    index += indexMoved * -1;
                  } else {
                    index += indexMoved;
                  }
                } else {
                  var moved = -(translateInit + dist);
                  if (moved <= 0) {
                    index = indexMin;
                  } else if (moved >= slidePositions[slideCountNew - 1]) {
                    index = indexMax;
                  } else {
                    var i = 0;
                    while (i < slideCountNew && moved >= slidePositions[i]) {
                      index = i;
                      if (moved > slidePositions[i] && dist < 0) {
                        index += 1;
                      }
                      i++;
                    }
                  }
                }
                render(e, dist);
                events.emit(isTouchEvent(e) ? "touchEnd" : "dragEnd", info(e));
              });
            } else {
              if (moveDirectionExpected) {
                onControlsClick(e, dist > 0 ? -1 : 1);
              }
            }
          }
        }
        if (options.preventScrollOnTouch === "auto") {
          preventScroll = false;
        }
        if (swipeAngle) {
          moveDirectionExpected = "?";
        }
        if (autoplay && !animating) {
          setAutoplayTimer();
        }
      }
      function updateContentWrapperHeight() {
        var wp = middleWrapper ? middleWrapper : innerWrapper;
        wp.style.height = slidePositions[index + items] - slidePositions[index] + "px";
      }
      function getPages() {
        var rough = fixedWidth ? (fixedWidth + gutter) * slideCount / viewport : slideCount / items;
        return Math.min(Math.ceil(rough), slideCount);
      }
      function updateNavVisibility() {
        if (!nav || navAsThumbnails) {
          return;
        }
        if (pages !== pagesCached) {
          var min = pagesCached, max = pages, fn = showElement;
          if (pagesCached > pages) {
            min = pages;
            max = pagesCached;
            fn = hideElement;
          }
          while (min < max) {
            fn(navItems[min]);
            min++;
          }
          pagesCached = pages;
        }
      }
      function info(e) {
        return {
          container,
          slideItems,
          navContainer,
          navItems,
          controlsContainer,
          hasControls,
          prevButton,
          nextButton,
          items,
          slideBy,
          cloneCount,
          slideCount,
          slideCountNew,
          index,
          indexCached,
          displayIndex: getCurrentSlide(),
          navCurrentIndex,
          navCurrentIndexCached,
          pages,
          pagesCached,
          sheet,
          isOn,
          event: e || {}
        };
      }
      return {
        version: "2.9.3",
        getInfo: info,
        events,
        goTo,
        play,
        pause,
        isOn,
        updateSliderHeight: updateInnerWrapperHeight,
        refresh: initSliderTransform,
        destroy,
        rebuild: function() {
          return tns2(extend(options, optionsElements));
        }
      };
    };
    return tns2;
  }();
  window.tns = tns;
  window.lazySizesConfig = window.lazySizesConfig || {};
  lazySizesConfig.loadMode = 0;
  lazySizesConfig.loadHidden = false;
  /*! lazysizes - v5.2.0 unveilhooks*/
  /*! lazysizes - v5.2.0 parent-fit*/
  /*! lazysizes - v5.2.0 objectfit */
  /*! lazysizes - v5.2.0 bgset */
  /*! lazysizes - v5.2.0 */
  /*! lazysizes - v5.2.0 ls.respimg.min.js */
  /*! lazysizes - v5.2.0 Rias */
})();
