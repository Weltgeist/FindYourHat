const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this._field = field;
    this._direction = "";
  }
  get field(){
    return this._field;
  }
  
  get direction(){
    return this._direction;
  }
  
  set direction(direction){
     this._direction = direction;
  }
  print(){
    this.field.forEach(elem => console.log(elem.reduce((acc,curr) => acc += curr )));
  }
  getWay(){
    const way = prompt('Which way?');
    this.direction = way;
  }
  init(){
    this.print();
  }
  play(){
    this.getWay();
    this.print();
  }

}




const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

myField.init();
myField.play();