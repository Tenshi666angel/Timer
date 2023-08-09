const display = document.querySelector(".display h1");
const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");

let interval = undefined;

function setBtnType(btn, type) {
    btn.className = type;
    btn.innerText = type;
}

const timer = {
    milis: 0,
    seconds: 0,
    minutes: 0,

    get time() {
        return `${this.minutes}:${this.seconds}:${this.milis}`;
    },

    clear() {
        this.milis = 0;
        this.minutes = 0;
        this.seconds = 0;
    },
}

function mainLoop() {

    timer.milis++;

    if (timer.milis === 100) {
        timer.seconds++;
        timer.milis = 0;
    }

    if (timer.seconds === 60) {
        timer.minutes++;
        timer.seconds = 0;
    }

    display.innerText = timer.time;
}

function startBtnHandler(e) {
    interval = setInterval(mainLoop, 10);
    setBtnType(startBtn, "pause");
    startBtn.removeEventListener("click", startBtnHandler);
    startBtn.addEventListener("click", pauseBtnHandler);
}

function pauseBtnHandler(e) {
    clearInterval(interval);
    setBtnType(startBtn, "continue");
    startBtn.removeEventListener("click", pauseBtnHandler);
    startBtn.addEventListener("click", startBtnHandler);
}

startBtn.addEventListener("click", startBtnHandler);

stopBtn.addEventListener("click", e => {
    startBtn.addEventListener("click", startBtnHandler);
    timer.clear();
    display.innerText = timer.time;
    setBtnType(startBtn, "start");
    clearInterval(interval);
});