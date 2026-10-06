// ===============================
// Admission Website - JavaScript
// ===============================

// เมนูมือถือ
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", function () {
    navMenu.classList.toggle("open");
  });

  document.querySelectorAll("#navMenu a").forEach(function (link) {
    link.addEventListener("click", function () {
      navMenu.classList.remove("open");
    });
  });
}


// ===============================
// ตัวกรองหลักสูตร + ค้นหา + วิทยาเขต
// ===============================
const filterButtons = document.querySelectorAll(".filter");
const programCards = document.querySelectorAll(".program-card");
const programSearch = document.getElementById("programSearch");
const campusFilter = document.getElementById("campusFilter");
const facultyFilter = document.getElementById("facultyFilter");
const roundFilter = document.getElementById("roundFilter");
const programResultCount = document.getElementById("programResultCount");
let activeCategory = "all";

function applyProgramFilters() {
  const q = (programSearch?.value || "").trim().toLowerCase();
  const campus = campusFilter?.value || "all";
  const faculty = facultyFilter?.value || "all";
  const round = roundFilter?.value || "all";
  let shown = 0;
  programCards.forEach(card => {
    const text = card.textContent.toLowerCase();
    const ok = (activeCategory === "all" || card.dataset.category === activeCategory)
      && (campus === "all" || card.dataset.campus === campus)
      && (faculty === "all" || card.dataset.faculty === faculty)
      && (round === "all" || card.dataset.round === round)
      && (!q || text.includes(q));
    card.classList.toggle("is-hidden", !ok);
    if (ok) shown++;
  });
  if (programResultCount) programResultCount.textContent = shown;
}
filterButtons.forEach(button => button.addEventListener("click", () => {
  filterButtons.forEach(btn => btn.classList.remove("active"));
  button.classList.add("active"); activeCategory = button.dataset.filter; applyProgramFilters();
}));
[programSearch, campusFilter, facultyFilter, roundFilter].forEach(el => el && el.addEventListener(el.tagName === "INPUT" ? "input" : "change", applyProgramFilters));
applyProgramFilters();

// Campus selector: tabs + direct jump into matching program filter.
const campusTabs = document.querySelectorAll(".campus-tab");
const campusCards = document.querySelectorAll(".campus-feature");
function setCampusView(value) {
  campusTabs.forEach(b => b.classList.toggle("active", b.dataset.campus === value));
  campusCards.forEach(c => { c.style.display = (value === "all" || c.dataset.campusCard === value) ? "block" : "none"; });
  if (campusFilter && value !== "all") campusFilter.value = value;
  applyProgramFilters();
}
campusTabs.forEach(b => b.addEventListener("click", () => { setCampusView(b.dataset.campus); document.getElementById("programs")?.scrollIntoView({ behavior: "smooth", block: "start" }); }));
document.querySelectorAll("[data-jump-campus]").forEach(b => b.addEventListener("click", () => {
  const value = b.dataset.jumpCampus; setCampusView(value); document.getElementById("programs")?.scrollIntoView({ behavior: "smooth", block: "start" });
}));

// ===============================
// Countdown
// ===============================

const targetDate =
  new Date("2026-10-31T23:59:59+07:00").getTime();

function updateCountdown() {

  const daysElement =
    document.getElementById("days");

  const hoursElement =
    document.getElementById("hours");

  const minutesElement =
    document.getElementById("minutes");

  if (
    !daysElement ||
    !hoursElement ||
    !minutesElement
  ) {
    return;
  }

  const difference =
    Math.max(0, targetDate - Date.now());

  const days =
    Math.floor(difference / 86400000);

  const hours =
    Math.floor(
      (difference % 86400000) / 3600000
    );

  const minutes =
    Math.floor(
      (difference % 3600000) / 60000
    );

  daysElement.textContent =
    String(days).padStart(2, "0");

  hoursElement.textContent =
    String(hours).padStart(2, "0");

  minutesElement.textContent =
    String(minutes).padStart(2, "0");
}

updateCountdown();

setInterval(updateCountdown, 30000);


// ===============================
// ระบบฟอร์มหลายขั้นตอน
// ===============================

const form =
  document.getElementById("applicationForm");

const steps =
  Array.from(
    document.querySelectorAll(".form-step")
  );

const progressSteps =
  Array.from(
    document.querySelectorAll(".progress-step")
  );

const progressLines =
  Array.from(
    document.querySelectorAll(".progress-line")
  );

const prevBtn =
  document.getElementById("prevBtn");

const nextBtn =
  document.getElementById("nextBtn");

const submitBtn =
  document.getElementById("submitBtn");

const stepText =
  document.getElementById("stepText");

const successMessage =
  document.getElementById("successMessage");

const restartBtn =
  document.getElementById("restartBtn");

let currentStep = 0;


// ===============================
// ตรวจเลขบัตรประชาชน
// ตัวเลขเท่านั้น + 13 หลักพอดี
// ===============================

const citizenId =
  document.getElementById("citizenId");

if (citizenId) {

  citizenId.addEventListener(
    "input",
    function () {

      // ลบทุกอย่างที่ไม่ใช่ตัวเลข
      this.value =
        this.value.replace(/[^0-9]/g, "");

      // ห้ามเกิน 13 หลัก
      if (this.value.length > 13) {

        this.value =
          this.value.substring(0, 13);

      }

    }
  );
}


// ===============================
// แสดงขั้นตอน
// ===============================

function renderStep() {

  steps.forEach(function (step, index) {

    step.classList.toggle(
      "active",
      index === currentStep
    );

  });


  progressSteps.forEach(function (step, index) {

    step.classList.toggle(
      "active",
      index === currentStep
    );

    step.classList.toggle(
      "completed",
      index < currentStep
    );

  });


  progressLines.forEach(function (line, index) {

    line.classList.toggle(
      "completed",
      index < currentStep
    );

  });


  if (prevBtn) {

    prevBtn.style.visibility =
      currentStep === 0
        ? "hidden"
        : "visible";

  }


  if (nextBtn) {

    nextBtn.style.display =
      currentStep === steps.length - 1
        ? "none"
        : "inline-block";

  }


  if (submitBtn) {

    submitBtn.style.display =
      currentStep === steps.length - 1
        ? "inline-block"
        : "none";

  }


  if (stepText) {

    stepText.textContent =
      "ขั้นตอนที่ " +
      (currentStep + 1) +
      " จาก " +
      steps.length;

  }
}


// ===============================
// ตรวจสอบข้อมูลแต่ละขั้นตอน
// ===============================

function validateCurrentStep() {

  if (!steps[currentStep]) {
    return false;
  }

  const inputs =
    Array.from(
      steps[currentStep].querySelectorAll(
        "input, select, textarea"
      )
    );


  // ตรวจช่องทั่วไป
  for (const input of inputs) {

    if (!input.checkValidity()) {

      input.reportValidity();

      return false;
    }

  }


  // ===============================
  // ตรวจเลขบัตรประชาชนโดยเฉพาะ
  // ===============================

  if (
    currentStep === 0 &&
    citizenId
  ) {

    const value =
      citizenId.value.trim();


    // ต้องเป็นตัวเลข 13 หลักเท่านั้น
    if (!/^[0-9]{13}$/.test(value)) {

      citizenId.setCustomValidity(
        "กรุณากรอกเลขบัตรประชาชนเป็นตัวเลข 13 หลัก"
      );

      citizenId.reportValidity();

      return false;

    }


    // ผ่านการตรวจ
    citizenId.setCustomValidity("");

  }


  return true;
}


// ===============================
// ปุ่มถัดไป
// ===============================

if (nextBtn) {

  nextBtn.addEventListener(
    "click",
    function () {

      // ตรวจข้อมูลก่อน
      if (!validateCurrentStep()) {
        return;
      }


      if (
        currentStep <
        steps.length - 1
      ) {

        currentStep++;

        renderStep();


        const applySection =
          document.getElementById("apply");

        if (applySection) {

          applySection.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }

      }

    }
  );

}


// ===============================
// ปุ่มย้อนกลับ
// ===============================

if (prevBtn) {

  prevBtn.addEventListener(
    "click",
    function () {

      if (currentStep > 0) {

        currentStep--;

        renderStep();

      }

    }
  );

}


// ===============================
// ส่งใบสมัคร
// ===============================

if (form) {

  form.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();


      // ตรวจข้อมูลก่อนส่ง
      if (!validateCurrentStep()) {
        return;
      }


      // ซ่อนฟอร์ม
      form.style.display = "none";


      // แสดงข้อความสำเร็จ
      if (successMessage) {

        successMessage.style.display =
          "block";

      }

    }
  );

}


// ===============================
// สมัครใหม่
// ===============================

if (restartBtn) {

  restartBtn.addEventListener(
    "click",
    function () {

      if (form) {

        form.reset();

        form.style.display =
          "block";

      }


      if (successMessage) {

        successMessage.style.display =
          "none";

      }


      currentStep = 0;

      renderStep();

    }
  );

}


// ===============================
// เริ่มต้นเว็บ
// ===============================

renderStep();

/* ===== Applicant account system ===== */
(function () {
  const LOGIN_KEY = "admissionLoggedIn";
  const USER_KEY = "admissionUser";
  const APP_KEY = "admissionApplication";
  const USERS_KEY = "admissionUsers";

  function getUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY) || "{}"); }
    catch (e) { return {}; }
  }

  function saveUsers(users) { localStorage.setItem(USERS_KEY, JSON.stringify(users)); }

  function getUser() {
    try { return JSON.parse(localStorage.getItem(USER_KEY) || "null"); }
    catch (e) { return null; }
  }

  // Every account gets its own storage namespace. This prevents applications,
  // payments and uploaded-document metadata from appearing under another account.
  function accountKey(base, citizenId) {
    const id = citizenId || getUser()?.citizenId || "guest";
    return `${base}_${id}`;
  }

  function getAccountData(base, fallback = null) {
    try { return JSON.parse(localStorage.getItem(accountKey(base)) || JSON.stringify(fallback)); }
    catch (e) { return fallback; }
  }

  function setAccountData(base, value) {
    localStorage.setItem(accountKey(base), JSON.stringify(value));
  }

  function migrateLegacyAccountData(user) {
    if (!user?.citizenId) return;
    const bases = ["admissionApplication", "admissionPayment", "admissionDocuments"];
    bases.forEach(base => {
      const scoped = accountKey(base, user.citizenId);
      if (!localStorage.getItem(scoped)) {
        const old = localStorage.getItem(base);
        if (old) localStorage.setItem(scoped, old);
      }
    });
    // Remove the old shared keys so they cannot leak data between accounts.
    bases.forEach(base => localStorage.removeItem(base));
  }

  function isLoggedIn() {
    return localStorage.getItem(LOGIN_KEY) === "true" && !!getUser();
  }

  function goAfterLogin() {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");
    window.location.href = redirect || "home_logged.html#apply";
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    if (isLoggedIn()) {
      const msg = document.getElementById("loginMessage");
      if (msg) {
        msg.className = "account-message success";
        msg.textContent = "คุณเข้าสู่ระบบอยู่แล้ว กำลังเปิดศูนย์ข้อมูลผู้สมัคร...";
      }
      setTimeout(goAfterLogin, 500);
    }

    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const id = document.getElementById("loginCitizenId").value.trim();
      const password = document.getElementById("loginPassword").value;
      const msg = document.getElementById("loginMessage");
      const users = getUsers();
      const user = users[id] || getUser();

      if (!/^[0-9]{13}$/.test(id)) {
        msg.className = "account-message error";
        msg.textContent = "กรุณากรอกเลขบัตรประชาชน 13 หลัก";
        return;
      }
      if (!user || user.citizenId !== id || user.password !== password) {
        msg.className = "account-message error";
        msg.textContent = "เลขบัตรประชาชนหรือรหัสผ่านไม่ถูกต้อง หรือยังไม่มีบัญชี";
        return;
      }

      localStorage.setItem(USER_KEY, JSON.stringify(user));
      localStorage.setItem(LOGIN_KEY, "true");
      msg.className = "account-message success";
      msg.textContent = "เข้าสู่ระบบสำเร็จ";
      setTimeout(goAfterLogin, 350);
    });
  }

  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const citizenId = document.getElementById("regCitizenId").value.trim();
      const name = document.getElementById("regName").value.trim();
      const email = document.getElementById("regEmail").value.trim();
      const phone = document.getElementById("regPhone").value.trim();
      const password = document.getElementById("regPassword").value;
      const confirm = document.getElementById("regConfirm").value;
      const msg = document.getElementById("registerMessage");

      if (!/^[0-9]{13}$/.test(citizenId)) {
        msg.className = "account-message error";
        msg.textContent = "เลขบัตรประชาชนต้องเป็นตัวเลข 13 หลัก";
        return;
      }
      if (!/^[0-9]{10}$/.test(phone)) {
        msg.className = "account-message error";
        msg.textContent = "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลักเท่านั้น";
        return;
      }
      if (password.length < 6) {
        msg.className = "account-message error";
        msg.textContent = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
        return;
      }
      if (password !== confirm) {
        msg.className = "account-message error";
        msg.textContent = "รหัสผ่านยืนยันไม่ตรงกัน";
        return;
      }

      const users = getUsers();
      if (users[citizenId]) {
        msg.className = "account-message error";
        msg.textContent = "เลขบัตรประชาชนนี้มีบัญชีอยู่แล้ว กรุณาเข้าสู่ระบบ";
        return;
      }
      const newUser = { citizenId, name, email, phone, password };
      users[citizenId] = newUser;
      saveUsers(users);
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));
      localStorage.setItem(LOGIN_KEY, "true");
      // Start this account with clean, separate data.
      localStorage.removeItem(accountKey("admissionApplication", citizenId));
      localStorage.removeItem(accountKey("admissionPayment", citizenId));
      localStorage.removeItem(accountKey("admissionDocuments", citizenId));

      msg.className = "account-message success";
      msg.textContent = "สร้างบัญชีสำเร็จ กำลังเข้าสู่ศูนย์ข้อมูลผู้สมัคร...";
      setTimeout(function () {
        window.location.href = "dashboard.html";
      }, 500);
    });
  }

  // Phone number fields: numbers only, maximum 10 digits.
  document.querySelectorAll('input[type="tel"]').forEach(function (input) {
    input.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "").slice(0, 10);
    });
    input.addEventListener("keydown", function (e) {
      if (["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
      if (!/[0-9]/.test(e.key)) e.preventDefault();
    });
  });

  // Protect dashboard, status and application pages.
  const protectedPage = document.body && document.body.dataset.protected === "true";
  if (protectedPage && !isLoggedIn()) {
    const current = window.location.pathname.split("/").pop() || "index.html";
    alert("กรุณาเข้าสู่ระบบก่อนสมัครเรียน");
    window.location.href = "login.html?redirect=" + encodeURIComponent(current);
    return;
  }

  // Block the application form on the homepage until the applicant logs in.
  // After pressing OK, go directly to the login page.
  const homeApplicationForm = document.getElementById("applicationForm");
  if (homeApplicationForm && !document.body.dataset.applicationPage && !isLoggedIn()) {
    homeApplicationForm.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      alert("กรุณาเข้าสู่ระบบก่อนสมัครเรียน");
      window.location.href = "login.html?redirect=" + encodeURIComponent("home_logged.html#apply");
    }, true);
  }

  // Applicant section on the homepage: keep the original content for guests,
  // and show the logged-in message without the old buttons.
  const applicantTitle = document.getElementById("applicantTitle");
  const applicantMessage = document.getElementById("applicantMessage");
  const applicantActions = document.getElementById("applicantActions");
  if (applicantTitle && applicantMessage) {
    if (isLoggedIn()) {
      applicantTitle.textContent = "ถึงผู้สมัคร";
      applicantMessage.innerHTML = "อุปสรรคคือบททดสอบที่มีค่า<br>เพื่อให้รู้ว่าเราคู่ควรกับสิ่งที่ฝันเพียงใด";
      if (applicantActions) {
        applicantActions.innerHTML = "";
        applicantActions.setAttribute("aria-hidden", "true");
      }
    } else if (applicantActions) {
      applicantActions.innerHTML = `
        <a class="btn btn-primary" href="dashboard.html">เข้าสู่ศูนย์ข้อมูลผู้สมัคร</a>
        <a class="btn btn-outline blue-outline" href="register.html">ยังไม่มีบัญชี? สมัครใหม่</a>`;
      applicantActions.removeAttribute("aria-hidden");
    }
  }

  // Fill user information on pages that request it.
  const user = getUser();
  document.querySelectorAll("[data-user-name]").forEach(el => {
    el.textContent = user ? user.name : "ผู้สมัคร";
  });
  document.querySelectorAll("[data-user-id]").forEach(el => {
    el.textContent = user ? user.citizenId : "-";
  });

  // Upgrade an older one-account demo into the new per-account storage model.
  if (user) {
    const users = getUsers();
    if (!users[user.citizenId]) {
      users[user.citizenId] = user;
      saveUsers(users);
    }
    migrateLegacyAccountData(user);
  }

  document.querySelectorAll(".logout-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      // Migrate any legacy data for the account currently signed in before ending the session.
      const currentUser = getUser();
      if (currentUser) migrateLegacyAccountData(currentUser);
      localStorage.removeItem(LOGIN_KEY);
      localStorage.removeItem(USER_KEY);
      window.location.href = "index.html";
    });
  });

  // Applicant application data is stored so the status page can show what was actually selected.
  function collectApplication() {
    const val = id => document.getElementById(id)?.value?.trim() || "";
    return {
      submittedAt: new Date().toISOString(), status: "submitted",
      firstName: val("appFirstName"), lastName: val("appLastName"),
      email: val("appEmail"), phone: val("appPhone"),
      faculty: val("applicationFaculty"), program: val("applicationProgram"),
      campus: val("applicationCampus"), round: "Portfolio",
      documentName: document.querySelector('#applicationForm input[type="file"]')?.files?.[0]?.name || "ยังไม่ได้แนบไฟล์"
    };
  }
  function saveApplication() { if (isLoggedIn()) setAccountData(APP_KEY, collectApplication()); }

  const loggedHomeForm = document.getElementById("applicationForm");
  if (loggedHomeForm && document.body.dataset.homeLogged === "true") loggedHomeForm.addEventListener("submit", saveApplication);

  const applicationForm = document.getElementById("applicationForm");
  if (applicationForm && document.body.dataset.applicationPage === "true") {
    const saved = localStorage.getItem(APP_KEY); const status = document.getElementById("applicationStatus");
    if (saved && status) status.innerHTML = '<span class="badge green">ส่งใบสมัครแล้ว</span>';
    applicationForm.addEventListener("submit", saveApplication);
  }

  // Status page: render the applicant's actual application, payment flow and receipt.
  const myApplications = document.getElementById("myApplications");
  if (myApplications) {
    let saved = getAccountData(APP_KEY, null);
    let payment = getAccountData("admissionPayment", null);
    const hasApplication = !!(saved && saved.program);
    if (hasApplication) {
      const date = new Date(saved.submittedAt || Date.now()).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" });
      myApplications.innerHTML = `<div class="application-list"><article class="application-item"><h3>${saved.program}</h3><div class="application-meta"><div><b>คณะ</b><span>${saved.faculty || "-"}</span></div><div><b>วิทยาเขต</b><span>${saved.campus || "-"}</span></div><div><b>รอบ</b><span>${saved.round || "Portfolio"}</span></div><div><b>วันที่สมัคร</b><span>${date}</span></div></div><div class="application-footer"><span class="badge blue">${payment?.paid ? "ชำระเงินแล้ว" : "รอชำระเงิน"}</span><a href="home_logged.html#apply">สมัครเพิ่ม →</a></div></article></div>`;
      const notice = document.getElementById("dashboardNotice"); if (notice) notice.textContent = payment?.paid ? `ใบสมัคร ${saved.program} ชำระเงินแล้ว` : `ใบสมัคร ${saved.program} อยู่ระหว่างรอชำระเงิน`;
      const appStatus = document.getElementById("applicationStatus"); if (appStatus) appStatus.innerHTML = '<span class="badge green">เสร็จแล้ว</span>';
    } else {
      const notice = document.getElementById("dashboardNotice"); if (notice) notice.textContent = "ยังไม่มีใบสมัครที่ส่งเข้าระบบ";
    }

    const paymentStatus = document.getElementById("paymentStatus");
    const paymentLive = document.getElementById("paymentLive");
    const paymentSummaryStatus = document.getElementById("paymentSummaryStatus");
    const paymentNotice = document.getElementById("paymentNotice");
    const billBtn = document.getElementById("printPaymentBill");
    const confirmBtn = document.getElementById("confirmPayment");
    const receiptBtn = document.getElementById("printApplicationReceipt");
    const billStep = document.getElementById("billStep");
    const payStep = document.getElementById("payStep");
    const receiptStep = document.getElementById("receiptStep");

    function updatePaymentUI() {
      const paid = !!payment?.paid;
      if (paymentStatus) paymentStatus.innerHTML = paid ? '<span class="badge green">ชำระแล้ว</span>' : '<span class="badge yellow">รอชำระ</span>';
      if (paymentLive) { paymentLive.textContent = paid ? 'ชำระแล้ว' : 'รอชำระ'; paymentLive.className = paid ? 'mini-live payment-paid' : 'mini-live'; }
      if (paymentSummaryStatus) paymentSummaryStatus.textContent = paid ? 'ชำระเงินสำเร็จ' : 'รอชำระเงิน';
      if (paymentNotice) paymentNotice.textContent = !hasApplication ? 'ยังไม่มีใบสมัครที่ส่งเข้าระบบ กรุณาสมัครเรียนก่อน' : paid ? 'ชำระเงินสำเร็จแล้ว สามารถพิมพ์หลักฐานแสดงการสมัครได้' : 'กรุณาพิมพ์ใบแจ้งชำระและยืนยันการชำระเงินเพื่อดำเนินการต่อ';
      if (receiptBtn) receiptBtn.disabled = !hasApplication || !paid;
      if (confirmBtn) confirmBtn.disabled = !hasApplication || paid;
      [billStep, payStep, receiptStep].forEach(el => el?.classList.remove('done', 'current'));
      if (hasApplication) billStep?.classList.add('done');
      if (hasApplication && !paid) payStep?.classList.add('current');
      if (hasApplication && paid) { payStep?.classList.add('done'); receiptStep?.classList.add('current'); }
    }
    updatePaymentUI();

    billBtn?.addEventListener('click', () => {
      if (!hasApplication) { alert('กรุณาสมัครเรียนและส่งใบสมัครก่อน'); return; }
      const date = new Date(saved.submittedAt || Date.now()).toLocaleDateString('th-TH');
      const w = window.open('', '_blank', 'width=800,height=900');
      if (!w) return;
      w.document.write(`<html lang="th"><head><meta charset="UTF-8"><title>ใบแจ้งชำระเงิน</title><style>body{font-family:Arial,sans-serif;padding:45px;color:#172033}h1{color:#0757b8}table{width:100%;border-collapse:collapse;margin-top:25px}td{padding:12px;border-bottom:1px solid #ddd}b{color:#0757b8}.total{font-size:22px}</style></head><body><h1>ใบแจ้งชำระเงินค่าสมัครเรียน</h1><p>ระบบรับสมัครนักศึกษาใหม่ มจพ. (แบบจำลอง)</p><hr><table><tr><td>ชื่อผู้สมัคร</td><td><b>${user?.name || '-'}</b></td></tr><tr><td>หลักสูตร</td><td>${saved.program}</td></tr><tr><td>คณะ</td><td>${saved.faculty || '-'}</td></tr><tr><td>วิทยาเขต</td><td>${saved.campus || '-'}</td></tr><tr><td>วันที่สมัคร</td><td>${date}</td></tr><tr><td>ค่าธรรมเนียมสมัครเรียน</td><td class="total"><b>300.00 บาท</b></td></tr></table><p style="margin-top:35px">กรุณาตรวจสอบข้อมูลก่อนชำระเงิน</p><script>window.onload=()=>window.print()<\/script></body></html>`); w.document.close();
    });

    confirmBtn?.addEventListener('click', () => {
      if (!hasApplication) { alert('กรุณาสมัครเรียนและส่งใบสมัครก่อน'); return; }
      if (!confirm('ยืนยันการชำระเงิน 300.00 บาท สำหรับใบสมัครนี้หรือไม่?')) return;
      payment = { paid: true, paidAt: new Date().toISOString(), amount: 300 };
      setAccountData("admissionPayment", payment);
      updatePaymentUI();
      myApplications.querySelector('.badge')?.replaceChildren(document.createTextNode('ชำระเงินแล้ว'));
      alert('ชำระเงินสำเร็จ (ระบบจำลอง) สามารถพิมพ์หลักฐานแสดงการสมัครได้');
    });

    receiptBtn?.addEventListener('click', () => {
      if (!hasApplication || !payment?.paid) { alert('กรุณาชำระเงินก่อน'); return; }
      const date = new Date(saved.submittedAt || Date.now()).toLocaleDateString('th-TH');
      const paidDate = new Date(payment.paidAt || Date.now()).toLocaleDateString('th-TH');
      const w = window.open('', '_blank', 'width=800,height=900');
      if (!w) return;
      w.document.write(`<html lang="th"><head><meta charset="UTF-8"><title>หลักฐานแสดงการสมัคร</title><style>body{font-family:Arial,sans-serif;padding:45px;color:#172033}h1{color:#0757b8}.ok{padding:12px;background:#e9f8ef;color:#167044;border-radius:8px;font-weight:bold}table{width:100%;border-collapse:collapse;margin-top:25px}td{padding:12px;border-bottom:1px solid #ddd}b{color:#0757b8}</style></head><body><h1>หลักฐานแสดงการสมัคร</h1><p class="ok">✓ สมัครและชำระค่าธรรมเนียมเรียบร้อยแล้ว</p><table><tr><td>เลขบัตรประชาชน</td><td><b>${user?.citizenId || '-'}</b></td></tr><tr><td>ชื่อผู้สมัคร</td><td>${user?.name || '-'}</td></tr><tr><td>หลักสูตร</td><td>${saved.program}</td></tr><tr><td>คณะ</td><td>${saved.faculty || '-'}</td></tr><tr><td>วิทยาเขต</td><td>${saved.campus || '-'}</td></tr><tr><td>รอบ</td><td>${saved.round || 'Portfolio'}</td></tr><tr><td>วันที่สมัคร</td><td>${date}</td></tr><tr><td>วันที่ชำระเงิน</td><td>${paidDate}</td></tr><tr><td>สถานะการชำระเงิน</td><td><b>ชำระแล้ว</b></td></tr></table><p style="margin-top:35px">เอกสารนี้เป็นหลักฐานจำลองสำหรับโครงงานเว็บไซต์</p><script>window.onload=()=>window.print()<\/script></body></html>`); w.document.close();
    });
  }

  // Document upload controls: accept PDF, PNG, JPG and JPEG only.
  const documentList = document.getElementById("documentList");
  if (documentList) {
    const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];
    const allowedExt = ["pdf", "png", "jpg", "jpeg"];
    documentList.querySelectorAll(".document-row").forEach(row => {
      const button = row.querySelector(".document-upload-btn");
      const input = row.querySelector(".document-file-input");
      if (!button || !input) return;
      button.addEventListener("click", () => input.click());
      input.addEventListener("change", () => {
        const file = input.files?.[0];
        if (!file) return;
        const ext = (file.name.split(".").pop() || "").toLowerCase();
        if (!allowedExt.includes(ext) || !allowedTypes.includes(file.type)) {
          alert("ไฟล์ไม่ถูกต้อง กรุณาอัปโหลดเฉพาะ PDF, PNG, JPG หรือ JPEG เท่านั้น");
          input.value = "";
          return;
        }
        const badge = row.querySelector(".doc-badge");
        if (badge) { badge.textContent = "รอตรวจสอบ"; badge.className = "doc-badge pending"; }
        row.classList.add("uploaded");
        let name = row.querySelector(".document-file-name");
        if (!name) { name = document.createElement("div"); name.className = "document-file-name"; row.appendChild(name); }
        name.textContent = `ไฟล์ที่เลือก: ${file.name}`;
        button.textContent = "เปลี่ยนไฟล์";
        try {
          const docs = getAccountData("admissionDocuments", {});
          docs[row.dataset.document] = { name: file.name, type: file.type, status: "pending" };
          setAccountData("admissionDocuments", docs);
        } catch (e) { }
      });
    });
  }

  // Logged-in navigation: show the user's name instead of login.
  if (isLoggedIn()) {
    document.querySelectorAll(".login-link").forEach(link => {
      const user = getUser(); link.href = "dashboard.html"; link.textContent = user?.name || "ผู้สมัคร"; link.classList.add("user-nav-link");
    });
  }

})();
