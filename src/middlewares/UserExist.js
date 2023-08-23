import mongoose from "mongoose";
import { Signup } from "../model/registerMod";

export const UserExist = async (req, res, next) => {
  try {
    const userId = req.params.id || req.user.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ status: 400, message: "Invalid user" });
    }

    const user = await Signup.findOne({ _id: userId });
    if (!user || user == null) {
      return res
        .status(404)
        .json({ status: 404, message: "user does not exist" });
    }
    // req.dispute = dispute;
    next();
  } catch (error) {
    return res.status(500).json({ status: 500, error: "server error" });
  }
};
