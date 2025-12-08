/* =========================================================
   CONSTANTS
========================================================= */
const KEY_STATUS = "survey_status";   // none | doing | done
const KEY_RESULT = "survey_result";   // total score


/* =========================================================
   BASIC SURVEY SAVING LOGIC
========================================================= */

// Select-box questions
document.querySelectorAll(".select-box").forEach(box => {
    box.addEventListener("click", () => {
        const key = box.dataset.key;
        const value = box.dataset.value;

        document.querySelectorAll(`[data-key=${key}]`)
            .forEach(b => b.classList.remove("selected"));

        box.classList.add("selected");
        localStorage.setItem(key, value);
    });
});

// Likert questions
document.querySelectorAll(".likert-scale").forEach(scale => {
    scale.querySelectorAll("span").forEach(circle => {
        circle.addEventListener("click", () => {
            scale.querySelectorAll("span").forEach(c => c.classList.remove("selected"));
            circle.classList.add("selected");
        });
    });
});


/* =========================================================
   NAVIGATION
========================================================= */

// Step 1 → Step 2
function goToSurvey2() {
    localStorage.setItem(KEY_STATUS, "doing");
    localStorage.setItem("step_progress", "1");
    window.location.href = "survey2.html";
}

// Finish survey → Save result → Result page
function finishSurvey() {
    const q1 = Number(localStorage.getItem("q1") || 3);
    const q2 = Number(localStorage.getItem("q2") || 3);

    const total = q1 + q2;

    localStorage.setItem(KEY_RESULT, total);
    localStorage.setItem(KEY_STATUS, "done");
    localStorage.setItem("step_progress", "3");

    window.location.href = "result.html";
}


/* =========================================================
   HOMEPAGE TAKE SURVEY BUTTON
========================================================= */
function handleSurveyClick() {
    const status = localStorage.getItem(KEY_STATUS) || "none";

    if (status === "none") {
        window.location.href = "survey.html";
        return;
    }

    if (status === "done") {
        window.location.href = "result.html";
        return;
    }

    // sedang doing
    const agree = confirm(
        "Untuk retake survey, hasil sebelumnya akan hilang.\n" +
        "Pastikan kamu sudah mendownload hasil sebelumnya.\n\n" +
        "Lanjut retake?"
    );

    if (agree) {
        localStorage.setItem(KEY_RESULT, "");
        localStorage.setItem(KEY_STATUS, "none");
        window.location.href = "survey.html";
    }
}


/* =========================================================
   RESULT PAGE RENDER
========================================================= */
function renderResultPage() {
    if (!window.location.pathname.includes("result.html")) return;

    const total = Number(localStorage.getItem(KEY_RESULT) || 6);
    const q1 = Number(localStorage.getItem("q1") || 3);
    const q2 = Number(localStorage.getItem("q2") || 3);

    let title = "";
    let desc = "";

    if (total <= 4) {
        title = "You may be experiencing mild depressive symptoms.";
        desc  = "Your responses indicate some emotional pressure...";
    } else if (total <= 7) {
        title = "You're doing okay, but might be stressed.";
        desc  = "You seem to handle emotions fairly well...";
    } else {
        title = "You seem emotionally balanced.";
        desc  = "Your responses show stable emotional awareness...";
    }

    document.getElementById("dynamic-title").textContent = title;
    document.getElementById("dynamic-desc").textContent = desc;

    // Bars (safe check)
    if (document.getElementById("bar-stress")) {
        document.getElementById("bar-stress").style.width  = (q1 * 20) + "%";
        document.getElementById("bar-balance").style.width = (q2 * 20) + "%";
        document.getElementById("bar-energy").style.width  = (q1 * 15) + "%";
        document.getElementById("bar-cope").style.width    = (q2 * 15) + "%";
    }
}


/* =========================================================
   RETAKE BUTTON
========================================================= */
function initRetakeButton() {
    const agree = confirm(
        "Untuk retake survey, hasil sebelumnya akan dihapus.\n" +
        "Pastikan kamu sudah mendownload hasil sebelumnya.\n\n" +
        "Lanjut retake?"
    );

    if (!agree) return;

    // reset nilai
    localStorage.setItem("survey_status", "none");
    localStorage.setItem("survey_result", "");
    localStorage.removeItem("q1");
    localStorage.removeItem("q2");

    localStorage.removeItem("step_progress");

    // kembali ke survey awal
    window.location.href = "survey.html";
}


/* =========================================================
   STEP PROGRESS
========================================================= */
function initSteps() {
    const current = Number(document.body.dataset.step);
    if (!current) return;

    document.querySelectorAll(".step").forEach(step => {
        const no = Number(step.dataset.step);

        if (no < current) step.classList.add("completed");
        if (no === current) step.classList.add("active");
    });

    updateStepIcons();
}

function updateStepIcons() {
    document.querySelectorAll(".step").forEach(step => {
        const icon = step.querySelector(".dot-icon");

        if (step.classList.contains("completed")) icon.src = "img/done.png";
        else if (step.classList.contains("active")) icon.src = "img/doing.png";
        else icon.src = "img/undone.png";
    });
}


/* =========================================================
   INITIALIZER (ONE DOM LOADER ONLY)
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    initSteps();

    const retakeBtn = document.getElementById("retakeButton");
    if (retakeBtn) {
        retakeBtn.addEventListener("click", initRetakeButton);
    }
});

