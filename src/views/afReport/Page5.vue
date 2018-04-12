<template>
	<section>page5...
    <dateQuery @increment="incrementTotal" @transferUser="rtest"></dateQuery>
    <h2>日期时间是{{date1}}</h2>
    <el-button type="text" @click="testdialog = true">点击打开 Dialog</el-button>

    <el-dialog
      class="el-dialog--center"
      title="提示"
      :visible.sync="testdialog"
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer" >
    <el-button @click="testdialog = false" >取 消</el-button>
    <el-button type="primary" @click="testdialog = false" >确 定</el-button>
  </span>
    </el-dialog>
    <el-button type="primary" @click="btest">{{total}}</el-button>
	</section>
</template>
<script>
  import dateQuery from '../../components/dateQuery.vue'
  export default {
    data() {
      return {
        dialogVisible: false,
        testdialog:false,
        left:true,
        rangeDate:"",
        date1:'熟悉吧',
        total:0
      };
    },
    components: {
      dateQuery
    },
    methods: {

      rtest(data){
        this.date1=data;
        console.log("value的值是"+this.date1);
      },
      btest(data) {
        this.total+=1;
//      this.$emit('increment',this.counter)
      },
      incrementTotal(data) {
        console.log("date1"+this.total);
        this.total =data;
      },
    }


  };
</script>
<style>
  .el-dialog--center {
    text-align: left;
  }
  .el-dialog_footer{
    text-align: right;
    padding-bottom: 30px;
  }
</style>
