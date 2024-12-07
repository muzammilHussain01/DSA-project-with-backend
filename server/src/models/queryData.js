const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  mobile: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  purpose: {
    type: String,
    require: true,
  },
  comments: {
    type: String,
    require: true,
  },
});

const CustemarQuery = mongoose.model("custemarQuery", querySchema);
module.exports = CustemarQuery;
