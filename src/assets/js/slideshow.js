let slideIndex = 1;
let slideInterval;

showSlides(slideIndex);
startAutoSlide();

function plusSlides(n) {
    showSlides(slideIndex += n);
    resetAutoSlide();
}

function currentSlide(n) {
    showSlides(slideIndex = n);
    resetAutoSlide();
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    
    // 添加淡出效果
    for (i = 0; i < slides.length; i++) {
        slides[i].style.opacity = 0;
        slides[i].style.display = "none";  
    }
    
    // 添加淡入效果
    slides[slideIndex-1].style.display = "block";
    setTimeout(() => {
        slides[slideIndex-1].style.opacity = 1;
    }, 10);

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[slideIndex-1].className += " active";
}

function startAutoSlide() {
    slideInterval = setInterval(() => {
        plusSlides(1);
    },  2500); // 将3000毫秒改为1000毫秒
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}