function setMainPaddingTop() {
    const mainNode = document.querySelector(".main"),
        headerNode = document.querySelector(".header");

    const getHeaderHeight = () => {
        return headerNode.clientHeight;
    }

    const setValueHeight = () => {
        mainNode.style.setProperty("--height-header", `${getHeaderHeight()}px`);
    }

    setValueHeight();

    window.addEventListener("resize", () => {
        setValueHeight();
    })
}

function styleScrollHeader() {
    const headerNode = document.querySelector(".header");
    let lastScroll = 0;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                headerNode.classList.add("is-scroll")
            } else {
                headerNode.classList.remove("is-scroll")
            }
        });
    });

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY || document.documentElement.scrollTop;
        if (scrollY > 100) {
            headerNode.classList.add("is-bg")
        } else {
            headerNode.classList.remove("is-bg");
            headerNode.classList.remove("is-scroll")
        }

        if (currentScroll > lastScroll) {
            headerNode.classList.add("is-scroll")
        } else if (currentScroll < lastScroll) {
            headerNode.classList.remove("is-scroll")
        }

        observer.observe(document.querySelector(".footer"));

        lastScroll = currentScroll <= 0 ? 0 : currentScroll; // для корректной работы на мобильных
    });
}

function maskInput() {
    const elementPhones = document.querySelectorAll('.phone-mask');

    if (elementPhones) {
        elementPhones.forEach(phoneInput => {
            const mask = IMask(phoneInput, {
                mask: '+{7} (000) 000-00-00'
            });
        })
    }
}

function changeUserStatus() {
    const buttons = document.querySelectorAll(".auth__btn"),
        parentButton = document.querySelector(".auth__buttons"),
        heros = document.querySelectorAll(".auth__info-hero"),
        btnRegister = document.querySelector(".form__register-link"),
        inputStatus = document.querySelector("#inputStatus");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("is-active"));
            const dataAttr = btn.getAttribute("data-btn");
            btn.classList.add("is-active");

            if (dataAttr === "gamer") {
                parentButton.style.setProperty("--left", "4px");
                if (btnRegister) btnRegister.classList.remove("is-active");
                if (inputStatus) inputStatus.value = "gamer";
                if (document.querySelector(".auth__form-title_change-title")) document.querySelector(".auth__form-title_change-title").innerHTML = document.querySelector(".auth__form-title_change-title").getAttribute("data-gamer")
            } else {
                parentButton.style.setProperty("--left", "calc(50% - 4px)");
                if (btnRegister) btnRegister.classList.add("is-active");
                if (inputStatus) inputStatus.value = "admin";
                if (document.querySelector(".auth__form-title_change-title")) document.querySelector(".auth__form-title_change-title").innerHTML = document.querySelector(".auth__form-title_change-title").getAttribute("data-admin")

            }

            heros.forEach(hero => {
                const dataHero = hero.getAttribute("data-hero");
                if (dataAttr == dataHero) {
                    hero.classList.add("is-active")
                } else {
                    hero.classList.remove("is-active");
                }
            })
        });
    })
}

function openMenuMobile() {
    const burgerNode = document.querySelector(".header__burger"),
        menuNode = document.querySelector(".header__nav"),
        closeNode = document.querySelector(".header__nav-close");

    burgerNode.addEventListener("click", () => {
        menuNode.classList.add("is-open");
    });
    closeNode.addEventListener("click", () => {
        menuNode.classList.remove("is-open");
    });
}
function createFrameAnimation({
    parentSelector,
    totalFrames,
    framePath,
    startDelay = 5000,
    repeatDelay = 12000,
    frameSpeed = 100,
    activeClass = "is-animate",
}) {
    const parent = document.querySelector(parentSelector);

    if (!parent) return;

    const imgNode = parent.querySelector("img");

    if (!imgNode) return;

    function playAnimation() {
        let frame = 1;

        parent.classList.add(activeClass);

        const animationInterval = setInterval(() => {
            imgNode.src = framePath(frame);

            frame++;

            if (frame > totalFrames) {
                clearInterval(animationInterval);
                parent.classList.remove(activeClass);
            }
        }, frameSpeed);
    }

    setTimeout(() => {
        playAnimation();
        setInterval(playAnimation, repeatDelay);
    }, startDelay);
}

function animateHeros() {
    createFrameAnimation({
        parentSelector: ".hero-person-one",
        totalFrames: 16,
        framePath: (frame) => `../image/anim_one/${frame}.png`,
    });
    createFrameAnimation({
        parentSelector: ".hero-person-two",
        totalFrames: 30,
        framePath: (frame) => `../image/anim_two/${frame}.png`,
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setMainPaddingTop();
    styleScrollHeader();
    maskInput();
    changeUserStatus();
    openMenuMobile();
    animateHeros();
});