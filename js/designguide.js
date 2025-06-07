// 페이지 전환 효과
function smoothNav(url) {
    document.body.classList.add('fade-out');
    setTimeout(() => { window.location.href = url; }, 500);
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 페이드인 효과 (한 프레임 뒤에 붙이기)
    document.body.classList.remove('fade-out');
    document.querySelectorAll('.instant-fade').forEach(el => {
        setTimeout(() => {
            el.classList.add('visible');
        }, 10);
    });

    // 스크롤 애니메이션 (index.html과 동일하게 visible 클래스만 붙임)
    const scrollElements = document.querySelectorAll('.fade-box.scroll-hidden');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            entry.target.classList.add('visible');
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4, rootMargin: '0px 0px -5% 0px' });
    scrollElements.forEach(el => observer.observe(el));

    // 컬러 셀 클릭 이벤트
    const colorCell = document.querySelector('.color-cell');
    if (colorCell) {
        colorCell.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    // 폰트 weight 슬라이더 초기화
    initFontWeightSlider('fontWeightSlider1', 'fontPreviewText1a', 'fontPreviewText1b');
    initFontWeightSlider('fontWeightSlider2', 'fontPreviewText2a', 'fontPreviewText2b');
    initFontWeightSlider('fontWeightSlider3', 'fontPreviewText3a', 'fontPreviewText3b');
});

// 새로고침 시 상단으로 이동
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// 폰트 weight 슬라이더 초기화 함수
function initFontWeightSlider(sliderId, previewId1, previewId2) {
    const slider = document.getElementById(sliderId);
    const preview1 = document.getElementById(previewId1);
    const preview2 = document.getElementById(previewId2);

    if (slider && preview1 && preview2) {
        preview1.style.fontWeight = '100';
        preview2.style.fontWeight = '100';
        slider.addEventListener('input', function() {
            preview1.style.fontWeight = this.value;
            preview2.style.fontWeight = this.value;
        });
    }
} 