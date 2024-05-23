class Station {
  constructor(name, zones){
     this.name = name;
     this.zones = zones
  }
}

class OysterCard {
  constructor(balance = 0){
     this.balance = balance;
     this.currenTrip = null;
     this.maxFare = 3.20;
     this.fares = {
      'zone 1': 2.50,
      'oneZoneOutsideZone1':2.00,
      'twoZonesIncludingZone1':3.00,
      'twoZonesExcludingZone1':2.25,
      'threeZones':3.20,
      'bus':1.80
     };
  }
  loadMoney(amount){
   this.balance += amount;
  }
  startTrip(station){
    if(this.balance < this.maxFare){
      console.log('you got no money mate')
    }
    this.currentTrip = {entryStation: station};
    this.balance -= this.maxFare;
    return true
  }
  endTrip(station){
    if(!this.currentTrip || !this.currentTrip.entryStation){
      console.log("No trip Started");
      return
    }
    const actualFare = this.calculateFare(this.currentTrip.entryStation,station);
    this.balance+=(this.maxFare - actualFare) // refund the difference 
    this.currentTrip = null;
  }

   takeBus(){
    if(this.balance < this.fares.bus){
      console.log('Insufficient balance to take the bus');
      return false
    }
     this.balance -= this.fares.bus;
     return true;
   }

  calculateFare(entryStation,exitStation){
    const entryZones = entryStation.zones;
    const exitZones = exitStation.zones;
    const uniqueZones = new Set([...entryZones, ...exitZones]).size;
    const isZone1Involved = entryZones.includes(1) || exitZones.includes(1);
    if(uniqueZones === 1 && entryZones.includes(1)){
      return this.fares.zone1;
    }
    if(uniqueZones === 1){
      return this.fares.oneZoneOutsideZone1;
    }
    if(uniqueZones === 2 && isZone1Involved){
      return this.fares.twoZonesIncludingZone1;
    }
    if(uniqueZones === 2){
      return this.fares.twoZonesExcludingZone1
    }
    if(uniqueZones === 3){
      return this.fares.threeZones;
    }
    return this.maxFare;
  }
  getBalance(){
    return this.balance;
  }

  
}

const holborn = new Station("Holborn", [1]);
const earlsCourt = new Station("Earl's Court", [1, 2]);
const wimbledon = new Station("Wimbledon", [3]);
const hammersmith = new Station("Hammersmith", [2]);

const myOysterCard = new OysterCard();
myOysterCard.loadMoney(30);

// Trip: Holborn to Earl's Court
myOysterCard.startTrip(wimbledon);
myOysterCard.endTrip(holborn);

// Bus journey from Earl's Court to Chelsea
myOysterCard.takeBus();

// Trip: Earl's Court to Hammersmith
myOysterCard.startTrip(earlsCourt);
myOysterCard.endTrip(hammersmith);

console.log(`Remaining balance: £${myOysterCard.getBalance().toFixed(2)}`)
