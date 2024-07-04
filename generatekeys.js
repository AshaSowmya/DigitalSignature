const crypto = require('crypto');
const fs = require('fs');

// Generate a pair of keys (private and public) and save to files
function generateKeys() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
  });

  // Save the private key to a file
  fs.writeFileSync('private_key.pem', privateKey.export({
    type: 'pkcs1',
    format: 'pem',
  }));

  // Save the public key to a file
  fs.writeFileSync('public_key.pem', publicKey.export({
    type: 'spki',
    format: 'pem',
  }));

  console.log('Keys generated and saved to files.');
}

// Run the function to generate keys
generateKeys();
