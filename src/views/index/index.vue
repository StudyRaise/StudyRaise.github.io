<template>
  <div class="layout_index">
    <div class="search_content">
      <div>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>检查号：</span>
            <el-input
              v-model="searchForm['检查号']"
              placeholder="请输入内容"
              style="width: 60%"
              clearable
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>姓名：</span>
            <el-input
              v-model="searchForm['姓名']"
              placeholder="请输入内容"
              style="width: 60%"
              clearable
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>姓名首拼：</span>
            <el-input
              v-model="searchForm['namepy']"
              placeholder="请输入内容"
              style="width: 60%"
              clearable
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>性别：</span>
            <el-select
              v-model="searchForm['sex']"
              placeholder="请选择"
              style="width: 60%"
              clearable
            >
              <el-option
                v-for="item in ['男', '女']"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
      </div>
      <div style="margin-top: 76px">
        <el-button type="primary" size="medium" @click="clickSearch"
          >搜索</el-button
        >
        <!-- <el-button type="danger" size="medium" @click="clickReset"
          >重置</el-button
        > -->
      </div>
    </div>
    <div class="table_content">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        max-height="630px"
        v-loading="loading"
      >
        <el-table-column prop="检查号" label="检查号" min-width="140">
        </el-table-column>
        <el-table-column
          prop="姓名"
          label="姓名"
          min-width="100"
          align="center"
        ></el-table-column>
        <el-table-column prop="sex" label="性别" min-width="60" align="center">
        </el-table-column>
        <el-table-column
          prop="年龄"
          label="年龄"
          min-width="60"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="chekitem"
          label="检查类型"
          min-width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="送检科室"
          label="送检科室"
          min-width="160"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="检查医师"
          label="检查医生"
          min-width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="检查日期"
          label="检查日期"
          min-width="140"
          align="center"
        ></el-table-column>
        <el-table-column label="详细信息" min-width="200" align="center">
          <template slot-scope="scope">
            <el-button
              @click="getCheckPatRep(scope.row, scope.$index)"
              type="primary"
              size="mini"
              >报告</el-button
            >

            <!-- <el-button
              @click="getCheckPatPdf(scope.row, scope.$index)"
              type="primary"
              size="mini"
              >PDF</el-button
            > -->
            <el-button
              type="primary"
              size="mini"
              @click="getCheckPatImg(scope.row)"
              >图像</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div id="pageStyle" style="margin-top: 16px; text-align: right">
        <pagination-cpn
          :pageTotal="pageTotal"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
        ></pagination-cpn>
      </div>
    </div>
    <!-- 临时报告 -->
    <el-dialog :visible.sync="ReportDialog" width="1000px">
      <div id="reportBox">
        <dialog-bar :rowData="rowData" :key="rowNum"></dialog-bar>
      </div>
    </el-dialog>

    <!-- 检查图像 -->
    <el-dialog title="检查图像" :visible.sync="imgDialog" width="1000px">
      <div class="imgs_content" v-if="srcList.length !== 0">
        <div class="oneBigImg">
          <img :src="srcList[imgIX]" alt="" />
        </div>
        <div class="imgs_list">
          <img
            v-for="(im, ix) in srcList"
            :key="ix"
            :src="im"
            alt=""
            @click="imgIX = ix"
          />
        </div>
      </div>
      <div
        v-else
        style="
          height: 60px;
          line-height: 60px;
          background-color: #f2f2f2;
          font-size: 22px;
          text-align: center;
        "
      >
        暂无检查图片
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="imgDialog = false">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog title="PDF报告" :visible.sync="PdfDialog" width="1000px">
      <div
        v-loading="PDFloading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <!-- <div class="info_head">
          <div>
            <span class="PDF_info_span"
              ><i>检查号：</i>{{ patientInfo["检查号"] }}</span
            >
            <span class="PDF_info_span"
              ><i>姓名：</i>{{ patientInfo["姓名"] }}</span
            >
            <span class="PDF_info_span"
              ><i>性别：</i>{{ patientInfo["sex"] }}</span
            >
            <span class="PDF_info_span"
              ><i>检查医生：</i>{{ patientInfo["检查医师"] }}</span
            >
            <span class="PDF_info_span"
              ><i>检查日期：</i>{{ patientInfo["检查日期"] }}</span
            >
          </div>
          <div>
            <span class="buttonBox" @click="inFrontOfA">上一个</span>
            <span class="buttonBox" @click="behindA">下一个</span>
          </div>
        </div> -->
        <div style="width: 100%; height: 770px">
          <iframe
            :src="`./pdf/web/viewer.html?file=` + pdfUrl"
            height="100%"
            width="99.4%"
            :key="PdfNum"
          ></iframe>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import paginationCpn from "@/components/Pagination/index.vue";
import dialogBar from "@/components/ProvisionalReport/index.vue";
export default {
  components: { paginationCpn, dialogBar },
  data() {
    return {
      searchForm: {
        检查号: "",
        姓名: "",
        namepy: "",
        sex: "",
      },
      tableData: [],
      pageTotal: {
        total: 0, //全部数据总条数
        currentpage: 1, //页码
        pageSize: 10, //切换每页总条数
        layout: "total, sizes, prev, pager, next, jumper",
      },
      imgIX: 0,
      imgDialog: false,
      srcList: [],
      PdfDialog: false,
      pdfUrl: "",
      loading: false,
      patientInfo: {},
      PdfIndex: 0,
      PDFloading: false,
      PdfNum: 0,

      ReportDialog: false, //临时报告组件显示与否
      rowData: null,
      rowNum: 0,
    };
  },
  mounted() {
    // this.getQueryRecords();
  },
  methods: {
    //获取检查单列表
    getQueryRecords(tp) {
      if (tp) {
        this.PDFloading = true;
      }
      this.loading = true;
      this.searchForm.pageNum = this.pageTotal.currentpage;
      this.searchForm.pageSize = this.pageTotal.pageSize;
      this.$AllService.queryRecords
        .getQueryRecords(this.searchForm)
        .then((resp) => {
          if (resp.code === 200) {
            this.tableData = resp.result.list;
            this.pageTotal.total = resp.result.total;
            if (resp.code === 200) {
              this.tableData = resp.result.list;
              this.pageTotal.total = resp.result.total;
              if (tp === "sy") {
                this.PdfIndex = this.tableData.length - 1;
                this.switchPatient();
              } else if (tp === "xy") {
                this.PdfIndex = 0;
                this.switchPatient();
              }
            } else {
              if (tp === "sy") {
                this.pageTotal.currentpage++;
              } else if (tp === "xy") {
                this.pageTotal.currentpage--;
              }
            }
          }
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          if (tp === "sy") {
            this.pageTotal.currentpage++;
          } else if (tp === "xy") {
            this.pageTotal.currentpage--;
          }
        });
    },
    //搜索
    clickSearch() {
      let onOff = false;
      for (const i in this.searchForm) {
        if (i !== "pageNum" && i !== "pageSize" && this.searchForm[i]) {
          this.searchForm[i] = this.searchForm[i].trim();
          onOff = true;
        }
      }
      if (onOff) {
        this.pageTotal.currentpage = 1;
        this.getQueryRecords();
      } else {
        this.$message.error("至少包含一个搜索条件");
      }
    },
    //重置
    clickReset() {
      for (const i in this.searchForm) {
        this.searchForm[i] = "";
      }
      this.getQueryRecords();
    },
    //更换总条数
    handleSizeChange(val) {
      this.pageTotal.pageSize = val;
      this.getQueryRecords();
    },
    //切换页码
    handleCurrentChange(val) {
      this.pageTotal.currentpage = val;
      this.getQueryRecords();
    },
    // 图像报告
    getCheckPatImg(row) {
      // this.srcList = [];
      // this.imgIX = 0;
      // this.$AllService.queryRecords
      //   .getCheckPatImg({ 序号: `${row["序号"]}` })
      //   .then((resp) => {
      //     if (resp.code === 200) {
      //       let httpIp = location.origin + "/";
      //       resp.result.forEach((im) => {
      //         this.srcList.push(httpIp + im.imgUrl);
      //       });
      //       this.imgUrl = this.srcList[0];
      //       this.imgDialog = true;
      //     }
      //   });
      // const params = { id: row["序号"] };
      // let routeData = this.$router.resolve({
      //   path: "/photoview.asp",
      //   query: params,
      // });
      // window.open(routeData.href, "_blank");
      // let url = location.origin + "/photoview.asp?id=" + row["序号"];

      // let url =
      //   location.protocol +
      //   "//" +
      //   location.host +
      //   "/photoview.asp?id=" +
      //   row["序号"]; //南方医院版本
      let url = location.origin + location.pathname + '#/' + "photoview?id=" + row["序号"];  //南方医院耳鼻喉版本
      window.open(url, "_blank"); 


      // const params = { id: row["序号"] };
      // this.$router.push({
      //   path: "/photoview.asp",
      //   query: params,
      // });
    },
    //Pdf报告
    getCheckPatPdf(row, ix) {
      this.patientInfo = row;
      this.PdfIndex = ix;
      this.PDFloading = true;
      let that = this;
      this.$AllService.queryRecords
        .getCheckPatPdf({ 序号: row["序号"] })
        .then((resp) => {
          if (resp.code === 200) {
            let time = new Date().getTime();
            let httpIp = location.protocol + "//" + location.host + "/";
            this.pdfUrl = httpIp + resp.message + "?" + time;
            that.PdfDialog = true;
          }
          this.PdfNum++;
          this.PDFloading = false;
        });
    },

    // 临时报告
    getCheckPatRep(row, ix) {
      // this.rowData=row
      // this.rowNum++
      // this.ReportDialog = true;

      // const params = { id: row["序号"] };
      // this.$router.push({
      //   path: "/reportview.asp",
      //   query: params,
      // });

      // let url = location.origin + "/reportview.asp?id=" + row["序号"];
      let url = location.origin + location.pathname +'#/'+ "reportview?id=" + row["序号"];  //南方医院耳鼻喉版本
      // let url = location.protocol + "//" + location.host + "/reportview.asp?id=" + row["序号"]; //南方医院版本
      window.open(url, "_blank");
    },

    //上一个
    inFrontOfA() {
      if (this.PdfIndex == 0) {
        if (this.pageTotal.currentpage == 1) {
          this.$message.error("已是第一条");
        } else {
          this.pageTotal.currentpage--;
          this.getQueryRecords("sy");
        }
      } else {
        this.switchPatient("sy");
      }
    },
    //下一个
    behindA() {
      if (this.PdfIndex == this.tableData.length - 1) {
        if (
          this.pageTotal.currentpage ==
          Math.ceil(this.pageTotal.total / this.pageTotal.pageSize)
        ) {
          this.$message.error("已是最后一条");
        } else {
          this.pageTotal.currentpage++;
          this.getQueryRecords("xy");
        }
      } else {
        this.switchPatient("xy");
      }
    },
    switchPatient(tp) {
      if (tp === "sy") {
        this.PdfIndex--;
      } else if (tp === "xy") {
        this.PdfIndex++;
      }
      this.getCheckPatPdf(this.tableData[this.PdfIndex], this.PdfIndex);
    },
  },
};
</script>


<style scoped lang="scss">
.layout_index {
  background-color: #fff;
  .search_content {
    height: 150px;
    text-align: center;
    padding-top: 16px;
    box-sizing: border-box;
    border-bottom: 4px solid #0880da;
  }
  .table_content {
    height: calc(100vh - 226px);
    overflow-y: auto;
    box-sizing: border-box;
    padding: 16px;
  }
  /deep/.el-dialog {
    margin: 0 auto 16px;
    margin-top: 2vh !important;
    text-align: left;
  }
  /deep/.el-dialog__body {
    padding: 16px 12px;
  }
  .info_head {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .PDF_info_span {
      font-size: 16px;
      color: #000;
      padding-right: 32px;
      i {
        font-weight: 800;
      }
    }
    .buttonBox {
      font-size: 16px;
      padding: 4px 6px;
      margin-left: 12px;
      background-color: #0880da;
      border-radius: 4px;
      color: #fff;
      cursor: pointer;
    }
  }
  .imgs_content {
    min-height: 720px;
    display: flex;
    .imgs_list {
      width: 116px;
      height: 100%;
      img {
        width: 100%;
        margin: 8px 0;
        cursor: pointer;
      }
    }
    .oneBigImg {
      flex: 1;
      margin-right: 16px;
      border-right: 2px solid #0880da;
      padding-right: 16px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 90%;
      }
    }
  }
}
</style>
<style>
.table_content::-webkit-scrollbar {
  /* 滚动条整体样式 */
  width: 6px;
  /* 高宽分别对应横竖滚动条的尺寸 */
}
</style>