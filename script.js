const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
menuBtn.addEventListener("click", () => navMenu.classList.toggle("open"));

document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const category = btn.dataset.filter;
    document.querySelectorAll(".program-card").forEach(card => {
      card.style.display = category === "all" || card.dataset.category === category ? "block" : "none";
    });
  });
});

// ตัวอย่างนับเวลาถอยหลังถึงวันสิ้นสุดรอบสมัคร
const target = new Date("2026-11-30T23:59:59+07:00").getTime();
function updateCountdown(){
  const diff = Math.max(0, target - Date.now());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff % 86400000 / 3600000);
  const m = Math.floor(diff % 3600000 / 60000);
  document.getElementById("days").textContent = String(d).padStart(2,"0");
  document.getElementById("hours").textContent = String(h).padStart(2,"0");
  document.getElementById("minutes").textContent = String(m).padStart(2,"0");
}
updateCountdown();
setInterval(updateCountdown, 30000);


// Multi-step application form
const form = document.getElementById("applicationForm");
const steps = [...document.querySelectorAll(".form-step")];
const progressSteps = [...document.querySelectorAll(".progress-step")];
const progressLines = [...document.querySelectorAll(".progress-line")];
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const stepText = document.getElementById("stepText");
const successMessage = document.getElementById("successMessage");
const restartBtn = document.getElementById("restartBtn");
let currentStep = 0;

function renderStep(){
  steps.forEach((step, i) => step.classList.toggle("active", i === currentStep));
  progressSteps.forEach((step, i) => {
    step.classList.toggle("active", i === currentStep);
    step.classList.toggle("completed", i < currentStep);
  });
  progressLines.forEach((line, i) => line.classList.toggle("completed", i < currentStep));

  prevBtn.style.visibility = currentStep === 0 ? "hidden" : "visible";
  nextBtn.style.display = currentStep === steps.length - 1 ? "none" : "inline-block";
  submitBtn.style.display = currentStep === steps.length - 1 ? "inline-block" : "none";
  stepText.textContent = `ขั้นตอนที่ ${currentStep + 1} จาก ${steps.length}`;
}

function validateCurrentStep(){
  const inputs = [...steps[currentStep].querySelectorAll("input, select, textarea")];
  for(const input of inputs){
    if(!input.checkValidity()){
      input.reportValidity();
      return false;
    }
  }
  return true;
}

nextBtn.addEventListener("click", () => {
  if(validateCurrentStep() && currentStep < steps.length - 1){
    currentStep++;
    renderStep();
    document.getElementById("apply").scrollIntoView({behavior:"smooth", block:"start"});
  }
});

prevBtn.addEventListener("click", () => {
  if(currentStep > 0){
    currentStep--;
    renderStep();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if(!validateCurrentStep()) return;
  form.style.display = "none";
  successMessage.style.display = "block";
});

restartBtn.addEventListener("click", () => {
  form.reset();
  currentStep = 0;
  form.style.display = "block";
  successMessage.style.display = "none";
  renderStep();
});

renderStep();
