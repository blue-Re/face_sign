import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Tabbar,Button,Uploader ,CountDown , TabbarItem,NavBar ,NoticeBar,Grid, GridItem,Overlay,    } from 'vant';



createApp(App)
.use(store)
.use(router)
.use(Tabbar)
.use(NavBar)
.use(TabbarItem)
.use(NoticeBar)
.use(Grid)
.use(GridItem)
.use(Overlay)
.use(Button)
.use(Uploader )
.use(CountDown  )
.mount('#app')


