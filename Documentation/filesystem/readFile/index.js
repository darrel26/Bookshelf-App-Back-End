const fs = require('fs');
const path = require('path');

const pathNotes = path.resolve(__dirname, 'notes.txt');

// const fileReadCallback = (error, data) => {
//   if (error) {
//     console.log('Gagal membaca berkas!');
//   }
//   console.log(data);
// };

// fs.readFile(pathNotes, 'UTF-8', fileReadCallback);

// readFile using stream method

const readableStream = fs.createReadStream(pathNotes, {
  highWaterMark: 5,
});

readableStream.on('readable', () => {
  try {
    process.stdout.write(`[${readableStream.read()}]`);
  } catch (error) {
    process.stdout.write(error);
  }
});

readableStream.on('end', () => {
  console.log('\nDone!');
});
