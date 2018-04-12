<template>
<el-container>
  <el-header style="height: 100px;">
    <el-row :gutter="20">
      <el-col type="flex" class="row-bg":span="6" >
        <img class="img" src="../assets/psbccfc.png">
      </el-col>
    </el-row>
  </el-header>
  <el-container>
    <el-aside  :width="changeMini" >
      <!--导航菜单-->
      <el-row type="flex" class="row-bg" justify="start">
      <!--<hamburger class="hamburger-container" :toggleClick="changeC" :isActive="changeShape"></hamburger>-->

        <el-col :span="shapeDis" >
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo"  @open="handleOpen" @close="handleClose" :collapse="isCollapse"
               unique-opened router
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b">
        <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
          <el-submenu :index="index+''" v-if="!item.leaf">
            <template slot="title"><i :class="item.iconCls"></i>
              <span slot="title">{{item.name}}</span></template>
            <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
          </el-submenu>
          <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
        </template>
      </el-menu>
        </el-col>
        <el-col :span="5">
          <hamburger class="hamburger-container" :toggleClick="changeC" :isActive="changeShape"></hamburger>
          <!--<hamburger class="hamburger-container" :toggleClick="changeC"></hamburger>-->
      <!--<el-button type="info" size="mini" v-bind:icon="iconChange" @click="changeC"> </el-button>-->
        </el-col>
      </el-row>
    </el-aside>
    <section class="content-container" style="width: 95%">
      <!--<div class="grid-content bg-purple-light">-->
        <el-col :span="24" class="content-wrapper">
          <!--<transition name="fade" mode="out-in">-->
            <router-view></router-view>
          <!--</transition>-->
        </el-col>
      <!--</div>-->
    </section>
  </el-container>
</el-container>
</template>
<script>
  import Hamburger from './../components/index.vue'
import lg from '../assets/psbccfc.png'
export default {
  components:{
    Hamburger
  }
  ,
  data () {
    return{
      isCollapse:false,
      changeShape:true,
      shapeDis:19,
      changeMini:"300px"
      }
    },
  methods: {
    changeC(){
      if(!this.isCollapse){
        this.isCollapse=true;
        this.changeShape=false;
        this.shapeDis=13;
        this.changeMini="100px"
      }else {
        this.isCollapse=false;
        this.changeShape=true;
        this.shapeDis=19;
        this.changeMini="300px"
      }
    },

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }

}
</script>
<style lang="scss" >
  .el-menu{
    background-color:#2B313E;
  }

  .row-bg {
    padding: 10px 0;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 212px;
    min-height: 700px;
  }
  /*.el-submenu__title{*/
    /*color: #C0C0C0;;*/
  /*}*/
  /*.el-submenu__title:hover{*/
    /*color:rgb(255,168,0);*/
  /*}*/
  /*.el-menu-item{*/
    /*color: #C0C0C0;*/
  /*}*/
  /*.el-menu-item:hover{*/
    /*color: rgb(255,168,0);*/
  /*}*/
  .el-header {
    background-color: #B3C0D1;
    color: #C0C0C0;
    text-align: center;
    line-height: 100px;
  }
  .img{
    height:50%;
    width: 70%;
    text-align: center;
    vertical-align: middle;
  }
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding:  0 10px;
    margin-top: -15px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }



</style>
