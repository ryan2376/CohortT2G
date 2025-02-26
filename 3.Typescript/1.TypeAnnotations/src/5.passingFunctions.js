"use strict";
// functions in TS can be passed as arguments to other functions, which is a fundamental concept in functional programming
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// using the function type
const mapOverItems = (items, map) => {
    return items.map(map);
};
// you define the function type inline
const mapOverItems1 = (items, map) => {
    return items.map(map);
};
// how to use a function that takes another fxn as a parameter
const arrayOfItems = mapOverItems(['1', '2', '3', '4', '5'], (item) => {
    return Number(item);
});
console.log(arrayOfItems);
const loggedInfo = (user) => {
    return 123;
};
console.log(loggedInfo);
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('https/www.ryan.com');
    const data = response.json();
    return data;
});
// passing Generic types to functions
function processItems(items, processor) {
    items.forEach(processor);
}
processItems([1, 2, 3], (item) => console.log(item * 2));
const data1 = [1, 2, 3, 4, 5];
data1.map((item) => item * 3);
