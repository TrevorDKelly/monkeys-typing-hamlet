import DOMKeyboard from "dom-keyboard";
import Templates from "../utils/templates.mjs";

const DB_LOCATION = "http://localhost:3001/";
const LEFT_PAW = "../../images/monkey_hand_left.png";
const RIGHT_PAW = "../../images/monkey_hand_right.png";

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

  async hitKey() {
    const letter = randomLetter();
    const key = this.keyboard.getKey(letter);
    await pawPressLetter.call(this, key);
    key.press();
    this.output.innerHTML += letter;
    await pawReset.call(this);
    this.fullData.presses += 1;
    this.sendData.presses += 1;
    this.checkHamlet(letter);
    this.stats.innerHTML = Templates.stats(this);
    if (this.sendData.presses > 100) this.send();
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

  async run() {
    await this.hitKey();
    this.run();
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
  this.keyboard = new DOMKeyboard("100%", `${name}-keyboard`);

  this.node.innerHTML = Templates.monkey(this);
  this.output = this.node.getElementsByClassName("output")[0];
  this.stats = this.node.getElementsByClassName("stats")[0];

  this.paws = buildPaws.call(this);

  this.node.appendChild(this.keyboard.node);
  this.node.classList.add("monkey");
}

function buildPaws() {
  const left = document.createElement("img");
  const right = document.createElement("img");

  left.src = LEFT_PAW;
  left.alt = "Left Paw";
  right.src = RIGHT_PAW;
  right.alt = "Right Paw";

  left.classList.add("paw", "left-paw");
  right.classList.add("paw", "right-paw");

  this.node.appendChild(left)
  this.node.appendChild(right)

  return { left, right }
}

function pawPressLetter(key) {
  const promise = new Promise((resolve, reject) => {
    if (key.side === "Left") {
      const paw = this.paws.left;
      paw.style.top = `${key.node.offsetTop + (parseInt(paw.height) / 2) + key.node.offsetHeight}px`;
      paw.style.left = `${key.node.offsetLeft - (parseInt(paw.width) / 2) - key.node.offsetWidth}px`
    } else {
      const paw = this.paws.right;
      paw.style.top = `${key.node.offsetTop + (parseInt(paw.height) / 2) + key.node.offsetHeight}px`;
      paw.style.left = `${key.node.offsetLeft}px`
    }
    setTimeout( () => resolve(), 500);
  });
  return promise;
}

function pawReset() {
  const promise = new Promise((resolve, reject) => {
    this.paws.left.style.left = null;
    this.paws.left.style.top = null;
    this.paws.right.style.left = null;
    this.paws.right.style.top = null;
    setTimeout( () => resolve(), 500);
  });
  return promise;
}

const HAMLET = "FRANCISCO at his post. Enter to him BERNARDO";
const LETTERS = "qwertyuiopasdfghjklzxcvbnm".split("");

function randomLetter() {
  const i = Math.floor(Math.random() * LETTERS.length);
  return LETTERS[i];
}

export default Monkey;
