const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  // 1. Check if the request has an authorization header with a "Bearer" token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Extract the token (Format: "Bearer xyz123...")
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify the token using our secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_fallback_key');

      // 4. Attach the vendor's ID to the request so our controllers know who is asking
      req.vendor = { id: decoded.vendorId };

      // 5. Let them pass!
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      return res.status(401).json({ message: "Not authorized, token failed or expired." });
    }
  }

  // If there was no token at all
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token provided." });
  }
};

module.exports = { protect };