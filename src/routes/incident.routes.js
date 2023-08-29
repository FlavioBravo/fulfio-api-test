const express = require("express");
const IncidentController = require("../controllers/incident.controller");
const authentication = require("../middlewares/authentication");
const api = express.Router();

api.get("/incidents", IncidentController.GetIncidentList);
api.patch(
  "/incidents/resolved",
  [authentication.AdminVerification],
  IncidentController.PatchResolveIncident
);
api.post(
  "/incidents/create",
  [authentication.UserVerification],
  IncidentController.PostCreateIncident
);

module.exports = api;
