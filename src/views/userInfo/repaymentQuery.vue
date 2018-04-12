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
        id="first"
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
          prop="adv_val"
          label="放款金额"
          align="center"
          :formatter="tableFormatter">
        </el-table-column>
        <el-table-column
          prop="adv_date"
          label="放款时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="loan_trm"
          label="还款期数"
          align="center">
        </el-table-column>
        <el-table-column
          prop="rem_repays"
          label="剩余期数"
          align="center">
        </el-table-column>
        <el-table-column
          prop="already_order"
          label="已出账单"
          align="center">
        </el-table-column>
        <el-table-column
          prop="unpaid_bills"
          label="未出账单"
          align="center">
        </el-table-column>
        <!--隐藏传入数据-->
        <el-table-column
          v-if="false"
          prop="acct_no"
          label="用户账号"
          align="center">
        </el-table-column>
        <el-table-column
          v-if="false"
          prop="prod_code"
          label="产品编号"
          align="center">
        </el-table-column>
        <el-table-column
          v-if="false"
        prop="customer_no"
        label="客户号"
        align="center">
      </el-table-column>
        <el-table-column
          v-if="false"
          prop="application_number"
          label="进件号"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
          align="center">
          <template slot-scope="scope">
            <el-button @click="repaymentDetail(scope.$index, scope.row)" type="text" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <el-dialog
      title="详情列表"
      class="el-dialog-title"
      :visible.sync="td"
      width="70%"
    >
      <el-row :gutter="20">
        <el-col :span="4"><label>客户姓名</label></el-col>
        <el-col :span="4"><label >{{repaymentPlanDetailData.username}}</label></el-col>
        <el-col :span="4"><label>客户账号</label></el-col>
        <el-col :span="4"><label>{{repaymentPlanDetailData.acct_no}}</label></el-col>
        <el-col :span="4"><label>产品名称</label></el-col>
        <el-col :span="4"><label>{{repaymentPlanDetailData.prod_name}}</label></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><label>还款方式</label></el-col>
        <el-col :span="4"><label >{{repaymentPlanDetailData.repay_sched}}</label></el-col>
        <el-col :span="4"><label>贷款金额</label></el-col>
        <el-col :span="4"><label>{{repaymentPlanDetailData.adv_val|capitalize}}</label></el-col>
        <el-col :span="4"><label>剩余金额</label></el-col>
        <el-col :span="4"><label>{{repaymentPlanDetailData.loan_bal|capitalize}}</label></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><label>贷款期数</label></el-col>
        <el-col :span="4"><label>{{repaymentPlanDetailData.loan_trm}}</label></el-col>
        <el-col :span="4"><label>当前期数</label></el-col>
        <el-col :span="4"><label>{{repaymentPlanDetailData.current_loan_trm}}</label></el-col>
        <el-col :span="4"><label>逾期次数</label></el-col>
        <el-col :span="4"><label>{{repaymentPlanDetailData.arrears_ctr}}</label></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><label>贷款月利率</label></el-col>
        <el-col :span="4"><label >{{repaymentPlanDetailData.int_rate}}</label></el-col>
        <el-col :span="4"><label>费率</label></el-col>
        <el-col :span="4"><label>{{repaymentPlanDetailData.fee_rate_x}}</label></el-col>
        <el-col :span="4"><label>拖欠本金</label></el-col>
        <el-col :span="4"><label>{{repaymentPlanDetailData.unpd_prin_bal|capitalize}}</label></el-col>
      </el-row>

      <!--还款计划表-->
      <el-table
        :data="repaymentPlanDetailData.Repayment_plan_detail_list"
        border
        style="width: 100%"
        :summary-method="getSummaries"
        show-summary
      >
        <el-table-column
          prop="periods"
          label="期数"  align="center">
        </el-table-column>
        <el-table-column
          prop="repay_day"
          label="还款日"
          align="center">
        </el-table-column>
        <el-table-column
          prop="interest_days"
          label="计息天数"
          align="center">
        </el-table-column>
        <el-table-column
          prop="loan_balance"
          label="贷款余额"
          :formatter="tableFormatter"
          align="center">
        </el-table-column>
        <el-table-column
          prop="repayment_per_terminally"
          label="每期应还数"
          :formatter="tableFormatter"
          align="center">
        </el-table-column>
        <el-table-column
          prop="principal"
          label="本金"
          :formatter="tableFormatter"
          align="center">
        </el-table-column>
        <el-table-column
          prop="interest"
          label="利息"
          :formatter="tableFormatter"
          align="center">
        </el-table-column>
        <el-table-column
          prop="poundage"
          label="分期手续费"
          :formatter="tableFormatter"
          align="center">
        </el-table-column>
        <el-table-column
          prop="orig_aply_papl"
          label="优惠券"
          :formatter="tableFormatter"
          align="center">
        </el-table-column>
        <el-table-column
          prop="account_management_fee"
          label="账户管理费"
          :formatter="tableFormatter"
          align="center">
        </el-table-column>
        <el-table-column
          prop="orig_aply_papl"
          label="保险手续费"
          :formatter="tableFormatter"
          align="center">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
    <el-button @click="repaymentReset">取 消</el-button>
    <el-button type="primary" @click="repaymentReset">确 定</el-button>
  </span>
    </el-dialog>
  </section>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  import {fetch} from "../../reglue";
  import reglue from "../../reglue"
  import {tableFormatter}from '../../util/baseCalculate'
  //  import axios from 'axios'
  //  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  //  axios.defaults.baseURL = 'http://127.0.0.1:8084/glue';
  export default {
    components: {ElCol},
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
        custom_id:"",
        tableData: null,//还款数据
        repaymentPlanDetailData:{},//还款计划数,//编辑界面是否显示
        testdialog:false,
        dialogVisible: false,
        user_acct:null,
        td:false,
      };
    },
//    过滤器处理2位小数
    filters: {
      capitalize: function (value) {
        let num =parseFloat(value).toFixed(2);
        console.log(typeof num);
        return num;
      }
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
            this.custom_id=this.ruleForm2.identity;
            this.$axios.post('/repaymentPlanData',{
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
      //还款详情
      repaymentDetail(index, row) {
        this.td = true;
        this.$axios.get('/repaymentPlanDetail',{params:{
          customer_id:this.custom_id,
          customer_no:row.customer_no,
          acct_no:row.acct_no,
          prod_code:row.prod_code,
          application_number:row.application_number
        }})
          .then(response => {
            this.repaymentPlanDetailData = response.data[0];
          }).catch(error => { this.$message.error(error.message)}
        )
        console.log("详情")
        // this.editForm = Object.assign({}, row);
      },
//      还款详情数据初始化
      repaymentReset(){
        this.td=false;
       // console.log("测试"+this.dialogVisible);
        this.repaymentPlanDetailData={};
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
                let order= prev + curr;
                order=order;
                return order;
              } else {
                return prev;
              }
            }, 0);
            sums[1]='N/A';
            sums[2]='N/A';
            sums[3]='N/A';

          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      },
      tableFormatter
    }

  }
</script>
<style lang="scss" >
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
  }
</style>
