/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 283);
/******/ })
/************************************************************************/
/******/ ({

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _i18next = __webpack_require__(35);

var _i18next2 = _interopRequireDefault(_i18next);

var _constant = __webpack_require__(8);

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var en = __webpack_require__(47);
var zh_tw = __webpack_require__(48);

var language = localStorage.getItem('language');
if (language === null) {
  language = chrome.i18n.getUILanguage().match(/^zh/) === null ? _constant2.default.LANGUAGE.EN : _constant2.default.LANGUAGE.ZH_TW;;
  console.error("Missing `language` in localStorage");
} else {
  language = JSON.parse(language);
}

_i18next2.default.init({
  fallbackLng: language,
  resources: {
    en: {
      translation: en
    },
    zh_tw: {
      translation: zh_tw
    }
  },

  debug: "devbuild" === 'development' || "devbuild" === 'devbuild'
});

exports.default = _i18next2.default;
module.exports = exports['default'];

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({

  processors: {},

  addPostProcessor: function addPostProcessor(module) {
    this.processors[module.name] = module;
  },
  handle: function handle(processors, value, key, options, translator) {
    var _this = this;

    processors.forEach(function (processor) {
      if (_this.processors[processor]) value = _this.processors[processor].process(value, key, options, translator);
    });

    return value;
  }
});

/***/ }),

/***/ 21:
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),

/***/ 283:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(21);

var _chromePromise = __webpack_require__(67);

var _chromePromise2 = _interopRequireDefault(_chromePromise);

var _iPhoneDb = __webpack_require__(29);

var _iPhoneDb2 = _interopRequireDefault(_iPhoneDb);

var _constant = __webpack_require__(8);

var _constant2 = _interopRequireDefault(_constant);

var _AppEnv = __webpack_require__(288);

var _AppEnv2 = _interopRequireDefault(_AppEnv);

var _i18n = __webpack_require__(113);

var _i18n2 = _interopRequireDefault(_i18n);

var _utils = __webpack_require__(289);

var _phoneUtils = __webpack_require__(290);

var _actionTypes = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var t = _i18n2.default.t.bind(_i18n2.default);

/**
 * Start the worker tab to prepare and execute jobs
 * @param  {Integer} tabId Id of the tab to start
 */
function startWorkerTab(tabId) {
  _chromePromise2.default.tabs.update(tabId, {
    url: (0, _utils.getWorkerPageURL)()
  });
}

/**
 * Create a worker tab in the browser
 * @async
 * @param  {AppEnv}  appEnv          AppEnv object
 * @param  {Boolean} [startJob=true] Whether the worker tab should start to
 *                                   work immediately after creation
 * @return {Tab}   The worker tab just being created
 * @throws {Error} If error occurs
 */
function createWorkerTab(appEnv) {
  var startWork = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var tab, tabId;
  return regeneratorRuntime.async(function createWorkerTab$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_chromePromise2.default.tabs.create({
            index: 0, // always put in the leftmost of the tablist
            pinned: true, // pin it so that it will not be closed accidentally
            selected: false // open silently
          }));

        case 2:
          tab = _context.sent;
          tabId = tab.id;

          appEnv.set('tabRuntime.workerTabDict.' + tabId, {
            tabId: tabId,
            job: null
          });

          if (startWork) {
            startWorkerTab(tabId);
          }

          return _context.abrupt('return', tab);

        case 7:
        case 'end':
          return _context.stop();
      }
    }
  }, null, this);
}

/**
 * Restart the specified worker tab
 * @param  {AppEnv}  appEnv          AppEnv object
 * @param  {Integer} targetTabId     The target tab id to close
 * @param  {Boolean} [startJob=true] Whether the worker tab should start to
 *                                   work immediately after creation
 */
function restartWorkerTab(appEnv, targetTabId) {
  var startWork = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var workerTabDict;
  return regeneratorRuntime.async(function restartWorkerTab$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // Remove the tab from workerTabDict so that the close tab listener won't
          // fire the restart tab again
          workerTabDict = appEnv.get('tabRuntime.workerTabDict');

          delete workerTabDict[targetTabId];
          appEnv.set('tabRuntime.workerTabDict', workerTabDict);
          // Try to make sure the tab is closed
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(_chromePromise2.default.tabs.remove(targetTabId));

        case 6:
          _context2.next = 10;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2['catch'](3);

        case 10:
          _context2.next = 12;
          return regeneratorRuntime.awrap(createWorkerTab(appEnv));

        case 12:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, this, [[3, 8]]);
}

/**
 * Get the next tab job
 * @param  {AppEnv} appEnv AppEnv object
 * @return {Object}        Next available tab job
 */
function getNextTabJob(appEnv) {
  var jobList = appEnv.get('tabRuntime.jobList');
  var jobIdx = appEnv.get('tabRuntime.nextJobIdx');

  var nextJobIdx = jobIdx + 1;
  if (nextJobIdx >= jobList.length) {
    nextJobIdx = 0;
  }
  appEnv.set('tabRuntime.nextJobIdx', nextJobIdx);

  return jobList[jobIdx];
}

/**
 * Update browser action icon according to phone availability status
 * @param  {AppEvn} appEnv AppEnv object
 */
function updateBrowserAction(appEnv) {
  var status = appEnv.get('status');
  if (status !== _constant2.default.STATUS.ENABLED) {
    chrome.browserAction.setIcon({
      path: {
        16: 'src/images/icons/disabled16.png',
        24: 'src/images/icons/disabled24.png',
        32: 'src/images/icons/disabled32.png',
        64: 'src/images/icons/disabled64.png'
      }
    });
    return;
  }

  var phoneStatus = appEnv.get('phoneStatus');
  for (var model in phoneStatus) {
    var _status = phoneStatus[model].status;

    if (_status === _constant2.default.PHONESTATUS.INSTOCK) {
      chrome.browserAction.setIcon({
        path: {
          16: 'src/images/icons/instock16.png',
          24: 'src/images/icons/instock24.png',
          32: 'src/images/icons/instock32.png',
          64: 'src/images/icons/instock64.png'
        }
      });
      return;
    }
  }

  chrome.browserAction.setIcon({
    path: {
      16: 'src/images/icons/default16.png',
      24: 'src/images/icons/default24.png',
      32: 'src/images/icons/default32.png',
      64: 'src/images/icons/default64.png'
    }
  });
}

/**
 * Handle when a worker tab has signalled ready for job execution
 * @param  {AppEnv} appEnv AppEnv object
 * @param  {Integer} tabId Id of the worker tab
 */
function handleWorkerTabReady(appEnv, tabId) {
  try {
    // Update the tab job
    var tabJob = getNextTabJob(appEnv);
    appEnv.set('tabRuntime.workerTabDict.' + tabId + '.job', tabJob);

    // Get the tab view and prepare for redirection
    var tab = chrome.extension.getViews({
      type: 'tab',
      tabId: tabId
    });
    // TODO: Support configurable timeout
    var timeout = 5000;
    setTimeout(function () {
      tab[0].location.href = tabJob.url;
    }, timeout);
  } catch (e) {
    // Whenever an error occurs, try to restart the worker tab
    restartWorkerTab(appEnv, tabId);
    console.error(e);
  }
}

/**
 * Handle a tab update related to a store job
 * @param  {Object}  appEnv AppEnv object
 * @param  {Integer} tabId  The tab id of the updated worker tab
 * @param  {Object}  job    The job the worker tab is running
 */
function handleTabStoreJob(appEnv, tabId, job) {
  var phoneId, addToCartEl, newPhoneStatus, url, _appEnv$get, inStockSince, _url, notificationId;

  return regeneratorRuntime.async(function handleTabStoreJob$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          phoneId = job['phoneId'];
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_chromePromise2.default.tabs.executeScript(tabId, {
            code: 'document.querySelector(\'.add-to-cart\')'
          }));

        case 4:
          addToCartEl = _context3.sent;

          // Update the phone status
          newPhoneStatus = void 0;

          if (!(addToCartEl[0] === null)) {
            _context3.next = 11;
            break;
          }

          url = appEnv.get('phoneStatus.' + phoneId + '.url');
          // Only update when the previous availability is from this method

          if (url === '' || url === job.url) {
            newPhoneStatus = {
              status: _constant2.default.PHONESTATUS.UNAVAILABLE,
              inStockSince: 0,
              url: ''
            };
            appEnv.set('phoneStatus.' + phoneId, newPhoneStatus);
          }
          _context3.next = 19;
          break;

        case 11:
          // The iPhone is in stock now
          _appEnv$get = appEnv.get('phoneStatus.' + phoneId), inStockSince = _appEnv$get.inStockSince, _url = _appEnv$get.url;


          newPhoneStatus = {
            status: _constant2.default.PHONESTATUS.INSTOCK,
            inStockSince: inStockSince === 0 ? Date.now() : inStockSince,
            url: job.url
          };
          appEnv.set('phoneStatus.' + phoneId, newPhoneStatus);
          // If the phone is not available before, send a browser notification

          if (!(inStockSince === 0 || _url !== job.url)) {
            _context3.next = 19;
            break;
          }

          _context3.next = 17;
          return regeneratorRuntime.awrap(_chromePromise2.default.notifications.create(notificationId, {
            type: 'basic',
            iconUrl: 'src/images/icons/instock64.png',
            title: t('method.store.notification.title'),
            message: t('method.store.notification.message').replace('${PHONE_NAME}', (0, _phoneUtils.getPhoneName)(t, _iPhoneDb2.default.findById(phoneId)))
          }));

        case 17:
          notificationId = _context3.sent;

          // on notification click handler
          appEnv.set('notification.' + notificationId, {
            type: 'url',
            url: job.url
          });

        case 19:

          startWorkerTab(tabId);
          _context3.next = 26;
          break;

        case 22:
          _context3.prev = 22;
          _context3.t0 = _context3['catch'](1);

          // Whenever an error occurs, try to restart the worker tab
          restartWorkerTab(appEnv, tabId);
          console.error(_context3.t0);

        case 26:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, this, [[1, 22]]);
}

/**
 * Handle a tab update related to IR JSON job
 * @param  {AppEnv}  appEnv AppEnv object
 * @param  {Integer} tabId  The tab id of the updated worker tab
 * @param  {Object}  job    The job the worker tab is running
 */
function handleTabIRJsonJob(appEnv, tabId, job) {
  var phoneId, jsonData, newPhoneStatus, available, jsonResponse, storeName, store, _appEnv$get2, inStockSince, url, notificationId, _url2;

  return regeneratorRuntime.async(function handleTabIRJsonJob$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          phoneId = job['phoneId'];
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(_chromePromise2.default.tabs.executeScript(tabId, {
            code: 'document.body.innerText'
          }));

        case 4:
          jsonData = _context4.sent;


          // Update the phone status
          newPhoneStatus = void 0;
          available = false;
          // Parse the JSON response

          jsonResponse = JSON.parse(jsonData);
          _context4.t0 = regeneratorRuntime.keys(jsonResponse.stores);

        case 9:
          if ((_context4.t1 = _context4.t0()).done) {
            _context4.next = 17;
            break;
          }

          storeName = _context4.t1.value;
          store = jsonResponse.stores[storeName];

          if (!(store[job.model]['availability']['contract'] || store[job.model]['availability']['unlocked'])) {
            _context4.next = 15;
            break;
          }

          available = true;
          return _context4.abrupt('break', 17);

        case 15:
          _context4.next = 9;
          break;

        case 17:
          if (!available) {
            _context4.next = 28;
            break;
          }

          // The iPhone is available in IR now
          _appEnv$get2 = appEnv.get('phoneStatus.' + phoneId), inStockSince = _appEnv$get2.inStockSince, url = _appEnv$get2.url;


          newPhoneStatus = {
            status: _constant2.default.PHONESTATUS.INSTOCK,
            inStockSince: inStockSince === 0 ? Date.now() : inStockSince,
            url: job.irurl
          };
          appEnv.set('phoneStatus.' + phoneId, newPhoneStatus);
          // If the phone is not available before or from different method,
          // send a browser notification

          if (!(inStockSince === 0 || url !== job.irurl)) {
            _context4.next = 26;
            break;
          }

          _context4.next = 24;
          return regeneratorRuntime.awrap(_chromePromise2.default.notifications.create(notificationId, {
            type: 'basic',
            iconUrl: 'src/images/icons/instock64.png',
            title: t('method.irjson.notification.title'),
            message: t('method.irjson.notification.message').replace('${PHONE_NAME}', (0, _phoneUtils.getPhoneName)(t, _iPhoneDb2.default.findById(phoneId)))
          }));

        case 24:
          notificationId = _context4.sent;

          // on notification click handler
          appEnv.set('notification.' + notificationId, {
            type: 'url',
            url: '' + job.irurl
          });

        case 26:
          _context4.next = 30;
          break;

        case 28:
          _url2 = appEnv.get('phoneStatus.' + phoneId + '.url');
          // Only update when the previous availability is from this method

          if (_url2 === '' || _url2 === job.irurl) {
            newPhoneStatus = {
              status: _constant2.default.PHONESTATUS.UNAVAILABLE,
              inStockSince: 0,
              url: ''
            };
            appEnv.set('phoneStatus.' + phoneId, newPhoneStatus);
          }

        case 30:

          startWorkerTab(tabId);
          _context4.next = 37;
          break;

        case 33:
          _context4.prev = 33;
          _context4.t2 = _context4['catch'](1);

          // Whenever an error occurs, try to restart the worker tab
          restartWorkerTab(appEnv, tabId);
          console.error(_context4.t2);

        case 37:
        case 'end':
          return _context4.stop();
      }
    }
  }, null, this, [[1, 33]]);
}

/**
 * An event listener for handling tabs update
 * @param  {Object} appEnv AppEnv object
 */
var handleTabsUpdate = function handleTabsUpdate(appEnv) {
  return function _callee(tabId, changeInfo, tab) {
    var workerTabDict, currentJob;
    return regeneratorRuntime.async(function _callee$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!(changeInfo.status !== 'complete')) {
              _context5.next = 2;
              break;
            }

            return _context5.abrupt('return');

          case 2:
            // Update browser cation whever there is an update of worker tab
            updateBrowserAction(appEnv);

            workerTabDict = appEnv.get('tabRuntime.workerTabDict');
            // Check if the tab is one of the worker tabs

            if (workerTabDict[tabId]) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt('return');

          case 6:
            if (!(tab.url === (0, _utils.getWorkerPageURL)())) {
              _context5.next = 9;
              break;
            }

            // The tab is opening the worker tab page
            handleWorkerTabReady(appEnv, tabId);
            return _context5.abrupt('return');

          case 9:
            // Check if the tab is executing its job
            currentJob = workerTabDict[tabId].job;

            if (!(currentJob && tab.url === currentJob.url)) {
              _context5.next = 13;
              break;
            }

            if (currentJob.type === 'store') {
              handleTabStoreJob(appEnv, tabId, currentJob);
            } else if (currentJob.type === 'irjson') {
              handleTabIRJsonJob(appEnv, tabId, currentJob);
            }
            return _context5.abrupt('return');

          case 13:

            // The tab is opening non-job URL
            console.error('Worker tab is opening a non-job URL: ' + tab.url);
            restartWorkerTab(appEnv, tabId);

          case 15:
          case 'end':
            return _context5.stop();
        }
      }
    }, null, undefined);
  };
};

/**
 * A listener for handling tabs removal
 * @param  {AppEnv} appEnv AppEnv object
 */
var handleTabsRemove = function handleTabsRemove(appEnv) {
  return function _callee2(tabId, removeInfo) {
    return regeneratorRuntime.async(function _callee2$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            try {
              if (appEnv.get('tabRuntime.workerTabDict.' + tabId)) {
                // the closed tab is one of the worker tabs
                restartWorkerTab(appEnv, tabId);
              }
            } catch (e) {/*Ignore other tab cloeses*/}

          case 1:
          case 'end':
            return _context6.stop();
        }
      }
    }, null, undefined);
  };
};

/**
 * A listener for handling runtime message from other pages
 * @param  {AppEnv} appEnv AppEnv object
 */
var handleRuntimeMessage = function handleRuntimeMessage(appEnv) {
  return function _callee3(request, sender, sendResponse) {
    var newPhoneStatus;
    return regeneratorRuntime.async(function _callee3$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.t0 = request.type;
            _context7.next = _context7.t0 === _actionTypes.MONITORLIST_SET ? 3 : _context7.t0 === _actionTypes.STATUS_SET ? 23 : _context7.t0 === _actionTypes.LANGUAGE_SET ? 41 : 52;
            break;

          case 3:
            newPhoneStatus = request.monitorList.reduce(function (accuDict, id) {
              accuDict[id] = {
                status: _constant2.default.PHONESTATUS.PENDING,
                inStockSince: 0,
                url: ''
              };
              return accuDict;
            }, {});
            _context7.prev = 4;

            appEnv.set('monitorList', request.monitorList);
            appEnv.set('phoneStatus', newPhoneStatus);
            sendResponse(true);
            _context7.next = 14;
            break;

          case 10:
            _context7.prev = 10;
            _context7.t1 = _context7['catch'](4);

            sendResponse(false);
            throw _context7.t1;

          case 14:
            _context7.prev = 14;
            _context7.next = 17;
            return regeneratorRuntime.awrap(init(appEnv));

          case 17:
            _context7.next = 22;
            break;

          case 19:
            _context7.prev = 19;
            _context7.t2 = _context7['catch'](14);

            console.error(_context7.t2);

          case 22:
            return _context7.abrupt('break', 53);

          case 23:
            _context7.prev = 23;

            appEnv.set('status', request.status);
            sendResponse(true);
            _context7.next = 32;
            break;

          case 28:
            _context7.prev = 28;
            _context7.t3 = _context7['catch'](23);

            sendResponse(false);
            throw _context7.t3;

          case 32:
            _context7.prev = 32;
            _context7.next = 35;
            return regeneratorRuntime.awrap(init(appEnv));

          case 35:
            _context7.next = 40;
            break;

          case 37:
            _context7.prev = 37;
            _context7.t4 = _context7['catch'](32);

            console.error(_context7.t4);

          case 40:
            return _context7.abrupt('break', 53);

          case 41:
            _context7.prev = 41;

            appEnv.set('language', request.language);
            sendResponse(true);
            _context7.next = 50;
            break;

          case 46:
            _context7.prev = 46;
            _context7.t5 = _context7['catch'](41);

            sendResponse(false);
            throw _context7.t5;

          case 50:

            // Change language
            _i18n2.default.changeLanguage(request.language);
            return _context7.abrupt('break', 53);

          case 52:
            console.error('Unknown runtime message "' + request.type + '"');

          case 53:
          case 'end':
            return _context7.stop();
        }
      }
    }, null, undefined, [[4, 10], [14, 19], [23, 28], [32, 37], [41, 46]]);
  };
};

/**
 * An event listener for handling chrome notifications being clicked
 * @param  {AppEnv} appEnv AppEnv object
 */
var handleNotificationsClick = function handleNotificationsClick(appEnv) {
  return function _callee4(notificationId) {
    var action;
    return regeneratorRuntime.async(function _callee4$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            action = appEnv.get('notification.' + notificationId);

            if (!(action.type === 'url')) {
              _context8.next = 5;
              break;
            }

            _context8.next = 5;
            return regeneratorRuntime.awrap(_chromePromise2.default.tabs.create({
              active: true,
              selected: true,
              url: action.url
            }));

          case 5:
            _context8.next = 9;
            break;

          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8['catch'](0);

          case 9:
          case 'end':
            return _context8.stop();
        }
      }
    }, null, undefined, [[0, 7]]);
  };
};

/**
 * An event listener for handling chrome notifications being closed
 * @param  {AppEnv} appEnv AppEnv object
 */
var handleNotificationsClose = function handleNotificationsClose(appEnv) {
  return function (notificationId) {
    try {
      // Remove the chrome notification on click handler
      var notification = appEnv.get('notification');
      if (notification[notificationId]) {
        delete notification[notificationId];
        appEnv.set('notification', notification);
      }
    } catch (e) {/*No on click handler found*/}
  };
};

/**
 * Setup event handler
 * @param  {AppEnv} appEnv AppEnv object
 */
function setupEventHandler(appEnv) {
  chrome.browserAction.onClicked.addListener(function () {
    appEnv.repair();
  });
  chrome.tabs.onUpdated.addListener(handleTabsUpdate(appEnv));
  chrome.tabs.onRemoved.addListener(handleTabsRemove(appEnv));
  chrome.runtime.onMessage.addListener(handleRuntimeMessage(appEnv));
  chrome.notifications.onClicked.addListener(handleNotificationsClick(appEnv));
  chrome.notifications.onClosed.addListener(handleNotificationsClose(appEnv));
}

/**
 * Find list of worker tabs from AppEnv
 * @param  {AppEnv} appEnv AppEnv object
 * @return {Integer[]      List of worker tab ids
 */
function findWorkerTabsFromAppEnv(appEnv) {
  return Object.keys(appEnv.get('tabRuntime.workerTabDict')).map(function (idStr) {
    return parseInt(idStr);
  });
}

/**
 * Initialize the whole background. Support re-execute to re-initialize the
 * whole environment
 * @param  {AppEnv} appEnv AppEnv object
 */
function init(appEnv) {
  var workerTabs, status, monitorList, tabJobList;
  return regeneratorRuntime.async(function init$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          // Try to repair any abnormality in localStorage items
          appEnv.repair();

          updateBrowserAction(appEnv);

          // Close all worker tabs in AppEnv
          workerTabs = findWorkerTabsFromAppEnv(appEnv);
          // Reset workerTabDict so that tab on close handler won't restart the
          // worker tabs for us

          appEnv.set('tabRuntime.workerTabDict', {});
          _context9.next = 6;
          return regeneratorRuntime.awrap(_chromePromise2.default.tabs.remove(workerTabs));

        case 6:
          status = appEnv.get('status');

          if (!(status !== _constant2.default.STATUS.ENABLED)) {
            _context9.next = 10;
            break;
          }

          console.log('Extension is disabled');
          return _context9.abrupt('return');

        case 10:
          monitorList = appEnv.get('monitorList');
          // Construct tab job list

          tabJobList = [];

          monitorList.forEach(function (id) {
            var phone = _iPhoneDb2.default.findById(id);
            if (!phone) {
              // Unknown phone id in monitor list, maybe database updated?
              console.error('Unknown iPhone id ' + id);
              return; // continue
            }
            phone.methods.forEach(function (method) {
              if (method.worker === 'tab') {
                var url = method.url;
                if (method.type === 'store') {
                  url = '' + (0, _utils.getAppleStoreURL)() + method.url;
                }
                tabJobList.push(Object.assign({}, method, {
                  phoneId: phone._id,
                  url: url
                }));
              }
            });
          });
          // Update tab job list
          appEnv.set('tabRuntime.jobList', tabJobList);

          if (!(tabJobList.length === 0)) {
            _context9.next = 17;
            break;
          }

          console.log('Tab scheduler is not started because there is no tab job to execute.');
          return _context9.abrupt('return');

        case 17:
          _context9.next = 19;
          return regeneratorRuntime.awrap(tabScheduler(appEnv));

        case 19:
        case 'end':
          return _context9.stop();
      }
    }
  }, null, this);
}

/**
 * Reponsible for scheduling worker tabs
 * @param  {AppEnv} appEnv AppEnv object
 * @throws {Error}         If error occurs
 */
function tabScheduler(appEnv) {
  return regeneratorRuntime.async(function tabScheduler$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(createWorkerTab(appEnv));

        case 2:
        case 'end':
          return _context10.stop();
      }
    }
  }, null, this);
}

(function main() {
  var appEnv;
  return regeneratorRuntime.async(function main$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          appEnv = new _AppEnv2.default();
          // Close all worker tabs from previous session

          _context11.next = 3;
          return regeneratorRuntime.awrap((0, _utils.closeAllWorkerTabs)());

        case 3:
          setupEventHandler(appEnv);
          _context11.next = 6;
          return regeneratorRuntime.awrap(init(appEnv));

        case 6:
        case 'end':
          return _context11.stop();
      }
    }
  }, null, this);
})();

/***/ }),

/***/ 284:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var create = function create(notificationId, options) {
  return new Promise(function (resolve, reject) {
    chrome.notifications.create(notificationId, options, function (notificationId) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }
      resolve(notificationId);
    });
  });
};

exports.default = {
  create: create
};
module.exports = exports["default"];

/***/ }),

/***/ 285:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _local = __webpack_require__(286);

var _local2 = _interopRequireDefault(_local);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  local: _local2.default
};
module.exports = exports['default'];

/***/ }),

/***/ 286:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var get = function get(keys) {
  return new Promise(function (resolve, reject) {
    chrome.storage.local.get(keys, function (items) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }
      resolve(items);
    });
  });
};

var set = function set(items) {
  return new Promise(function (resolve, reject) {
    chrome.storage.local.set(items, function () {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }
      resolve();
    });
  });
};

exports.default = {
  get: get,
  set: set
};
module.exports = exports["default"];

/***/ }),

/***/ 287:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var create = function create(createProperties) {
  return new Promise(function (resolve, reject) {
    chrome.tabs.create(createProperties, function (tab) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }
      resolve(tab);
    });
  });
};

var executeScript = function executeScript(tabId, details) {
  return new Promise(function (resolve, reject) {
    chrome.tabs.executeScript(tabId, details, function (result) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }
      resolve(result);
    });
  });
};

var get = function get(tabId) {
  return new Promise(function (resolve, reject) {
    chrome.tabs.get(tabId, function (tab) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }
      resolve(tab);
    });
  });
};

var query = function query(queryInfo) {
  return new Promise(function (resolve, reject) {
    chrome.tabs.query(queryInfo, function (tab) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }
      resolve(tab);
    });
  });
};

var remove = function remove(tabIds) {
  return new Promise(function (resolve, reject) {
    chrome.tabs.remove(tabIds, function () {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }
      resolve();
    });
  });
};

var update = function update(tabId, updateProperties) {
  return new Promise(function (resolve, reject) {
    chrome.tabs.update(tabId, updateProperties, function (tab) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }
      resolve(tab);
    });
  });
};

exports.default = {
  create: create,
  executeScript: executeScript,
  get: get,
  query: query,
  remove: remove,
  update: update
};
module.exports = exports["default"];

/***/ }),

/***/ 288:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _chromePromise = __webpack_require__(67);

var _chromePromise2 = _interopRequireDefault(_chromePromise);

var _constant = __webpack_require__(8);

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Dictonary of key and default value for local storage
var storageDefault = {
  status: _constant2.default.STATUS.DISABLED,
  monitorList: [],
  phoneStatus: {},
  language: chrome.i18n.getUILanguage().match(/^zh/) === null ? _constant2.default.LANGUAGE.EN : _constant2.default.LANGUAGE.ZH_TW,
  maxTab: 1
  // List of keys that have to be synchornized with local stroage
};var storageKeys = Object.keys(storageDefault);

/**
 * Get the root key of a key chain
 * @param  {String} keyChain The key chain to get the root
 * @return {String}          Name of the root key
 */
function getRootKey(keyChain) {
  return keyChain.split('.')[0];
}
/**
 * Remove the root key from a key chain
 * @param  {String} keyChain The key chain to remove its root
 * @return {String}          New key with the root of key chain removed
 */
function removeRootKey(keyChain) {
  return keyChain.split('.').slice(1).join('.');
}
/**
 * Check if the object has all the key specified in the key chain
 * @param  {Object}  obj      The object to check against
 * @param  {String}  keyChain A key chain in the format a.b.c
 * @return {Boolean}          true if the key chain exists in the object,
 *                            false otherwise
 */
function objHasKeyChain(obj, keyChain) {
  var keyList = keyChain.split('.');
  var tmp = obj;
  for (var i = 0, l = keyList.length; i < l; i++) {
    var key = keyList[i];
    if (typeof tmp[key] === 'undefined') {
      return false;
    }
    tmp = tmp[key];
  }
  return true;
}
/**
 * Get the value referenced by the key chain
 * @param  {Mixed} target    The target object retrieved from storage
 * @param  {String} keyChain A key chain in the format a.b.c
 * @return {Mixed}           Value referenced by the key chain
 * @throws {Error}           If the key chain does not exist in the target
 */
function getValueByKeyChain(target, keyChain) {
  if (keyChain === '') {
    return target;
  }
  var keyList = keyChain.split('.');
  return keyChain.split('.').reduce(function (tmp, key) {
    if (typeof tmp[key] === 'undefined') {
      throw new Error('Cannot read undefined item \'' + keyChain + '\'');
    }
    return tmp[key];
  }, target);
}
/**
 * Update the key specified by the key chain of the target to the new value
 * @param {Object} target   The target object retrieved from storage
 * @param {String} keyChain A key chain in the format a.b.c
 * @param {Mixed} value     The updated target
 * @throws {Error}          If the key chain does not exist in the target
 */
function setValueByKeyChain(target, keyChain, value) {
  if (keyChain === '') {
    // boundary case, and should not happen
    return value;
  }
  var keyList = keyChain.split('.');
  var tmp = target;
  var i = 0;
  for (var l = keyList.length - 1; i < l; i++) {
    if (typeof tmp[keyList[i]] === 'undefined') {
      throw new Error('Cannot set undefined item \'' + keyChain + '\'');
    }
    tmp = tmp[keyList[i]];
  }
  tmp[keyList[i]] = value;
  return target;
}
/**
 * A class for updating and retrieving App environment variables with auto
 * synchronization between the enviornment and storage
 * @async
 * @return {Promise} Promise that resolves to the AppEnv instance or rejects
 *                   with an Error when error occurs
 * @throws {Error}   If there is error when getting config from storage
 */

exports.default = function () {
  var _data = {};

  var repair = function repair() {
    // TODO: region support
    // Check for missing and incorrect config in local storage
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = storageKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        var defaultValue = storageDefault[key];
        var item = localStorage.getItem(key);
        if (item === null || _typeof(JSON.parse(item)) !== (typeof defaultValue === 'undefined' ? 'undefined' : _typeof(defaultValue))) {
          // Try to repair local storage by setting the item to default value
          localStorage.setItem(key, JSON.stringify(defaultValue));
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };

  // Try to repair any abnormality in localStorage items
  repair();

  _data = {
    tabRuntime: {
      jobList: [], // List of available jobs
      nextJobIdx: 0, // Next job index
      workerTabDict: {} // Dictionary of worker tabs
    },
    notification: {} // Dictionary of on notification click handlers
  };

  var exportMethods = {
    get: function get(keyChain) {
      var rootKey = getRootKey(keyChain);
      // Retrieve from storage if needed
      if (typeof storageDefault[rootKey] !== 'undefined') {
        var rawRootValue = localStorage.getItem(rootKey);
        if (rawRootValue === null) {
          // The root key is not found in local storage
          throw new Error('Cannot read undefined item \'' + keyChain + '\' in local storage');
        }
        var rootValue = JSON.parse(rawRootValue);
        return getValueByKeyChain(rootValue, removeRootKey(keyChain));
      }
      // Retreive it from the App enviornment variables
      if (!objHasKeyChain(_data, keyChain)) {
        throw new Error('Cannot read undefined App envionrment variable \'' + keyChain + '\'');
      }
      return getValueByKeyChain(_data, keyChain);
    },
    set: function set(keyChain, value) {
      var rootKey = getRootKey(keyChain);
      // Synchronize with storage if needed
      if (typeof storageDefault[rootKey] !== 'undefined') {
        // Get the root value to update it through the key chain
        var rootValue = JSON.parse(localStorage.getItem(rootKey));
        var newValue = setValueByKeyChain(rootValue, removeRootKey(keyChain), value);
        localStorage.setItem(rootKey, JSON.stringify(newValue));
        return;
      }
      _data = setValueByKeyChain(_data, keyChain, value);
    },
    repair: repair
    // Export internal methods for testing if the Node envioronment is test
  };if (false) {
    exportMethods['__setData'] = function (data) {
      _data = data;
    };
    exportMethods['__getData'] = function () {
      return _data;
    };
  }

  return exportMethods;
};

module.exports = exports['default'];

/***/ }),

/***/ 289:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWorkerPageURL = getWorkerPageURL;
exports.closeAllWorkerTabs = closeAllWorkerTabs;
exports.findWorkerTab = findWorkerTab;
exports.getAppleStoreURL = getAppleStoreURL;
exports.logError = logError;

var _chromePromise = __webpack_require__(67);

var _chromePromise2 = _interopRequireDefault(_chromePromise);

var _constant = __webpack_require__(8);

var _constant2 = _interopRequireDefault(_constant);

var _i18n = __webpack_require__(113);

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getWorkerPageURL() {
  return 'chrome-extension://' + chrome.runtime.id + '/worker.html';
}

/**
 * Find all worker tabs which are opening the worker page
 * @return  {Promise}
 * @resolve {Tabs[]}  List of worker tabs opening the worker page
 * @reject  {Error}   if there is error reported from Chrome
 */
function findWorkerTabsByWorkerPage() {
  return regeneratorRuntime.async(function findWorkerTabsByWorkerPage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_chromePromise2.default.tabs.query({
            url: 'chrome-extension://' + chrome.runtime.id + '/worker.html'
          }));

        case 2:
          return _context.abrupt('return', _context.sent);

        case 3:
        case 'end':
          return _context.stop();
      }
    }
  }, null, this);
}

/**
 * Find all worker tabs which are opening Apple Store website
 * @return  {Promise}
 * @resolve {Tabs[]}  List of worker tabs opening Apple Store website
 * @reject  {Error}   if there is error reported from Chrome
 */
function findWorkerTabsByAppleSite() {
  var tabs, matchedTabs, i, l, tab, referrer;
  return regeneratorRuntime.async(function findWorkerTabsByAppleSite$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_chromePromise2.default.tabs.query({
            url: 'https://www.apple.com/*'
          }));

        case 2:
          tabs = _context2.sent;

          if (!(tabs.length === 0)) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt('return', []);

        case 5:
          matchedTabs = [];
          i = 0, l = tabs.length;

        case 7:
          if (!(i < l)) {
            _context2.next = 16;
            break;
          }

          tab = tabs[i];
          // TODO: Fix document.referrer is always empty
          // Check if the document.referrer is the worker page

          _context2.next = 11;
          return regeneratorRuntime.awrap(_chromePromise2.default.tabs.executeScript(tab.id, { code: 'document.referrer' }));

        case 11:
          referrer = _context2.sent;

          if (referrer === getWorkerPageURL()) {
            matchedTabs.push(tab);
          }

        case 13:
          i++;
          _context2.next = 7;
          break;

        case 16:
          return _context2.abrupt('return', matchedTabs);

        case 17:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, this);
}

/**
 * Find all the worker tabs
 * @return  {Promise}
 * @resolve {Tabs[]} List of worker tabs
 * @reject  {Error}  if there is error reported from Chrome
 */
function findAllWorkerTabs() {
  return regeneratorRuntime.async(function findAllWorkerTabs$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(findWorkerTabsByWorkerPage());

        case 2:
          _context3.t0 = _context3.sent;
          _context3.next = 5;
          return regeneratorRuntime.awrap(findWorkerTabsByAppleSite());

        case 5:
          _context3.t1 = _context3.sent;
          return _context3.abrupt('return', _context3.t0.concat.call(_context3.t0, _context3.t1));

        case 7:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, this);
}

/**
 * Close all worker tabs. Usually used to close all worker tabs from previous
 * session
 * @return  {Promise}
 * @resolve           if all the tabs are closed
 * @reject  {Error}   if there is error reported from Chrome
 */
function closeAllWorkerTabs() {
  var _this = this;

  var workerTabs;
  return regeneratorRuntime.async(function closeAllWorkerTabs$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(findAllWorkerTabs());

        case 2:
          workerTabs = _context5.sent;

          workerTabs.forEach(function _callee(tab) {
            return regeneratorRuntime.async(function _callee$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return regeneratorRuntime.awrap(_chromePromise2.default.tabs.remove(tab.id));

                  case 2:
                  case 'end':
                    return _context4.stop();
                }
              }
            }, null, _this);
          });

        case 4:
        case 'end':
          return _context5.stop();
      }
    }
  }, null, this);
}

function findWorkerTabByStorage() {
  var workerTabId, _ref;

  return regeneratorRuntime.async(function findWorkerTabByStorage$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          workerTabId = void 0;
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(_chromePromise2.default.storage.local.get('workerTabId'));

        case 4:
          _ref = _context6.sent;
          workerTabId = _ref.workerTabId;

          if (workerTabId) {
            _context6.next = 8;
            break;
          }

          return _context6.abrupt('return', Promise.reject(new Error('Missing workerTabId in local storage.')));

        case 8:
          _context6.next = 10;
          return regeneratorRuntime.awrap(_chromePromise2.default.tabs.get(workerTabId));

        case 10:
          return _context6.abrupt('return', _context6.sent);

        case 13:
          _context6.prev = 13;
          _context6.t0 = _context6['catch'](1);

        case 15:
          return _context6.abrupt('return', null);

        case 16:
        case 'end':
          return _context6.stop();
      }
    }
  }, null, this, [[1, 13]]);
}

function findWorkerTabByUrl() {
  var tabs;
  return regeneratorRuntime.async(function findWorkerTabByUrl$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(_chromePromise2.default.tabs.query({
            url: 'chrome-extension://' + chrome.runtime.id + '/worker.html*'
          }));

        case 2:
          tabs = _context7.sent;

          if (!(tabs.length === 0)) {
            _context7.next = 5;
            break;
          }

          return _context7.abrupt('return', null);

        case 5:
          return _context7.abrupt('return', tabs[0]);

        case 6:
        case 'end':
          return _context7.stop();
      }
    }
  }, null, this);
}

function findWorkerTabByAppleSite() {
  var tabs, i, l, tab, referrer;
  return regeneratorRuntime.async(function findWorkerTabByAppleSite$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(_chromePromise2.default.tabs.query({
            url: 'https://www.apple.com/*'
          }));

        case 2:
          tabs = _context8.sent;

          if (!(tabs.length === 0)) {
            _context8.next = 5;
            break;
          }

          return _context8.abrupt('return', null);

        case 5:
          i = 0, l = tabs.length;

        case 6:
          if (!(i < l)) {
            _context8.next = 16;
            break;
          }

          tab = tabs[i];
          _context8.next = 10;
          return regeneratorRuntime.awrap(_chromePromise2.default.tabs.executeScript(tab.id, { code: 'document.referrer' }));

        case 10:
          referrer = _context8.sent;

          if (!getWorkerPageURLRegExp().test(referrer)) {
            _context8.next = 13;
            break;
          }

          return _context8.abrupt('return', tab);

        case 13:
          i++;
          _context8.next = 6;
          break;

        case 16:
          return _context8.abrupt('return', null);

        case 17:
        case 'end':
          return _context8.stop();
      }
    }
  }, null, this);
}

function findWorkerTab() {
  var _arr, _i, fn, tab;

  return regeneratorRuntime.async(function findWorkerTab$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _arr = [findWorkerTabByStorage, findWorkerTabByUrl, findWorkerTabByAppleSite];
          _i = 0;

        case 2:
          if (!(_i < _arr.length)) {
            _context9.next = 18;
            break;
          }

          fn = _arr[_i];
          _context9.prev = 4;
          _context9.next = 7;
          return regeneratorRuntime.awrap(fn());

        case 7:
          tab = _context9.sent;

          if (!(tab !== null)) {
            _context9.next = 10;
            break;
          }

          return _context9.abrupt('return', tab);

        case 10:
          _context9.next = 15;
          break;

        case 12:
          _context9.prev = 12;
          _context9.t0 = _context9['catch'](4);
          return _context9.abrupt('break', 18);

        case 15:
          _i++;
          _context9.next = 2;
          break;

        case 18:
          return _context9.abrupt('return', Promise.reject(new Error(_constant2.default.ERR_WORKERTAB_NOTFOUND)));

        case 19:
        case 'end':
          return _context9.stop();
      }
    }
  }, null, this, [[4, 12]]);
};

// Get Apple store URL base on region option
function getAppleStoreURL(region) {
  // TODO: support more region in the future
  return 'https://www.apple.com/hk/shop/buy-iphone/';
}

function logError(error) {
  chrome.notifications.create('error', {
    type: 'basic',
    // TODO: iconUrl: '',
    title: _i18n2.default.t('error.notification.title'),
    message: _i18n2.default.t('error.notificaiton.message')
  });
  console.error(error);
}

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var iPhoneData = __webpack_require__(64);

// TODO: Refactor into a more ORM-like class
/**
 * Find all iPhone data in list
 * @return {Object[]} All iPhone data
 */
function getAll() {
  return iPhoneData;
}

/**
 * Find the iPhone by id
 * @param  {String} id Id of the iPhone
 * @return {Object}    The iPhone specified by the id, undefined if not found
 */
function findById(id) {
  return iPhoneData.find(function (phone) {
    return phone['_id'] === id;
  });
}

/**
 * Group the iPhone list provided by the model
 * @param {Object[]} phoneList List of iPhone data returned from get* function
 * @return {Object[][]}        List of models, within each a list of phones
 */
function groupByModel(phoneList) {
  var modelDict = {};
  var modelList = [];
  // Construct two things:
  // 1. A dictionary of model mapped to list of phone devices of the model
  // 2. An array of unique model's name, each name will be replaced by the
  //    corresponding list of phone devices at the end
  phoneList.forEach(function (phone) {
    if (!modelDict[phone.model]) {
      modelList.push(phone.model);
      modelDict[phone.model] = [];
    }
    modelDict[phone.model].push(phone);
  });

  return modelList.map(function (model) {
    return modelDict[model];
  });
}

exports.default = {
  getAll: getAll,
  findById: findById,
  groupByModel: groupByModel
};
module.exports = exports['default'];

/***/ }),

/***/ 290:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPhoneName = getPhoneName;
function getPhoneName(t, phone) {
  return t("iphone.model." + phone.model) + " " + t("iphone.size." + phone.size) + " " + t("iphone.capacity." + phone.capacity);
}

/***/ }),

/***/ 3:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var consoleLogger = {
  type: 'logger',

  log: function log(args) {
    this.output('log', args);
  },
  warn: function warn(args) {
    this.output('warn', args);
  },
  error: function error(args) {
    this.output('error', args);
  },
  output: function output(type, args) {
    var _console;

    /* eslint no-console: 0 */
    if (console && console[type]) (_console = console)[type].apply(_console, _toConsumableArray(args));
  }
};

var Logger = function () {
  function Logger(concreteLogger) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Logger);

    this.init(concreteLogger, options);
  }

  Logger.prototype.init = function init(concreteLogger) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    this.prefix = options.prefix || 'i18next:';
    this.logger = concreteLogger || consoleLogger;
    this.options = options;
    this.debug = options.debug;
  };

  Logger.prototype.setDebug = function setDebug(bool) {
    this.debug = bool;
  };

  Logger.prototype.log = function log() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return this.forward(args, 'log', '', true);
  };

  Logger.prototype.warn = function warn() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return this.forward(args, 'warn', '', true);
  };

  Logger.prototype.error = function error() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return this.forward(args, 'error', '');
  };

  Logger.prototype.deprecate = function deprecate() {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return this.forward(args, 'warn', 'WARNING DEPRECATED: ', true);
  };

  Logger.prototype.forward = function forward(args, lvl, prefix, debugOnly) {
    if (debugOnly && !this.debug) return null;
    if (typeof args[0] === 'string') args[0] = '' + prefix + this.prefix + ' ' + args[0];
    return this.logger[lvl](args);
  };

  Logger.prototype.create = function create(moduleName) {
    return new Logger(this.logger, _extends({ prefix: this.prefix + ':' + moduleName + ':' }, this.options));
  };

  return Logger;
}();

/* harmony default export */ __webpack_exports__["a"] = (new Logger());

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeLanguage", function() { return changeLanguage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneInstance", function() { return cloneInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createInstance", function() { return createInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dir", function() { return dir; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exists", function() { return exists; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFixedT", function() { return getFixedT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadLanguages", function() { return loadLanguages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadNamespaces", function() { return loadNamespaces; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadResources", function() { return loadResources; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "off", function() { return off; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "on", function() { return on; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDefaultNamespace", function() { return setDefaultNamespace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return t; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "use", function() { return use; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__i18next__ = __webpack_require__(36);


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */]);

var changeLanguage = __WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */].changeLanguage.bind(__WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */]);
var cloneInstance = __WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */].cloneInstance.bind(__WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */]);
var createInstance = __WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */].createInstance.bind(__WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */]);
var dir = __WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */].dir.bind(__WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */]);
var exists = __WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */].exists.bind(__WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */]);
var getFixedT = __WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */].getFixedT.bind(__WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */]);
var init = __WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */].init.bind(__WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */]);
var loadLanguages = __WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */].loadLanguages.bind(__WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */]);
var loadNamespaces = __WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */].loadNamespaces.bind(__WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */]);
var loadResources = __WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */].loadResources.bind(__WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */]);
var off = __WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */].off.bind(__WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */]);
var on = __WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */].on.bind(__WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */]);
var setDefaultNamespace = __WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */].setDefaultNamespace.bind(__WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */]);
var t = __WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */].t.bind(__WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */]);
var use = __WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */].use.bind(__WEBPACK_IMPORTED_MODULE_0__i18next__["a" /* default */]);

/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logger__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EventEmitter__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ResourceStore__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Translator__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__LanguageUtils__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__PluralResolver__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Interpolator__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__BackendConnector__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__CacheConnector__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__defaults__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__postProcessor__ = __webpack_require__(16);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }













function noop() {}

var I18n = function (_EventEmitter) {
  _inherits(I18n, _EventEmitter);

  function I18n() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments[1];

    _classCallCheck(this, I18n);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    _this.options = Object(__WEBPACK_IMPORTED_MODULE_9__defaults__["b" /* transformOptions */])(options);
    _this.services = {};
    _this.logger = __WEBPACK_IMPORTED_MODULE_0__logger__["a" /* default */];
    _this.modules = { external: [] };

    if (callback && !_this.isInitialized && !options.isClone) {
      var _ret;

      // https://github.com/i18next/i18next/issues/879
      if (!_this.options.initImmediate) return _ret = _this.init(options, callback), _possibleConstructorReturn(_this, _ret);
      setTimeout(function () {
        _this.init(options, callback);
      }, 0);
    }
    return _this;
  }

  I18n.prototype.init = function init() {
    var _this2 = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments[1];

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    this.options = _extends({}, Object(__WEBPACK_IMPORTED_MODULE_9__defaults__["a" /* get */])(), this.options, Object(__WEBPACK_IMPORTED_MODULE_9__defaults__["b" /* transformOptions */])(options));

    this.format = this.options.interpolation.format;
    if (!callback) callback = noop;

    function createClassOnDemand(ClassOrObject) {
      if (!ClassOrObject) return null;
      if (typeof ClassOrObject === 'function') return new ClassOrObject();
      return ClassOrObject;
    }

    // init services
    if (!this.options.isClone) {
      if (this.modules.logger) {
        __WEBPACK_IMPORTED_MODULE_0__logger__["a" /* default */].init(createClassOnDemand(this.modules.logger), this.options);
      } else {
        __WEBPACK_IMPORTED_MODULE_0__logger__["a" /* default */].init(null, this.options);
      }

      var lu = new __WEBPACK_IMPORTED_MODULE_4__LanguageUtils__["a" /* default */](this.options);
      this.store = new __WEBPACK_IMPORTED_MODULE_2__ResourceStore__["a" /* default */](this.options.resources, this.options);

      var s = this.services;
      s.logger = __WEBPACK_IMPORTED_MODULE_0__logger__["a" /* default */];
      s.resourceStore = this.store;
      s.resourceStore.on('added removed', function (lng, ns) {
        s.cacheConnector.save();
      });
      s.languageUtils = lu;
      s.pluralResolver = new __WEBPACK_IMPORTED_MODULE_5__PluralResolver__["a" /* default */](lu, { prepend: this.options.pluralSeparator, compatibilityJSON: this.options.compatibilityJSON, simplifyPluralSuffix: this.options.simplifyPluralSuffix });
      s.interpolator = new __WEBPACK_IMPORTED_MODULE_6__Interpolator__["a" /* default */](this.options);

      s.backendConnector = new __WEBPACK_IMPORTED_MODULE_7__BackendConnector__["a" /* default */](createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
      // pipe events from backendConnector
      s.backendConnector.on('*', function (event) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        _this2.emit.apply(_this2, [event].concat(args));
      });

      s.backendConnector.on('loaded', function (loaded) {
        s.cacheConnector.save();
      });

      s.cacheConnector = new __WEBPACK_IMPORTED_MODULE_8__CacheConnector__["a" /* default */](createClassOnDemand(this.modules.cache), s.resourceStore, s, this.options);
      // pipe events from backendConnector
      s.cacheConnector.on('*', function (event) {
        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        _this2.emit.apply(_this2, [event].concat(args));
      });

      if (this.modules.languageDetector) {
        s.languageDetector = createClassOnDemand(this.modules.languageDetector);
        s.languageDetector.init(s, this.options.detection, this.options);
      }

      this.translator = new __WEBPACK_IMPORTED_MODULE_3__Translator__["a" /* default */](this.services, this.options);
      // pipe events from translator
      this.translator.on('*', function (event) {
        for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }

        _this2.emit.apply(_this2, [event].concat(args));
      });

      this.modules.external.forEach(function (m) {
        if (m.init) m.init(_this2);
      });
    }

    // append api
    var storeApi = ['getResource', 'addResource', 'addResources', 'addResourceBundle', 'removeResourceBundle', 'hasResourceBundle', 'getResourceBundle'];
    storeApi.forEach(function (fcName) {
      _this2[fcName] = function () {
        var _store;

        return (_store = _this2.store)[fcName].apply(_store, arguments);
      };
    });

    var load = function load() {
      _this2.changeLanguage(_this2.options.lng, function (err, t) {
        _this2.isInitialized = true;
        _this2.logger.log('initialized', _this2.options);
        _this2.emit('initialized', _this2.options);

        callback(err, t);
      });
    };

    if (this.options.resources || !this.options.initImmediate) {
      load();
    } else {
      setTimeout(load, 0);
    }

    return this;
  };

  /* eslint consistent-return: 0 */


  I18n.prototype.loadResources = function loadResources() {
    var _this3 = this;

    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

    if (!this.options.resources) {
      if (this.language && this.language.toLowerCase() === 'cimode') return callback(); // avoid loading resources for cimode

      var toLoad = [];

      var append = function append(lng) {
        if (!lng) return;
        var lngs = _this3.services.languageUtils.toResolveHierarchy(lng);
        lngs.forEach(function (l) {
          if (toLoad.indexOf(l) < 0) toLoad.push(l);
        });
      };

      if (!this.language) {
        // at least load fallbacks in this case
        var fallbacks = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
        fallbacks.forEach(function (l) {
          return append(l);
        });
      } else {
        append(this.language);
      }

      if (this.options.preload) {
        this.options.preload.forEach(function (l) {
          return append(l);
        });
      }

      this.services.cacheConnector.load(toLoad, this.options.ns, function () {
        _this3.services.backendConnector.load(toLoad, _this3.options.ns, callback);
      });
    } else {
      callback(null);
    }
  };

  I18n.prototype.reloadResources = function reloadResources(lngs, ns) {
    if (!lngs) lngs = this.languages;
    if (!ns) ns = this.options.ns;
    this.services.backendConnector.reload(lngs, ns);
  };

  I18n.prototype.use = function use(module) {
    if (module.type === 'backend') {
      this.modules.backend = module;
    }

    if (module.type === 'cache') {
      this.modules.cache = module;
    }

    if (module.type === 'logger' || module.log && module.warn && module.error) {
      this.modules.logger = module;
    }

    if (module.type === 'languageDetector') {
      this.modules.languageDetector = module;
    }

    if (module.type === 'postProcessor') {
      __WEBPACK_IMPORTED_MODULE_10__postProcessor__["a" /* default */].addPostProcessor(module);
    }

    if (module.type === '3rdParty') {
      this.modules.external.push(module);
    }

    return this;
  };

  I18n.prototype.changeLanguage = function changeLanguage(lng, callback) {
    var _this4 = this;

    var done = function done(err, l) {
      if (l) {
        _this4.emit('languageChanged', l);
        _this4.logger.log('languageChanged', l);
      }

      if (callback) callback(err, function () {
        return _this4.t.apply(_this4, arguments);
      });
    };

    var setLng = function setLng(l) {
      if (l) {
        _this4.language = l;
        _this4.languages = _this4.services.languageUtils.toResolveHierarchy(l);

        _this4.translator.changeLanguage(l);

        if (_this4.services.languageDetector) _this4.services.languageDetector.cacheUserLanguage(l);
      }

      _this4.loadResources(function (err) {
        done(err, l);
      });
    };

    if (!lng && this.services.languageDetector && !this.services.languageDetector.async) {
      setLng(this.services.languageDetector.detect());
    } else if (!lng && this.services.languageDetector && this.services.languageDetector.async) {
      this.services.languageDetector.detect(setLng);
    } else {
      setLng(lng);
    }
  };

  I18n.prototype.getFixedT = function getFixedT(lng, ns) {
    var _this5 = this;

    var fixedT = function fixedT(key) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var options = typeof opts === 'string' ? { defaultValue: opts } : _extends({}, opts);
      options.lng = options.lng || fixedT.lng;
      options.lngs = options.lngs || fixedT.lngs;
      options.ns = options.ns || fixedT.ns;
      return _this5.t(key, options);
    };
    if (typeof lng === 'string') {
      fixedT.lng = lng;
    } else {
      fixedT.lngs = lng;
    }
    fixedT.ns = ns;
    return fixedT;
  };

  I18n.prototype.t = function t() {
    var _translator;

    return this.translator && (_translator = this.translator).translate.apply(_translator, arguments);
  };

  I18n.prototype.exists = function exists() {
    var _translator2;

    return this.translator && (_translator2 = this.translator).exists.apply(_translator2, arguments);
  };

  I18n.prototype.setDefaultNamespace = function setDefaultNamespace(ns) {
    this.options.defaultNS = ns;
  };

  I18n.prototype.loadNamespaces = function loadNamespaces(ns, callback) {
    var _this6 = this;

    if (!this.options.ns) return callback && callback();
    if (typeof ns === 'string') ns = [ns];

    ns.forEach(function (n) {
      if (_this6.options.ns.indexOf(n) < 0) _this6.options.ns.push(n);
    });

    this.loadResources(callback);
  };

  I18n.prototype.loadLanguages = function loadLanguages(lngs, callback) {
    if (typeof lngs === 'string') lngs = [lngs];
    var preloaded = this.options.preload || [];

    var newLngs = lngs.filter(function (lng) {
      return preloaded.indexOf(lng) < 0;
    });
    // Exit early if all given languages are already preloaded
    if (!newLngs.length) return callback();

    this.options.preload = preloaded.concat(newLngs);
    this.loadResources(callback);
  };

  I18n.prototype.dir = function dir(lng) {
    if (!lng) lng = this.languages && this.languages.length > 0 ? this.languages[0] : this.language;
    if (!lng) return 'rtl';

    var rtlLngs = ['ar', 'shu', 'sqr', 'ssh', 'xaa', 'yhd', 'yud', 'aao', 'abh', 'abv', 'acm', 'acq', 'acw', 'acx', 'acy', 'adf', 'ads', 'aeb', 'aec', 'afb', 'ajp', 'apc', 'apd', 'arb', 'arq', 'ars', 'ary', 'arz', 'auz', 'avl', 'ayh', 'ayl', 'ayn', 'ayp', 'bbz', 'pga', 'he', 'iw', 'ps', 'pbt', 'pbu', 'pst', 'prp', 'prd', 'ur', 'ydd', 'yds', 'yih', 'ji', 'yi', 'hbo', 'men', 'xmn', 'fa', 'jpr', 'peo', 'pes', 'prs', 'dv', 'sam'];

    return rtlLngs.indexOf(this.services.languageUtils.getLanguagePartFromCode(lng)) >= 0 ? 'rtl' : 'ltr';
  };

  /* eslint class-methods-use-this: 0 */


  I18n.prototype.createInstance = function createInstance() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments[1];

    return new I18n(options, callback);
  };

  I18n.prototype.cloneInstance = function cloneInstance() {
    var _this7 = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

    var mergedOptions = _extends({}, this.options, options, { isClone: true });
    var clone = new I18n(mergedOptions, callback);
    var membersToCopy = ['store', 'services', 'language'];
    membersToCopy.forEach(function (m) {
      clone[m] = _this7[m];
    });
    clone.translator = new __WEBPACK_IMPORTED_MODULE_3__Translator__["a" /* default */](clone.services, clone.options);
    clone.translator.on('*', function (event) {
      for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      clone.emit.apply(clone, [event].concat(args));
    });
    clone.init(mergedOptions, callback);

    return clone;
  };

  return I18n;
}(__WEBPACK_IMPORTED_MODULE_1__EventEmitter__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new I18n());

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__EventEmitter__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(9);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }




var ResourceStore = function (_EventEmitter) {
  _inherits(ResourceStore, _EventEmitter);

  function ResourceStore(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { ns: ['translation'], defaultNS: 'translation' };

    _classCallCheck(this, ResourceStore);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    _this.data = data || {};
    _this.options = options;
    return _this;
  }

  ResourceStore.prototype.addNamespaces = function addNamespaces(ns) {
    if (this.options.ns.indexOf(ns) < 0) {
      this.options.ns.push(ns);
    }
  };

  ResourceStore.prototype.removeNamespaces = function removeNamespaces(ns) {
    var index = this.options.ns.indexOf(ns);
    if (index > -1) {
      this.options.ns.splice(index, 1);
    }
  };

  ResourceStore.prototype.getResource = function getResource(lng, ns, key) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var keySeparator = options.keySeparator || this.options.keySeparator;
    if (keySeparator === undefined) keySeparator = '.';

    var path = [lng, ns];
    if (key && typeof key !== 'string') path = path.concat(key);
    if (key && typeof key === 'string') path = path.concat(keySeparator ? key.split(keySeparator) : key);

    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
    }

    return __WEBPACK_IMPORTED_MODULE_1__utils__["d" /* getPath */](this.data, path);
  };

  ResourceStore.prototype.addResource = function addResource(lng, ns, key, value) {
    var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : { silent: false };

    var keySeparator = this.options.keySeparator;
    if (keySeparator === undefined) keySeparator = '.';

    var path = [lng, ns];
    if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);

    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
      value = ns;
      ns = path[1];
    }

    this.addNamespaces(ns);

    __WEBPACK_IMPORTED_MODULE_1__utils__["h" /* setPath */](this.data, path, value);

    if (!options.silent) this.emit('added', lng, ns, key, value);
  };

  ResourceStore.prototype.addResources = function addResources(lng, ns, resources) {
    /* eslint no-restricted-syntax: 0 */
    for (var m in resources) {
      if (typeof resources[m] === 'string') this.addResource(lng, ns, m, resources[m], { silent: true });
    }
    this.emit('added', lng, ns, resources);
  };

  ResourceStore.prototype.addResourceBundle = function addResourceBundle(lng, ns, resources, deep, overwrite) {
    var path = [lng, ns];
    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
      deep = resources;
      resources = ns;
      ns = path[1];
    }

    this.addNamespaces(ns);

    var pack = __WEBPACK_IMPORTED_MODULE_1__utils__["d" /* getPath */](this.data, path) || {};

    if (deep) {
      __WEBPACK_IMPORTED_MODULE_1__utils__["b" /* deepExtend */](pack, resources, overwrite);
    } else {
      pack = _extends({}, pack, resources);
    }

    __WEBPACK_IMPORTED_MODULE_1__utils__["h" /* setPath */](this.data, path, pack);

    this.emit('added', lng, ns, resources);
  };

  ResourceStore.prototype.removeResourceBundle = function removeResourceBundle(lng, ns) {
    if (this.hasResourceBundle(lng, ns)) {
      delete this.data[lng][ns];
    }
    this.removeNamespaces(ns);

    this.emit('removed', lng, ns);
  };

  ResourceStore.prototype.hasResourceBundle = function hasResourceBundle(lng, ns) {
    return this.getResource(lng, ns) !== undefined;
  };

  ResourceStore.prototype.getResourceBundle = function getResourceBundle(lng, ns) {
    if (!ns) ns = this.options.defaultNS;

    // COMPATIBILITY: remove extend in v2.1.0
    if (this.options.compatibilityAPI === 'v1') return _extends({}, this.getResource(lng, ns));

    return this.getResource(lng, ns);
  };

  ResourceStore.prototype.toJSON = function toJSON() {
    return this.data;
  };

  return ResourceStore;
}(__WEBPACK_IMPORTED_MODULE_0__EventEmitter__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (ResourceStore);

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logger__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EventEmitter__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__postProcessor__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(9);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }






var Translator = function (_EventEmitter) {
  _inherits(Translator, _EventEmitter);

  function Translator(services) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Translator);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* copy */](['resourceStore', 'languageUtils', 'pluralResolver', 'interpolator', 'backendConnector'], services, _this);

    _this.options = options;
    _this.logger = __WEBPACK_IMPORTED_MODULE_0__logger__["a" /* default */].create('translator');
    return _this;
  }

  Translator.prototype.changeLanguage = function changeLanguage(lng) {
    if (lng) this.language = lng;
  };

  Translator.prototype.exists = function exists(key) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { interpolation: {} };

    return this.resolve(key, options) !== undefined;
  };

  Translator.prototype.extractFromKey = function extractFromKey(key, options) {
    var nsSeparator = options.nsSeparator || this.options.nsSeparator;
    if (nsSeparator === undefined) nsSeparator = ':';
    var keySeparator = options.keySeparator || this.options.keySeparator || '.';

    var namespaces = options.ns || this.options.defaultNS;
    if (nsSeparator && key.indexOf(nsSeparator) > -1) {
      var parts = key.split(nsSeparator);
      if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.indexOf(parts[0]) > -1) namespaces = parts.shift();
      key = parts.join(keySeparator);
    }
    if (typeof namespaces === 'string') namespaces = [namespaces];

    return {
      key: key,
      namespaces: namespaces
    };
  };

  Translator.prototype.translate = function translate(keys) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
      /* eslint prefer-rest-params: 0 */
      options = this.options.overloadTranslationOptionHandler(arguments);
    }

    // non valid keys handling
    if (keys === undefined || keys === null || keys === '') return '';
    if (typeof keys === 'number') keys = String(keys);
    if (typeof keys === 'string') keys = [keys];

    // separators
    var keySeparator = options.keySeparator || this.options.keySeparator || '.';

    // get namespace(s)

    var _extractFromKey = this.extractFromKey(keys[keys.length - 1], options),
        key = _extractFromKey.key,
        namespaces = _extractFromKey.namespaces;

    var namespace = namespaces[namespaces.length - 1];

    // return key on CIMode
    var lng = options.lng || this.language;
    var appendNamespaceToCIMode = options.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (lng && lng.toLowerCase() === 'cimode') {
      if (appendNamespaceToCIMode) {
        var nsSeparator = options.nsSeparator || this.options.nsSeparator;
        return namespace + nsSeparator + key;
      }

      return key;
    }

    // resolve from store
    var res = this.resolve(keys, options);

    var resType = Object.prototype.toString.apply(res);
    var noObject = ['[object Number]', '[object Function]', '[object RegExp]'];
    var joinArrays = options.joinArrays !== undefined ? options.joinArrays : this.options.joinArrays;

    // object
    if (res && typeof res !== 'string' && noObject.indexOf(resType) < 0 && !(joinArrays && resType === '[object Array]')) {
      if (!options.returnObjects && !this.options.returnObjects) {
        this.logger.warn('accessing an object - but returnObjects options is not enabled!');
        return this.options.returnedObjectHandler ? this.options.returnedObjectHandler(key, res, options) : 'key \'' + key + ' (' + this.language + ')\' returned an object instead of string.';
      }

      // if we got a separator we loop over children - else we just return object as is
      // as having it set to false means no hierarchy so no lookup for nested values
      if (options.keySeparator || this.options.keySeparator) {
        var copy = resType === '[object Array]' ? [] : {}; // apply child translation on a copy

        /* eslint no-restricted-syntax: 0 */
        for (var m in res) {
          if (Object.prototype.hasOwnProperty.call(res, m)) {
            copy[m] = this.translate('' + key + keySeparator + m, _extends({}, options, { joinArrays: false, ns: namespaces }));
          }
        }
        res = copy;
      }
    } else if (joinArrays && resType === '[object Array]') {
      // array special treatment
      res = res.join(joinArrays);
      if (res) res = this.extendTranslation(res, key, options);
    } else {
      // string, empty or null
      var usedDefault = false;
      var usedKey = false;

      // fallback value
      if (!this.isValidLookup(res) && options.defaultValue !== undefined) {
        usedDefault = true;
        res = options.defaultValue;
      }
      if (!this.isValidLookup(res)) {
        usedKey = true;
        res = key;
      }

      // save missing
      if (usedKey || usedDefault) {
        this.logger.log('missingKey', lng, namespace, key, res);

        var lngs = [];
        var fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, options.lng || this.language);
        if (this.options.saveMissingTo === 'fallback' && fallbackLngs && fallbackLngs[0]) {
          for (var i = 0; i < fallbackLngs.length; i++) {
            lngs.push(fallbackLngs[i]);
          }
        } else if (this.options.saveMissingTo === 'all') {
          lngs = this.languageUtils.toResolveHierarchy(options.lng || this.language);
        } else {
          lngs.push(options.lng || this.language);
        }

        if (this.options.saveMissing) {
          if (this.options.missingKeyHandler) {
            this.options.missingKeyHandler(lngs, namespace, key, res);
          } else if (this.backendConnector && this.backendConnector.saveMissing) {
            this.backendConnector.saveMissing(lngs, namespace, key, res);
          }
        }

        this.emit('missingKey', lngs, namespace, key, res);
      }

      // extend
      res = this.extendTranslation(res, key, options);

      // append namespace if still key
      if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = namespace + ':' + key;

      // parseMissingKeyHandler
      if (usedKey && this.options.parseMissingKeyHandler) res = this.options.parseMissingKeyHandler(res);
    }

    // return
    return res;
  };

  Translator.prototype.extendTranslation = function extendTranslation(res, key, options) {
    var _this2 = this;

    if (options.interpolation) this.interpolator.init(_extends({}, options, { interpolation: _extends({}, this.options.interpolation, options.interpolation) }));

    // interpolate
    var data = options.replace && typeof options.replace !== 'string' ? options.replace : options;
    if (this.options.interpolation.defaultVariables) data = _extends({}, this.options.interpolation.defaultVariables, data);
    res = this.interpolator.interpolate(res, data, options.lng || this.language);

    // nesting
    if (options.nest !== false) res = this.interpolator.nest(res, function () {
      return _this2.translate.apply(_this2, arguments);
    }, options);

    if (options.interpolation) this.interpolator.reset();

    // post process
    var postProcess = options.postProcess || this.options.postProcess;
    var postProcessorNames = typeof postProcess === 'string' ? [postProcess] : postProcess;

    if (res !== undefined && postProcessorNames && postProcessorNames.length && options.applyPostProcessor !== false) {
      res = __WEBPACK_IMPORTED_MODULE_2__postProcessor__["a" /* default */].handle(postProcessorNames, res, key, options, this);
    }

    return res;
  };

  Translator.prototype.resolve = function resolve(keys) {
    var _this3 = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var found = void 0;

    if (typeof keys === 'string') keys = [keys];

    // forEach possible key
    keys.forEach(function (k) {
      if (_this3.isValidLookup(found)) return;

      var extracted = _this3.extractFromKey(k, options);
      var key = extracted.key;
      var namespaces = extracted.namespaces;
      if (_this3.options.fallbackNS) namespaces = namespaces.concat(_this3.options.fallbackNS);

      var needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
      var needsContextHandling = options.context !== undefined && typeof options.context === 'string' && options.context !== '';

      var codes = options.lngs ? options.lngs : _this3.languageUtils.toResolveHierarchy(options.lng || _this3.language);

      namespaces.forEach(function (ns) {
        if (_this3.isValidLookup(found)) return;

        codes.forEach(function (code) {
          if (_this3.isValidLookup(found)) return;

          var finalKey = key;
          var finalKeys = [finalKey];

          var pluralSuffix = void 0;
          if (needsPluralHandling) pluralSuffix = _this3.pluralResolver.getSuffix(code, options.count);

          // fallback for plural if context not found
          if (needsPluralHandling && needsContextHandling) finalKeys.push(finalKey + pluralSuffix);

          // get key for context if needed
          if (needsContextHandling) finalKeys.push(finalKey += '' + _this3.options.contextSeparator + options.context);

          // get key for plural if needed
          if (needsPluralHandling) finalKeys.push(finalKey += pluralSuffix);

          // iterate over finalKeys starting with most specific pluralkey (-> contextkey only) -> singularkey only
          var possibleKey = void 0;
          /* eslint no-cond-assign: 0 */
          while (possibleKey = finalKeys.pop()) {
            if (!_this3.isValidLookup(found)) {
              found = _this3.getResource(code, ns, possibleKey, options);
            }
          }
        });
      });
    });

    return found;
  };

  Translator.prototype.isValidLookup = function isValidLookup(res) {
    return res !== undefined && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === '');
  };

  Translator.prototype.getResource = function getResource(code, ns, key) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    return this.resourceStore.getResource(code, ns, key, options);
  };

  return Translator;
}(__WEBPACK_IMPORTED_MODULE_1__EventEmitter__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Translator);

/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logger__ = __webpack_require__(3);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var LanguageUtil = function () {
  function LanguageUtil(options) {
    _classCallCheck(this, LanguageUtil);

    this.options = options;

    this.whitelist = this.options.whitelist || false;
    this.logger = __WEBPACK_IMPORTED_MODULE_0__logger__["a" /* default */].create('languageUtils');
  }

  LanguageUtil.prototype.getScriptPartFromCode = function getScriptPartFromCode(code) {
    if (!code || code.indexOf('-') < 0) return null;

    var p = code.split('-');
    if (p.length === 2) return null;
    p.pop();
    return this.formatLanguageCode(p.join('-'));
  };

  LanguageUtil.prototype.getLanguagePartFromCode = function getLanguagePartFromCode(code) {
    if (!code || code.indexOf('-') < 0) return code;

    var p = code.split('-');
    return this.formatLanguageCode(p[0]);
  };

  LanguageUtil.prototype.formatLanguageCode = function formatLanguageCode(code) {
    // http://www.iana.org/assignments/language-tags/language-tags.xhtml
    if (typeof code === 'string' && code.indexOf('-') > -1) {
      var specialCases = ['hans', 'hant', 'latn', 'cyrl', 'cans', 'mong', 'arab'];
      var p = code.split('-');

      if (this.options.lowerCaseLng) {
        p = p.map(function (part) {
          return part.toLowerCase();
        });
      } else if (p.length === 2) {
        p[0] = p[0].toLowerCase();
        p[1] = p[1].toUpperCase();

        if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
      } else if (p.length === 3) {
        p[0] = p[0].toLowerCase();

        // if lenght 2 guess it's a country
        if (p[1].length === 2) p[1] = p[1].toUpperCase();
        if (p[0] !== 'sgn' && p[2].length === 2) p[2] = p[2].toUpperCase();

        if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
        if (specialCases.indexOf(p[2].toLowerCase()) > -1) p[2] = capitalize(p[2].toLowerCase());
      }

      return p.join('-');
    }

    return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
  };

  LanguageUtil.prototype.isWhitelisted = function isWhitelisted(code) {
    if (this.options.load === 'languageOnly' || this.options.nonExplicitWhitelist) {
      code = this.getLanguagePartFromCode(code);
    }
    return !this.whitelist || !this.whitelist.length || this.whitelist.indexOf(code) > -1;
  };

  LanguageUtil.prototype.getFallbackCodes = function getFallbackCodes(fallbacks, code) {
    if (!fallbacks) return [];
    if (typeof fallbacks === 'string') fallbacks = [fallbacks];
    if (Object.prototype.toString.apply(fallbacks) === '[object Array]') return fallbacks;

    if (!code) return fallbacks.default || [];

    // asume we have an object defining fallbacks
    var found = fallbacks[code];
    if (!found) found = fallbacks[this.getScriptPartFromCode(code)];
    if (!found) found = fallbacks[this.formatLanguageCode(code)];
    if (!found) found = fallbacks.default;

    return found || [];
  };

  LanguageUtil.prototype.toResolveHierarchy = function toResolveHierarchy(code, fallbackCode) {
    var _this = this;

    var fallbackCodes = this.getFallbackCodes(fallbackCode || this.options.fallbackLng || [], code);

    var codes = [];
    var addCode = function addCode(c) {
      if (!c) return;
      if (_this.isWhitelisted(c)) {
        codes.push(c);
      } else {
        _this.logger.warn('rejecting non-whitelisted language code: ' + c);
      }
    };

    if (typeof code === 'string' && code.indexOf('-') > -1) {
      if (this.options.load !== 'languageOnly') addCode(this.formatLanguageCode(code));
      if (this.options.load !== 'languageOnly' && this.options.load !== 'currentOnly') addCode(this.getScriptPartFromCode(code));
      if (this.options.load !== 'currentOnly') addCode(this.getLanguagePartFromCode(code));
    } else if (typeof code === 'string') {
      addCode(this.formatLanguageCode(code));
    }

    fallbackCodes.forEach(function (fc) {
      if (codes.indexOf(fc) < 0) addCode(_this.formatLanguageCode(fc));
    });

    return codes;
  };

  return LanguageUtil;
}();

/* harmony default export */ __webpack_exports__["a"] = (LanguageUtil);

/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logger__ = __webpack_require__(3);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



// definition http://translate.sourceforge.net/wiki/l10n/pluralforms
/* eslint-disable */
var sets = [{ lngs: ['ach', 'ak', 'am', 'arn', 'br', 'fil', 'gun', 'ln', 'mfe', 'mg', 'mi', 'oc', 'tg', 'ti', 'tr', 'uz', 'wa'], nr: [1, 2], fc: 1 }, { lngs: ['af', 'an', 'ast', 'az', 'bg', 'bn', 'ca', 'da', 'de', 'dev', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fi', 'fo', 'fur', 'fy', 'gl', 'gu', 'ha', 'he', 'hi', 'hu', 'hy', 'ia', 'it', 'kn', 'ku', 'lb', 'mai', 'ml', 'mn', 'mr', 'nah', 'nap', 'nb', 'ne', 'nl', 'nn', 'no', 'nso', 'pa', 'pap', 'pms', 'ps', 'pt', 'rm', 'sco', 'se', 'si', 'so', 'son', 'sq', 'sv', 'sw', 'ta', 'te', 'tk', 'ur', 'yo'], nr: [1, 2], fc: 2 }, { lngs: ['ay', 'bo', 'cgg', 'fa', 'id', 'ja', 'jbo', 'ka', 'kk', 'km', 'ko', 'ky', 'lo', 'ms', 'sah', 'su', 'th', 'tt', 'ug', 'vi', 'wo', 'zh'], nr: [1], fc: 3 }, { lngs: ['be', 'bs', 'dz', 'hr', 'ru', 'sr', 'uk'], nr: [1, 2, 5], fc: 4 }, { lngs: ['ar'], nr: [0, 1, 2, 3, 11, 100], fc: 5 }, { lngs: ['cs', 'sk'], nr: [1, 2, 5], fc: 6 }, { lngs: ['csb', 'pl'], nr: [1, 2, 5], fc: 7 }, { lngs: ['cy'], nr: [1, 2, 3, 8], fc: 8 }, { lngs: ['fr'], nr: [1, 2], fc: 9 }, { lngs: ['ga'], nr: [1, 2, 3, 7, 11], fc: 10 }, { lngs: ['gd'], nr: [1, 2, 3, 20], fc: 11 }, { lngs: ['is'], nr: [1, 2], fc: 12 }, { lngs: ['jv'], nr: [0, 1], fc: 13 }, { lngs: ['kw'], nr: [1, 2, 3, 4], fc: 14 }, { lngs: ['lt'], nr: [1, 2, 10], fc: 15 }, { lngs: ['lv'], nr: [1, 2, 0], fc: 16 }, { lngs: ['mk'], nr: [1, 2], fc: 17 }, { lngs: ['mnk'], nr: [0, 1, 2], fc: 18 }, { lngs: ['mt'], nr: [1, 2, 11, 20], fc: 19 }, { lngs: ['or'], nr: [2, 1], fc: 2 }, { lngs: ['ro'], nr: [1, 2, 20], fc: 20 }, { lngs: ['sl'], nr: [5, 1, 2, 3], fc: 21 }];

var _rulesPluralsTypes = {
  1: function _(n) {
    return Number(n > 1);
  },
  2: function _(n) {
    return Number(n != 1);
  },
  3: function _(n) {
    return 0;
  },
  4: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  5: function _(n) {
    return Number(n === 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5);
  },
  6: function _(n) {
    return Number(n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2);
  },
  7: function _(n) {
    return Number(n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  8: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3);
  },
  9: function _(n) {
    return Number(n >= 2);
  },
  10: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4);
  },
  11: function _(n) {
    return Number(n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3);
  },
  12: function _(n) {
    return Number(n % 10 != 1 || n % 100 == 11);
  },
  13: function _(n) {
    return Number(n !== 0);
  },
  14: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3);
  },
  15: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  16: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n !== 0 ? 1 : 2);
  },
  17: function _(n) {
    return Number(n == 1 || n % 10 == 1 ? 0 : 1);
  },
  18: function _(n) {
    return Number(n == 0 ? 0 : n == 1 ? 1 : 2);
  },
  19: function _(n) {
    return Number(n == 1 ? 0 : n === 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3);
  },
  20: function _(n) {
    return Number(n == 1 ? 0 : n === 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2);
  },
  21: function _(n) {
    return Number(n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0);
  }
};
/* eslint-enable */

function createRules() {
  var rules = {};
  sets.forEach(function (set) {
    set.lngs.forEach(function (l) {
      rules[l] = {
        numbers: set.nr,
        plurals: _rulesPluralsTypes[set.fc]
      };
    });
  });
  return rules;
}

var PluralResolver = function () {
  function PluralResolver(languageUtils) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, PluralResolver);

    this.languageUtils = languageUtils;
    this.options = options;

    this.logger = __WEBPACK_IMPORTED_MODULE_0__logger__["a" /* default */].create('pluralResolver');

    this.rules = createRules();
  }

  PluralResolver.prototype.addRule = function addRule(lng, obj) {
    this.rules[lng] = obj;
  };

  PluralResolver.prototype.getRule = function getRule(code) {
    return this.rules[this.languageUtils.getLanguagePartFromCode(code)];
  };

  PluralResolver.prototype.needsPlural = function needsPlural(code) {
    var rule = this.getRule(code);

    return rule && rule.numbers.length > 1;
  };

  PluralResolver.prototype.getSuffix = function getSuffix(code, count) {
    var _this = this;

    var rule = this.getRule(code);

    if (rule) {
      if (rule.numbers.length === 1) return ''; // only singular

      var idx = rule.noAbs ? rule.plurals(count) : rule.plurals(Math.abs(count));
      var suffix = rule.numbers[idx];

      // special treatment for lngs only having singular and plural
      if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
        if (suffix === 2) {
          suffix = 'plural';
        } else if (suffix === 1) {
          suffix = '';
        }
      }

      var returnSuffix = function returnSuffix() {
        return _this.options.prepend && suffix.toString() ? _this.options.prepend + suffix.toString() : suffix.toString();
      };

      // COMPATIBILITY JSON
      // v1
      if (this.options.compatibilityJSON === 'v1') {
        if (suffix === 1) return '';
        if (typeof suffix === 'number') return '_plural_' + suffix.toString();
        return returnSuffix();
      } else if ( /* v2 */this.options.compatibilityJSON === 'v2' || rule.numbers.length === 2 && rule.numbers[0] === 1) {
        return returnSuffix();
      } else if ( /* v3 - gettext index */rule.numbers.length === 2 && rule.numbers[0] === 1) {
        return returnSuffix();
      }
      return this.options.prepend && idx.toString() ? this.options.prepend + idx.toString() : idx.toString();
    }

    this.logger.warn('no plural rule found for: ' + code);
    return '';
  };

  return PluralResolver;
}();

/* harmony default export */ __webpack_exports__["a"] = (PluralResolver);

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logger__ = __webpack_require__(3);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var Interpolator = function () {
  function Interpolator() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Interpolator);

    this.logger = __WEBPACK_IMPORTED_MODULE_1__logger__["a" /* default */].create('interpolator');

    this.init(options, true);
  }

  /* eslint no-param-reassign: 0 */


  Interpolator.prototype.init = function init() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var reset = arguments[1];

    if (reset) {
      this.options = options;
      this.format = options.interpolation && options.interpolation.format || function (value) {
        return value;
      };
      this.escape = options.interpolation && options.interpolation.escape || __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* escape */];
    }
    if (!options.interpolation) options.interpolation = { escapeValue: true };

    var iOpts = options.interpolation;

    this.escapeValue = iOpts.escapeValue !== undefined ? iOpts.escapeValue : true;

    this.prefix = iOpts.prefix ? __WEBPACK_IMPORTED_MODULE_0__utils__["g" /* regexEscape */](iOpts.prefix) : iOpts.prefixEscaped || '{{';
    this.suffix = iOpts.suffix ? __WEBPACK_IMPORTED_MODULE_0__utils__["g" /* regexEscape */](iOpts.suffix) : iOpts.suffixEscaped || '}}';

    this.formatSeparator = iOpts.formatSeparator ? iOpts.formatSeparator : iOpts.formatSeparator || ',';

    this.unescapePrefix = iOpts.unescapeSuffix ? '' : iOpts.unescapePrefix || '-';
    this.unescapeSuffix = this.unescapePrefix ? '' : iOpts.unescapeSuffix || '';

    this.nestingPrefix = iOpts.nestingPrefix ? __WEBPACK_IMPORTED_MODULE_0__utils__["g" /* regexEscape */](iOpts.nestingPrefix) : iOpts.nestingPrefixEscaped || __WEBPACK_IMPORTED_MODULE_0__utils__["g" /* regexEscape */]('$t(');
    this.nestingSuffix = iOpts.nestingSuffix ? __WEBPACK_IMPORTED_MODULE_0__utils__["g" /* regexEscape */](iOpts.nestingSuffix) : iOpts.nestingSuffixEscaped || __WEBPACK_IMPORTED_MODULE_0__utils__["g" /* regexEscape */](')');

    this.maxReplaces = iOpts.maxReplaces ? iOpts.maxReplaces : 1000;

    // the regexp
    this.resetRegExp();
  };

  Interpolator.prototype.reset = function reset() {
    if (this.options) this.init(this.options);
  };

  Interpolator.prototype.resetRegExp = function resetRegExp() {
    // the regexp
    var regexpStr = this.prefix + '(.+?)' + this.suffix;
    this.regexp = new RegExp(regexpStr, 'g');

    var regexpUnescapeStr = '' + this.prefix + this.unescapePrefix + '(.+?)' + this.unescapeSuffix + this.suffix;
    this.regexpUnescape = new RegExp(regexpUnescapeStr, 'g');

    var nestingRegexpStr = this.nestingPrefix + '(.+?)' + this.nestingSuffix;
    this.nestingRegexp = new RegExp(nestingRegexpStr, 'g');
  };

  Interpolator.prototype.interpolate = function interpolate(str, data, lng) {
    var _this = this;

    var match = void 0;
    var value = void 0;
    var replaces = void 0;

    function regexSafe(val) {
      return val.replace(/\$/g, '$$$$');
    }

    var handleFormat = function handleFormat(key) {
      if (key.indexOf(_this.formatSeparator) < 0) return __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* getPath */](data, key);

      var p = key.split(_this.formatSeparator);
      var k = p.shift().trim();
      var f = p.join(_this.formatSeparator).trim();

      return _this.format(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* getPath */](data, k), f, lng);
    };

    this.resetRegExp();

    replaces = 0;
    // unescape if has unescapePrefix/Suffix
    /* eslint no-cond-assign: 0 */
    while (match = this.regexpUnescape.exec(str)) {
      value = handleFormat(match[1].trim());
      str = str.replace(match[0], value);
      this.regexpUnescape.lastIndex = 0;
      replaces++;
      if (replaces >= this.maxReplaces) {
        break;
      }
    }

    replaces = 0;
    // regular escape on demand
    while (match = this.regexp.exec(str)) {
      value = handleFormat(match[1].trim());
      if (typeof value !== 'string') value = __WEBPACK_IMPORTED_MODULE_0__utils__["e" /* makeString */](value);
      if (!value) {
        this.logger.warn('missed to pass in variable ' + match[1] + ' for interpolating ' + str);
        value = '';
      }
      value = this.escapeValue ? regexSafe(this.escape(value)) : regexSafe(value);
      str = str.replace(match[0], value);
      this.regexp.lastIndex = 0;
      replaces++;
      if (replaces >= this.maxReplaces) {
        break;
      }
    }
    return str;
  };

  Interpolator.prototype.nest = function nest(str, fc) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var match = void 0;
    var value = void 0;

    var clonedOptions = _extends({}, options);
    clonedOptions.applyPostProcessor = false; // avoid post processing on nested lookup

    // if value is something like "myKey": "lorem $(anotherKey, { "count": {{aValueInOptions}} })"
    function handleHasOptions(key) {
      if (key.indexOf(',') < 0) return key;

      var p = key.split(',');
      key = p.shift();
      var optionsString = p.join(',');
      optionsString = this.interpolate(optionsString, clonedOptions);
      optionsString = optionsString.replace(/'/g, '"');

      try {
        clonedOptions = JSON.parse(optionsString);
      } catch (e) {
        this.logger.error('failed parsing options string in nesting for key ' + key, e);
      }

      return key;
    }

    // regular escape on demand
    while (match = this.nestingRegexp.exec(str)) {
      value = fc(handleHasOptions.call(this, match[1].trim()), clonedOptions);

      // is only the nesting key (key1 = '$(key2)') return the value without stringify
      if (value && match[0] === str && typeof value !== 'string') return value;

      // no string to include or empty
      if (typeof value !== 'string') value = __WEBPACK_IMPORTED_MODULE_0__utils__["e" /* makeString */](value);
      if (!value) {
        this.logger.warn('missed to resolve ' + match[1] + ' for nesting ' + str);
        value = '';
      }
      // Nested keys should not be escaped by default #854
      // value = this.escapeValue ? regexSafe(utils.escape(value)) : regexSafe(value);
      str = str.replace(match[0], value);
      this.regexp.lastIndex = 0;
    }
    return str;
  };

  return Interpolator;
}();

/* harmony default export */ __webpack_exports__["a"] = (Interpolator);

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logger__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__EventEmitter__ = __webpack_require__(7);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }





function remove(arr, what) {
  var found = arr.indexOf(what);

  while (found !== -1) {
    arr.splice(found, 1);
    found = arr.indexOf(what);
  }
}

var Connector = function (_EventEmitter) {
  _inherits(Connector, _EventEmitter);

  function Connector(backend, store, services) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, Connector);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    _this.backend = backend;
    _this.store = store;
    _this.languageUtils = services.languageUtils;
    _this.options = options;
    _this.logger = __WEBPACK_IMPORTED_MODULE_1__logger__["a" /* default */].create('backendConnector');

    _this.state = {};
    _this.queue = [];

    if (_this.backend && _this.backend.init) {
      _this.backend.init(services, options.backend, options);
    }
    return _this;
  }

  Connector.prototype.queueLoad = function queueLoad(languages, namespaces, callback) {
    var _this2 = this;

    // find what needs to be loaded
    var toLoad = [];
    var pending = [];
    var toLoadLanguages = [];
    var toLoadNamespaces = [];

    languages.forEach(function (lng) {
      var hasAllNamespaces = true;

      namespaces.forEach(function (ns) {
        var name = lng + '|' + ns;

        if (_this2.store.hasResourceBundle(lng, ns)) {
          _this2.state[name] = 2; // loaded
        } else if (_this2.state[name] < 0) {
          // nothing to do for err
        } else if (_this2.state[name] === 1) {
          if (pending.indexOf(name) < 0) pending.push(name);
        } else {
          _this2.state[name] = 1; // pending

          hasAllNamespaces = false;

          if (pending.indexOf(name) < 0) pending.push(name);
          if (toLoad.indexOf(name) < 0) toLoad.push(name);
          if (toLoadNamespaces.indexOf(ns) < 0) toLoadNamespaces.push(ns);
        }
      });

      if (!hasAllNamespaces) toLoadLanguages.push(lng);
    });

    if (toLoad.length || pending.length) {
      this.queue.push({
        pending: pending,
        loaded: {},
        errors: [],
        callback: callback
      });
    }

    return {
      toLoad: toLoad,
      pending: pending,
      toLoadLanguages: toLoadLanguages,
      toLoadNamespaces: toLoadNamespaces
    };
  };

  Connector.prototype.loaded = function loaded(name, err, data) {
    var _this3 = this;

    var _name$split = name.split('|'),
        _name$split2 = _slicedToArray(_name$split, 2),
        lng = _name$split2[0],
        ns = _name$split2[1];

    if (err) this.emit('failedLoading', lng, ns, err);

    if (data) {
      this.store.addResourceBundle(lng, ns, data);
    }

    // set loaded
    this.state[name] = err ? -1 : 2;

    // callback if ready
    this.queue.forEach(function (q) {
      __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* pushPath */](q.loaded, [lng], ns);
      remove(q.pending, name);

      if (err) q.errors.push(err);

      if (q.pending.length === 0 && !q.done) {
        _this3.emit('loaded', q.loaded);
        /* eslint no-param-reassign: 0 */
        q.done = true;
        if (q.errors.length) {
          q.callback(q.errors);
        } else {
          q.callback();
        }
      }
    });

    // remove done load requests
    this.queue = this.queue.filter(function (q) {
      return !q.done;
    });
  };

  Connector.prototype.read = function read(lng, ns, fcName) {
    var tried = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    var _this4 = this;

    var wait = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 250;
    var callback = arguments[5];

    if (!lng.length) return callback(null, {}); // noting to load

    return this.backend[fcName](lng, ns, function (err, data) {
      if (err && data /* = retryFlag */ && tried < 5) {
        setTimeout(function () {
          _this4.read.call(_this4, lng, ns, fcName, tried + 1, wait * 2, callback);
        }, wait);
        return;
      }
      callback(err, data);
    });
  };

  /* eslint consistent-return: 0 */


  Connector.prototype.load = function load(languages, namespaces, callback) {
    var _this5 = this;

    if (!this.backend) {
      this.logger.warn('No backend was added via i18next.use. Will not load resources.');
      return callback && callback();
    }
    var options = _extends({}, this.backend.options, this.options.backend);

    if (typeof languages === 'string') languages = this.languageUtils.toResolveHierarchy(languages);
    if (typeof namespaces === 'string') namespaces = [namespaces];

    var toLoad = this.queueLoad(languages, namespaces, callback);
    if (!toLoad.toLoad.length) {
      if (!toLoad.pending.length) callback(); // nothing to load and no pendings...callback now
      return null; // pendings will trigger callback
    }

    // load with multi-load
    if (options.allowMultiLoading && this.backend.readMulti) {
      this.read(toLoad.toLoadLanguages, toLoad.toLoadNamespaces, 'readMulti', null, null, function (err, data) {
        if (err) _this5.logger.warn('loading namespaces ' + toLoad.toLoadNamespaces.join(', ') + ' for languages ' + toLoad.toLoadLanguages.join(', ') + ' via multiloading failed', err);
        if (!err && data) _this5.logger.log('successfully loaded namespaces ' + toLoad.toLoadNamespaces.join(', ') + ' for languages ' + toLoad.toLoadLanguages.join(', ') + ' via multiloading', data);

        toLoad.toLoad.forEach(function (name) {
          var _name$split3 = name.split('|'),
              _name$split4 = _slicedToArray(_name$split3, 2),
              l = _name$split4[0],
              n = _name$split4[1];

          var bundle = __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* getPath */](data, [l, n]);
          if (bundle) {
            _this5.loaded(name, err, bundle);
          } else {
            var error = 'loading namespace ' + n + ' for language ' + l + ' via multiloading failed';
            _this5.loaded(name, error);
            _this5.logger.error(error);
          }
        });
      });
    } else {
      toLoad.toLoad.forEach(function (name) {
        _this5.loadOne(name);
      });
    }
  };

  Connector.prototype.reload = function reload(languages, namespaces) {
    var _this6 = this;

    if (!this.backend) {
      this.logger.warn('No backend was added via i18next.use. Will not load resources.');
    }
    var options = _extends({}, this.backend.options, this.options.backend);

    if (typeof languages === 'string') languages = this.languageUtils.toResolveHierarchy(languages);
    if (typeof namespaces === 'string') namespaces = [namespaces];

    // load with multi-load
    if (options.allowMultiLoading && this.backend.readMulti) {
      this.read(languages, namespaces, 'readMulti', null, null, function (err, data) {
        if (err) _this6.logger.warn('reloading namespaces ' + namespaces.join(', ') + ' for languages ' + languages.join(', ') + ' via multiloading failed', err);
        if (!err && data) _this6.logger.log('successfully reloaded namespaces ' + namespaces.join(', ') + ' for languages ' + languages.join(', ') + ' via multiloading', data);

        languages.forEach(function (l) {
          namespaces.forEach(function (n) {
            var bundle = __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* getPath */](data, [l, n]);
            if (bundle) {
              _this6.loaded(l + '|' + n, err, bundle);
            } else {
              var error = 'reloading namespace ' + n + ' for language ' + l + ' via multiloading failed';
              _this6.loaded(l + '|' + n, error);
              _this6.logger.error(error);
            }
          });
        });
      });
    } else {
      languages.forEach(function (l) {
        namespaces.forEach(function (n) {
          _this6.loadOne(l + '|' + n, 're');
        });
      });
    }
  };

  Connector.prototype.loadOne = function loadOne(name) {
    var _this7 = this;

    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var _name$split5 = name.split('|'),
        _name$split6 = _slicedToArray(_name$split5, 2),
        lng = _name$split6[0],
        ns = _name$split6[1];

    this.read(lng, ns, 'read', null, null, function (err, data) {
      if (err) _this7.logger.warn(prefix + 'loading namespace ' + ns + ' for language ' + lng + ' failed', err);
      if (!err && data) _this7.logger.log(prefix + 'loaded namespace ' + ns + ' for language ' + lng, data);

      _this7.loaded(name, err, data);
    });
  };

  Connector.prototype.saveMissing = function saveMissing(languages, namespace, key, fallbackValue) {
    if (this.backend && this.backend.create) this.backend.create(languages, namespace, key, fallbackValue);

    // write to store to avoid resending
    if (!languages || !languages[0]) return;
    this.store.addResource(languages[0], namespace, key, fallbackValue);
  };

  return Connector;
}(__WEBPACK_IMPORTED_MODULE_2__EventEmitter__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Connector);

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logger__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EventEmitter__ = __webpack_require__(7);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }




var Connector = function (_EventEmitter) {
  _inherits(Connector, _EventEmitter);

  function Connector(cache, store, services) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, Connector);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    _this.cache = cache;
    _this.store = store;
    _this.services = services;
    _this.options = options;
    _this.logger = __WEBPACK_IMPORTED_MODULE_0__logger__["a" /* default */].create('cacheConnector');

    if (_this.cache && _this.cache.init) _this.cache.init(services, options.cache, options);
    return _this;
  }

  /* eslint consistent-return: 0 */


  Connector.prototype.load = function load(languages, namespaces, callback) {
    var _this2 = this;

    if (!this.cache) return callback && callback();
    var options = _extends({}, this.cache.options, this.options.cache);

    var loadLngs = typeof languages === 'string' ? this.services.languageUtils.toResolveHierarchy(languages) : languages;

    if (options.enabled) {
      this.cache.load(loadLngs, function (err, data) {
        if (err) _this2.logger.error('loading languages ' + loadLngs.join(', ') + ' from cache failed', err);
        if (data) {
          /* eslint no-restricted-syntax: 0 */
          for (var l in data) {
            if (Object.prototype.hasOwnProperty.call(data, l)) {
              for (var n in data[l]) {
                if (Object.prototype.hasOwnProperty.call(data[l], n)) {
                  if (n !== 'i18nStamp') {
                    var bundle = data[l][n];
                    if (bundle) _this2.store.addResourceBundle(l, n, bundle);
                  }
                }
              }
            }
          }
        }
        if (callback) callback();
      });
    } else if (callback) {
      callback();
    }
  };

  Connector.prototype.save = function save() {
    if (this.cache && this.options.cache && this.options.cache.enabled) this.cache.save(this.store.data);
  };

  return Connector;
}(__WEBPACK_IMPORTED_MODULE_1__EventEmitter__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Connector);

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return get; });
/* harmony export (immutable) */ __webpack_exports__["b"] = transformOptions;

function get() {
  return {
    debug: false,
    initImmediate: true,

    ns: ['translation'],
    defaultNS: ['translation'],
    fallbackLng: ['dev'],
    fallbackNS: false, // string or array of namespaces

    whitelist: false, // array with whitelisted languages
    nonExplicitWhitelist: false,
    load: 'all', // | currentOnly | languageOnly
    preload: false, // array with preload languages

    simplifyPluralSuffix: true,
    keySeparator: '.',
    nsSeparator: ':',
    pluralSeparator: '_',
    contextSeparator: '_',

    saveMissing: false, // enable to send missing values
    saveMissingTo: 'fallback', // 'current' || 'all'
    missingKeyHandler: false, // function(lng, ns, key, fallbackValue) -> override if prefer on handling

    postProcess: false, // string or array of postProcessor names
    returnNull: true, // allows null value as valid translation
    returnEmptyString: true, // allows empty string value as valid translation
    returnObjects: false,
    joinArrays: false, // or string to join array
    returnedObjectHandler: function returnedObjectHandler() {}, // function(key, value, options) triggered if key returns object but returnObjects is set to false
    parseMissingKeyHandler: false, // function(key) parsed a key that was not found in t() before returning
    appendNamespaceToMissingKey: false,
    appendNamespaceToCIMode: false,
    overloadTranslationOptionHandler: function handle(args) {
      return { defaultValue: args[1] };
    },

    interpolation: {
      escapeValue: true,
      format: function format(value, _format, lng) {
        return value;
      },
      prefix: '{{',
      suffix: '}}',
      formatSeparator: ',',
      // prefixEscaped: '{{',
      // suffixEscaped: '}}',
      // unescapeSuffix: '',
      unescapePrefix: '-',

      nestingPrefix: '$t(',
      nestingSuffix: ')',
      // nestingPrefixEscaped: '$t(',
      // nestingSuffixEscaped: ')',
      // defaultVariables: undefined // object that can have values to interpolate on - extends passed in interpolation data
      maxReplaces: 1000 // max replaces to prevent endless loop
    }
  };
}

/* eslint no-param-reassign: 0 */
function transformOptions(options) {
  // create namespace object if namespace is passed in as string
  if (typeof options.ns === 'string') options.ns = [options.ns];
  if (typeof options.fallbackLng === 'string') options.fallbackLng = [options.fallbackLng];
  if (typeof options.fallbackNS === 'string') options.fallbackNS = [options.fallbackNS];

  // extend whitelist with cimode
  if (options.whitelist && options.whitelist.indexOf('cimode') < 0) options.whitelist.push('cimode');

  return options;
}

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = { "app": { "name": "iPhone Sale Notifier" }, "phoneStatusOverview": { "edit": "EDIT", "about": "ABOUT", "statusLabel": "Enable/Disable", "promptChoose": "You do not have any iPhone under monitor. Click EDIT button above and choose the iPhone models you want to keep track with.", "promptDisclaimer": "Please be aware that the information provided by the extension may be inaccurate and incorrect. IN NO EVENT SHALL THE AUTHORS AND THE COPYRIGHT OWNERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY. For details, please visit the disclaimer section in the ABOUT page." }, "monitorListSetting": { "title": "Select iPhone to monitor", "save": "SAVE" }, "about": { "title": "About", "language": { "options": { "en": "English", "zh_tw": "繁體中文", "zh_hk": "粵語" } }, "introduction": { "title": "ABOUT THE EXTENSION", "content": "iPhone Sale Notifier is a Chrome extension to help you keep track of iPhone stock status and notify you by browser notification when it is available." }, "disclaimer": { "title": "DISCLAIMER", "content": "Please be aware that you may find the information provided by the extension inaccurate and incorrect.", "mit": "THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE." }, "attribution": { "title": "ATTRIBUTION", "flaticon": "Icon made by ${SMASHICONS} from ${FLATICON}" } }, "status": { "enabled": "Enabled", "disabled": "Disabled", "error": "Error" }, "phoneStatus": { "unavailable": "Sold Out", "inStock": "In Stock", "pending": "Pending" }, "iphone": { "model": { "iphone8": "iPhone 8", "iphonex": "iPhone X", "iphonex_ir": "iPhone X" }, "remark": { "ir": "via iReseve" }, "size": { "47": "4.7\"", "55": "5.5\"", "58": "5.8\"" }, "color": { "silver": "Silver", "space-gray": "Space Gray", "gold": "Gold" }, "capacity": { "64": "64 GB", "256": "256 GB" } }, "method": { "store": { "notification": { "title": "Your iPhone is available now!", "message": "Your wished ${PHONE_NAME} is now available on Apple Online Store! Click here to go to the Apple Online Store" } }, "irjson": { "notification": { "title": "Your iPhone is available now!", "message": "Your wished ${PHONE_NAME} is now available! Click here to go to the iReserve website" } } }, "error": { "notification": { "title": "iPhone In Stock Notifier Crash Report", "message:": "We have experienced an internal error. Please click here to restart the extension. If the problem persisits, please contact the extension developer." }, "syncFailedMessage": "Save failed!" } };

/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = { "app": { "name": "iPhone 開售提示" }, "phoneStatusOverview": { "edit": "修改", "about": "關於", "statusLabel": "啟用/停用", "promptChoose": "你尚未選擇任何 iPhone，請點擊上方 修改 按鈕添加你想接收提示的 iPhone 型號", "promptDisclaimer": "請注意，本插件所提供的資訊有可能並非實時及出現不正確的情況。在任何情況下，插件開發者及其版權持有者均不會為任何插件造成的影響負責。請務必細閱 關於 頁面內的免責條款。" }, "monitorListSetting": { "title": "選擇想接收通知的 iPhone 型號", "save": "儲存", "syncFailedMessage": "儲存失敗!" }, "about": { "title": "關於", "language": { "options": { "en": "English", "zh_tw": "繁體中文", "zh_hk": "粵語" } }, "introduction": { "title": "關於本插件", "content": "iPhone 開售提示是一個監察 iPhone 開售情況的 Chrome 插件。當你選擇的 iPhone 型號開售時，插件會以瀏覽器提示通知你." }, "disclaimer": { "title": "免責聲明 (只提供英文版本)", "content": "Please be aware that you may find the information provided by the extension inaccurate and incorrect.", "mit": "THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE." }, "attribution": { "title": "嗚謝", "flaticon": "圖示由 ${SMASHICONS} 於 ${FLATICON} 平台上發佈" } }, "status": { "enabled": "已啟用", "disabled": "已停用", "error": "錯誤" }, "phoneStatus": { "unavailable": "未開售", "inStock": "開售中", "pending": "處理中" }, "iphone": { "model": { "iphone8": "iPhone 8", "iphonex": "iPhone X", "iphonex_ir": "iPhone X" }, "remark": { "ir": "經 iReserve 預約" }, "size": { "47": "4.7吋", "55": "5.5吋", "58": "5.8吋" }, "color": { "silver": "銀色", "space-gray": "太空灰", "gold": "金色" }, "capacity": { "64": "64 GB", "256": "256 GB" } }, "method": { "store": { "notification": { "title": "你選擇的 iPhone 現在開售中!", "message": "你想要的 ${PHONE_NAME} 已經於 Apple Online Store 上開售! 請點擊這裡前往 Apple Online Store" } }, "irjson": { "notification": { "title": "你選擇的 iPhone 現在開售中!", "message": "你想要的 ${PHONE_NAME} 現在已經接受 iReserve 預約! 請點擊這裡前往 iReserve 網站" } } }, "error": { "notification": { "title": "iPhone 開售提示插件發生錯誤", "message:": "我們偵測到iPhone 開售提示插件發生內部錯誤。 請嘗試點擊插件圖示重啟插件。 如問題持續, 請與發開者聯絡。" } } };

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var PHONESTATUS_SET = exports.PHONESTATUS_SET = 'PHONESTATUS_SET';
var SYNCSTATUS_NOOP = exports.SYNCSTATUS_NOOP = 'NOOP';
var SYNCSTATUS_LOADING = exports.SYNCSTATUS_LOADING = 'LOADING';
var SYNCSTATUS_SYNCED = exports.SYNCSTATUS_SYNCED = 'SYNCED';
var SYNCSTATUS_FAILED = exports.SYNCSTATUS_FAILED = 'FAILED';
var MONITORLIST_SET = exports.MONITORLIST_SET = 'MONITORLIST_SET';
var MONITORLIST_SYNC_RESET = exports.MONITORLIST_SYNC_RESET = 'MONITORLIST_SYNC_RESET';
var MONITORLIST_SYNC_REQUESTED = exports.MONITORLIST_SYNC_REQUESTED = 'MONITORLIST_SYNC_REQUESTED';
var MONITORLIST_SYNC_SUCCEEDED = exports.MONITORLIST_SYNC_SUCCEEDED = 'MONITORLIST_SYNC_SUCCEEDED';
var MONITORLIST_SYNC_FAILED = exports.MONITORLIST_SYNC_FAILED = 'MONITORLIST_SYNC_FAILED';
var STATUS_SET = exports.STATUS_SET = 'STATUS_SET';
var STATUS_SYNC_REQUESTED = exports.STATUS_SYNC_REQUESTED = 'STATUS_SYNC_REQUESTED';
var STATUS_SYNC_SUCCEEDED = exports.STATUS_SYNC_SUCCEEDED = 'STATUS_SYNC_SUCCEEDED';
var STATUS_SYNC_FAILED = exports.STATUS_SYNC_FAILED = 'STATUS_SYNC_FAILED';
var LANGUAGE_SET = exports.LANGUAGE_SET = 'LANGUAGE_SET';
var LANGUAGE_SYNC_REQUESTED = exports.LANGUAGE_SYNC_REQUESTED = ' LANGUAGE_SYNC_REQUESTED';
var LANGUAGE_SYNC_SUCCEEDED = exports.LANGUAGE_SYNC_SUCCEEDED = ' LANGUAGE_SYNC_SUCCEEDED';
var LANGUAGE_SYNC_FAILED = exports.LANGUAGE_SYNC_FAILED = 'LANGUAGE_SYNC_FAILED';

/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = [{ "_id": "iphonex_ir_silver_64", "model": "iphonex_ir", "remark": "ir", "size": "58", "color": "silver", "capacity": "64", "methods": [{ "worker": "tab", "type": "irjson", "region": "hk", "model": "MQA62ZP/A", "url": "https://reserve-prime.apple.com/HK/en_HK/reserve/iPhoneX/availability.json", "irurl": "https://reserve-prime.apple.com/HK/zh_HK/reserve/iPhoneX/availability?channel=1" }] }, { "_id": "iphonex_ir_silver_256", "model": "iphonex_ir", "remark": "ir", "size": "58", "color": "silver", "capacity": "256", "methods": [{ "worker": "tab", "type": "irjson", "region": "hk", "model": "MQA92ZP/A", "url": "https://reserve-prime.apple.com/HK/en_HK/reserve/iPhoneX/availability.json", "irurl": "https://reserve-prime.apple.com/HK/zh_HK/reserve/iPhoneX/availability?channel=1" }] }, { "_id": "iphonex_ir_space-gray_64", "model": "iphonex_ir", "remark": "ir", "size": "58", "color": "space-gray", "capacity": "64", "methods": [{ "worker": "tab", "type": "irjson", "region": "hk", "model": "MQA52ZP/A", "url": "https://reserve-prime.apple.com/HK/en_HK/reserve/iPhoneX/availability.json", "irurl": "https://reserve-prime.apple.com/HK/zh_HK/reserve/iPhoneX/availability?channel=1" }] }, { "_id": "iphonex_ir_space-gray_256", "model": "iphonex_ir", "remark": "ir", "size": "58", "color": "space-gray", "capacity": "256", "methods": [{ "worker": "tab", "type": "irjson", "region": "hk", "model": "MQA82ZP/A", "url": "https://reserve-prime.apple.com/HK/en_HK/reserve/iPhoneX/availability.json", "irurl": "https://reserve-prime.apple.com/HK/zh_HK/reserve/iPhoneX/availability?channel=1" }] }, { "_id": "iphonex_silver_64", "model": "iphonex", "size": "58", "color": "silver", "capacity": "64", "methods": [{ "worker": "tab", "type": "store", "url": "iphone-x/5.8-inch-display-64gb-silver#00,10,20" }] }, { "_id": "iphonex_silver_256", "model": "iphonex", "size": "58", "color": "silver", "capacity": "256", "methods": [{ "worker": "tab", "type": "store", "url": "iphone-x/5.8-inch-display-256gb-silver#00,10,21" }] }, { "_id": "iphonex_space-gray_64", "model": "iphonex", "size": "58", "color": "space-gray", "capacity": "64", "methods": [{ "worker": "tab", "type": "store", "url": "iphone-x/5.8-inch-display-64gb-space-gray#01,10,20" }] }, { "_id": "iphonex_space-gray_256", "model": "iphonex", "size": "58", "color": "space-gray", "capacity": "256", "methods": [{ "worker": "tab", "type": "store", "url": "iphone-x/5.8-inch-display-256gb-space-gray#01,10,21" }] }, { "_id": "iphone8_47_silver_64", "model": "iphone8", "size": "47", "color": "silver", "capacity": "64", "methods": [{ "worker": "tab", "type": "store", "url": "iphone-8/4.7-inch-display-64gb-silver#00,10,20" }] }, { "_id": "iphone8_47_silver_256", "model": "iphone8", "size": "47", "color": "silver", "capacity": "256", "methods": [{ "worker": "tab", "type": "store", "url": "iphone-8/4.7-inch-display-256gb-silver#00,10,21" }] }, { "_id": "iphone8_47_gold_64", "model": "iphone8", "size": "47", "color": "gold", "capacity": "64", "methods": [{ "worker": "tab", "type": "store", "url": "iphone-8/4.7-inch-display-64gb-gold#00,11,20" }] }, { "_id": "iphone8_47_gold_256", "model": "iphone8", "size": "47", "color": "gold", "capacity": "256", "methods": [{ "worker": "tab", "type": "store", "url": "iphone-8/4.7-inch-display-256gb-gold#00,11,21" }] }, { "_id": "iphone8_47_space-gray_64", "model": "iphone8", "size": "47", "color": "space-gray", "capacity": "64", "methods": [{ "worker": "tab", "type": "store", "url": "iphone-8/4.7-inch-display-64gb-space-gray#00,12,20" }] }, { "_id": "iphone8_47_space-gray_256", "model": "iphone8", "size": "47", "color": "space-gray", "capacity": "256", "methods": [{ "worker": "tab", "type": "store", "url": "iphone-8/4.7-inch-display-256gb-space-gray#00,12,21" }] }, { "_id": "iphone8_55_silver_64", "model": "iphone8", "size": "55", "color": "silver", "capacity": "64", "methods": [{ "worker": "tab", "type": "store", "url": "iphone-8/5.5-inch-display-64gb-silver#01,10,20" }] }, { "_id": "iphone8_55_silver_256", "model": "iphone8", "size": "55", "color": "silver", "capacity": "256", "methods": [{ "worker": "tab", "type": "store", "url": "iphone-8/5.5-inch-display-256gb-silver#01,10,21" }] }, { "_id": "iphone8_55_gold_64", "model": "iphone8", "size": "55", "color": "gold", "capacity": "64", "methods": [{ "worker": "tab", "type": "store", "url": "iphone-8/5.5-inch-display-64gb-gold#01,11,20" }] }, { "_id": "iphone8_55_gold_256", "model": "iphone8", "size": "55", "color": "gold", "capacity": "256", "methods": [{ "worker": "tab", "type": "store", "url": "iphone-8/5.5-inch-display-256gb-gold#01,11,21" }] }, { "_id": "iphone8_55_space-gray_64", "model": "iphone8", "size": "55", "color": "space-gray", "capacity": "64", "methods": [{ "worker": "tab", "type": "store", "url": "iphone-8/5.5-inch-display-64gb-space-gray#01,12,20" }] }, { "_id": "iphone8_55_space-gray_256", "model": "iphone8", "size": "55", "color": "space-gray", "capacity": "256", "methods": [{ "worker": "tab", "type": "store", "url": "iphone-8/5.5-inch-display-256gb-space-gray#01,12,21" }] }];

/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _notifications = __webpack_require__(284);

var _notifications2 = _interopRequireDefault(_notifications);

var _storage = __webpack_require__(285);

var _storage2 = _interopRequireDefault(_storage);

var _tabs = __webpack_require__(287);

var _tabs2 = _interopRequireDefault(_tabs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  notifications: _notifications2.default,
  storage: _storage2.default,
  tabs: _tabs2.default
};
module.exports = exports['default'];

/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this.observers = {};
  }

  EventEmitter.prototype.on = function on(events, listener) {
    var _this = this;

    events.split(' ').forEach(function (event) {
      _this.observers[event] = _this.observers[event] || [];
      _this.observers[event].push(listener);
    });
  };

  EventEmitter.prototype.off = function off(event, listener) {
    var _this2 = this;

    if (!this.observers[event]) {
      return;
    }

    this.observers[event].forEach(function () {
      if (!listener) {
        delete _this2.observers[event];
      } else {
        var index = _this2.observers[event].indexOf(listener);
        if (index > -1) {
          _this2.observers[event].splice(index, 1);
        }
      }
    });
  };

  EventEmitter.prototype.emit = function emit(event) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (this.observers[event]) {
      var cloned = [].concat(this.observers[event]);
      cloned.forEach(function (observer) {
        observer.apply(undefined, args);
      });
    }

    if (this.observers['*']) {
      var _cloned = [].concat(this.observers['*']);
      _cloned.forEach(function (observer) {
        var _ref;

        observer.apply(observer, (_ref = [event]).concat.apply(_ref, args));
      });
    }
  };

  return EventEmitter;
}();

/* harmony default export */ __webpack_exports__["a"] = (EventEmitter);

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  STATUS: {
    ENABLED: 0,
    DISABLED: 1,
    TABCLOSED: 2
  },

  PHONESTATUS: {
    UNAVAILABLE: 0,
    INSTOCK: 1,
    PENDING: 2
  },

  LANGUAGE: {
    EN: 'en',
    ZH_TW: 'zh_tw',
    ZH_HK: 'zh_hk'
  },

  DEFAULT_CONFIG: {
    'storeRegion': 'hk'
  },
  STORE_REGION_LIST: ['hk'],

  ERR_APPENV_KEYCHAIN_INVALID: 'Invalid AppEnv key chain',
  ERR_LOCALSTORAGE_GETFAIL: 'Unable to get item from local storage',
  ERR_LOCALSTORAGE_SETFAIL: 'Unable to set items to local storage',
  ERR_LOCALSTORAGE_REPAIRFAIL: 'Unable to repair local storage',
  ERR_WORKERTAB_NOTFOUND: 'WORKERTAB_NOTFOUND'
};
module.exports = exports['default'];

/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["e"] = makeString;
/* harmony export (immutable) */ __webpack_exports__["a"] = copy;
/* harmony export (immutable) */ __webpack_exports__["h"] = setPath;
/* harmony export (immutable) */ __webpack_exports__["f"] = pushPath;
/* harmony export (immutable) */ __webpack_exports__["d"] = getPath;
/* harmony export (immutable) */ __webpack_exports__["b"] = deepExtend;
/* harmony export (immutable) */ __webpack_exports__["g"] = regexEscape;
/* harmony export (immutable) */ __webpack_exports__["c"] = escape;
function makeString(object) {
  if (object == null) return '';
  /* eslint prefer-template: 0 */
  return '' + object;
}

function copy(a, s, t) {
  a.forEach(function (m) {
    if (s[m]) t[m] = s[m];
  });
}

function getLastOfPath(object, path, Empty) {
  function cleanKey(key) {
    return key && key.indexOf('###') > -1 ? key.replace(/###/g, '.') : key;
  }

  function canNotTraverseDeeper() {
    return !object || typeof object === 'string';
  }

  var stack = typeof path !== 'string' ? [].concat(path) : path.split('.');
  while (stack.length > 1) {
    if (canNotTraverseDeeper()) return {};

    var key = cleanKey(stack.shift());
    if (!object[key] && Empty) object[key] = new Empty();
    object = object[key];
  }

  if (canNotTraverseDeeper()) return {};
  return {
    obj: object,
    k: cleanKey(stack.shift())
  };
}

function setPath(object, path, newValue) {
  var _getLastOfPath = getLastOfPath(object, path, Object),
      obj = _getLastOfPath.obj,
      k = _getLastOfPath.k;

  obj[k] = newValue;
}

function pushPath(object, path, newValue, concat) {
  var _getLastOfPath2 = getLastOfPath(object, path, Object),
      obj = _getLastOfPath2.obj,
      k = _getLastOfPath2.k;

  obj[k] = obj[k] || [];
  if (concat) obj[k] = obj[k].concat(newValue);
  if (!concat) obj[k].push(newValue);
}

function getPath(object, path) {
  var _getLastOfPath3 = getLastOfPath(object, path),
      obj = _getLastOfPath3.obj,
      k = _getLastOfPath3.k;

  if (!obj) return undefined;
  return obj[k];
}

function deepExtend(target, source, overwrite) {
  /* eslint no-restricted-syntax: 0 */
  for (var prop in source) {
    if (prop in target) {
      // If we reached a leaf string in target or source then replace with source or skip depending on the 'overwrite' switch
      if (typeof target[prop] === 'string' || target[prop] instanceof String || typeof source[prop] === 'string' || source[prop] instanceof String) {
        if (overwrite) target[prop] = source[prop];
      } else {
        deepExtend(target[prop], source[prop], overwrite);
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}

function regexEscape(str) {
  /* eslint no-useless-escape: 0 */
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

/* eslint-disable */
var _entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': '&quot;',
  "'": '&#39;',
  "/": '&#x2F;'
};
/* eslint-enable */

function escape(data) {
  if (typeof data === 'string') {
    return data.replace(/[&<>"'\/]/g, function (s) {
      return _entityMap[s];
    });
  }

  return data;
}

/***/ })

/******/ });
//# sourceMappingURL=background.bundle.js.map