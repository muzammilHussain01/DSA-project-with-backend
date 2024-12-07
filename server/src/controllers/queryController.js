const CustemarQuery = require("../models/queryData");

exports.query = async (req, res) => {
  try {
    const { first_name, last_name, mobile, email, purpose, comments } =
      req.body;
    const custemarQuery = new CustemarQuery({
      first_name: first_name,
      last_name: last_name,
      mobile: mobile,
      email: email,
      purpose: purpose,
      comments: comments,
    });
    await custemarQuery.save();
    res.status(201).send({ message: "Query saved successfully !" });
  } catch (error) {
    res.status(500).send("Internal server error !");
  }
};

exports.getQuery = async (req, res) => {
  try {
    const queries = await CustemarQuery.find({});
    res.status(200).json(queries);
  } catch (error) {
    res.status(500).send("Internal server error !");
  }
};
