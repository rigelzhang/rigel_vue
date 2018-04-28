<template>
  <div>
  <el-form :model="reportText"  ref="reportText" label-width="80px" class="demo-ruleForm login-container">
    <el-col :span="18" offset="2"><div class="grid-content bg-purple location"></div>
    <el-form-item prop="sqlInput" label="sql语句" :disabled="true">
      <el-input type="textarea"
                :rows="5" v-model="sql" ></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="20" offset="1" ><div class="grid-content bg-purple"></div>
      </el-form-item>
    <el-form-item >
      <el-radio-group v-model="selectSql">
        <el-radio :label="1">在线客服</el-radio>
        <el-radio label="0">智能客服</el-radio>
      </el-radio-group>

      <el-button type="primary"  @click="open3">提交</el-button>
    </el-form-item>
    </el-col>
  </el-form>
    <el-col :span="22" offset="1">
  <el-table
    id="first"
    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    max-height="500"
    border
    style="width: 100%"
  >
      <el-table-column
      type="index"
      :index="indexMethod">
    </el-table-column>
      <el-table-column  v-for="(data,index) in tableKeys"
                        :key="index" :label="data" :prop="data">
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
  </div>
</template>
<script>

  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        sql:"",
        tableData:"",
        tableKeys:[],
        selectSql:1,
        currentPage:1,
        pagesize:20
      };
    },
    methods: {

      open3() {
        if(this.selectSql==1){
        this.$axios.post('/sqlAdmin',{
          sql_script:this.sql}).then(response => {
            for(let i =0;i< response.data.length;i++){
              if(response.data[i]!=null){
                for (let key in response.data[i]){
                      this.tableKeys.push(key);
                }
                console.log(this.tableKeys);
                break;

              }
           }
          this.tableData= response.data;
      }).catch(error => { this.$message.error(error.message)}
      )}
      else {
          this.$axios.post('/sqlAdminZnkf',{
            sql_script:this.sql}).then(response => {
            for(var i =0;i< response.data.length;i++){
            if(response.data[i]!=null){
              for (var key in response.data[i]){
                this.tableKeys.push(key);
              }
              console.log(this.tableKeys);
              break;
            }
          }
          this.tableData= response.data;
        }).catch(error => { this.$message.error(error.message)})
        }
      },
      //      分页显示
      handleSizeChange: function (size) {
        this.pagesize = size;
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
      },
    }

  }

</script>

<style lang="scss" scoped>
  .location{
    margin-top: 20px;
  }
  .el-button{
   margin-left: 65%;
  }
</style>
