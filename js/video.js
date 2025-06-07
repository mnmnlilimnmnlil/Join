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
  
    // 스크롤 애니메이션 초기화
    initScrollAnimations()
  
    // 부드러운 스크롤
    document.documentElement.style.scrollBehavior = "smooth"
  })
  