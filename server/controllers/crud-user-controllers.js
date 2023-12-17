const { createError } = require("../middleware/ErrorHandling");
const Cruduser = require("../models/crud-schema");

const addUserController = async (req, res, next) => {
  const { name, phone, email } = req.body;
  if (!name || !phone || !email)
    return next(
      createError("Please fill all the details..", 400, "add user controller")
    );
  try {
    const existUser = await Cruduser.findOne({ email: email });
    if (existUser)
      return next(
        createError("User already exist...", 400, "add user controller")
      );
    const addUser = new Cruduser({ ...req.body });
    await addUser.save();
    return res.status(200).json({
      success: true,
      message: "user add successfull",
    });
  } catch (error) {
    return next(createError(error.message, 500, "add user controller"));
  }
};

// get all user
const getAllUserController = async (req, res, next) => {
  try {
    const result = await Cruduser.find({});
    if (!result)
      return next(createError("No data found", 400, "get all user controller"));
    return res.status(200).json({
      success: true,
      message: "all user",
      alluser: result,
    });
  } catch (error) {
    return next(createError(error.message, 500, "get all user controller"));
  }
};
module.exports = { addUserController, getAllUserController };
