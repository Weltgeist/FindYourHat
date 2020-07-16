const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

function sumArr(arr1,arr2){
  return arr1.map(function (num, idx) { return num + arr2[idx];});
}

class Field {
  constructor(field) {
    this._field = field;
    this._direction = [0, 0];
    this._curPos = field.reduce((acc, elem, idx) => {
      if(elem.some(a => a === pathCharacter)) acc = [idx, elem.findIndex(a => a === pathCharacter)];
      return acc;
   }, []);
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

  get curPos(){
    return this._curPos;
  }
  
  set curPos(position){
     this._curPos = position;
  }
  print(){
    this.field.forEach(elem => console.log(elem.reduce((acc,curr) => acc += curr )));
  }
  getWay(){
    const way = prompt('Which way[wasd]?');
    this.direction = this.convertDir(way);
  }
  convertDir(dir){
    if (dir === "w"){
      return [1, 0];
    } else if (dir === "a") {
      return [0, -1];
    } else if (dir === "s") {
      return [-1, 0];
    } else if (dir === "d") {
      return [0, 1];
    } else {
      return [0, 0];
    }
  }
  getDest(){
    this.getWay();
    this.curPos = sumArr(this.curPos, this.direction) ;
  }
  init(){
    this.print();
  }
  play(){
    this.getDest();
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
console.log(myField.direction);
console.log(myField.curPos);
console.log(sumArr([0,1], [0, 2]) );
myField.curPos=[0,7]
console.log(myField.curPos);