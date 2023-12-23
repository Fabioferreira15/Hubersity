let jwt = require("jsonwebtoken");

let secret = "aB&5*pRq#7";

const generateToken = (user, callback) => {
  let token = jwt.sign(
    {
      id:user.UserId,
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

exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
