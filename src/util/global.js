import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//一般单独js文件写数据

// import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex)
//
// export default new Vuex.Store({
//   state: {　　　　　　　　　　　　　　　　//state数据跟根组件data写法一模一样。也是储存数据的。
//     a: 1,
//     b: '33'
//   },
//   actions: {　　　　　　　　　　　　　　　//actions里面全是方法，与mutations区别只有这儿的方法可以使用异步操作，mutations方法使用异步，调试会混乱。
//     fn({ commit, state }, n) {　　　　//{{commit,state}}写法是es6语法，简写，state是默认传参，就是上面的state，就算写aaa也是指向state。n为组件传过来的参数。　　 　　　　　　new Promise((resolve, reject) => {　　　　　　　　//这儿模拟延迟，不模拟写 state.a += n;commit('add')代替
//       setTimeout(() => resolve(state.a += n), 1000)
//     }).then(commit('add'))　　　　　　//fn执行结束后，再执行mutations 中的add(){}。必须如此，否则，组件使用时收不到数据。
// },
// msgFn({ commit, state }, msg) {
//   state.b = msg
//   commit('add')
// }}
// },
// mutations: {　　　　　　　　　　　　　　//此处的function是同步操作的。其他的都跟上面一样。
//   add(state,n) {}　　　　　　　　　　//参数跟actions一样。
// },
// getters: {　　　　　　　　　　　　　　//　这个跟组件的computed差不多，接收state作为参数，不接受组件传参数。需要return值。
//   c(state) {
//     state.a += 1
//     return state.a--
//   },
// }
// })

// 复制代码

const store = new Vuex.Store({
  state: {
    input_mobile:'',
    input_name:'',
    input_idNo:'',
  },
  mutations:{
      getMobile(state,mobile){
         state.input_mobile=mobile;
      },
    getName(state,name){
        state.input_name=name;
    },
    getIdNo(state,idNo){
      state.input_idNo=idNo;
    }
  }
})
export default store
