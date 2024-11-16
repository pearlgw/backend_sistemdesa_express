import argon2 from "argon2";
import Users from "../model/UserModel.js";

export const Register = async (req, res) => {
  const { name, email, password, confPassword, address } = req.body;
  if (password !== confPassword) {
    return res
      .status(400)
      .json({ message: "Password & confirmation password tidak cocok" });
  }

  const existingUser = await Users.findOne({
    where: {
      email: email,
    },
  });
  if (existingUser) {
    return res.status(400).json({ message: "Email sudah terdaftar" });
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
    };

    res.status(201).json({
      message: "Create successfully",
      data: response,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const Login = async (req, res) => {
  const user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    res.status(404).json({
      message: "User tidak ditemukan",
    });
  }
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) {
    res.status(404).json({
      message: "Password tidak cocok",
    });
  }

  req.session.userId = user.uuid;

  const userLogin = {
    uuid: user.uuid,
    name: user.name,
    email: user.email,
    address: user.address,
    role: user.role,
  };
  return res.status(200).json({
    message: "Login berhasil",
    data: userLogin,
  });
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Mohon login ke akun anda" });
  }
  const user = await Users.findOne({
    attributes: ["uuid", "name", "email", "address", "role"],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) {
    return res.status(404).json({ message: "User tidak ditemukan" });
  }
  res.status(200).json({
    message: "successfully",
    data: user,
  });
};

export const Logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(400).json({ message: "Tidak dapat logout" });
    }
    return res.status(200).json({ message: "Anda telah logout" });
  });
};
