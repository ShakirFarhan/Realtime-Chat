import mongoose from "mongoose";
const chatSchema = mongoose.Schema(
  {
    photo: {
      type: String,
      default:
        "https://assets.materialup.com/uploads/3b63d5b6-7a26-459b-9e7d-5202bf0932db/preview.jpg",
    },
    chatName: {
      type: String,
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const chatModel = mongoose.model("Chat", chatSchema);
export default chatModel;
