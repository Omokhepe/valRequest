const countdownEl = document.getElementById("countNumber");
const countdownScreen = document.getElementById("countdownScreen");
const mainContent = document.getElementById("main");

let count = 3;

mainContent.style.display = "none";

const countdownInterval = setInterval(() => {
    count--;
    countdownEl.innerText = count;

    if (count === 0) {
        clearInterval(countdownInterval);

        countdownScreen.style.opacity = "0";
        countdownScreen.style.transition = "opacity 0.8s ease";

        setTimeout(() => {
            countdownScreen.style.display = "none";
            mainContent.style.display = "block";
        }, 800);
    }
}, 1000);


const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

const teasingTexts = [
    "Are you sure? 😏",
    "Think again 😌",
    "You don't mean that 😝",
    "Try pressing Yes instead 😍",
    "I won't give up that easy 😆",
    "Come on… you know you want to 😎"
];

let teaseIndex = 0;

function moveNoButton() {

    const x = Math.random() * 80;
    const y = Math.random() * 80;

    noBtn.style.left = x + "%";
    noBtn.style.top = y + "%";

    noBtn.innerText = teasingTexts[teaseIndex % teasingTexts.length];
    teaseIndex++;
}

// Desktop hover
noBtn.addEventListener("mouseover", moveNoButton);

// Mobile touch
noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveNoButton();
});

yesBtn.addEventListener("click", () => {
    launchConfetti()
    document.getElementById("main").style.display = "none";
    document.getElementById("finalMessage").style.display = "block";

    // change background to glowing love gradient
    document.body.style.background = "linear-gradient(135deg, #ff4d6d, #ff8fab, #ffc2e2)";
    document.body.style.transition = "background 1s ease";

    // burst of hearts when yes is clicked
    for (let i = 0; i < 40; i++) {
        setTimeout(createHeart, i * 50);
    }

    setTimeout(() => {
        // typeYesMessage("You said YES!!! 💕");
        document.getElementById("yesText").classList.add("yes-animate");
    }, 200);

    // reveal sweet affirmations
    setTimeout(() => {
        document.getElementById("affirmations").style.display = "block";
    }, 1800);
});

const music = document.getElementById("bgMusic");

// try autoplay immediately (desktop browsers)
window.addEventListener("load", () => {
    music.muted = false;
    music.play().catch(() => {});
});

// ensure play on first user interaction (mobile safety)
function enableSound() {
    music.muted = false;
    music.play().catch(() => {});
    document.removeEventListener("touchstart", enableSound);
    document.removeEventListener("click", enableSound);
}

document.addEventListener("touchstart", enableSound, { once: true });
document.addEventListener("click", enableSound, { once: true });


function launchConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ff85a2', '#ffb3c1', '#ff0000', '#ff6347', '#fff', '#ffdf00']
    const duration = 6000
    const end = Date.now() + duration

    // Initial big burst
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.5, y: 0.3 },
        colors
    })

    // Continuous side cannons
    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval)
            return
        }

        confetti({
            particleCount: 40,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors
        })

        confetti({
            particleCount: 40,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors
        })
    }, 300)
}

function toggleMusic() {
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.muted = false
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}

function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart-float";
    heart.innerText = "❤";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (14 + Math.random() * 20) + "px";
    heart.style.animationDuration = (4 + Math.random() * 4) + "s";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 8000);
}

// spawn hearts continuously
setInterval(createHeart, 400);

document.addEventListener("click", (e) => {
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement("div");
        sparkle.className = "sparkle";

        sparkle.style.left = e.clientX + (Math.random() * 20 - 10) + "px";
        sparkle.style.top = e.clientY + (Math.random() * 20 - 10) + "px";

        document.body.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 700);
    }
});

const listItems = document.querySelectorAll("#affirmations li");
listItems.forEach((li, i) => {
    li.style.opacity = 0;
    setTimeout(() => {
        li.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        li.style.opacity = 1;
        li.style.transform = "translateY(0)";
    }, i * 300);
});



