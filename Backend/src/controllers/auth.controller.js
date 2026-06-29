const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../config/db");

// Helper to set HttpOnly Cookie
const setTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true, //
    secure: process.env.NODE_ENV === "production", // Requires HTTPS in production
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Cross-origin handling
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};

// @route   POST /api/auth/signup
exports.signup = async (req, res) => {
  try {
    let { fullName, email, phone, password } = req.body;
    email = email.toLowerCase().trim();

    const existingVendor = await prisma.vendor.findUnique({ where: { email } });
    if (existingVendor) {
      return res
        .status(400)
        .json({ message: "A vendor with this email already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newVendor = await prisma.vendor.create({
      data: { fullName, email, phone, passwordHash, plan: "FREE" },
    });

    const token = jwt.sign(
      { vendorId: newVendor.id },
      process.env.JWT_SECRET || "super_secret_fallback_key",
      { expiresIn: "7d" },
    );

    // Attach token to cookie instead of JSON
    setTokenCookie(res, token);

    res.status(201).json({
      message: "Account created successfully!",
      vendor: {
        id: newVendor.id,
        fullName: newVendor.fullName,
        email: newVendor.email,
        plan: newVendor.plan,
      },
      isOnboarded: false,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res
      .status(500)
      .json({ message: "Server error during signup. Please try again." });
  }
};

// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase().trim();

    const vendor = await prisma.vendor.findUnique({ where: { email } });
    if (!vendor)
      return res.status(400).json({ message: "Invalid email or password." });

    const isMatch = await bcrypt.compare(password, vendor.passwordHash);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password." });

    const token = jwt.sign(
      { vendorId: vendor.id },
      process.env.JWT_SECRET || "super_secret_fallback_key",
      { expiresIn: "7d" },
    );

    // Attach token to cookie instead of JSON
    setTokenCookie(res, token);

    const isOnboarded = vendor.storeLink !== null && vendor.storeLink !== "";

    res.status(200).json({
      message: "Logged in successfully!",
      vendor: {
        id: vendor.id,
        fullName: vendor.fullName,
        email: vendor.email,
        storeName: vendor.storeName,
        storeType: vendor.storeType,
        storeLink: vendor.storeLink,
        logoUrl: vendor.logoUrl,
        plan: vendor.plan,
        isOnline: vendor.isOnline,
      },
      isOnboarded,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res
      .status(500)
      .json({ message: "Server error during login. Please try again." });
  }
};

// @route   POST /api/auth/logout
// @desc    Clear the HttpOnly cookie
exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// @route   GET /api/auth/me
// @desc    Get current logged in vendor
exports.getMe = async (req, res) => {
  try {
    // Safety check to ensure the middleware passed the ID correctly
    if (!req.vendor || !req.vendor.id) {
      return res.status(401).json({ message: "Invalid token payload." });
    }

    const vendor = await prisma.vendor.findUnique({
      where: { id: req.vendor.id },
    });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const { passwordHash, ...safeVendor } = vendor;

    const isOnboarded = vendor.storeLink !== null && vendor.storeLink !== "";

    res.status(200).json({
      vendor: safeVendor,
      isOnboarded,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error checking auth status." });
  }
};
