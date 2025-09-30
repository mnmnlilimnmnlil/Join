# JO;IN — 경조사 키오스크 서비스 웹사이트 (공모전 출품작)

## 성과
- 국제 커뮤니케이션 공모전: 우수상
- 대한민국디자인전람회: 특선
- 디지털미디어디자인과 연합 PT: 최우수작 발표 선정

## 프로젝트 개요
- 혼자 웹 개발 전담, 기획/디자인 피드백 참여한 3인(디자인 2명 프로그래밍 1명) 팀 프로젝트입니다.
- Vanilla JavaScript 기반. 결혼식/돌잔치/장례식의 키오스크 인터랙션을 웹으로 구현했습니다.
- 탭 전환, 단계 안내(Flow), 스크롤 인터랙션을 공통 구조로 설계했습니다.
- 약 2주 개발(핵심 구현 + 출품 안정화).

## 주요 화면 및 기능
- 시작/메인: 메뉴 클릭 → 부드러운 페이지 전환(페이드 아웃)
- 행사 소개 탭: 메인 이미지 + 설명 3개 탭 전환
- 프로세스 안내: 단계 인디케이터 클릭 → 이미지/설명 동기화 전환
- 스크롤 인터랙션: 구간 진입 시 페이드인
- 성능: 이미지 Lazy Loading, 불필요 관찰 해제, 최소한의 JS 전환

---

### 1) 페이지 전환 + 초기화 파이프라인
```javascript
// 페이지 전환 효과
function smoothNav(url) {
  document.body.classList.add("fade-out")
  setTimeout(() => {
    window.location.href = url
  }, 500)
}

// 페이지 로드 시 초기화
window.addEventListener("load", () => {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual"
  }
  window.scrollTo(0, 0)

  document.body.classList.remove("fade-out")

  document.querySelectorAll(".instant-fade").forEach((el) => {
    el.classList.add("visible")
  })

  initLazyLoading()
  initScrollAnimations()
  initMainTabFunctionality()
  initFlowTabFunctionality()

  document.documentElement.style.scrollBehavior = "smooth"
})
```
- **의도**: 즉시 라우팅 대신 페이드아웃 후 이동해 전환이 자연스럽습니다.
- **설계**: 리소스 로드 뒤에만 인터랙션을 붙여 초기 플리커를 줄입니다.

### 2) 이미지 지연 로딩 (Lazy Loading)
```javascript
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
}
```
- **의도**: 화면에 보이는 시점에만 이미지를 로드해 초기 로딩을 가볍게.
- **HTML 예시**: `<img data-src="./gif/wedding-1.webp" alt="축의금 보내기" class="tab-image" />`

### 3) 스크롤 인터섹션 애니메이션
```javascript
function initScrollAnimations() {
  const scrollElements = document.querySelectorAll(".fade-box.scroll-hidden")
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.4,
      rootMargin: "0px 0px -5% 0px",
    }
  )

  scrollElements.forEach((el) => observer.observe(el))
}
```
- **의도**: 구간별로 콘텐츠가 부드럽게 등장해 가독성과 집중도를 높입니다.
- **포인트**: 한 번 나타난 요소는 관찰을 해제해 성능 부담을 줄입니다.

### 4) 행사 소개 탭 전환(이미지+설명)
```javascript
function initMainTabFunctionality() {
  const tabRows = document.querySelectorAll(".tab-option-row")
  const mainImages = document.querySelectorAll(".main-image")
  const descriptions = document.querySelectorAll(".description-content")

  if (tabRows.length > 0) tabRows[0].classList.add("active")
  if (mainImages.length > 0) mainImages[0].classList.add("active")
  if (descriptions.length > 0) descriptions[0].classList.add("active")

  let isMainTabAnimating = false

  tabRows.forEach((row) => {
    row.addEventListener("click", function (e) {
      e.preventDefault()
      e.stopPropagation()

      const tabId = this.getAttribute("data-tab")
      if (!tabId || this.classList.contains("active") || isMainTabAnimating) return

      isMainTabAnimating = true

      tabRows.forEach((tab) => tab.classList.remove("active"))
      this.classList.add("active")

      const currentActiveImage = document.querySelector(".main-image.active")
      const currentActiveDesc = document.querySelector(".description-content.active")
      const targetImage = document.getElementById(`main-image-${tabId}`)
      const targetDesc = document.getElementById(`description-${tabId}`)

      let animationsCompleted = 0
      const totalAnimations = 2

      function onAnimationComplete() {
        animationsCompleted++
        if (animationsCompleted >= totalAnimations) {
          isMainTabAnimating = false
        }
      }

      if (currentActiveImage && targetImage) {
        currentActiveImage.classList.add("fade-out")
        setTimeout(() => {
          currentActiveImage.classList.remove("active", "fade-out")
          targetImage.classList.add("active", "fade-in")
          setTimeout(() => {
            targetImage.classList.remove("fade-in")
            onAnimationComplete()
          }, 300)
        }, 150)
      } else {
        onAnimationComplete()
      }

      if (currentActiveDesc && targetDesc) {
        currentActiveDesc.classList.add("fade-out")
        setTimeout(() => {
          currentActiveDesc.classList.remove("active", "fade-out")
          targetDesc.classList.add("active", "fade-in")
          setTimeout(() => {
            targetDesc.classList.remove("fade-in")
            onAnimationComplete()
          }, 300)
        }, 150)
      } else {
        onAnimationComplete()
      }
    })
  })
}
```
- **의도**: 비주얼(이미지)과 텍스트(설명)가 동시에 전환되어 맥락을 잃지 않습니다.
- **안정성**: 애니메이션 중 중복 클릭을 막아 상태 꼬임을 예방합니다.

### 5) 프로세스 단계(Flow) 전환
```javascript
function initFlowTabFunctionality() {
  const indicators = document.querySelectorAll(".indicator")
  let isFlowTabAnimating = false

  indicators.forEach((indicator) => {
    indicator.addEventListener("click", function () {
      const flowId = this.getAttribute("data-flow")
      if (this.classList.contains("active") || isFlowTabAnimating) return

      isFlowTabAnimating = true

      const currentActiveImage = document.querySelector(".flow-image.active")
      const currentActiveDesc = document.querySelector(".flow-description.active")
      const targetImage = document.getElementById(`flow-image-${flowId}`)
      const targetDesc = document.getElementById(`flow-desc-${flowId}`)

      indicators.forEach((ind) => ind.classList.remove("active"))
      this.classList.add("active")

      let animationsCompleted = 0
      const totalAnimations = 2

      function onAnimationComplete() {
        animationsCompleted++
        if (animationsCompleted >= totalAnimations) {
          isFlowTabAnimating = false
        }
      }

      if (currentActiveImage && targetImage) {
        currentActiveImage.classList.add("fade-out")
        setTimeout(() => {
          currentActiveImage.classList.remove("active", "fade-out")
          targetImage.classList.add("active", "fade-in")
          setTimeout(() => {
            targetImage.classList.remove("fade-in")
            onAnimationComplete()
          }, 300)
        }, 150)
      } else {
        onAnimationComplete()
      }

      if (currentActiveDesc && targetDesc) {
        currentActiveDesc.classList.add("fade-out")
        setTimeout(() => {
          currentActiveDesc.classList.remove("active", "fade-out")
          targetDesc.classList.add("active", "fade-in")
          setTimeout(() => {
            targetDesc.classList.remove("fade-in")
            onAnimationComplete()
          }, 300)
        }, 150)
      } else {
        onAnimationComplete()
      }
    })
  })
}
```
- **의도**: 단계별 안내를 직관적으로 탐색하도록 인디케이터-이미지-설명을 동기화합니다.
- **포인트**: 전환 논리를 탭과 동일 패턴으로 유지해 일관성을 확보했습니다.

### 6) 스크롤 탑 버튼
```javascript
document.getElementById('scrollTopBtn').onclick = function() {
  window.scrollTo({top:0, behavior:'smooth'});
};
```
- **의도**: 긴 페이지에서도 빠르게 최상단으로 복귀합니다.
- **접근성**: 네이티브 스무스 스크롤로 자연스러운 이동감을 제공합니다.

---

## 트러블슈팅 및 개선 경험
- 이미지 최적화: GIF 요구가 많아 초기 로딩이 느려짐 → WebP 전환 + Lazy Loading 적용으로 초기 로딩 시간 단축, 스크롤 구간 네트워크 비용 감소.
- 반응형 보강: 발표 환경(노트북/HDMI) 중심으로 그리드 재배치 → 다양한 해상도에서도 UI 깨짐 없는 안정 동작.
- 인터랙션 안정성: 애니메이션 중 입력 차단/관찰 해제로 레이스 및 중복 처리 방지.

## 얻은 점
- 기획→디자인→개발 전 과정을 팀원들과 협업해보는 좋은 경험
- 성능(로딩/전환)과 사용성(명확한 내비게이션) 사이의 균형을 설계로 해결.
- 공모전 수상을 통해 결과물의 완성도와 실현 가능성을 검증.

## 파일 구조
```
Join/
├── index.html, nav.html, app.html, service.html, video.html, designguide.html
├── weding.html                # 결혼식
├── firstbirthday.html         # 돌잔치
├── funeral.html               # 장례식
├── js/
│   ├── funeral.js             # 공통 인터랙션 (funeral, firstbirthday, weding)
│   ├── index.js, service.js, video.js, app.js, nav.js, designguide.js
├── css/
│   ├── reset.css
│   ├── funeral.css            # 공통 스타일
│   ├── index.css, service.css, video.css, app.css, nav.css, designguide.css
├── gif/ wedding-*.webp, first-*.webp, funeral-*.webp, *-pro*_*.webp
├── img/ weding|firstbirthday|funeral/kiosk.png, menu.png, join_favicon.png
├── audio/ scan.wav
└── pdf/ 쉬운언어모형(*).pdf
```
