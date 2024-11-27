<template>
    <div class="company-list">
      <h1 class="title">合作单位</h1>
      
      <div class="company-grid">
        <div v-for="research in researchPartners" 
             :key="research.name"
             class="company-item">
          
          <div class="company-header" @click="openResearchModal(research)">
            <img :src="research.imageUrl" 
                 :alt="research.name" 
                 class="company-logo">
            <div class="name-with-icon">
              <h3 class="company-name">{{ research.name }}</h3>
              <span class="expand-icon">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="selectedResearch" class="modal-overlay" @click="closeResearchModal">
        <div class="modal-content" @click.stop>
          <button class="close-button" @click="closeResearchModal">×</button>
          <div class="modal-header">
            <img :src="selectedResearch.imageUrl" 
                 :alt="selectedResearch.name" 
                 class="modal-company-logo">
            <h2 class="modal-company-name">{{ selectedResearch.name }}</h2>
          </div>
          <div class="modal-body">
            <div class="company-description" v-html="selectedResearch.description"></div>
          </div>
        </div>
      </div>

      <h1 class="title">代理品牌</h1>
      
      <div class="company-grid">
        <div v-for="company in companies" 
             :key="company.name"
             class="company-item">
          
          <div class="company-header" @click="openModal(company)">
            <img :src="company.imageUrl" 
                 :alt="company.name" 
                 class="company-logo">
            <div class="name-with-icon">
              <h3 class="company-name">{{ company.name }}</h3>
              <span class="expand-icon">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="selectedCompany" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <button class="close-button" @click="closeModal">×</button>
          <div class="modal-header">
            <img :src="selectedCompany.imageUrl" 
                 :alt="selectedCompany.name" 
                 class="modal-company-logo">
            <h2 class="modal-company-name">{{ selectedCompany.name }}</h2>
          </div>
          <div class="modal-body">
            <div class="company-description" v-html="selectedCompany.description"></div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import companyData from '@/assets/data/company_info.json'
  import researchData from '@/assets/data/research_info.json'
  
  export default {
    name: 'Cooperations',
    data() {
      return {
        researchPartners: researchData.map(research => ({
          ...research,
          imageUrl: new URL(`../assets/images/research_logos/${research.logo}`, import.meta.url).href
        })),
        selectedResearch: null,
        companies: companyData.map(company => ({
          ...company,
          imageUrl: new URL(`../assets/images/company_logos/${company.logo}`, import.meta.url).href
        })),
        selectedCompany: null
      }
    },
    methods: {
      openResearchModal(research) {
        this.selectedResearch = research;
      },
      closeResearchModal() {
        this.selectedResearch = null;
      },
      openModal(company) {
        this.selectedCompany = company;
      },
      closeModal() {
        this.selectedCompany = null;
      }
    }
  }
  </script>
  
  <style scoped>
  .company-list {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .title {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .company-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
    justify-content: flex-start;
  }
  
  .company-item {
    flex: 0 0 calc(20% - 20px);
    min-width: 160px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .company-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    cursor: pointer;
  }
  
  .company-logo {
    width: 80px;
    height: 80px;
    object-fit: contain;
    margin-bottom: 12px;
    margin-right: 0;
  }
  
  .name-with-icon {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  .company-name {
    font-size: 14px;
    margin: 0;
    text-align: left;
    white-space: normal;
    overflow: visible;
    text-overflow: initial;
    line-height: 1.4;
  }
  
  .expand-icon {
    display: flex;
    align-items: center;
    transition: transform 0.3s ease;
  }
  
  .expand-icon svg {
    fill: #666;
  }
  
  .company-description {
    line-height: 1.6;
    color: #666;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    border-radius: 8px;
    width: 90%;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
  }
  
  .modal-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    border-bottom: 1px solid #eee;
    text-align: center;
  }
  
  .modal-company-logo {
    width: 120px;
    height: 120px;
    object-fit: contain;
    margin-bottom: 20px;
  }
  
  .modal-company-name {
    font-size: 24px;
    font-weight: 600;
    margin: 0;
    color: #333;
  }
  
  .close-button {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 28px;
    cursor: pointer;
    padding: 0 8px;
    color: #666;
    transition: color 0.3s ease;
  }
  
  .close-button:hover {
    color: #333;
  }
  
  .modal-body {
    padding: 20px;
  }
  
  @media screen and (max-width: 1200px) {
    .company-item {
      flex: 0 0 calc(25% - 20px);
    }
  }
  
  @media screen and (max-width: 900px) {
    .company-item {
      flex: 0 0 calc(33.33% - 20px);
    }
  }
  </style>