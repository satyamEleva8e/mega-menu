import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "menu",
        default: null,
    },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: "menu" }],
});

export const menuModel = mongoose.model("menu", menuSchema);
