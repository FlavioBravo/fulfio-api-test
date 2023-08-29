const mongoose = require("mongoose");
const Incident = mongoose.model("Incident");
const constants = require("../utils/constants");
const keys = require("../config/key");

const PostCreateIncident = async (req, res) => {
  const body = req.body;

  try {
    const incidentTotal = await Incident.find({}).countDocuments();

    const newIncident = new Incident({
      incident_id: incidentTotal + 1,
      type: body.type,
      message: body.message,
    });

    await newIncident.save();

    return res.status(200).send({
      success: true,
      message: "Incident was created successfully",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const GetIncidentList = async (req, res) => {
  try {
    const incidents = await Incident.find({});

    res.status(200).send({
      success: true,
      payload: incidents,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const PatchResolveIncident = async (req, res) => {
  const body = req.body;
  try {
    const result = await Incident.updateOne(
      { incident_id: body.incident_id },
      { status: constants.RESOLVED_INCIDENT }
    );

    res.status(200).send({
      success: true,
      payload: result,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  GetIncidentList,
  PatchResolveIncident,
  PostCreateIncident,
};
