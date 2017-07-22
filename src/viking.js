//------------------------------------------------------
// SOLDIER
//------------------------------------------------------
function Soldier(healthArg, strengthArg) {
  this.health = healthArg;
  this.strength = strengthArg;
  // this.attack =  function () {
  //   return this.strength;
  // }
}

Soldier.prototype.attack = function() {
  return this.strength;

};

Soldier.prototype.receiveDamage = function(damage) {
  this.health -= damage;
};


//------------------------------------------------------
// VIKING
//------------------------------------------------------
function Viking(nameArg, healthArg, strengthArg) {
  Soldier.call(this, healthArg, strengthArg);
  this.name = nameArg;
}

Viking.prototype = Object.create(Soldier.prototype);
Viking.prototype.constructor = Viking;

Viking.prototype.receiveDamage = function(damage) {
  this.health -= damage;

  if (this.health > 0) {
    return this.name + " has received " + damage + " points of damage";
  } else {
    return this.name + " has died in act of combat";
  }
};

Viking.prototype.battleCry = function() {
  return "Odin Owns You All!";
};


//------------------------------------------------------
// SAXON
//------------------------------------------------------
function Saxon(healthArg, strengthArg) {
  Soldier.call(this, healthArg, strengthArg);
}

Saxon.prototype = Object.create(Soldier.prototype);
Saxon.prototype.constructor = Saxon;

Saxon.prototype.receiveDamage = function(damage) {
  this.health -= damage;

  if (this.health > 0) {
    return "A Saxon has received " + damage + " points of damage";
  } else {
    return "A Saxon has died in combat";
  }
};


//------------------------------------------------------
// WAR
//------------------------------------------------------
function War() {
  this.vikingArmy = [];
  this.saxonArmy = [];
  // this.addViking = function (viking) {
  //   this.vikingArmy.push(viking);
  // };
}

War.prototype.addViking = function(viking) {
  this.vikingArmy.push(viking);
};

War.prototype.addSaxon = function(saxon) {
  this.saxonArmy.push(saxon);
};

War.prototype.saxonAttack = function() {
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

var saxonGraveyard = [];
var vikingGraveyard = [];

War.prototype.vikingAttack = function() {
  saxonGraveyard = [];
  var vikingIndex = Math.floor(Math.random() * this.vikingArmy.length);
  var saxonIndex = Math.floor(Math.random() * this.saxonArmy.length);
  var theViking = this.vikingArmy[vikingIndex];
  var theSaxon = this.saxonArmy[saxonIndex];

  var result = theSaxon.receiveDamage(theViking.attack());

  if (theSaxon.health <= 0) {
    this.saxonArmy.splice(saxonIndex, 1);
    saxonGraveyard.push(theSaxon);
  }

  return result;
};



War.prototype.showStatus = function() {
  if (this.saxonArmy.length === 0) {
    return 'Vikings have won the war of the century!';
  } else if (this.vikingArmy.length === 0) {
    return 'Saxons have fought for their lives and survive another day...';
  } else {
    return 'Vikings and Saxons are still in the thick of battle.';
  }
};



var viking1 = new Viking("Ragnar", 10, 20);
var viking2 = new Viking("Byul", 15, 15);
var viking3 = new Viking("Locki", 8, 12);
var viking4 = new Viking("Locki", 18, 25);
var viking5 = new Viking("Locki", 10, 18);
var saxon1 = new Saxon(6, 7);
var saxon2 = new Saxon(16, 15);
var saxon3 = new Saxon(8, 10);
var saxon4 = new Saxon(7, 15);
var saxon5 = new Saxon(12, 15);


var war1 = new War();

war1.addSaxon(saxon1);
war1.addSaxon(saxon2);
war1.addSaxon(saxon3);
war1.addSaxon(saxon4);
war1.addSaxon(saxon5);
war1.addViking(viking1);
war1.addViking(viking2);
war1.addViking(viking3)
war1.addViking(viking4)
war1.addViking(viking5)


$(document).ready(function() {

  function buryHim(who) {
    const oldImg = who.first();
    oldImg.attr("src", "images/tombstone.jpg");
  }

  function updateStats() {
    const spanhtml = "<span>HEALTH:</span>";
    _.forEach($(".viking-box"), function(el, index) {
      let indexPlusOne = index + 1;
      $(".viking-box." + indexPlusOne + " .health").html(spanhtml + war1.vikingArmy[index].health);
    });
    _.forEach($(".viking-box"), function(el, index) {
      let indexPlusOne = index + 1;
      $(".viking-box." + indexPlusOne + " .strength").html(spanhtml + war1.vikingArmy[index].strength);
    });
    _.forEach($(".saxon-box"), function(el, index) {
      let indexPlusOne = index + 1;
      if (war1.saxonArmy[index] === undefined) {
        const deadOne = $(el).find("img");
        $(el).removeClass("saxon-box");
        buryHim(deadOne);

      } else {
        $(".saxon-box." + indexPlusOne + " .health").html(spanhtml + war1.saxonArmy[index].health);
      }
    });
    // _.forEach($(".saxon-box"), function(el, index) {
    //   let indexPlusOne = index + 1;
    //   $(".saxon-box." + indexPlusOne + " .strength").html(spanhtml + war1.saxonArmy[index].strength);
    // });
  };

  updateStats();


  $(".viking-attack").on("click", function(e) {
    e.preventDefault;
    let result = war1.vikingAttack();
    let vikingArmy = war1.vikingArmy;
    let saxonArmy = war1.saxonArmy;
    console.log(e);
    let status = war1.showStatus();
    $("#status").html(status);
    $("#status2").html(result);
    console.log(saxonGraveyard[0]);


    // $(".saxon-box.1").remove();
    updateStats();
    if (war1.saxonArmy.length === 0) {
      alert("Vikings win the war!")
    };

  });



});
