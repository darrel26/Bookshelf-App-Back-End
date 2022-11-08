const fs = require('fs');
const path = require('path');

const pathInput = path.resolve(__dirname, 'input.txt');

const readableStream = fs.createReadStream(pathInput, {
  highWaterMark: 15,
});

const writeableStream = fs.createWriteStream('output.txt');

readableStream.on('readable', () => {
  try {
    writeableStream.write(`${readableStream.read()}\n`);
  } catch (error) {
    console.log(error);
  }
});
