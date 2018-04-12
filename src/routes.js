//import Vue from 'vue'
//import Router from 'vue-router'
//import HelloWorld from './components/HelloWorld'
import Home from './views/Home.vue'
import Cquery from './views/userInfo/customerQuery.vue'
import Aquery from './views/userInfo/approvalQuery.vue'
import Rquery from './views/userInfo/repaymentQuery.vue'
import Tquery from './views/userInfo/transactionQuery.vue'
import Atest from './views/afReport/Page5.vue'
import WorkOrder from './views/workOrder/workOrderExport.vue'
import Qreport from './views/afReport/queryReport.vue'
import Rreport from './views/afReport/reportStatistics.vue'
import Declare from './views/afReport/declare.vue'
 let routes = [
   {
     path: '/declare',
     component: Declare,
     name: '',
     hidden:true
   },
   {
     path: '/',
     component: Home,
      redirect:'/Cquery',
     name: '用户信息',
     iconCls: 'el-icon-message',//图标样式class
     children: [
       // { path: '/main', component: Main, name: '主页', hidden: true },
       { path: 'tquery', component: Tquery, name: '交易流水' },
        { path: '/rquery', component: Rquery, name: '还款计划' },
        { path: '/aquery', component: Aquery, name: '审批进度' },
       {path:'/cquery',component: Cquery,name:"用户信息"}
     ]
   },
   {
     path: '/',
     component: Home,
     name: '反欺诈查询',
     iconCls: 'el-icon-message',//图标样式class
     children: [

       { path: '/page', component: Atest, name: '反欺诈测试' },
         { path: '/queryReport', component: Qreport, name: '申报查询' },
       { path: '/reportStatistic', component: Rreport, name: '申报统计' },
     ]
   },

   {
     path: '/',
     component: Home,
     name: '工单报表',
     iconCls: 'el-icon-message',//图标样式class
     children: [
      // { path: '/main', component: Main, name: '主页', hidden: true },
       { path: '/Qreport', component: WorkOrder, name: '工单导出' },
     ]
   },

  ];
export default  routes;
