import Users from "../model/UserModel.js";

export const getUsers = async (req, res) => {
  try {
    const response = await Users.findAll({
      attributes: ["uuid", "name", "email", "address", "role"],
    });
    res.status(200).json({
      message: "Get all data success",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await Users.findOne({
      attributes: ["uuid", "name", "email", "address", "role"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({
      message: "Get data by id success",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
