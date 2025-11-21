document.addEventListener("DOMContentLoaded", () => {
  console.log("Email Us modal initialized");

  const modal = document.getElementById("EmailUsModal");
  const openBtn = document.getElementById("openEmailUsModal");
  const closeElements = modal.querySelectorAll("[data-close]");
  const dropdown = modal.querySelector("#helpType");
  const dropdownInfo = modal.querySelector("#helpTypeInfo");
  const continueBtn = modal.querySelector("#continueBtn");
  const dropdownError = modal.querySelector("#dropdownError");
  const dropdownSection = modal.querySelector("#emailDropdownSection");
  const infoSection = modal.querySelector("#emailInfoSection");
  const infoText = modal.querySelector("#infoText");
  const gotItBtn = modal.querySelector("#gotItBtn");
  const formSection = modal.querySelector("#emailFormSection");

  const infoTexts = {
    order_status: `
      <div class="py-[5px]">
        <div class="py-[10px]">
          <span class="emailUs_drop_title font-bold">
            <p>Need an update on your order? You can check your order status in your Order History.</p>
            <p>If you're having trouble, just close this window and click the Chat option to get started. If it's during our support hours, one of our friendly team members will jump in to help out.</p>
          </span>
        </div>
      </div>
    `,
    cancel_order: `
      <div class="py-[5px]">
        <div class="py-[10px]">
          <span class="emailUs_drop_title font-bold">
            <p>Orders can only be canceled shortly after they're placed. To check, go to your Order History — if cancellation is still possible, you'll see a Cancel button next to your order.</p>
            <p>Don't see the button? That means your order is already being prepared and can't be canceled — even by us.</p>
            <p>Need to make a change instead? If your order hasn't shipped yet, close this window and click Chat. We'll check the status and help if we can. Once it ships, changes aren't possible.</p>
          </span>
        </div>
      </div>
    `,
    returns: `
      <div class="py-[5px]">
        <div class="py-[10px]">
          <span class="emailUs_drop_title font-bold">
            <p>Returning or exchanging is easy! Head to your Order History and click on the order you'd like to return or exchange. If it's still within the return window, you'll see options to start a return or exchange right there.</p>
            <p>From there, just follow the step-by-step instructions to select your items and choose how you'd like to receive your refund or replacement.</p>
            <p>Need more details? <a href="#" class="underline">Click here</a> to check out our return policy.</p>
          </span>
        </div>
      </div>
    `,
  };

  if (!continueBtn) {
    setTimeout(arguments.callee, 300);
    return;
  }

  // --- OPEN / CLOSE MODAL ---
  openBtn?.addEventListener("click", () => {
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    resetModal();
  });

  closeElements.forEach((el) =>
    el.addEventListener("click", () => {
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
      resetModal();
    })
  );

  function resetModal() {
    dropdownSection.classList.remove("hidden");
    infoSection.classList.add("hidden");
    formSection.classList.add("hidden");
    dropdown.value = "";
    dropdownError.classList.add("hidden");
    const oldDropdown = formSection.querySelector(".form-dropdown-wrapper");
    if (oldDropdown) oldDropdown.remove();

    // Clear all previous validation errors
    formSection.querySelectorAll(".error-message-field-emailUs").forEach((el) => el.remove());
    formSection.querySelectorAll(".field-login-error-emailUs").forEach((el) =>
      el.classList.remove("field-login-error-emailUs")
    );
  }

  // --- CONTINUE BUTTON ---
  continueBtn.addEventListener("click", () => {
    console.log("Continue clicked");
    const value = dropdown.value;

    // Dropdown validation with inline error handling
    const existingError = dropdown.nextElementSibling;
    if (existingError && existingError.classList.contains("error-message-field-emailUs"))
      existingError.remove();
    dropdown.classList.remove("field-login-error-emailUs");

    if (!value) {
      dropdown.classList.add("field-login-error-emailUs");
      const error = document.createElement("div");
      error.classList.add("error-message-field-emailUs");
      error.innerText = "Please select an option.";
      dropdown.insertAdjacentElement("afterend", error);
      return;
    }

    dropdownError.classList.add("hidden");
    handleDropdownChange(value);
  });

  // --- STEP LOGIC ---
  function handleDropdownChange(value) {
    dropdownSection.classList.add("hidden");
    infoSection.classList.add("hidden");
    formSection.classList.add("hidden");

    const oldDropdown = formSection.querySelector(".form-dropdown-wrapper");
    if (oldDropdown) oldDropdown.remove();

    dropdown.value = value;
    dropdownInfo.value = value;

    if (["order_status", "cancel_order", "returns"].includes(value)) {
      infoSection.classList.remove("hidden");
      infoText.innerHTML = infoTexts[value];
    } else {
      formSection.classList.remove("hidden");
      const wrapper = document.createElement("div");
      wrapper.className = "form-dropdown-wrapper mb-4";
      wrapper.innerHTML =
        '<label class="block font-semibold mb-2 text-gray-800">What do you need help with?</label>' +
        '<select id="helpTypeForm" class="emailUsForm_select border border-gray-400 rounded-md w-full focus:outline-none">' +
        '<option value="" disabled selected hidden>Select One*</option>' +
        '<option value="order_status">Order Status</option>' +
        '<option value="cancel_order">Cancel/Change Order</option>' +
        '<option value="returns">Returns/Exchanges</option>' +
        '<option value="issue_order">Issue with Existing Order</option>' +
        '<option value="issue_returns">Issue with Existing Returns/Exchanges</option>' +
        '<option value="something_else">Something Else</option>' +
        "</select>";
      formSection.prepend(wrapper);
      const newFormDropdown = wrapper.querySelector("#helpTypeForm");
      newFormDropdown.value = value;
      newFormDropdown.addEventListener("change", (e) =>
        handleDropdownChange(e.target.value)
      );
    }
  }

  dropdownInfo.addEventListener("change", (e) =>
    handleDropdownChange(e.target.value)
  );

  gotItBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
    resetModal();
  });

  // Make reset function global
  window.resetEmailUsModal = resetModal;
});

// --- FORM VALIDATION HELPERS ---
function clearFieldError(container) {
  if (!container) return;
  const next = container.nextElementSibling;
  if (next && next.classList.contains("error-message-field-emailUs")) next.remove();
  container.classList.remove("field-login-error-emailUs");
}

function addFieldError(container, message) {
  if (!container) return;
  clearFieldError(container);
  container.classList.add("field-login-error-emailUs");
  const error = document.createElement("div");
  error.classList.add("error-message-field-emailUs");
  error.innerText = message;
  container.insertAdjacentElement("afterend", error);
}

function validateEmailForm(formEl) {
  let isValid = true;
  const nameRegex = /^[A-Za-z0-9\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  formEl.querySelectorAll(".error-message-field-emailUs").forEach((el) => el.remove());
  formEl.querySelectorAll(".field-login-error-emailUs").forEach((el) =>
    el.classList.remove("field-login-error-emailUs")
  );

  const fname = formEl.querySelector("input[name='contact[first_name]']");
  const lname = formEl.querySelector("input[name='contact[last_name]']");
  const nameGroup = formEl.querySelector(".name-group");
  const email = formEl.querySelector("input[name='contact[email]']");
  const message = formEl.querySelector("textarea[name='contact[body]']");

  if (
    !fname.value.trim() ||
    !lname.value.trim() ||
    !nameRegex.test(fname.value.trim()) ||
    !nameRegex.test(lname.value.trim())
  ) {
    isValid = false;
    addFieldError(nameGroup, "Please enter a valid First & Last Name.");
  }

  if (!email.value.trim()) {
    isValid = false;
    addFieldError(email.closest(".input-container"), "Please enter your Email.");
  } else if (!emailRegex.test(email.value.trim())) {
    isValid = false;
    addFieldError(email.closest(".input-container"), "Please enter a valid Email address.");
  }

  if (!message.value.trim()) {
    isValid = false;
    addFieldError(message.closest(".input-container"), "Please enter your Message.");
  }

  return isValid;
}

// --- BREVO EMAIL FUNCTIONALITY ---
async function sendEmail(formData) {
  const url = "https://api.brevo.com/v3/smtp/email";

  const subject = `Customer Service Request - ${formData.helpType || "General Inquiry"}`;
  const htmlContent =
    "<html><body>" +
    "<h3>Customer Service Form Submission</h3>" +
    "<p><strong>Name:</strong> " +
    formData.firstName +
    " " +
    formData.lastName +
    "</p>" +
    "<p><strong>Email:</strong> " +
    formData.email +
    "</p>" +
    "<p><strong>Order Number:</strong> " +
    (formData.orderNumber || "N/A") +
    "</p>" +
    "<p><strong>Help Type:</strong> " +
    (formData.helpType || "N/A") +
    "</p>" +
    "<p><strong>Message:</strong></p><p>" +
    formData.message +
    "</p>" +
    "</body></html>";

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": "",
      "content-type": "application/json",
      "X-Sib-Sandbox": "drop",
    },
    body: JSON.stringify({
      sender: { email: formData.email },
      to: [{ email: "hello@abercrombie.id" }],
      subject,
      htmlContent,
    }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("Brevo response:", data);

    if (response.ok) {
      const emailModal = document.getElementById("EmailUsModal");
      if (emailModal) {
        emailModal.classList.add("hidden");
        document.body.style.overflow = "auto";
      }

      showGlobalMessage({
        title: "Thank you!",
        message:
          "Your message has been sent successfully. Our support team will contact you soon.",
      });
    } else {
      showGlobalMessage({
        title: "Something went wrong",
        message: "We couldn't send your message. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Brevo Error:", error);
    showGlobalMessage({
      title: "Something went wrong",
      message: "Please check your connection or try again later.",
    });
  }
}

// --- FORM HANDLER ---
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("emailFormSection");
  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // ✅ Use the new validation before sending
    if (!validateEmailForm(form)) return;

    const helpTypeSelect = form.querySelector("#helpTypeForm");
    const formData = {
      firstName: form.querySelector('input[name="contact[first_name]"]').value.trim(),
      lastName: form.querySelector('input[name="contact[last_name]"]').value.trim(),
      email: form.querySelector('input[name="contact[email]"]').value.trim(),
      orderNumber: form.querySelector('input[name="contact[order_number]"]').value.trim(),
      message: form.querySelector('textarea[name="contact[body]"]').value.trim(),
      helpType: helpTypeSelect ? helpTypeSelect.value : "",
    };

    await sendEmail(formData);
    form.reset();
  });
});

// --- GLOBAL MESSAGE MODAL ---
function showGlobalMessage({ title, message }) {
  const modal =
    document.getElementById("GlobalMessageModal") ||
    document.getElementById("SoldOutModal");
  const contentDiv = modal.querySelector("#GlobalMessageContent");
  const closeBtn =
    modal.querySelector("#CloseGlobalMessageModal") ||
    modal.querySelector("#CloseSoldOutModal");

  contentDiv.innerHTML = `
    <h2 class="font-garamond text-primary font-bold !font-light text-[50px] tracking-[0.6px] mb-4">${title}</h2>
    ${message ? `<p class="text-gray-700 leading-relaxed mb-4">${message}</p>` : ""}
  `;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  closeBtn.onclick = () => {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
    if (window.resetEmailUsModal) window.resetEmailUsModal();
  };
}
