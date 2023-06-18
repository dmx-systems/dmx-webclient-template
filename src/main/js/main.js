import Vue from 'vue'
import dmx from 'dmx-api'
import App from './components/App'
import store from './store'
import router from './router'

// 1) Init dmx library
const dmxReady = dmx.init({store})

// 2) Create Vue root instance
// Instantiates router-view and dmx-webclient components.
const root = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

// 3) Initial navigation
// Initial navigation must take place *after* the webclient plugins are loaded.
// The "workspaces" store module is registered by the Workspaces plugin.
Promise.all([
  // Both, the Topicmap Panel and the Detail Panel, rely on a populated type cache.
  // The type cache must be ready *before* "initialNavigation" is dispatched.
  dmxReady
]).then(() => {
  store.dispatch('initialNavigation')
})
