<template>
  <div id="app">
    <router-view v-if="show" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      show: false,
    };
  },
  mounted() {
    const ti = new Date().getTime();
    axios.get(`./set.json?id=${ti}`,{baseURL:''}).then((res) => {
      this.$store.state.hospitalName = res.data.hospitalName;
      window.sessionStorage.setItem("setInfo", JSON.stringify(res.data));
      this.show = true;
    });
  },
};
</script>

<style lang="stylus">
@import 'styles/public.styl';

#app {
  background-color: #F3F3F3;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
  width: 100%;
}

body {
  margin: 0px;
  padding: 0px;
  width: 100%;
}
</style>
