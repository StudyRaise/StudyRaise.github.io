<template>
  <!-- pdf查看 -->
  <div class="pdfReport" v-loading="loading" element-loading-text="加载中...">
    <iframe v-if="pdfUrl" :src="pdfUrl" style="width: 100%; height: 100%;" frameborder="0"></iframe>
    <div class="tip-title" v-show="!pdfUrl">暂无数据</div>
  </div>
</template>

<script>
export default {
  name: "pdfReport",
  data() {
    return {
      pdfUrl: null,
      loading:false,
    };
  },
  created() { },
  beforeDestroy() {
    if (this.pdfUrl) {
      URL.revokeObjectURL(this.pdfUrl)
    }
  },
  mounted() {
    this.getpdfUrl()
  },
  methods: {
    async getpdfUrl() {
      let key = this.$route.query.key
      
      if (!key) {
        return 
      }
      try {
        this.loading = true
        const res = await this.$AllService.reportService.getReportPdf(key)
        
        if (res.data) {
          if (this.pdfUrl) {
            URL.revokeObjectURL(this.pdfUrl)
          }
          let blob = new Blob([res.data], { type: 'application/pdf' })
          this.pdfUrl = URL.createObjectURL(blob)
          
          // IE11 兼容性处理
          if (!!window.ActiveXObject || "ActiveXObject" in window) {
             // IE11 下使用 PDF.js viewer 加载
             this.pdfUrl = './pdf/web/viewer.html?file=' + encodeURIComponent(this.pdfUrl)
          }
        }
        this.loading = false
      } catch (error) {
        this.loading = false

      }
    

    },
  },
};
</script>

<style lang="scss" scoped>
.pdfReport{
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
}
.tip-title{
  text-align: center;
  padding: 30px 0;
  font-size: 20px;
  font-weight: bold;
}
</style>
