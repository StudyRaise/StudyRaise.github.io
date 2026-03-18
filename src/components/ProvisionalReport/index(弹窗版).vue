<template>
  <div class="report_index" id="aaa">
    <!-- <div v-watermark="{text1:'你好',text2:'水印',textColor:'red'}">这里是容器！</div> -->
    <el-row class="report_content">
      <h1 class="h1_title">{{$store.state.hospitalName}}</h1>
      <h3 class="h3_title">{{pdfData["chekitem"]}}诊疗报告</h3>
      <div class="content_h">
        <span>电话:2344-456-552</span>
        <span><b>检查日期:</b>{{ pdfData["检查日期"] }}</span>
      </div>
      <hr />
      <el-row class="content_p">
        <span
          ><b>检查号:</b><em>{{ pdfData["检查号"] }}</em></span
        >
        <span
          ><b>姓名:</b><em>{{ pdfData["姓名"] }}</em></span
        >
        <span
          ><b>性别:</b><em>{{ pdfData["sex"] }}</em></span
        >
        <span
          ><b>年龄:</b><em>{{ pdfData["年龄"] }}</em></span
        >
        <span
          ><b>电话:</b><em>{{ pdfData["病史"] }}</em></span
        >
        <span
          ><b>设备:</b><em>{{ pdfData["设备"] }}</em></span
        >
        <span
          ><b>住院号:</b><em>{{ pdfData["住院号"] }}</em></span
        >
        <span
          ><b>床号:</b><em>{{ pdfData["床号"] }}</em></span
        >
        <span
          ><b>科室:</b><em>{{ pdfData["送检科室"] }}</em></span
        >
        <span
          ><b>住址:</b><em>{{ pdfData["联系方法"] }}</em></span
        >
        <span
          ><b>临床诊断:</b><em>{{ pdfData["临床诊断"] }}</em></span
        >
        <span
          ><b>症状:</b><em>{{ pdfData["主诉"] }}</em></span
        >
        <span
          ><b>检查间号:</b><em>{{ pdfData["检查室"] }}</em></span
        >
      </el-row>
      <hr />
      <el-row class="content_examine">
        <b>检查所见:</b>
        <div class="examine_info">
          <!-- <div v-html="pdfData['检查所见']"></div> -->
          <el-input
            type="textarea"
            disabled
            resize="none"
            :autosize="{ minRows: 2, maxRows: 99 }"
            placeholder="请输入内容"
            v-model="pdfData['检查所见']"
          >
          </el-input>
        </div>
      </el-row>
      <el-row style="padding: 20px 0">
        <el-col :span="18"
          ><div class="grid-content bg-purple">
            <b>病理学诊断:</b><em>{{ pdfData["病理"] }}</em>
          </div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple-light">
            <b>病理号:</b><em>{{ pdfData["CT号"] }}</em>
          </div></el-col
        >
      </el-row>
      <el-row style="height: 100px">
        <el-col :span="18"
          ><b>检查结论:</b>
          <p style="text-indent: 1em">{{ pdfData["检查结论"] }}</p></el-col
        >
        <el-col :span="6">
          <p>
            <b>治&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;疗:</b
            ><em>{{ pdfData["镜下处理"] }}</em>
          </p>
          <p style="padding: 8px 0">
            <b>麻&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;醉:</b
            ><em>{{ pdfData["麻醉方法"] }}</em>
          </p>
          <p>
            <b>检查医生:</b><em>{{ pdfData["检查医师"] }}</em>
          </p>
          <p style="margin-top: 20px">
            <b>助&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;手:</b
            ><em>{{ pdfData["手术医师"] }}</em>
          </p>
        </el-col>
      </el-row>
      <el-row
        ><b>建&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;议:</b
        ><em>{{ pdfData["建议"] }}</em></el-row
      >
      <hr />
      <div class="content_img"></div>
    </el-row>
  </div>
</template>
<script>
export default {
  props: ["rowData"],
  data() {
    return {
      pdfData: {
        chekitem:"",
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
    };
  },

  mounted() {
    console.log(this.active = this.$route.params);
    // for (const i in this.pdfData) {
    //   this.pdfData[i] = this.rowData[i];
    // }
    window.setTimeout(()=>{
      this.$watermark.set("临时报告");
    },2000)
  },
};
</script>
<style lang="scss" scoped>
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
}
.content_h {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 6px;
}
.content_p {
  display: flex;
  flex-direction: row;
  //  justify-content
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0 6px;
  span {
    min-width: 150px;
    align-items: center;
    padding: 6px 16px 6px 0;
  }
}
.content_examine {
  min-height: 300px;
  margin-bottom: 30px;
  .examine_info {
    text-indent: 1em;
  }
}
.content_img {
  min-height: 300px;
}
hr {
  border: none;
  border: 1px solid #333;
  font-weight: bold;
  margin: 2px 0;
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