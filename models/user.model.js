const { createHmac, randomBytes } = require("crypto");

module.exports = (mongoose) => {
  const userSchema = mongoose.Schema(
    {
      uuid: {
        type: String,
      },
      fullName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      salt: {
        type: String,
      },
      profileImageURL: {
        type: String,
        required: false,
        default: "/images/avatar.svg",
      },
      role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
      },
    },
    { timestamps: true }
  );

  userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return;
    const salt = randomBytes(16).toString();
    const hashedPass = createHmac("sha256", salt)
      .update(user.password)
      .digest("hex");

    this.salt = salt;
    this.password = hashedPass;

    next();
  });

  userSchema.static("matchPass", async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found");

    const hashedPass = createHmac("sha256", user.salt)
      .update(password)
      .digest("hex");

    if (user.password !== hashedPass) {
      throw new Error("Incorrect password, try again!");
    }

    return user;
  });

  return mongoose.model("user", userSchema);
};
