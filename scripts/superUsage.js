//UNRELATED CODES TO APP
// CODES  BELOW ARE
//RELATED TO THE BEHAVIOR OF THE JS ACCORDING TO  PRIMARY LOCATION OF THE 'THIS' AND 'SUPER' KEYWORDS OF ES6 JS
class Rectangle {
    constructor(height , width){
        this.name = 'Rectangle';
        this.height = height ;
        this.width = width ;

    }
    sayName(){
        console.log('Hi, I am a', this.name + '.');
    }
    get area(){
        return this.height * this.width;
    }
    set area(value){
        this._area = value;
    }
}
class Square extends Rectangle {
    constructor(length){
        this.height; //Rfrnc Err, super needs to be called first!!!!!!!

        //Here, it calls the parent class's constructor with lengths
        //provided for the Rectangle's width and height
        super(length , length);

        //Note: In derived classes, super() must be called before you can use 'this'.
        //Leaving this out will cause a Reff ERR

    }
}