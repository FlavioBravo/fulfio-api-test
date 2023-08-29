const mongoose = require("mongoose");
const constants = require("../utils/constants");
const { Schema } = mongoose;

const IncidentSchema = new Schema({
  incident_id: { type: String, required: true },
  type: { type: String, required: true },
  message: { type: String, required: false },
  status: { type: String, default: constants.PENDING_INCIDENT },
  created_at: { type: Date, default: Date.now },
});

mongoose.model("Incident", IncidentSchema);
