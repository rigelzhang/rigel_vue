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
        <el-form-item>
          <el-button type="success" @click="exportExcel">导出</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--显示信息-->
    <el-col :span="22" offset="1">
      <el-table
        id="exportS"
        :data="tableData"
        border
        :summary-method="getSummaries"
        show-summary
        style="width: 100%"
      >
        <el-table-column
          prop="operator_name"
          label="申报人"  align="center"
          width="90">
        </el-table-column>

        <el-table-column
          prop="total"
          label="申报数"
          align="center">
        </el-table-column>
        <el-table-column
          prop="caseStatus_04"
          label="调查归档数"
          align="center">
        </el-table-column>
        <el-table-column
          prop="caseStatus_05"
          label="调查结案数"
          align="center">
        </el-table-column>
        <el-table-column
          prop="caseResult_01"
          label="团伙欺诈案件"
          align="center">
        </el-table-column>
        <el-table-column
          prop="caseResult_02"
          label="个人欺诈案件"
          align="center">
        </el-table-column>
        <el-table-column
          prop="caseResult_03"
          label="盗用案件"
          align="center">
        </el-table-column>
      <el-table-column
        prop="caseResult_04"
        label="不涉及欺诈"
        align="center">
      </el-table-column>
      <el-table-column
        prop="caseResult_99"
        label="其他情况"
        align="center">
      </el-table-column>
      </el-table>
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
        tableData:null,
        rangeDate:"",
        startD:"",
        endD:""

      };
    },
    components: {
      dateQuery
    },
    methods: {
      queryReport(index,row){

      },
      getDateParm(data){
        console.log(this.startD);
        this.startD=data[0];
        this.endD=data[1];
      },
      onSubmit(){
        this.$axios.get('/queryReport',{params:{
          begainDate:this.startD,
          endDate:this.endD}
        })
          .then(response => {
            this.tableData = response.data;
          }).catch(error => { this.tableData = 'There was an error :' + error.message}
        )
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      },
      exportExcel () {

        let wb = XLSX.utils.table_to_book(document.querySelector('#exportS'));
        let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '申报统计.xlsx')
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        return wbout
      }
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
