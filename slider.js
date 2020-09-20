let btnPrev = document.querySelector('.prev');
let btnNext = document.querySelector('.next');
let slideWrap = document.querySelector('.test_slide_1');
function SySlider(slideWrap,btnPrev,btnNext){
    let slide = slideWrap.querySelector('ul');
    let slideLi = slide.querySelectorAll('li');
    let length = slideLi.length;
    let firstSlide = slideLi[0];
    let lastSlide = slideLi[length - 1];
    let cloneFirst = firstSlide.cloneNode(true);
    let cloneLast = lastSlide.cloneNode(true);
    let moveWidth = slideWrap.offsetWidth;
    let idx = 0;
    let allowShift = true;
    let posInit;

    slide.appendChild(cloneFirst)
    slide.insertBefore(cloneLast,firstSlide);

    window.addEventListener('resize',resizeThrottler);

    let resizeTimeout;
    function resizeThrottler(){
        resizeTimeout = setTimeout(()=>{
            resizeTimeout = null;
            resizing();
        },200)
    }

    function resizing(){
        moveWidth = slideWrap.offsetWidth;
        let _slideLi = slide.querySelectorAll('li');
        for(let i=0;i<_slideLi.length;i++){
            _slideLi[i].style.width = moveWidth+'px';
        }
        slide.style.left = -moveWidth+'px';
    };
    resizing();

    slide.addEventListener('transitionend',transition);

    function transition(){
        slide.classList.remove('shifting');
        if(idx == -1){
            slide.style.left = -(length*moveWidth) + 'px';
            idx=length-1; 
        }
        if(idx == length){
            slide.style.left = -(moveWidth) + 'px'
            idx=0;
        }
        allowShift = true;  
    }

    btnPrev.addEventListener('click',function(){slideMove(-1)});
    btnNext.addEventListener('click',function(){slideMove(1)});
    function slideMove (dir,action){
        slide.classList.add('shifting');
        if(allowShift){
            if(!action){
                posInit = slide.offsetLeft;
            }
            if(dir == 1){
                slide.style.left = (posInit - moveWidth) + "px"
                idx++;
            }
            if(dir == -1){
                slide.style.left = (posInit + moveWidth) + "px"
                idx--;
            }
        }
        allowShift = false;
    }

}
SySlider(slideWrap,btnPrev,btnNext);

let btnPrev2 = document.querySelector('.prev2');
let btnNext2 = document.querySelector('.next2');
let slideWrap2 = document.querySelector('.test_slide_2');
SySlider(slideWrap2,btnPrev2,btnNext2);
