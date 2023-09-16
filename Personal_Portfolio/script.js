// mobile navigation
let navBtn = document.querySelector('.menu-btn');
let navbar  = document.querySelector('.primary-nav')
navBtn.addEventListener('click', () => {
  let value = navbar.getAttribute("data-visible");
  if (value === "false") {
    navbar.setAttribute("data-visible", true);
    navBtn.setAttribute("aria-expanded", true);
  }
  else if (value === "true") {
    navbar.setAttribute("data-visible", false);
        navBtn.setAttribute("aria-expanded", false);

  }
})