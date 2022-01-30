import DOMKeyboard from "dom-keyboard";
import Templates from "../utils/templates.mjs";

function Monkey(name, id, node) {
  this.name = name;
  this.id = id;
  this.hamletIndex = 0;
  this.fullData = {
    presses: 0,
    correct: 0,
    best: 0,
  };
  this.sendData = {
    presses: 0,
    correct: 0,
    best: 0,
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
      this.fullData.correct += 1;
      this.sendData.correct += 1;
      this.hamletIndex += 1;
      if (!this.fullData.best || this.hamletIndex > this.fullData.best.length) {
        this.fullData.best = HAMLET.slice(0, this.hamletIndex);
        this.sendData.best = this.hamletIndex;
      }
    } else {
      this.hamletIndex = 0;
      this.output.innerHTML = "";
    }
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
    req.open("POST", `http://localhost:3001/${this.id}`);
    req.setRequestHeader("Content-Type", "application/json");

    const data = { ...this.sendData, id: this.id };

    req.send(JSON.stringify(data));
    this.sendData = {
      ...this.sendData,
      presses: 0,
      correct: 0,
    }
  }
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
  this.keyboard = new DOMKeyboard("100%", `${name}-keyboard`);

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
