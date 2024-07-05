import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//================================||
//          REGISTER              ||
//================================||
const register = async (req, res, next) => {
  console.log("req", req.body);
  const { firstName, lastName, email, password } = req.body;
  console.log("body", firstName, lastName, email, password);
  const file = req.file;
  // if (!file) return res.send("failed to upload image");

  try {
    // console.log("body", req.body, req.file);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    
    const newUser = new User({
      ...req.body,
      photo: file ? file.path : "",
      password: hash,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User has been Registered successfully.",
    });

    console.log("Api successfully trigerred");
  } catch (err) {
    console.log("Api does not trigerred");
    console.log(err);
    next(err);
  }
};

//================================||
//            LOGIN               ||
//================================||
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "email and password are required.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "email or password is incorrect.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "email or password is incorrect.",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const { password: userPassword, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails } });
  } catch (err) {
    next(err);
  }
};

export { register, login };
