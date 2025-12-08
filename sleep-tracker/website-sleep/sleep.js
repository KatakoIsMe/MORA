const toggle = document.getElementById("hamburger-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    sidebar.classList.toggle("open");
    overlay.classList.toggle("show");
});

overlay.addEventListener("click", () => {
    toggle.classList.remove("active");
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
});

// Volume Slider Control dengan gradient yang berubah
const volumeSlider = document.getElementById('volume-slider');
const volumePercent = document.getElementById('volume-percent');

if (volumeSlider && volumePercent) {
  // Fungsi untuk update gradient
  function updateSliderGradient() {
    const value = volumeSlider.value;
    const min = volumeSlider.min || 0;
    const max = volumeSlider.max || 100;
    const percentage = ((value - min) * 100) / (max - min);
    
    // Update persentase teks
    volumePercent.textContent = value + '%';
    
    // Update gradient background
    volumeSlider.style.background = `linear-gradient(to right, #3b82f6 ${percentage}%, #e5e7eb ${percentage}%)`;
  }
  
  // Event listener untuk input (saat digeser)
  volumeSlider.addEventListener('input', updateSliderGradient);
  
  // Event listener untuk change (saat dilepas)
  volumeSlider.addEventListener('change', updateSliderGradient);
  
  // Inisialisasi gradient awal
  updateSliderGradient();
}

// Noise Sound Dropdown
const noiseDropdownBtn = document.getElementById('noise-dropdown-btn');
const noiseDropdownContent = document.getElementById('noise-dropdown-content');
const selectedNoise = document.getElementById('selected-noise');
const noiseOptions = document.querySelectorAll('.noise-option');

if (noiseDropdownBtn && noiseDropdownContent) {
  // Toggle dropdown
  noiseDropdownBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    noiseDropdownBtn.parentElement.classList.toggle('active');
  });
  
  // Select option
  noiseOptions.forEach(option => {
    option.addEventListener('click', function() {
      const value = this.getAttribute('data-value');
      const text = this.textContent;
      
      // Update selected text
      selectedNoise.textContent = text;
      
      // Update active state
      noiseOptions.forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
      
      // Close dropdown
      noiseDropdownBtn.parentElement.classList.remove('active');
      
      // Simpan pilihan ke localStorage (optional)
      localStorage.setItem('selectedNoise', value);
      
      // Tambahkan logika untuk mengubah suara sesuai pilihan
      console.log('Noise sound changed to:', value);
    });
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!noiseDropdownBtn.contains(e.target) && !noiseDropdownContent.contains(e.target)) {
      noiseDropdownBtn.parentElement.classList.remove('active');
    }
  });
  
  // Load saved selection (optional)
  const savedNoise = localStorage.getItem('selectedNoise');
  if (savedNoise) {
    const savedOption = document.querySelector(`.noise-option[data-value="${savedNoise}"]`);
    if (savedOption) {
      selectedNoise.textContent = savedOption.textContent;
      noiseOptions.forEach(opt => opt.classList.remove('active'));
      savedOption.classList.add('active');
    }
  }
}