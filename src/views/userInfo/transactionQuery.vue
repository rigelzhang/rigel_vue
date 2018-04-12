<template>
  <section>
    <!--查询表单-->
    <el-col :span="8" offset="1" style="padding-bottom: 0px; margin-top:30px;">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <!--开始自我验证-->
        <el-form-item label="客户姓名" prop="name">
          <el-input type="text" v-model="ruleForm2.name"  :change="setName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="ruleForm2.phone" :change="setMoible" type="tel"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="identity">
          <el-input v-model="ruleForm2.identity" :change="setIdNo" ></el-input>
        </el-form-item>
        <el-col :offset="7">
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">查询</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-col>
    <el-col :span="22" offset="1">
      <el-table
        id="transaction"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="username"
          label="客户姓名"  align="center"
          width="90">
        </el-table-column>
        <el-table-column
          prop="prod_name"
          label="产品名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="loan_amt"
          label="核准金额"
          align="center">
        </el-table-column>
        <el-table-column
          prop="allocation_amt"
          label="放款金额"
          align="center"
          :formatter="tableFormatter">
        </el-table-column>
        <el-table-column
          prop="update_time"
          label="放款时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="order_day"
          label="账单日"
          align="center">
        </el-table-column>
        <el-table-column
          prop="payment_due_day"
          label="到期还款日"
          align="center">
        </el-table-column>
        <el-table-column
          prop="current_return"
          label="当期应还"
          align="center" :formatter="tableFormatter">
        </el-table-column>
        <el-table-column
          prop="enquiry_desc"
          label="交易描述"
          align="center">
        </el-table-column>
        <el-table-column
          prop="var_area"
          label="交易金额"
          align="center"
          :formatter="tableFormatter">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
          align="center">
          <template slot-scope="scope">
            <el-button @click="transactionDetail(scope.$index, scope.row)" type="text" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <!--交易流水详情-->

    <el-dialog
      title="详情列表"
      class="el-dialog-title"
      :visible.sync="dialogVisible"
        width="70%"
    >
      <el-row :gutter="20">
        <el-col :span="4" :offset="1"><label>客户姓名</label></el-col>
        <el-col :span="4" :offset="1"><label >{{username}}</label></el-col>
        <el-col :span="4" :offset="1"><label>客户账号</label></el-col>
        <el-col :span="4" :offset="1"><label>{{user_acct}}</label></el-col>
      </el-row>
        <el-form ref="form" :model="SForm" label-width="100px" size="small">
          <el-form-item label="查询方式">
            <el-radio-group v-model="radio" @change="queryType(radio)">
              <el-radio :label="1">已出账单查询</el-radio>
              <el-radio :label="2">交易日期查询</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="账单日期" v-show="isShow1">
            <el-col :span="9">
              <el-form-item prop="date1">
                <el-date-picker type="month" placeholder="选择日期" v-model="orderValue"  value-format="yyyyMM" style="width: 100%;" ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="交易日期" v-show="isShow2">
          <el-col :span="9">
            <el-form-item prop="date2">
              <dateQuery  @transferUser="getDateParm"></dateQuery>
            </el-form-item>
          </el-col>

          </el-form-item >
            <el-form-item >
              <el-col offset="6"><el-button type="primary" @click="transactionOnSubmit" >查询</el-button>
              <el-button type="success" @click="exportExcel">导出</el-button></el-col>
            </el-form-item>
        </el-form>

      <!--交易流水-->
      <el-table
        id="tran_table"
        :data="transactionDetailData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="trn_date"
          label="交易日期"  align="center">
        </el-table-column>
        <el-table-column
          prop="system_time"
          label="交易时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="trn_code"
          label="交易码"
          align="center">
        </el-table-column>
        <el-table-column
          prop="jrnl_no"
          label="交易流水号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="enquiry_desc"
          label="交易描述"
          align="center"
          :formatter="tableFormatter">
        </el-table-column>
        <el-table-column
          prop="var_eara"
          label="交易金额"
          align="center">
        </el-table-column>
        <el-table-column
          prop="BGL_account"
          label="BGL账号"
          align="center">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="transactionDetailData.length">
      </el-pagination>
      <span slot="footer" class="dialog-footer">
    <el-button @click="transactionReset">取 消</el-button>
    <el-button type="primary" @click="transactionReset">确 定</el-button>
  </span>
    </el-dialog>
  </section>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  import ElRow from "element-ui/packages/row/src/row";
  import dateQuery from '../../components/dateQuery.vue';
  import {tableFormatter}from '../../util/baseCalculate';
  import XLSX from 'xlsx'
  import FileSaver from 'file-saver'
  export default {
    components: {
      ElRow,
      ElCol},
    data() {
      // 验证名字正则表达式

      var validateName = (rule, value, callback) => {
        var regExp=/^[\u4e00-\u9fa5]{2,4}$/;
        if (value === '') {
          callback();
        }else if(regExp.test(value) === false){
          callback(new Error('请输入正确的名字'))
        } else {
          callback();
        }
      };
      //验证电话号码正则表达式
      var validateTel = (rule, value, callback) => {
        var regExp = /^1[3|5|8|7][0-9]{9}$/;
        if (value === '' ) {
          callback(new Error('请输入手机号码'));
        }else if (regExp.test(value) === false) {
          callback(new Error('请输入正确手机号码'))
        } else {
          callback();
        }
      };
      //验证身份正号码正则表达式
      var validateIdentity = (rule, value, callback) => {
        var regExp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (value === '') {
          callback();
        }else if (regExp.test(value) === false) {
          callback(new Error('请输入正确的身份证号码'))
        } else {
          callback();
        }
      };

      return {
        ruleForm2: {
          name: this.$store.state.input_name,
          phone:this.$store.state.input_mobile,
          identity:this.$store.state.input_idNo,
        },
        rules2: {
          identity:[{validator:validateIdentity,trigger:'blur'}] ,
          phone:[{
            validator:validateTel,trigger:'blur'}],
          name:[{
            validator:validateName,trigger:'blur'}],
        },
        phoneI:"",
        tableData: null,//交易数据
        username:"",  //详情用户姓名
        user_acct:"",//详情用户账号
        radio:1,//单选框
        orderValue:"",
        startD:"",//开始时间
        endD:"",//结束时间
        isShow1:true,
        isShow2:false,
        date1: '',//账单日时间
        date2: '',//账单范围时间
        t_parmlist:{//返回重新传递的参数
          t_acct:"",
          t_id:"",
          t_no:"",
          t_order:""
        },
        transactionDetailData:[],  //交易数据
        testdialog:false,
        dialogVisible: false,
        currentPage:1,
        pagesize:20
      };
    },
    components: {
      dateQuery
    },
    computed:{
      setMoible(){
        console.log(this.ruleForm2.phone);
        this.$store.commit('getMobile',this.ruleForm2.phone);
      },
      setName(){
        this.$store.commit('getName',this.ruleForm2.name);
      },
      setIdNo(){
        this.$store.commit('getIdNo',this.ruleForm2.identity);
      }
    },
    methods: {
      //验证变电
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/transctionPlanData',{
              mobile:this.ruleForm2.phone,
              customer_id:this.ruleForm2.identity,
              username:this.ruleForm2.identity
            })
              .then(response => {
                this.tableData = response.data;
                console.log(response.data);
              }).catch(error => { this.$message.error(error.message)}
            )
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //交易详情
      transactionDetail(index, row) {
        this.dialogVisible = true;
        this.username=row.username;
        this.user_acct=row.acct_no;
        this.t_parmlist.t_acct=row.acct_no;
        this.t_parmlist.t_id=row.id_no;
        this.t_parmlist.t_no=row.customer_no;
        this.t_parmlist.t_order=row.order_day;
      },
//      交易详情数据初始化
      transactionReset(){
        this.transactionDetailData=[];
        this.dialogVisible= false;
      },
//      选择查询方式
      queryType(value){
        if(value==1){
          this.isShow1=true;
          this.isShow2=false;
        }else {
          this.isShow1=false;
          this.isShow2=true;
        }
      },
      transactionOnSubmit(){
//        this.dialogVisible = true;
        this.$axios.get('/transctionPlanDetail',
          {params: {
          acct_no: this.t_parmlist.t_acct,
          customer_no: this.t_parmlist.t_no,
          id_no: this.t_parmlist.t_id,
          order_day:this.t_parmlist.t_order,
          startdate:this.startD,
          enddate:this.endD,
          acct_already:this.orderValue

        }})
          .then(response => {
            this.transactionDetailData = response.data;
          }).catch(error => { this.$message.error(error.message)}
        );
        console.log("日期"+this.startD);
        // this.editForm = Object.assign({}, row);
      },
      getDateParm(data){
        this.startD=data[0];
        this.endD=data[1];
      },
      //      分页显示
      handleSizeChange: function (size) {
        this.pagesize = size;
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
      },
      tableFormatter,
//导出详情
      exportExcel () {
        console.log("买马匹");
        var wb = XLSX.utils.table_to_book(document.querySelector('#tran_table'));
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '交易详情.xlsx')
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        return wbout
      }
    }

  }
</script>
<style lang="scss" scoped >
  .left {
    text-align: left;
    border: 1px dotted black;
    width: 50%;
  }
  .el-dialog-title {
    text-align: left;
  }
  .el-row{
    margin-bottom: 10px;
    margin-left: 50px;
  }
  .el-dialog > .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
    margin-bottom: 8px;
  }
</style>
