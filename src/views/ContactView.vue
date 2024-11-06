<script setup>
import { onMounted } from 'vue';

// 百度地图相关代码可以在这里初始化
onMounted(() => {
  // 如果需要使用百度地图，可以在这里初始化
});
</script>

<template>
    <div id="content-area" class="contact-content">
      <!-- 关于我们部分 -->
      <section class="about-us">
            <h1 class="section-title">关于我们</h1>
            <p class="company-intro">
              厄米科技（北京）有限公司是一家立足于尖端光电技术的创新型企业。我们专注于激光光源、光放大器和光无源器件的研发与生产,同时提供国际顶尖仪器设备的代理与系统集成服务。作为一家综合性高科技服务商,我们的业务版图覆盖上海总部、香港和美国办事处,为全球客户提供卓越的光电解决方案。
            </p>
            <p class="company-reach">
              我们的客户群体涵盖了国内外顶尖学府、中国科学院、信息产业部、航空工业总公司等各大研究机构,以及相关领域的领军企业。凭借多年的技术积累和创新,我们的产品线已经极其丰富,波长覆盖800-2000nm,包括但不限于PLC光分路器、高性能光纤跳线、MEMS VOA、光开关、光纤放大器等一系列高端光电产品。
            </p>
          </section>

          <!-- 联系我们部分 -->
          <h1 class="section-title">联系我们</h1>
          <div class="company-info">
            <h2 class="company-name">厄米科技（北京）有限责任公司</h2>
            <div class="contact-grid">
              <div class="contact-item">
                <i class="fas fa-phone"></i>
                <span><strong>电话：</strong>4006 888 532</span>
              </div>
              <div class="contact-item">
                <i class="icon-fax"></i>
                <span><strong>传真：</strong>+021-34241962-8009</span>
              </div>
              <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <span><strong>电子邮件：</strong>info@auniontech.com</span>
              </div>
              <div class="contact-item">
                <i class="icon-wechat"></i>
                <span><strong>客服微信：</strong>vesta_aave</span>
              </div>
              <div class="contact-item">
                <i class="fa-phone"></i>
                <span><strong>值班热线：</strong>131 6605 3287 (微信同号)</span>
              </div>
              <div class="contact-item">
                <i class="icon-complaint"></i>
                <span><strong>投诉热线：</strong>131 6275 1552 (微信同号)</span>
              </div>
              <div class="contact-item">
                <i class="fa fa-map-marker-alt"></i>
                <span><strong>公司地址：</strong>北京市西城区新街口街道18号楼6楼</span>
              </div>
              <div class="contact-item">
                <i class="icon-postcode"></i>
                <span><strong>邮编：</strong>201103</span>
              </div>
            </div>
          </div>

          <!-- 加入我们部分 -->
          <h1 id="join-us" class="section-title">加入我们</h1>
          <div class="job-listings">
            <div class="job-position">
              <h2>光路工程师</h2>
              <h3>岗位职责：</h3>
              <ol>
                <li>负责激光光源、光纤放大器、测试设备的光路部分的设计与研发；</li>
                <li>产品的BOM编制及生产加工流程的编写；</li>
                <li>对生产线操作员工进行产品技术与理论培训，并解决产品生产过程中出现的技术问题；</li>
              </ol>
              <h3>岗位要求：</h3>
              <ol>
                <li>本科及以上学历，光信息、光电子、光纤通信或物理等相关专业；</li>
                <li>了解常用光学仪器操作及测量方法；具备光纤光学及光纤激光器相关知识；了解常用光器件工作原理及特性；</li>
                <li>具备光纤激光器或放大器相关知识；</li>
                <li>具备较强的学习能力和动手能力；</li>
                <li>能够熟练阅读英文技术文档；</li>
                <li>具有良好的沟通能力及团队合作精神；</li>
              </ol>
            </div>

            <div class="job-position">
              <h2>无源器件工程师</h2>
              <h3>岗位要求：</h3>
              <ol>
                <li>大专以上的学历；</li>
                <li>了解无源器件生产流程与工艺，能解决在生产过程过产品的改良问题；</li>
                <li>能独立完成产线产品制作；</li>
                <li>具有较强的学习能力与动手能力；</li>
                <li>具有很好的沟通能力与团队合作精神；</li>
              </ol>
            </div>

            <div class="job-position">
              <h2>销售工程师</h2>
              <h3>岗位职责：</h3>
              <ol>
                <li>激光光源、无源器件、光纤放大器、测试设备等光电类产品的销售和推广；</li>
                <li>与客户之间的日常沟通及客户关系的维护；</li>
                <li>相关市场信息的搜集、整理和分析。</li>
              </ol>
              <h3>任职资格：</h3>
              <ol>
                <li>大专以上学历，光通信或光电子等相关专业；</li>
                <li>有较强的语言表达能力与沟通能力，以及优秀的团队合作精神；</li>
                <li>熟悉该行业产品市场，有相应产品销售经验，了解主流行业技术；</li>
                <li>学习能力强，有挑战精神。</li>
              </ol>
            </div>
          </div>

          <div class="resume-submission">
            <p>简历请发送到: <a href="mailto:hr@qoptronics.com">hr@qoptronics.com</a></p>
            <p>联系人：王经理</p>
          </div>
    </div>
</template>

<style scoped>
@import '@/assets/css/contact.css';
@import '@/assets/css/about.css';
</style>