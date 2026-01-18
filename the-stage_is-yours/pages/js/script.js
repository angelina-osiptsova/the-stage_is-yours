const playBtn = document.getElementById("playBtn");
const section = document.getElementById("gameSection");
const intro = document.getElementById("intro");
const gameContent = document.getElementById("gameContent");
const pickCard = document.getElementById("pickCard");
const task = document.getElementById("task");

playBtn.onclick = () => {
    intro.style.opacity = 0;
    intro.style.transform = "scale(.9)";

    setTimeout(() => {
        section.classList.add("open");
    }, 300);

    setTimeout(() => {
        gameContent.classList.remove("hidden");
    }, 1200);
};

pickCard.onclick = () => {
    gameContent.classList.add("hidden");

    setTimeout(() => {
        task.classList.remove("hidden");
    }, 400);
};