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
    this._play = 0;
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

  get play(){
    return this._play;
  }

  set play(play){
    this._play = play;
  }
  static generateField(h,w, percent){
    const field = [];
    const item = [hole, fieldCharacter];
    let select = '';
    for (let i =0 ; i < h; i++){
      field[i] = [];
      for (let j =0 ; j < w; j++){      
        select = Math.random() <= percent?item[0]: item[1];
        field[i].push(select)
      }
    }
    return field;
  }
  print(){
    this.field.forEach(elem => console.log(elem.reduce((acc,curr) => acc += curr )));
    console.log(this.direction);
    console.log(this.curPos);
  }
  getWay(){
    const way = prompt('Which way[wasd]?');
    this.direction = this.convertDir(way);
  }
  convertDir(dir){
    if (dir === "w"){
      return [-1, 0];
    } else if (dir === "a") {
      return [0, -1];
    } else if (dir === "s") {
      return [1, 0];
    } else if (dir === "d") {
      return [0, 1];
    } else {
      return [0, 0];
    }
  }
  evalDest(){
    if(this.curPos[0] < 0 || this.curPos[1] < 0 || this.curPos[0] >= this.field.length || this.curPos[1] >= this.field[0].length ){
      this.play = 1;
    } else if (this.field[this.curPos[0]][this.curPos[1]] === hole) {
      this.play = 1;
    } else if (this.field[this.curPos[0]][this.curPos[1]] === fieldCharacter) {
      this.field[this.curPos[0]][this.curPos[1]]= pathCharacter;
    } else if (this.field[this.curPos[0]][this.curPos[1]] === hat) {
      this.play = 2;
      this.field[this.curPos[0]][this.curPos[1]] = "W";
    }
  }
  getDest(){
    this.getWay();
    this.curPos = sumArr(this.curPos, this.direction) ;
    this.evalDest();
  }
  init(){
    this.print();
  }
  playing(){
    while(this.play === 0){
    this.getDest();
    this.print();
    }
    if( this.play === 1) {
    console.log("Lose")
   } else if( this.play === 2) {
   console.log("Win")
  }
    console.log("Goodbye")
  }

}




const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

console.log(Field.generateField(5,5, 0.3));
myField.init();
myField.playing();