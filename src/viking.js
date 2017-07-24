$(document).ready(function() {
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
    $(".result").text(this.name + " has received " + damage + " points of damage");
    return this.name + " has received " + damage + " points of damage";
  }
  else {
    $(".result").text(this.name + " has died in act of combat");
    console.log(this.name+" died");
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
    $(".result").text("A Saxon has received " + damage + " points of damage");
    return "A Saxon has received " + damage + " points of damage";
  }
  else {
    $(".result").text("A Saxon has died in combat");
    console.log(this.name+" died");
    return "A Saxon has died in combat";
  }
};


//------------------------------------------------------
// WAR
//------------------------------------------------------
function War () {
  this.vikingArmy = [];
  this.saxonArmy = [];
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
  vikingHealth();
  if (theViking.health <= 0) {
    var boxnum = vikingIndex + 1;
    if ($(".s"+boxnum).hasClass("dead-soldier")) {
      boxnum = boxnum + 1;
      $("div.viking-box."+boxnum).addClass("dead-soldier");
      $("div.viking-box."+boxnum).removeClass("viking-box"+" "+boxnum);
      $("div.dead-soldier > .viking-pic").attr("src", "images/tombstone.jpg");
      this.vikingArmy.splice(vikingIndex, 1);
    }
    else {
      $("div.viking-box."+boxnum).addClass("dead-soldier");
      $("div.viking-box."+boxnum).removeClass("viking-box"+" "+boxnum);
      $("div.dead-soldier > .viking-pic").attr("src", "images/tombstone.jpg");
      this.vikingArmy.splice(vikingIndex, 1);
    }
  }
  $(".saxon-attack").prop("disabled",true);
  $(".viking-attack").prop("disabled",false);
  ironHackWar.showStatus();
  return result;
};

War.prototype.vikingAttack = function () {
  var vikingIndex = Math.floor(Math.random() * this.vikingArmy.length);
  var saxonIndex = Math.floor(Math.random() * this.saxonArmy.length);
  var theViking = this.vikingArmy[vikingIndex];
  var theSaxon = this.saxonArmy[saxonIndex];
  var result = theSaxon.receiveDamage(theViking.attack());
  saxonHealth();
  if (theSaxon.health <= 0) {
    var boxnum = saxonIndex + 1;
    if ($(".s"+boxnum).hasClass("dead-soldier")) {
      boxnum = boxnum + 1;
      $("div.saxon-box."+boxnum).addClass("dead-soldier");
      $("div.saxon-box."+boxnum).removeClass("saxon-box"+" "+boxnum);
      $("div.dead-soldier > .saxon-pic").attr("src", "images/tombstone.jpg");
      this.saxonArmy.splice(saxonIndex, 1);
    }
    else {
      $("div.saxon-box."+boxnum).addClass("dead-soldier");
      $("div.saxon-box."+boxnum).removeClass("saxon-box"+" "+boxnum);
      $("div.dead-soldier > .saxon-pic").attr("src", "images/tombstone.jpg");
      this.saxonArmy.splice(saxonIndex, 1);
    }
  $(".viking-attack").prop("disabled",true);
  $(".saxon-attack").prop("disabled",false);
  ironHackWar.showStatus();
  return result;
  }
};


War.prototype.showStatus = function () {
  if (this.saxonArmy.length === 0) {
    $(".status").html('Vikings have won the war of the century! <br/> There are '+this.saxonArmy.length+' Saxons left to battle. <br/> There are '+this.vikingArmy.length+' Vikings left to battle');
    $(".btn").prop("disabled",true);
    alert('Vikings have won the war of the century!')
    return 'Vikings have won the war of the century!';
  }
  else if (this.vikingArmy.length === 0) {
    $(".status").html("Saxons have fought for their lives and survive another day... <br/> There are "+this.saxonArmy.length+ " Saxons left to battle <br/> There are "+this.vikingArmy.length+ " Vikings left to battle");
    $(".btn").prop("disabled",true);
    alert('Saxons have fought for their lives and survive another day...')
    return 'Saxons have fought for their lives and survive another day...';
  }
  else {
    $(".status").html("Vikings and Saxons are still in the thick of battle. <br/> There are "+this.saxonArmy.length+" Saxons left to battle <br/> There are "+this.vikingArmy.length+ " Vikings left to battle");
    return 'Vikings and Saxons are still in the thick of battle.';
  }
};

var viking1 = new Viking ("Ryan", 100, 150);
var viking2 = new Viking ("Sean", 100, 150);
var viking3 = new Viking ("Geoff", 100, 150);
var viking4 = new Viking ("SJ", 100, 150);
var viking5 = new Viking ("Danielle", 100, 150);
var a = new Saxon (75, 100);
var b = new Saxon (75, 100);
var c = new Saxon (75, 100);
var d = new Saxon (75, 100);
var e = new Saxon (75, 100);

var ironHackWar = new War ();

ironHackWar.addViking(viking1);
ironHackWar.addViking(viking2);
ironHackWar.addViking(viking3);
ironHackWar.addViking(viking4);
ironHackWar.addViking(viking5);
ironHackWar.addSaxon(a);
ironHackWar.addSaxon(b);
ironHackWar.addSaxon(c);
ironHackWar.addSaxon(d);
ironHackWar.addSaxon(e);

function vikingHealth() {
  for (i=0; i<ironHackWar.vikingArmy.length; i++) {
    var boxnum = i+1
    console.log($("viking-"+boxnum));
    $("div.viking-box."+boxnum+" > p.health").text("HEALTH:"+ironHackWar.vikingArmy[i].health);
  }
}

for (i=0; i<ironHackWar.vikingArmy.length; i++) {
  var boxnum = i+1
  $("div.viking-box."+boxnum+" > p.strength").text("STRENGTH:"+ironHackWar.vikingArmy[i].strength);
}

function saxonHealth() {
  for (i=0; i<ironHackWar.saxonArmy.length; i++) {
    var boxnum = i+1
    $("div.saxon-box."+boxnum+" > p.health").text("HEALTH:"+ironHackWar.saxonArmy[i].health);
  }
}

for (i=0; i<ironHackWar.saxonArmy.length; i++) {
  var boxnum = i+1
  $("div.saxon-box."+boxnum+" > p.strength").text("STRENGTH:"+ironHackWar.saxonArmy[i].strength);
}

$(".viking-attack").on("click", function(){
    ironHackWar.vikingAttack();
    });

$(".saxon-attack").on("click", function(){
    ironHackWar.saxonAttack();
  });
//End of JQuery
});
