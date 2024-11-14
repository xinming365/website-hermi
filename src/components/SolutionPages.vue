<script setup>
import Measures from './solutionTemplates/Measures.vue'
import Optics from './solutionTemplates/optics.vue'
</script>

<template>
    <div class="solution-pages">
      <h1>解决方案</h1>



      <div class="lb-service__content">
			<div class="lb-subnav4-wrapper">
				<div class="lb-subnav4">
					<div class="lb-subnav4__left"><a href="/technology/solution?type=1"><i class="lb-icon-microscope-2"></i>科研领域</a></div>
					<ul>
												<li class=""><a href="/solutions/optics">光谱学</a></li>
												<li class=""><a href="/solutions/biophotonics">生物光子学</a></li>
												<li class="is-active"><a href="/solutions/measures">精密测量</a></li>
											</ul>
				</div>
				<div class="lb-subnav4">
					<div class="lb-subnav4__left"><a href="/technology/solution?type=2"><i class="lb-icon-setting"></i>工业领域</a></div>
					<ul>
												<li class=""><a href="/solutions/3dprint">3D打印</a></li>
												<li class=""><a href="/solutions/3c">3C</a></li>
												<li class=""><a href="/solutions/solar">光伏</a></li>
												<li class=""><a href="/solutions/lithium">锂电</a></li>
												<li class=""><a href="/solutions/semiconductor">半导体</a></li>
											</ul>
				</div>
			</div>



      <div class="lb-solution-detail">
      				 <!-- 模板的起点 -->

        <Measures />
        <!-- <Optics /> -->
                     <!-- 模板的终点 -->	
        </div>
</div>









    </div>
  </template>
  


  <script>
  export default {
    name: 'SolutionPages',
    data() {
      return {
        // 这里可以定义组件的数据
      }
    },
    methods: {
      // 这里可以定义组件的方法
    }
  }
  </script>
  
  <style scoped>
  .solution-pages {
    padding: 20px;
  }
  
  .solutions-container {
    margin-top: 20px;
  }
  </style>