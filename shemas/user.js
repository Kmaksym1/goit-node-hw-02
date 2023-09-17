const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Joi = require("joi");
const crypto = require("node:crypto");
// const { strict } = require("node:assert");
// const { string } = require("joi");
require("dotenv").config();

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
      require: true,
    },
    token: String, verify: {
    type: Boolean,
    default: false,
  }, verificationToken: {
    type: String,
    default:"",
  },
  },
  {
    versionKey: false,
    timestamps: true,
  },
 
 

);

const makeHash = async (password) => {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, process.env.SALT, 64, (err, hash) => {
      if (err) {
        reject(err);
      }
      resolve(hash.toString("hex"));
    });
  });
};

userSchema.methods.setPassword = async function (password) {
  try {
    this.password = await makeHash(password);
  } catch (err) {
    console.log(err.message);
  }
};

userSchema.methods.validPassword = async function (password) {
  try {
    const hash = await makeHash(password);
    return hash === this.password;
  } catch (err) {
    console.log(err.message);
  }
};

const signUpSchema = Joi.object({
  
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});
const logInSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});
const verifySchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
})
const schemas = {
  signUpSchema,
  logInSchema,
  verifySchema
};
const User = model("User", userSchema);

module.exports = {
  User,
  schemas,
};
