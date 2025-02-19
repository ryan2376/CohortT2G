// 1. Check if a String is a Palindrome
// Write a function to determine if a given string is a palindrome. A palindrome is a string that reads the same forward and backward (ignoring spaces, punctuation, and case).
const isPalindrome = (input) => {
    let inputString = input.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
    let reversedString = inputString.split("").reverse().join("");

    return inputString === reversedString;
};

console.log(isPalindrome("A man, a plan, a canal, Panama"));
console.log(isPalindrome("Was it a car or a cat I saw"));
console.log(isPalindrome("Hello, World!"));

// 2. Reverse a String
// Write a function to reverse a given string.
const reversedString = (input) => {
    return input.split("").reverse().join("");
};
console.log(reversedString("ryan"));
//  3. Find the Longest Palindromic Substring
// Write a function to find the longest palindromic substring in a given string.
const longestPalindromicSubstring = (input) => {
    let longest = "";
    for (let i = 0; i < input.length; i++) {
        for (let j = i; j < input.length; j++) {
            let substring = input.slice(i, j + 1);
            if (isPalindrome(substring) && substring.length > longest.length) {
                longest = substring;
            }
        }
    }
    return longest;
};
console.log(longestPalindromicSubstring("babad"));
console.log(longestPalindromicSubstring("cbbd"));

// 4. Check if Two Strings are Anagrams
// Write a function to check if two given strings are anagrams of each other. Two strings are anagrams if they contain the same characters in the same frequency but in different orders.
// silent
// listen
const areAnagrams = (str1, str2) => {

    let sorted1 = str1.split("").sort().join("")
    let sorted2 = str2.split("").sort().join("")
    console.log(sorted1, sorted2)

    const compare = () => {
        return sorted1.includes(sorted2) ? true : false
    }
    return compare()
}
console.log(areAnagrams("listen", "silent"))
// 5. Remove Duplicates from a String
// Write a function to remove duplicate characters from a string while preserving the order of the first appearance of each character.

let removeDuplicates = (str) => {
    for (let i = 0; i < str.length; i++) {
        let stringed = str

    }
}
console.log(removeDuplicates("aaaa"))
// 6. Count Palindromes in a String
// Write a function to count how many distinct palindromes are in a given string. A palindrome is considered distinct based on its start and end position in the string.
function countDistinctPalindromes(str) {
    const palindromes = new Set(); // Use a Set to store distinct palindromes

    for (let i = 0; i < str.length; i++) {
        for (let j = i; j < str.length; j++) {
            const sub = str.substring(i, j + 1);
            if (isPalindrome(sub)) {
                palindromes.add(sub); // Add the palindrome to the Set
            }
        }
    }

    return palindromes.size;
}
const str1 = "abacaba";
const str2 = "aabbbaa";
const str3 = "abc";

console.log(`Distinct palindromes in "${str1}":`, countDistinctPalindromes(str1)); 
console.log(`Distinct palindromes in "${str2}":`, countDistinctPalindromes(str2)); 
console.log(`Distinct palindromes in "${str3}":`, countDistinctPalindromes(str3)); 

// 7. Longest Common Prefix
// Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.

// 8. Case Insensitive Palindrome
// Modify the palindrome function to be case insensitive, meaning it should ignore upper and lower case differences when checking for a palindrome.
function isCaseInsensitivePalindrome(str) {
    const lowerCaseStr = str.toLowerCase(); // Convert to lowercase
    const reversed = lowerCaseStr.split("").reverse().join("");
    return lowerCaseStr === reversed;
}

// Example usage:
const str4 = "Racecar";
const str5 = "hello";

console.log(`"${str4}" is a case-insensitive palindrome:`, isCaseInsensitivePalindrome(str4)); // Output: true
console.log(`"${str5}" is a case-insensitive palindrome:`, isCaseInsensitivePalindrome(str5)); // Output: false
