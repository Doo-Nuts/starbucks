// --- 돋보기 아이콘 클릭-----
// class가 search인 요소를 찾아서 searchEl이라는 변수에 저장 
const searchEl = document.querySelector('.search');
// document 라는 객체는 html 그 자체임 "DOCTYPE html"
// const serchInputEl = document.querySelector('.search input'); 를 효율적으로 작성하면?
const searchInputEl = searchEl.querySelector('input');

// 이벤트 추가 : 클릭
searchEl.addEventListener('click', function () {
  searchInputEl.focus();
});

// 클릭 했을 경우 나타나는 이벤트
searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  // html 속성 지정
  searchInputEl.setAttribute('placeholder', '통합검색');
});

// 클릭 되지 않았을 때 클래스 포커스가 추가되지 않음
searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});

// 사이드바 뱃지 출력
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

// 화면 스크롤 기능(0.3초 단위로 함수가 실행되어 부하를 막음'_.throttle(함수, 시간)')
window.addEventListener('scroll', _.throttle(function () {
  console.log(window.scrollY);
  if (window.scrollY > 500) {
    // 사이드바(배지) 숨기기
    // gsap.to(요소, 지속시간, 옵션);
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    });
    // 페이지 상단 이동 버튼 보이기
    gsap.to(toTopEl, .2, {
      x: 0
    });
    // badgeEl.style.display = "none";
  } else {
    // 배지 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
      // badgeEl.style.display = 'block';
    });
    // 페이지 상단 이동 버튼 숨기기
    gsap.to(toTopEl, .2, {
      x: 100  // x축 100px 지점 0.2초동안 이동
    });
  }
},300));

// 버튼 클릭시 페이지 상단이동
toTopEl.addEventListener('click', function () {
  gsap.to(window, .7, {  
    scrollTo: 0  // 화면의 0px 지점으로 0.7초동안 이동
  });
});


// 요소가 순차적으로 보이는 애니메이션
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {  // index가 0부터 시작하기때문에 delay에서 1을 더해줌
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7,  // 0.7초마다 요소들이 순차적으로 나타남
    opacity: 1
  });
});


// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true
});
new Swiper('.promotion .swiper-container', {
  // direction: 'horizontal' 기본값
  slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 간격
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay: {
    delay: 5000 // 5초 딜레이
  },
  pagination: {
    el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
    clickable: true // 사용자 페이지 번호 요소 제어

  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});

new Swiper('.awards .swiper-container',{
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false; // 보이고 있는 상황
promotionToggleBtn.addEventListener('click', function () { // 버튼을 클릭 하면 함수가 실행 됨
  isHidePromotion = !isHidePromotion // 값이 반대가 됨
  if (isHidePromotion) {
    // 숨김 처리
    promotionEl.classList.add('hide');
  } else {
    // 보임 처리
    promotionEl.classList.remove('hide');
  }
});


// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}


// 영상 위에 떠다니는 구조 애니메이션
function floatingObject(selector, delay, size) {
  // gsap.to(요소, 시간, 옵션);
  gsap.to(
    selector,
    random(1.5, 2.5), 
    {
      y: size,  // y축으로 size 만큼 내려옴
      repeat: -1,  // 무한 반복
      yoyo: true, // 내려왔다 다시 올라오는 구조 반복
      ease: Power1.easeInOut,  // gsap easing 효과 삽입
      delay: random(0, delay)
    }
  );
}
floatingObject('.floating1', 1, 15); // floating 선택자에 대한 함수 실행
floatingObject('.floating2', .5, 15); // floating 선택자에 대한 함수 실행
floatingObject('.floating3', 1.5, 20); // floating 선택자에 대한 함수 실행


const spyEls = document.querySelectorAll('section.scroll-spy')
spyEls.forEach(function (spyEl) {
  new ScrollMagic  // 생성자 함수
    .Scene({    // scene 을 통해 요소를 감시 // 메소드 체이닝
      triggerElement: spyEl,  // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8  // 뷰포트의 0(맨위) 에서 1(맨아래) 지점 중 0.8 지점에서 트리거 발생
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller()); // ScrollMagic이 Controller를 통해 작동함 
  
});


// FOOTER
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); // 2023