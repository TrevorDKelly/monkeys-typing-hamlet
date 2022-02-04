import Monkey from "./modules/monkey.mjs";
import Templates from "./utils/templates.mjs";

const DB_URL = "http://localhost:3001";
const LEADERBOARD_REFRESH_TIME = 15000;

document.addEventListener("DOMContentLoaded", () => {
  initialPageLoad();
  setInterval(() => updateLeaderboard(), LEADERBOARD_REFRESH_TIME);
  const form = document.getElementById("picker");
  const dataList = document.getElementById("choice");

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    addMonkey(form.firstElementChild.value);
  });
});

function initialPageLoad() {
  getAllData()
    .then(monkeys => {
      const leaderboard = document.getElementById("leaderboard");
      const names = [];
      monkeys = monkeys.map(monkey => {
        names.push(monkey.name);
        return toTemplateFormat(monkey);
      });
      leaderboard.innerHTML = Templates.leaderboard({ monkeys });
      fillSelect(names);
    })
}

function fillSelect(names) {
  const dataList = document.getElementById("choice");
  names.forEach(name => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.innerHTML = name;
    dataList.appendChild(opt);
  });
}

function getAllData() {
  return fetch(DB_URL)
          .then(answer => answer.json());
}

function updateLeaderboard() {
  getAllData()
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
      best,
    },
  };
}

function addMonkey(name) {
  const monkeys = document.getElementById("monkeys");

  const node = document.createElement("div");
  const monkey = new Monkey(name, node);

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

