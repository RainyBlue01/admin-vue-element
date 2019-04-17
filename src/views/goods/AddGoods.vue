<template>
<div class="body">
  <div class="upload-body" v-if="shownext == false">
    <div class="upload-header">
      商品导入文件：
    </div>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="http://192.168.31.101:9494/web/v1/product/imports"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :limit = "limit"
      :file-list="fileList"
      :headers = "header"
      :on-success="handSuccess"
      :auto-upload="false">
      <el-button slot="trigger" class="upload-btn" size="small" >添加文件</el-button>
      <el-button class="linkbtn" size="small" type="primary"  @click="submitUpload">导入</el-button>
      <div slot="tip" style="display: inline-block;float: left;margin-top:0" class="el-upload__tip">提示：导入文件格式使用逗号分隔，每行一个商品；如：xxxx,xxxxx,100</div>
    </el-upload>
  </div>
  <div class="upload-next" v-if="shownext">
    <el-row class="next-header">
      <el-col :span="12"><div class="grid-content bg-purple filename">当前正在导入文件：{{content.filename}}</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple-light fileline">文件总行数：{{content.rowCont}}行，有效数据：{{content.row}} 行</div></el-col>
    </el-row>
    <div class="next-body">
      <div class="body-head">
        <div :class="[this.dialogVisible?'true cp':'trues cp']" @click="dialogVisible = true">正确数据：{{content.success}} 条</div>
        <div :class="[this.dialogVisible == false?'false cp':'falses cp']" @click="dialogVisible = false">错误数据：{{content.error}} 条</div>
      </div>
      <el-table
        v-if="dialogVisible"
        ref="multipleTable"
        :data="beans"
        tooltip-effect="dark"
        style="width: 100%"
        :default-sort = "{prop: 'status', order: 'descending'}"
        @selection-change="select">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="line"
          label="文件中行号"
          width="180">
        </el-table-column>
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
          prop="status"
          sortable
          label="状态">
        </el-table-column>
      </el-table>
      <el-table
        v-if="dialogVisible == false"
        :data="status"
        :default-sort = "{prop: 'nr', order: 'descending'}"
        style="width: 100%">
        <el-table-column
          type=""
          width="55">
        </el-table-column>
        <el-table-column
          prop="line"
          label="文件中行号">
        </el-table-column>
        <el-table-column
          prop="nr"
          label="原始数据">
        </el-table-column>
        <el-table-column
          prop="msg"
          sortable
          label="错误原因">
        </el-table-column>
      </el-table>
    </div>
    <div class="next-footer">
      <el-button class="foot-upload" size="medium" type="primary" v-on:click="addGoods">提交执行导入正确数据</el-button>
      <el-button class="foot-cancel" size="medium" v-on:click="cancol">取消</el-button>
    </div>
  </div>
</div>
</template>

<script>
    export default {
      data() {
        return {
          fileList: [],
          limit:1,
          beans:'',
          status:'',
          shownext:false,
          dialogVisible:true,
          content:'',
          suc:[],
          header:{"X-Session-Token":"123"},
          tableData: []
        };
      },
      methods: {
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
        handSuccess(response){
          let num  = response.content.beans
          let a = []
          num.map(v=>{
            let b = v
            if(v.status == 1){
              b.status = '新增'
            }else{
              b.status = '更新'
            }
            a.push(b)
          })
          console.log(a)
          this.content = response.content
          this.beans = a
          this.status = response.content.status
          this.shownext = true
        },
        submitUpload() {
          this.$refs.upload.submit();
        },
        toggleSelection(rows) {
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row);
            });
          } else {
            this.$refs.multipleTable.clearSelection();
          }
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        cancol(){
          this.shownext = false
        },
        select(selection){
          let num  = selection
          let a = []
          num.map(v=>{
            let b = v
            if(v.status == '新增'){
              b.status = 1
            }else{
              b.status = 2
            }
            a.push(b)
          })
          console.log(a)
          this.suc = a
          console.log(selection)
        },
        addGoods(){
          axios.post('/product/lead', this.suc).then(res =>{
            this.$router.push('/goodslist');
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
.upload-body{
  margin-left: 200px;
  position: relative;
  .upload-header{
    width: 160px;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    font-weight: 700;
    display: inline-block;
    position: absolute;
  }
  .upload-demo{
    margin-left: 165px;
    width: 800px;
    height: 100px;
    line-height: 50px;
    display: inline-block;
    .upload-btn{
      width: 80px;
      height: 30px;
      margin-left: 10px;
    }
  }
}
.upload-next{
  width: 100%;
  text-align:center;
  .next-header{
    width: 100%;
    height: 50px;
    .filename{
      margin-left: 20px;
      display: inline-block;
      width: 500px;
      height: 50px;
      line-height: 50px;
      font-size: 20px;
      font-weight: 700;
    }
    .fileline{
      display: inline-block;
      width: 500px;
      height: 50px;
      line-height: 50px;
      font-size: 20px;
      font-weight: 700;
    }
  }
}
.linkbtn{
  position: absolute;
    right: 390px;
  top: 10px;

}
  .next-body{
    margin-top: 20px;
    text-align:center;
    .body-head{
      width: 400px;
      height: 40px;
      .true{
        width: 200px;
        height: 40px;
        line-height: 40px;
        display: inline-block;
        font-size: 16px;
      }
      .trues{
        width: 200px;
        height: 40px;
        line-height: 40px;
        display: inline-block;
        font-size: 16px;
        background-color: 		#FFF5EE;
      }
      .false{
        width: 200px;
        height: 40px;
        line-height: 40px;
        display: inline-block;
        font-size: 16px;
      }
      .falses{
        width: 200px;
        height: 40px;
        line-height: 40px;
        display: inline-block;
        font-size: 16px;
        background-color: 		#FFF5EE;
      }
    }
  }
.next-footer{
  margin-top: 40px;
  .foot-upload{
    margin-right: 40px;
  }
}
  .cp{
    cursor: pointer;
  }
</style>
