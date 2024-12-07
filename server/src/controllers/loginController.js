const SignupData = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await SignupData.findOne({ email });

    if (!user) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const token = await user.generateAuthToken();
    res.cookie("jwt_login_cookie", token, { httpOnly: true });
    res.status(200).send({ message: "Login successful", token });
    console.log("login successfull !");
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};
