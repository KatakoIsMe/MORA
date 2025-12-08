
  const sidebar = document.getElementById("entrySidebar");
  const openBtn = document.querySelector(".add-entry");
  const closeBtn = document.getElementById("closeSidebar");

  openBtn.addEventListener("click", () => {
    sidebar.classList.add("open");
  });

  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("open");
  });