const process = require('process');

const initialMemoryUsage = process.memoryUsage().heapUsed;
const yourName = process.argv[3];
const environment = process.argv[4];

for (let i = 0; i <= 10000; i++) {
  // Proses looping ini akan membuat penggunaan memori naik
}

const currentMemoryUsage = process.memoryUsage().heapUsed;
console.log(`Hai, ${yourName}`);
console.log(`Mode environment: ${environment}`);
console.log(
  `Penggunaan memori dari ${initialMemoryUsage} naik ke ${currentMemoryUsage}`
);

/* 

Command : node process.js Dionisius Darrel Production'
Output  : 

Hai, Darrel
Mode environment: Production
Penggunaan memori dari 3089160 naik ke 3092840
 
*/
