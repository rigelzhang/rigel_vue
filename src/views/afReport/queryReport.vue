<template>
  <section>
    <el-col :span="13" offset="1" style="padding-bottom: 0px; margin-top:30px;  margin-bottom: 30px;">
      <el-form :inline="true" :model="rangeDate" class="demo-form-inline">
        <el-form-item label="选择日期" prop="rangeDate">
          <date-query @transferUser="getDateParm"></date-query>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="exportExcel">导出</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--显示信息-->
    <el-col :span="22" offset="1">
      <el-table
        id="out-table"
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column
          prop="operator_name"
          label="申报人"  align="center"
          width="90">
        </el-table-column>

        <el-table-column
          prop="request_time"
          label="申报时间"
          width="100"
          :formatter="formatterB"
          align="center">
        </el-table-column>
        <el-table-column
          prop="caseOriginal"
          label="申报内容"
          width="600"
          align="center">
        </el-table-column>
        <el-table-column
          prop="caseStatus"
          label="案件状态"
          width="90"
          :formatter="formatterS"
          align="center">
        </el-table-column>
        <el-table-column
          prop="caseResult"
          label="案件结果"
          width="90"
          :formatter="formatterR"
          align="center">
        </el-table-column>
        <el-table-column
          prop="caseNo"
          label="案件编号"
          v-if="false"
          align="center">
        </el-table-column>
        <el-table-column
          prop="isToPublic"
          label="是否公开"
          v-if="false"
          align="center">
        </el-table-column>
        <el-table-column
          prop="viewReport"
          label="查看报告"
          width="100"
          align="center">
          <template slot-scope="scope">
            <el-button @click="queryReport(scope.$index, scope.row)" type="primary" size="small" :disabled="scope.row.viewReport">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length">
      </el-pagination>
    </el-col>
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
        tableData:[],
        rangeDate:"",
        startD:"",
        endD:"",
        currentPage:1,//当前显示页数
        pagesize:20,//分页的大小
        isShow:true
    // 隐藏该列
      };
    },
    components: {
      dateQuery
    },
    methods: {
      queryReport(index,row){

      },
      getDateParm(data){

        this.startD=data[0];
        this.endD=data[1];
        console.log(this.startD);
      },
      onSubmit(){
        console.log(this.startD);
        this.$axios.get('/queryDetail',{params:{
          begainDate:this.startD,
          endDate:this.endD}
        })
          .then(response => {
            this.tableData = response.data;
          }).catch(error => { this.tableData = 'There was an error :' + error.message}
        )
      },
//      分页显示
      handleSizeChange: function (size) {
        this.pagesize = size;
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
      },
//      格式化案件状态
      formatterS(row, column){
        switch (row.caseStatus){
          case "05":
            row.caseStatus="调查归档";
            break;
          case "06":
            row.caseStatus="调查结案";
            break;
        }
        return row.caseStatus;
      },
//      格式化案件结果
      formatterR(row,column){
        switch (row.caseResult){
          case "01":
            row.caseResult="团伙欺诈案";
            break;
          case "02":row.caseResult="个人欺诈案";
            break;
          case "03":row.caseResult="盗用案件";
            break;
          case "04":row.caseResult="不涉及欺诈";
            break;
          case "99":
            row.caseResult="其他情况";
            break;
        }

        return row.caseResult;
      },
//格式化查看报告的状态
      formatterB(row,column){
        if(row.isToPublic==1 && row.caseStatus=="调查结案"){
                row.viewReport=false;
        }else {
          row.viewReport=true;
        }
        console.log(row.viewReport);
        return row.request_time;
      },
      queryReport(index,row){
          let publicR="http://11.112.0.41:9080/afms/cases/caseInfo?caseNo=";
          publicR=publicR+row.caseNo;
        window.open(publicR);
      },
      exportExcel () {

        var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'));
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '申报查询.xlsx')
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        return wbout
      }
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
