
//UNRELATED CODES TO APP
// CODES  BELOW ARE
//RELATED TO THE  INHERITANCE OF THE STATIC METHOD  BEHAVIOR OF  IN THE PARENT - CHILD CLASSES RELATIONSHIPS   
class Triple {
    static triple(n){
        if(n===undefined){
            n=1;
        }
        return n*3;
    }
}
class BiggerTriple extends Triple {
    //WHEN YOU SET AS UNACCESSABLE THE METHOD BELOW
    //BIGGERTRIPLE FUNCTION CAN STILL REACH TO THE STATIC BELOW OF ITS PARENT: TRIPLE BECAUSE OF USING 'EXTENDS' ES6 KEYWORD
    static triple(n){
        return super.triple(n) * super.triple(n);
    }
}
console.log(Triple.triple()); //3
console.log(Triple.triple(6)); //18

let tp = new Triple();

console.log(BiggerTriple.triple(3));
////81 (not affected by parent's instantiation)
console.log(tp.triple());
//'tp.triple is not a function'