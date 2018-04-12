<template>
  <section>
    <!--查询表单-->
  <el-col :span="8" offset="1" style="padding-bottom: 0px; margin-top:30px;">
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="客户姓名" prop="name">
      <el-input type="text" v-model="ruleForm2.name"  :change="setName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="ruleForm2.phone" :change="setMoible" type="tel"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码" prop="identity">
        <el-input v-model="ruleForm2.identity" :change="setIdNo" ></el-input>
      </el-form-item>
      <!--开始自我验证-->

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
        prop="customer_no"
        label="客户号"
        align="center">
      </el-table-column>
      <el-table-column
        prop="acct_no"
        label="贷款账号"
        align="center">
      </el-table-column>
        <el-table-column
          prop="prod_name"
          label="产品名称"
          align="center">
      </el-table-column>
        <el-table-column
          prop="allocation_amt"
          label="贷款金额"
          align="center">
        </el-table-column>
      <el-table-column
        label="操作"
        width="100"
        align="center">
        <template slot-scope="scope">
          <el-button @click="userDetail(scope.$index, scope.row)" type="text" size="small">详情</el-button>
          <el-button type="text" @click="square(scope.$index, scope.row)" size="small">结清</el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-col>

    <!--编辑界面-->

    <el-dialog
      title="详情列表"
      class="el-dialog-title"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="70%"
    >
      <el-row :gutter="20">
        <el-col :span="4"><label>客户姓名</label></el-col>
        <el-col :span="4"><label >{{uerInfo.username}}</label></el-col>
        <el-col :span="4"><label>手机号</label></el-col>
        <el-col :span="4"><label>{{uerInfo.mobile}}</label></el-col>
        <el-col :span="4"><label>身份证号</label></el-col>
        <el-col :span="4"><label>{{uerInfo.customer_id}}</label></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><label>贷款账号</label></el-col>
        <el-col :span="4"><label >{{uerInfo.loan_acct_no}}</label></el-col>
        <el-col :span="4"><label>客户号</label></el-col>
        <el-col :span="4"><label>{{uerInfo.customer_no}}</label></el-col>
        <el-col :span="4"><label>账户状态</label></el-col>
        <el-col :span="4"><label>{{uerInfo.stat|puserCode}}</label></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><label>产品名称</label></el-col>
        <el-col :span="4"><label>{{uerInfo.prod_name}}</label></el-col>
        <el-col :span="4"><label>办理渠道</label></el-col>
        <el-col :span="4"><label>{{uerInfo.mcht_name}}</label></el-col>
        <el-col :span="4"><label>办理时间</label></el-col>
        <el-col :span="4"><label>{{uerInfo.create_time}}</label></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><label>申请金额</label></el-col>
        <el-col :span="4"><label >{{uerInfo.apply_amt}}</label></el-col>
        <el-col :span="4"><label>授信金额</label></el-col>
        <el-col :span="4"><label>{{uerInfo.loan_amt}}</label></el-col>
        <el-col :span="4"><label>放款金额</label></el-col>
        <el-col :span="4"><label>{{uerInfo.allocation_amt}}</label></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><label>可用金额</label></el-col>
        <el-col :span="4"><label >{{uerInfo.availableMoney}}</label></el-col>
        <el-col :span="4"><label>账单日</label></el-col>
        <el-col :span="4"><label>{{uerInfo.statement_Date}}</label></el-col>
        <el-col :span="4"><label>还款日</label></el-col>
        <el-col :span="4"><label>{{uerInfo.payment_Due_Day}}</label></el-col>
      </el-row>
      <el-row :gutter="20">
      <el-col :span="4"><label>放款时间</label></el-col>
      <el-col :span="4"><label >{{uerInfo.update_time}}</label></el-col>
      <el-col :span="4"><label>贷款期数</label></el-col>
      <el-col :span="4"><label>{{uerInfo.loan_periods}}</label></el-col>
      <el-col :span="4"><label>费率</label></el-col>
      <el-col :span="4"><label>{{uerInfo.fee_rate2}}</label></el-col>
      </el-row>
      <!--绑定的银行卡-->
      <div class="outline">
        <el-tag hit="true">绑定的银行卡</el-tag>
      <el-table
        :data="uerInfo.bankcardList"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="ext_cardno"
          label="银行卡"  align="center">
        </el-table-column>
        <el-table-column
          prop="ext_bank_name"
          label="开户行"
          align="center">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="开户时间"
          align="center">
        </el-table-column>
      </el-table>
      </div>
      <!--近三期账单-->
      <div class="outline">
        <el-tag hit="true">近三期账单</el-tag>
      <el-table
        :data="uerInfo.CurrentThreeAccountMessage"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="bill_date"
          label="账单日"  align="center">
        </el-table-column>
        <el-table-column
          prop="repay_date"
          label="还款日"
          align="center">
        </el-table-column>
        <el-table-column
          prop="total"
          label="合计"
          align="center">
        </el-table-column>
      <el-table-column
        prop="principal"
        label="本金"
        align="center">
      </el-table-column>
      <el-table-column
        prop="interest"
        label="利息"
        align="center">
      </el-table-column>
      <el-table-column
        prop="fee"
        label="手续费"
        align="center">
      </el-table-column>
      <el-table-column
        prop="penalty"
        label="滞纳金"
        align="center">
      </el-table-column>
      </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="userReset">取 消</el-button>
    <el-button type="primary" @click="userReset">确 定</el-button>
  </span>
    </el-dialog>
    <!--结清-->
    <el-dialog
      title="付清计算"
      :visible.sync="SdialogVisible"
      class="el-dialog-title"
      :gutter="24"
      width="70%"
     >
      <el-row :gutter="20">
        <el-form ref="form" :model="SForm" label-width="100px" size="small">
          <el-form-item label="结清日期">
            <el-col :span="10">
              <el-date-picker type="date" placeholder="选择日期" v-model="squerValue" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col :span="4"><el-button type="primary" @click="squerOnSubmit">查询</el-button></el-col>
          </el-form-item>
        </el-form>
        <div class="outline">
          <el-tag hit="true">提前结清</el-tag>
          <el-table
          :data="squerVualeDetail"
          border="2px"
          style="width: 100%"
          label="结清费用"
        >
          <el-table-column
            prop="currentDate"
            label="日期"  align="center">
          </el-table-column>
          <el-table-column
            prop="total"
            label="合计"
            align="center">
          </el-table-column>
          <el-table-column
            prop="Early_settlement_fee"
            label="提前结清费用"
            align="center">
          </el-table-column>
          <el-table-column
            prop="po_loan_bal"
            label="本金"
            align="center">
          </el-table-column>
          <el-table-column
            prop="po_interest"
            label="利息"
            align="center">
          </el-table-column>
          <el-table-column
            prop="po_penalty"
            label="手续费"
            align="center">
          </el-table-column>
          <el-table-column
            prop="po_fee"
            label="滞纳金"
            align="center">
          </el-table-column>
        </el-table>
        </div>
      </el-row>
       <span slot="footer" class="dialog-footer">
    <el-button @click="squerReset">取 消</el-button>
    <el-button type="primary" @click="squerReset">确 定</el-button>
  </span>
    </el-dialog>
  </section>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  import {fetch} from "../../reglue";
  import reglue from "../../reglue"
  import {userInfo} from '../../util/baseCalculate'

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
        phoneI:"",
        tableData: null,
        uerInfo:{   //用户数据
//          bankcardList:[],
//          CurrentThreeAccountMessage:[]
        },//编辑界面是否显示
        testdialog:false,
        dialogVisible: false,
        SdialogVisible:false,    //结清界面
        squerValue:"",  //结清日期
        squerVualeDetail:"",//结清返回数据
        user_acct:null
      };
    },
    filters:{
      puserCode:userInfo
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
            this.$axios.post('/customerInfoData',{
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
            return false;
          }
        });
      },
      //重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //用户详情
      userDetail(index, row) {
        this.dialogVisible = true;
        this.$axios.get('/customerInfoDetail',{params:{
          customer_id:row.customer_id,
          customer_no:row.customer_no,
          acct_no:row.acct_no
        }
        })
          .then(response => {
            this.uerInfo = response.data[0];
            console.log("返回值"+response.data[0].bankcardList);
          }).catch(error => { this.$message.error(error.message)}
        )
        console.log("详情")
       // this.editForm = Object.assign({}, row);
      },
//      用户数据初始化
      userReset(){
        this.uerInfo=[];
        this.dialogVisible= false;
      },
      square(index,row){
        console.log("结清");
        this.user_acct=row.acct_no;
        this.SdialogVisible = true;
      },

      squerOnSubmit(){//      结清提交
        console.log();
        this.$axios.get('/customerSettleDetail',{params:{
          loan_Date:this.squerValue,
          acct_no:this.user_acct
        }})
          .then(response => {
            this.squerVualeDetail = response.data;
            console.log("返回值"+response.data);
          }).catch(error => { this.$message.error(error.message)}
        )
      },
//   结清数据初始化
    squerReset(){
        this.squerVualeDetail=[];
        this.SdialogVisible=false;
    }
    }

  }
</script>
<style lang="scss" scoped>
.outline{
  background-color: floralwhite;
  margin-bottom: 5px;
  /*border: dashed;*/
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
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
