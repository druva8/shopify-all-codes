<div class="customer setting !max-w-full !p-0 account section-{{ section.id }}-padding">
  <div class="lg:flex bg-bodycart min-h-screen">
    {% render 'sidebar-CS',
      purchase_history_label: section.settings.purchase_history_label,
      purchase_history_link: section.settings.purchase_history_link,
      customer_service_label: section.settings.customer_service_label,
      customer_service_link: section.settings.customer_service_link,
      account_settings_label: section.settings.account_settings_label,
      account_settings_link: section.settings.account_settings_link,
      help_redirect_link: section.settings.help_redirect_link
    %}

    <main class="flex-1 py-24 px-8 lg:py-28 lg:px-20">
      <div class="bg-white py-8 px-12">
        <h3 class="text-2xl text-primary font-semibold font-dsRegular pb-6 mb-4 border-b border-divider">
          {{ 'customer.account.my_acc' | t }}
        </h3>
        <form id="customer-profile-update">
          <input type="hidden" name="customer_id" value="{{ customer.id }}">
          <div class="md:w-1/2">
            <div class="space-y-4">
              <div class="field-login border border-[#c6c6c6] my-12 ">
                <div class="field" data-error-group="firstname">
                  <input
                    type="text"
                    name="customer[first_name]"
                    id="FirstName"
                    autocomplete="given-name"
                    placeholder="{{ 'customer.register.first_name' | t }}"
                    value="{{ customer.first_name }}"
                  >
                  <label for="FirstName"> {{ 'customer.register.first_name' | t }} </label>
                </div>
                <div class="field" data-error-group="lastname">
                  <input
                    type="text"
                    name="customer[last_name]"
                    id="LastName"
                    autocomplete="family-name"
                    placeholder="{{ 'customer.register.last_name' | t }}"
                    value="{{ customer.last_name }}"
                  >
                  <label for="LastName"> {{ 'customer.register.last_name' | t }} </label>
                </div>
              </div>

              <div class="field-login border border-[#c6c6c6] after:content-[''] after:!none hidden-after !my-12">
                <div class="field ">
                  {% assign selected_gender = customer.metafields.custom.gender.value | downcase %}
                  <select
                    id="gender"
                    name="gender"
                    data-selected="{{ customer.metafields.custom.gender.value }}"
                  >
                    <option
                      value="MALE"
                      {% if selected_gender == 'male' %}
                        selected
                      {% endif %}
                    >
                      MALE
                    </option>
                    <option
                      value="FEMALE"
                      {% if selected_gender == 'female' %}
                        selected
                      {% endif %}
                    >
                      FEMALE
                    </option>
                  </select>
                  <label for="gender" class="{% if customer.metafields.custom.gender.value %}has-value{% endif %}">
                    {{- 'newsletter.modal.gender' | t -}}
                  </label>
                  <span class="icon down-arrow" data-icon="down-anf" data-testid="icon"></span>
                </div>
              </div>

              {% if customer %}
                {% assign dob = customer.metafields.custom.date_of_birth.value %}
                {% if dob %}
                  {% assign dob_year = dob | date: '%Y' %}
                  {% assign dob_month = dob | date: '%B' %}
                  {% assign dob_day = dob | date: '%d' %}
                {% endif %}
              {% endif %}

              <div
                class="birthday"
                dob="{{ dob }}"
                dob_day="{{ dob_day }}"
                dob_month="{{ dob_month }}"
                dob_year="{{ dob_year }}"
              >
                <label class="text-primary text-bodysize font-dsRegular font-bold">
                  {{ 'newsletter.modal.birthday' | t }}
                </label>

                <div class="field-login border border-[#c6c6c6] mb-12" data-error-group="dob">
                  <!-- Day -->
                  {% assign selected_day = 0 %}
                  <div class="field">
                    <select
                      id="day"
                      name="dob_day"
                      data-selected="{{ dob_day }}"
                    >
                      <option
                        value=""
                        disabled
                        {% unless dob_day %}
                          selected
                        {% endunless %}
                      >
                        Day
                      </option>
                      {% for day in (1..31) %}
                        {% if day < 10 %}
                          {% assign day_value = '0' | append: day %}
                        {% else %}
                          {% assign day_value = day | append: '' %}
                        {% endif %}
                        {% if dob_day == day_value %}{% assign selected_day = day_value %}{% endif %}
                        <option
                          value="{{ day_value }}"
                          {% if dob_day == day_value %}
                            selected
                          {% endif %}
                        >
                          {{ day }}
                        </option>
                      {% endfor %}
                    </select>
                    <label for="day" class="{% if dob_day == selected_day %}has-value{% endif %}">
                      {{- 'newsletter.modal.day' | t -}}
                    </label>
                    <span class="icon down-arrow" data-icon="down-anf" data-testid="icon"></span>
                  </div>

                  <hr class="my-0 justify-self-center bg-[#c6c6c6] border-1 dark:bg-[#c6c6c6]" style="width: 91%;">

                  <!-- Month -->
                  <div class="field">
                    <select
                      id="month"
                      name="dob_month"
                      data-selected="{{ dob_month }}"
                    >
                      <option
                        value=""
                        disabled
                        {% unless dob_month %}
                          selected
                        {% endunless %}
                      >
                        Month
                      </option>
                      {% assign months = 'January,February,March,April,May,June,July,August,September,October,November,December'
                        | split: ','
                      %}
                      {% assign selected_month = '' %}
                      {% for month in months %}
                        {% if dob_month == month %}{% assign selected_month = month %}{% endif %}
                        <option
                          value="{{ month }}"
                          {% if dob_month == month %}
                            selected
                          {% endif %}
                        >
                          {{ month }}
                        </option>
                      {% endfor %}
                    </select>
                    <label for="month" class="{% if dob_month == selected_month %}has-value{% endif %}">
                      {{- 'newsletter.modal.birthday-months.month' | t -}}
                    </label>
                    <span class="icon down-arrow" data-icon="down-anf" data-testid="icon"></span>
                  </div>

                  <hr class="my-0 justify-self-center bg-[#c6c6c6] border-1 dark:bg-[#c6c6c6]" style="width: 91%;">

                  <!-- Year -->
                  <div class="field">
                    {% assign current_year = 'now' | date: '%Y' | plus: 0 %}
                    {% assign max_year = current_year | minus: 10 %}
                    {% assign start_year = current_year | minus: 100 %}
                    {% assign selected_year = '' %}
                    <select
                      id="year"
                      name="dob_year"
                      data-selected="{{ dob_year }}"
                    >
                      <option
                        value=""
                        disabled
                        {% unless dob_year %}
                          selected
                        {% endunless %}
                      >
                        Year
                      </option>
                      {% for year in (start_year..current_year) reversed %}
                        {% assign year_str = year | append: '' %}
                        {% if dob_year == year_str %}{% assign selected_year = year_str %}{% endif %}
                        <option
                          value="{{ year }}"
                          {% if dob_year == year_str %}
                            selected
                          {% endif %}
                        >
                          {{ year }}
                        </option>
                      {% endfor %}
                    </select>
                    <label for="year" class="{{selected_year}} {% if dob_year %}has-value{% endif %}">
                      {{- 'newsletter.modal.year' | t -}}
                    </label>
                    <span class="icon down-arrow" data-icon="down-anf" data-testid="icon"></span>
                  </div>
                </div>
              </div>

              <div class="field-login border border-[#c6c6c6] after:content-[''] after:!none hidden-after !my-12">
                <div class="field ">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value="{{ customer.email }}"
                    placeholder="Email Address"
                    readonly
                  >
                  <label for="email">{{ 'blogs.article.email_address' | t }}</label>
                </div>
              </div>

              <div class="field-login border border-[#c6c6c6] after:content-[''] after:!none hidden-after !my-12">
                <div class="field">
                  <input
                    id="MobileNumber"
                    name="customer[phone]"
                    value="{{ customer.phone }}"
                    autocomplete="tel"
                    placeholder="Phone Number"
                    readonly
                  >
                  <label for="MobileNumber">{{ 'templates.contact.form.phone' | t }}</label>
                </div>
              </div>

              <div class="flex mb-6">
                <button
                  type="submit"
                  class="customer-profile-update-btn w-full hover:bg-btn-hover relative"
                  style="background: #253746"
                >
                  <span id="profileButtonText">
                    {{ 'sections.cart.update' | t }}
                  </span>

                  <span
                    id="profileLoadingOverlay"
                    class="hidden absolute inset-0 flex items-center justify-center bg-[#253746] text-white"
                  >
                    <span class="loading-overlay__spinner" style="margin-right: 10px;"></span>
                    {{- 'sections.country-selector.processing' | t }}
                  </span>

                  <span
                    id="profileChangedTick"
                    class="hidden absolute inset-0 flex items-center justify-center bg-[#253746] text-white"
                    style="gap: 10px;"
                  >
                    <span class="icon" data-icon="check-anf-text" data-testid="icon"></span>
                    {{ 'sections.cart.updated' | t }}
                  </span>
                </button>

                <button type="button" class="cancel-btn w-full !text-primary">
                  {{ 'customer.account.cancel' | t }}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div class="bg-white mt-16 py-8 px-12">
        <h3 class="text-2xl text-primary font-semibold font-dsRegular pb-6 mb-12 border-b border-divider">
          {{ 'customer.account.checkout_info' | t }}
        </h3>

        <div class="md:flex gap-12 justify-between">
          <div class="!bg-bodycart md:w-1/2 border border-[#eee] py-8 mb-12 md:mb-0 px-10">
            <div class="flex justify-between">
              <p class="text-bodysize text-primary font-semibold font-dsRegular">
                {{ 'customer.account.address_title' | t }}
              </p>

              {% if customer.default_address %}
                <a href="{{ routes.account_addresses_url }}">{{ 'customer.account.change' | t }}</a>
              {% endif %}
            </div>

            {% if customer.default_address %}
              <div class="customer-address" style="padding: 1rem 0 1.5rem;">{{ customer.default_address | format_address }}</div>

              <hr class="w-full !m-0 justify-self-center bg-[#c6c6c6] border dark:bg-[#c6c6c6]">

              <div class="flex gap-8">
                <span aria-hidden="true" class="icon" data-icon="check-anf" data-testid="icon"></span>
                <p class="text-checkout-d font-bold !m-0 content-center" style="font-size: 1.5rem;">
                  {{ 'customer.addresses.default_address' | t }}
                </p>
              </div>

            {% else %}
              <p class="text-gray-500 !text-bodysize">{{ 'customer.account.no_default_address' | t }}</p>

              <div class="w-full mt-4">
                <a href="{{ routes.account_addresses_url }}" class="w-full">
                  <button
                    data-variant="tertiary-dark"
                    class="button address-btn w-full"
                    data-action="open-join"
                  >
                    {{ 'customer.account.select_address' | t }}
                  </button>
                </a>
              </div>
            {% endif %}
          </div>

          <div class="hidden !bg-bodycart md:w-1/2 border border-[#eee] py-8 px-10">
            <div class="flex justify-between">
              <p class="text-bodysize text-primary font-semibold font-dsRegular">
                {{ 'customer.account.pay_method' | t }}
              </p>

              {% if customer.default_address %}
                <a href="{{ routes.account_addresses_url }}">{{ 'customer.account.change' | t }}</a>
              {% endif %}
            </div>

            {% if customer.default_address %}
              <div class="customer-address">{{ customer.default_address | format_address }}</div>

              <hr class="w-full !m-0 justify-self-center bg-[#c6c6c6] border dark:bg-[#c6c6c6]">

              <div class="flex gap-8">
                <span aria-hidden="true" class="icon" data-icon="check-anf" data-testid="icon"></span>
                <p class="text-checkout-d font-bold !m-0 content-center">
                  {{ 'customer.addresses.default_address' | t }}
                </p>
              </div>

            {% else %}
              <p class="text-gray-500 !text-bodysize">{{ 'customer.account.default_pay' | t }}</p>

              <div class="w-full mt-4">
                <a href="#" class="w-full">
                  <button
                    data-variant="tertiary-dark"
                    class="button address-btn w-full"
                    data-action="open-join"
                  >
                    {{ 'customer.account.select_pay' | t }}
                  </button>
                </a>
              </div>
            {% endif %}
          </div>
        </div>
      </div>

      <form id="email-preferences-form" customer-tags="{{ customer.tags | join: "," }}">
        <div class="bg-white mt-16 py-8 px-12">
          <h3 class="text-2xl text-primary font-semibold font-dsRegular pb-6 mb-12 border-b border-divider">
            {{ 'customer.account.email_preference' | t }}
          </h3>

          <p class="pt-6 pb-2 !m-0 font-bold text-left text-primary font-dsRegular !text-bodysize">
            <span>{{ 'customer.account.mail_subscription' | t }}</span>
          </p>

          <div class="pb-2 login-btm">
            <label
              for="sign-in-anf"
              class="label__checkbox text-bodysize text-primary cursor-pointer text-left"
            >
              <input
                id="sign-in-anf"
                name="contact[note][brand_abercrombie_fitch]"
                type="checkbox"
                class="!hidden peer mail-preference-checkbox"
                {% if customer.accepts_marketing and customer.tags contains 'brand:abercrombie' %}
                  checked
                {% endif %}
              >

              <div
                class="
                  w-[25px] h-[25px] border border-primary bg-white
                  peer-checked:bg-[#253746] peer-checked:border-primary
                  flex items-center justify-center
                "
                style="flex-shrink: 0;"
              >
                <span
                  aria-hidden="true"
                  class="icon check-icon pt-[2.5px] peer-checked:inline-block"
                  data-icon="check-anf"
                  data-testid="icon"
                ></span>
              </div>

              <div>
                <span class="font-bold">{{ 'customer.login_page.abercrombie_fitch' | t }}</span><br>
                <span class="text-bodycolor">{{ 'customer.account.epic_offer' | t }}</span>
              </div>
            </label>
          </div>

          <div class="py-6 mt-4 border-b login-btm border-divider">
            <label
              for="sign-in-anf-kid"
              class="label__checkbox text-bodysize text-primary cursor-pointer text-left"
            >
              <input
                id="sign-in-anf-kid"
                name="contact[note][brand_abercrombie_kids]"
                type="checkbox"
                class="!hidden peer mail-preference-checkbox"
                {% if customer.accepts_marketing and customer.tags contains 'brand:abercrombie_kids' %}
                  checked
                {% endif %}
              >

              <div
                class="
                  w-[25px] h-[25px] border border-primary bg-white
                  peer-checked:bg-[#253746] peer-checked:border-primary
                  flex items-center justify-center
                "
                style="flex-shrink: 0;"
              >
                <span
                  aria-hidden="true"
                  class="icon check-icon pt-[2.5px] peer-checked:inline-block"
                  data-icon="check-anf"
                  data-testid="icon"
                ></span>
              </div>

              <div>
                <span class="font-bold">{{ 'customer.login_page.abercrombie_kids' | t }}</span><br>
                <span class="text-bodycolor">{{ 'customer.account.update_afk' | t }}</span>
              </div>
            </label>
          </div>

          <div class="flex gap-2 py-8">
            <a href="/pages/website-terms-of-use" class="!text-[1.1rem]">
              {{ 'customer.recover_password.website_terms' | t }}
            </a>

            <a href="/pages/privacy-policy" class="!text-[1.1rem]">
              {{ 'customer.recover_password.privacy_policy' | t }}
            </a>
          </div>

          <input type="hidden" name="contact[tags]" id="contact-tags-input" value="">

          <div class="flex gap-6">
            <button
              type="submit"
              class="button !bg-primary !text-white relative"
              id="save-preferences-btn"
              disabled
              style="background: #253846;"
            >
              <span id="saveButtonText">{{ 'customer.account.save' | t }}</span>

              <!-- Dawn Loader -->
              <span
                id="saveLoadingOverlay"
                class="hidden absolute inset-0 flex items-center justify-center bg-[#253746] text-white"
              >
                <span class="loading-overlay__spinner" style="margin-right: 10px;"></span>
                {{- 'sections.country-selector.processing' | t }}
              </span>

              <span
                id="saveChangedTick"
                class="hidden absolute inset-0 flex items-center justify-center bg-[#253746] text-white"
                style="gap: 10px;"
              >
                <span class="icon" data-icon="check-anf-text" data-testid="icon"></span>
                {{ 'sections.country-selector.saved' | t }}
              </span>
            </button>

            <button type="button" class="cancel-btn !text-primary">{{ 'customer.account.cancel' | t }}</button>
          </div>
        </div>
      </form>



      <script>
        document.addEventListener('DOMContentLoaded', function () {
          updateDays();
          const form = document.getElementById('email-preferences-form');
          const profileForm = document.getElementById('customer-profile-update');
          const checkboxes = form.querySelectorAll("input[type='checkbox']");
          const saveButton = document.getElementById('save-preferences-btn');
          const cancelButton = form.querySelector('.cancel-btn');
          const hiddenTagsInput = document.getElementById('contact-tags-input');

          const initialStates = Array.from(checkboxes).map((cb) => cb.checked);

          function hasChanges() {
            return Array.from(checkboxes).some((cb, i) => cb.checked !== initialStates[i]);
          }

          function updateSaveButtonState() {
            saveButton.disabled = !hasChanges();
          }

          updateSaveButtonState();

          checkboxes.forEach((cb) => cb.addEventListener('change', updateSaveButtonState));

          cancelButton.addEventListener('click', function () {
            checkboxes.forEach((cb, i) => {
              cb.checked = initialStates[i];
              cb.dispatchEvent(new Event('change'));
            });
            updateSaveButtonState();
          });

          form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const buttonText = document.getElementById('saveButtonText');
            const loadingOverlay = document.getElementById('saveLoadingOverlay');
            const changedTick = document.getElementById('saveChangedTick');

            saveButton.disabled = true;
            buttonText?.classList.add('hidden');
            loadingOverlay?.classList.remove('hidden');

            try {
              let tags = [];
              let isSubscribed = false;
              const currentTags =
                form
                  ?.getAttribute('customer-tags')
                  ?.split(',')
                  .map((tag) => tag.trim()) || [];
              if (currentTags && currentTags.length) tags = [...currentTags];
              checkboxes.forEach((cb) => {
                if (cb.checked) {
                  if (cb.name.includes('brand_abercrombie_fitch')) {
                    if (!tags.includes('brand:abercrombie')) {
                      tags.push('brand:abercrombie');
                    }
                    isSubscribed = true;
                  }
                  if (cb.name.includes('brand_abercrombie_kids')) {
                    if (!tags.includes('brand:abercrombie_kids')) {
                      tags.push('brand:abercrombie_kids');
                    }
                    isSubscribed = true;
                  }
                } else {
                  if (cb.name.includes('brand_abercrombie_fitch')) {
                    tags = tags.filter((tag) => tag !== 'brand:abercrombie');
                  }
                  if (cb.name.includes('brand_abercrombie_kids')) {
                    tags = tags.filter((tag) => tag !== 'brand:abercrombie_kids');
                  }
                }
              });

              hiddenTagsInput.value = tags.join(', ');
              await newsletterSubscribe(tags, isSubscribed);

              loadingOverlay?.classList.add('hidden');
              changedTick?.classList.remove('hidden');

              setTimeout(() => {
                saveButton.disabled = false;
                changedTick?.classList.add('hidden');
                buttonText?.classList.remove('hidden');
                form.submit();
              }, 500);
            } catch (err) {
              console.error('Error while updating preferences:', err);
              loadingOverlay?.classList.add('hidden');
              buttonText?.classList.remove('hidden');
              saveButton.disabled = false;
            }
          });

          // Profile form validation and submission
          profileForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            if (!validateProfileForm(this)) {
              const button = this.querySelector('.customer-profile-update-btn');
              button.disabled = false;
              const buttonText = document.getElementById('profileButtonText');
              const loadingOverlay = document.getElementById('profileLoadingOverlay');
              loadingOverlay?.classList.add('hidden');
              buttonText?.classList.remove('hidden');
              return;
            }

            const button = this.querySelector('.customer-profile-update-btn');
            const buttonText = document.getElementById('profileButtonText');
            const loadingOverlay = document.getElementById('profileLoadingOverlay');
            const changedTick = document.getElementById('profileChangedTick');

            button.disabled = true;
            buttonText?.classList.add('hidden');
            loadingOverlay?.classList.remove('hidden');

            try {
              await profileUpdate(this);

              loadingOverlay?.classList.add('hidden');
              changedTick?.classList.remove('hidden');

              setTimeout(() => {
                button.disabled = false;
                changedTick?.classList.add('hidden');
                buttonText?.classList.remove('hidden');
                this.submit();
              }, 500);
            } catch (err) {
              console.error('Error while updating profile:', err);
              loadingOverlay?.classList.add('hidden');
              buttonText?.classList.remove('hidden');
              button.disabled = false;
            }
          });

          // Add real-time validation for input and select fields
          function setupRealTimeValidation() {
            const fields = profileForm.querySelectorAll('input, select');
            fields.forEach((field) => {
              field.addEventListener('input', () => validateField(field));
              field.addEventListener('change', () => validateField(field));
            });
          }

          // Validate individual field and clear errors if valid
          function validateField(field) {
            const nameRegex = /^[A-Za-z\s]+$/;
            const fieldContainer = field.closest('.field');
            const existingError = fieldContainer.nextElementSibling;
            const errorGroup = field.closest('[data-error-group]');

            // Remove existing error message and styling
            if (existingError && existingError.classList.contains('error-message-field')) {
              existingError.remove();
            }
            if (errorGroup) {
              errorGroup.classList.remove('field-login-error');
            } else {
              fieldContainer.classList.remove('field-login-error');
            }

            // Validate specific fields
            if (field.name === 'customer[first_name]' || field.name === 'customer[last_name]') {
              const value = field.value.trim();
              if (!value) {
                fieldContainer.classList.add('field-login-error');
                const error = document.createElement('div');
                error.classList.add('error-message-field');
                error.innerText =
                  field.name === 'customer[first_name]'
                    ? 'Please enter your First Name.'
                    : 'Please enter your Last Name.';
                fieldContainer.insertAdjacentElement('afterend', error);
              } else if (!nameRegex.test(value)) {
                fieldContainer.classList.add('field-login-error');
                const error = document.createElement('div');
                error.classList.add('error-message-field');
                error.innerText =
                  field.name === 'customer[first_name]'
                    ? 'First Name should contain only Letters.'
                    : 'Last Name should contain only Letters.';
                fieldContainer.insertAdjacentElement('afterend', error);
              }
            }

            // Validate DOB fields
            if (['dob_day', 'dob_month', 'dob_year'].includes(field.name)) {
              const dobGroup = profileForm.querySelector("div[data-error-group='dob']");
              const yearField = profileForm.querySelector('#year').closest('.field');
              const existingDobError = yearField.nextElementSibling;
              if (existingDobError && existingDobError.classList.contains('error-message-field')) {
                existingDobError.remove();
              }
              if (dobGroup) {
                dobGroup.classList.remove('field-login-error');
              }

              const daySelect = profileForm.querySelector('select[name="dob_day"]');
              const monthSelect = profileForm.querySelector('select[name="dob_month"]');
              const yearSelect = profileForm.querySelector('select[name="dob_year"]');
              const day = daySelect ? daySelect.value : '';
              const monthStr = monthSelect ? monthSelect.value : '';
              const year = yearSelect ? yearSelect.value : '';

              if (day && monthStr && year) {
                const months = {
                  January: 0,
                  February: 1,
                  March: 2,
                  April: 3,
                  May: 4,
                  June: 5,
                  July: 6,
                  August: 7,
                  September: 8,
                  October: 9,
                  November: 10,
                  December: 11,
                };
                const birthDate = new Date(parseInt(year), months[monthStr], parseInt(day));
                const age = calculateAge(birthDate);
                if (age < 18) {
                  dobGroup.classList.add('field-login-error');
                  const error = document.createElement('div');
                  error.classList.add('error-message-field');
                  error.innerText = 'You must be at least 18 years old.';
                  yearField.insertAdjacentElement('afterend', error);
                }
              } else if (!day || !monthStr || !year) {
                dobGroup.classList.add('field-login-error');
                const error = document.createElement('div');
                error.classList.add('error-message-field');
                error.innerText = 'Please select your Date of Birth.';
                yearField.insertAdjacentElement('afterend', error);
              }
            }
          }

          // Validate entire form on submission
          function validateProfileForm(form) {
            let isValid = true;
            const nameRegex = /^[A-Za-z\s]+$/;

            const requiredFields = [
              {
                selector: "input[name='customer[first_name]']",
                message: 'Please enter your First Name.',
                invalidMessage: 'First Name should contain only Letters.',
                regex: nameRegex,
              },
              {
                selector: "input[name='customer[last_name]']",
                message: 'Please enter your Last Name.',
                invalidMessage: 'Last Name should contain only Letters.',
                regex: nameRegex,
              },
            ];

            requiredFields.forEach((field) => {
              const input = form.querySelector(field.selector);
              if (!input) return;

              const value = input.value.trim();
              const fieldContainer = input.closest('.field');
              const existingError = fieldContainer.nextElementSibling;

              if (existingError && existingError.classList.contains('error-message-field')) {
                existingError.remove();
              }
              fieldContainer.classList.remove('field-login-error');

              if (!value) {
                isValid = false;
                fieldContainer.classList.add('field-login-error');
                const error = document.createElement('div');
                error.classList.add('error-message-field');
                error.innerText = field.message;
                fieldContainer.insertAdjacentElement('afterend', error);
              } else if (field.regex && !field.regex.test(value)) {
                isValid = false;
                fieldContainer.classList.add('field-login-error');
                const error = document.createElement('div');
                error.classList.add('error-message-field');
                error.innerText = field.invalidMessage;
                fieldContainer.insertAdjacentElement('afterend', error);
              }
            });

            const dobGroup = form.querySelector("div[data-error-group='dob']");
            if (dobGroup) dobGroup.classList.remove('field-login-error');
            const yearField = form.querySelector('#year').closest('.field');
            const existingDobError = yearField.nextElementSibling;
            if (existingDobError && existingDobError.classList.contains('error-message-field')) {
              existingDobError.remove();
            }

            const daySelect = form.querySelector('select[name="dob_day"]');
            const monthSelect = form.querySelector('select[name="dob_month"]');
            const yearSelect = form.querySelector('select[name="dob_year"]');
            const day = daySelect ? daySelect.value : '';
            const monthStr = monthSelect ? monthSelect.value : '';
            const year = yearSelect ? yearSelect.value : '';

            if (!day || !monthStr || !year) {
              isValid = false;
              if (dobGroup) dobGroup.classList.add('field-login-error');
              const error = document.createElement('div');
              error.classList.add('error-message-field');
              error.innerText = 'Please select your Date of Birth.';
              yearField.insertAdjacentElement('afterend', error);
            } else {
              const months = {
                January: 0,
                February: 1,
                March: 2,
                April: 3,
                May: 4,
                June: 5,
                July: 6,
                August: 7,
                September: 8,
                October: 9,
                November: 10,
                December: 11,
              };
              const birthDate = new Date(parseInt(year), months[monthStr], parseInt(day));
              const age = calculateAge(birthDate);
              if (age < 18) {
                isValid = false;
                if (dobGroup) dobGroup.classList.add('field-login-error');
                const error = document.createElement('div');
                error.classList.add('error-message-field');
                error.innerText = 'You must be at least 18 years old.';
                yearField.insertAdjacentElement('afterend', error);
              }
            }

            return isValid;
          }

          function calculateAge(birthDate) {
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
              age--;
            }
            return age;
          }

          async function newsletterSubscribe(tags, subscribed = false) {
            try {
              const customerId = '{% if customer %}{{ customer.id }}{% endif %}';
              const customerEmail = '{% if customer %}{{ customer.email }}{% endif %}';
              const mapToken = getCookie('map_token');

              if (!customerId) {
                alert('Customer ID not found');
                return null;
              }

              const customerSubscribe = await fetch('/apps/mapclub-1/newsletter-subscription', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  customerId,
                  customerEmail,
                  tags,
                  subscribed,
                }),
              });

              const customerSubscribeData = await customerSubscribe.json();
              return customerSubscribeData;
            } catch (err) {
              console.log('Error while updating customer consent', err);
              throw err;
            }
          }

          async function profileUpdate(form) {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            const mapToken = getCookie('map_token');
            if (!mapToken) {
              console.log('Session out please login again');
              if (data?.customer_id) window.location.href = '/account/logout';
              throw new Error('Session expired');
            }
            const customerDetails = {
              mapAccessToken: mapToken,
              customerId: data?.customer_id,
              phone: data?.['customer[phone]'],
              email: data?.email,
              firstName: data?.['customer[first_name]'],
              lastName: data?.['customer[last_name]'],
              dob: `${data?.dob_day}-${data?.dob_month}-${data?.dob_year}`,
              gender: data?.gender,
            };

            const profileUpdateRes = await fetch('/apps/mapclub-1/profile', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ customerDetails }),
            });
            const profileData = await profileUpdateRes.json();
            return profileData;
          }

          setupFormChangeTracker('#customer-profile-update', '.customer-profile-update-btn', '.cancel-btn');
          setupRealTimeValidation();
          function setupFormChangeTracker(formSelector, saveButtonSelector, cancelButtonSelector) {
            const form = document.querySelector(formSelector);
            const saveButton = form.querySelector(saveButtonSelector);
            const cancelButton = form.querySelector(cancelButtonSelector);

            if (!form || !saveButton || !cancelButton) return;

            const fields = Array.from(form.querySelectorAll('input, select, textarea'));
            const initialStates = fields.map((field) => (field.type === 'checkbox' ? field.checked : field.value));

            function hasChanges() {
              return fields.some((field, i) => {
                return field.type === 'checkbox'
                  ? field.checked !== initialStates[i]
                  : field.value !== initialStates[i];
              });
            }

            function updateSaveButtonState() {
              saveButton.disabled = !hasChanges();
            }

            fields.forEach((field) => field.addEventListener('change', updateSaveButtonState));
            fields.forEach((field) => field.addEventListener('input', updateSaveButtonState));

            cancelButton.addEventListener('click', () => {
              fields.forEach((field, i) => {
                if (field.type === 'checkbox') {
                  field.checked = initialStates[i];
                } else {
                  field.value = initialStates[i];
                }
                field.dispatchEvent(new Event('change'));
              });
              updateSaveButtonState();
            });

            updateSaveButtonState();
          }

          function updateDays() {
            const daySelect = document.querySelector('select[name="dob_day"]');
            const monthSelect = document.querySelector('select[name="dob_month"]');
            const yearSelect = document.querySelector('select[name="dob_year"]');

            if (!daySelect || !monthSelect || !yearSelect) return;
            const month = monthSelect.value;
            const year = parseInt(yearSelect.value, 10);

            if (!month || !year) return;

            // Map month names to numeric values
            const monthMap = {
              January: 1,
              February: 2,
              March: 3,
              April: 4,
              May: 5,
              June: 6,
              July: 7,
              August: 8,
              September: 9,
              October: 10,
              November: 11,
              December: 12,
            };

            const monthNum = monthMap[month];
            if (!monthNum) return;

            const daysInMonth = new Date(year, monthNum, 0).getDate();

            // Keep current selected day if possible
            const selectedDay = parseInt(daySelect.value, 10);

            // Clear and repopulate day options
            daySelect.innerHTML = '<option value="" disabled>Day</option>';
            for (let i = 1; i <= daysInMonth; i++) {
              const dayValue = i < 10 ? `0${i}` : `${i}`;
              const option = document.createElement('option');
              option.value = dayValue;
              option.textContent = i;
              if (i === selectedDay && i <= daysInMonth) option.selected = true;
              daySelect.appendChild(option);
            }

            // Re-add "Day" label style if value is empty
            if (!selectedDay || selectedDay > daysInMonth) {
              daySelect.value = '';
            }

            // Recalculate when month or year changes
            monthSelect.addEventListener('change', updateDays);
            yearSelect.addEventListener('change', updateDays);
          }
        });
      </script>
    </main>
  </div>
</div>

<style>
  .customer .field select:focus~label,
  .customer .field select~label.has-value {
    font-size: 1rem;
    top: calc(var(--inputs-border-width) + .5rem);
    left: calc(var(--inputs-border-width) + 2rem);
    letter-spacing: .04rem;
  }
  .check-icon::before {
    color: #fff;
    font-size: 1.3rem;
  }
  .customer.setting label {
    color: #5e5e5e;
  }
  .customer.setting select:not(:placeholder-shown) ~ label{
    font-size: 1.2rem !important;
    line-height: 10px;
    {% comment %} padding-top: 0.5rem; {% endcomment %}
  }

  .label__checkbox{
    display:flex;
    flex-direction:row;
    gap:10px;
    align-items:center;
  }
  .field-login:not(:has(.field-login-error)):after{
    height: 0.2px;
  }
  .field-login:has(.field-login-error):after {
    display: none;
  }
  .icon.down-arrow:before{
    font-size: 1.6rem;
  }
  .icon.down-arrow{
    position: absolute;
    right: 20px;
    top: 12px;
    pointer-events: none;
  }
  .field-login-error {
  border-color: #981420 !important;
  border-width: 2px !important;
  }
  .error-message-field {
    background: #981420;
    padding: 10px 12px;
    color: #fff;
    font-weight: 700;
    font-size: 1.3rem;
  }
  .address_form-fields:after {
    content: none !important;
  }
  .customer .field select:focus~label,
  .customer .field select~label.has-value {
    font-size: 1rem;
    top: calc(var(--inputs-border-width) + .5rem);
    left: calc(var(--inputs-border-width) + 2rem);
    letter-spacing: .04rem;
  }

  .field:has(select) .arrow {
    position: absolute;
    right: 35px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #333;
    transition: 0.2s ease;
  }

  .field select:focus-visible {
    box-shadow: none;
  }
  .field select:focus ~ .arrow {
    transform: translateY(-50%) rotate(180deg);
  }
</style>
{% schema %}
{
  "name": "t:sections.main-addresses.name",
  "settings": [
    {
      "type": "text",
      "id": "purchase_history_label",
      "label": "Purchase History Button Label",
      "default": "Purchase History"
    },
    {
      "type": "url",
      "id": "purchase_history_link",
      "label": "Purchase History Button Link",
      "default": "/"
    },
    {
      "type": "text",
      "id": "customer_service_label",
      "label": "Customer Service Button Label",
      "default": "Customer Service"
    },
    {
      "type": "url",
      "id": "customer_service_link",
      "label": "Customer Service Button Link",
      "default": "/"
    },
    {
      "type": "text",
      "id": "account_settings_label",
      "label": "Account Settings Button Label",
      "default": "Account Settings"
    },
    {
      "type": "url",
      "id": "account_settings_link",
      "label": "Account Settings Button Link",
      "default": "/"
    },
    {
      "type": "url",
      "id": "help_redirect_link",
      "label": "Redirected to login",
      "default": "/"
    }
  ],
  "blocks": [
    {
      "type": "sidebar_item",
      "name": "Sidebar Item",
      "settings": [
        { "type": "text", "id": "title", "label": "Tab Title", "default": "New Tab" },
        { "type": "url", "id": "page", "label": "Select Page" }
      ]
    }
  ]
}
{% endschema %}
