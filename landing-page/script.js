const button = document.getElementById("menu");
const nav = document.querySelector('.primary-navigation')
const blur = document.querySelector('.blur');
button.addEventListener('click', () => {
  document.body.classList.toggle("blur-effect")
  const state = nav.getAttribute("data-visible");
  if (state ==="true"){
    nav.setAttribute("data-visible", false)
    button.setAttribute("aria-expanded", false)
    
  }else{
    nav.setAttribute("data-visible", true)
    button.setAttribute("aria-expanded", true)
    
  }
})
