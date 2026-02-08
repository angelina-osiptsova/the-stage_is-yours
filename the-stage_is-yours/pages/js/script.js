document.addEventListener("DOMContentLoaded", () => {
  const cardsPool = [
    "assets/cards/plus1/1.png",
    "assets/cards/plus1/2.png",
    "assets/cards/plus1/3.png",
    "assets/cards/plus1/4.png",
    "assets/cards/plus1/5.png",
    "assets/cards/plus1/6.png",
    "assets/cards/plus1/7.png",
    "assets/cards/plus1/8.png",
    "assets/cards/plus1/9.png",
    "assets/cards/plus1/10.png",
    "assets/cards/plus1/11.png",
    "assets/cards/plus1/12.png",
    "assets/cards/plus2/1.png",
    "assets/cards/plus2/2.png",
    "assets/cards/plus2/3.png",
    "assets/cards/plus2/4.png",
    "assets/cards/plus2/5.png",
    "assets/cards/plus2/6.png",
    "assets/cards/plus2/7.png",
    "assets/cards/plus2/8.png",
    "assets/cards/plus2/9.png",
    "assets/cards/plus2/10.png",
    "assets/cards/plus2/11.png",
    "assets/cards/plus2/12.png",
    "assets/cards/plus3/1.png",
    "assets/cards/plus3/2.png",
    "assets/cards/plus3/3.png",
    "assets/cards/plus3/4.png",
    "assets/cards/plus3/5.png",
    "assets/cards/plus3/6.png",
    "assets/cards/plus3/7.png",
    "assets/cards/plus3/8.png",
    "assets/cards/plus3/9.png",
    "assets/cards/plus3/10.png",
    "assets/cards/plus3/11.png",
    "assets/cards/plus3/12.png",
    "assets/cards/spec/1.png",
    "assets/cards/spec/2.png",
    "assets/cards/spec/3.png",
    "assets/cards/spec/4.png",
    "assets/cards/spec/5.png",
    "assets/cards/spec/6.png",
  ];
  const specScores = [-3, 3, 2, 1, -1, -2];

  const playBtn = document.getElementById("playBtn");
  const section = document.getElementById("gameSection");
  const intro = document.getElementById("intro");
  const gameContent = document.getElementById("gameContent");
  const pickCard = document.getElementById("pick-card");
  const task = document.getElementById("task");
  const card = document.getElementById("card");
  const cardBackWrapper = document.querySelector(".cards");
  const cur = document.getElementsByClassName("curtains")[0];
  const counterSpan = document.querySelector(".counter");
  const token = document.getElementById("token-count");

  let round = 0;
  const maxRounds = 42;
  let score = 0;
  let isGameOver = false;
  let lastWasSpec = false;
  const pickCardFunction = () => {
    if (cardsPool.length === 0) {
      task.classList.remove("show");
      cardBackWrapper.style.bottom = "-50px";
      const endScreen = document.getElementById("endScreen");
      const goodEnd = document.getElementById("goodEnd");
      const badEnd = document.getElementById("badEnd");
      if (isGameOver == false) {
        goodEnd.style.display = "block";
        badEnd.style.display = "none";
      } else {
        goodEnd.style.display = "none";
        badEnd.style.display = "block";
      }
      endScreen.classList.remove("hidden");
      task.classList.add("hidden");
      pickCard.style.display = "none";
      card.style.display = "none";

      return;
    }
    let availableCards = cardsPool;
    if (round < 3) {
      availableCards = availableCards.filter(
        (card) => !card.includes("/spec/"),
      );
    }
    if (lastWasSpec) {
      availableCards = availableCards.filter(
        (card) => !card.includes("/spec/"),
      );
    }
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const selectedCard = availableCards[randomIndex];
    const originalIndex = cardsPool.indexOf(selectedCard);
    card.src = selectedCard;
    cardsPool.splice(originalIndex, 1);

    const doneSpan = document.querySelector(".done");
    const failSpan = document.querySelector(".fail");
    if (selectedCard.includes("/spec/")) {
      doneSpan.textContent = "Далі";
      failSpan.style.display = "none";
      lastWasSpec = true;
    } else {
      doneSpan.textContent = "Виконано";
      failSpan.style.display = "inline";
      lastWasSpec = false;
    }

    card.classList.add("show");
    pickCard.style.display = "none";
    task.classList.remove("hidden");
    task.classList.add("show");
    cardBackWrapper.classList.add("lowered");
    counterSpan.textContent = `${round} / ${maxRounds}`;
    token.textContent = score;
  };

  playBtn.onclick = () => {
    intro.style.opacity = 0;
    intro.style.transform = "scale(.9)";

    setTimeout(() => {
      section.classList.add("open");
    }, 300);

    setTimeout(() => {
      gameContent.classList.remove("hidden");
      gameContent.classList.add("show");
    }, 1300);

    setTimeout(() => {
      cur.remove();
      intro.remove();
    }, 500);
  };

  pickCard.onclick = pickCardFunction;
  const doneBtn = document.querySelector(".done");
  const failBtn = document.querySelector(".fail");

  doneBtn.addEventListener("click", () => {
    const cardSrc = card.src;
    if (cardSrc.includes("/plus1/")) score += 1;
    else if (cardSrc.includes("/plus2/")) score += 2;
    else if (cardSrc.includes("/plus3/")) score += 3;
    else if (cardSrc.includes("/spec/")) {
      const specNum = parseInt(cardSrc.split("/").pop().split(".")[0]) - 1;
      score += specScores[specNum];
    }
    token.textContent = score;
    card.src = "";
    card.classList.remove("show");
    setTimeout(() => {
      pickCardFunction();
    }, 300);
    console.log(score);
    round++;
  });

  failBtn.addEventListener("click", () => {
    token.textContent = score;
    card.src = "";
    card.classList.remove("show");
    setTimeout(() => {
      pickCardFunction();
    }, 300);
    console.log(score);
    round++;
    isGameOver = true;
  });
  const feedbackForm = document.getElementById("feedbackForm");

  if (feedbackForm) {
    feedbackForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        name: feedbackForm.name.value,
        message: feedbackForm.message.value,
      };

      try {
        const res = await fetch(
          "https://the-stage-is-yours.onrender.com/send-test-mail",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              subject: "Feedback з сайту",
              text: `Ім'я: ${feedbackForm.name.value}\n\nПовідомлення:\n${feedbackForm.message.value}`,
            }),
          },
        );

        if (res.ok) {
          alert("Дякуємо за фідбек 💛");
          feedbackForm.reset();
        } else {
          alert("Помилка при надсиланні");
        }
      } catch (err) {
        console.error(err);
        alert("Сервер недоступний");
      }
    });
  }

  const interviewForm = document.getElementById("interviewForm");

  if (interviewForm) {
    interviewForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        name: interviewForm.name.value,
        phone: interviewForm.phone.value,
        email: interviewForm.email.value,
        telegram: interviewForm.telegram.value,
      };

      try {
        const res = await fetch(
          "https://the-stage-is-yours.onrender.com/send-test-mail",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              subject: "Заявка на участь у шоу",
              text:
                `Ім'я: ${interviewForm.name.value}\n` +
                `Телефон: ${interviewForm.phone.value}\n` +
                `Email: ${interviewForm.email.value}\n` +
                `Telegram: ${interviewForm.telegram.value}`,
            }),
          },
        );

        if (res.ok) {
          alert("Заявка надіслана");
          interviewForm.reset();
        } else {
          alert("Не вдалося надіслати");
        }
      } catch (err) {
        console.error(err);
        alert("Помилка з'єднання");
      }
    });
  }
});

function toggleSection(id) {
  document.querySelectorAll(".accordion-item").forEach((item) => {
    item.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

function closeSection(id) {
  document.getElementById(id).classList.remove("active");
}

function openSection(element) {
  if (element.textContent === "Про проєкт") {
    document.querySelector(".section2").scrollIntoView({ behavior: "smooth" });
  } else if (
    element.textContent === "Грати" ||
    element.textContent === "Зануритися у гру"
  ) {
    document
      .querySelector("#gameSection")
      .scrollIntoView({ behavior: "smooth" });
  } else if (element.textContent === "Розвиток") {
    document.querySelector(".section4").scrollIntoView({ behavior: "smooth" });
  } else if (
    element.textContent === "Підтримка" ||
    element.textContent === "Підтримати проект"
  ) {
    document
      .querySelector(".support-section")
      .scrollIntoView({ behavior: "smooth" });
  }
  return false;
}
