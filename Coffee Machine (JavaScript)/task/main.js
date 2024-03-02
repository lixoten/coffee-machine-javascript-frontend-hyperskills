// Stage 5
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
        console.log(`
The coffee machine has:
${coffeeMachine['resources']['water']} ml of water
${coffeeMachine.resources.milk} ml of milk
${this.resources.beans} g of coffee beans
${this.resources.cups} disposable cups
$${this.resources.money} of money
`);
    },
    buy: function () { // NOTE: Function Expression
        console.log("\nWhat do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino:");
        let enoughResources = 0;
        switch (Number(input())) {
            case 1 :
                enoughResources = canWeMakeIt(this.resources.water, this.espresso.water,
                    this.resources.milk, this.espresso.milk,
                    this.resources.beans, this.espresso.beans, 1);

                if (!enoughResources) {
                    break;
                }

                // NOTE: Pay attention here, using objects "dot" to access array items (interchangable, this is better)
                coffeeMachine.resources.water -= coffeeMachine['espresso']['water'];
                coffeeMachine.resources.milk  -= coffeeMachine['espresso']['milk'];
                // NOTE: The use of "this"
                this.resources.beans -= coffeeMachine['espresso']['beans'];
                this.resources.cups  -= 1;
                this.resources.money += coffeeMachine['espresso']['price'];
                break;
            case 2 :
                enoughResources = canWeMakeIt(this.resources.water, this.latte.water,
                    this.resources.milk, this.latte.milk,
                    this.resources.beans, this.latte.beans, 1);

                if (!enoughResources) {
                    break;
                }

                // NOTE: Pay attention here, using indexes to access array items (interchangable)
                this['resources']['milk'] -= coffeeMachine['latte']['milk'];
                coffeeMachine['resources']['water'] -= coffeeMachine['latte']['water'];
                // NOTE: The use of "this".. BAD I think works but bad
                this['resources']['beans'] -= coffeeMachine['latte']['beans'];
                this['resources']['cups'] -= 1;
                this['resources']['money'] += coffeeMachine['latte']['price'];
                break;
            case 3 :
                enoughResources = canWeMakeIt(this.resources.water, this.cappuccino.water,
                    this.resources.milk, this.cappuccino.milk,
                    this.resources.beans, this.cappuccino.beans, 1);

                if (!enoughResources) {
                    break;
                }

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
        console.log(`\nWrite how many ml of water you want to add`);
        this.resources.water += Number(input());
        console.log(`\nWrite how many ml of milk you want to add::`);
        this.resources.milk += Number(input());
        console.log(`\nWrite how many grams of coffee beans you want to add:`);
        this.resources.beans += Number(input());
        console.log(`\nWrite how many disposable coffee cups you want to add:`);
        this.resources.cups += Number(input());
        console.log();
    },
    takeCash : takeCash = function () { // NOTE: Function Expression
        console.log(`\nI gave you $${coffeeMachine.resources.money}\n`);
        coffeeMachine['resources']['money'] = 0;
    }
};

let actionQuestion = ""

do {
    console.log("Write action (buy, fill, take, remaining, exit): ");
    let actionQuestion = input();
    switch (actionQuestion) {
        case "b":
        case "buy":
            coffeeMachine.buy(); // NOTE: Calling a Function Expression

            break;
        case "f":
        case "fill":
            coffeeMachine.fill();

            break;
        case "t":
        case "take":
            coffeeMachine.takeCash();

            continue;
        case "r":
        case "remaining":
            coffeeMachine.currentSupplies(); // NOTE: Calling a Function Expression
            break;
        case "k":
        case "back":
            break;
        case "x":
        case "exit":
            break;
        default:
            break;
    }

    if (actionQuestion === "exit"){
        break;
    }

} while (actionQuestion !== "exit")


function canWeMakeIt(waterSupply, waterRecipe,
                     milkSupply, milkRecipe,
                     beansSupply, beansRecipe, cupsNeeded) {
    let result =
        Math.floor(Math.min(waterSupply / waterRecipe,
                            milkSupply /milkRecipe,
                            beansSupply / beansRecipe));

    if (waterSupply < (waterRecipe * cupsNeeded)){
        console.log("Sorry, not enough water!\n")
        return false;
    } else if (milkSupply < (milkRecipe * 2)){
        console.log("Sorry, not enough milk!\n")
        return false;
    } else if (beansSupply < (beansRecipe * 2)) {
        console.log("Sorry, not enough cobesns!\n")
        return false;
    } else if (result < cupsNeeded) {
        console.log(`No, I can make only ${result} cups of coffee\n`);
        return false;
    } else if (result >= cupsNeeded) {
        //console.log("Yes, I can make that amount of coffee");
        console.log("I have enough resources, making you a coffee!\n");
        return true;
    } else {
        console.log(`zzzzzYes, I can make that amount of coffee (and even ${result-1} more than that)\n`);
        return true;
    }
}