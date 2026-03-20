<template>
  <!-- pdf查看 -->
  <div class="pdfReport" v-loading="loading" element-loading-text="加载中...">
    <iframe v-show="showIframe" ref="pdfFrame" :src="iframeSrc"  width="100%" height="100%" frameborder="0" @load="onIframeLoad"></iframe>
    <div class="tip-title" v-show="!showIframe">暂无数据</div>
  </div>
</template>

<script>
export default {
  name: "pdfReport",
  data() {
    return {
      iframeSrc: '',
      loading:false,
      pdfData: null,
      iframeLoaded: false,
      showIframe: false
    };
  },
  created() { 
  },
  beforeDestroy() {
    // 释放资源
    this.pdfData = null;
  },
  mounted() {
    // 初始化 iframe src
    this.iframeSrc = '/pdf/web/viewer.html?file=';
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
          // 将 Blob 转换为 ArrayBuffer 以兼容 IE11
          const reader = new FileReader();
          reader.onload = () => {
            this.pdfData = new Uint8Array(reader.result);
            this.showIframe = true;
            this.tryRenderPdf();
          };
          reader.readAsArrayBuffer(res.data);
        } else {
            this.showIframe = false;
        }
        this.loading = false
      } catch (error) {
        this.loading = false
        this.showIframe = false;
        console.error(error);
      }
    },
    onIframeLoad() {
      this.iframeLoaded = true;
      this.tryRenderPdf();
    },
    tryRenderPdf() {
      if (this.iframeLoaded && this.pdfData && this.$refs.pdfFrame && this.$refs.pdfFrame.contentWindow) {
        try {
          const viewerApp = this.$refs.pdfFrame.contentWindow.PDFViewerApplication;
          if (viewerApp) {
             viewerApp.open(this.pdfData);
          } else {
             // 如果 viewerApp 还没初始化完成，稍后重试
             setTimeout(() => {
                this.tryRenderPdf();
             }, 500);
          }
        } catch (e) {
          console.error('PDF viewer error:', e);
        }
      }
    }
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
