import DOMKeyboard from "dom-keyboard";
import Templates from "../utils/templates.mjs";

const DB_LOCATION = "http://localhost:3001/"

function Monkey(name, node) {
  this.name = name;
  this.hamletIndex = 0;
  this.fullData = {
    presses: 0,
    correct: 0,
    best: "",
    hits: {},
  };
  this.sendData = {
    presses: 0,
    correct: 0,
    best: "",
    hits: {},
  };
  buildMonkeyNode.call(this, node, name);
}

Monkey.prototype = {
  constructor: Monkey,

  hitKey() {
    const letter = randomLetter();
    this.keyboard.press(letter);
    this.output.innerHTML += letter;
    this.fullData.presses += 1;
    this.sendData.presses += 1;
    return letter;
  },

  checkHamlet(letter) {
    if (isHamlet.call(this, letter)) {
      this.hamletIndex += 1;
      const hamletSlice = HAMLET.slice(0, this.hamletIndex);
      this.updateCorrect(hamletSlice);
      if (this.hamletIndex > this.fullData.best.length) {
        this.fullData.best = hamletSlice
        this.sendData.best = hamletSlice;
      }
    } else {
      this.hamletIndex = 0;
      this.output.innerHTML = "";
    }
  },

  updateCorrect(hamletSlice) {
    this.fullData.correct += 1;
    this.sendData.correct += 1;

    this.fullData.hits[hamletSlice] ||= 0;
    this.fullData.hits[hamletSlice] += 1;

    this.sendData.hits[hamletSlice] ||= 0;
    this.sendData.hits[hamletSlice] += 1;
  },

  run() {
    let letter = this.hitKey();
    this.statCheck = setInterval(async () => {
      this.checkHamlet(letter);
      letter = this.hitKey();
      this.stats.innerHTML = Templates.stats(this);
      if (this.sendData.presses > 100) this.send();
    }, 1000);
  },

  stop() {
    clearInterval(this.statCheck);
  },

  send() {
    const req = new XMLHttpRequest();
    req.open("POST", DB_LOCATION + `update/${this.name}`);
    req.setRequestHeader("Content-Type", "application/json");

    const data = { ...this.sendData, name: this.name };
    this.sendData = {
      ...this.sendData,
      presses: 0,
      correct: 0,
      hits: {},
    }

    req.send(JSON.stringify(data));
  },
}

function isHamlet(letter) {
  let correct = HAMLET[this.hamletIndex];
  while (/[^a-z]/i.test(correct)) {
    this.hamletIndex += 1;
    correct = HAMLET[this.hamletIndex];
  }
  return correct.toLowerCase() === letter;
}

function buildMonkeyNode(node, name) {
  this.node = node;
  this.keyboard = new DOMKeyboard("95%", `${name}-keyboard`);

  this.node.innerHTML = Templates.monkey(this);
  this.output = this.node.getElementsByClassName("output")[0];
  this.stats = this.node.getElementsByClassName("stats")[0];

  this.node.appendChild(this.keyboard.node);
  this.node.classList.add("monkey");
}

const HAMLET = "FRANCISCO at his post. Enter to him BERNARDO";
const LETTERS = "qwertyuiopasdfghjklzxcvbnm".split("");

function randomLetter() {
  const i = Math.floor(Math.random() * LETTERS.length);
  return LETTERS[i];
}

export default Monkey;
