const SignupData = require("../models/userModel");

exports.signup = async (req, res) => {
  console.log("Received signup data:", req.body);
  try {
    const signupData = new SignupData({
      first_Name: req.body.firstName,
      middle_Name: req.body.middleName,
      last_Name: req.body.lastName,
      email: req.body.email,
      re_enter_email: req.body.reEnterEmail,
      password: req.body.password,
      confirm_password: req.body.confirmPassword,
      dob: req.body.dob,
      department: req.body.department,
    });

    const token = await signupData.generateAuthToken();
    await signupData.save();
    res.status(201).send({ message: "User signed up successfully", token });
  } catch (error) {
    console.error("Error in signup handler:", error);
    res.status(500).send({ message: `Error: ${error.message}` });
  }
};
