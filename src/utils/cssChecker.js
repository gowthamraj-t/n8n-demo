import nthCheck from 'nth-check';

// In v1, this returned a function directly
const check = nthCheck('2n+1'); 

export function isThirdElement(index) {
    return check(index);
}