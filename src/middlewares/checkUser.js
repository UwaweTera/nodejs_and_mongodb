import { Signup } from "../model/registerMod";

const checkingUser = async (req, res, next) => {
  const user = await Signup.findOne({ _id: req.user._id, role: "admin" });
  if (user) {
    return res.status(401).json("only user allowed");
  }
  next();
};

const checkingAdmin = async (req, res, next) => {
  const user = await Signup.findOne({ _id: req.user._id, role: "admin" });
  if (!user) {
    return res.status(401).json("only admin allowed");
  }
  next();
};

export { checkingAdmin, checkingUser };
