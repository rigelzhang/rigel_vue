<template>
  <div id="dateQuery">
    <div class="block">
      <span class="demonstration"></span>
      <el-date-picker
        v-model="value1"
        type="daterange"
        align="right"
        @change="getdate"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        :picker-options="pickerOptions2">
      </el-date-picker>
    </div>
  </div>

</template>
<script>
  export default {
    name:'dateQuery',
    props:['rangeDate'],
    data() {
      return {
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {

              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
              console.log("value1是"+this.value1);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }],

        },
        value1:'',
        counter:0
      };
    },
    methods:{
      getdate() {
       this.$emit('transferUser',this.value1);
      },
    }
  };
</script>
