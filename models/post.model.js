const { Schema } = require("mongoose");

module.exports = (mongoose) => {
  const postSchema = mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      body: {
        type: String,
        required: true,
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      coverImageURL: {
        type: String,
      },
    },
    { timestamps: true }
  );

  return mongoose.model("post", postSchema);
};
