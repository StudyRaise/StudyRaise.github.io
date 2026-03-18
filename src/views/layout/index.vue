<template>
  <div class="layout">
    <el-container>
      <el-header>
        <span class="routerName">{{ $store.state.hospitalName }}</span>
      </el-header>
      <el-container>
        <el-main>
          <div style="width: 1300px; margin: 0 auto">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>

    <!-- 空闲自动退出警告弹窗 -->
    <el-dialog title="会话超时警告" :visible.sync="idleWarningVisible" width="30%" :close-on-click-modal="false"
      :close-on-press-escape="false" :show-close="false" center append-to-body>
      <div style="text-align: center; padding: 20px 0;">
        <i class="el-icon-warning" style="font-size: 48px; color: #E6A23C; margin-bottom: 20px;"></i>
        <p style="font-size: 16px;">检测到您长时间未操作，系统将在 <span style="color: #F56C6C; font-weight: bold;">{{ countdown
            }}</span> 秒后自动退出。</p>
        <p style="color: #909399; margin-top: 10px;">移动鼠标或点击下方按钮保持登录状态</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="keepAlive">保持登录</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { idleTimer } from "@/utils/idle-timer";

export default {
  data() {
    return {
      idleWarningVisible: false,
      countdown: 60,
      countdownInterval: null
    };
  },
  mounted() {
    this.initIdleTimer();
  },
  beforeDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    idleTimer.stop();
  },
  methods: {
    initIdleTimer() {
      // 配置空闲检测器：15分钟超时，提前60秒警告
      idleTimer.timeout = 15 * 60 * 1000;
      idleTimer.warningDuration = 60 * 1000;

      idleTimer.onWarning = (duration) => {
        this.countdown = Math.floor(duration / 1000);
        this.idleWarningVisible = true;

        // 开始倒计时
        this.countdownInterval = setInterval(() => {
          this.countdown--;
          if (this.countdown <= 0) {
            clearInterval(this.countdownInterval);
          }
        }, 1000);
      };

      idleTimer.onActive = () => {
        this.idleWarningVisible = false;
        if (this.countdownInterval) {
          clearInterval(this.countdownInterval);
          this.countdownInterval = null;
        }
      };

      idleTimer.onTimeout = () => {
        this.logout();
      };

      idleTimer.start();
    },
    keepAlive() {
      // 手动重置定时器（模拟活动）
      idleTimer.reset();
    },
    logout() {
      // 清除Token
      window.sessionStorage.removeItem("token");
      this.$store.commit("SetToken", "");

      // 停止检测
      idleTimer.stop();

      // 关闭弹窗
      this.idleWarningVisible = false;

      // 跳转登录页
      this.$router.push("/login");
      this.$message.success("已安全退出");
    }
  },
};
</script>


<style scoped lang="scss">
.layout {
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  .quit {
    float: right;
    font-size: 16px;
    cursor: pointer;
  }
}
.el-header {
  background-color: #0880da;
  color: #ffffff;
  text-align: center;
  line-height: 60px;
  font-size: 22px;
}

.el-aside {
  color: #333;
  text-align: center;
  min-height: calc(100vh - 60px);
  background-color: #ffffff;
  box-shadow: 2px 0px 6px 0px rgba(0, 0, 0, 0.16);
  z-index: 2;
}

/deep/.el-main {
  background-color: #f2f2f2;
  color: #333;
  text-align: center;
  // height: calc(100vh - 60px);
  // width: calc(100vw - 250px);
  // box-sizing: border-box;
  // margin: 0 auto;
  width: 100vw;
  overflow-x: auto;
  padding: 0px;
}
</style>
<style>
</style>