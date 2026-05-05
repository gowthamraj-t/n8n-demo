import { compile, parse } from 'nth-check';

const check = compile(parse('2n+1'));

export function isThirdElement(index) {
    return check(index);
}