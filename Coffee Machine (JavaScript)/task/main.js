// Stage 4
// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input');

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
    },
    currentSupplies: function (){
        // NOTE: Multi-line string
        console.log(`The coffee machine has:
${coffeeMachine['resources']['water']} ml of water
${coffeeMachine.resources.milk} ml of milk
${this.resources.beans} g of coffee beans
${this.resources.cups} disposable cups
$${this.resources.money} of money`);
    },
    buy: function () { // NOTE: Function Expression
        console.log("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino:");
        switch (Number(input())) {
            case 1 :
                // NOTE: Pay attention here, using objects "dot" to access array items (interchangable, this is better)
                coffeeMachine.resources.water -= coffeeMachine['espresso']['water'];
                coffeeMachine.resources.milk  -= coffeeMachine['espresso']['milk'];
                // NOTE: The use of "this"
                this.resources.beans -= coffeeMachine['espresso']['beans'];
                this.resources.cups  -= 1;
                this.resources.money += coffeeMachine['espresso']['price'];
                break;
            case 2 :
                // NOTE: Pay attention here, using indexes to access array items (interchangable)
                this['resources']['milk'] -= coffeeMachine['latte']['milk'];
                coffeeMachine['resources']['water'] -= coffeeMachine['latte']['water'];
                // NOTE: The use of "this".. BAD I think works but bad
                this['resources']['beans'] -= coffeeMachine['latte']['beans'];
                this['resources']['cups'] -= 1;
                this['resources']['money'] += coffeeMachine['latte']['price'];
                break;
            case 3 :
                let coffeeChoice = "cappuccino";
                // Note here.. placing the type in a variable, can lets us potentially remove this statements outside of switch, sinve it is done for all 3 coffees
                this.resources.water -= coffeeMachine[coffeeChoice].water; // Note here...very flexible
                this.resources.milk  -= coffeeMachine[coffeeChoice]['milk'];
                this.resources.beans -= coffeeMachine[coffeeChoice]['beans'];
                this.resources.cups  -= 1;
                this.resources.money += coffeeMachine[coffeeChoice]['price'];
                break;
            default:
                break;
        }

    },
    fill: function () { // NOTE: Function Expression
        console.log(`Write how many ml of water you want to add`);
        this.resources.water += Number(input());
        console.log(`Write how many ml of milk you want to add::`);
        this.resources.milk += Number(input());
        console.log(`Write how many grams of coffee beans you want to add:`);
        this.resources.beans += Number(input());
        console.log(`Write how many disposable coffee cups you want to add:`);
        this.resources.cups += Number(input());
        console.log('\n');
    },
    takeCash : takeCash = function () { // NOTE: Function Expression
        console.log(`I gave you $${coffeeMachine.resources.money}\n`);
        coffeeMachine['resources']['money'] = 0;
    }

};

coffeeMachine.currentSupplies();// NOTE: Calling a Function Expression

console.log("Write action (buy, fill, take): ");
let actionQuestion = input();
switch (actionQuestion) {
    case "show":
        coffeeMachine.currentSupplies()

        break;
    case "buy":
        coffeeMachine.buy(); // NOTE: Calling a Function Expression
        coffeeMachine.currentSupplies(); // NOTE: Calling a Function Expression

        break;
    case "fill":
        coffeeMachine.fill();
        coffeeMachine.currentSupplies();

        break;
    case "take":
        coffeeMachine.takeCash();
        coffeeMachine.currentSupplies();

        break;
    default:
        break;
}