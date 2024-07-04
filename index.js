const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('signal', (data) => {
    console.log('Received signal:', data);
    socket.broadcast.emit('signal', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





// const crypto = require('crypto');
// const fs = require('fs');

// // Generate a pair of keys (private and public) and save to files
// function generateKeys() {
//   const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
//     modulusLength: 2048,
//   });

//   // Save the private key to a file
//   fs.writeFileSync('private_key.pem', privateKey.export({
//     type: 'pkcs1',
//     format: 'pem',
//   }));

//   // Save the public key to a file
//   fs.writeFileSync('public_key.pem', publicKey.export({
//     type: 'spki',
//     format: 'pem',
//   }));

//   console.log('Keys generated and saved to files.');
// }

// // Generate a digital signature
// function signData(data) {
//   const privateKey = fs.readFileSync('private_key.pem', 'utf8');
//   const sign = crypto.createSign('SHA256');
//   sign.update(data);
//   sign.end();
//   const signature = sign.sign(privateKey, 'hex');
//   return signature;
// }

// // Verify a digital signature
// function verifySignature(data, signature) {
//   const publicKey = fs.readFileSync('public_key.pem', 'utf8');
//   const verify = crypto.createVerify('SHA256');
//   verify.update(data);
//   verify.end();
//   return verify.verify(publicKey, signature, 'hex');
// }

// // Example usage
// // Uncomment the following line to generate keys (run only once)
// // generateKeys(); 

// const data = 'This is some data to sign';
// const signature = signData(data);

// console.log('Data:', data);
// console.log('Signature:', signature);

// const isVerified = verifySignature(data, signature);
// console.log('Is the signature valid?', isVerified);


// const crypto = require('crypto');
// const fs = require('fs');
// const path = require('path');

// // Generate a digital signature
// function signData(data) {
//   const privateKeyPath = path.join(__dirname, 'private_key.pem');
  
//   if (!fs.existsSync(privateKeyPath)) {
//     console.error('Private key file not found. Make sure to generate the keys first.');
//     process.exit(1);
//   }

//   const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
//   const sign = crypto.createSign('SHA256');
//   sign.update(data);
//   sign.end();
//   const signature = sign.sign(privateKey, 'hex');
//   return signature;
// }

// // Verify a digital signature
// function verifySignature(data, signature) {
//   const publicKeyPath = path.join(__dirname, 'public_key.pem');

//   if (!fs.existsSync(publicKeyPath)) {
//     console.error('Public key file not found. Make sure to generate the keys first.');
//     process.exit(1);
//   }

//   const publicKey = fs.readFileSync(publicKeyPath, 'utf8');
//   const verify = crypto.createVerify('SHA256');
//   verify.update(data);
//   verify.end();
//   return verify.verify(publicKey, signature, 'hex');
// }

// // Example usage
// const data = 'This is some data to sign';
// const signature = signData(data);

// console.log('Data:', data);
// console.log('Signature:', signature);

// const isVerified = verifySignature(data, signature);
// console.log('Is the signature valid?', isVerified);

// // Alter the signature to simulate tampering
// const tamperedSignature = signature.slice(0, -1) + (signature.slice(-1) === '0' ? '1' : '0');

// console.log('Tampered Signature:', tamperedSignature);

// // Verify the valid signature
// const isValidSignature = verifySignature(data, signature);
// console.log('Is the valid signature correct?', isValidSignature);

// // Verify the tampered signature
// const isTamperedSignatureValid = verifySignature(data, tamperedSignature);
// console.log('Is the tampered signature correct?', isTamperedSignatureValid);


