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

// FOOTER
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); // 2023