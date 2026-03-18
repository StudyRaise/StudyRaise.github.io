<template>
  <div id="htmlEditor">
    <editor v-model="contents" :init="init"></editor>
    <el-dialog
      id="uploadImage"
      title="上传图片"
      :visible.sync="showInputD"
      width="30%"
      :modal="false"
      append-to-body
      modal-append-to-body
    >
      <!-- <el-upload
        class="upload-demo"
        action="http://119.131.176.169:18080/Gtwxyy/commonUpload/upload"
        list-type="picture-card"
        :on-success="UploadImage"
        :limit="1"
      >-->
      <!-- <el-upload
        class="upload-demo"
        action="http://39.108.252.194:80/Gtwxyy/commonUpload/upload"
        list-type="picture-card"
        :on-success="UploadImage"
        :limit="9"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
      </el-upload>-->
      <!-- <el-upload
    	  class="avatar-uploader"
    	  action="http://192.168.0.90:18080/Gtvideo/hr/uploadUserface"
    	  :show-file-list="false"
    	  :on-success="UploadImage"
    	  style="margin-left: 40%;">
    	  <img v-if="imageUrl" :src="imageUrl" class="avatar">
    	  <i v-else class="el-icon-plus avatar-uploader-icon">上传头像</i>
      </el-upload>-->

      <el-upload
        class="avatar-uploader"
        action="/video/commonUpload/upload"
        multiple
        :show-file-list="false"
        :http-request="UploadImage"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <el-image style="width: 150px; height: 150px" v-if="imageUrl" :src="imageUrl" fit="cover"></el-image>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer">
        <el-button @click="showInputD = false">取 消</el-button>
        <el-button type="primary" @click="GetImgUrl">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/paste";
import "tinymce/plugins/advlist";
import "tinymce/plugins/importcss";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/hr";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";
import "tinymce/plugins/preview";
import "tinymce/plugins/charmap";
import "tinymce/plugins/emoticons";
// import 'tinymce/themes/modern/theme'
//使用 下面一条代替上面一条
// import "tinymce/themes/silver/theme";
import "../../../public/skins/theme";
//引入前，编辑器不出现，引入后出现
// import 'tinymce/skins/ui/oxide-dark/skin.css'//深色主题
import "tinymce/skins/ui/oxide/skin.css"; //浅色主题
export default {
  name: "index",
  components: {
    Editor,
    tinymce
  },
  data() {
    let that = this;
    return {
      contents: "",
      showInputD: false,
      //参考：http://tinymce.ax-z.cn/
      init: {
        selector: "textarea",
        // toolbar: 'undo redo | styleselect | bold italic | link image | bold italic underline strikethrough |',
        // theme: 'modern',
        theme: "silver", //解决编辑器不显示
        language_url: "/skins/zh_CN.js",
        language_url:
          process.env.NODE_ENV === "development"
            ? "/skins/zh_CN.js"
            : "./skins/zh_CN.js",
        language: "zh_CN",
        skin_url:
          process.env.NODE_ENV === "development"
            ? "/skins/lightgray"
            : "./skins/lightgray",
        emoticons_database_url:
          process.env.NODE_ENV === "development"
            ? "/skins/emojis.min.js"
            : "./skins/emojis.min.js",
        // height: 450,
        height: 500, //编辑框高度
        // width: 900,//编辑框宽度
        // width: 1385,
        // plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
        plugins: `
                    paste
                    importcss
                    image
                    code
                    table
                    advlist
                    fullscreen
                    link
                    lists
                    textcolor
                    colorpicker
                    hr
                    preview
                    charmap
                    emoticons
                `,
        // toolbar:
        //   'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
        toolbar: `undo redo | fontselect | fontsizeselect | formatselect | styleselect | image | table | forecolor backcolor | bold italic underline strikethrough | numlist bullist | alignleft aligncenter alignright alignjustify | outdent indent |  preview removeformat  hr | paste code  link | fullscreen`, //工具栏| charmap emoticons 特殊符号和表情
        forced_root_block: "p",
        force_p_newlines: true,
        importcss_append: true,

        // CONFIG: ContentStyle 这块很重要， 在最后呈现的页面也要写入这个基本样式保证前后一致， `table`和`img`的问题基本就靠这个来填坑了
        content_style: `
                    *                         { padding:0; margin:0; }
                    html, body                { height:100%; }
                    img                       { max-width:100%; display:block;height:auto; }
                    a                         { text-decoration: none; }
                    iframe                    { width: 100%; }
                    p                         { line-height:1.6; margin: 0px; }
                    table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
                    .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
                    ul,ol                     { list-style-position:inside; }
                `,

        insert_button_items: "image link | inserttable",

        // CONFIG: Paste
        paste_retain_style_properties: "all",
        paste_word_valid_elements: "*[*]", // word需要它
        menubar: true, // 隐藏最上方menu工具栏
        paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
        paste_convert_word_fake_lists: false, // 插入word文档需要该属性
        paste_webkit_styles: "all",
        paste_merge_formats: true,
        nonbreaking_force_tab: false,
        paste_auto_cleanup_on_paste: false,
        browser_spellcheck: true, // 拼写检查
        branding: false, // 去水印
        elementpath: true, //禁用编辑器底部的状态栏
        statusbar: true, // 隐藏编辑器底部的状态栏
        // CONFIG: Font
        fontsize_formats:
          "10px 11px 12px 14px 16px 18px 20px 24px 28px 32px 40px 48px 56px 62px",
        // CONFIG: StyleSelect
        //追加自定义表情
        // emoticons_append: {
        //   diy1: {
        //     keywords: ["diy1"],
        //     // char: "\uD83E\uDD2F",
        //     char: "Ⅳ",
        //     category: "啊啊啊啊"
        //   }
        // },
        // 追加自定义符号
        charmap_append: [
          [0x2160, "大写罗马数字1"],
          [0x2161, "大写罗马数字2"],
          [0x2162, "大写罗马数字3"],
          [0x2163, "大写罗马数字4"],
          [0x2164, "大写罗马数字5"],
          [0x2165, "大写罗马数字6"],
          [0x2166, "大写罗马数字7"],
          [0x2167, "大写罗马数字8"],
          [0x2168, "大写罗马数字9"],
          [0x2169, "大写罗马数字10"],
          [0x216a, "大写罗马数字11"],
          [0x216b, "大写罗马数字12"]
        ],
        style_formats: [
          {
            title: "首行缩进",
            block: "p",
            styles: { "text-indent": "2em" }
          },
          {
            title: "行高",
            items: [
              { title: "1", styles: { "line-height": "1" }, inline: "span" },
              {
                title: "1.5",
                styles: { "line-height": "1.5" },
                inline: "span"
              },
              { title: "2", styles: { "line-height": "2" }, inline: "span" },
              {
                title: "2.5",
                styles: { "line-height": "2.5" },
                inline: "span"
              },
              { title: "3", styles: { "line-height": "3" }, inline: "span" }
            ]
          }
        ],

        // FontSelect
        font_formats: `
                    微软雅黑=微软雅黑;
                    宋体=宋体;
                    黑体=黑体;
                    仿宋=仿宋;
                    楷体=楷体;
                    隶书=隶书;
                    幼圆=幼圆;
                    Andale Mono=andale mono,times;
                    Arial=arial, helvetica,
                    sans-serif;
                    Arial Black=arial black, avant garde;
                    Book Antiqua=book antiqua,palatino;
                    Comic Sans MS=comic sans ms,sans-serif;
                    Courier New=courier new,courier;
                    Georgia=georgia,palatino;
                    Helvetica=helvetica;
                    Impact=impact,chicago;
                    Symbol=symbol;
                    Tahoma=tahoma,arial,helvetica,sans-serif;
                    Terminal=terminal,monaco;
                    Times New Roman=times new roman,times;
                    Trebuchet MS=trebuchet ms,geneva;
                    Verdana=verdana,geneva;
                    Webdings=webdings;
                    Wingdings=wingdings,zapf dingbats`,

        // Tab
        tabfocus_elements: ":prev,:next",
        object_resizing: true,
        image_advtab: true,
        imagetools_toolbar:
          "rotateleft rotateright | flipv fliph | editimage imageoptions",
        file_picker_callback: function(callback, value, meta) {
          that.callbackRaw = callback;
          that.showInputD = true;
        },
        toolbar_drawer: false //工具栏抽屉模式
      },
      imageUrl: "",
      callbackRaw: ""
    };
  },
  props: ["intro"],
  methods: {
    GetImgUrl() {
      this.showInputD = false;
      // this.callbackRaw(this.$store.state.urlobjects.ftpBaseUrl2 + '/editimage/' + this.trueurl)
      this.callbackRaw(this.imageUrl);
      this.imageUrl = "";
    },
    UploadImage(file) {
      const formData = new FormData();
      formData.append("file", file.file);
      this.imageUrl = URL.createObjectURL(file.file);
      this.$AllService.UploadService.UploadFile(formData).then(resp => {
        this.imageUrl = resp.data.editimage;
      });
    },
    //上传成功回调函数
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    //控制上传
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 或 png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  watch: {
    contents() {
      this.$emit("change", this.contents);
    },
    intro() {
      this.contents = this.intro;
    }
  },
  created() {},
  mounted() {
    this.contents = this.intro;
    tinymce.init({});
    // setTimeout(() => {
    //   var demo = document.querySelectorAll(".tox-tbtn__select-label");
    //   demo[3].innerText = "格式";
    //   demo[7].innerText = "格式";
    // }, 500);
  }
};
</script>

<style lang="stylus" scoped>
.mce-fade {
  z-index: 2300 !important;
}

.mce-window {
  z-index: 2301 !important;
}

.el-dialog__footer {
  text-align: center;
}

#uploadImage {
  z-index: 2303 !important;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.tox-tinymce-aux {
  z-index: 2100 !important;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
#uploadImage .el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 400px;
  width: 500px;
}
#uploadImage .el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
}
.tox-selected-menu {
  position: relative !important;
}
</style>

