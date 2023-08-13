const nav = document.querySelector(".nav__links__wrapper");
const links = document.querySelectorAll(".nav__link");
const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");
const scrollBtn = document.getElementById("scrollup");
const sections = document.querySelectorAll("section[id]");
const main = document.getElementById("main");
const footer = document.getElementById("footer");

function openMenu() {
  nav.classList.add("active");
}

function closeMenu() {
  nav.classList.remove("active");
}

function click(btn, func) {
  btn.addEventListener("click", func);
}

function navHighlighter() {
  // Loop all the sections to get the height, top and the id of each
  sections.forEach((section) => {
    // Get the current scroll position of the page
    let currentPosition = window.scrollY;
    let sectionHeight = section.offsetHeight;
    let sectionTop = section.offsetTop - 50;
    let sectionId = section.getAttribute("id");

    if (
      currentPosition > sectionTop &&
      currentPosition <= sectionTop + sectionHeight
    ) {
      links.forEach((link) => {
        click(link, closeMenu);
        link.classList.remove("current");
        document
          .querySelector(`li a[href*='${sectionId}']`)
          .classList.add("current");
      });
    }
  });
}

function scrollUp() {
  // When the scroll is higher than 350vh add the show-scroll class
  window.scrollY >= 350
    ? scrollBtn.classList.add("show-scroll")
    : scrollBtn.classList.remove("show-scroll");
}

click(menuBtn, openMenu);
click(closeBtn, closeMenu);
click(main, closeMenu);
click(footer, closeMenu);

window.addEventListener("scroll", scrollUp);
window.addEventListener("scroll", navHighlighter);
