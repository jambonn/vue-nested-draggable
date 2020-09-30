export function isPropTrue(v) {
  return v || v === ''
}
//====== Helper-js ====//
/**
 * Remove item from array. return removed count
 * @param arr
 * @param v
 * @returns {number}
 */
export function arrayRemove(arr, v) {
  let index
  let count = 0

  while ((index = arr.indexOf(v)) > -1) {
    arr.splice(index, 1)
    count++
  }

  return count
}

/**
 * Rand item in array
 * @param arr
 * @returns {*}
 */
function randChoice(arr) {
  return arr[randInt(0, arr.length - 1)]
}

/**
 * Rand int in range, including min and max
 * @param min
 * @param max
 * @returns {number}
 */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Generate random string
 * @returns {string}
 */
export function randString() {
  const len =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8
  const seeds =
    arguments.length > 1 && arguments[1] !== undefined
      ? arguments[1]
      : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let r = ''

  for (let i = 0; i < len; i++) {
    r += randChoice(seeds)
  }

  return r
}

/**
 * http://www.51xuediannao.com/javascript/getBoundingClientRect.html
 * @param el
 * @returns {{top: number, left: number, bottom: number, width: (number), x: number, y: number, right: number, height: (number)}}
 */
function getBoundingClientRect(el) {
  const xy = el.getBoundingClientRect()
  const top = xy.top - document.documentElement.clientTop,
    bottom = xy.bottom,
    left = xy.left - document.documentElement.clientLeft,
    right = xy.right,
    width = xy.width || right - left,
    height = xy.height || bottom - top
  return {
    top: top,
    right: right,
    bottom: bottom,
    left: left,
    width: width,
    height: height,
    x: left,
    y: top,
  }
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
      left: pageXOffset,
    }
  } else {
    const B = document.body //IE 'quirks'

    let D = document.documentElement //IE with doctype

    D = D.clientHeight ? D : B
    return {
      top: D.scrollTop,
      left: D.scrollLeft,
    }
  }
}

/**
 * refer: https://gist.github.com/aderaaij/89547e34617b95ac29d1
 * @param el
 * @returns {{x: number, y: number}}
 */
export function getOffset(el) {
  const rect = getBoundingClientRect(el)
  const scroll = getScroll()
  return {
    x: rect.left + scroll.left,
    y: rect.top + scroll.top,
  }
}

export function binarySearch(arr, callback) {
  let opt =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}
  opt = Object.assign(
    {
      start: 0,
      end: arr.length - 1,
      maxTimes: 1000,
    },
    opt,
  )
  let _opt = opt,
    start = _opt.start,
    end = _opt.end
  let _opt2 = opt,
    returnNearestIfNoHit = _opt2.returnNearestIfNoHit,
    maxTimes = _opt2.maxTimes
  let midNum
  let mid

  if (start == null) {
    start = 0
    end = arr.length - 1
  }

  let i = 0
  let r

  while (start >= 0 && start <= end) {
    if (i >= maxTimes) {
      throw Error(
        'binarySearch: loop times is over '.concat(
          maxTimes,
          ', you can increase the limit.',
        ),
      )
    }

    midNum = Math.floor((end - start) / 2 + start)
    mid = arr[midNum]
    r = callback(mid, i)

    if (r > 0) {
      end = midNum - 1
    } else if (r < 0) {
      start = midNum + 1
    } else {
      return {
        index: midNum,
        value: mid,
        count: i + 1,
        hit: true,
      }
    }

    i++
  }

  return returnNearestIfNoHit
    ? {
        index: midNum,
        value: mid,
        count: i + 1,
        hit: false,
        greater: r > 0,
      }
    : null
}

/**
 * source: http://youmightnotneedjquery.com/
 * @param el
 * @param className
 * @returns {boolean}
 */
export function hasClass(el, className) {
  if (el.classList) {
    return el.classList.contains(className)
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className)
  }
}

//===== Tree helper =====//
function _changeParent(item, parent) {
  const childrenKey =
    arguments.length > 2 && arguments[2] !== undefined
      ? arguments[2]
      : 'children'
  const parentKey =
    arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'parent'

  // remove item from original list
  if (item[parentKey]) {
    arrayRemove(item[parentKey][childrenKey], item)
  }

  item[parentKey] = parent
}

export function insertBefore(item, target) {
  const childrenKey =
    arguments.length > 2 && arguments[2] !== undefined
      ? arguments[2]
      : 'children'
  const parentKey =
    arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'parent'

  if (item === target) {
    return
  }

  const siblings = target[parentKey][childrenKey]
  let index = siblings.indexOf(target)

  if (siblings[index - 1] !== item) {
    if (item[parentKey] === target[parentKey]) {
      arrayRemove(siblings, item)
      index = siblings.indexOf(target)
    } else {
      _changeParent(item, target[parentKey])
    }

    siblings.splice(index, 0, item)
  }
}

export function insertAfter(item, target) {
  const childrenKey =
    arguments.length > 2 && arguments[2] !== undefined
      ? arguments[2]
      : 'children'
  const parentKey =
    arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'parent'

  if (item === target) {
    return
  }

  const targetParent = target[parentKey]
  const siblings = targetParent[childrenKey]
  let index = siblings.indexOf(target)

  if (siblings[index + 1] !== item) {
    if (item[parentKey] === target[parentKey]) {
      arrayRemove(siblings, item)
      index = siblings.indexOf(target)
    } else {
      _changeParent(item, target[parentKey])
    }

    siblings.splice(index + 1, 0, item)
  }
}

export function prependTo(item, target) {
  const childrenKey =
    arguments.length > 2 && arguments[2] !== undefined
      ? arguments[2]
      : 'children'

  if (item === target) {
    throw "can't prepend to self"
  }

  const targetChildren = target[childrenKey]

  if (targetChildren[0] !== item) {
    _changeParent(item, target)

    targetChildren.splice(0, 0, item)
  }
}

export function appendTo(item, target) {
  const childrenKey =
    arguments.length > 2 && arguments[2] !== undefined
      ? arguments[2]
      : 'children'

  if (item === target) {
    throw "can't append to self"
  }

  const targetChildren = target[childrenKey]
  const targetChildrenLast = targetChildren[targetChildren.length - 1]

  if (targetChildrenLast !== item) {
    _changeParent(item, target)

    targetChildren.push(item)
  }
}

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
  )
}

function _nonIterableSpread() {
  throw new TypeError('Invalid attempt to spread non-iterable instance')
}

function _iterableToArray(iter) {
  if (
    Symbol.iterator in Object(iter) ||
    Object.prototype.toString.call(iter) === '[object Arguments]'
  )
    return Array.from(iter)
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    let arr2
    for (let i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i]
    }

    return arr2
  }
}

function _typeof(obj) {
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function (obj) {
      return typeof obj
    }
  } else {
    _typeof = function (obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj
    }
  }

  return _typeof(obj)
}

function isArray(v) {
  return Object.prototype.toString.call(v) === '[object Array]'
}

export function breadthFirstSearch(obj, handler) {
  const reverse = arguments.length > 3 ? arguments[3] : undefined
  const rootChildren = isArray(obj) ? obj : [obj] //

  let stack = rootChildren.map(function (v, i) {
    return {
      item: v,
      index: i,
    }
  })

  if (reverse) {
    stack.reverse()
  }

  const _loop = function _loop() {
    const _stack$shift = stack.shift(),
      item = _stack$shift.item,
      index = _stack$shift.index,
      parent = _stack$shift.parent

    const r = handler(item, index, parent)

    if (r === false) {
      // stop
      return {
        v: void 0,
      }
    } else if (r === 'skip children') {
      return 'continue'
    } else if (r === 'skip siblings') {
      stack = stack.filter(function (v) {
        return v.parent !== parent
      })
    }

    if (item.children) {
      let _stack

      let children = item.children

      if (reverse) {
        children = children.slice()
        children.reverse()
      }

      const pushStack = children.map(function (v, i) {
        return {
          item: v,
          index: i,
          parent: item,
        }
      })

      ;(_stack = stack).push.apply(_stack, _toConsumableArray(pushStack))
    }
  }

  while (stack.length) {
    const _ret = _loop()

    switch (_ret) {
      case 'continue':
        continue

      default:
        if (_typeof(_ret) === 'object') return _ret.v
    }
  }
}

export function depthFirstSearch(obj, handler) {
  const childrenKey =
    arguments.length > 2 && arguments[2] !== undefined
      ? arguments[2]
      : 'children'
  const reverse = arguments.length > 3 ? arguments[3] : undefined
  const rootChildren = isArray(obj) ? obj : [obj] //

  const StopException = function StopException() {}

  const func = function func(children, parent) {
    if (reverse) {
      children = children.slice()
      children.reverse()
    }

    const len = children.length

    for (let i = 0; i < len; i++) {
      const item = children[i]
      const r = handler(item, i, parent)

      if (r === false) {
        // stop
        throw new StopException()
      } else if (r === 'skip children') {
        continue
      } else if (r === 'skip siblings') {
        break
      }

      if (item[childrenKey] != null) {
        func(item[childrenKey], item)
      }
    }
  }

  try {
    func(rootChildren)
  } catch (e) {
    if (e instanceof StopException) {
      // stop
    } else {
      throw e
    }
  }
}
