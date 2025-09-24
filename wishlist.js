// document.addEventListener("DOMContentLoaded", function () {
//   const wishlistButtons = document.querySelectorAll(".wt-button");
//   const wishlistCountEl = document.getElementById("wt-count");
//   let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

//   // Initialize wishlist button state
//   wishlistButtons.forEach(button => {
//     const handle = button.dataset.productHandle;
//     if (wishlist.includes(handle)) {
//       button.classList.add("active");
//     }

//     button.addEventListener("click", function () {
//       const handle = this.dataset.productHandle;

//       if (!wishlist.includes(handle)) {
//         wishlist.push(handle);
//         showSuccessNotification("Added to Wishlist.");
//       } else {
//         wishlist = wishlist.filter(h => h !== handle);
//         showSuccessNotification("Removed from Wishlist.");
//       }

//       localStorage.setItem("wishlist", JSON.stringify(wishlist));
//       this.classList.toggle("active");
//       updateWishlistCount();
//     });
//   });

//   function updateWishlistCount() {
//     // ✅ Always read from localStorage, not just the old variable
//     let storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

//     if (storedWishlist.length > 0) {
//       wishlistCountEl.textContent = storedWishlist.length;
//       wishlistCountEl.style.display = "flex";
//     } else {
//       wishlistCountEl.textContent = "";
//       wishlistCountEl.style.display = "none";
//     }
//   }

//   function showSuccessNotification(message) {
//     const existing = document.getElementById("success-notification");
//     if (existing) existing.remove();

//     const notification = document.createElement("div");
//     notification.id = "success-notification";
//     notification.className = "success-notification";
//     notification.innerHTML = `
//       <div class="success-msg">
//         <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="icon icon-checkmark" viewBox="0 0 12 9">
//           <path fill="currentColor" fill-rule="evenodd" d="M11.35.643a.5.5 0 0 1 .006.707l-6.77 6.886a.5.5 0 0 1-.719-.006L.638 4.845a.5.5 0 1 1 .724-.69l2.872 3.011 6.41-6.517a.5.5 0 0 1 .707-.006z" clip-rule="evenodd"/>
//         </svg>
//         <span>${message}</span>
//       </div>
//     `;

//     document.body.appendChild(notification);

//     setTimeout(() => {
//       notification.style.opacity = "0";
//       setTimeout(() => notification.remove(), 1000);
//     }, 2000);
//   }

//   // ✅ Run immediately on page load
//   updateWishlistCount();
// });

document.addEventListener("DOMContentLoaded", function () {
  const wishlistButtons = document.querySelectorAll(".wt-button");
  const wishlistCountEl = document.getElementById("wt-count");
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  // Initialize wishlist button state
  wishlistButtons.forEach(button => {
    const handle = button.dataset.productHandle;
    if (wishlist.includes(handle)) {
      button.classList.add("active");
    }

    button.addEventListener("click", function () {
      const handle = this.dataset.productHandle;

      if (!wishlist.includes(handle)) {
        wishlist.push(handle);
        showSuccessNotification("Added to Wishlist.");
      } else {
        wishlist = wishlist.filter(h => h !== handle);
        showSuccessNotification("Removed from Wishlist.");
      }

      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      this.classList.toggle("active");
      updateWishlistCount();
    });
  });

  function updateWishlistCount() {
    if (wishlist.length > 0) {
      wishlistCountEl.textContent = wishlist.length;
      wishlistCountEl.style.display = "flex";
    } else {
      wishlistCountEl.textContent = "";
      wishlistCountEl.style.display = "none";
    }
  }

  function showSuccessNotification(message) {
    const existing = document.getElementById("success-notification");
    if (existing) existing.remove();

    const notification = document.createElement("div");
    notification.id = "success-notification";
    notification.className = "success-notification";
    notification.innerHTML = `
      <div class="success-msg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="icon icon-checkmark" viewBox="0 0 12 9">
          <path fill="currentColor" fill-rule="evenodd" d="M11.35.643a.5.5 0 0 1 .006.707l-6.77 6.886a.5.5 0 0 1-.719-.006L.638 4.845a.5.5 0 1 1 .724-.69l2.872 3.011 6.41-6.517a.5.5 0 0 1 .707-.006z" clip-rule="evenodd"/>
        </svg>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = '';
      setTimeout(() => notification.remove(), 1000);
    }, 2000);
  }

  updateWishlistCount();
});
// document.addEventListener("DOMContentLoaded", function () {
//   const wishlistButtons = document.querySelectorAll(".wt-button");
//   const wishlistCountEl = document.getElementById("wt-count");
//   let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

//   // Initialize wishlist button state
//   wishlistButtons.forEach(button => {
//     const handle = button.dataset.productHandle;
//     if (wishlist.includes(handle)) {
//       button.classList.add("active");
//     }

//     button.addEventListener("click", function () {
//       const handle = this.dataset.productHandle;

//       if (!wishlist.includes(handle)) {
//         wishlist.push(handle);
//         showSuccessNotification("Added to Wishlist.");
//       } else {
//         wishlist = wishlist.filter(h => h !== handle);
//         showSuccessNotification("Removed from Wishlist.");
//       }

//       localStorage.setItem("wishlist", JSON.stringify(wishlist));
//       this.classList.toggle("active");
//       updateWishlistCount();
//     });
//   });

//   function updateWishlistCount() {
//     // ✅ Always show count, even if 0
//     wishlistCountEl.textContent = wishlist.length;
//     wishlistCountEl.style.display = "flex";
//   }

//   function showSuccessNotification(message) {
//     const existing = document.getElementById("success-notification");
//     if (existing) existing.remove();

//     const notification = document.createElement("div");
//     notification.id = "success-notification";
//     notification.className = "success-notification";
//     notification.innerHTML = `
//       <div class="success-msg">
//         <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="icon icon-checkmark" viewBox="0 0 12 9">
//           <path fill="currentColor" fill-rule="evenodd" d="M11.35.643a.5.5 0 0 1 .006.707l-6.77 6.886a.5.5 0 0 1-.719-.006L.638 4.845a.5.5 0 1 1 .724-.69l2.872 3.011 6.41-6.517a.5.5 0 0 1 .707-.006z" clip-rule="evenodd"/>
//         </svg>
//         <span>${message}</span>
//       </div>
//     `;

//     document.body.appendChild(notification);

//     setTimeout(() => {
//       notification.style.opacity = '0';
//       setTimeout(() => notification.remove(), 1000);
//     }, 2000);
//   }

//   // ✅ Make sure correct number shows immediately on page load
//   updateWishlistCount();
// });
