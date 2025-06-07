document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('fade-in');
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
});

function smoothNav(url) {
    document.body.classList.add('fade-out');
    setTimeout(() => { window.location.href = url; }, 500);
}