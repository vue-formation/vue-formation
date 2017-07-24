import Vue from 'vue'
import Formation from './components/Formation'
export default function (plugins) {
  return Formation(Vue, {}, plugins)
}
