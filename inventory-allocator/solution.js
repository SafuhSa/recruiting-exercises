class InventoryAllocator {
  constructor(shipments = {}, inventoryDist = []) {
    this.shipments = shipments;
    this.inventoryDist = inventoryDist;
  }

  handleShipment(warehouse, shipments) {
    let inventory = warehouse.inventory;
    let result;
    for (let item in shipments) {
      let inventoryAmount = inventory[item];
      let orderAmount = shipments[item];
      if (inventoryAmount && orderAmount) {
        if (!result) result = {};
        if (inventoryAmount >= orderAmount) {
          result[item] = orderAmount;
          delete shipments[item];
        } else {
          result[item] = inventoryAmount;
          shipments[item] -= inventoryAmount
        }
      }
    }
    // console.log(result)
    return result;
  }
  cheapestShipment() {
    let { shipments, inventoryDist } = this;
    if (!inventoryDist.length) return [];
    shipments = Object.assign({}, shipments);// copy shipments so orginal shipments won't get modified;
    let result = [];


    for (let warehouse of inventoryDist) {
      let res = this.handleShipment(warehouse, shipments)
      if (res) result.push({ [warehouse.name]: res })
      if (this.objectIsEmpty(shipments)) return result;
    }
    // console.log('sa', shipments,'fsg', this.shipments)
    if (!this.objectIsEmpty(shipments)) return [];
    return result;
  }

  objectIsEmpty(obj) {
    for (let key in obj) {
      return false;
    }
    return true;
  }

  addShipments(item, amount) {
    this.shipments[item] = amount + this.shipments[item] || amount;
    return this.shipments;
  }
}


let order = { apple: 1 };
let inventory = [{ name: 'owd', inventory: { apple: 1 } }];
let allocator = new InventoryAllocator(order, inventory);
let expected = [{ owd: { apple: 1 } }];

console.log('Input:   ', order, inventory);
console.log('Output:  ', allocator.cheapestShipment());
console.log('Expected:', expected);
console.log('--------------------------------');
console.log(' ');

order = { apple: 1 };
inventory = [{ name: 'owd', inventory: { apple: 0 } }];
expected = [];
allocator = new InventoryAllocator(order, inventory)
console.log('Input:   ', order, inventory);
console.log('Output:  ', allocator.cheapestShipment());
console.log('Expected:', expected);
console.log('--------------------------------');
console.log(' ');

order = { apple: 10 };
inventory = [{ name: 'owd', inventory: { apple: 5 } }, { name: 'dm', inventory: { apple: 5 } }];
expected = [{ dm: { apple: 5 } }, { owd: { apple: 5 } }];
allocator = new InventoryAllocator(order, inventory)
console.log('Input:   ', order, inventory);
console.log('Output:  ', allocator.cheapestShipment());
console.log('Expected:', expected);
console.log('--------------------------------');
console.log(' ');


order = { apple: 10 };
inventory = [];
expected = [];
allocator = new InventoryAllocator(order, inventory)
console.log('Input:   ', order, inventory);
console.log('Output:  ', allocator.cheapestShipment());
console.log('Expected:', expected);
console.log('--------------------------------');
console.log(' ');

order = {};
inventory = [{ name: 'owd', inventory: { apple: 5 } }, { name: 'dm', inventory: { apple: 5 } }];
expected = [];
allocator = new InventoryAllocator(order, inventory)
console.log('Input:   ', order, inventory);
console.log('Output:  ', allocator.cheapestShipment());
console.log('Expected:', expected);
console.log('--------------------------------');
console.log(' ');

order = { apple: 10, orange: 15 };
inventory = [{ name: "Saf", inventory: { apple: 25, orange: 30 } }];
expected = [{ Saf: { apple: 10, orange: 15 } }];
allocator = new InventoryAllocator(order, inventory)
console.log('Input:   ', order, inventory);
console.log('Output:  ', allocator.cheapestShipment());
console.log('Expected:', expected);
console.log('--------------------------------');
console.log(' ');

order = { orange: 10, banana: 17 };
inventory = [{ name: "Best", inventory: { orange: 5, banana: 17 } }, { name: "NotBest", inventory: { orange: 5, banana: 5 } }];
expected = [{ Best: { orange: 5, banana: 17 } }, { NotBest: { orange: 5 } }];
allocator = new InventoryAllocator(order, inventory)
console.log('Input:   ', order, inventory);
console.log('Output:  ', allocator.cheapestShipment());
console.log('Expected:', expected);
console.log('--------------------------------');
console.log(' ');