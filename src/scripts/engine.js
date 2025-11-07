const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.getElementById("volumeSlider");
const toggleKeys = document.getElementById("toggleKeys");

let currentVolume = 0.5;
let mapedKeys = [];

const playTune = (key) => {
    let audio = new Audio(`./src/tunes/${key}.wav`);
    audio.volume = currentVolume;
    audio.play();

    const clickedKey = document.querySelector(`[data-key="${key}"]`);

    if(clickedKey) {
        clickedKey.classList.add("active");
    }
}

pianoKeys.forEach((key) => {
    key.addEventListener("mousedown", () => playTune(key.dataset.key));
    key.addEventListener("mouseup", () => key.classList.remove("active"));
    key.addEventListener("mouseleave", () => key.classList.remove("active"));
    mapedKeys.push(key.dataset.key);
});

document.addEventListener("keydown", (event) => {
    let keyPressed = event.key;

    if(event.repeat) return;

    if(mapedKeys.includes(keyPressed)) {
        playTune(keyPressed);
    }
});

document.addEventListener("keyup", (event) => {
    const clickedKey = document.querySelector(`[data-key="${event.key}"]`);

    if(clickedKey) {
        clickedKey.classList.remove("active");
    }
});

const handleVolume = (e) => {
    currentVolume = e.target.value;
}

const showOrHideKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

volumeSlider.addEventListener("input", handleVolume);

toggleKeys.addEventListener("click", showOrHideKeys);