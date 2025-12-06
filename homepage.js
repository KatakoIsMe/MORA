const categoryList = document.getElementById("categoryList");
const toggleBtn = document.getElementById("toggleBtn");

// kategori awal (home 1)
const defaultCategories = `
    <button class="category-btn anxiety" onclick="location.href='category.html?type=anxiety'">ANXIETY</button>
    <button class="category-btn npd" onclick="location.href='category.html?type=npd'">NPD</button>
    <button class="category-btn depression" onclick="location.href='category.html?type=depression'">DEPRESSION</button>
    <button class="category-btn ocd" onclick="location.href='category.html?type=ocd'">OCD</button>
`;

// kategori lengkap (home 2)
const fullCategories = `
    <button class="category-btn anxiety" onclick="openCat('anxiety')">ANXIETY</button>
    <button class="category-btn npd" onclick="openCat('npd')">NPD</button>
    <button class="category-btn depression" onclick="openCat('depression')">DEPRESSION</button>
    <button class="category-btn ocd" onclick="openCat('ocd')">OCD</button>
    <button class="category-btn ptsd" onclick="openCat('ptsd')">PTSD</button>
    <button class="category-btn bpd" onclick="openCat('bpd')">BPD</button>
    <button class="category-btn skizo" onclick="openCat('skizo')">SKIZOFRENIA</button>
    <button class="category-btn ed" onclick="openCat('ed')">ED</button>
`;

function openCat(cat) {
    location.href = `category.html?type=${cat}`;
}

// Toggle
toggleBtn.onclick = () => {
    const isAll = localStorage.getItem("seeAllCategories") === "true";

    if (isAll) {
        localStorage.setItem("seeAllCategories", "false");
        categoryList.innerHTML = defaultCategories;
        toggleBtn.textContent = "SEE ALL";
    } else {
        localStorage.setItem("seeAllCategories", "true");
        categoryList.innerHTML = fullCategories;
        toggleBtn.textContent = "SEE LESS";
    }
};

// Saat homepage dibuka → cek state sebelumnya
window.onload = () => {
    const isAll = localStorage.getItem("seeAllCategories") === "true";

    if (isAll) {
        categoryList.innerHTML = fullCategories;
        toggleBtn.textContent = "SEE LESS";
    } else {
        categoryList.innerHTML = defaultCategories;
        toggleBtn.textContent = "SEE ALL";
    }
};


// 🔥 Tombol Survey
function handleSurveyClick() {
    // testDone hanya di-set TRUE oleh result.js ketika user SELESAI test
    const alreadyDone = localStorage.getItem("testDone") === "true";

    if (!alreadyDone) {
        // klik pertama → mulai test
        window.location.href = "survey.html";
    } else {
        // klik kedua dan seterusnya → langsung ke hasil
        window.location.href = "result.html";
    }
}