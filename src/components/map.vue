<template>
  <div class="map-container" ref="mapContaner"></div>
</template>
<script>
import BaseMap from "../assets/js/baseMap";
export default {
  name: "my-map",
  data() {
    return {
      baseMap: null,
    };
  },
  methods: {},
  mounted() {
    /* eslint-disable */
    console.log(this.$refs["mapContaner"].clientHeight);
    let options = {
      width: this.$refs["mapContaner"].clientWidth,
      height: this.$refs["mapContaner"].clientHeight,
    };
    this.baseMap = new BaseMap(".map-container", options);
    console.log(this.baseMap);
    this.baseMap.init();
  },
};
</script>
<style lang="scss">
.map-container {
  height: 100%;
  .map-group,
	.map-group-jiangxi {
    .map-path {
      fill: #f9f9f9;
      stroke: #ddd;
      stroke-width: 0.5px;
      text {
        fill: gray;
      }
    }
  }
}
</style>
