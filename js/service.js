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

// 서비스 스텝 기능 (app의 step 기능과 동일)
function initServiceStepFunctionality() {
  const stepIndicators = document.querySelectorAll(".step-indicator")
  const serviceImages = document.querySelectorAll(".service-image")
  const stepPanels = document.querySelectorAll(".step-panel")

  stepIndicators.forEach((indicator) => {
    indicator.addEventListener("click", function () {
      const step = this.getAttribute("data-step")

      // 모든 활성 상태 제거
      stepIndicators.forEach((ind) => ind.classList.remove("active"))
      serviceImages.forEach((img) => img.classList.remove("active"))
      stepPanels.forEach((panel) => panel.classList.remove("active"))

      // 선택된 스텝 활성화
      this.classList.add("active")
      const targetImage = document.getElementById(`service-image-${step}`)
      const targetPanel = document.getElementById(`step-panel-${step}`)

      if (targetImage) targetImage.classList.add("active")
      if (targetPanel) targetPanel.classList.add("active")
    })
  })
}

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", () => {
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
  initScrollAnimations()
  initServiceStepFunctionality() // 이름 변경

  // 부드러운 스크롤
  document.documentElement.style.scrollBehavior = "smooth"
})
