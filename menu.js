const menuButton = document.querySelector(".header-menu__button");
const menu = document.querySelector(".menu");

menuButton.addEventListener("click", () => {
  menu.classList.toggle("active");
});
