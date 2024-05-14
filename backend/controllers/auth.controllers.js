const User = require("../models/user.model");
const crypto = require("crypto");
function generateRandomPassword(length) {
  return crypto.randomBytes(length).toString("hex");
}
//JWT dependencies
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Google Auth dependencies
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//Function to login user with token if credentials are correct
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ message: "Invalid credentials" });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(401).send({ message: "Invalid credentials" });

    //No need to include the password in sent data to frontend
    const { password: hashedPassword, ...userDetails } = user.toJSON();
    const token = jwt.sign(
      {
        ...userDetails,
      },
      process.env.JWT_SECRET,
      { algorithm: "HS256", expiresIn: "2 days" }
    );
    return res
      .status(200)
      .send({ user: userDetails, token: token, status: "success" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//Function to register user
const register = async (req, res) => {
  let { email, password, name, phone, address, userType = "USER" } = req.body;

  //missing parameters validation
  if (!email || !password || !name || !phone || !address) {
    return res.status(400).send({ message: "all fileds are required" });
  }

  try {
    //user already exists validation
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ message: "email already exists" });
    }

    //passsword validation
    if (password.length < 5) {
      return res
        .status(400)
        .send({ message: "Password must be at least 5 characters long" });
    }

    //phone validation
    if (phone.length < 8) {
      return res.status(400).send({ message: "Invalid phone number" });
    }

    //address validation
    if (address.length < 10) {
      return res.status(400).send({ message: "address not detailed enough" });
    }

    //name validation and correction
    const trimmedName = name.trim();
    const hasValidName = /^\S(.*\s+.*)*\S$/.test(trimmedName); // Name to be having at least one space in middle (first name and last name)
    if (!hasValidName) {
      return res.status(400).send({ message: "incomplete name" });
    }
    const nameParts = trimmedName.split(" ");
    const capitalizedNames = nameParts.map(
      (part) => part.charAt(0).toUpperCase() + part.slice(1) //Capitalize name parts
    );
    name = capitalizedNames.join(" ");

    //registration
    const user = new User({
      email,
      password,
      name,
      phone,
      address,
      userType,
    });
    await user.save();
    return res.status(200).send({ user, status: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

//Function to register user using Google services
const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    let user = await User.findOne({ email: payload.email });

    if (!user) {
      const password = generateRandomPassword(8);
      user = new User({
        email: payload.email,
        name: payload.name,
        phone: "0000000000",
        address: "Not provided",
        password: password,
      });
      await user.save();
    }

    const { password: hashedPassword, ...userDetails } = user.toJSON();

    const userToken = jwt.sign(
      {
        ...userDetails,
      },
      process.env.JWT_SECRET,
      { algorithm: "HS256", expiresIn: "2 days" }
    );
    return res.status(200).json({
      token: userToken,
      user: userDetails,
      status: "success",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error verifying Google token");
  }
};
module.exports = {
  login,
  register,
  googleAuth,
};
