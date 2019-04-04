import sum from '../modules/sum';

describe('Jest init test', () => {
    test('Success test', () => {
        expect(1 + 1).toBe(2);
    });
  
    test('Wrong test', () => {
        expect(sum(1,2)).toBe('2');
    });
});