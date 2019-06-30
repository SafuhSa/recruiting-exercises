/**
Instructions are Below:
Pull the repo from the GitHub link below. Solution is in src directory with the name solution(src/solution.js).
To run the tests:
 npm install.
 npm test, npm run test, or npm mocha.
To Run console.log tests open with Repl.it link below and just uncomment line 67 to 137;

Note: I could use a JavaScript Map(new Map) but I used JavaScript Object {} for syntax simplicity;
 **/

class InventoryAllocator {
  constructor(shipments = {}, inventoryDist = []) {
    this.shipments = shipments; // orders
    this.inventoryDist = inventoryDist; //warehouses
  }

  handleShipment(warehouse, shipments) {
    let inventory = warehouse.inventory;
    let result;
    for (let item in shipments) {
      let inventoryAmount = inventory[item];
      let orderAmount = shipments[item];
      if (inventoryAmount && orderAmount) { // to avoid cases if either orderAmount, or inventoryAmount is zero
        if (!result) result = {}; // initiate result; 
        // didn't modified inventory as we are only checking for the cheapestShipment no making it. 
        if (inventoryAmount >= orderAmount) { 
          result[item] = orderAmount;
          delete shipments[item];
        } else {
          result[item] = inventoryAmount;
          shipments[item] -= inventoryAmount
        }
      }
    }
    return result;
  }
  cheapestShipment() {
    let { shipments, inventoryDist } = this;
    if (!inventoryDist.length) return []; 
    shipments = Object.assign({}, shipments);// copy shipments so orginal shipments won't get modified;
    let result = [];


    for (let warehouse of inventoryDist) {
      // call handleShipment to check if any of items inside the order exist in the warehouse;
      // it return either the items that exist in the warehouse with modifing the order(shipments) or it return undefined;
      let res = this.handleShipment(warehouse, shipments);
      if (res) result.push({ [warehouse.name]: res }); // to make sure some items exist in this warehouse;
      if (this.objectIsEmpty(shipments)) return result; // to check if order(shipments) is empty like {}
    }

    if (!this.objectIsEmpty(shipments)) return []; // again check if order(shipments) is empty to make sure all shipments is fullfilled 
    return result;
  }

  objectIsEmpty(obj) { // to check if object like {} is empty;
    for (let key in obj) {
      return false;
    }
    return true;
  }
// addShipments is for adding a single item quantity to the order
  addShipments(item, amount) {
    this.shipments[item] = amount + this.shipments[item] || amount;
    return this.shipments;
  }
}
module.exports = InventoryAllocator;

// let order = { apple: 1 };
// let inventory = [{ name: 'owd', inventory: { apple: 1 } }];
// let allocator = new InventoryAllocator(order, inventory);
// let expected = [{ owd: { apple: 1 } }];

// console.log('Input:   ', order, inventory);
// console.log('Output:  ', allocator.cheapestShipment());
// console.log('Expected:', expected);
// console.log('--------------------------------');
// console.log(' ');

// order = { apple: 1 };
// inventory = [{ name: 'owd', inventory: { apple: 0 } }];
// expected = [];
// allocator = new InventoryAllocator(order, inventory)
// console.log('Input:   ', order, inventory);
// console.log('Output:  ', allocator.cheapestShipment());
// console.log('Expected:', expected);
// console.log('--------------------------------');
// console.log(' ');

// order = { apple: 10 };
// inventory = [{ name: 'owd', inventory: { apple: 5 } }, { name: 'dm', inventory: { apple: 5 } }];
// expected = [{ dm: { apple: 5 } }, { owd: { apple: 5 } }];
// allocator = new InventoryAllocator(order, inventory)
// console.log('Input:   ', order, inventory);
// console.log('Output:  ', allocator.cheapestShipment());
// console.log('Expected:', expected);
// console.log('--------------------------------');
// console.log(' ');


// order = { apple: 10 };
// inventory = [];
// expected = [];
// allocator = new InventoryAllocator(order, inventory)
// console.log('Input:   ', order, inventory);
// console.log('Output:  ', allocator.cheapestShipment());
// console.log('Expected:', expected);
// console.log('--------------------------------');
// console.log(' ');

// order = {};
// inventory = [{ name: 'owd', inventory: { apple: 5 } }, { name: 'dm', inventory: { apple: 5 } }];
// expected = [];
// allocator = new InventoryAllocator(order, inventory)
// console.log('Input:   ', order, inventory);
// console.log('Output:  ', allocator.cheapestShipment());
// console.log('Expected:', expected);
// console.log('--------------------------------');
// console.log(' ');

// order = { apple: 10, orange: 15 };
// inventory = [{ name: "Saf", inventory: { apple: 25, orange: 30 } }];
// expected = [{ Saf: { apple: 10, orange: 15 } }];
// allocator = new InventoryAllocator(order, inventory)
// console.log('Input:   ', order, inventory);
// console.log('Output:  ', allocator.cheapestShipment());
// console.log('Expected:', expected);
// console.log('--------------------------------');
// console.log(' ');

// order = { orange: 10, banana: 17 };
// inventory = [{ name: "Best", inventory: { orange: 5, banana: 17 } }, { name: "NotBest", inventory: { orange: 5, banana: 5 } }];
// expected = [{ Best: { orange: 5, banana: 17 } }, { NotBest: { orange: 5 } }];
// allocator = new InventoryAllocator(order, inventory)
// console.log('Input:   ', order, inventory);
// console.log('Output:  ', allocator.cheapestShipment());
// console.log('Expected:', expected);
// console.log('--------------------------------');
// console.log(' ');