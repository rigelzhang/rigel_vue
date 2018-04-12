<template>
  <el-form :model="reportText"  ref="reportText" label-width="80px" class="demo-ruleForm login-container">
    <h3 class="title">申报内容</h3>
    <el-form-item prop="operator_id" label="操作ID" :disabled="true">
      <el-input type="text" v-model="reportText.operatorId" ></el-input>
    </el-form-item>
    <el-form-item prop="orderNo" label="工单号" :disabled="true">
      <el-input type="text" v-model="reportText.orderNo" ></el-input>
    </el-form-item>
    <el-form-item prop="idNo"label="身份证号">
      <el-input type="text" v-model="reportText.idNo" ></el-input>
    </el-form-item>
    <el-form-item prop="caseOriginal"label="申报内容">
      <el-input type="textarea" v-model="reportText.caseOriginal" ></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary"  style="width:100%;" @click="open3" :loading="logining">申报</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>

  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        reportText: {
          operatorId: '',
          orderNo: '',
          idNo:'',
          caseOriginal:''
        },
        responseMessage:{},
        test:"我司你爸爸"
      };
    },

    mounted(){
        let str=location.href; //取得整个地址栏
        let num=str.indexOf("?");

        str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]

        var arr=str.split("&"); //各个参数放到数组里
      if(arr[0]!=null){
      let index1=arr[0].lastIndexOf("\=");
      this.reportText.operatorId=arr[0].substring(index1+1,arr[0].length);
      }
      if(arr[1]!=null){
      let index2=arr[1].lastIndexOf("\=");
      this.reportText.orderNo=arr[1].substring(index2+1,arr[1].length);}
      if(arr[2]!=null){
      let index3=arr[2].lastIndexOf("\=");
      this.reportText.idNo=arr[2].substring(index3+1,arr[2].length);}
      if(arr[3]!=null){
      let index4=arr[3].lastIndexOf("\=");
      this.reportText.caseOriginal=arr[3].substring(index4+1,arr[3].length);}
    },
    methods: {
      report(){},
      open3() {
        this.$axios.get('/anti_fraud_commit',{params:{
          operator_id: this.reportText.operatorId,
          orderNo:this.reportText.orderNo,
          idNo:this.reportText.idNo,
          caseOriginal:this.reportText.caseOriginal,
        }})
          .then(response => {
            this.responseMessage = response.data;
            if(this.responseMessage.code=="08"){
              this.$message({
                message: this.responseMessage.message,
                type: 'success'
              });
            }else {
              this.$message({
                message: this.responseMessage.message,
                type: 'warning'
              });
            }
            console.log(response.data);
          }).catch(error => { this.$message.error(error.message)}
        )
      },
    }

  }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 500px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
  }
</style>
