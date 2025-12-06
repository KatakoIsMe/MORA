const data = {
    anxiety: {
        title: "What does ANXIETY mean?",
        img: "assets/anxiety.png",
        symptoms: "",
        explanation: ""
    },
    ptsd: {
        title: "What does PTSD mean?",
        img: "assets/ptsd.png",
        symptoms: "",
        explanation: ""
    },
    npd: {
        title: "What does NPD mean?",
        img: "assets/npd.png",
        symptoms: "",
        explanation: ""
    },
    bpd: {
        title: "What does BPD mean?",
        img: "assets/bpd.png",
        symptoms: "",
        explanation: ""
    },
    depression: {
        title: "What does DEPRESSION mean?",
        img: "assets/depression.png",
        symptoms: "",
        explanation: ""
    },
    ocd: {
        title: "What does OCD mean?",
        img: "assets/ocd.png",
        symptoms: "",
        explanation: ""
    },
    skizo: {
        title: "What does SCHIZOPHRENIA mean?",
        img: "assets/skizo.png",
        symptoms: "",
        explanation: ""
    },
    ed: {
        title: "What does EATING DISORDER mean?",
        img: "assets/ed.png",
        symptoms: "",
        explanation: ""
    }
};

// Ambil kategori dari URL
const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get('type');

// Masukkan data ke HTML
if (data[type]) {
    document.getElementById("category-title").textContent = data[type].title;
    document.getElementById("header-img").style.backgroundImage = `url(${data[type].img})`;
    document.getElementById("symptoms").textContent = data[type].symptoms;
    document.getElementById("explanation").textContent = data[type].explanation;
}
