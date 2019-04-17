<template>
  <div class="body">
    <div style="width: 100%;height: 50px;">
      <el-button class="foot-upload" size="medium" type="primary" @click="link">编辑</el-button>
    </div>
    <el-row style="margin-top: 10px;">
      <el-col :span="12">
        <div class="grid-content bg-purple ">
          <div class="num">订单号：</div>
          <span style="font-size: 18px">{{datas.no}}</span>
        </div>
      </el-col>
      <el-col :span="12"><div class="grid-content bg-purple-light ">
        <div class="num">预计到货日期：</div>
        <span style="font-size: 18px">{{datas.arrivalDt}}</span>
        <!--<el-input    v-model="sn" placeholder="请输入商品编码"></el-input>-->
      </div></el-col>
    </el-row>
    <el-row style="margin-top: 10px;">
      <el-col :span="12">
        <div class="grid-content bg-purple ">
          <div class="num">货主：</div>
          <span style="font-size: 18px">{{datas.ownerCode}} / {{datas.ownerName}}</span>
        </div>
      </el-col>
      <el-col :span="12"><div class="grid-content bg-purple-light ">
        <div class="num">供应商：</div>
        <span style="font-size: 18px">{{datas.supplierCode}} / {{datas.supplierName}}</span>
      </div></el-col>
    </el-row>
    <el-row style="margin-top: 10px;">
      <el-col :span="12">
        <div class="grid-content bg-purple ">
          <div class="num">采购总数量：</div> <span style="font-size: 18px">{{datas.totalNum}}</span>
        </div>
      </el-col>
      <el-col :span="12"><div class="grid-content bg-purple-light ">
        <div class="num">采购总金额：</div><span style="font-size: 18px">{{datas.amount}}</span>
      </div></el-col>
    </el-row>
    <div class="goods-list">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="productCode"
          label="商品编码"
          width="150">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          width="120">
        </el-table-column>
        <el-table-column
          prop="num"
          label="采购数量"
          width="120">
        </el-table-column>
        <el-table-column
          prop="totalPrices"
          label="总金额"
          width="120"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { Loading } from 'element-ui';
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      },
      link(){
        this.$router.push({path:'/setorder',query:{no : this.$route.query.no}});
      },
      getList(){
        axios.post('orderDetail/look/'+ this.$route.query.no ).then(res =>{
          console.log(res)
          this.datas = res
          this.tableData = res.orderDetailVoList
          let loadingInstance = Loading.service();
          this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
        })
    }
    },
    mounted(){
      Loading.service();
      this.getList();
    },
    data(){
      return{
        value1:'',
        datas:'',
        form: {
          name: '',
          region: '',
          num:'',
          des:''
        },
        dialogVisible:false,
        tableData: [],
        loading: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .foot-upload{
    float: right;
  }
  .num{
    width: 140px;
    text-align: right;
    font-size: 18px;
    font-weight: 700;
    display: inline-block;
  }
  .input-header{
    width: 300px;
  }
  .add-header{
    width: 100%;
    height: 50px ;
    margin: {
      top: 30px;
      left: 10px;
    }
  }
  .body-dia{
    .nums{
      width: 100px;
      height: 40px;
      display: inline-block;
      text-align: right;
      line-height: 40px;
      font-size: 18px;
      font-weight: 700;
    }
    .link-border{
      width: 200px;
      display: inline-block;
      height: 40px;
      text-align: center;
      line-height: 40px;
    }

  }
  .goods-list{
    margin-top: 20px;
  }
  .drop-me{
    width: 200px;
  }
  .num-goods{
    width: 40%;
    height: 40px;
    line-height: 40px;
    text-align: right;
    display: inline-block;
    font-weight: 700;
  }
</style>
