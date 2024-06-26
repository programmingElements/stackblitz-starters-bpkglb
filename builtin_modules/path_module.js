const path = require('path');

console.log('Dirname : ');
console.log(path.dirname(__filename));
console.log('Filename : ');
console.log(path.basename(__filename));
console.log('Extname : ');
console.log(path.extname(__filename));

console.log('File Details : ');
console.log(path.parse(__filename));
