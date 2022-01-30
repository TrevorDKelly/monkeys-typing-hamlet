import Monkey from "./modules/monkey.mjs";
import Templates from "./utils/templates.mjs";

document.addEventListener("DOMContentLoaded", () => {
  updateLeaderboard();
  setInterval(() => updateLeaderboard(), 30000);
  const form = document.getElementById("picker");
  const select = document.getElementById("choice");

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    addMonkey(select.value);
  });
});

function updateLeaderboard() {
  fetch("http://localhost:3001")
    .then(res => res.json())
    .then(monkeys => {
      const leaderboard = document.getElementById("leaderboard");

      monkeys = monkeys.map(toTemplateFormat);
      leaderboard.innerHTML = Templates.leaderboard({ monkeys });
    })
    .catch(e => console.log(e));
}

function toTemplateFormat({ name, presses, correct, best })  {
  return {
    name,
    fullData: {
      presses,
      correct,
      best: HAMLET.slice(0, best),
    },
  };
}

function addMonkey(name) {
  const monkeys = document.getElementById("monkeys");

  const node = document.createElement("div");
  const monkey = new Monkey(name, IDs[name], node);

  monkeys.appendChild(monkey.node);
  monkey.run();
}

const IDs = {
  "Trevor": 1,
  "Josh": 2,
  "Wes": 3,
  "Will": 4,
};
const HAMLET = "FRANCISCO at his post. Enter to him BERNARDO";

