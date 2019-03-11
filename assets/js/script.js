document.addEventListener("DOMContentLoaded",function(){
    var slider = document.querySelector(".heroslider");
    var slides = document.querySelectorAll(".slide");
    var SliderDirection = document.querySelector(".slidedirection");
    var slideIndex = 0;
    var slideSpeed = 5000;

    function showSlide(i){
        slides.forEach(slide => {
            slide.style.opacity = 0;
            slide.style.pointerEvents = "none";
        });
        slides[i].style.opacity = 1;
        slides[i].style.pointerEvents = "auto";
    }
    showSlide(slideIndex)

    function slideChanger(direction = "next"){
        if(direction == "prev" && slideIndex == 0){
            slideIndex = slides.length - 1;
        }else if(direction == "prev"){
            slideIndex -= 1;
        }else if (direction == "next" && slideIndex == slides.length -1){
            slideIndex = 0;
        }else{
            slideIndex += 1;
        }
        showSlide(slideIndex);
    };

    function ChangeByArrow(event){
        if(event.target != event.currentTarget){
            var direction = event.target.getAttribute("data-direction");
            slideChanger(direction);
        }
        event.stopPropagation();
    }

    function ChangeByKey(event){
        if(event.keyCode == 39){
            slideChanger("next");
        }else if(event.keyCode == 37){
            slideChanger("prev");
        }
    };
    
var slideInterval = setInterval(slideChanger, slideSpeed);

function pauseSlides(){
    clearInterval(slideInterval);
}

function resumeSlides(){
    slideInterval = setInterval(slideChanger, slideSpeed);
}

    slider.addEventListener("mouseover", pauseSlides);
    slider.addEventListener("mouseout", resumeSlides);

    SliderDirection.addEventListener("click", ChangeByArrow);
    document.addEventListener("keyup", ChangeByKey);
});