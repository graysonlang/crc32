"use strict";

const CRC_32_TABLE = (() => {
  let table = new Uint32Array(256);
  for (let i = 0; i < 256; ++i) {
    let c = i;
    for (let j = 0; j < 8; ++j) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) >>> 0 : c >>> 1;
    }
    table[i] = c;
  }
  return table;
})();

// https://en.wikipedia.org/wiki/Computation_of_cyclic_redundancy_checks#CRC-32_algorithm
export default class CRC32 {
  // Returns the 32-bit cyclic redundancy check (CRC) for the provided bytes.
  static fromBytes(bytes, init = 0) {
    let crc = (init ^ 0xFFFFFFFF) >>> 0;
    const length = bytes.length;
    for (let i = 0; i < length; ++i) {
      crc = ((crc >>> 8) ^ CRC_32_TABLE[(crc ^ bytes[i]) & 0xFF]) >>> 0;
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
  };

  static fromString(string) { return CRC32.fromBytes(new TextEncoder().encode(string)); };
};
