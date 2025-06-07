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
  
  // 탭 기능
  function initTabFunctionality() {
    const tabButtons = document.querySelectorAll(".tab-btn")
    const tabPanels = document.querySelectorAll(".tab-panel")
    const tabImages = document.querySelectorAll(".tab-image")
    const infoBubbles = document.querySelectorAll(".info-bubble")
  
    tabButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const tabId = this.getAttribute("data-tab")
  
        // 모든 활성 상태 제거
        tabButtons.forEach((btn) => btn.classList.remove("active"))
        tabPanels.forEach((panel) => panel.classList.remove("active"))
        tabImages.forEach((image) => image.classList.remove("active"))
        infoBubbles.forEach((bubble) => bubble.classList.remove("active"))
  
        // 선택된 탭 활성화
        this.classList.add("active")
        document.getElementById(`tab-${tabId}`).classList.add("active")
        document.getElementById(`image-${tabId}`).classList.add("active")
  
        // 해당 탭의 말풍선들 활성화
        document.querySelectorAll(`.info-bubble[data-tab="${tabId}"]`).forEach((bubble) => {
          bubble.classList.add("active")
        })
      })
    })
  }
  
  // 다운로드 버튼 기능
  function initDownloadButtons() {
    const downloadButtons = document.querySelectorAll(".download-btn")
  
    downloadButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        const icon = button.querySelector(".download-icon")
        const arrow = icon.querySelector(".arrow-icon")
        const check = icon.querySelector(".check-icon")
        const spinner = icon.querySelector(".downloading-spinner")
        const text = button.querySelector(".download-text")
  
        // 이미 완료된 경우 무시
        if (button.classList.contains("download-complete")) return
  
        // 다운로드 중 표시
        arrow.style.display = "none"
        spinner.style.display = "block"
        text.textContent = "다운로드 중..."
  
        // 다운로드 완료 시 체크표시로 변경 (실제 다운로드는 브라우저가 처리)
        setTimeout(() => {
          spinner.style.display = "none"
          check.style.display = "block"
          button.classList.add("download-complete")
          text.textContent = "다운로드 완료"
        }, 1200)
      })
    })
  }
  
  // 폼 제출 기능
  function initFormSubmission() {
    const forms = document.querySelectorAll(".contact-form")
    forms.forEach((form) => {
      form.addEventListener("submit", function (e) {
        e.preventDefault()
  
        const button = this.querySelector("button")
        const originalText = button.textContent
  
        button.textContent = "신청 중..."
        button.style.backgroundColor = "#fbbf24"
  
        setTimeout(() => {
          button.textContent = "신청 완료됨"
          button.style.backgroundColor = "#4ade80"
  
          setTimeout(() => {
            button.textContent = originalText
            button.style.backgroundColor = "#333"
            this.reset()
          }, 3000)
        }, 2000)
      })
    })
  }
  
  // 음성 가이드 기능
  function initVoiceGuide() {
    const voiceText = document.querySelector('.voice-text');
    const audio = document.getElementById('voiceGuide');

    if (voiceText && audio) {
        voiceText.addEventListener('click', () => {
            // 이미 재생 중이면 중지
            if (!audio.paused) {
                audio.pause();
                audio.currentTime = 0;
                voiceText.classList.remove('playing');
                return;
            }
            
            // 재생
            audio.play().then(() => {
                voiceText.classList.add('playing');
            }).catch(error => {
                console.error('음성 재생 중 오류 발생:', error);
            });
        });

        // 재생이 끝나면 UI 초기화
        audio.addEventListener('ended', () => {
            voiceText.classList.remove('playing');
        });
    }
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
    initTabFunctionality()
    initDownloadButtons()
    initFormSubmission()
    initVoiceGuide()
  
    // 부드러운 스크롤
    document.documentElement.style.scrollBehavior = "smooth"
  })
  