<template>
  <section>
    <el-col :span="13" offset="1" style="padding-bottom: 0px; margin-top:30px; margin-bottom: 30px;">
      <el-form :inline="true" :model="rangeDate" class="demo-form-inline">
        <el-form-item label="选择日期" prop="rangeDate">
          <date-query @transferUser="getDateParm"></date-query>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--显示信息-->

  </section>
</template>
<script>
  import dateQuery from '../../components/dateQuery.vue'
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  export default {
    data() {
      return {
        dialogVisible: false,
        testdialog:false,
        left:true,
        tableData:null,
        rangeDate:"",
        startTime:"",
        endTime:""

      };
    },
    components: {
      dateQuery
    },
    methods: {
      queryReport(index,row){

      },
      getDateParm(data){
        console.log(this.startTime);
        this.startTime=data[0];
        this.endTime=data[1];
      },
      onSubmit(){
        let orderUrl="http://127.0.0.1:8084/glue/queryOrderDetail?";
        orderUrl=orderUrl+"startTime="+this.startTime+"&endTime="+this.endTime;
        window.open(orderUrl);
      },
    }
  };
</script>
<style scoped>
  .el-dialog--center {
    text-align: left;
  }
  .el-dialog_footer{
    text-align: right;
    padding-bottom: 30px;
  }
</style>
