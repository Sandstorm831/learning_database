interface User {
    firstName: string;
    lastName: string;
    age: number;
    email?: string;
}

interface Empolyee{
    name: string,
    age: number,
}

interface Manager{
    name: string, 
    department: string,
}

type GreetArg = string | number | boolean;
type TechLead = Manager & Empolyee;         // Similar to interface Techlead{ name: string, age: number, department: string}

const x: number = 1;
console.log(x);

function greet(firstName: string){
    console.log(`hello ${firstName}`);  
}

function sumFunc(a: number, b: number):number {
    return a+b;
}

function isLegal(age: number):boolean {
    return age>18?true:false;
}

function runFuncAfter1s(fn: ()=>void){
    setTimeout(fn, 1000);
}

function helloWorld():void {
    console.log("hello world");
}

greet("gukesh")
runFuncAfter1s(helloWorld)

const guk: User = {
    firstName: "gukesh",
    lastName: "domarraju",
    age: 18,
}

const arryOfNums: number[] = [1,2,3,4];


type keyInput = "up" | "down" | "left" | "right";
function dumbBinding(move: keyInput){
    return move === "up";
}

enum Direction{
    Up,
    Down,
    Left,
    Right,
}

function keyBinding(move: Direction){
    return move === Direction.Up;
}

keyBinding(Direction.Down)
console.log(Direction.Up);
console.log(Direction.Left);


type Input = string | number;

function firstEl(array: Input[]){
    return array[0];
}

const val = firstEl(["gukesh", "domarraju"]);
// console.log(val.toUpperCase()); -----> gives error

const dval = firstEl(["1", 3, 4,"sdf"]) // -----> Can give you a mix bag of inputs even if you want all inputs to either only strings or numbers only.

// Using generics

function identity<T>(arg: T):T{
    return arg;
}

let output1 = identity<String>("myString");
let output2 = identity<number>(1);


// Now line 84 and 86 problems can be solved

function firstElG<T>(arg: T[]):T{
    return arg[0];
}

let el1 = firstElG<string>(["first", "second"]);
console.log(el1.toUpperCase()); // -----> No error this time

let el2 = firstElG<number>([1,2,3,4]) // -----> and no mix bagging of inputs
