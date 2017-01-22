/* eslint-disable */
import forEach from './dash.forEach'
import isString from './dash.isString'
import isObject from './dash.isObject'

let rx = /^data-(.+)/

function getAttrs (node) {
  let obj = {}

  forEach(node.attributes, (attr) => {
    let { name, nodeName, localName, value, nodeValue, textContent } = attr
    name = name || nodeName || localName
    value = value || nodeValue || textContent

    if (isString(name) && name.match(rx)) {
      obj[name.replace(rx, '$1')] = value
    }
  })
  return obj
}

function hasAttr (node, attrName) {
  let has = false
  if (!node || !node.attributes) return has
  forEach(node.attributes, () => {
    let { name, nodeName, localName } = attr
    name = name || nodeName || localName
    if (name === `data-${attrName}`) {
      has = true
      return false
    }
  })
  return has
}

function setAttr (node, key, value) {
  if (hasAttr(node, key)) {
    node.setAttribute(`data-${key}`, value)
  } else {
    let attr = document.createAttribute(`data-${key}`)
    attr.value = value
    node.setAttributeNode(attr)
  }
}

let data = function (key, val) {
  let node = this[0]

  if (!node) {
    return null
  } else if (!key) {
    return getAttrs(node)
  } else if (key && val === undefined) {
    if (isString(key)) {
      return getAttrs(node)[key]
    } else if (isObject(key)) {
      return forEach(key, (v, k) => {
        setAttr(node, k, v)
      })
    }
  }

  // set a key/value
  setAttr(node, key, val)
}


export default data
