import Device from "../database/Device.js";
import { v4 as uuid4 } from "uuid";

const getAllDevices = () => {
  try {
    const allDevices = Device.getAllDevices();
    return allDevices;
  } catch (error) {
    throw error;
  }
};

const getOneDevice = (deviceId) => {
  try {
    const device = Device.getOneDevice(deviceId);
    return device;
  } catch (error) {
    throw error;
  }
};

const createNewDevice = (newDevice) => {
  //populate id, createdAt and updatedAt fields before inserting to db.
  const deviceToInsert = {
    ...newDevice,
    id: uuid4(),
    createdAt: new Date().toLocaleString("en-AU"),
    updatedAt: new Date().toLocaleString("en-AU"),
  };

  //insert to db.
  try {
    const createdDevice = Device.createNewDevice(deviceToInsert);
    return createdDevice;
  } catch (error) {
    throw error;
  }
};

const updateOneDevice = (deviceId, data) => {
  try {
    const updatedDevice = Device.updateOneDevice(deviceId, data);
    return updatedDevice;
  } catch (error) {
    throw error;
  }
};

const deleteOneDevice = (deviceId) => {
  try {
    Device.deleteOneDevice(deviceId);
  } catch (error) {
    throw error;
  }
};

export default {
  getAllDevices,
  getOneDevice,
  createNewDevice,
  updateOneDevice,
  deleteOneDevice,
};
