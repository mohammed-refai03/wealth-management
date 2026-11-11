const fs = require('fs');
const readline = require('readline');

async function searchTranscript() {
  const fileStream = fs.createReadStream('C:\\Users\\ELCOT\\.gemini\\antigravity\\brain\\dc12136a-5ef0-4e93-9831-4a86ea93fecc\\.system_generated\\logs\\transcript.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let lineNum = 0;
  for await (const line of rl) {
    lineNum++;
    if (line.includes('about.html') || line.includes('services.html')) {
      console.log(`Line ${lineNum}: length ${line.length}`);
    }
  }
}

searchTranscript();
