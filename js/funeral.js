// 페이지 전환 효과
function smoothNav(url) {
  document.body.classList.add("fade-out")
  setTimeout(() => {
    window.location.href = url
  }, 500)
}

// 스크롤 애니메이션
function initScrollAnimations() {
  const scrollElements = document.querySelectorAll(".fade-box.scroll-hidden")
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            entry.target.classList.add("visible")
          })
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.4,
      rootMargin: "0px 0px -5% 0px",
    },
  )

  scrollElements.forEach((el) => observer.observe(el))
}

// 애니메이션 상태 관리
let isMainTabAnimating = false
let isFlowTabAnimating = false

// 메인 탭 기능 (부드러운 전환 + 겹침 방지)
function initMainTabFunctionality() {
  console.log("탭 기능 초기화 시작")

  const tabRows = document.querySelectorAll(".tab-option-row")
  const mainImages = document.querySelectorAll(".main-image")
  const descriptions = document.querySelectorAll(".description-content")

  console.log("탭 버튼 개수:", tabRows.length)
  console.log("이미지 개수:", mainImages.length)
  console.log("설명 개수:", descriptions.length)

  // 초기 상태 설정
  if (tabRows.length > 0) {
    tabRows[0].classList.add("active")
  }
  if (mainImages.length > 0) {
    mainImages[0].classList.add("active")
  }
  if (descriptions.length > 0) {
    descriptions[0].classList.add("active")
  }

  tabRows.forEach((row, index) => {
    console.log(`탭 ${index + 1} 이벤트 리스너 추가`)

    row.addEventListener("click", function (e) {
      console.log("탭 클릭됨!", this.getAttribute("data-tab"))
      e.preventDefault()
      e.stopPropagation()

      const tabId = this.getAttribute("data-tab")
      if (!tabId) {
        console.log("tabId가 없음")
        return
      }

      // 이미 활성화된 탭이면 아무것도 하지 않음
      if (this.classList.contains("active")) {
        console.log("이미 활성화된 탭")
        return
      }

      // 애니메이션 중이면 클릭 무시
      if (isMainTabAnimating) {
        console.log("애니메이션 중이므로 클릭 무시")
        return
      }

      console.log(`탭 ${tabId}로 전환 시작`)
      isMainTabAnimating = true

      // 탭 버튼 상태 변경
      tabRows.forEach((tab) => tab.classList.remove("active"))
      this.classList.add("active")

      // 현재 활성화된 요소들 찾기
      const currentActiveImage = document.querySelector(".main-image.active")
      const currentActiveDesc = document.querySelector(".description-content.active")

      // 새로운 요소들 찾기
      const targetImage = document.getElementById(`main-image-${tabId}`)
      const targetDesc = document.getElementById(`description-${tabId}`)

      console.log("현재 이미지:", currentActiveImage)
      console.log("타겟 이미지:", targetImage)
      console.log("현재 설명:", currentActiveDesc)
      console.log("타겟 설명:", targetDesc)

      // 부드러운 전환 애니메이션
      let animationsCompleted = 0
      const totalAnimations = 2 // 이미지 + 설명

      function onAnimationComplete() {
        animationsCompleted++
        if (animationsCompleted >= totalAnimations) {
          isMainTabAnimating = false
          console.log("모든 애니메이션 완료")
        }
      }

      // 이미지 전환
      if (currentActiveImage && targetImage) {
        currentActiveImage.classList.add("fade-out")

        setTimeout(() => {
          currentActiveImage.classList.remove("active", "fade-out")
          targetImage.classList.add("active")

          // 약간의 지연 후 fade-in 효과
          requestAnimationFrame(() => {
            targetImage.classList.add("fade-in")
            setTimeout(() => {
              targetImage.classList.remove("fade-in")
              onAnimationComplete()
            }, 300)
          })
        }, 150)
      } else {
        onAnimationComplete()
      }

      // 설명 전환
      if (currentActiveDesc && targetDesc) {
        currentActiveDesc.classList.add("fade-out")

        setTimeout(() => {
          currentActiveDesc.classList.remove("active", "fade-out")
          targetDesc.classList.add("active")

          // 약간의 지연 후 fade-in 효과
          requestAnimationFrame(() => {
            targetDesc.classList.add("fade-in")
            setTimeout(() => {
              targetDesc.classList.remove("fade-in")
              onAnimationComplete()
            }, 300)
          })
        }, 150)
      } else {
        onAnimationComplete()
      }
    })

    // 마우스 이벤트도 추가로 테스트
    row.addEventListener("mouseenter", function () {
      console.log("마우스 진입:", this.getAttribute("data-tab"))
    })
  })
}

// 플로우 탭 기능 (부드러운 전환 + 겹침 방지)
function initFlowTabFunctionality() {
  const indicators = document.querySelectorAll(".indicator")
  const flowImages = document.querySelectorAll(".flow-image")
  const flowDescriptions = document.querySelectorAll(".flow-description")

  indicators.forEach((indicator) => {
    indicator.addEventListener("click", function () {
      const flowId = this.getAttribute("data-flow")

      // 이미 활성화된 인디케이터면 아무것도 하지 않음
      if (this.classList.contains("active")) return

      // 애니메이션 중이면 클릭 무시
      if (isFlowTabAnimating) return

      console.log(`플로우 ${flowId}로 전환`)
      isFlowTabAnimating = true

      // 현재 활성화된 요소들 찾기
      const currentActiveImage = document.querySelector(".flow-image.active")
      const currentActiveDesc = document.querySelector(".flow-description.active")

      // 새로운 요소들 찾기
      const targetImage = document.getElementById(`flow-image-${flowId}`)
      const targetDesc = document.getElementById(`flow-desc-${flowId}`)

      // 인디케이터 상태 변경
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

      // 이미지 전환
      if (currentActiveImage && targetImage) {
        currentActiveImage.classList.add("fade-out")

        setTimeout(() => {
          currentActiveImage.classList.remove("active", "fade-out")
          targetImage.classList.add("active")

          requestAnimationFrame(() => {
            targetImage.classList.add("fade-in")
            setTimeout(() => {
              targetImage.classList.remove("fade-in")
              onAnimationComplete()
            }, 300)
          })
        }, 150)
      } else {
        onAnimationComplete()
      }

      // 설명 전환
      if (currentActiveDesc && targetDesc) {
        currentActiveDesc.classList.add("fade-out")

        setTimeout(() => {
          currentActiveDesc.classList.remove("active", "fade-out")
          targetDesc.classList.add("active")

          requestAnimationFrame(() => {
            targetDesc.classList.add("fade-in")
            setTimeout(() => {
              targetDesc.classList.remove("fade-in")
              onAnimationComplete()
            }, 300)
          })
        }, 150)
      } else {
        onAnimationComplete()
      }
    })
  })
}

// 페이지 로드 시 초기화
window.addEventListener("load", () => {
  console.log("페이지 로드 완료")

  // 새로고침 시 항상 상단으로 이동
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual"
  }
  window.scrollTo(0, 0)

  // 페이드아웃 클래스 제거
  document.body.classList.remove("fade-out")

  // 즉시 페이드인 효과
  document.querySelectorAll(".instant-fade").forEach((el) => {
    setTimeout(() => {
      el.classList.add("visible")
    }, 10)
  })

  // 각 기능 초기화
  console.log("기능 초기화 시작")
  initScrollAnimations()

  // 탭 기능은 약간 지연시켜서 초기화
  setTimeout(() => {
    initMainTabFunctionality()
    initFlowTabFunctionality()
  }, 100)

  console.log("기능 초기화 완료")

  // 부드러운 스크롤
  document.documentElement.style.scrollBehavior = "smooth"
})

document.addEventListener('DOMContentLoaded', function() {
    const stepIndicators = document.querySelectorAll('.step-indicator');
    const memorialImages = document.querySelectorAll('.memorial-image');
    const stepPanels = document.querySelectorAll('.step-panel');

    stepIndicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const step = this.getAttribute('data-step');
            
            // Remove active class from all indicators, images, and panels
            stepIndicators.forEach(ind => ind.classList.remove('active'));
            memorialImages.forEach(img => img.classList.remove('active'));
            stepPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to the clicked indicator, corresponding image, and panel
            this.classList.add('active');
            document.getElementById(`memorial-image-${step}`).classList.add('active');
            document.getElementById(`step-panel-${step}`).classList.add('active');
        });
    });
});

document.getElementById('scrollTopBtn').onclick = function() {
  window.scrollTo({top:0, behavior:'smooth'});
};
