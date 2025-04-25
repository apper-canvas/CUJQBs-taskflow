const CANVAS_ID = "807c0892e51c484da442b5da46b823ff";

class ApperService {
  constructor() {
    this.client = null;
    this.initialized = false;
  }

  initialize() {
    if (!this.initialized && window.ApperSDK) {
      const { ApperClient } = window.ApperSDK;
      this.client = new ApperClient(CANVAS_ID);
      this.initialized = true;
    }
    return this.client;
  }

  getClient() {
    if (!this.initialized) {
      return this.initialize();
    }
    return this.client;
  }

  setupUI(target, options) {
    if (window.ApperSDK) {
      const { ApperUI } = window.ApperSDK;
      const client = this.getClient();
      
      if (client && ApperUI) {
        ApperUI.setup(client, {
          target,
          clientId: CANVAS_ID,
          ...options,
        });
        
        return ApperUI;
      }
    }
    
    return null;
  }
  
  showLogin(target) {
    if (window.ApperSDK) {
      const { ApperUI } = window.ApperSDK;
      if (ApperUI) {
        ApperUI.showLogin(target);
      }
    }
  }
  
  showSignup(target) {
    if (window.ApperSDK) {
      const { ApperUI } = window.ApperSDK;
      if (ApperUI) {
        ApperUI.showSignup(target);
      }
    }
  }
  
  logout() {
    const client = this.getClient();
    if (client) {
      return client.logout();
    }
    return Promise.reject("ApperClient not initialized");
  }
}

const apperService = new ApperService();
export default apperService;