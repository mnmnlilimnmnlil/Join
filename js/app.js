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
  
  // 앱 스텝 기능 (funeral과 동일한 구조)
  function initAppStepFunctionality() {
    const stepIndicators = document.querySelectorAll(".step-indicator")
    const appImages = document.querySelectorAll(".app-image")
    const stepPanels = document.querySelectorAll(".step-panel")
  
    stepIndicators.forEach((indicator) => {
      indicator.addEventListener("click", function () {
        const step = this.getAttribute("data-step")
  
        // 모든 활성 상태 제거
        stepIndicators.forEach((ind) => ind.classList.remove("active"))
        appImages.forEach((img) => img.classList.remove("active"))
        stepPanels.forEach((panel) => panel.classList.remove("active"))
  
        // 선택된 스텝 활성화
        this.classList.add("active")
        const targetImage = document.getElementById(`app-image-${step}`)
        const targetPanel = document.getElementById(`step-panel-${step}`)
  
        if (targetImage) targetImage.classList.add("active")
        if (targetPanel) targetPanel.classList.add("active")
      })
    })
  }
  
  // 기능 아이템 호버 효과
  function initFeatureHoverEffects() {
    const featureItems = document.querySelectorAll(".feature-item")
  
    featureItems.forEach((item) => {
      const staticImg = item.querySelector(".feature-static")
      const gifImg = item.querySelector(".feature-gif")
  
      item.addEventListener("mouseenter", () => {
        if (staticImg && gifImg) {
          staticImg.style.opacity = "0"
          gifImg.style.opacity = "1"
        }
      })
  
      item.addEventListener("mouseleave", () => {
        if (staticImg && gifImg) {
          staticImg.style.opacity = "1"
          gifImg.style.opacity = "0"
        }
      })
    })
  }
  
  // 2x2 기능 카드 페이드인
  const featureBoxes = document.querySelectorAll('.feature-box');
  const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.4
  });
  
  featureBoxes.forEach(box => {
    featureObserver.observe(box);
  });
  
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
    initAppStepFunctionality()
    initFeatureHoverEffects()
  
    // 부드러운 스크롤
    document.documentElement.style.scrollBehavior = "smooth"
  })
  