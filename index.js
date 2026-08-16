// ==========================================
// SURYAWANSHI PORTAL - ADVANCED JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // VARIABLES
    // ==========================================

    const body = document.body;
    const navbar = document.querySelector(".navbar");
    const searchInput = document.querySelector(".search input");
    const cards = document.querySelectorAll(".card");


    // ==========================================
    // 1. LIVE DATE & TIME
    // ==========================================

    const clock = document.createElement("div");

    clock.id = "liveClock";

    if (navbar) {
        navbar.appendChild(clock);
    }

    function updateClock() {

        const now = new Date();

        const date = now.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

        const time = now.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });

        clock.innerHTML = `
            📅 ${date} 
            <span> | </span>
            🕐 ${time}
        `;
    }

    updateClock();

    setInterval(updateClock, 1000);


    // ==========================================
    // 2. DARK MODE
    // ==========================================

    const darkButton = document.createElement("button");

    darkButton.id = "darkModeBtn";

    darkButton.innerHTML = "🌙";

    body.appendChild(darkButton);


    // Check saved mode

    if (localStorage.getItem("theme") === "dark") {

        body.classList.add("dark-mode");

        darkButton.innerHTML = "☀️";
    }


    darkButton.addEventListener("click", () => {

        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {

            localStorage.setItem("theme", "dark");

            darkButton.innerHTML = "☀️";

            showToast("Dark Mode Enabled 🌙");

        } else {

            localStorage.setItem("theme", "light");

            darkButton.innerHTML = "🌙";

            showToast("Light Mode Enabled ☀️");
        }

    });


    // ==========================================
    // 3. WELCOME POPUP
    // ==========================================

    if (!localStorage.getItem("welcomeShown")) {

        setTimeout(() => {

            const popup = document.createElement("div");

            popup.id = "welcomeMessage";

            popup.innerHTML = `
                <div class="welcome-box">

                    <h2>👋 Welcome!</h2>

                    <h3>Suryawanshi Portal</h3>

                    <p>
                        Government Jobs • Scholarship •
                        Education • Career
                    </p>

                    <button id="closeWelcome">
                        Continue →
                    </button>

                </div>
            `;

            body.appendChild(popup);


            document
                .getElementById("closeWelcome")
                .addEventListener("click", () => {

                    popup.remove();

                    localStorage.setItem(
                        "welcomeShown",
                        "true"
                    );

                });

        }, 700);

    }


    // ==========================================
    // 4. ADVANCED SEARCH
    // ==========================================

    if (searchInput) {

        const resultCount = document.createElement("div");

        resultCount.id = "searchResult";

        searchInput.parentElement.appendChild(
            resultCount
        );


        searchInput.addEventListener("input", () => {

            const value =
                searchInput.value
                    .toLowerCase()
                    .trim();

            let found = 0;


            cards.forEach(card => {

                const text =
                    card.innerText.toLowerCase();

                if (text.includes(value)) {

                    card.style.display = "";

                    found++;

                } else {

                    card.style.display = "none";

                }

            });


            if (value === "") {

                resultCount.innerHTML = "";

            } else if (found === 0) {

                resultCount.innerHTML =
                    "❌ No result found";

            } else {

                resultCount.innerHTML =
                    `✅ ${found} result(s) found`;

            }

        });

    }


    // ==========================================
    // 5. CTRL + K SEARCH
    // ==========================================

    document.addEventListener("keydown", event => {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            if (searchInput) {

                searchInput.focus();

                searchInput.select();

            }

        }

    });


    // ==========================================
    // 6. SEARCH ENTER KEY
    // ==========================================

    if (searchInput) {

        searchInput.addEventListener("keydown", event => {

            if (event.key === "Enter") {

                const firstVisible =
                    [...cards].find(
                        card =>
                            card.style.display !== "none"
                    );

                if (firstVisible) {

                    firstVisible.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                    firstVisible.style.transform =
                        "scale(1.05)";

                    setTimeout(() => {

                        firstVisible.style.transform =
                            "";

                    }, 700);

                }

            }

        });

    }


    // ==========================================
    // 7. SCROLL PROGRESS BAR
    // ==========================================

    const progress = document.createElement("div");

    progress.id = "scrollProgress";

    body.appendChild(progress);


    window.addEventListener("scroll", () => {

        const scrollTop =
            window.scrollY;

        const pageHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            (scrollTop / pageHeight) * 100;

        progress.style.width =
            percentage + "%";

    });


    // ==========================================
    // 8. BACK TO TOP
    // ==========================================

    const topButton = document.createElement("button");

    topButton.id = "backToTop";

    topButton.innerHTML = "↑";

    body.appendChild(topButton);


    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            topButton.style.display = "block";

        } else {

            topButton.style.display = "none";

        }

    });


    topButton.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });


    // ==========================================
    // 9. NAVBAR SCROLL EFFECT
    // ==========================================

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar?.classList.add(
                "navbar-scrolled"
            );

        } else {

            navbar?.classList.remove(
                "navbar-scrolled"
            );

        }

    });


    // ==========================================
    // 10. SCROLL REVEAL
    // ==========================================

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "show-card"
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    cards.forEach(card => {

        observer.observe(card);

    });


    // ==========================================
    // 11. FAVORITE SYSTEM ❤️
    // ==========================================

    cards.forEach((card, index) => {

        const favorite =
            document.createElement("button");

        favorite.className =
            "favorite-btn";

        favorite.innerHTML = "♡";

        card.appendChild(favorite);


        const saved =
            JSON.parse(
                localStorage.getItem("favorites") || "[]"
            );


        if (saved.includes(index)) {

            favorite.innerHTML = "❤️";

        }


        favorite.addEventListener("click", event => {

            event.preventDefault();

            let favorites =
                JSON.parse(
                    localStorage.getItem("favorites") ||
                    "[]"
                );


            if (favorites.includes(index)) {

                favorites =
                    favorites.filter(
                        id => id !== index
                    );

                favorite.innerHTML = "♡";

                showToast("Removed from Favorites");

            } else {

                favorites.push(index);

                favorite.innerHTML = "❤️";

                showToast("Added to Favorites ❤️");

            }


            localStorage.setItem(
                "favorites",
                JSON.stringify(favorites)
            );

        });

    });


    // ==========================================
    // 12. RECRUITMENT NOTIFICATION
    // ==========================================

    setTimeout(() => {

        showToast(
            "📢 Check the Career section for latest updates!"
        );

    }, 3000);


    // ==========================================
    // 13. CAREER BUTTON LOADING
    // ==========================================

    const careerButton =
        document.querySelector(
            ".hero-btns .btn"
        );


    if (careerButton) {

        careerButton.addEventListener(
            "click",
            () => {

                careerButton.innerHTML =
                    "Opening Career... ⏳";

            }
        );

    }


    // ==========================================
    // 14. SOCIAL ICON EFFECT
    // ==========================================

    const socialIcons =
        document.querySelectorAll(
            ".social-icon"
        );


    socialIcons.forEach(icon => {

        icon.addEventListener(
            "mouseenter",
            () => {

                icon.style.transform =
                    "translateY(-8px) scale(1.08)";

            }
        );


        icon.addEventListener(
            "mouseleave",
            () => {

                icon.style.transform =
                    "translateY(0) scale(1)";

            }
        );

    });


    // ==========================================
    // 15. TOAST NOTIFICATION FUNCTION
    // ==========================================

    function showToast(message) {

        const toast =
            document.createElement("div");

        toast.className = "toast";

        toast.innerHTML = message;

        body.appendChild(toast);


        setTimeout(() => {

            toast.classList.add("toast-show");

        }, 50);


        setTimeout(() => {

            toast.classList.remove(
                "toast-show"
            );


            setTimeout(() => {

                toast.remove();

            }, 400);

        }, 2500);

    }


    // ==========================================
    // 16. PAGE LOADED MESSAGE
    // ==========================================

    window.addEventListener(
        "load",
        () => {

            console.log(
                "🚀 Suryawanshi Portal Loaded Successfully!"
            );

            console.log(
                "JavaScript Version: Advanced"
            );

        }
    );

});