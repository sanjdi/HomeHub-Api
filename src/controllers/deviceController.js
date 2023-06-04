import deviceService from "../services/deviceService.js";

const getAllDevices = (req, res) => {
  //get data via service layer.
  //send response to client.
  try {
    const allDevices = deviceService.getAllDevices();
    res.send({ status: "OK", data: allDevices });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneDevice = (req, res) => {
  //validate input parameter.
  //if deviceId is null, then return status code 400.
  const { deviceId } = req.params;
  if (!deviceId) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "The parameter 'deviceId' is missing in request.",
      },
    });
  }

  //get data via service layer.
  //send response to client.
  try {
    const device = deviceService.getOneDevice(deviceId);
    res.send({ status: "OK", data: device });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createNewDevice = (req, res) => {
  const { body } = req;
  //validate input data.
  //if device name is null, then return status code 400.
  if (!body.name) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "The key 'name' is missing or is empty in request body.",
      },
    });
    return;
  }

  //pass data to service layer for processing.
  //send response to client.
  const newDevice = {
    name: body.name,
    brand: body.brand,
    state: body.state ? body.state.toUpperCase() : body.state,
  };
  try {
    const createdDevice = deviceService.createNewDevice(newDevice);
    res.status(201).send({ status: "OK", data: createdDevice });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneDevice = (req, res) => {
  const { body } = req;
  //validate input parameter.
  //if deviceId is null, then return status code 400.
  const { deviceId } = req.params;
  if (!deviceId) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "The parameter 'deviceId' is missing in request.",
      },
    });
  }

  //pass data to service layer for processing.
  //send response to client.
  try {
    const updatedDevice = deviceService.updateOneDevice(deviceId, body);
    res.send({ status: "OK", data: updatedDevice });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneDevice = (req, res) => {
  //validate input parameter.
  //if deviceId is null, then return status code 400.
  const { deviceId } = req.params;
  if (!deviceId) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "The parameter 'deviceId' is missing in request.",
      },
    });
  }

  //pass data to service layer for processing.
  //send response to client.
  try {
    deviceService.deleteOneDevice(deviceId);
    res.status(204).send({
      status: "OK",
      message: `Device with id ${deviceId} was deleted.`,
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export default {
  getAllDevices,
  getOneDevice,
  createNewDevice,
  updateOneDevice,
  deleteOneDevice,
};
