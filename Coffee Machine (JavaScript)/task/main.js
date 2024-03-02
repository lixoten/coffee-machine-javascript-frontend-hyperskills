// Stage 4
// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')

const coffeeMachine = {
    resources : {
        milk: 540,  
        water: 400,
        beans: 120,  
        cups: 9,  
        money: 550,  
    },
    espresso :  {
        milk: 0,
        water: 250,
        beans: 16,
        price: 4
    },
    latte :  {
        milk: 75,
        water: 350,
        beans: 20,
        price: 7
    },
    cappuccino :  {
        milk: 100,
        water: 200,
        beans: 12,
        price: 6
    }
};

function currentSupplies () {
    console.log(`The coffee machine has:`);
    console.log(`${coffeeMachine["resources"]["water"]} ml of water`);
    console.log(`${coffeeMachine["resources"]["milk"]} ml of milk`);
    console.log(`${coffeeMachine.resources.beans} g of coffee beans`);
    console.log(`${coffeeMachine.resources.cups} disposable cups`);
    console.log(`$${coffeeMachine["resources"]["money"]} of money`);
}

function updateSupplies (type) {
    switch (type) {
        case 1 :
            // NOTE: Pay attention here, using objects "dot" to access array items (interchangable, this is better)
            coffeeMachine.resources.water -= coffeeMachine['espresso']['water'];
            coffeeMachine.resources.milk  -= coffeeMachine['espresso']['milk'];
            coffeeMachine.resources.beans -= coffeeMachine['espresso']['beans'];
            coffeeMachine.resources.cups  -= 1;
            coffeeMachine.resources.money += coffeeMachine['espresso']['price'];
            break;
        case 2 :
             // NOTE: Pay attention here, using indexes to access array items (interchangable)
            coffeeMachine["resources"]["water"] -= coffeeMachine['latte']['water'];
            coffeeMachine["resources"]["milk"] -= coffeeMachine['latte']['milk'];
            coffeeMachine["resources"]["beans"] -= coffeeMachine['latte']['beans'];
            coffeeMachine["resources"]["cups"] -= 1;
            coffeeMachine["resources"]["money"] += coffeeMachine['latte']['price'];
            break;
        case 3 :
            coffeeMachine["resources"]["water"] -= coffeeMachine['cappuccino']['water'];
            coffeeMachine["resources"]["milk"] -= coffeeMachine['cappuccino']['milk'];
            coffeeMachine["resources"]["beans"] -= coffeeMachine['cappuccino']['beans'];
            coffeeMachine["resources"]["cups"] -= 1;
            coffeeMachine["resources"]["money"] += coffeeMachine['cappuccino']['price'];
            break;
        default:
            break;
    }
}

function restockSupplies (inWater, inMilk, inBeans, inCups) {
    coffeeMachine["resources"]["water"] += inWater;
    coffeeMachine["resources"]["milk"]  += inMilk;
    coffeeMachine["resources"]["beans"]  += inBeans;
    coffeeMachine["resources"]["cups"]  += inCups;
}

currentSupplies();

console.log("Write action (buy, fill, take): ");
let actionQuestion = input();
switch (actionQuestion) {
    case "buy":
        console.log("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino:");
        updateSupplies(Number(input()));
        currentSupplies();

        break;
    case "fill":
        console.log("Write how many ml of water you want to add:");
        let water = Number(input());

        console.log("Write how many ml of milk you want to add:");
        let milk = Number(input());

        console.log("Write how many grams of coffee beans you want to add:");
        let beans = Number(input());

        console.log("Write how many disposable cups you want to add:");
        let cups = Number(input());

        restockSupplies(water, milk, beans, cups)
        currentSupplies();

        break;
    case "take":
        console.log(`"I gave you $${coffeeMachine.resources.money}\n`);
        coffeeMachine.resources.money = 0;
        currentSupplies();

        break;
    default:
        break;
}