// ================================
// 🔝 BACK TO TOP
// ================================

const backToTop =
    document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

    // ================================
// ⏰ LIVE FOOTER CLOCK
// ================================

function updateFooterClock() {

    const clock =
        document.getElementById("footerClock");

    if (!clock) return;

    const now = new Date();

    clock.textContent =
        now.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
}

updateFooterClock();

setInterval(updateFooterClock, 1000);

// ================================
// 📅 DYNAMIC COPYRIGHT YEAR
// ================================

const year = new Date().getFullYear();

document.getElementById("currentYear").textContent = year;