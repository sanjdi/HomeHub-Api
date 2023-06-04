import remoteService from "../services/remoteService.js";

const getAllRemotes = (req, res) => {
  //get data via service layer.
  //send response to client.
  try {
    const allRemotes = remoteService.getAllRemotes();
    res.send({ status: "OK", data: allRemotes });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneRemote = (req, res) => {
  //validate input parameter.
  //if remoteId is null, then return status code 400.
  const { remoteId } = req.params;
  if (!remoteId) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "The parameter 'remoteId' is missing in request.",
      },
    });
  }

  //get data via service layer.
  //send response to client.
  try {
    const remote = remoteService.getOneRemote(remoteId);
    res.send({ status: "OK", data: remote });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createNewRemote = (req, res) => {
  const { body } = req;
  //validate input data.
  //if remote brand or numberOfSlots is null, then return status code 400.
  if (!body.brand || !body.numberOfSlots) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One or all of following keys are missing or is empty in request body. 'brand', 'numberOfSlots'",
      },
    });
    return;
  }

  //pass data to service layer for processing.
  //send response to client.
  const newRemote = {
    name: body.brand,
    numberOfSlots: body.numberOfSlots,
  };
  try {
    const createdRemote = remoteService.createNewRemote(newRemote);
    res.status(201).send({ status: "OK", data: createdRemote });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneRemote = (req, res) => {
  const { body } = req;
  //validate input parameter.
  //if remoteId is null, then return status code 400.
  const { remoteId } = req.params;
  if (!remoteId) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "The parameter 'remoteId' is missing in request.",
      },
    });
  }

  //pass data to service layer for processing.
  //send response to client.
  try {
    const updatedRemote = remoteService.updateOneRemote(remoteId, body);
    res.send({ status: "OK", data: updatedRemote });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneRemote = (req, res) => {
  //validate input parameter.
  //if remoteId is null, then return status code 400.
  const { remoteId } = req.params;
  if (!remoteId) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "The parameter 'remoteId' is missing in request.",
      },
    });
  }

  //pass data to service layer for processing.
  //send response to client.
  try {
    remoteService.deleteOneRemote(remoteId);
    res.status(204).send({
      status: "OK",
      message: `Remote with id ${remoteId} was deleted.`,
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getDevicesForRemote = (req, res) => {
  //validate input parameter.
  //if remoteId is null, then return status code 400.
  const { remoteId } = req.params;
  if (!remoteId) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "The parameter 'remoteId' is missing in request.",
      },
    });
  }

  //get data via service layer.
  //send response to client.
  try {
    const devices = remoteService.getDevicesForRemote(remoteId);
    res.send({ status: "OK", data: devices });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getDeviceInOneSlotOfRemote = (req, res) => {
  //validate input parameter.
  //if remoteId is null, then return status code 400.
  const { remoteId, slotId } = req.params;
  if (!remoteId || !slotId) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One or more of following parameters are missing in request. 'remoteId', 'slotId'",
      },
    });
  }

  //get data via service layer.
  //send response to client.
  try {
    const device = remoteService.getDeviceInOneSlotOfRemote(remoteId, slotId);
    res.send({ status: "OK", data: device });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const assignDeviceToRemote = (req, res) => {
  const { body } = req;
  //validate input parameter.
  //if remoteId is null, then return status code 400.
  const { remoteId } = req.params;
  if (!remoteId) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "The parameter 'remoteId' is missing in request.",
      },
    });
  }

  //pass data to service layer for processing.
  //send response to client.
  try {
    const updatedRemote = remoteService.assignDeviceToRemote(remoteId, body);
    res.send({ status: "OK", data: updatedRemote });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const operateDeviceInOneSlotOfRemote = (req, res) => {
  //validate input parameter.
  //if remoteId is null, then return status code 400.
  const { remoteId, slotId } = req.params;
  if (!remoteId || !slotId) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One or more of following parameters are missing in request. 'remoteId', 'slotId'",
      },
    });
  }

  const { state } = req.body;
  //validate input data.
  //if device state is null, then return status code 400.
  if (!state) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "The key 'state' is missing or is empty in request body.",
      },
    });
    return;
  }

  //pass data to service layer for processing.
  //send response to client.
  try {
    const updatedSlot = remoteService.operateDeviceInOneSlotOfRemote(
      remoteId,
      slotId,
      state.toUpperCase()
    );
    res.send({ status: "OK", data: updatedSlot });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const undoLastActionInOneRemote = (req, res) => {
  //validate input parameter.
  //if remoteId is null, then return status code 400.
  const { remoteId } = req.params;
  if (!remoteId) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One or more of following parameters are missing in request. 'remoteId'",
      },
    });
  }

  //pass data to service layer for processing.
  //send response to client.
  try {
    const updatedRemote = remoteService.undoLastActionInOneRemote(remoteId);
    res.send({ status: "OK", data: updatedRemote });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export default {
  getAllRemotes,
  getOneRemote,
  createNewRemote,
  updateOneRemote,
  deleteOneRemote,
  getDevicesForRemote,
  getDeviceInOneSlotOfRemote,
  assignDeviceToRemote,
  operateDeviceInOneSlotOfRemote,
  undoLastActionInOneRemote,
};
