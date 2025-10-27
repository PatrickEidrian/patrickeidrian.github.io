const menuButton = document.querySelector(".header-menu__button");
const menu = document.querySelector(".menu");

menuButton.addEventListener("click", () => {
  if (menu.style.display === "flex") {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
  }
});
