const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const doctorModel = require("../Models/doctorModel");

// register controller
const registernontrolller = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exit", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

//login controller
const loginControlller = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User Not Found", success: false });
    }
    const ismatch = await bcrypt.compare(req.body.password, user.password);
    if (!ismatch) {
      return res
        .status(200)
        .send({ message: "Invalid credentials", success: false });
    }
    const token = jwt.sign({ id: user._id }, "XYZGHS123", { expiresIn: "1d" });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in login: ${error.message}` });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "User Not Found", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "auth error", success: false });
  }
};

const applyDoctorController = async (req, res) => {
  try {
    const newdoctor = await doctorModel({ ...req.body, status: "pending" });
    newdoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newdoctor.firstname} ${newdoctor.lastname} has Applied for Doctor Account`,
      data: {
        doctorId: newdoctor._id,
        name: newdoctor.firstname + " " + newdoctor.lastname,
        onclick: "/admin/doctors",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied Successfully ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while applying doctor",
      success: false,
    });
  }
};

//Notification controller

const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const Seennotification = user.Seennotification;
    const notifcation = user.notification;
    Seennotification.push(...notifcation);
    user.notification = [];
    user.Seennotification = notifcation;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error",
      success: false,
    });
  }
};

module.exports = {
  loginControlller,
  registernontrolller,
  authController,
  applyDoctorController,
  getAllNotificationController,
};
