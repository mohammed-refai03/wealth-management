const fs = require('fs');
const readline = require('readline');

async function findInTranscript() {
  const stream = fs.createReadStream('C:\\Users\\ELCOT\\.gemini\\antigravity\\brain\\dc12136a-5ef0-4e93-9831-4a86ea93fecc\\.system_generated\\logs\\transcript_full.jsonl');
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });

  let lineNum = 0;
  for await (const line of rl) {
    lineNum++;
    if (line.includes('Showing lines 110-145 of 1154') && line.includes('about.html')) {
      console.log(`about.html read at line ${lineNum}`);
    }
    if (line.includes('Showing lines 110-150 of 1310') && line.includes('services.html')) {
      console.log(`services.html read at line ${lineNum}`);
    }
  }
}

findInTranscript();
