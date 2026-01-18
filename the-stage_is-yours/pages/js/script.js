const playBtn = document.getElementById("playBtn");
const section = document.getElementById("gameSection");
const intro = document.getElementById("intro");
const gameContent = document.getElementById("gameContent");
const pickCard = document.getElementById("pickCard");
const task = document.getElementById("task");
const cur = document.getElementsByClassName("curtains")[0];


playBtn.onclick = () => {
    intro.style.opacity = 0;
    intro.style.transform = "scale(.9)";

    setTimeout(() => {
        section.classList.add("open");
    }, 300);

    setTimeout(() => {
        gameContent.classList.add('show');
    }, 1300);
    setTimeout(() => {
        cur.remove();
    }, 500);
    intro.remove();
};

pickCard.onclick = () => {
    gameContent.classList.add("hidden");

    setTimeout(() => {
        task.classList.remove("hidden");
    }, 400);
};