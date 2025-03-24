window.addEventListener('scroll', function() {
    console.log("Scrolling...");
    var header = document.querySelector('header');
    if (window.scrollY > 12) {
        header.style.transition = 'background-color 0.5s ease'; 
        header.style.backgroundColor = 'white';

    } else {
        header.style.transition = 'background-color 0.5s ease'; 
        header.style.backgroundColor = 'transparent'; 

    }
});


//bar

document.querySelector(".bars__menu").addEventListener("click", animateBars);

var line1__bars = document.querySelector(".line1__bars-menu");
var line2__bars = document.querySelector(".line2__bars-menu");
var line3__bars = document.querySelector(".line3__bars-menu");

function animateBars(){
    line1__bars.classList.toggle("activeline1__bars-menu");
    line2__bars.classList.toggle("activeline2__bars-menu");
    line3__bars.classList.toggle("activeline3__bars-menu");
}


document.querySelector(".bars__menu").addEventListener("click", mostrar_menu);

function mostrar_menu() {
    document.querySelector(".menu").classList.toggle("mostrar_menu");
}

window.addEventListener('scroll', function() {
    var menu = document.querySelector(".menu");
    if (window.scrollY > 12) {
        menu.style.transition = 'background-color 0.3s ease'; 
        menu.style.backgroundColor = 'white';
    } else {
        menu.style.transition = 'background-color 0.3s ease'; 
        menu.style.backgroundColor = 'transparent'; 
    }
});

// Scroll up

document.getElementById("button-up").addEventListener("click", scrollUp);

function scrollUp(){

    var currentScroll = document.documentElement.scrollTop;

    if (currentScroll > 0){
        window.requestAnimationFrame(scrollUp);
        window.scrollTo (0, currentScroll - (currentScroll / 10));
    }
}
