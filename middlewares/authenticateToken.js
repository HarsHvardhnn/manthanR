const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
  
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. Token is required.' });
  }


  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token is required.' });
  }

  jwt.verify(token, 'H@rsh123', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

   
    req.decoded = decoded;
    next();
  });
};

module.exports = verifyToken;
