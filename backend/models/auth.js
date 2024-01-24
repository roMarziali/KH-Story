const fs = require('fs');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function authenticate(login, password) {
  try {
    const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
    const user = users.find(user => user.login === login);
    if (!user) throw Error('User not found');
    const comparePassword = await bcrypt.compare(password, user.password);
    if (comparePassword) {
      await logAuthAttempt(login, true);
      return user;
    }
    throw Error('Password does not match');
  } catch (err) {
    console.error(err);
    await logAuthAttempt(login, false);
    return null;
  }
}

async function generateToken(user) {
  const jwtKey = fs.readFileSync('./data/jwt-key', 'utf8');
  const token = jwt.sign(
    { userId: user.id },
    jwtKey
  );
  return token;
}

module.exports = {
  authenticate,
  generateToken
}

async function logAuthAttempt(login, success) {
  try {
    const authAttempts = JSON.parse(fs.readFileSync('./data/auth-attempts.json', 'utf8'));
    authAttempts.push({
      login,
      success,
      timestamp: Date.now()
    });
    fs.writeFileSync('./data/auth-attempts.json', JSON.stringify(authAttempts));
  } catch (err) {
    console.error(err);
  }
}
