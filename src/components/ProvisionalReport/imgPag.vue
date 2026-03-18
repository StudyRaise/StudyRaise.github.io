<template>
  <div class="img_Pag">
    <div v-if="imgList.length !== 0" class="content_box">
      <div class="oneBigImg">
        <img :src="imgUrl" alt="" />
      </div>
      <div class="content_img">
        <div
          v-for="(im, ix) in imgList"
          :key="ix"
          class="img_one"
          @click="imgUrl = im"
        >
          <img :src="im" alt="" />
        </div>
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
      {{ title }}
    </div>
  </div>
</template>
<script>
export default {
  props: ["rowData"],
  data() {
    return {
      imgList: [],
      imgUrl: "",
      title: "正在获取图片......",
    };
  },

  mounted() {
    let id = (this.active = this.$route.query.id);
    this.getCheckPatImg(id);
  },
  methods: {
    getCheckPatImg(id) {
      this.$AllService.queryRecords
        .getCheckPatImg({ 序号: id })
        .then((resp) => {
          if (resp.code === 200) {
            // let httpIp = location.origin + "/";
            // let httpIp = "http://192.168.0.254:9527/";
            resp.result.forEach((im) => {
              //   this.imgList.push(httpIp + im.imgUrl);
              this.imgList.push(im.imgUrl);
            });
            if (this.imgList.length === 0) {
              this.title = "暂无检查图片";
            } else {
              this.imgUrl = this.imgList[0];
            }
          } else {
            this.title = "图片获取失败";
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.img_Pag {
  width: 1200px;
  min-height: calc(100vh - 32px);
  box-sizing: border-box;
  padding: 16px;
  margin: 16px auto;
  background-color: #fff;
  .content_box {
    display: flex;
    .content_img {
      flex: 2;
      height: calc(100vh - 64px);
      overflow: auto;
      .img_one {
        height: 150px;
        margin: 0 0 6px 6px;
        background-color: #f2f2f2;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 100%;
        }
      }
    }
    .oneBigImg {
      flex: 9;
      display: flex;
      align-items: center;
      img {
        width: 100%;
        word-break: normal;
      }
    }
  }
}
</style>