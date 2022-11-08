const fs = require('fs');

const writeableStream = fs.createWriteStream('output.txt');

writeableStream.write('First row!\n');
writeableStream.write('Second row!\n');
writeableStream.end('End row!\n');
