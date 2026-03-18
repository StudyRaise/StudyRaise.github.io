<template>
  <div class="report_index" id="PdfPag">
    <!-- <div @click="daying">打印</div> -->
    <div v-show="type === 'ls'" id="print">
      <el-row class="report_content">
        <h1 class="h1_title">{{ $store.state.hospitalName }}</h1>
        <h3 class="h3_title">{{ pdfData["chekitem"] }}诊疗报告</h3>
        <div class="content_h">
          <span>电话:2344-456-552</span>
          <span><b>检查日期:</b>{{ pdfData["检查日期"] }}</span>
        </div>
        <hr />
        <el-row>
          <el-col :span="6" class="info_box">
            <span>
              <b>检查号:</b><em>{{ pdfData["检查号"] }}</em>
            </span>
          </el-col>
          <el-col :span="6" class="info_box">
            <span>
              <b>姓名:</b><em>{{ pdfData["姓名"] }}</em>
            </span>
          </el-col>
          <el-col :span="6" class="info_box">
            <span>
              <b>性别:</b><em>{{ pdfData["sex"] }}</em>
            </span>
          </el-col>
          <el-col :span="6" class="info_box">
            <span>
              <b>年龄:</b><em>{{ pdfData["年龄"] }}</em>
            </span>
          </el-col>
          <el-col :span="6" class="info_box">
            <span style="display: flex">
              <b>电话:</b
              ><em
                style="
                  width: 70%;
                  display: -webkit-box !important;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                "
                >{{ pdfData["病史"] }}</em
              >
            </span>
          </el-col>
          <el-col :span="6" class="info_box">
            <span>
              <b>住院号:</b><em>{{ pdfData["住院号"] }}</em>
            </span>
          </el-col>
          <el-col :span="6" class="info_box">
            <span>
              <b>床号:</b><em>{{ pdfData["床号"] }}</em>
            </span>
          </el-col>
          <el-col :span="6" class="info_box">
            <span>
              <b>检查间号:</b><em>{{ pdfData["检查室"] }}</em>
            </span>
          </el-col>
          <el-col :span="12" class="info_box">
            <span>
              <b>科室:</b><em>{{ pdfData["送检科室"] }}</em>
            </span>
          </el-col>
          <el-col :span="12" class="info_box">
            <span>
              <b>设备:</b><em>{{ pdfData["设备"] }}</em>
            </span>
          </el-col>
          <el-col :span="12" class="info_box">
            <span>
              <b>住址:</b><em>{{ pdfData["联系方法"] }}</em>
            </span>
          </el-col>
          <el-col :span="12" class="info_box">
            <span>
              <b>临床诊断:</b><em>{{ pdfData["临床诊断"] }}</em>
            </span>
          </el-col>
          <el-col :span="24" class="info_box">
            <span>
              <b>症状:</b><em>{{ pdfData["主诉"] }}</em>
            </span>
          </el-col>
        </el-row>
        <hr />
        <el-row class="content_examine">
          <b>检查所见:</b>
          <div class="examine_info">
            <div v-html="pdfData['检查所见']"></div>
            <!-- <el-input
              type="textarea"
              disabled
              resize="none"
              :autosize="{ minRows: 8, maxRows: 99 }"
              placeholder=""
              v-model="pdfData['检查所见']"
            >
            </el-input> -->
          </div>
        </el-row>
        <el-row style="padding: 20px 0">
          <el-col :span="16"
            ><div class="grid-content bg-purple">
              <b>病理学诊断:</b><em>{{ pdfData["病理"] }}</em>
            </div></el-col
          >
          <el-col :span="8"
            ><div class="grid-content bg-purple-light">
              <b>病理号:</b><em>{{ pdfData["CT号"] }}</em>
            </div></el-col
          >
        </el-row>
        <el-row style="min-height: 108px">
          <el-col :span="16"
            ><b>检查结论:</b>
            <p style="text-indent: 1em">{{ pdfData["检查结论"] }}</p></el-col
          >
          <el-col :span="8" class="liangbianduiqi">
            <p>
              <i>
                <b>治疗</b>
              </i>
              <em>:{{ pdfData["镜下处理"] }}</em>
            </p>
            <p style="padding: 8px 0">
              <i>
                <b>麻醉</b>
              </i>
              <em>:{{ pdfData["麻醉方法"] }}</em>
            </p>
            <p>
              <i>
                <b>检查医生</b>
              </i>
              <em>:{{ pdfData["检查医师"] }}</em>
            </p>
            <p style="margin-top: 8px">
              <i>
                <b>助手</b>
              </i>
              <em>:{{ pdfData["手术医师"] }}</em>
            </p>
          </el-col>
        </el-row>
        <el-row
          ><b>建&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;议:</b
          ><em>{{ pdfData["建议"] }}</em></el-row
        >
        <hr />
        <div class="content_img">
          <div v-for="(im, ix) in imgList" :key="ix" class="img_one">
            <img :src="im.imgUrl" alt="" />
            <!-- <el-image
              style="width: 80%;"
              :src="imgList2[ix]"
              :preview-src-list="imgList2"
            >
            </el-image> -->
            <div class="info_box">
              <div>{{ im.postion }}</div>
              <div>{{ im.img_des }}</div>
            </div>
          </div>
        </div>
      </el-row>
    </div>
    <div v-show="type === 'pdf'" style="width: 100%; text-align: center">
      <!-- <iframe
        :src="`./pdf/web/viewer.html?file=` + pdfUrl"
        height="90vh"
        width="80%"
        style="height: calc(100vh - 80px)"
      ></iframe> -->
      <iframe
        :src="pdfUrl"
        height="90vh"
        width="100%"
        style="height: calc(100vh - 80px)"
      ></iframe>
    </div>
  </div>
</template>
<script>
export default {
  props: ["rowData"],
  data() {
    return {
      pdfData: {
        chekitem: "",
        检查日期: "",
        检查号: "",
        姓名: "",
        sex: "",
        年龄: "",
        病史: "",
        设备: "",
        住院号: "",
        床号: "",
        送检科室: "",
        联系方法: "",
        临床诊断: "",
        主诉: "",
        检查室: "",
        检查所见: "",
        病理: "",
        CT号: "",
        试验: "",
        镜下处理: "",
        麻醉方法: "",
        检查医师: "",
        检查结论: "",
        手术医师: "",
        建议: "",
      },
      imgList: [],
      // imgList2: [],
      pdfUrl: "",
      type: "",
    };
  },

  mounted() {
    let id = (this.active = this.$route.query.id);
    this.getCheckPatOne(id);
  },
  methods: {
    getCheckPatOne(id) {
      this.$AllService.queryRecords
        .getCheckPatOne({ 序号: id })
        .then((resp) => {
          if (resp.code === 200) {
            resp.result.imgList.forEach((im) => {
              let obj = {
                imgUrl: im.imgUrl,
                postion: im.postion,
                img_des: im.img_des,
              };
              this.imgList.push(obj);
              // this.imgList2.push(im.imgUrl);
            });
            this.pdfData = resp.result;
            if (this.pdfData.ReportStatusCode === "R") {
              this.type = "ls";
              window.setTimeout(() => {
                this.$watermark.set("临时报告");
              }, 100);
            } else {
              let that = this;
              this.$AllService.queryRecords
                .getCheckPatPdf({ 序号: id })
                .then((resp) => {
                  if (resp.code === 200) {
                    let time = new Date().getTime();
                    let httpIp = location.protocol + "//" + location.host + "/";
                    this.pdfUrl = httpIp + resp.message + "?" + time;
                    this.$.ajax({
                      type: "GET",
                      url: that.pdfUrl,
                      dataType: "jsonp",
                      complete: function (response) {
                        if (response.status === 200) {
                          that.type = "pdf";
                        } else {
                          that.type = "ls";
                          if (this.pdfData.ReportStatusCode === "R") {
                            window.setTimeout(() => {
                              that.$watermark.set("临时报告");
                            }, 100);
                          }
                        }
                      },
                    });
                  }
                });
            }
          }
        });
    },
    //前端打印
    // daying() {
    //   $("#print").jqprint();
    // },
  },
};
</script>
<style lang="scss" scoped>
.report_index {
  width: 100vw;
  padding: 16px;
  margin: 16px auto;
  background-color: #fff;
  position: relative;
}
.report_content {
  padding: 0 20px;
  font-family: "黑体";
  font-size: 16px;
  color: #000;
  .h1_title,
  .h3_title {
    text-align: center;
    color: #010568;
  }
  .h1_title {
    font-size: 28px;
    letter-spacing: 4px;
  }
  .h3_title {
    font-size: 20px;
    letter-spacing: 10px;
    margin: 10px 0;
  }
  .info_box {
    padding: 6px 2px;
  }
}
.content_h {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 6px;
}

.content_examine {
  min-height: 200px;
  margin-bottom: 30px;
  .examine_info {
    // text-indent: 1em;
    white-space: pre-wrap;//\n换行
  }
}
.content_img {
  min-height: 300px;
  display: flex;
  flex-wrap: wrap;
  .img_one {
    width: calc(33.33% - 36px);
    margin: 18px;
    background-color: #f2f2f2;
    display: flex;
    align-items: center;
    // justify-content: center;
    img {
      width: 80%;
    }
    .info_box {
      font-size: 16px;
      height: 100%;
      word-break: break-all;
      width: 20%;
    }
  }
}
hr {
  border: none;
  border: 1px solid #333;
  font-weight: bold;
  margin: 2px 0;
}
.liangbianduiqi {
  i {
    text-align: justify;
    text-align-last: justify;
    text-justify: inter-ideograph; /*兼容ie*/
  }
  b {
    display: inline-block;
    width: 74px;
    text-align: justify;
  }
}
</style>
<style>
.report_index .el-textarea__inner {
  border: none;
}
.report_index .el-textarea.is-disabled .el-textarea__inner {
  background-color: #fff;
  border-color: none;
  color: #000;
  cursor: default;
  font-family: "黑体";
  font-size: 16px;
}
</style>