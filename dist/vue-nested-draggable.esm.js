import draggableHelper from 'draggable-helper';

function isPropTrue(v) {
  return v || v === '';
} //====== Helper-js ====//

/**
 * Remove item from array. return removed count
 * @param arr
 * @param v
 * @returns {number}
 */

function arrayRemove(arr, v) {
  let index;
  let count = 0;

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
  const len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
  const seeds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let r = '';

  for (let i = 0; i < len; i++) {
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
  const xy = el.getBoundingClientRect();
  const top = xy.top - document.documentElement.clientTop,
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
    const B = document.body; //IE 'quirks'

    let D = document.documentElement; //IE with doctype

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
  const rect = getBoundingClientRect(el);
  const scroll = getScroll();
  return {
    x: rect.left + scroll.left,
    y: rect.top + scroll.top
  };
}
function binarySearch(arr, callback) {
  let opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  opt = Object.assign({
    start: 0,
    end: arr.length - 1,
    maxTimes: 1000
  }, opt);
  let _opt = opt,
      start = _opt.start,
      end = _opt.end;
  let _opt2 = opt,
      returnNearestIfNoHit = _opt2.returnNearestIfNoHit,
      maxTimes = _opt2.maxTimes;
  let midNum;
  let mid;

  if (start == null) {
    start = 0;
    end = arr.length - 1;
  }

  let i = 0;
  let r;

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
  const childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
  const parentKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'parent'; // remove item from original list

  if (item[parentKey]) {
    arrayRemove(item[parentKey][childrenKey], item);
  }

  item[parentKey] = parent;
}

function insertBefore(item, target) {
  const childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
  const parentKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'parent';

  if (item === target) {
    return;
  }

  const siblings = target[parentKey][childrenKey];
  let index = siblings.indexOf(target);

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
  const childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
  const parentKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'parent';

  if (item === target) {
    return;
  }

  const targetParent = target[parentKey];
  const siblings = targetParent[childrenKey];
  let index = siblings.indexOf(target);

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
  const childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';

  if (item === target) {
    throw "can't prepend to self";
  }

  const targetChildren = target[childrenKey];

  if (targetChildren[0] !== item) {
    _changeParent(item, target);

    targetChildren.splice(0, 0, item);
  }
}
function appendTo(item, target) {
  const childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';

  if (item === target) {
    throw "can't append to self";
  }

  const targetChildren = target[childrenKey];
  const targetChildrenLast = targetChildren[targetChildren.length - 1];

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
    let arr2;

    for (let i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

function _typeof(obj) {
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
    };
  }

  return _typeof(obj);
}

function isArray(v) {
  return Object.prototype.toString.call(v) === '[object Array]';
}

function breadthFirstSearch(obj, handler) {
  const reverse = arguments.length > 3 ? arguments[3] : undefined;
  const rootChildren = isArray(obj) ? obj : [obj]; //

  let stack = rootChildren.map(function (v, i) {
    return {
      item: v,
      index: i
    };
  });

  if (reverse) {
    stack.reverse();
  }

  const _loop = function _loop() {
    const _stack$shift = stack.shift(),
          item = _stack$shift.item,
          index = _stack$shift.index,
          parent = _stack$shift.parent;

    const r = handler(item, index, parent);

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
      let _stack;

      let children = item.children;

      if (reverse) {
        children = children.slice();
        children.reverse();
      }

      const pushStack = children.map(function (v, i) {
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
    const _ret = _loop();

    switch (_ret) {
      case 'continue':
        continue;

      default:
        if (_typeof(_ret) === 'object') return _ret.v;
    }
  }
}
function depthFirstSearch(obj, handler) {
  const childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
  const reverse = arguments.length > 3 ? arguments[3] : undefined;
  const rootChildren = isArray(obj) ? obj : [obj]; //

  const StopException = function StopException() {};

  const func = function func(children, parent) {
    if (reverse) {
      children = children.slice();
      children.reverse();
    }

    const len = children.length;

    for (let i = 0; i < len; i++) {
      const item = children[i];
      const r = handler(item, i, parent);

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
}

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

  data() {
    return {
      vm: this
    };
  },

  computed: {
    childrenLevel() {
      return this.level + 1;
    },

    isRoot() {
      return this.data && this.data.isRoot;
    },

    childrenVisible() {
      const {
        data
      } = this;
      return this.isRoot || data && data.children && data.children.length && data.open;
    },

    innerBackStyle() {
      const r = {
        marginBottom: this.store.space + 'px'
      };

      if (!this.isRoot && this.level > 1) {
        r.paddingLeft = (this.level - 1) * this.store.indent + 'px';
      }

      return r;
    },

    actionStyle() {
      const r = {};

      if (!this.isRoot && this.level > 0) {
        r.paddingLeft = this.level * this.store.indent + 'px';
      }

      return r;
    }

  },
  watch: {
    data: {
      immediate: true,

      handler(data) {
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
    onClickAddItem() {
      this.$emit('addItem', this.data);
    },

    onClickChildItem(data) {
      this.$emit('addItem', data);
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
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
  }) : _vm._e(), _vm._v(" "), _c('transition', {
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
        fn: function (props) {
          return [_vm._t("default", null, {
            "data": props.data,
            "store": props.store,
            "vm": props.vm
          })];
        }
      }, {
        key: "node-inner-back",
        fn: function (props) {
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
      "click": function ($event) {
        $event.preventDefault();
        return _vm.onClickAddItem($event);
      }
    }
  }, [_vm._v("\n          " + _vm._s(_vm.addItemText) + "\n        ")])]) : _vm._e()], 2) : _vm._e()])], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

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

class Cache {
  constructor() {
    _defineProperty(this, "store", {});
  }

  has(name) {
    return this.store.hasOwnProperty(name);
  }

  remember(name, getter) {
    if (!this.has(name)) {
      this.store[name] = {
        value: getter()
      };
    }

    return this.store[name].value;
  }

  forget(name) {
    if (name) {
      if (this.has(name)) {
        delete this.store[name];
      }
    } else {
      this.store = {};
    }
  }

}
function attachCache(obj, cache, toCache) {
  for (const key in toCache) {
    if (toCache.hasOwnProperty(key)) {
      Object.defineProperty(obj, key, {
        get() {
          return cache.remember(key, () => toCache[key].call(this));
        }

      });
    }
  }
}

// from https://gist.github.com/iddan/54d5d9e58311b0495a91bf06de661380

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
  const els = document.elementsFromPoint(x, y);
  let treeEl;
  let nodeEl;
  const betweenEls = [];

  for (const el of els) {
    if (!nodeEl) {
      if (hasClass(el, 'tree-node')) {
        nodeEl = el;
      }
    } else {
      // console.log(el);
      if (hasClass(el, 'tree')) {
        treeEl = el;
        break;
      }

      betweenEls.push(el);
    }
  }

  if (treeEl) {
    // is target tree is another tree, and be covered by other element, like modal, popup
    let covered = false;

    if (!isParent(nodeEl, treeEl)) {
      // cross tree
      for (const el of betweenEls) {
        if (!isParent(el, treeEl)) {
          covered = true;
          break;
        }
      }
    } //


    if (!covered) {
      return trees.find(v => v.$el === treeEl);
    }
  }
}

function isParent(child, parent) {
  let cur = child;

  while (cur) {
    cur = cur.parentNode;

    if (cur === parent) {
      return true;
    }
  }
}

const targets = {
  nothing: info => {},
  after: info => {
    insertDplhAfterTo(info.dplh, info.targetNode);
  },
  before: info => {
    if (isNodeDroppable(info.targetNode.parent)) {
      insertBefore(info.dplh, info.targetNode);
    } else {
      insertDplhAfterTo(info.dplh, info.targetNode.parent);
    }
  },
  append: info => {
    if (isNodeDroppable(info.targetNode)) {
      appendTo(info.dplh, info.targetNode);
      if (!info.targetNode.open) info.store.toggleOpen(info.targetNode);
    } else {
      insertDplhAfterTo(info.dplh, info.targetNode);
    }
  },
  prepend: info => {
    if (isNodeDroppable(info.targetNode)) {
      prependTo(info.dplh, info.targetNode);
      if (!info.targetNode.open) info.store.toggleOpen(info.targetNode);
    } else {
      insertDplhAfterTo(info.dplh, info.targetNode);
    }
  },
  'after target parent': info => {
    insertDplhAfterTo(info.dplh, info.targetNode.parent);
  },
  // append to prev sibling
  'append prev': info => {
    if (isNodeDroppable(info.targetPrev)) {
      appendTo(info.dplh, info.targetPrev);
      if (!info.targetPrev.open) info.store.toggleOpen(info.targetPrev);
    } else {
      insertDplhAfterTo(info.dplh, info.targetPrev);
    }
  },
  // append to current tree
  'append current tree': info => {
    if (isNodeDroppable(info.currentTree.rootData)) {
      appendTo(info.dplh, info.currentTree.rootData);
    }
  }
};

function insertDplhAfterTo(dplh, targetNode) {
  if (!targetNode) {
    return false;
  } else {
    const closest = findParent(targetNode, node => node.parent && isNodeDroppable(node.parent));

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
    let r;

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
    let r;

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
  const len = children.length;

  if (reverse) {
    for (let i = len - 1; i >= 0; i--) {
      const item = children[i]; // excluding dragging node

      if (item !== info.node) {
        if (handler(item, i)) {
          return item;
        }
      }
    }
  } else {
    for (let i = 0; i < len; i++) {
      const item = children[i]; // excluding dragging node

      if (item !== info.node) {
        if (handler(item, i)) {
          return item;
        }
      }
    }
  }
} // start from node self


function findParent(node, handle) {
  let current = node;

  while (current) {
    if (handle(current)) {
      return current;
    }

    current = current.parent;
  }
}

const rules = {
  'targetNode existed': info => info.targetNode,
  'targetNode is placeholder': info => info.targetNode.isDragPlaceHolder,
  'targetNode at top': info => info.targetAtTop,
  'targetNode at bottom': info => info.targetAtBottom,
  'targetNode is the second child of root': info => info.currentTreeRootSecondChildExcludingDragging === info.targetNode,
  'currentTree existed': info => info.currentTree,
  'currentTree empty': info => !findChild(info, info.currentTree.rootData.children, v => v),
  'placeholder existed': info => info.dplhEl,
  'placeholder in currentTree': info => info.dplhElInCurrentTree,
  'placeholder at top': info => info.dplhAtTop,
  'targetNode is open': info => info.targetNode.open,
  'targetNode has children excluding placeholder': info => findChild(info, info.targetNode.children, v => v !== info.dplh),
  'targetNode is 1st child': info => findChild(info, info.targetNode.parent.children, v => v) === info.targetNode,
  'targetNode is last child': info => findChild(info, info.targetNode.parent.children, v => v, true) === info.targetNode,
  'on targetNode middle': info => info.offset.y <= info.tiMiddleY,
  'at left': info => info.offset.x < info.tiOffset.x,
  'at indent right': info => info.offset.x > info.tiOffset.x + info.currentTree.indent
}; // convert rule output to Boolean

for (const key of Object.keys(rules)) {
  const old = rules[key];

  rules[key] = (...args) => Boolean(old(...args));
}

let prevTree;
let droppableIds = {};
let draggableIds = {}; // context is vm

function autoMoveDragPlaceHolder(draggableHelperInfo) {
  const trees = this.store.trees;
  const dhStore = draggableHelperInfo.store; // make info

  const info = {
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
    nodeInnerEl() {
      return this.el.querySelector('.tree-node-inner');
    },

    offset() {
      return getOffset(this.nodeInnerEl);
    },

    // left top point
    offset2() {
      return {
        x: this.offset.x + this.nodeInnerEl.offsetWidth,
        y: this.offset.y + this.nodeInnerEl.offsetHeight
      };
    },

    // right bottom point
    offsetToViewPort() {
      const r = this.nodeInnerEl.getBoundingClientRect();
      r.x = r.left;
      r.y = r.top;
      return r;
    },

    // tree
    currentTree() {
      const currentTree = getTreeByPoint(this.offsetToViewPort.x, this.offsetToViewPort.y, trees);

      if (currentTree) {
        const dragStartTree = this.store;

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

    currentTreeRootEl() {
      return document.getElementById(this.currentTree.rootData._id);
    },

    currentTreeRootOf4() {
      return getOf4(this.currentTreeRootEl, this.currentTree.space);
    },

    // the second child of currentTree root, excluding dragging node
    currentTreeRootSecondChildExcludingDragging() {
      return this.currentTree.rootData.children.slice(0, 3).filter(v => v !== this.node)[1];
    },

    // placeholder
    dplhEl() {
      return document.getElementById(this.dplh._id);
    },

    dplhElInCurrentTree() {
      return Boolean(this.currentTree.$el.querySelector(`#${this.dplh._id}`));
    },

    dplhOf4() {
      return getOf4(this.dplhEl, this.currentTree.space);
    },

    dplhAtTop() {
      return Math.abs(this.dplhOf4.y - this.currentTreeRootOf4.y) < 5;
    },

    targetAtTop() {
      return Math.abs(this.tiOf4.y - this.currentTreeRootOf4.y) < 5;
    },

    targetAtBottom() {
      return Math.abs(this.tiOf4.y2 - this.currentTreeRootOf4.y2) < 5;
    },

    // most related node
    targetNode() {
      const {
        currentTree
      } = this;

      if (!currentTree) {
        throw 'no currentTree';
      } //


      const {
        x,
        y
      } = this.offset;
      let currentNode = currentTree.rootData;

      while (true) {
        let children = currentNode.children;

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

        const t = binarySearch(children, node => {
          const el = document.getElementById(node._id);
          const ty = getOffset(el).y;
          const ty2 = ty + el.offsetHeight + currentTree.space;

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

        const innerEl = document.getElementById(currentNode._id).querySelector('.tree-node-inner');
        const of = getOf4(innerEl, currentTree.space);

        if (of.y <= y && y <= of.y2) {
          break;
        }
      }

      return currentNode;
    },

    targetNodeEl() {
      return document.getElementById(this.targetNode._id);
    },

    // targetNodeInnerElOffset
    tiInnerEl() {
      return this.targetNodeEl.querySelector('.tree-node-inner');
    },

    tiOffset() {
      return getOffset(this.tiInnerEl);
    },

    tiOf4() {
      return getOf4(this.tiInnerEl, this.currentTree.space);
    },

    tiMiddleY() {
      return this.tiOffset.y + this.tiInnerEl.offsetHeight / 2;
    },

    //
    targetPrevEl() {
      let r = this.targetNodeEl.previousSibling;

      if (hasClass(r, 'dragging')) {
        r = r.previousSibling;
      }

      return r;
    },

    targetPrev() {
      const id = this.targetPrevEl.getAttribute('id');
      return this.currentTree.getNodeById(id);
    }

  }); // attachCache end
  // decision start =================================

  const executedRuleCache = {}; // exec rule

  const exec = ruleId => {
    if (!executedRuleCache.hasOwnProperty(ruleId)) {
      let r;

      try {
        r = rules[ruleId](info);
      } catch (e) {
        r = e;

        try {
          if (process.env.DEVELOPE_SELF) {
            // only visible when develop its self
            // eslint-disable-next-line
            console.warn(`failed to execute rule '${ruleId}'`, e);
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
  const r = getOffset(el);
  r.x2 = r.x + el.offsetWidth;
  r.y2 = r.y + el.offsetHeight + space;
  return r;
}

autoMoveDragPlaceHolder.dragStart = function dragStart() {};

autoMoveDragPlaceHolder.dragEnd = function dragEnd() {
  prevTree = null;
  droppableIds = {};
  draggableIds = {};
};

var script$1 = {
  extends: __vue_component__,
  name: 'TreeNode',

  mounted() {
    this.store.isNodeDraggable = isNodeDraggable;
    this.store.isNodeDroppable = isNodeDroppable;

    if (this.isRoot || this.data.isDragPlaceHolder) {
      return;
    }

    const {
      dplh
    } = this.store;
    this.$watch('store.draggable', draggable => {
      if (isPropTrue(draggable)) {
        const triggerEl = this.store.getTriggerEl ? this.store.getTriggerEl(this) : this.$el.querySelector('.tree-node-inner');
        this._draggableDestroy = draggableHelper(triggerEl, {
          preventSelect: isPropTrue(this.store.preventSelect),
          // trigger el
          getEl: () => this.$el,
          minTranslate: 10,
          drag: (e, opt, store) => {
            autoMoveDragPlaceHolder.dragStart(); // this store is not tree

            const draggableHelperInfo = {
              event: e,
              options: opt,
              store
            };

            if (this.store.ondragstart && this.store.ondragstart(this.data, draggableHelperInfo) === false) {
              return false;
            }

            if (!isNodeDraggable(this.data)) {
              return false;
            }

            this.store.$emit('drag', this.data); // record start position

            const siblings = this.data.parent.children;
            this.startPosition = {
              siblings,
              index: siblings.indexOf(this.data)
            };
            dplh.innerStyle.height = store.el.offsetHeight + 'px';
            insertAfter(dplh, this.data);
            this.data.class += ' dragging';
          },
          moving: (e, opt, store) => {
            if (store.movedCount === 0) {
              return;
            }

            const draggableHelperInfo = {
              event: e,
              options: opt,
              store
            };
            return autoMoveDragPlaceHolder.call(this, draggableHelperInfo);
          },
          drop: (e, opt, store) => {
            autoMoveDragPlaceHolder.dragEnd();
            const draggableHelperInfo = {
              event: e,
              options: opt,
              store
            };

            if (this.store.ondragend && this.store.ondragend(this.data, draggableHelperInfo) === false) {
              arrayRemove(dplh.parent.children, dplh); // can't drop, no change
            } else {
              const targetTree = dplh._vm.store;
              const crossTree = targetTree !== this.store;
              const oldTree = crossTree ? this.store : null;
              insertAfter(this.data, dplh);
              arrayRemove(dplh.parent.children, dplh);
              this.data.class = this.data.class.replace(/(^| )dragging( |$)/g, ' ');
              targetTree.$emit('drop', this.data, targetTree, oldTree);
              oldTree && oldTree.$emit('drop', this.data, targetTree, oldTree); // emit change event if changed

              const siblings = this.data.parent.children;

              if (siblings === this.startPosition.siblings && siblings.indexOf(this.data) === this.startPosition.index) ; else {
                this.store.$emit('change', this.data, targetTree, oldTree);
                oldTree && oldTree.$emit('change', this.data, targetTree, oldTree);
              }

              this.startPosition = null;
            }
          }
        });
      } else {
        if (this._draggableDestroy) {
          this._draggableDestroy();

          this._draggableDestroy = null;
        }
      }
    }, {
      immediate: true
    });
  }

};

/* script */
const __vue_script__$1 = script$1;
/* template */

/* style */

const __vue_inject_styles__$1 = undefined;
/* scoped */

const __vue_scope_id__$1 = undefined;
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

//
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

  data() {
    return {
      store: this,
      rootData: null
    };
  },

  watch: {
    data: {
      immediate: true,

      handler(data, old) {
        if (data === old) {
          return;
        } // make rootData always use a same object


        this.rootData = this.rootData || {
          isRoot: true,
          _id: `tree_${this._uid}_node_root`,
          children: []
        };
        breadthFirstSearch(data, (node, k, parent) => {
          this.completeNode(node, parent);
        });
        this.rootData.children = data;
      }

    }
  },
  methods: {
    completeNode(node, parent) {
      const completedData = {
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

      for (const key in completedData) {
        if (!node.hasOwnProperty(key)) {
          this.$set(node, key, completedData[key]);
        }
      }

      this.$set(node, 'parent', parent || this.rootData);

      if (!node.hasOwnProperty('_id')) {
        node._id = `tree_${this._uid}_node_${randString(this.idLength)}`;
      }

      node._treeNodePropertiesCompleted = true;
    },

    // pure node self
    pure(node, withChildren, after) {
      const t = Object.assign({}, node);
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

      for (const key of Object.keys(t)) {
        if (key[0] === '_') {
          delete t[key];
        }
      }

      if (withChildren && node.children) {
        t.children = node.children.slice();
        t.children.forEach((v, k) => {
          t.children[k] = this.pure(v, withChildren);
        });
      }

      if (after) {
        return after(t, node) || t;
      }

      return t;
    },

    getNodeById(id) {
      let r;
      breadthFirstSearch(this.rootData.children, node => {
        if (node._id === id) {
          r = node;
          return false;
        }
      });
      return r;
    },

    getActivated() {
      const r = [];
      breadthFirstSearch(this.rootData.children, node => {
        if (node.active) {
          r.push(node);
        }
      });
      return r;
    },

    getOpened() {
      const r = [];
      breadthFirstSearch(this.rootData.children, node => {
        if (node.open) {
          r.push(node);
        }
      });
      return r;
    },

    activeNode(node, inactiveOld) {
      if (inactiveOld) {
        this.getActivated().forEach(node2 => {
          node2.active = false;
        });
      }

      node.active = true;
    },

    toggleActive(node, inactiveOld) {
      if (node.active) {
        node.active = false;
      } else {
        this.activeNode(node, inactiveOld);
      }
    },

    openNode(node, closeOld) {
      if (closeOld) {
        this.getOpened().forEach(node2 => {
          node2.open = false;
          this.$emit('nodeOpenChanged', node2);
        });
      }

      node.open = true;
      this.$emit('nodeOpenChanged', node);
    },

    toggleOpen(node, closeOld) {
      if (node.open) {
        node.open = false;
        this.$emit('nodeOpenChanged', node);
      } else {
        this.openNode(node, closeOld);
      }
    },

    getPureData(after) {
      return this.pure(this.rootData, true, after).children;
    },

    deleteNode(node) {
      return arrayRemove(node.parent.children, node);
    },

    addNode(node, newNodeData) {
      return node.children.push(newNodeData);
    },

    onClickAddItem(data) {
      this.$emit('addItem', data);
    }

  }
};

/* script */
const __vue_script__$2 = script$2;
/* template */

var __vue_render__$1 = function () {
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
      fn: function (props) {
        return [_vm._t("default", null, {
          "data": props.data,
          "store": _vm.store,
          "vm": props.vm
        })];
      }
    }, {
      key: "node-inner-back",
      fn: function (props) {
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

const __vue_inject_styles__$2 = undefined;
/* scoped */

const __vue_scope_id__$2 = undefined;
/* module identifier */

const __vue_module_identifier__$2 = undefined;
/* functional template */

const __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

const trees = []; // for multiple trees

const dplh = {
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

  data() {
    return {
      dplh,
      trees
    };
  },

  created() {
    trees.push(this);
  },

  beforeDestroy() {
    arrayRemove(trees, this);
  }

};

/* script */
const __vue_script__$3 = script$3;
/* template */

/* style */

const __vue_inject_styles__$3 = undefined;
/* scoped */

const __vue_scope_id__$3 = undefined;
/* module identifier */

const __vue_module_identifier__$3 = undefined;
/* functional template */

const __vue_is_functional_template__$3 = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$3 = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  DraggableTree: __vue_component__$3,
  depthFirstSearch: depthFirstSearch
});

// Import vue components

const install = function installVueNestedDraggable(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


const plugin = {
  install
}; // To auto-install on non-es builds, when vue is found

export default plugin;
export { __vue_component__$3 as DraggableTree, depthFirstSearch };
