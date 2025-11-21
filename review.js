document.addEventListener("DOMContentLoaded", () => {
  const modalImage = document.getElementById("modal-product-image");
  const modalProductId = document.getElementById("modal-product-id");
  const modalProductName = document.getElementById("modal-product-title");
  const form = document.getElementById("review-form");
  const modalTitle = document.querySelector(".heading-review h2");
  const reviewTextarea = document.getElementById("review-text");
  const errorMessageEl = document.getElementById("review-error-message");
  const errorMessageSpan = document.querySelector("#review-error-message span");

  const resetReviewModal = () => {
    // clear stars
    document.querySelectorAll('input[name="rating"]').forEach((input) => {
      input.checked = false;
    });

    // clear textarea
    if (reviewTextarea) {
      reviewTextarea.value = "";
    }
  };
  
  document
    .querySelectorAll('modal-opener[data-modal="#ReviewModal"]')
    .forEach((opener) => {
      opener.addEventListener("click", (e) => {
        e.preventDefault();

        const productId = opener.dataset.productId || "";
        const productTitle = opener.dataset.productTitle || "";
        const productImage = opener.dataset.productImage || "";

        if (modalProductId) {
          modalProductId.value = productId;
          modalProductId.setAttribute("value", productId);
        }
        if (modalProductName) {
          modalProductName.value = productTitle;
          modalProductName.setAttribute("value", productTitle);
        }
        if (modalTitle) {
          modalTitle.textContent = productTitle;
        }
        if (modalImage) {
          if (productImage) {
            modalImage.src = productImage;
            modalImage.classList.remove("hidden");
          } else {
            modalImage.classList.add("hidden");
          }
        }
        resetReviewModal();
      });
    });

  document.querySelectorAll('input[name="rating"]').forEach((input) => {
    input.addEventListener("change", (e) => {
      errorMessageEl.classList.add("hidden");
      console.log("Rating changed to:", e.target.value);
    });
  });
  // Submit review form
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      errorMessageEl.classList.add("hidden");

      const selectedRating = Array.from(
        document.getElementsByName("rating")
      ).find((radio) => radio.checked)?.value;
      const body = document.getElementById("review-text").value.trim();

      if (!selectedRating || !body) {
        errorMessageEl.classList.remove("hidden");
        return; // Stop submission
      }

      const productId = modalProductId?.value || "";
      const productTitle = modalProductName?.value || "";
      const name = document.getElementById("modal-name-id").value;
      const email = document.getElementById("modal-email-id").value;

      // if (!rating || !body) {
      //   alert("Please select a rating and write your review.");
      //   return;
      // }

      const payload = {
        api_token: "rBh4IlPbQinqShfGuwwd9PRHWJ0",
        shop_domain: "abercrombieid.myshopify.com",
        platform: "shopify",
        id: productId,
        email: email,
        name: name,
        reviewer_name_format: "all_initials",
        rating: selectedRating,
        title: productTitle,
        body: body,
      };
      console.log("Sending payload", payload);

      try {
        const response = await fetch("/apps/mapclub-1/judge-reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        console.log("Judge.me API response", data);

        if (response.ok) {
          alert("✅ Review submitted successfully!");
          location.reload();
        } else {
          errorMessageSpan.textContent =
            "Error submitting review. Please try again.";
          errorMessageEl.classList.remove("hidden");
        }
      } catch (error) {
        errorMessageSpan.textContent = "Network error. Please try again later.";
        errorMessageEl.classList.remove("hidden");
      }
    });
  }

  document.body.addEventListener("modalClosed", (event) => {
    const closedModal = event.detail?.eventTriggered;
    if (closedModal && closedModal.id === "ReviewModal") {
      resetReviewModal();
      errorMessageEl.classList.add("hidden");
    }
  });
});
