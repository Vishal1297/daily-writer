module.exports = (mongoose) => {
  const postSchema = mongoose.Schema(
    {
      uuid: {
        type: String,
      },
      title: {
        type: String,
        required: true,
      },
      body: {
        type: String,
        required: true,
      },
      createdBy: {
        type: String,
        required: true,
        ref: "user",
      },
      coverImageURL: {
        type: String,
      },
    },
    { timestamps: true }
  );

  postSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.uuid = _id;
    return object;
  });

  return mongoose.model("Post", postSchema);
};
