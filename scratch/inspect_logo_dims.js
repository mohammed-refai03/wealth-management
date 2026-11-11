const fs = require('fs');

function getWebPDimensions(buffer) {
  // Check RIFF header
  if (buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WEBP') {
    return null;
  }
  const chunkType = buffer.toString('ascii', 12, 16);
  if (chunkType === 'VP8 ') {
    // Lossy VP8
    const width = buffer.readUInt16LE(26) & 0x3fff;
    const height = buffer.readUInt16LE(28) & 0x3fff;
    return { type: 'VP8', width, height };
  } else if (chunkType === 'VP8L') {
    // Lossless VP8L
    const b0 = buffer.readUInt8(21);
    const b1 = buffer.readUInt8(22);
    const b2 = buffer.readUInt8(23);
    const b3 = buffer.readUInt8(24);
    const width = 1 + (((b1 & 0x3f) << 8) | b0);
    const height = 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6));
    return { type: 'VP8L', width, height };
  } else if (chunkType === 'VP8X') {
    // Extended VP8X
    const width = 1 + buffer.readUIntLE(24, 3);
    const height = 1 + buffer.readUIntLE(27, 3);
    return { type: 'VP8X', width, height };
  }
  return { type: chunkType };
}

const buf = fs.readFileSync('assets/images/logo.webp');
console.log('File size:', buf.length);
console.log('Dims:', getWebPDimensions(buf));
