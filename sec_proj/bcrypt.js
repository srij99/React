const bcrypt = require('bcrypt');
const saltRounds = 10;

const plainTextPassword = 'password@123';



bcrypt.hash(plainTextPassword, saltRounds, (err, hashedPassword) => {
  if (err) throw err;

  console.log('Hashed Password:', hashedPassword);

  
//   bcrypt.compare(plainTextPassword, hashedPassword, (err, result) => {
//     if (err) throw err;

//     console.log('Password Match:', result);
//   });
});
