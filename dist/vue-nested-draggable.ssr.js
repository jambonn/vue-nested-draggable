'use strict';Object.defineProperty(exports,'__esModule',{value:true});var draggableHelper=require('draggable-helper');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var draggableHelper__default=/*#__PURE__*/_interopDefaultLegacy(draggableHelper);function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}function isPropTrue(v) {
  return v || v === '';
} //====== Helper-js ====//

/**
 * Remove item from array. return removed count
 * @param arr
 * @param v
 * @returns {number}
 */

function arrayRemove(arr, v) {
  var index;
  var count = 0;

  while ((index = arr.indexOf(v)) > -1) {
    arr.splice(index, 1);
    count++;
  }

  return count;
}
/**
 * Rand item in array
 * @param arr
 * @returns {*}
 */

function randChoice(arr) {
  return arr[randInt(0, arr.length - 1)];
}
/**
 * Rand int in range, including min and max
 * @param min
 * @param max
 * @returns {number}
 */


function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
/**
 * Generate random string
 * @returns {string}
 */


function randString() {
  var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
  var seeds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var r = '';

  for (var i = 0; i < len; i++) {
    r += randChoice(seeds);
  }

  return r;
}
/**
 * http://www.51xuediannao.com/javascript/getBoundingClientRect.html
 * @param el
 * @returns {{top: number, left: number, bottom: number, width: (number), x: number, y: number, right: number, height: (number)}}
 */

function getBoundingClientRect(el) {
  var xy = el.getBoundingClientRect();
  var top = xy.top - document.documentElement.clientTop,
      bottom = xy.bottom,
      left = xy.left - document.documentElement.clientLeft,
      right = xy.right,
      width = xy.width || right - left,
      height = xy.height || bottom - top;
  return {
    top: top,
    right: right,
    bottom: bottom,
    left: left,
    width: width,
    height: height,
    x: left,
    y: top
  };
}
/**
 * refer: https://stackoverflow.com/questions/871399/cross-browser-method-for-detecting-the-scrolltop-of-the-browser-window
 * @returns {{top: number, left: number}}
 */


function getScroll() {
  if (typeof pageYOffset != 'undefined') {
    //most browsers except IE before #9
    return {
      top: pageYOffset,
      left: pageXOffset
    };
  } else {
    var B = document.body; //IE 'quirks'

    var D = document.documentElement; //IE with doctype

    D = D.clientHeight ? D : B;
    return {
      top: D.scrollTop,
      left: D.scrollLeft
    };
  }
}
/**
 * refer: https://gist.github.com/aderaaij/89547e34617b95ac29d1
 * @param el
 * @returns {{x: number, y: number}}
 */


function getOffset(el) {
  var rect = getBoundingClientRect(el);
  var scroll = getScroll();
  return {
    x: rect.left + scroll.left,
    y: rect.top + scroll.top
  };
}
function binarySearch(arr, callback) {
  var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  opt = Object.assign({
    start: 0,
    end: arr.length - 1,
    maxTimes: 1000
  }, opt);
  var _opt = opt,
      start = _opt.start,
      end = _opt.end;
  var _opt2 = opt,
      returnNearestIfNoHit = _opt2.returnNearestIfNoHit,
      maxTimes = _opt2.maxTimes;
  var midNum;
  var mid;

  if (start == null) {
    start = 0;
    end = arr.length - 1;
  }

  var i = 0;
  var r;

  while (start >= 0 && start <= end) {
    if (i >= maxTimes) {
      throw Error('binarySearch: loop times is over '.concat(maxTimes, ', you can increase the limit.'));
    }

    midNum = Math.floor((end - start) / 2 + start);
    mid = arr[midNum];
    r = callback(mid, i);

    if (r > 0) {
      end = midNum - 1;
    } else if (r < 0) {
      start = midNum + 1;
    } else {
      return {
        index: midNum,
        value: mid,
        count: i + 1,
        hit: true
      };
    }

    i++;
  }

  return returnNearestIfNoHit ? {
    index: midNum,
    value: mid,
    count: i + 1,
    hit: false,
    greater: r > 0
  } : null;
}
/**
 * source: http://youmightnotneedjquery.com/
 * @param el
 * @param className
 * @returns {boolean}
 */

function hasClass(el, className) {
  if (el.classList) {
    return el.classList.contains(className);
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }
} //===== Tree helper =====//

function _changeParent(item, parent) {
  var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
  var parentKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'parent'; // remove item from original list

  if (item[parentKey]) {
    arrayRemove(item[parentKey][childrenKey], item);
  }

  item[parentKey] = parent;
}

function insertBefore(item, target) {
  var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
  var parentKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'parent';

  if (item === target) {
    return;
  }

  var siblings = target[parentKey][childrenKey];
  var index = siblings.indexOf(target);

  if (siblings[index - 1] !== item) {
    if (item[parentKey] === target[parentKey]) {
      arrayRemove(siblings, item);
      index = siblings.indexOf(target);
    } else {
      _changeParent(item, target[parentKey]);
    }

    siblings.splice(index, 0, item);
  }
}
function insertAfter(item, target) {
  var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
  var parentKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'parent';

  if (item === target) {
    return;
  }

  var targetParent = target[parentKey];
  var siblings = targetParent[childrenKey];
  var index = siblings.indexOf(target);

  if (siblings[index + 1] !== item) {
    if (item[parentKey] === target[parentKey]) {
      arrayRemove(siblings, item);
      index = siblings.indexOf(target);
    } else {
      _changeParent(item, target[parentKey]);
    }

    siblings.splice(index + 1, 0, item);
  }
}
function prependTo(item, target) {
  var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';

  if (item === target) {
    throw "can't prepend to self";
  }

  var targetChildren = target[childrenKey];

  if (targetChildren[0] !== item) {
    _changeParent(item, target);

    targetChildren.splice(0, 0, item);
  }
}
function appendTo(item, target) {
  var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';

  if (item === target) {
    throw "can't append to self";
  }

  var targetChildren = target[childrenKey];
  var targetChildrenLast = targetChildren[targetChildren.length - 1];

  if (targetChildrenLast !== item) {
    _changeParent(item, target);

    targetChildren.push(item);
  }
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError('Invalid attempt to spread non-iterable instance');
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === '[object Arguments]') return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    var arr2;

    for (var i = 0, _arr = new Array(arr.length); i < arr.length; i++) {
      _arr[i] = arr[i];
    }

    return arr2;
  }
}

function _typeof$1(obj) {
  if (typeof Symbol === 'function' && _typeof(Symbol.iterator) === 'symbol') {
    _typeof$1 = function _typeof$1(obj) {
      return _typeof(obj);
    };
  } else {
    _typeof$1 = function _typeof$1(obj) {
      return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : _typeof(obj);
    };
  }

  return _typeof$1(obj);
}

function isArray(v) {
  return Object.prototype.toString.call(v) === '[object Array]';
}

function breadthFirstSearch(obj, handler) {
  var reverse = arguments.length > 3 ? arguments[3] : undefined;
  var rootChildren = isArray(obj) ? obj : [obj]; //

  var stack = rootChildren.map(function (v, i) {
    return {
      item: v,
      index: i
    };
  });

  if (reverse) {
    stack.reverse();
  }

  var _loop = function _loop() {
    var _stack$shift = stack.shift(),
        item = _stack$shift.item,
        index = _stack$shift.index,
        parent = _stack$shift.parent;

    var r = handler(item, index, parent);

    if (r === false) {
      // stop
      return {
        v: void 0
      };
    } else if (r === 'skip children') {
      return 'continue';
    } else if (r === 'skip siblings') {
      stack = stack.filter(function (v) {
        return v.parent !== parent;
      });
    }

    if (item.children) {
      var _stack;

      var children = item.children;

      if (reverse) {
        children = children.slice();
        children.reverse();
      }

      var pushStack = children.map(function (v, i) {
        return {
          item: v,
          index: i,
          parent: item
        };
      });

      (_stack = stack).push.apply(_stack, _toConsumableArray(pushStack));
    }
  };

  while (stack.length) {
    var _ret = _loop();

    switch (_ret) {
      case 'continue':
        continue;

      default:
        if (_typeof$1(_ret) === 'object') return _ret.v;
    }
  }
}
function depthFirstSearch(obj, handler) {
  var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
  var reverse = arguments.length > 3 ? arguments[3] : undefined;
  var rootChildren = isArray(obj) ? obj : [obj]; //

  var StopException = function StopException() {};

  var func = function func(children, parent) {
    if (reverse) {
      children = children.slice();
      children.reverse();
    }

    var len = children.length;

    for (var i = 0; i < len; i++) {
      var item = children[i];
      var r = handler(item, i, parent);

      if (r === false) {
        // stop
        throw new StopException();
      } else if (r === 'skip children') {
        continue;
      } else if (r === 'skip siblings') {
        break;
      }

      if (item[childrenKey] != null) {
        func(item[childrenKey], item);
      }
    }
  };

  try {
    func(rootChildren);
  } catch (e) {
    if (e instanceof StopException) ; else {
      throw e;
    }
  }
}//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: 'TreeNode',
  props: {
    data: {},
    store: {},
    allowAddItem: {
      type: Boolean,
      default: false
    },
    addItemText: {
      type: String,
      default: 'Add item'
    },
    level: {
      default: 0
    } // readonly

  },
  data: function data() {
    return {
      vm: this
    };
  },
  computed: {
    childrenLevel: function childrenLevel() {
      return this.level + 1;
    },
    isRoot: function isRoot() {
      return this.data && this.data.isRoot;
    },
    childrenVisible: function childrenVisible() {
      var data = this.data;
      return this.isRoot || data && data.children && data.children.length && data.open;
    },
    innerBackStyle: function innerBackStyle() {
      var r = {
        marginBottom: this.store.space + 'px'
      };

      if (!this.isRoot && this.level > 1) {
        r.paddingLeft = (this.level - 1) * this.store.indent + 'px';
      }

      return r;
    },
    actionStyle: function actionStyle() {
      var r = {};

      if (!this.isRoot && this.level > 0) {
        r.paddingLeft = this.level * this.store.indent + 'px';
      }

      return r;
    }
  },
  watch: {
    data: {
      immediate: true,
      handler: function handler(data) {
        if (data) {
          data._vm = this;

          if (!data._treeNodePropertiesCompleted && !data.isRoot) {
            this.store.completeNode(data, this.$parent.data);
          }
        }
      }
    }
  },
  methods: {
    onClickAddItem: function onClickAddItem() {
      this.$emit('addItem', this.data);
    },
    onClickChildItem: function onClickChildItem(data) {
      this.$emit('addItem', data);
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "tree-node",
    class: [_vm.data.active ? _vm.store.activatedClass : '', _vm.data.open ? _vm.store.openedClass : '', _vm.data.class],
    style: _vm.data.style,
    attrs: {
      "id": _vm.data._id
    }
  }, [!_vm.isRoot ? _vm._t("node-inner-back", [_c('div', {
    staticClass: "tree-node-inner-back",
    class: [_vm.data.innerBackClass],
    style: [_vm.innerBackStyle, _vm.data.innerBackStyle]
  }, [_c('div', {
    staticClass: "tree-node-inner",
    class: [_vm.data.innerClass],
    style: [_vm.data.innerStyle]
  }, [_vm._t("default", null, {
    "data": _vm.data,
    "store": _vm.store,
    "vm": _vm.vm
  })], 2)])], {
    "styleObj": _vm.innerBackStyle,
    "data": _vm.data,
    "store": _vm.store,
    "vm": _vm.vm
  }) : _vm._e(), _vm._ssrNode(" "), _c('transition', {
    attrs: {
      "name": _vm.store.childrenTransitionName
    }
  }, [_vm.childrenVisible ? _c('div', {
    staticClass: "tree-node-children"
  }, [_vm._l(_vm.data.children, function (child) {
    return _c('TreeNode', {
      key: child._id,
      attrs: {
        "data": child,
        "store": _vm.store,
        "level": _vm.childrenLevel,
        "allow-add-item": _vm.allowAddItem,
        "add-item-text": _vm.addItemText
      },
      on: {
        "addItem": _vm.onClickChildItem
      },
      scopedSlots: _vm._u([{
        key: "default",
        fn: function fn(props) {
          return [_vm._t("default", null, {
            "data": props.data,
            "store": props.store,
            "vm": props.vm
          })];
        }
      }, {
        key: "node-inner-back",
        fn: function fn(props) {
          return _vm.store.customInnerBack ? [_vm._t("node-inner-back", null, {
            "styleObj": props.styleObj,
            "data": props.data,
            "store": props.store,
            "vm": props.vm
          })] : undefined;
        }
      }], null, true)
    });
  }), _vm._v(" "), _vm.allowAddItem ? _c('div', {
    staticClass: "tree-node-action",
    style: [_vm.actionStyle],
    attrs: {
      "data-level": _vm.childrenLevel
    }
  }, [_c('button', {
    staticClass: "tree-node-add",
    on: {
      "click": function click($event) {
        $event.preventDefault();
        return _vm.onClickAddItem($event);
      }
    }
  }, [_vm._v("\n          " + _vm._s(_vm.addItemText) + "\n        ")])]) : _vm._e()], 2) : _vm._e()])], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-38f4cc5f";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);var Cache = /*#__PURE__*/function () {
  function Cache() {
    _classCallCheck(this, Cache);

    _defineProperty(this, "store", {});
  }

  _createClass(Cache, [{
    key: "has",
    value: function has(name) {
      return this.store.hasOwnProperty(name);
    }
  }, {
    key: "remember",
    value: function remember(name, getter) {
      if (!this.has(name)) {
        this.store[name] = {
          value: getter()
        };
      }

      return this.store[name].value;
    }
  }, {
    key: "forget",
    value: function forget(name) {
      if (name) {
        if (this.has(name)) {
          delete this.store[name];
        }
      } else {
        this.store = {};
      }
    }
  }]);

  return Cache;
}();
function attachCache(obj, cache, toCache) {
  var _loop = function _loop(key) {
    if (toCache.hasOwnProperty(key)) {
      Object.defineProperty(obj, key, {
        get: function get() {
          var _this = this;

          return cache.remember(key, function () {
            return toCache[key].call(_this);
          });
        }
      });
    }
  };

  for (var key in toCache) {
    _loop(key);
  }
}// from https://gist.github.com/iddan/54d5d9e58311b0495a91bf06de661380

if (!document.elementsFromPoint) {
  document.elementsFromPoint = elementsFromPoint;
}

function elementsFromPoint(x, y) {
  var parents = [];
  var parent = void 0;

  do {
    if (parent !== document.elementFromPoint(x, y)) {
      parent = document.elementFromPoint(x, y);
      parents.push(parent);
      parent.style.pointerEvents = 'none';
    } else {
      parent = false;
    }
  } while (parent);

  parents.forEach(function (parent) {
    return parent.style.pointerEvents = 'all';
  });
  return parents;
}

function getTreeByPoint(x, y, trees) {
  var els = document.elementsFromPoint(x, y);
  var treeEl;
  var nodeEl;
  var betweenEls = [];

  var _iterator = _createForOfIteratorHelper(els),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _el = _step.value;

      if (!nodeEl) {
        if (hasClass(_el, 'tree-node')) {
          nodeEl = _el;
        }
      } else {
        // console.log(el);
        if (hasClass(_el, 'tree')) {
          treeEl = _el;
          break;
        }

        betweenEls.push(_el);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (treeEl) {
    // is target tree is another tree, and be covered by other element, like modal, popup
    var covered = false;

    if (!isParent(nodeEl, treeEl)) {
      // cross tree
      var _iterator2 = _createForOfIteratorHelper(betweenEls),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var el = _step2.value;

          if (!isParent(el, treeEl)) {
            covered = true;
            break;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    } //


    if (!covered) {
      return trees.find(function (v) {
        return v.$el === treeEl;
      });
    }
  }
}

function isParent(child, parent) {
  var cur = child;

  while (cur) {
    cur = cur.parentNode;

    if (cur === parent) {
      return true;
    }
  }
}var targets = {
  nothing: function nothing(info) {},
  after: function after(info) {
    insertDplhAfterTo(info.dplh, info.targetNode);
  },
  before: function before(info) {
    if (isNodeDroppable(info.targetNode.parent)) {
      insertBefore(info.dplh, info.targetNode);
    } else {
      insertDplhAfterTo(info.dplh, info.targetNode.parent);
    }
  },
  append: function append(info) {
    if (isNodeDroppable(info.targetNode)) {
      appendTo(info.dplh, info.targetNode);
      if (!info.targetNode.open) info.store.toggleOpen(info.targetNode);
    } else {
      insertDplhAfterTo(info.dplh, info.targetNode);
    }
  },
  prepend: function prepend(info) {
    if (isNodeDroppable(info.targetNode)) {
      prependTo(info.dplh, info.targetNode);
      if (!info.targetNode.open) info.store.toggleOpen(info.targetNode);
    } else {
      insertDplhAfterTo(info.dplh, info.targetNode);
    }
  },
  'after target parent': function afterTargetParent(info) {
    insertDplhAfterTo(info.dplh, info.targetNode.parent);
  },
  // append to prev sibling
  'append prev': function appendPrev(info) {
    if (isNodeDroppable(info.targetPrev)) {
      appendTo(info.dplh, info.targetPrev);
      if (!info.targetPrev.open) info.store.toggleOpen(info.targetPrev);
    } else {
      insertDplhAfterTo(info.dplh, info.targetPrev);
    }
  },
  // append to current tree
  'append current tree': function appendCurrentTree(info) {
    if (isNodeDroppable(info.currentTree.rootData)) {
      appendTo(info.dplh, info.currentTree.rootData);
    }
  }
};

function insertDplhAfterTo(dplh, targetNode) {
  if (!targetNode) {
    return false;
  } else {
    var closest = findParent(targetNode, function (node) {
      return node.parent && isNodeDroppable(node.parent);
    });

    if (closest) {
      insertAfter(dplh, closest);
    } else {
      return false;
    }
  }

  return true;
}

function isNodeDraggable(node) {
  if (!draggableIds.hasOwnProperty(node._id)) {
    var r;

    if (node.hasOwnProperty('draggable')) {
      r = node.draggable;
    } else if (node.parent) {
      r = isNodeDraggable(node.parent);
    } else {
      r = true;
    }

    draggableIds[node._id] = r;
  }

  return draggableIds[node._id];
}
function isNodeDroppable(node) {
  if (!droppableIds.hasOwnProperty(node._id)) {
    var r;

    if (node.hasOwnProperty('droppable')) {
      r = node.droppable;
    } else if (node.parent) {
      r = isNodeDroppable(node.parent);
    } else {
      r = true;
    }

    droppableIds[node._id] = r;
  }

  return droppableIds[node._id];
} // find child, excluding dragging node default

function findChild(info, children, handler, reverse) {
  var len = children.length;

  if (reverse) {
    for (var i = len - 1; i >= 0; i--) {
      var item = children[i]; // excluding dragging node

      if (item !== info.node) {
        if (handler(item, i)) {
          return item;
        }
      }
    }
  } else {
    for (var _i = 0; _i < len; _i++) {
      var _item = children[_i]; // excluding dragging node

      if (_item !== info.node) {
        if (handler(_item, _i)) {
          return _item;
        }
      }
    }
  }
} // start from node self


function findParent(node, handle) {
  var current = node;

  while (current) {
    if (handle(current)) {
      return current;
    }

    current = current.parent;
  }
}

var rules = {
  'targetNode existed': function targetNodeExisted(info) {
    return info.targetNode;
  },
  'targetNode is placeholder': function targetNodeIsPlaceholder(info) {
    return info.targetNode.isDragPlaceHolder;
  },
  'targetNode at top': function targetNodeAtTop(info) {
    return info.targetAtTop;
  },
  'targetNode at bottom': function targetNodeAtBottom(info) {
    return info.targetAtBottom;
  },
  'targetNode is the second child of root': function targetNodeIsTheSecondChildOfRoot(info) {
    return info.currentTreeRootSecondChildExcludingDragging === info.targetNode;
  },
  'currentTree existed': function currentTreeExisted(info) {
    return info.currentTree;
  },
  'currentTree empty': function currentTreeEmpty(info) {
    return !findChild(info, info.currentTree.rootData.children, function (v) {
      return v;
    });
  },
  'placeholder existed': function placeholderExisted(info) {
    return info.dplhEl;
  },
  'placeholder in currentTree': function placeholderInCurrentTree(info) {
    return info.dplhElInCurrentTree;
  },
  'placeholder at top': function placeholderAtTop(info) {
    return info.dplhAtTop;
  },
  'targetNode is open': function targetNodeIsOpen(info) {
    return info.targetNode.open;
  },
  'targetNode has children excluding placeholder': function targetNodeHasChildrenExcludingPlaceholder(info) {
    return findChild(info, info.targetNode.children, function (v) {
      return v !== info.dplh;
    });
  },
  'targetNode is 1st child': function targetNodeIs1stChild(info) {
    return findChild(info, info.targetNode.parent.children, function (v) {
      return v;
    }) === info.targetNode;
  },
  'targetNode is last child': function targetNodeIsLastChild(info) {
    return findChild(info, info.targetNode.parent.children, function (v) {
      return v;
    }, true) === info.targetNode;
  },
  'on targetNode middle': function onTargetNodeMiddle(info) {
    return info.offset.y <= info.tiMiddleY;
  },
  'at left': function atLeft(info) {
    return info.offset.x < info.tiOffset.x;
  },
  'at indent right': function atIndentRight(info) {
    return info.offset.x > info.tiOffset.x + info.currentTree.indent;
  }
}; // convert rule output to Boolean

var _loop = function _loop() {
  var key = _Object$keys[_i2];
  var old = rules[key];

  rules[key] = function () {
    return Boolean(old.apply(void 0, arguments));
  };
};

for (var _i2 = 0, _Object$keys = Object.keys(rules); _i2 < _Object$keys.length; _i2++) {
  _loop();
}

var prevTree;
var droppableIds = {};
var draggableIds = {}; // context is vm

function autoMoveDragPlaceHolder(draggableHelperInfo) {
  var trees = this.store.trees;
  var dhStore = draggableHelperInfo.store; // make info

  var info = {
    event: draggableHelperInfo.event,
    el: dhStore.el,
    vm: this,
    node: this.data,
    store: this.store,
    dplh: this.store.dplh,
    draggableHelperData: {
      opt: draggableHelperInfo.options,
      store: dhStore
    }
  }; //

  attachCache(info, new Cache(), {
    // dragging node coordinate
    nodeInnerEl: function nodeInnerEl() {
      return this.el.querySelector('.tree-node-inner');
    },
    offset: function offset() {
      return getOffset(this.nodeInnerEl);
    },
    // left top point
    offset2: function offset2() {
      return {
        x: this.offset.x + this.nodeInnerEl.offsetWidth,
        y: this.offset.y + this.nodeInnerEl.offsetHeight
      };
    },
    // right bottom point
    offsetToViewPort: function offsetToViewPort() {
      var r = this.nodeInnerEl.getBoundingClientRect();
      r.x = r.left;
      r.y = r.top;
      return r;
    },
    // tree
    currentTree: function currentTree() {
      var currentTree = getTreeByPoint(this.offsetToViewPort.x, this.offsetToViewPort.y, trees);

      if (currentTree) {
        var dragStartTree = this.store;

        if (prevTree == null) {
          prevTree = dragStartTree;
        }

        if (prevTree !== currentTree) {
          if (!isPropTrue(dragStartTree.crossTree) || !isPropTrue(currentTree.crossTree)) {
            return;
          }

          prevTree = currentTree;
        }

        if (!isPropTrue(currentTree.droppable)) {
          return;
        }

        return currentTree;
      }
    },
    currentTreeRootEl: function currentTreeRootEl() {
      return document.getElementById(this.currentTree.rootData._id);
    },
    currentTreeRootOf4: function currentTreeRootOf4() {
      return getOf4(this.currentTreeRootEl, this.currentTree.space);
    },
    // the second child of currentTree root, excluding dragging node
    currentTreeRootSecondChildExcludingDragging: function currentTreeRootSecondChildExcludingDragging() {
      var _this = this;

      return this.currentTree.rootData.children.slice(0, 3).filter(function (v) {
        return v !== _this.node;
      })[1];
    },
    // placeholder
    dplhEl: function dplhEl() {
      return document.getElementById(this.dplh._id);
    },
    dplhElInCurrentTree: function dplhElInCurrentTree() {
      return Boolean(this.currentTree.$el.querySelector("#".concat(this.dplh._id)));
    },
    dplhOf4: function dplhOf4() {
      return getOf4(this.dplhEl, this.currentTree.space);
    },
    dplhAtTop: function dplhAtTop() {
      return Math.abs(this.dplhOf4.y - this.currentTreeRootOf4.y) < 5;
    },
    targetAtTop: function targetAtTop() {
      return Math.abs(this.tiOf4.y - this.currentTreeRootOf4.y) < 5;
    },
    targetAtBottom: function targetAtBottom() {
      return Math.abs(this.tiOf4.y2 - this.currentTreeRootOf4.y2) < 5;
    },
    // most related node
    targetNode: function targetNode() {
      var currentTree = this.currentTree;

      if (!currentTree) {
        throw 'no currentTree';
      } //


      var _this$offset = this.offset,
          x = _this$offset.x,
          y = _this$offset.y;
      var currentNode = currentTree.rootData;

      while (true) {
        var children = currentNode.children;

        if (!children) {
          break;
        }

        if (this.node.parent === currentNode) {
          // dragging node is in currentNode children, remove it first
          children = children.slice();
          children.splice(children.indexOf(this.node), 1);
        }

        if (children.length === 0) {
          break;
        }

        var t = binarySearch(children, function (node) {
          var el = document.getElementById(node._id);
          var ty = getOffset(el).y;
          var ty2 = ty + el.offsetHeight + currentTree.space;

          if (ty2 < y) {
            return -1;
          } else if (ty <= y) {
            return 0;
          } else {
            return 1;
          }
        }, null, null, true);

        if (t.hit) {
          currentNode = t.value;
        } else {
          if (t.bigger) {
            currentNode = children[t.index - 1];
          } else {
            currentNode = t.value;
          }
        }

        if (!currentNode) {
          currentNode = children[0];
          break;
        }

        if (!currentNode) {
          break;
        }

        var innerEl = document.getElementById(currentNode._id).querySelector('.tree-node-inner');
        var of = getOf4(innerEl, currentTree.space);

        if (of.y <= y && y <= of.y2) {
          break;
        }
      }

      return currentNode;
    },
    targetNodeEl: function targetNodeEl() {
      return document.getElementById(this.targetNode._id);
    },
    // targetNodeInnerElOffset
    tiInnerEl: function tiInnerEl() {
      return this.targetNodeEl.querySelector('.tree-node-inner');
    },
    tiOffset: function tiOffset() {
      return getOffset(this.tiInnerEl);
    },
    tiOf4: function tiOf4() {
      return getOf4(this.tiInnerEl, this.currentTree.space);
    },
    tiMiddleY: function tiMiddleY() {
      return this.tiOffset.y + this.tiInnerEl.offsetHeight / 2;
    },
    //
    targetPrevEl: function targetPrevEl() {
      var r = this.targetNodeEl.previousSibling;

      if (hasClass(r, 'dragging')) {
        r = r.previousSibling;
      }

      return r;
    },
    targetPrev: function targetPrev() {
      var id = this.targetPrevEl.getAttribute('id');
      return this.currentTree.getNodeById(id);
    }
  }); // attachCache end
  // decision start =================================

  var executedRuleCache = {}; // exec rule

  var exec = function exec(ruleId) {
    if (!executedRuleCache.hasOwnProperty(ruleId)) {
      var r;

      try {
        r = rules[ruleId](info);
      } catch (e) {
        r = e;

        try {
          if (process.env.DEVELOPE_SELF) {
            // only visible when develop its self
            // eslint-disable-next-line
            console.warn("failed to execute rule '".concat(ruleId, "'"), e);
          }
        } catch (e2) {}
      }

      executedRuleCache[ruleId] = r;
    }

    return executedRuleCache[ruleId];
  };

  if (exec('currentTree existed') === true) {
    if (exec('targetNode is placeholder') === false) {
      if (exec('targetNode is the second child of root') === true) {
        if (exec('targetNode has children excluding placeholder') === false) {
          if (exec('on targetNode middle') === true) {
            targets['before'](info);
          } else if (exec('on targetNode middle') === false) {
            if (exec('at indent right') === true) {
              targets['append'](info);
            } else if (exec('at indent right') === false) {
              targets['after'](info);
            }
          }
        } else if (exec('targetNode has children excluding placeholder') === true) {
          targets['prepend'](info);
        }
      } else if (exec('targetNode is the second child of root') === false) {
        if (exec('currentTree empty') === false) {
          if (exec('targetNode at top') === true) {
            if (exec('placeholder in currentTree') === true) {
              if (exec('targetNode has children excluding placeholder') === false) {
                if (exec('on targetNode middle') === false) {
                  if (exec('at indent right') === false) {
                    targets['after'](info);
                  } else if (exec('at indent right') === true) {
                    targets['append'](info);
                  }
                } else if (exec('on targetNode middle') === true) {
                  targets['before'](info);
                }
              } else if (exec('targetNode has children excluding placeholder') === true) {
                if (exec('on targetNode middle') === false) {
                  targets['prepend'](info);
                } else if (exec('on targetNode middle') === true) {
                  targets['before'](info);
                }
              }
            } else if (exec('placeholder in currentTree') === false) {
              targets['before'](info);
            }
          } else if (exec('targetNode at top') === false) {
            if (exec('targetNode at bottom') === false) {
              if (exec('placeholder at top') === true) {
                targets['prepend'](info);
              } else if (exec('placeholder at top') === false) {
                if (exec('targetNode has children excluding placeholder') === true) {
                  targets['prepend'](info);
                } else if (exec('targetNode has children excluding placeholder') === false) {
                  if (exec('targetNode is 1st child') === false) {
                    if (exec('targetNode is last child') === false) {
                      if (exec('on targetNode middle') === true) {
                        if (exec('at indent right') === true) {
                          targets['append'](info);
                        } else if (exec('at indent right') === false) {
                          targets['after'](info);
                        }
                      } else if (exec('on targetNode middle') === false) {
                        if (exec('at indent right') === true) {
                          targets['append'](info);
                        } else if (exec('at indent right') === false) {
                          targets['after'](info);
                        }
                      }
                    } else if (exec('targetNode is last child') === true) {
                      if (exec('at indent right') === true) {
                        targets['append'](info);
                      } else if (exec('at indent right') === false) {
                        targets['after'](info);
                      }
                    }
                  } else if (exec('targetNode is 1st child') === true) {
                    if (exec('targetNode is last child') === true) {
                      targets['append'](info);
                    } else if (exec('targetNode is last child') === false) {
                      if (exec('on targetNode middle') === false) {
                        if (exec('at indent right') === false) {
                          targets['after'](info);
                        } else if (exec('at indent right') === true) {
                          targets['append'](info);
                        }
                      } else if (exec('on targetNode middle') === true) {
                        if (exec('at indent right') === false) {
                          targets['after'](info);
                        } else if (exec('at indent right') === true) {
                          targets['append'](info);
                        }
                      }
                    }
                  }
                }
              }
            } else if (exec('targetNode at bottom') === true) {
              if (exec('placeholder in currentTree') === true) {
                if (exec('on targetNode middle') === false) {
                  if (exec('at indent right') === true) {
                    targets['append'](info);
                  } else if (exec('at indent right') === false) {
                    targets['after'](info);
                  }
                } else if (exec('on targetNode middle') === true) {
                  targets['append'](info);
                }
              } else if (exec('placeholder in currentTree') === false) {
                targets['append'](info);
              }
            }
          }
        } else if (exec('currentTree empty') === true) {
          targets['append current tree'](info);
        }
      }
    } else if (exec('targetNode is placeholder') === true) {
      if (exec('targetNode at bottom') === false) {
        if (exec('targetNode is the second child of root') === false) {
          if (exec('targetNode is 1st child') === true) {
            if (exec('targetNode is last child') === false) {
              targets['nothing'](info);
            } else if (exec('targetNode is last child') === true) {
              if (exec('on targetNode middle') === false) {
                if (exec('at left') === true) {
                  targets['after target parent'](info);
                } else if (exec('at left') === false) {
                  targets['nothing'](info);
                }
              } else if (exec('on targetNode middle') === true) {
                if (exec('at left') === true) {
                  targets['after target parent'](info);
                } else if (exec('at left') === false) {
                  targets['nothing'](info);
                }
              }
            }
          } else if (exec('targetNode is 1st child') === false) {
            if (exec('targetNode is last child') === true) {
              if (exec('on targetNode middle') === true) {
                if (exec('at left') === true) {
                  targets['after target parent'](info);
                } else if (exec('at left') === false) {
                  if (exec('at indent right') === true) {
                    targets['append prev'](info);
                  } else if (exec('at indent right') === false) {
                    targets['nothing'](info);
                  }
                }
              } else if (exec('on targetNode middle') === false) {
                if (exec('at left') === true) {
                  targets['after target parent'](info);
                } else if (exec('at left') === false) {
                  if (exec('at indent right') === true) {
                    targets['append prev'](info);
                  } else if (exec('at indent right') === false) {
                    targets['nothing'](info);
                  }
                }
              }
            } else if (exec('targetNode is last child') === false) {
              if (exec('on targetNode middle') === true) {
                if (exec('at left') === true) {
                  targets['nothing'](info);
                } else if (exec('at left') === false) {
                  if (exec('at indent right') === true) {
                    targets['append prev'](info);
                  } else if (exec('at indent right') === false) {
                    targets['nothing'](info);
                  }
                }
              } else if (exec('on targetNode middle') === false) {
                if (exec('at left') === true) {
                  targets['nothing'](info);
                } else if (exec('at left') === false) {
                  if (exec('at indent right') === true) {
                    targets['append prev'](info);
                  } else if (exec('at indent right') === false) {
                    targets['nothing'](info);
                  }
                }
              }
            }
          }
        } else if (exec('targetNode is the second child of root') === true) {
          if (exec('on targetNode middle') === true) {
            if (exec('at indent right') === true) {
              targets['append prev'](info);
            } else if (exec('at indent right') === false) {
              targets['nothing'](info);
            }
          } else if (exec('on targetNode middle') === false) {
            if (exec('at indent right') === true) {
              targets['append prev'](info);
            } else if (exec('at indent right') === false) {
              targets['nothing'](info);
            }
          }
        }
      } else if (exec('targetNode at bottom') === true) {
        if (exec('targetNode is 1st child') === true) {
          if (exec('on targetNode middle') === false) {
            if (exec('at left') === true) {
              targets['after target parent'](info);
            } else if (exec('at left') === false) {
              targets['nothing'](info);
            }
          } else if (exec('on targetNode middle') === true) {
            if (exec('at left') === false) {
              targets['nothing'](info);
            } else if (exec('at left') === true) {
              targets['after target parent'](info);
            }
          }
        } else if (exec('targetNode is 1st child') === false) {
          if (exec('on targetNode middle') === false) {
            if (exec('at left') === true) {
              targets['after target parent'](info);
            } else if (exec('at left') === false) {
              if (exec('at indent right') === true) {
                targets['append prev'](info);
              } else if (exec('at indent right') === false) {
                targets['nothing'](info);
              }
            }
          } else if (exec('on targetNode middle') === true) {
            if (exec('at left') === true) {
              targets['after target parent'](info);
            } else if (exec('at left') === false) {
              if (exec('at indent right') === true) {
                targets['append prev'](info);
              } else if (exec('at indent right') === false) {
                targets['nothing'](info);
              }
            }
          }
        }
      }
    }
  } else if (exec('currentTree existed') === false) {
    targets['nothing'](info);
  } // decision end =================================

}

function getOf4(el, space) {
  var r = getOffset(el);
  r.x2 = r.x + el.offsetWidth;
  r.y2 = r.y + el.offsetHeight + space;
  return r;
}

autoMoveDragPlaceHolder.dragStart = function dragStart() {};

autoMoveDragPlaceHolder.dragEnd = function dragEnd() {
  prevTree = null;
  droppableIds = {};
  draggableIds = {};
};var script$1 = {
  extends: __vue_component__,
  name: 'TreeNode',
  mounted: function mounted() {
    var _this = this;

    this.store.isNodeDraggable = isNodeDraggable;
    this.store.isNodeDroppable = isNodeDroppable;

    if (this.isRoot || this.data.isDragPlaceHolder) {
      return;
    }

    var dplh = this.store.dplh;
    this.$watch('store.draggable', function (draggable) {
      if (isPropTrue(draggable)) {
        var triggerEl = _this.store.getTriggerEl ? _this.store.getTriggerEl(_this) : _this.$el.querySelector('.tree-node-inner');
        _this._draggableDestroy = draggableHelper__default['default'](triggerEl, {
          preventSelect: isPropTrue(_this.store.preventSelect),
          // trigger el
          getEl: function getEl() {
            return _this.$el;
          },
          minTranslate: 10,
          drag: function drag(e, opt, store) {
            autoMoveDragPlaceHolder.dragStart(); // this store is not tree

            var draggableHelperInfo = {
              event: e,
              options: opt,
              store: store
            };

            if (_this.store.ondragstart && _this.store.ondragstart(_this.data, draggableHelperInfo) === false) {
              return false;
            }

            if (!isNodeDraggable(_this.data)) {
              return false;
            }

            _this.store.$emit('drag', _this.data); // record start position


            var siblings = _this.data.parent.children;
            _this.startPosition = {
              siblings: siblings,
              index: siblings.indexOf(_this.data)
            };
            dplh.innerStyle.height = store.el.offsetHeight + 'px';
            insertAfter(dplh, _this.data);
            _this.data.class += ' dragging';
          },
          moving: function moving(e, opt, store) {
            if (store.movedCount === 0) {
              return;
            }

            var draggableHelperInfo = {
              event: e,
              options: opt,
              store: store
            };
            return autoMoveDragPlaceHolder.call(_this, draggableHelperInfo);
          },
          drop: function drop(e, opt, store) {
            autoMoveDragPlaceHolder.dragEnd();
            var draggableHelperInfo = {
              event: e,
              options: opt,
              store: store
            };

            if (_this.store.ondragend && _this.store.ondragend(_this.data, draggableHelperInfo) === false) {
              arrayRemove(dplh.parent.children, dplh); // can't drop, no change
            } else {
              var targetTree = dplh._vm.store;
              var crossTree = targetTree !== _this.store;
              var oldTree = crossTree ? _this.store : null;
              insertAfter(_this.data, dplh);
              arrayRemove(dplh.parent.children, dplh);
              _this.data.class = _this.data.class.replace(/(^| )dragging( |$)/g, ' ');
              targetTree.$emit('drop', _this.data, targetTree, oldTree);
              oldTree && oldTree.$emit('drop', _this.data, targetTree, oldTree); // emit change event if changed

              var siblings = _this.data.parent.children;

              if (siblings === _this.startPosition.siblings && siblings.indexOf(_this.data) === _this.startPosition.index) ; else {
                _this.store.$emit('change', _this.data, targetTree, oldTree);

                oldTree && oldTree.$emit('change', _this.data, targetTree, oldTree);
              }

              _this.startPosition = null;
            }
          }
        });
      } else {
        if (_this._draggableDestroy) {
          _this._draggableDestroy();

          _this._draggableDestroy = null;
        }
      }
    }, {
      immediate: true
    });
  }
};/* script */
var __vue_script__$1 = script$1;
/* template */

/* style */

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = "data-v-e87bd76e";
/* functional template */

var __vue_is_functional_template__$1 = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);//
var script$2 = {
  name: 'Tree',
  props: {
    data: {},
    idLength: {
      type: Number,
      default: 5
    },
    indent: {
      type: Number,
      default: 16
    },
    activatedClass: {
      default: 'active'
    },
    openedClass: {
      default: 'open'
    },
    space: {
      type: Number,
      default: 10
    },
    // space between node, unit px
    allowAddItem: {
      type: Boolean,
      default: false
    },
    addItemText: {
      type: String,
      default: 'Add item'
    },
    childrenTransitionName: {},
    // there are issues under draggable tree
    customInnerBack: {}
  },
  components: {
    TreeNode: __vue_component__
  },
  data: function data() {
    return {
      store: this,
      rootData: null
    };
  },
  watch: {
    data: {
      immediate: true,
      handler: function handler(data, old) {
        var _this = this;

        if (data === old) {
          return;
        } // make rootData always use a same object


        this.rootData = this.rootData || {
          isRoot: true,
          _id: "tree_".concat(this._uid, "_node_root"),
          children: []
        };
        breadthFirstSearch(data, function (node, k, parent) {
          _this.completeNode(node, parent);
        });
        this.rootData.children = data;
      }
    }
  },
  methods: {
    completeNode: function completeNode(node, parent) {
      var completedData = {
        open: true,
        children: [],
        active: false,
        style: {},
        class: '',
        innerStyle: {},
        innerClass: '',
        innerBackStyle: {},
        innerBackClass: {}
      };

      for (var key in completedData) {
        if (!node.hasOwnProperty(key)) {
          this.$set(node, key, completedData[key]);
        }
      }

      this.$set(node, 'parent', parent || this.rootData);

      if (!node.hasOwnProperty('_id')) {
        node._id = "tree_".concat(this._uid, "_node_").concat(randString(this.idLength));
      }

      node._treeNodePropertiesCompleted = true;
    },
    // pure node self
    pure: function pure(node, withChildren, after) {
      var _this2 = this;

      var t = Object.assign({}, node);
      delete t._id;
      delete t.parent;
      delete t.children;
      delete t.open;
      delete t.active;
      delete t.style;
      delete t.class;
      delete t.innerStyle;
      delete t.innerClass;
      delete t.innerBackStyle;
      delete t.innerBackClass;

      for (var _i = 0, _Object$keys = Object.keys(t); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];

        if (key[0] === '_') {
          delete t[key];
        }
      }

      if (withChildren && node.children) {
        t.children = node.children.slice();
        t.children.forEach(function (v, k) {
          t.children[k] = _this2.pure(v, withChildren);
        });
      }

      if (after) {
        return after(t, node) || t;
      }

      return t;
    },
    getNodeById: function getNodeById(id) {
      var r;
      breadthFirstSearch(this.rootData.children, function (node) {
        if (node._id === id) {
          r = node;
          return false;
        }
      });
      return r;
    },
    getActivated: function getActivated() {
      var r = [];
      breadthFirstSearch(this.rootData.children, function (node) {
        if (node.active) {
          r.push(node);
        }
      });
      return r;
    },
    getOpened: function getOpened() {
      var r = [];
      breadthFirstSearch(this.rootData.children, function (node) {
        if (node.open) {
          r.push(node);
        }
      });
      return r;
    },
    activeNode: function activeNode(node, inactiveOld) {
      if (inactiveOld) {
        this.getActivated().forEach(function (node2) {
          node2.active = false;
        });
      }

      node.active = true;
    },
    toggleActive: function toggleActive(node, inactiveOld) {
      if (node.active) {
        node.active = false;
      } else {
        this.activeNode(node, inactiveOld);
      }
    },
    openNode: function openNode(node, closeOld) {
      var _this3 = this;

      if (closeOld) {
        this.getOpened().forEach(function (node2) {
          node2.open = false;

          _this3.$emit('nodeOpenChanged', node2);
        });
      }

      node.open = true;
      this.$emit('nodeOpenChanged', node);
    },
    toggleOpen: function toggleOpen(node, closeOld) {
      if (node.open) {
        node.open = false;
        this.$emit('nodeOpenChanged', node);
      } else {
        this.openNode(node, closeOld);
      }
    },
    getPureData: function getPureData(after) {
      return this.pure(this.rootData, true, after).children;
    },
    deleteNode: function deleteNode(node) {
      return arrayRemove(node.parent.children, node);
    },
    addNode: function addNode(node, newNodeData) {
      return node.children.push(newNodeData);
    },
    onClickAddItem: function onClickAddItem(data) {
      this.$emit('addItem', data);
    }
  }
};/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "he-tree tree"
  }, [_c('TreeNode', {
    attrs: {
      "data": _vm.rootData,
      "store": _vm.store,
      "allow-add-item": _vm.allowAddItem,
      "add-item-text": _vm.addItemText
    },
    on: {
      "addItem": _vm.onClickAddItem
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(props) {
        return [_vm._t("default", null, {
          "data": props.data,
          "store": _vm.store,
          "vm": props.vm
        })];
      }
    }, {
      key: "node-inner-back",
      fn: function fn(props) {
        return _vm.customInnerBack ? [_vm._t("node-inner-back", null, {
          "styleObj": props.styleObj,
          "data": props.data,
          "store": props.store,
          "vm": props.vm
        })] : undefined;
      }
    }], null, true)
  })], 1);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$2 = undefined;
/* scoped */

var __vue_scope_id__$2 = undefined;
/* module identifier */

var __vue_module_identifier__$2 = "data-v-78a7e2ae";
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);var trees = []; // for multiple trees

var dplh = {
  _id: 'draggable_tree_drag_placeHolder',
  level: null,
  droppable: false,
  isDragPlaceHolder: true,
  class: 'draggable-placeholder',
  style: {},
  innerStyle: {},
  innerClass: 'draggable-placeholder-inner',
  innerBackStyle: {},
  innerBackClass: 'draggable-placeholder-inner-back'
};
var script$3 = {
  extends: __vue_component__$2,
  props: {
    getTriggerEl: {
      type: Function
    },
    draggable: {},
    droppable: {
      default: true
    },
    crossTree: {},
    ondragstart: {
      type: Function
    },
    ondragend: {
      type: Function
    },
    preventSelect: {
      default: true
    }
  },
  components: {
    TreeNode: __vue_component__$1
  },
  data: function data() {
    return {
      dplh: dplh,
      trees: trees
    };
  },
  created: function created() {
    trees.push(this);
  },
  beforeDestroy: function beforeDestroy() {
    arrayRemove(trees, this);
  }
};/* script */
var __vue_script__$3 = script$3;
/* template */

/* style */

var __vue_inject_styles__$3 = undefined;
/* scoped */

var __vue_scope_id__$3 = undefined;
/* module identifier */

var __vue_module_identifier__$3 = "data-v-c1356f44";
/* functional template */

var __vue_is_functional_template__$3 = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$3 = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);var components=/*#__PURE__*/Object.freeze({__proto__:null,DraggableTree: __vue_component__$3,depthFirstSearch: depthFirstSearch});var install = function installVueNestedDraggable(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Default export is library as a whole, registered via Vue.use()
exports.DraggableTree=__vue_component__$3;exports.default=plugin;exports.depthFirstSearch=depthFirstSearch;