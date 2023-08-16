// Navigation
const nav = document.querySelector(".nav__links__wrapper");
const links = document.querySelectorAll(".nav__link");
const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");
const scrollBtn = document.getElementById("scrollup");
const sections = document.querySelectorAll("section[id]");
const main = document.getElementById("main");
const footer = document.getElementById("footer");

// Carousel
const carousel = document.querySelector(".carousel__track");
const arrowbtns = document.querySelectorAll(".carousel__btn");
const slideWidth = document.querySelector(".carousel__slide").offsetWidth;

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

// Carousel
let isDragging = false,
  startX,
  startScrollLeft;

arrowbtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log(btn.id);
    carousel.scrollLeft += btn.id === "left" ? -slideWidth : slideWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};
const dragging = (e) => {
  // pageX returns the horizontal coordinate of the mouse pointer
  // scrollLeft sets or returns the number of pixels an element's content is scrolled horizontally
  if (!isDragging) return;
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
