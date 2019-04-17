<template>
<div class="body">
  <div style="width: 100%;height: 50px;">
    <el-button class="foot-upload" size="medium" type="primary" @click="link">保存</el-button>
  </div>
  <el-row style="margin-top: 10px;">
    <el-col :span="12">
      <div class="grid-content bg-purple ">
        <div class="num">订单号：</div>
        <el-input size="medium" class="input-header" v-model="sn" placeholder="请输入商品编码"></el-input>
      </div>
    </el-col>
    <el-col :span="12"><div class="grid-content bg-purple-light ">
      <div class="num">预计到货日期：</div>
      <el-date-picker
        v-model="value1"
        type="date"
        size="medium"
        class="input-header"
        placeholder="选择日期">
      </el-date-picker>
      <!--<el-input    v-model="sn" placeholder="请输入商品编码"></el-input>-->
    </div></el-col>
  </el-row>
  <el-row style="margin-top: 10px;">
    <el-col :span="12">
      <div class="grid-content bg-purple ">
        <div class="num">货主编码：</div>
        <el-input  size="medium" class="input-header" v-model="ownercode" placeholder="请输入商品编码"></el-input>
      </div>
    </el-col>
    <el-col :span="12"><div class="grid-content bg-purple-light ">
      <div class="num">供应商编码：</div>
      <el-input  size="medium" class="input-header" v-model="supcode" placeholder="请输入商品编码"></el-input>
    </div></el-col>
  </el-row>
  <el-row style="margin-top: 10px;">
    <el-col :span="12">
      <div class="grid-content bg-purple ">
        <div class="num">货主名称：</div>
        <el-input  size="medium" class="input-header" v-model="ownername" placeholder="请输入商品编码"></el-input>
      </div>
    </el-col>
    <el-col :span="12"><div class="grid-content bg-purple-light ">
      <div class="num">供应商名称：</div>
      <el-input  size="medium" class="input-header" v-model="supname" placeholder="请输入商品编码"></el-input>
    </div></el-col>
  </el-row>
  <el-row style="margin-top: 10px;">
    <el-col :span="12">
      <div class="grid-content bg-purple ">
        <div class="num">采购总数量：</div> <span style="font-size: 18px">{{allNum}}</span>
      </div>
    </el-col>
    <el-col :span="12"><div class="grid-content bg-purple-light ">
      <div class="num">采购总金额：</div><span style="font-size: 18px">{{allPrice}}</span>
    </div></el-col>
  </el-row>
  <div class="goods-list">
    <div class="add-header">
      <el-button class="add-goods" size="medium" type="primary" @click="add">添加商品</el-button>
    </div>
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
        label="商品名称"
        width="120">
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
        width="300">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDel(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog width="50%" :visible.sync="dialogVisible" :before-close="clear">
      <el-form :model="form" >
        <el-form-item  >
          <div class="num-goods">商品：</div>
          <el-select v-model="region" placeholder="请选择商品名">
            <el-input v-on:input="getGoods"  v-model="des"></el-input>
            <el-option v-for="good in goodslist"  :value="good.name">
              <div  @click="checkPri(good)">{{good.name}}</div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item  >
          <div class="num-goods">商品价格：</div>
          <span>￥{{price.price}}</span>
        </el-form-item>
        <el-form-item >
          <div class="num-goods">采购数量：</div>
          <el-input class="drop-me" v-model="num" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button  type="primary" @click="addGoods">添加</el-button>
      </div>
    </el-dialog>
  </div>
</div>
</template>

<script>
  import moment from 'moment';
    export default {
        data(){
          return{
            value1:'',
              name: '',
            form:{

            },
              region: '',
              num:'',
              des:'',
            price:'',
            allNum:'',
            allPrice:'',
            sn:'',
            ownercode:'',
            ownername:'',
            supcode:'',
            supname:'',
            dialogVisible:false,
            goodslist:[],
            tableData: [],
            type : 0
          }
        },
      mounted(){
        this.getList();
      },
      methods: {
          add(){
            this.dialogVisible = true
            this.type = 1
            this.region = this.goodslist[0].name
            this.price = this.goodslist[0]
            this.num = 1
          },
          getGoods(){
            let parms = {
              "conditions": {
                "nameLike": this.des
              },
              "pn": 1,
              "ps": 9999,
            }
            axios.post('/product/page', parms).then(res =>{
              if(res.datas.length == 0){
                this.$confirm('无法找到数据, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  showCancelButton:false,
                  type: 'warning'
                }).then(() => {
                }).catch(() => {
                });
                this.getList()
                this.des = ''
              }else{
                this.goodslist = res.datas
              }

            })
          },
        getList(){
          axios.post('orderDetail/query').then(res =>{
            this.goodslist = res
          })
        },
        handleClick(row) {
          this.dialogVisible = true
          this.region = row.name
          this.num = row.num
          this.price = row
          console.log(row);
        },
        handleDel(row){
          this.tableData.map((v,index)=>{
            if(v.name == row.name){
              this.tableData.splice(index,1)
            }
          })
        },
        checkPri(good){
          this.price = good
          this.des = ''
          this.getList()
        },
        link(){
          let date = moment(this.value1).format();
          var now = moment().format();
          let parms = {
            "arrivalDt": date,
            "no": this.sn,
            "orderDetailSaveVos":  this.tableData ,
            "ownerCode": this.ownercode,
            "ownerName": this.ownername,
            "supplierCode": this.supcode,
            "supplierName": this.supname,
            "totalMoney": this.allPrice,
            "totalNum": this.allNum,
            "submitDt": now,
          }
          console.log(parms)
          axios.post('order/save',parms).then(res =>{
            this.$router.push('/orderlist');
          })
        },
        addGoods(){
          let a = this.price
            a.orderId = this.price.id
            a.productCode = this.price.code
            a.productName = this.price.name
          if (this.tableData.length !== 0){
            for(var i = 0;i<this.tableData.length;i++){
              if(this.tableData[i].productName == a.productName){
                if(this.type == 1){
                  a.num = Number(this.tableData[i].num) + Number(this.num)
                  console.log(a)
                }else{
                  a.num = Number(this.num)
                }
              }
            }
          }else{
            a.num = Number(this.num)
          }
          a.totalPrices =  Number(this.price.price) * a.num
          this.tableData.map((v,index)=>{
            if(v.productName == this.region){
                this.tableData.splice(index,1)
            }
          })
            this.tableData.push(a)

          this.dialogVisible = false
          this.getAll()
          this.clear()
        },
        getAll(){
          let a = 0
          let b = 0
          this.tableData.map(v=>{
            a = Number(v.num) + a
            b = v.totalPrices + b
          })
          this.allNum = a
          this.allPrice = b
        },
        clear(){
          this.region = ''
          this.num = ''
          this.price = ''
          this.type = 0
          this.dialogVisible = false
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
