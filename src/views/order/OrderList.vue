<template>
  <div class="body">
    <div class="body-header">
      <el-input style="margin-left: 0" size="medium" class="input-header" v-model="ordersn" placeholder="请输入采购单号"></el-input>
      <el-input size="medium"  class="input-header" v-model="persn" placeholder="请输入货主编码"></el-input>
      <el-input size="medium"  class="input-header" v-model="supsn" placeholder="请输入供应商编码"></el-input>
      <el-input size="medium"  class="input-header" v-model="goodssn" placeholder="请输入商品编码"></el-input>
      <el-input size="medium"  class="input-header" v-model="goodsname" placeholder="请输入商品名称"></el-input>
      <div class="detepiker">
        <el-date-picker
          v-model="value6"
          type="datetimerange"
          range-separator="至"
          style="width: 350px"
          start-placeholder="提交时间开始"
          end-placeholder="提交时间结束">
        </el-date-picker>
      </div>
      <el-button class="foot-upload" size="medium" type="primary" @click="setList">查询</el-button>
      <el-button size="medium"  icon="el-icon-plus" @click="linkto"></el-button>
    </div>
    <el-table
      :data="tableData"
      @row-click="linktoDes"
      :cell-style="cellStyle"
      :v-loading="loading"
      style="width: 100%">
      <el-table-column
        prop="no"
        label="采购单号"
        width="300">
      </el-table-column>
      <el-table-column
        prop="ownerMsg"
        label="货主信息">
      </el-table-column>
      <el-table-column
        prop="supplierMsg"
        label="供应商信息">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="商品种数">
      </el-table-column>
      <el-table-column
        prop="totalNum"
        label="商品总数量">
      </el-table-column>
      <el-table-column
        prop="totalMoney"
        label="总金额">
      </el-table-column>
      <el-table-column
        prop="submitDt"
        label="提交时间">
      </el-table-column>
      <el-table-column
        prop="arrivalDt"
        label="预计到货日期">
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 25, 50, 100]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { Loading } from 'element-ui';
  import moment from 'moment';
  export default {
    data() {
      return {
        ordersn:'',
        goodsname:'',
        persn:'',
        supsn:'',
        goodssn:'',
        loading: true,
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
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
          }]
        },
        value6: '',
        value7: '',
        currentPage4:1,
        pagesize:10,
        total:10,
        tableData: []
      }
    },
    mounted(){
      this.getList();
    },
    methods: {
      cellStyle({row, column, rowIndex, columnIndex}){
        if(columnIndex === 0 ){ //指定坐标
          return 'color:#EE82EE'
        }else{
          return ''
        }
      },
      getList(){
        Loading.service();
        let end = ''
        let start = ''
        if(this.value6){
           start = moment(this.value6[0]).format()
           end = moment(this.value6[1]).format()
        }
        let parms = {
          "conditions": {
            "codeLike": this.goodssn,
            "nameLike": this.goodsname,
            "noLike": this.ordersn,
            "ownerCodeLike": this.persn,
            "supplierCodeLike": this.supsn,
            "timeEnd": start,
            "timeStart": end
          },
          "pn": this.currentPage4,
          "ps": this.pagesize,
        }

        axios.post('/order/page', parms).then(res =>{
          this.total = res.tc
          this.tableData = res.datas
          let loadingInstance = Loading.service();
          this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
            // this.loading = false
          });
        })
      },
      handleSizeChange(val) {
        this.pagesize = val
        this.currentPage4 = 1
        this.getList();
      },
      setList(){
        this.currentPage4 = 1
        this.getList()
      },
      handleCurrentChange(val) {
        this.currentPage4 = val
        this.getList();
      },
      linkto(){
        this.$router.push('/addorder');
      },
      linktoDes(row){
        this.$router.push({path:'/orderdes',query:{no : row.no}});
      },
    },
  }
</script>

<style lang="scss" scoped>
  .color{

    .cell{
      color: yellow;
    }
  }
  .input-header{
    width: 130px;
    height: 60px;
    margin-left: 20px;
  }
  .foot-upload{
    margin-left: 10px;
  }
  .block{
    margin-top: 40px;
  }
  .detepiker{
    margin-left: 20px;
    display: inline-block;
  }

</style>
