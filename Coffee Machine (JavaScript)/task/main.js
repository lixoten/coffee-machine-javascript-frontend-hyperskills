// Stage 3
// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input');

const coffeeRecipe = {
    water : 200,
    milk :  50,
    beans : 15
};

const coffeeMachine = {
    water : 0,
    milk :  0,
    beans : 0
};

console.log("Write how many ml of water the coffee machine has:");
coffeeMachine["water"] = Number(input());

console.log("Write how many ml of milk the coffee machine has:");
coffeeMachine["milk"] = Number(input());

console.log("Write how many grams of coffee beans the coffee machine has:");
coffeeMachine["beans"]= Number(input());

console.log("Write how many cups of coffee you will need:");
let cupsNeeded = Number(input());

let result =
    Math.floor(Math.min(coffeeMachine["water"] / coffeeRecipe["water"],
        coffeeMachine["milk"] / coffeeRecipe["milk"],
        coffeeMachine["beans"] / coffeeRecipe["beans"]));

if (result < cupsNeeded) {
    console.log(`No, I can make only ${result} cups of coffee`);
} else if (result === cupsNeeded) {
    console.log("Yes, I can make that amount of coffee");
} else {
    console.log(`Yes, I can make that amount of coffee (and even ${result-1} more than that)`);
}