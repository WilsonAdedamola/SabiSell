const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/db');

// @route   POST /api/auth/signup
// @desc    Register a new vendor
exports.signup = async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    // 1. Check if the vendor already exists
    const existingVendor = await prisma.vendor.findUnique({
      where: { email }
    });

    if (existingVendor) {
      return res.status(400).json({ message: "A vendor with this email already exists." });
    }

    // 2. Hash the password for security
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 3. Create the vendor in the database (Default plan is FREE)
    const newVendor = await prisma.vendor.create({
      data: {
        fullName,
        email,
        phone,
        passwordHash,
        plan: "FREE" // Everyone starts on the free plan
      }
    });

    // 4. Generate a secure token so they stay logged in
    const token = jwt.sign(
      { vendorId: newVendor.id }, 
      process.env.JWT_SECRET || 'super_secret_fallback_key', 
      { expiresIn: '7d' }
    );

    // 5. Send success response (excluding the password)
    res.status(201).json({
      message: "Account created successfully!",
      token,
      vendor: {
        id: newVendor.id,
        fullName: newVendor.fullName,
        email: newVendor.email,
        plan: newVendor.plan
      }
    });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error during signup. Please try again." });
  }
};


// @route   POST /api/auth/login
// @desc    Authenticate vendor & get token
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if the vendor exists
    const vendor = await prisma.vendor.findUnique({ where: { email } });
    if (!vendor) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // 2. Check if the password matches the hashed password in the database
    const isMatch = await bcrypt.compare(password, vendor.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // 3. Generate a new secure token
    const token = jwt.sign(
      { vendorId: vendor.id }, 
      process.env.JWT_SECRET || 'super_secret_fallback_key', 
      { expiresIn: '7d' }
    );

    // 4. Send success response
    res.status(200).json({
      message: "Logged in successfully!",
      token,
      vendor: {
        id: vendor.id,
        fullName: vendor.fullName,
        email: vendor.email,
        plan: vendor.plan,
        isOnline: vendor.isOnline
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login. Please try again." });
  }
};