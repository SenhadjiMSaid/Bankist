'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const tabsContainer = document.querySelector('.operations__tab-container');
const nav = document.querySelector('.nav');
const header = document.querySelector('header');
const allSections = document.querySelectorAll('.section');
const featuresImg = document.querySelectorAll('.features__img');
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.dots');

//Functions

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

function creatDots() {
  slides.forEach((_, i) => {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
}

let curSlide = 0;

function goToSlide(slide) {
  dots.forEach(d => d.classList.remove('dots__dot--active'));
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
  dots[slide].classList.add('dots__dot--active');
}

function nextSlide() {
  if (curSlide == slides.length - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
}

function prevSlide() {
  if (curSlide == 0) {
    curSlide = slides.length - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
}

//Event handlers
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Implementing Smooth Scrolling
btnScrollTo.addEventListener('click', function (e) {
  // const s1coords = section1.getBoundingClientRect();
  //Scrolling
  // window.scrollTo({
  //   left: s1coords.left,
  //   top: s1coords.top,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});
//Page navigation
// 1. Add event Lisrner to comon parent element
//2. Determen what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Tabbed Component

tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  //Active tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  //Active content area
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    // logo.style.opacity = this;
    link.closest('.nav').querySelector('img').style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

//Sticky navigation
// The Intersection Observer API :
function stickyNav(entries) {
  const entry = entries[0];
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
const navHeight = nav.getBoundingClientRect().height;
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

/*
//Bad for computers..
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords.top);
window.addEventListener('scroll', function (e) {
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
*/
// Revealing Elements on Scroll

const sectionObserver = new IntersectionObserver(
  (entries, observer) => {
    const entry = entries[0];
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  },
  {
    root: null,
    threshold: 0.15,
  }
);

allSections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

//  Lazy Loading Images
const imgObserver = new IntersectionObserver(
  (entries, observe) => {
    const entry = entries[0];
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });

    observe.unobserve(entry.target);
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '-200px',
  }
);

featuresImg.forEach(img => imgObserver.observe(img));

// Building a Slider Component
creatDots();
// slider.style.transform = 'scarle(0.2) translateX(-800px)';
// slider.style.overflow = 'visible';

const dots = document.querySelectorAll('.dots__dot');
goToSlide(0);

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
document.addEventListener('keydown', function (e) {
  e.key === 'ArrowRight' && nextSlide();
  e.key === 'ArrowLeft' && prevSlide();
});

dotsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
  }
});
//////////////////////////////////////////////////
////////////////////////////////////////////////////
// const obsCallBack = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//     if (!entry || !entry.isIntersecting) {
//     }
//   });
// };

// const obsOptions = {
//   root: null,
//   thresholder: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallBack, obsOptions);
// observer.observe(section1);
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

//Creating and insert
// .insertAdjacentHTML()
/*
const header = document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `We use cookied for improved functionality and analystic.
   <button class = "btn btn--close-cookie" >Got it</button>`;
header.prepend(message);
// header.append(message);
// header.before(message);
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });
message.style.backgroundColor = '#37383D';
message.style.width = '120%';
*/
/*
//Implementing Smooth Scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');

const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  // const s1coords = section1.getBoundingClientRect();
  //Scrolling
  // window.scrollTo({
  //   left: s1coords.left,
  //   top: s1coords.top,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

const h1 = document.querySelector('h1');
const alertH1 = function (e) {
  alert('You are reading the heading');
  h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

// h1.onclick = alertH1;
*/

/*
// rgb(255, 255, 255)

const RandomInt = (n, m) => Math.floor(Math.random() * (m - n + 1)) + n;

const randomColor = () =>
  `rgb(${RandomInt(0, 255)}, ${RandomInt(0, 255)}, ${RandomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    //Stop propagation
    // e.stopPropagation();
  },
  true
);
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
});
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
});
*/
/*
const h1 = document.querySelector('h1');
// Going downwards child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.children);

//Going Upwards: parent
console.log(h1.parentElement);
*/
