const Menu_btn = document.querySelector(".tonggle__button");
const item1 = document.querySelector(".Header .DropDown");
const logout = document.querySelector("#logout");

Menu_btn.addEventListener("click", () => {
  item1.classList.toggle("active");
});
logout.addEventListener("click", () => {
  fetch("/logout");
});
