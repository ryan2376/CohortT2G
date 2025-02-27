import { validateUsername } from './prac';

describe('validateUsername', () => {

    // it('should return true for valid usernames', () => {
    //     expect(validateUsername('Matt1234')).toBe(true)
    
    //     expect(validateUsername('Alice')).toBe(false)
    
    //     expect(validateUsername('Bob')).toBe(false)
    // })

    it('should return false for a username with only letters', () => {
        expect(validateUsername('OnlyLetters')).toBe(false);
    });

    it('should return true for a username with letters and numbers', () => {
        expect(validateUsername('User123')).toBe(true);
    });
    
});




