// src/utils/idle-timer.js

class IdleTimer {
  constructor({ timeout = 15 * 60 * 1000, warningDuration = 60 * 1000, onTimeout, onWarning, onActive }) {
    this.timeout = timeout; // 总超时时间
    this.warningDuration = warningDuration; // 警告倒计时时长
    this.onTimeout = onTimeout;
    this.onWarning = onWarning;
    this.onActive = onActive;

    this.timerId = null;
    this.warningTimerId = null;
    this.isWarningShown = false;

    this.events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll', 'click'];
    this.eventHandler = this.reset.bind(this);
  }

  start() {
    if (!this.timeout) return;

    this.events.forEach(event => {
      window.addEventListener(event, this.eventHandler, true);
    });

    this.resetTimer();
  }

  stop() {
    this.clearTimers();
    this.events.forEach(event => {
      window.removeEventListener(event, this.eventHandler, true);
    });
  }

  reset() {
    // 如果正在显示警告，触发活动回调（例如关闭警告框）
    if (this.isWarningShown && this.onActive) {
      this.onActive();
      this.isWarningShown = false;
    }

    this.resetTimer();
  }

  resetTimer() {
    this.clearTimers();

    // 设置警告定时器
    const warningDelay = this.timeout - this.warningDuration;
    if (warningDelay > 0) {
      this.warningTimerId = setTimeout(() => {
        this.isWarningShown = true;
        if (this.onWarning) this.onWarning(this.warningDuration);
      }, warningDelay);
    }

    // 设置超时定时器
    this.timerId = setTimeout(() => {
      this.isWarningShown = false; // 超时后重置状态
      if (this.onTimeout) this.onTimeout();
    }, this.timeout);
  }

  clearTimers() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.warningTimerId) {
      clearTimeout(this.warningTimerId);
      this.warningTimerId = null;
    }
  }
}

// 导出单例实例，方便在API拦截器等其他地方调用reset
export const idleTimer = new IdleTimer({});
export default IdleTimer;
