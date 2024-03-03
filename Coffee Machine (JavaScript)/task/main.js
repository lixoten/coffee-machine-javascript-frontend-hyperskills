// Stage 6
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
    // Changed to use inputed number too represent product choice insteat of literal word
    // espresso :  {
    1 :  {
        milk: 0,
        water: 250,
        beans: 16,
        price: 4
    },
    // latte :  {
    2 :  {
        milk: 75,
        water: 350,
        beans: 20,
        price: 7
    },
    // cappuccino :  {
    3 :  {
        milk: 100,
        water: 200,
        beans: 12,
        price: 6
    },
    currentSupplies: function (){
        // NOTE: Multi-line string
        console.log(`
The coffee machine has:
${this['resources']['water']} ml of water
${this.resources.milk} ml of milk
${this.resources.beans} g of coffee beans
${this.resources.cups} disposable cups
$${this.resources.money} of money
`);
    },
    buy: function () { // NOTE: Function Expression
        let enoughResources = 0;
        // let choice = "";

        let choice = (input("\nWhat do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino:\n"));
        // switch (input("\nWhat do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino:\n")) {
        //     case "back" :
        //         choice = "back";
        //
        //         break;
        //     case "1" :
        //         choice = "espresso";
        //
        //         break;
        //     case "2" :
        //         choice = "latte";
        //
        //         break;
        //     case "3" :
        //         choice = "cappuccino";
        //
        //         break;
        //     default:
        //         break;
        // }

        if (choice === "back") return;

        enoughResources = canWeMakeIt(this.resources.water, this[choice].water,
            this.resources.milk, this[choice].milk,
            this.resources.beans, this[choice].beans, 1);

        if (enoughResources) {
            // NOTE: Pay attention here, using indexes to access array items (interchangable)
            coffeeMachine.resources.water -= coffeeMachine[choice]['water'];
            // NOTE: Pay attention here, using objects "dot" to access array items (interchangable, this is better)
            this.resources.milk  -= this[choice].milk;
            // NOTE: The use of "this"
            this.resources.beans -= this[choice].beans;
            this.resources.cups  -= 1;
            this.resources.money += this[choice].price;
        }

    },
    fill: function () { // NOTE: Function Expression
        this.resources.water += Number(input(`\nWrite how many ml of water you want to add:\n`));
        this.resources.milk += Number(input(`\nWrite how many ml of milk you want to add:\n`));
        this.resources.beans += Number(input(`\nWrite how many grams of coffee beans you want to add:\n`));
        this.resources.cups += Number(input(`\nWrite how many disposable coffee cups you want to add:\n`));
    },
    takeCash : takeCash = function () { // NOTE: Function Expression
        console.log(`\nI gave you $${this.resources.money}\n`);
        this.resources.money = 0;
    }
};

let actionQuestion = ""

do {
    actionQuestion = input("Write action (buy, fill, take, remaining, exit): \n");
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
        case "exit":
            break;
        default:
            break;
    }

    if (actionQuestion === "exit"){
        break;
    }

} while (actionQuestion !== "exit");

function canWeMakeIt(waterSupply, waterRecipe,
                     milkSupply, milkRecipe,
                     beansSupply, beansRecipe, cupsNeeded) {
    let result = Math.floor(Math.min(waterSupply / waterRecipe,
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