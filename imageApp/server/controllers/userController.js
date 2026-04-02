const User = require("../models/User");
const cloudinary = require("../config/cloudinary");

exports.createUser = async (req, res) => {
  try {
    const { imageName, imageNumber } = req.body;

    if (!imageName || !imageNumber) {
      return res.status(400).json({ error: "Image name and image number are required." });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required." });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const newUser = new User({
      imageName,
      imageNumber,
      image: result.secure_url,
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error("createUser error", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};