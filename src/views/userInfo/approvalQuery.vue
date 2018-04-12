<template>
  <section>
    <!--查询表单-->
    <el-col :span="8" offset="1" style="padding-bottom: 0px; margin-top:30px;">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <!--开始自我验证-->
        <el-form-item label="选择时间" prop="date">
          <el-col :span="11">
          <el-date-picker type="date"  v-model="ruleForm2.date" value-format="yyyy-MM-dd" ></el-date-picker>
          </el-col>
        </el-form-item>
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
          prop="mobile"
          label="手机号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="customer_id"
          label="身份证号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="proc_status"
          label="贷款申请状态"
          align="center">
        </el-table-column>
        <el-table-column
          prop="mcht_name"
          label="贷款来源"
          align="center">
        </el-table-column>
        <el-table-column
          prop="apply_amt"
          label="贷款金额"
          align="center">
        </el-table-column>
        <el-table-column
          prop="loan_amt"
          label="审批金额"
          align="center">
        </el-table-column>
        <el-table-column
          prop="loan_no"
          label="贷款账号"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
          align="center">
          <template slot-scope="scope">
            <el-button @click="approvalDetail(scope.$index, scope.row)" type="text" size="small">详情</el-button>

          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <!--审批详情-->

    <el-dialog
      title="详情列表"
      class="el-dialog-title"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="70%"
    >
      <el-row :gutter="20">
        <!-- 第一行 -->
        <el-col :span="4"><label>客户姓名</label></el-col>
        <el-col :span="4"><label >{{approvalProgressDetailData .username}}</label></el-col>
        <el-col :span="4"><label>身份证号</label></el-col>
        <el-col :span="4"><label>{{approvalProgressDetailData.customer_id}}</label></el-col>
        <el-col :span="4"><label>贷款账号</label></el-col>
        <el-col :span="4"><label>{{approvalProgressDetailData.loan_no}}</label></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><label>交易日期</label></el-col>
        <el-col :span="4"><label >{{approvalProgressDetailData.create_time_date}}</label></el-col>
        <el-col :span="4"><label>交易时间</label></el-col>
        <el-col :span="4"><label>{{approvalProgressDetailData.create_time}}</label></el-col>
        <el-col :span="4"><label>贷款来源</label></el-col>
        <el-col :span="4"><label>{{approvalProgressDetailData.mcht_name}}</label></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><label>贷款申请状态</label></el-col>
        <el-col :span="4"><label>{{approvalProgressDetailData.proc_status|procCode}}</label></el-col>
        <el-col :span="4"><label>贷款手机号码</label></el-col>
        <el-col :span="4"><label>{{approvalProgressDetailData.mobile}}</label></el-col>
        <el-col :span="4"><label>用户手机号码</label></el-col>
        <el-col :span="4"><label>{{approvalProgressDetailData.mobilephone1}};{{approvalProgressDetailData.mobilephone2}}</label></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><label>贷款金额</label></el-col>
        <el-col :span="4"><label >{{approvalProgressDetailData.apply_amt}}</label></el-col>
        <el-col :span="4"><label>审批金额</label></el-col>
        <el-col :span="4"><label>{{approvalProgressDetailData.loan_amt}}</label></el-col>
        <el-col :span="4"><label>放款金额</label></el-col>
        <el-col :span="4"><label>{{approvalProgressDetailData.allocation_amt}}</label></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><label>还款期数</label></el-col>
        <el-col :span="4"><label >{{approvalProgressDetailData.loan_periods}}</label></el-col>
        <el-col :span="4"><label>每期还款金额</label></el-col>
        <el-col :span="4"><label>{{approvalProgressDetailData.each_repay_money}}</label></el-col>
        <el-col :span="4"><label>还款方式</label></el-col>
        <el-col :span="4"><label>{{approvalProgressDetailData.repay_type_name}}</label></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><label>贷款用途</label></el-col>
        <el-col :span="4"><label >{{approvalProgressDetailData.loan_purpose_desc}}</label></el-col>
        <el-col :span="4"><label>银行卡号</label></el-col>
        <el-col :span="4"><label>{{approvalProgressDetailData.debitcustomer_id}}</label></el-col>
        <el-col :span="4"><label>开户行</label></el-col>
        <el-col :span="4"><label>{{approvalProgressDetailData.debitcard_openbank_name}}</label></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><label>审批时间</label></el-col>
        <el-col :span="4"><label >{{approvalProgressDetailData.approval_date}}</label></el-col>
        <el-col :span="4"><label>放款时间</label></el-col>
        <el-col :span="4"><label>{{approvalProgressDetailData.loan_time}}</label></el-col>
        <el-col :span="4"><label>产品名称</label></el-col>
        <el-col :span="4"><label>{{approvalProgressDetailData.prod_name}}</label></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><label>进件编号</label></el-col>
        <el-col :span="4"><label >{{approvalProgressDetailData.application_number}}</label></el-col>
        <el-col :span="4"><label>渠道名称</label></el-col>
        <el-col :span="4"><label>{{approvalProgressDetailData.mcht_name_qudao}}</label></el-col>

      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="approvalReset">取 消</el-button>
    <el-button type="primary" @click="approvalReset">确 定</el-button>
  </span>
    </el-dialog>
  </section>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";

  import reglue from "../../reglue"
 import {procCode}from '../../util/baseCalculate'
  //  import axios from 'axios'
  //  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  //  axios.defaults.baseURL = 'http://127.0.0.1:8084/glue';
  export default {
    data() {
      // 验证名字正则表达式
      var validateDate=(rule,value,callback)=>{
        var regExp=/^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
        if(value===null){
          callback();
        }else if (regExp.test(value)===false){
          console.log(value)
          callback(new Error("请输入正确的日期"))
        }else {
          callback();
        }
      }
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
          date:null
        },
        rules2: {
          identity:[{validator:validateIdentity,trigger:'blur'}] ,
          phone:[{
            validator:validateTel,trigger:'blur'}],
          name:[{
            validator:validateName,trigger:'blur'}],
          date:[{validator:validateDate,trigger:'blur'}]
        },
        tableData: null,//审批进度
        approvalProgressDetailData:{   //审批详情
//          bankcardList:[],
//          CurrentThreeAccountMessage:[]
        },//编辑界面是否显示
        testdialog:false,
        dialogVisible: false,
        user_acct:null
      };
    },
    filters:{
      procode:procCode
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
            this.$axios.post('/approvalProgressData',{
              mobile:this.ruleForm2.phone,
              customer_id:this.ruleForm2.identity,
              username:this.ruleForm2.identity,
              create_time:this.ruleForm2.date
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
      //审批详情
      approvalDetail(index, row) {
        this.dialogVisible = true;
        this.$axios.get('/approvalProgressDetail',{params: {
          mobile: this.ruleForm2.phone,
          customer_id: this.ruleForm2.identity,
          username: this.ruleForm2.identity,
          loan_no: row.loan_no,
        } })
          .then(response => {
            this.approvalProgressDetailData = response.data[0];

          }).catch(error => { this.$message.error(error.message)}
        )
        console.log("详情")
        // this.editForm = Object.assign({}, row);
      },
//      用户数据初始化
      approvalReset(){
        this.approvalProgressDetailData={};
        this.dialogVisible= false;
      },
    }

  }
</script>
<style lang="scss" scoped>
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
  .el-col-11{
    width: 100%;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100%;
  }
</style>
