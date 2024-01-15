let jwt = require("jsonwebtoken");
require("dotenv").config();

let secret = process.env.SECRET;

const generateToken = (user, callback) => {
  let token = jwt.sign(
    {
      id: user.UserId,
      tipo: user.tipo_utilizador,
    },
    secret,
    { expiresIn: "24h" }
  );
  return callback(token);
};

const verifyToken = (token) => {
  if (!token) {
    return false;
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), secret);
    console.log(decoded);
    return decoded;
  } catch (err) {
    return null;
  }
};

const generateQrToken = (qrData, callback) => {
  let qrToken = jwt.sign(
    {
      qrData: qrData,
    },
    secret,
    { expiresIn: "24h" }
  );
  return callback(qrToken);
};

const verifyQrToken = (qrToken) => {
  if (!qrToken) {
    return false;
  }

  try {
    const decoded = jwt.verify(qrToken.replace("Bearer ", ""), secret);
    return decoded;
  } catch (err) {
    return null;
  }
};



exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
exports.generateQrToken = generateQrToken;
exports.verifyQrToken = verifyQrToken;
