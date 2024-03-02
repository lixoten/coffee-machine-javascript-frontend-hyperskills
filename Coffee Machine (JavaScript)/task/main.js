// Stage 2
// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input');

console.log("Write how many cups of coffee you will need:");

// Note: Type/Numeric conversion
let cupsNeeded = Number(input());

// Based on Lessons to this point
let waterNeeded = 200;
let milkNeeded = 50;
let beansNeeded = 15;

let totalWaterNeed = waterNeeded * cupsNeeded;
let totalMilkNeed  = milkNeeded  * cupsNeeded;
let totalCoffeeNeed= beansNeeded  * cupsNeeded;

console.log(`For ${cupsNeeded} cups of coffee you will need:`);
console.log(totalWaterNeed + ` ml of water`);
console.log(totalMilkNeed + ` ml of milk`);
console.log(totalCoffeeNeed + ` g of beans`);

// Simple Arrays
// let item = ["water", "milk", "beans"];
// let amt = [200, 50, 15];
// let unit = ["ml", "ml", "g"];
//
// let waterNeed = amt[0] * cupsNeeded;
// let milkNeed  = amt[1]  * cupsNeeded;
// let coffeeNeed= amt[2]  * cupsNeeded;
//
// console.log(`For ${cupsNeeded} cups of coffee you will need:`)
// console.log(waterNeed + ` ${unit[0]} of ${item[0]}`);
// console.log(milkNeed + ` ${unit[1]} of ${item[1]}`);
// console.log(coffeeNeed + ` ${unit[2]} of ${item[2]}`);

// more advanced with associative array///////////////
// const  ingredientArr  = {
//     water :  {
//         name: "water",
//         amount: 200,
//         unit: "ml",
//     },
//     milk :  {
//         name: "milk",
//         amount: 50,
//         unit: "ml",
//     },
//     coffee :  {
//         name: "coffee beans",
//         amount: 15,
//         unit: "g",
//     }
// };

// let waterNeed = ingredientArr["water"]["amount"] * cupsNeeded;
// let milkNeed  = ingredientArr["milk"]["amount"] * cupsNeeded;
// let coffeeNeed= ingredientArr["coffee"]["amount"] * cupsNeeded;
//
// console.log(`For ${cupsNeeded} cups of coffee you will need:`)
// console.log(waterNeed + ` ${ingredientArr["water"]["unit"]} of ${ingredientArr["water"]["name"]}`);
// console.log(milkNeed + ` ${ingredientArr["milk"]["unit"]} of ${ingredientArr["milk"]["name"]}`);
// console.log(coffeeNeed + ` ${ingredientArr["coffee"]["unit"]} of ${ingredientArr["coffee"]["name"]}`);
//
