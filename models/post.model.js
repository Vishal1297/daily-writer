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
      userId: {
        type: String,
        required: true,
        unique: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

  postSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.uuid = _id;
    return object;
  });

  return mongoose.model("post", postSchema);
};
