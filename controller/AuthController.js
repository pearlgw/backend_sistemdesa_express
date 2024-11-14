import argon2 from "argon2";
import Users from "../model/UserModel.js";

export const Register = async (req, res) => {
  const { name, email, password, confPassword, address } = req.body;
  if (password !== confPassword) {
    res
      .status(400)
      .json({ message: "Password & confirmation password tidak cocok" });
  }

  const existingUser = await Users.findOne({
    where: {
      email: email,
    },
  });
  if (existingUser) {
    res.status(400).json({ message: "Email sudah terdaftar" });
  }

  const hashPassword = await argon2.hash(password);
  try {
    const user = await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      address: address,
    });

    const response = {
        uuid: user.uuid,
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
    }
    
    res.status(201).json({
      message: "Create successfully",
      data: response,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const Login = async (req, res) => {
    
};
export const Me = async (req, res) => {};
export const Logout = async (req, res) => {};
