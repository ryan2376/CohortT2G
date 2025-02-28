"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prac_1 = require("./prac");
describe('validateUsername', () => {
    // it('should return true for valid usernames', () => {
    //     expect(validateUsername('Matt1234')).toBe(true)
    //     expect(validateUsername('Alice')).toBe(false)
    //     expect(validateUsername('Bob')).toBe(false)
    // })
    it('should return false for a username with only letters', () => {
        expect((0, prac_1.validateUsername)('OnlyLetters')).toBe(false);
    });
    it('should return true for a username with letters and numbers', () => {
        expect((0, prac_1.validateUsername)('User123')).toBe(true);
    });
});
