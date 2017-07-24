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
function Saxon(nameArg, healthArg, strengthArg) {
  Soldier.call(this, healthArg, strengthArg);
  this.name = nameArg;
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

var saxonAttacker;
var vikingAttacker;

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
  saxonAttacker = theSaxon



  var result = theViking.receiveDamage(theSaxon.attack());

  if (theViking.health <= 0) {
    this.vikingArmy.splice(vikingIndex, 1);
  }

  return result;
};


War.prototype.vikingAttack = function() {
  var vikingIndex = Math.floor(Math.random() * this.vikingArmy.length);
  var saxonIndex = Math.floor(Math.random() * this.saxonArmy.length);
  var theViking = this.vikingArmy[vikingIndex];
  var theSaxon = this.saxonArmy[saxonIndex];
  vikingAttacker = theViking


  var result = theSaxon.receiveDamage(theViking.attack());

  if (theSaxon.health <= 0) {
    this.saxonArmy.splice(saxonIndex, 1);
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
var viking4 = new Viking("Rollo", 18, 25);
var viking5 = new Viking("Jarl", 10, 18);
var saxon1 = new Saxon("saxon1", 6, 7);
var saxon2 = new Saxon("saxon2", 16, 15);
var saxon3 = new Saxon("saxon3", 8, 10);
var saxon4 = new Saxon("saxon4", 7, 15);
var saxon5 = new Saxon("saxon5", 12, 15);


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
    const health = who.find(".health");
    const strength = who.find(".strength");
    const oldImg = who.find("img");
    oldImg.attr("src", "images/tombstone.jpg");
    health.html("<span>DEAD</span>");
    strength.html("");
  }

  function updateStats() {
    const spanHealth = "<span>HEALTH:</span>";
    const spanStrength = "<span>STRENGTH:</span>";
    _.forEach($(".viking-box"), function(el, index) {
      const theSax = $(el);
      if (war1.vikingArmy[index] === undefined) {
        $(el).removeClass();
        buryHim(theSax);
      } else {
        $(".viking-box." + (index + 1) + " .health").html(spanHealth + war1.vikingArmy[index].health);
        $(".viking-box." + (index + 1) + " .health").parent().addClass(war1.vikingArmy[index].name);
        setTimeout(function(){ $(el).removeClass("animated shake") }, 1000);
      }
    });
    _.forEach($(".saxon-box"), function(el, index) {
      const theVik = $(el);
      if (war1.saxonArmy[index] === undefined) {
        $(el).removeClass();
        buryHim(theVik);
      } else {
        $(".saxon-box." + (index + 1) + " .health").html(spanHealth + war1.saxonArmy[index].health);
        $(".saxon-box." + (index + 1) + " .health").parent().addClass(war1.saxonArmy[index].name);
        setTimeout(function(){ $(el).removeClass("animated shake") }, 1000);
      }
    });
    _.forEach($(".viking-box"), function(el, index) {
      $(".viking-box." + (index + 1) + " .strength").html(spanStrength + war1.vikingArmy[index].strength);
    });
    _.forEach($(".saxon-box"), function(el, index) {
      $(".saxon-box." + (index + 1) + " .strength").html(spanStrength + war1.saxonArmy[index].strength);
    });
  };

  updateStats();

  $(".viking-attack").on("click", function(e) {
    e.preventDefault;
    let result = war1.vikingAttack();
    let status = war1.showStatus();
    $("#status").html(status);
    $("#status2").html(result);

    let attackingViking = vikingAttacker.name;
    $("." + attackingViking).addClass("animated shake");

    updateStats();

    if (war1.saxonArmy.length === 0) {
      alert("Vikings win the war!")
    };
  });

  $(".saxon-attack").on("click", function(e) {
    e.preventDefault;
    let result = war1.saxonAttack();
    let status = war1.showStatus();
    $("#status").html(status);
    $("#status2").html(result);

    let attackingSaxon = saxonAttacker.name;
    $("." + attackingSaxon).addClass("animated shake");

    updateStats();

    if (war1.vikingArmy.length === 0) {
      alert("Saxons win the war!")
    };
  });
});
