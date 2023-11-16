/* 
createSlug dovrebbe ritornare una stringa
createSlug dovrebbe ritornare una stringa in lowercase
createSlug dovrebbe ritornare una stringa con gli spazi sostituiti da -
createSlug dovrebbe incrementare di 1 lo slug quando esiste già
createSlug dovrebbe lanciare un errore in caso di titolo non presente o formato errato
createSlug dovrebbe lanciare un errore se manca l’array dei post
*/
const slugGenerator = require('../lib/slugGenerator');

test('should return a string', () => {
    const test = 'This is a test'
    expect(typeof slugGenerator(test)).toBe('string');
  });

test('should return a string in lowercase', () => {
    const test = 'This is a test'
    expect(slugGenerator(test)).toBe('this-is-a-test');
  })

test('should return a string with dash instead of spaces all lowercase', () => {
    const test = 'This is a test'
    expect(slugGenerator(test)).toBe('this-is-a-test');
  });

test('should avoid special characters', () => {
    const test = 'This is a test!'
    expect(slugGenerator(test)).toBe('this-is-a-test');
  })

test('should avoid more than 1 dash in a row', () => {
    const test = 'This is a test ! = ?'
    expect(slugGenerator(test)).toBe('this-is-a-test');
  })

test('should increment slug by 1 if already exists', () => {
    const test = 'esplorando-il-potere'
    expect(slugGenerator(test)).toBe('esplorando-il-potere-1');
})
