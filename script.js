let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
  {
    name: "stick",
    power: 5
  },
  {
    name: "dagger",
    power: "30"
  },
  {
    name: "claw hammer",
    power: 50
  },
  {
    name: "sword",
    power: "100"
  }
];
const monsters = [
  {
    name: "Slime",
    level: 2,
    health: 15
  },
  {
    name: "Fanged Beast",
    level: 8,
    health: 300

  },
  {
    name: "Dragon",
    level: 20,
    health: 500
  }

];


const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name: "Store",
    "button text": ["Return to town square", "Buy 10 health (10 gold)", "Buy weapon (30 gold)"],
    "button functions": [goTown, buyHealth, buyWeapon],
    text: "You enter the store."
  },
  {
    name: "Cave",
    "button text": ["Fight Slime", "Fight Fanged Beast", "Return to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see monsters!!!"
  },
  {
    name: "Fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  {
    name: "Kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: "The monster screams \"Aaaaargh\" as it dies. You now have more experience and more gold $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"
  },
  {
    name: "You Lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    "text": "You died. :("
  }, {
    name: "You Win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    "text": "You defeated the dragon. You win the game!!! :)"
  },
  {
    name: "Easter egg",
    "button text": ["2", "8", "Go to town square"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You found an easter egg. Pick a number above. If the number you choose matches a random number generated between 0 and 10, you win! Otherwise, you lose."
  }
]
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}
function goCave() {
  update(locations[2]);
  //console.log("Going to cave");
}

function buyHealth() {
  if (health == 100) {
    text.innerText = "You already have max health!";
  }
  else if (health < 90 && gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    text.innerText = "Health bought! \"Good Job\"";
  }
  else if (health >= 90 && health<100) {
    health = 100;
    text.innerText = "You are now at Max health";
    gold -= 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  }

  else {
    text.innerText = "You don't have enough gold to buy health.";
  }
  // console.log("Health bought!");
}
function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Weapon bought! Your new weapon is a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    }
    else {
      text.innerText = "You don't have enough gold to buy a weapon.";
    }
  }
  else {
    text.innerText = "You already have the best weapon.";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;

  }
  //console.log("Weapon bought!");
}
function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  }
  else {
    text.innerText = "Don't sell your only weapon!!!"
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}
function fightBeast() {
  fighting = 1;
  goFight();
}
function fightDragon() {
  fighting = 2;
  goFight();
}
function goFight() {
  update(locations[3]);
  monsterStats.style.display = "block";
  monsterHealth = monsters[fighting].health;
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;

}
function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks! ";
  text.innerText += "You attack it with your " + weapons[currentWeapon].name + ".";
  if (attackHit()) {
    health -= getMonsterAttackValue(monsters[fighting].level);
  }
  else {
    text.innerText += "You miss!"
  }
  monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  }
  else if (monsterHealth <= 0) {
    if (fighting == 2) {
      winGame();
    } else
      defeatMonster();
    fighting == 2 ? winGame() : defeatMonster();
  }
  if (Math.random() <= .1 && inventory.length != 1) {
    text.innerText += "/nYour " + inventory.pop() + " broke!";
    currentWeapon--;
  }
}
function getMonsterAttackValue(level) {
  let hit = level * 5 - Math.floor(Math.random() * xp);
  console.log(hit);
  return hit;
}
function attackHit() {
  return Math.random() > .2 || health < 20;
}
function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}
function lose() {
  update(locations[5]);
  text.innerText = locations[5].text;
}
function winGame() {
  update(locations[6]);
  text.innerText = locations[6].text;
}
function defeatMonster() {

  gold += monsters[fighting].level * 5;
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}
function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}
function easterEgg() {
  update(locations[7]);
}
function pickTwo() {
  pick(2);
}
function pickEight() {
  pick(8);
}
function pick(guess) {
  let numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";

  }
  if (numbers.indexOf(guess) !== -1) {
    text.innerText += "Right! You win 10 gold!";
    gold += 10;
    goldText.innerText = gold;
  }
  else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}