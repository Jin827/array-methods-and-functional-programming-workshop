function forEach(callback, theArray) {
  for(var i=0; i<theArray.length; i++){
    callback(theArray[i]);
  }
}


function map(mappingFunction, theArray) {
  var mappedArray = [];
 
  forEach(function(val){
    mappedArray.push(mappingFunction(val))
  }, theArray)
  // the loop will execute & will call the mappingFunction through each iter
  return mappedArray;
}
//Call stack => map => forEach => anonymousFunction ('mappingFunction') => multiplyByTwo 

//function multiplyByTwo(val){
//  return val * 2;
//}


function filter(predicate, theArray) {
  var filteredArray = [];

  forEach(function(val){
    if(predicate(val)){
      filteredArray.push(val)
    }
  }, theArray)
  return filteredArray;
}
//function isEven(x){
//  return x % 2 === 0
//} 
// => retrun of predicate function : true or false


function every(predicate, theArray) {
  var boolean = true;
  for(var i=0; i<theArray.length; i++){
    //retrun of predicate function : true or false
    if(!predicate(theArray[i])){
      boolean = false;
      break;
      //break will stop the execution of more execution of code and/or case testing inside the block.
    }
    //else {
    //  boolean = true;
    //}
  }
  return boolean;
}


function some(predicate, theArray) {
  var boolean = false;
  for(var i=0; i<theArray.length; i++){
    if(predicate(theArray[i])){
      boolean = true;
      break;
    }
  }
  return boolean;
}

function indexOf(item, theArray) {
  var index = -1;
  for(var i=0; i<theArray.length; i++){
    if( item === (theArray[i]) ){
      index = i
      break;
    }
  }
  return index;
}


function findIndex(predicate, theArray) {
  var index = -1;
  for(var i=0; i<theArray.length; i++){
    if( predicate(theArray[i]) ){
      index = i
      break;
    }
  }
  return index;
}
//Fundamental difference between "indexOf" N "findIndex" ?!
//FindIndex, you can pass callback function to execute on each value in the array.
//FindIndex can implement a predicate to test complex elements of an array (a nested array, an object, etc)
//Whereas indexOf will return false if we're comparing 2 equal elements that are not direct references of the same object


function first(n, theArray) {
  //The "arguments" object is not an Array. It is similar to an Array, but does not have any Array properties except length
  // console.log(arguments)                             //{ '0': [ 4, 5, 6 ] }
  // console.log(arguments.length)                      //1
  // console.log(arguments[0])                          //[ 4, 5, 6 ]
  // console.log(arguments[0][0])                       //4
  // console.log(arguments[0][arguments[0].length-1])   //6
  
  var newArray= [];
  
  if( typeof n === "object" ){
    return n[0]
  }
  else {
      if(n < 0){
        return [];
      }
      else if(n <= theArray.length){
        for(var i=0; i< n; i++){
        newArray.push(theArray[i])
        }
        return newArray;
      }
      else {
        return theArray;
      }
  }
}
// first([4,5,6]); // 4
// first(2, ['a','b','c','d']); // ['a','b']
// first(1, ['a','b','c']); // ['a']
// first(10, ['a','b','c']); // ['a','b','c']


function last(n, theArray) {
  var newArray= [];
  
  if( typeof n === "object" ){
    return n[n.length-1]
  }
  else {
      if(n < 0){
        return [];
      }
      else if(n <= theArray.length){       
        for(var i=(theArray.length)-n; i<=theArray.length-1; i++){
        newArray.push(theArray[i])
        }
        return newArray;
      }
      else {
        return theArray;
      }
  }
}


function pluck(property, arrayOfObjects) {
  
  resultArray= [];
  for(var i=0; i<arrayOfObjects.length; i++){
    resultArray.push(arrayOfObjects[i][property])
    //<ways to access properties in JS>
    //value.x : the part after the dot must be a valid variable name, and it directly names the property
    //value[x] : 1. the expression between the brackets is evaluated to get the property name
    //           2. value[2] or value["John Doe"] ;; “2” & “John Doe” -> Not valid variable names and so cannot be accessed through dot notation
  }
  return resultArray;
}


function flatten(theArray) {
  //concat merges two or more arrays so we can merge a bunch of nested arrays into one array (RA)
  //by adding those nested arrays to the end of RA. Of course those nested arrays 
  //can also have more nested arrays so we perfrom flatten recursively within concat
  var resultArray = [];
  for(var i=0; i< theArray.length; i++){
    if( Array.isArray(theArray[i]) ){
      resultArray= resultArray.concat( flatten(theArray[i]) ) 
    }
    else{
      resultArray.push(theArray[i])
    }
  }
  //console.log(resultArray)
  return resultArray; 
}
//flatten( [ [ ['hello'], 'world' ], 'hyojin' ] ); 

//[ 'hello' ]
//[ 'hello', 'world' ]
//[ 'hello', 'world', 'hyojin' ]


function negate1(predicate) {
  return function(value){
      return !predicate(value);
  }
}
// function isEven(num) {
//     return num % 2 === 0;
// }
// isEven(3); // false

// var isOdd = negate1(isEven); // function that returns the opposite of isEven for the same input
// isOdd(3);  // true


function negate2(predicate) {
  //if you want to dynamically play with variable # of arguments in JS functions you can use the
  //'arguments' is an object but behaves like an array but does not have any fields nor methods except length
  //BUT it can be converted to a real array with Array.from(arguments)
  //Use arguments.length to determine # of args and function.length to determine # of params in function signature

  //recall that functions are objects and first-class citizens. Functions are objects => have methods
  
  //call()  ; accepts an argument list              //functionName.call( Obj, a, b, c )
  //apply() ; accepts a single array of arguments   //functionName.call( Obj, arr )     //var arr= [a, b, c]

  //can use call() and apply() to temporarily allow us to use methods on an object that are NOT methods of it by 'combining' the method
  //bind() 'binds' the method to the object instance i.e. var bound = fooFun.bind(objectOne); DOES NOT execute function like call & apply(Go Line 235)
  
  

  //console.log(arguments, "negate2 arguments")     //1.{ '0': [Function: firstDividesSecond] }
  return function(){
    //console.log(arguments, "callback arguments")  //3.{ '0': 4, '1': 5 } from "firstDoesNotDivideSecond(4,5)"
    return !predicate.apply(null, arguments); 
  }
}
// function firstDividesSecond(first, second) {
//     return second % first === 0;
// }

// var firstDoesNotDivideSecond = negate2(firstDividesSecond);

// console.log(firstDividesSecond(4,5), "first")         //2.flase
// console.log(firstDoesNotDivideSecond(4,5), "second")  //4.true


//<Class vs Object vs Instance in OO programming>
//CLASS: a blueprint or template that is used to create objects ( field, static field, method, static method and constructor )
//OBJECT: a software bundle of related state and behavior (state(fieldS), behavior(methodS))
//INSTANCE: a single and unique unit of a class that representing an Object

//EX> we have a blueprint (class) represents student (object) with fields like name, age, course (class member). 
//And we have 2 students here, Foo and Bob. So, Foo and Bob is 2 different instances of the class (Student class) that represent object (Student people).


function compose1(fun1, fun2) {
  return function(arg){
    return fun1(fun2(arg));
  }
}
// function scream(str) {
//     return str.toUpperCase();
// }
// function shout(str) {
//     return str + '!!!';
// }

// var screamAndShout = compose1(shout, scream);

// screamAndShout('Hello World');


function compose2(arrOfFuncs) {
  return function(argument){
    for(var i= (arrOfFuncs.length-1); i>= 0; i--){
      argument= arrOfFuncs[i](argument)
    }
    //argument= arrOfFuncs[i].call(this,argument)
    //'call()' will call the function that exists in the current array element from the last element
    //iteratively and applying an argument (which will change each iteration[i.e. each function call])
    //'this' refers to the context current array element which is a function
  
  return argument;
  } 
}
// // Takes a string, returns a string
// function toLowerCase(str) {
//    return str.toLowerCase();
// }
// // Takes a string, returns an array
// function splitByWord(str) {
//     return str.split(' ');
// }
// // Takes an array, returns a string
// function joinWithDashes(arrOfWords) {
//     return arrOfWords.join('-');
// }

// //Takes a string, returns a string by doing toLowerCase -> splitByWord -> joinWithDashes
// var createSlug = compose2([joinWithDashes, splitByWord, toLowerCase]);

// createSlug('The Quick Brown Fox'); // the-quick-brown-fox

/***** DO NOT EDIT AFTER THIS LINE *****/
module.exports = {
    forEach: forEach,
    map: map,
    filter: filter,
    every: every,
    some: some,
    indexOf: indexOf,
    findIndex: findIndex,
    first: first,
    last: last,
    pluck: pluck,
    flatten: flatten,
    negate1: negate1,
    negate2: negate2,
    compose1: compose1,
    compose2: compose2
};
