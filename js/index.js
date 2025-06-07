// 네비게이션 인터랙션
function initNavigationInteractions() {
    const triggers = document.querySelectorAll(".hover-trigger");
    triggers.forEach((trigger) => {
        trigger.addEventListener("mouseenter", () => {
            const row = trigger.closest(".row");
            row.style.flex = "2";
        });

        trigger.addEventListener("mouseleave", () => {
            const row = trigger.closest(".row");
            const index = [...row.parentNode.children].indexOf(row);
            row.style.flex = (index === 0 || index === 5) ? "0.5" : "1.5";
        });
    });
}

// 로딩 및 인트로 애니메이션
function initLoadingAndIntro() {
    const loader = document.getElementById("loader");
    const loaderText = document.getElementById("loaderText");
    const intro = document.getElementById("intro");
    const main = document.getElementById("main");
    const loaderPath = document.getElementById('loaderPath');
    const loaderCircle1 = document.getElementById('loaderCircle1');
    const loaderCircle2 = document.getElementById('loaderCircle2');
    const loaderFill1 = document.getElementById('loaderFill1');
    const loaderFill2 = document.getElementById('loaderFill2');
    const loaderFill3 = document.getElementById('loaderFill3');

    // Hide intro and main initially
    intro.style.display = "none";
    main.classList.add("nav-hidden");

    let percent = 0;
    const pathLength = loaderPath.getTotalLength();
    const circle1Length = loaderCircle1.getTotalLength();
    const circle2Length = loaderCircle2.getTotalLength();

    // Set initial stroke dash arrays and offsets
    loaderPath.style.strokeDasharray = pathLength;
    loaderPath.style.strokeDashoffset = pathLength;
    loaderCircle1.style.strokeDasharray = circle1Length;
    loaderCircle1.style.strokeDashoffset = circle1Length;
    loaderCircle2.style.strokeDasharray = circle2Length;
    loaderCircle2.style.strokeDashoffset = circle2Length;

    // Set initial fill opacities
    loaderFill1.style.opacity = 0;
    loaderFill2.style.opacity = 0;
    loaderFill3.style.opacity = 0;

    // Preload all images
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    const totalImages = images.length;

    function preloadImages() {
        return new Promise((resolve) => {
            if (totalImages === 0) {
                resolve();
                return;
            }

            images.forEach(img => {
                if (img.complete) {
                    loadedImages++;
                    if (loadedImages === totalImages) {
                        resolve();
                    }
                } else {
                    img.onload = () => {
                        loadedImages++;
                        if (loadedImages === totalImages) {
                            resolve();
                        }
                    };
                    img.onerror = () => {
                        loadedImages++;
                        if (loadedImages === totalImages) {
                            resolve();
                        }
                    };
                }
            });
        });
    }

    function animateLoader() {
        if (percent > 100) {
            loaderText.textContent = '100%';
            loaderPath.style.strokeDashoffset = 0;
            loaderCircle1.style.strokeDashoffset = 0;
            loaderCircle2.style.strokeDashoffset = 0;
            loaderFill1.style.opacity = 1;
            loaderFill2.style.opacity = 1;
            loaderFill3.style.opacity = 1;
            
            // 로딩이 완전히 끝난 후에 인트로 표시
            setTimeout(() => {
                loader.classList.add("hidden");
                intro.style.display = "flex";
                // 인트로가 표시된 후에 롤링 시작
                startRollingAnimation();
            }, 500);
            return;
        }

        loaderText.textContent = percent + '%';
        
        // Main path animation
        loaderPath.style.strokeDashoffset = pathLength * (1 - percent / 100);
        
        // Circle animations with different directions
        const circle1Percent = Math.max(0, (percent - 10) / 90 * 100);
        const circle2Percent = Math.max(0, (percent - 20) / 80 * 100);
        
        // First circle: clockwise (normal)
        loaderCircle1.style.strokeDashoffset = circle1Length * (1 - circle1Percent / 100);
        
        // Second circle: counter-clockwise (reversed)
        loaderCircle2.style.strokeDashoffset = -circle2Length * (1 - circle2Percent / 100);

        // Fill animations
        const opacity = (percent / 100).toFixed(2);
        loaderFill1.style.opacity = opacity;
        loaderFill2.style.opacity = opacity;
        loaderFill3.style.opacity = opacity;

        percent++;
        setTimeout(animateLoader, 15);
    }

    // 롤링 애니메이션 함수
    function startRollingAnimation() {
        const slotWords = ["URNEY", "YFUL", "B", "JOLLY", "UST", "VIAL", "B", "OA"];
        const rollingEl = document.getElementById("rollingText"); 

        // CSS 스타일 추가
        rollingEl.style.transition = "opacity 0.2s ease-in-out";
        rollingEl.style.opacity = "1";

        let i = 0;
        let repeat = 0;
        const maxRepeat = 14;

        const slotInterval = setInterval(() => {
            // 페이드 아웃
            rollingEl.style.opacity = "0";
            
            setTimeout(() => {
                rollingEl.textContent = slotWords[i];
                // 페이드 인
                rollingEl.style.opacity = "1";
                i = (i + 1) % slotWords.length;
                repeat++;

                if (repeat >= maxRepeat) {
                    clearInterval(slotInterval);
                    rollingEl.textContent = "IN";
                    // 마지막 IN에만 특별한 페이드인 효과 적용
                    rollingEl.style.transition = "opacity 0.2s ease-in-out, transform 0.2s ease-in-out";
                    rollingEl.style.transform = "scale(0.8)";
                    rollingEl.style.opacity = "0";
                    
                    // 약간의 지연 후 페이드인
                    setTimeout(() => {
                        rollingEl.style.opacity = "1";
                        rollingEl.style.transform = "scale(1)";
                    }, 100);
                }
            }, 30);
        }, 140);
    }

    // 로딩 애니메이션 시작
    animateLoader();

    // 인트로 등장
    intro.style.display = "flex";

    // scroll 등장 애니메이션
    const scrollContents = document.querySelectorAll('.scroll-hidden');
    const contentObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    entry.target.classList.add('visible');
                });
                contentObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.4,
        rootMargin: '0px 0px -5% 0px'
    });
    scrollContents.forEach(el => contentObserver.observe(el));

    // 6열 intro-cell이 화면에 등장할 때 이미지 순차 등장
    const introCell6 = document.querySelector('.col_height_6 .intro-cell');
    if (introCell6) {
        const imgs = introCell6.querySelectorAll('.feedback-card-img');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    imgs.forEach((img, i) => {
                        setTimeout(() => {
                            img.classList.add('visible');
                        }, 400 + i * 400);
                    });
                    observer.disconnect();
                }
            });
        }, { threshold: 0.05 });
        observer.observe(introCell6);
    }

    // 네비게이션 등장
    const lastRow = document.querySelector(".col_height_9");
    const navObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                main.classList.remove("nav-hidden");
                main.classList.add("nav-show");
                navObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: "0px 0px -50% 0px",
        threshold: 0.2
    });
    navObserver.observe(lastRow);
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 새로고침 시 항상 상단으로 이동
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // 각 기능 초기화
    initNavigationInteractions();
    initLoadingAndIntro();
});

// 디지털 메시지 컬러 스크롤 트리거
window.addEventListener('scroll', function() {
  const msg = document.querySelector('.digital-message');
  if (!msg) return;
  const rect = msg.getBoundingClientRect();
  const trigger = window.innerHeight * 0.5;
  if (rect.top < trigger) {
    msg.classList.add('active');
  } else {
    msg.classList.remove('active');
  }
}); 