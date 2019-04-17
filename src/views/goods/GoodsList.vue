<template>
<div class="body">
  <div class="body-header">
    <el-input  size="medium" class="input-header" v-model="sn" placeholder="请输入商品编码"></el-input>
    <el-input size="medium"  class="input-header" v-model="name" placeholder="请输入商品名称"></el-input>
    <el-button @click="setList" class="foot-upload" size="medium" type="primary">查询</el-button>
  </div>
  <el-table
    :data="tableData"
    :v-loading="loading"
    style="width: 100%">
    <el-table-column
      prop="code"
      label="商品编码">
    </el-table-column>
    <el-table-column
      prop="name"
      label="商品名称">
    </el-table-column>
    <el-table-column
      prop="price"
      label="价格">
    </el-table-column>
    <el-table-column
      prop="loadDt"
      label="导入时间">
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

    export default {
      data() {
        return {
          sn:'',
          name:'',
          currentPage4:1,
          pagesize:10,
          total:10,
          tableData: [],
          loading: true
        }
      },
      mounted(){
       this.getList();
      },
      methods: {
        getList(){
          Loading.service();
          let parms = {
            "conditions": {
              "codeLike": this.sn,
              "nameLike": this.name
            },
            "pn": this.currentPage4,
            "ps": this.pagesize,
          }
          axios.post('/product/page', parms).then(res =>{
            this.total = res.tc
            this.tableData = res.datas
            let loadingInstance = Loading.service();
            this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
              loadingInstance.close();
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
      },
    }
</script>

<style lang="scss" scoped>
.input-header{
  width: 400px;
  height: 60px;
  margin-left: 40px;
}
  .foot-upload{
    margin-left: 30px;
  }
  .block{
    margin-top: 40px;
  }
</style>
