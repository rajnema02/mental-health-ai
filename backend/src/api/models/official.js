const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const officialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
  },
  { timestamps: true }
);

// Hash password before saving
officialSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare passwords
officialSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Official", officialSchema);
