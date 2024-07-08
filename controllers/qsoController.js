const Qso = require('../models/Qso');
const asyncHandler = require('express-async-handler');

const createNewQso = asyncHandler(async (req, res) => {
    const { callsign, rst_received, rst_sent, op, qth, comments } = req.body;

    if (!callsign || !rst_received || !rst_sent) {
        return res.status(422).json({ message: 'Unprocessable Entity: Callsign, RST received, and RST sent are required' });
    }

    try {
        const createQso = await Qso.create({ callsign, rst_received, rst_sent, op, qth, comments });

        if (createQso instanceof Qso) {
            res.status(201).json({ message: `New QSO ${callsign} created`, qso: createQso });
        } else {
            res.status(422).json({ message: 'Unprocessable Entity: QSO creation failed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the QSO', error: error.message });
    }
});

const getAllQso = asyncHandler(async (req, res) => {
  try {
      const qsos = await Qso.find().lean();
      if (!qsos.length) {
          return res.status(404).json({ message: 'No QSOs found' });
      }
      res.json(qsos);
  } catch (error) {
      res.status(500).json({ message: 'An error occurred while retrieving QSOs', error: error.message });
  }
});

const updateQso = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { callsign, rst_received, rst_sent, op, qth, comments } = req.body;

  if (!id) {
      return res.status(400).json({ message: 'QSO ID required' });
  }

  const fieldsToUpdate = {};
  if (callsign !== undefined) fieldsToUpdate.callsign = callsign;
  if (rst_received !== undefined) fieldsToUpdate.rst_received = rst_received;
  if (rst_sent !== undefined) fieldsToUpdate.rst_sent = rst_sent;
  if (op !== undefined) fieldsToUpdate.op = op;
  if (qth !== undefined) fieldsToUpdate.qth = qth;
  if (comments !== undefined) fieldsToUpdate.comments = comments;

  if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({ message: 'No changes requested' });
  }

  try {
      const qso = await Qso.findByIdAndUpdate(id, fieldsToUpdate, { new: true });

      if (qso) {
          res.status(200).json({ message: `QSO ${id} updated`, qso });
      } else {
          res.status(404).json({ message: 'QSO not found' });
      }
  } catch (error) {
      res.status(500).json({ message: 'An error occurred while updating the QSO', error: error.message });
  }
});

const deleteQso = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
      return res.status(400).json({ message: 'QSO ID required' });
  }

  try {
      const qso = await Qso.findById(id).exec();

      if (!qso) {
          return res.status(404).json({ message: 'QSO not found' });
      }

      await Qso.deleteOne({ _id: id });

      res.json({ message: `QSO with ID ${id} deleted` });
  } catch (error) {
      res.status(500).json({ message: 'An error occurred while deleting the QSO', error: error.message });
  }
});

module.exports = {
    createNewQso,
    getAllQso,
    updateQso,
    deleteQso
    // Other QSO-related functions (get, update, delete) will go here
};
