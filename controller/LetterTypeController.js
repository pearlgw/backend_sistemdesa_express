import LetterTypes from "../model/LetterTypeModel.js";

export const getLetterTypes = async (req, res) => {
  try {
    const response = await LetterTypes.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({
      message: "Get all letter type success",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLetterTypeById = async (req, res) => {
  try {
    const response = await LetterTypes.findOne({
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

export const createLetterType = async (req, res) => {
  try {
    const { name, description } = req.body;
    const response = await LetterTypes.create({
      name: name,
      description: description,
    });
    res.status(201).json({
      message: "Successfully created letter data",
      data: response,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateLetterType = async (req, res) => {
  const letterType = await LetterTypes.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!letterType) {
    res.status(404).json({ message: "Letter type not found" });
  }

  try {
    const { name, description } = req.body;
    await LetterTypes.update(
      {
        name: name,
        description: description,
      },
      {
        where: {
          uuid: req.params.id,
        },
      }
    );
    const response = await LetterTypes.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({
      message: "Update letter type success",
      data: response,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteLetterType = async (req, res) => {
  const letterType = await LetterTypes.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!letterType) {
    res.status(404).json({ message: "Letter type not found" });
  }

  try {
    await LetterTypes.destroy({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({
      message: "Delete letter type success",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
