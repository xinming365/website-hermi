<template>
  <header class="header-bar">
    <h1>厄米科技</h1>
    <!-- <p class="header-subtitle">引领创新，成就未来</p> -->
     
  </header>
</template>

<script>

export default {
  name: "HeaderBar",
};
</script>
<style scoped>
header {
  background-color: #0a1929;
  color: #4fc3f7;
  padding: 2rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

header::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(79, 195, 247, 0.1) 0%,
    rgba(79, 195, 247, 0) 70%
  );
  transform: rotate(45deg);
  z-index: 0;
}
</style>
