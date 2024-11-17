import LetterRequests from "../model/LetterRequestModel.js";
import LetterTypes from "../model/LetterTypeModel.js";
import Users from "../model/UserModel.js";

export const getLetterRequests = async (req, res) => {
  try {
    const response = await LetterRequests.findAll({
      attributes: [
        "uuid",
        "userId",
        "letterTypeId",
        "description",
        "status",
        "description_admin",
        "link_file",
        "createdAt",
        "updatedAt",
      ],
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Users,
          attributes: ["name", "email", "role", "address"],
        },
        {
          model: LetterTypes,
          attributes: ["name", "description"],
        },
      ],
    });
    res.status(200).json({
      message: "Get all letter request success",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLetterRequestsById = async (req, res) => {
  try {
    const response = await LetterRequests.findOne({
      attributes: [
        "uuid",
        "userId",
        "letterTypeId",
        "description",
        "status",
        "description_admin",
        "link_file",
      ],
      where: {
        uuid: req.params.id,
      },
      include: [
        {
          model: Users,
          attributes: ["name", "email", "role", "address"],
        },
        {
          model: LetterTypes,
          attributes: ["name", "description"],
        },
      ],
    });
    res.status(200).json({
      message: "Get letter request by id success",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createLetterRequest = async (req, res) => {
  try {
    const { userId, letterTypeId, description } = req.body;
    const letterRequest = await LetterRequests.create({
      userId: userId,
      letterTypeId: letterTypeId,
      description: description,
    });
    const response = {
      userId: letterRequest.userId,
      letterTypeId: letterRequest.letterTypeId,
      description: letterRequest.description,
      status: letterRequest.status,
    };
    res.status(201).json({
      message: "Successfully created letter request",
      data: response,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const agreementLetterRequest = async (req, res) => {
  const letterRequest = await LetterRequests.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!letterRequest) {
    res.status(404).json({ message: "Letter request not found" });
  }

  try {
    const { status, description_admin } = req.body;
    await LetterRequests.update(
      {
        status: status,
        description_admin: description_admin,
        link_file: "ini link yaaa",
      },
      {
        where: {
          uuid: req.params.id,
        },
      }
    );
    const response = await LetterRequests.findOne({
      attributes: [
        "uuid",
        "userId",
        "letterTypeId",
        "description",
        "status",
        "description_admin",
        "link_file",
      ],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({
      message: "Agreement letter requests success",
      data: response,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getLetterRequestsByUser = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        uuid: req.session.userId,
      },
      attributes: ["id"],
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Menggunakan ID user untuk mengambil data letter requests
    const response = await LetterRequests.findAll({
      attributes: [
        "uuid",
        "userId",
        "letterTypeId",
        "description",
        "status",
        "description_admin",
        "link_file",
        "createdAt",
        "updatedAt",
      ],
      where: {
        userId: user.id,
      },
      include: [
        {
          model: Users,
          attributes: ["name", "email", "role", "address"],
        },
        {
          model: LetterTypes,
          attributes: ["name", "description"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      message: "Get letter requests for specific user success",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
