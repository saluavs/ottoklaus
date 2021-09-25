import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Firebase from 'firebase'

import ElementUI from 'element-ui' 
import 'element-ui/lib/theme-chalk/index.css' 

Vue.use(ElementUI) 

const firebaseConfig = {
  apiKey: "AIzaSyDs7CYz-JC95S7aqVbjZk4OyzG1MhU5dSM",
  authDomain: "ottoklaus-631fe.firebaseapp.com",
  projectId: "ottoklaus-631fe",
  storageBucket: "ottoklaus-631fe.appspot.com",
  messagingSenderId: "985884454164",
  appId: "1:985884454164:web:c0118cc6fdb63474626601"
};

Firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')