//------------------------------------------------------
// SOLDIER
//------------------------------------------------------
function Soldier (healthArg, strengthArg) {
  this.health = healthArg;
  this.strength = strengthArg;
  // this.attack =  function () {
  //   return this.strength;
  // }
}

Soldier.prototype.attack = function () {
  return this.strength;

};

Soldier.prototype.receiveDamage = function (damage) {
  this.health -= damage;
};


//------------------------------------------------------
// VIKING
//------------------------------------------------------
function Viking (nameArg, healthArg, strengthArg) {
  Soldier.call(this, healthArg, strengthArg);
  this.name = nameArg;
}

Viking.prototype = Object.create(Soldier.prototype);
Viking.prototype.constructor = Viking;

Viking.prototype.receiveDamage = function (damage) {
  this.health -= damage;

  if (this.health > 0) {
    return this.name + " has received " + damage + " points of damage";
  }
  else {
    return this.name + " has died in act of combat";
  }
};

Viking.prototype.battleCry = function () {
  return "Odin Owns You All!";
};


//------------------------------------------------------
// SAXON
//------------------------------------------------------
function Saxon (healthArg, strengthArg) {
  Soldier.call(this, healthArg, strengthArg);
}

Saxon.prototype = Object.create(Soldier.prototype);
Saxon.prototype.constructor = Saxon;

Saxon.prototype.receiveDamage = function (damage) {
  this.health -= damage;

  if (this.health > 0) {
    return "A Saxon has received " + damage + " points of damage";
  }
  else {
    return "A Saxon has died in combat";
  }
};


//------------------------------------------------------
// WAR
//------------------------------------------------------
function War () {
  this.vikingArmy = [];
  this.saxonArmy = [];
  // this.addViking = function (viking) {
  //   this.vikingArmy.push(viking);
  // };
}

War.prototype.addViking = function (viking) {
  this.vikingArmy.push(viking);
};

War.prototype.addSaxon = function (saxon) {
  this.saxonArmy.push(saxon);
};

War.prototype.saxonAttack = function () {
  var vikingIndex = Math.floor(Math.random() * this.vikingArmy.length);
  var saxonIndex = Math.floor(Math.random() * this.saxonArmy.length);
  var theViking = this.vikingArmy[vikingIndex];
  var theSaxon = this.saxonArmy[saxonIndex];

  var result = theViking.receiveDamage(theSaxon.attack());

  if (theViking.health <= 0) {
    this.vikingArmy.splice(vikingIndex, 1);
  }

  return result;
};

War.prototype.vikingAttack = function () {
  var vikingIndex = Math.floor(Math.random() * this.vikingArmy.length);
  var saxonIndex = Math.floor(Math.random() * this.saxonArmy.length);
  var theViking = this.vikingArmy[vikingIndex];
  var theSaxon = this.saxonArmy[saxonIndex];

  var result = theSaxon.receiveDamage(theViking.attack());

  if (theSaxon.health <= 0) {
    this.saxonArmy.splice(saxonIndex, 1);
  }

  return result;
};


War.prototype.showStatus = function () {
  if (this.saxonArmy.length === 0) {
    return 'Vikings have won the war of the century!';
  }
  else if (this.vikingArmy.length === 0) {
    return 'Saxons have fought for their lives and survive another day...';
  }
  else {
    return 'Vikings and Saxons are still in the thick of battle.';
  }

  var viking1 = new Viking("Burgrawl",99,149);
  var viking2 = new Viking("Smurgrawl",98,151);
  var viking3 = new Viking("Kurgrawl",97,152);
  var viking4 = new Viking("Turgrawl",96,153);
  var viking5 = new Viking("Lurgrawl",95,148);

  var saxon1 = new Saxon(74,101);
  var saxon2 = new Saxon(76,99);
  var saxon3 = new Saxon(73,98);
  var saxon4 = new Saxon(72,102);
  var saxon5 = new Saxon(71,97);



  var theWar = new War();

  theWar.addViking(viking1);
  theWar.addViking(viking2);
  theWar.addViking(viking3);
  theWar.addViking(viking4);
  theWar.addViking(viking5);

  theWar.addSaxon(saxon1);
  theWar.addSaxon(saxon2);
  theWar.addSaxon(saxon3);
  theWar.addSaxon(saxon4);
  theWar.addSaxon(saxon5);

  theWar.showStatus();
  console.log(theWar);

  function updateHnS(){
  $(".viking-box.1 p.health").html("HEALTH: " + viking1.health);
  $(".viking-box.2 p.health").html("HEALTH: " + viking2.health);
  $(".viking-box.3 p.health").html("HEALTH: " + viking3.health);
  $(".viking-box.4 p.health").html("HEALTH: " + viking4.health);
  $(".viking-box.5 p.health").html("HEALTH: " + viking5.health);
  $(".viking-box.1 p.strength").html("STRENGTH:" + viking1.strength);
  $(".viking-box.2 p.strength").html("STRENGTH:" + viking2.strength);
  $(".viking-box.3 p.strength").html("STRENGTH:" + viking3.strength);
  $(".viking-box.4 p.strength").html("STRENGTH:" + viking4.strength);
  $(".viking-box.5 p.strength").html("STRENGTH:" + viking5.strength);


  $(".saxon-box.1 p.health").html("HEALTH: " + saxon1.health);
  $(".saxon-box.2 p.health").html("HEALTH: " + saxon2.health);
  $(".saxon-box.3 p.health").html("HEALTH: " + saxon3.health);
  $(".saxon-box.4 p.health").html("HEALTH: " + saxon4.health);
  $(".saxon-box.5 p.health").html("HEALTH: " + saxon5.health);
  $(".saxon-box.1 p.strength").html("STRENGTH: " + saxon1.strength);
  $(".saxon-box.2 p.strength").html("STRENGTH: " + saxon2.strength);
  $(".saxon-box.3 p.strength").html("STRENGTH: " + saxon3.strength);
  $(".saxon-box.4 p.strength").html("STRENGTH: " + saxon4.strength);
  $(".saxon-box.5 p.strength").html("STRENGTH: " + saxon5.strength);
  };

    updateHnS();

  $("button.btn.btn-danger.viking-attack").on("click", function(){
    console.log("hellow")
    theWar.vikingAttack();
    updateHnS();

  })


  $("button.btn.btn-danger.saxon-attack").on("click", function(){
    console.log("hi")
    theWar.saxonAttack();
    updateHnS();
  })


};
