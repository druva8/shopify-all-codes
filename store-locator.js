// Store Locator functionality
class StoreLocator {
  constructor() {
    this.modal = document.getElementById('store-locator-modal');
    this.button = document.getElementById('find-store-button');
    this.closeButton = document.getElementById('close-store-locator');
    this.searchInput = document.getElementById('store-search-input');
    this.nearMeButton = document.querySelector('.near-me-btn');
    this.searchSubmit = document.querySelector('.search-submit');
    
    this.init();
  }

  init() {
    // Open modal
    this.button?.addEventListener('click', () => this.openModal());
    
    // Close modal
    this.closeButton?.addEventListener('click', () => this.closeModal());
    
    // Close on outside click
    this.modal?.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });
    
    // Near Me button
    this.nearMeButton?.addEventListener('click', () => this.handleNearMe());
    
    // Search submit
    this.searchSubmit?.addEventListener('click', () => this.handleSearch());
    
    // Enter key in search input
    this.searchInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.handleSearch();
      }
    });
  }

  openModal() {
    if (this.modal && this.button) {
      this.modal.style.display = 'flex';
      this.button.setAttribute('aria-expanded', 'true');
      document.body.classList.add('overflow-hidden');
      // Focus search input when modal opens
      setTimeout(() => this.searchInput?.focus(), 100);
    }
  }

  closeModal() {
    if (this.modal && this.button) {
      this.modal.style.display = 'none';
      this.button.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('overflow-hidden');
    }
  }

  async handleNearMe() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    try {
      const position = await this.getCurrentPosition();
      // Here you would typically send these coordinates to your store locator API
      console.log('Location:', position.coords.latitude, position.coords.longitude);
      // TODO: Implement actual store search with coordinates
    } catch (error) {
      alert('Unable to retrieve your location');
    }
  }

  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  handleSearch() {
    const searchTerm = this.searchInput?.value.trim();
    if (!searchTerm) {
      alert('Please enter a town or postcode');
      return;
    }
    
    // TODO: Implement actual store search with searchTerm
    console.log('Searching for:', searchTerm);
  }
}

// Initialize store locator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  var findStoreLink = document.getElementById('find-store-link');
  var modal = document.getElementById('store-locator-modal');
  var closeModal = document.getElementById('close-store-locator');
  var searchInput = document.getElementById('store-search-input');
  var searchWrapper = document.getElementById('search-input-wrapper');
  var errorMessage = document.getElementById('search-error-message');
  var searchSubmit = document.querySelector('.search-submit');
  var nearMeButton = document.querySelector('.near-me-btn');
  var findStoreButton = document.getElementById('find-store-button');

  // Open modal
  if (findStoreButton) {
    findStoreButton.addEventListener('click', function(e) {
      e.preventDefault();
      modal.style.display = 'flex';
      document.body.classList.add('overflow-hidden');
    });
  }

  // Close modal
  if (closeModal) {
    closeModal.addEventListener('click', function() {
      modal.style.display = 'none';
      document.body.classList.remove('overflow-hidden');
      clearError();
    });
  }

  // Close on outside click
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.classList.remove('overflow-hidden');
        clearError();
      }
    });
  }

  // Validation on search
  if (searchSubmit) {
    searchSubmit.addEventListener('click', function(e) {
      if (!searchInput.value.trim()) {
        e.preventDefault();
        showError();
      } else {
        clearError();
      }
    });
  }

  // Remove error on input
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      if (searchInput.value.trim()) {
        clearError();
      }
    });
  }

  function showError() {
    searchWrapper.classList.add('error');
    searchInput.classList.add('error');
    errorMessage.style.display = 'block';
  }

  function clearError() {
    searchWrapper.classList.remove('error');
    searchInput.classList.remove('error');
    errorMessage.style.display = 'none';
  }
}); 
