import LetterRequests from "../model/LetterRequestModel.js";

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
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({
      message: "Get letter type by id success",
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
    }
    res.status(201).json({
      message: "Successfully created letter request",
      data: response,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const agreementLetterRequest = async (req, res) => {
  
};
