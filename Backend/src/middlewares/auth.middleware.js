const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  // 1. Check if the token exists in the secure HttpOnly cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // 2. If there is no token at all, deny access immediately
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token provided." });
  }

  try {
    // 3. Verify the token using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_fallback_key');

    // 4. Attach the vendor's ID to the request so our controllers know who is asking
    req.vendor = { id: decoded.vendorId };

    // 5. Let them pass!
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    
    // Optional: Clear the invalid cookie so the frontend knows they are fully logged out
    res.clearCookie('token'); 
    
    return res.status(401).json({ message: "Not authorized, token failed or expired." });
  }
};

module.exports = { protect };