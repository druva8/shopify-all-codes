document.addEventListener('DOMContentLoaded', function() {
  const sortSelect = document.getElementById('SortBy'); // Desktop sort select
  const mobileSortSelect = document.getElementById('SortBy-mobile'); // Mobile sort select
  const productGrid = document.getElementById('ProductGridContainer');

  if (!productGrid) return; // Exit if no grid

  function sortProducts(sortBy) {
    const products = Array.from(productGrid.querySelectorAll('.product-card'));
    products.sort((a, b) => {
      let aRating = parseFloat(a.dataset.rating) || 0;
      let bRating = parseFloat(b.dataset.rating) || 0;

      switch (sortBy) {
        case 'rating-desc':
          return bRating - aRating; // High to low
        case 'rating-asc':
          return aRating - bRating; // Low to high
        default:
          return 0; // No sort for other options
      }
    });

    // Re-append sorted products to grid
    products.forEach(product => productGrid.appendChild(product));

    // Update URL without reload
    const url = new URL(window.location);
    url.searchParams.set('sort_by', sortBy);
    window.history.replaceState({}, '', url);

    // Add/remove sorting class for animation
    productGrid.classList.add('sorting');
    setTimeout(() => productGrid.classList.remove('sorting'), 300);
  }

  // Handle desktop sort change
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sortProducts(e.target.value);
    });
  }

  // Handle mobile sort change
  if (mobileSortSelect) {
    mobileSortSelect.addEventListener('change', (e) => {
      sortProducts(e.target.value);
    });
  }

  // Initial sort on load
  const initialSort = new URLSearchParams(window.location.search).get('sort_by') || 'manual';
  if (initialSort === 'rating-descending' || initialSort === 'rating-asc') {
    sortProducts(initialSort);
  }
});


// document.addEventListener('DOMContentLoaded', function() {
//   const sortSelect = document.getElementById('SortBy'); // Desktop sort select
//   const mobileSortSelect = document.getElementById('SortBy-mobile'); // Mobile sort select
//   const productGrid = document.getElementById('ProductGridContainer');

//   if (!productGrid) return; // Exit if no grid

//   function sortProducts(sortBy) {
//     const products = Array.from(productGrid.children); // Get all product cards

//     products.sort((a, b) => {
//       let aVal = parseFloat(a.dataset.rating) || 0;
//       let bVal = parseFloat(b.dataset.rating) || 0;

//       switch (sortBy) {
//         case 'rating-desc':
//           return bVal - aVal; // High to low
//         case 'rating-asc':
//           return aVal - bVal; // Low to high
//         default:
//           return 0; // No sort for other options
//       }
//     });

//     // Re-append sorted products to grid
//     products.forEach(product => productGrid.appendChild(product));

//     // Optional: Animate or show loading state
//     productGrid.classList.add('sorting');
//     setTimeout(() => productGrid.classList.remove('sorting'), 300);
//   }

//   // Listen for sort changes
//   if (sortSelect) {
//     sortSelect.addEventListener('change', (e) => {
//       const url = new URL(window.location);
//       url.searchParams.set('sort_by', e.target.value);
//       window.history.replaceState({}, '', url); // Update URL without reload
//       sortProducts(e.target.value);
//     });
//   }

//   if (mobileSortSelect) {
//     mobileSortSelect.addEventListener('change', (e) => {
//       const url = new URL(window.location);
//       url.searchParams.set('sort_by', e.target.value);
//       window.history.replaceState({}, '', url);
//       sortProducts(e.target.value);
//     });
//   }

//   // Hook into Shopify's facets.js for AJAX updates (if enabled)
//   if (typeof window.Facets !== 'undefined') {
//     document.addEventListener('facets:render:product-grid', function() {
//       const currentSort = new URLSearchParams(window.location.search).get('sort_by') || 'manual';
//       sortProducts(currentSort);
//     });
//   }

//   // Initial sort on load
//   const initialSort = new URLSearchParams(window.location.search).get('sort_by') || 'manual';
//   if (initialSort === 'rating-desc' || initialSort === 'rating-asc') {
//     sortProducts(initialSort);
//   }
// });

// document.addEventListener('DOMContentLoaded', function() {
//   const sortSelect = document.getElementById('SortBy'); // Desktop sort select
//   const mobileSortSelect = document.getElementById('SortBy-mobile'); // Mobile sort select
//   const productGrid = document.getElementById('ProductGridContainer');

//   if (!productGrid) return; // Exit if no grid

//   function sortProducts(sortBy) {
//     const products = Array.from(productGrid.querySelectorAll('.product-card'));
//     products.sort((a, b) => {
//       let aRating = parseFloat(a.dataset.rating) || 0;
//       let bRating = parseFloat(b.dataset.rating) || 0;

//       switch (sortBy) {
//         case 'rating-desc':
//           return bRating - aRating; // High to low
//         case 'rating-asc':
//           return aVal - bVal; // Low to high (fixed typo: aVal -> aRating)
//         default:
//           return 0; // No sort for other options
//       }
//     });

//     // Re-append sorted products to grid
//     products.forEach(product => productGrid.appendChild(product));

//     // Update URL without reload
//     const url = new URL(window.location);
//     url.searchParams.set('sort_by', sortBy);
//     window.history.replaceState({}, '', url);

//     // Add/remove sorting class for animation
//     productGrid.classList.add('sorting');
//     setTimeout(() => productGrid.classList.remove('sorting'), 300);
//   }

//   // Handle desktop sort change
//   if (sortSelect) {
//     sortSelect.addEventListener('change', (e) => {
//       sortProducts(e.target.value);
//     });
//   }

//   // Handle mobile sort change
//   if (mobileSortSelect) {
//     mobileSortSelect.addEventListener('change', (e) => {
//       sortProducts(e.target.value);
//     });
//   }

//   // Handle AJAX updates
//   document.addEventListener('facets:render:product-grid', () => {
//     const currentSort = new URLSearchParams(window.location.search).get('sort_by') || 'manual';
//     if (currentSort === 'rating-desc' || currentSort === 'rating-asc') {
//       sortProducts(currentSort);
//     }
//   });

//   // Initial sort on load
//   const initialSort = new URLSearchParams(window.location.search).get('sort_by') || 'manual';
//   if (initialSort === 'rating-desc' || initialSort === 'rating-asc') {
//     sortProducts(initialSort);
//   }
// });
