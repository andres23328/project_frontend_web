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


buttonUp = document.getElementById("button-up");

window.onscroll = function(){

    var scroll = document.documentElement.scrollTop;

    if (scroll > 500){
        buttonUp.style.transform = "scale(1)";
    }else if(scroll < 500){
        buttonUp.style.transform = "scale(0)";
    }

    var posicion = window.pageYOffset || document.documentElement.scrollTop;
    var elemento1 = document.getElementById("icon_heart");
    var elemento2 = document.getElementById("icon_fire");
    elemento1.style.bottom = posicion * 0.1 + "px";
    elemento2.style.top = posicion * 0.1 + "px";

}