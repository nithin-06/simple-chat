const crypto = require('crypto');

function sha256Hash(input) {
    // Create a hash object using the 'sha256' algorithm
    const hash = crypto.createHash('sha256');

    // Update the hash object with the input string
    hash.update(input);

    // Generate the hashed output in hexadecimal format
    const hashedOutput = hash.digest('hex');

    return hashedOutput;
}

// Example usage:
const inputString = 'imbatman'; //imbatwoman //batcave
const hashedString = sha256Hash(inputString);
console.log('Hashed string:', hashedString);
