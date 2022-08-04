const accordions = document.querySelectorAll('.accordion-item');

for(item of accordions) {
  item.addEventListener('click', function() {
    if(this.classList.contains("active")) {
      this.classList.remove('active');
    }else {
      for(el of accordions) {
        el.classList.remove('active');
      }
      this.classList.add('active');
    }
  })
}
const panels = document.querySelectorAll('.panel');
panels.forEach(panel => {
    panel.addEventListener('click', () => {
        removeActiveClasses();
        panel.classList.add('active');
    });
});
function removeActiveClasses() {
    panels.forEach(panel => {
        panel.classList.remove('active');
    });
}



const sliderLine = document.querySelector('.slider-line'),
      prevbutton = document.querySelector('.button-prev'),
      nextbutton = document.querySelector('.button-next'),
      dots = document.querySelectorAll(".dot"),
      Carusel = document.querySelector('.carusel');
let position = 0,
    dotIndex = 0;


const nextSlide = () => {
  if(position < (dots.length - 1) * Carusel.width) {
     position += Carusel.width
     dotIndex++
  }else {
    position = 0
    dotIndex = 0
  }
      sliderLine.style.left = -position +'px'
      thisSlide(dotIndex)
}


const prevSlide = () => {
  if(position > 0) {
     position -= Carusel.width
     dotIndex--
  }else {
    position = (dots.length - 1) * Carusel.width
    dotIndex = (dots.length - 1)
  }
      sliderLine.style.left = -position +'px'
      thisSlide(dotIndex)
}

const thisSlide = (Index) => {
  for(let dot of dots) {
    dot.classList.remove('activ')
  }
  dots[Index].classList.add('activ')
}




//----------------------------Eventlistenner--------------------------------
prevbutton.addEventListener('click', prevSlide)
nextbutton.addEventListener('click', nextSlide)
dots.forEach((dot, Index) =>{
  dot.addEventListener('click', () => {
    position = Carusel.width * Index
    sliderLine.style.left = -position +'px'
    dotIndex = Index
    thisSlide(dotIndex)
  
  
  })
})
//-------------------Интервал-------------------------------
// setInterval(() => {
//   nextSlide()
// }, 3000);
var timer = 0;
makeTimer(); //Создаем интервал 
function makeTimer(){
   clearInterval(timer) //Очистим интервал, это позволит прервать его работу и отменить перелистывание
   timer = setInterval(() => {
    nextSlide()
  }, 3000);}
