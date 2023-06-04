/**
 * @openapi
 * components:
 *   schemas:
 *     Device:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         name:
 *           type: string
 *           example: Washing mechine
 *         brand:
 *           type: string
 *           example: LG SpeedWash
 *         runState:
 *           type: string
 *           example: OFF
 *         createdAt:
 *           type: string
 *           example: 02/06/2023, 1:43:23 pm
 *         updatedAt:
 *           type: string
 *           example: 03/06/2023, 1:43:23 pm
 */

import DB from "./db.json" assert { type: "json" };
import saveToDatabase from "./utils.js";

const getAllDevices = () => {
  try {
    return DB.devices;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const getOneDevice = (deviceId) => {
  //if device is already in the list, then return a rerefence. Otherwise throw status code 400.
  const device = DB.devices.find((device) => device.id === deviceId);
  if (!device) {
    throw {
      status: 400,
      message: `Device with the id '${deviceId}' does not exist.`,
    };
  }
  return device;
};

const createNewDevice = (newDevice) => {
  //if device is already in the list, then throw status code 400..
  const isAlreadyAdded =
    DB.devices.findIndex((device) => device.name === newDevice.name) > -1;
  if (isAlreadyAdded) {
    throw {
      status: 400,
      message: `Device with the name '${newDevice.name}' already exists.`,
    };
  }

  //insert new record to db and return a reference.
  //if any errors, throw status code 500.
  try {
    DB.devices.push(newDevice);
    saveToDatabase(DB);
    return newDevice;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const updateOneDevice = (deviceId, data) => {
  //if device is not in the list, then throw status code 400.
  const indexForUpdate = DB.devices.findIndex(
    (device) => device.id === deviceId
  );
  if (indexForUpdate === -1) {
    throw {
      status: 400,
      message: `Device with the id '${deviceId}' does not exist.`,
    };
  }

  //update selected record with new data and return a reference.
  const updatedDevice = {
    ...DB.devices[indexForUpdate],
    ...data,
    updatedAt: new Date().toLocaleString("en-AU"),
  };
  try {
    DB.devices[indexForUpdate] = updatedDevice;
    saveToDatabase(DB);
    return updatedDevice;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const deleteOneDevice = (deviceId) => {
  //if device is not in the list, then throw status code 400.
  const indexForDeletion = DB.devices.findIndex(
    (device) => device.id === deviceId
  );
  if (indexForDeletion === -1) {
    throw {
      status: 400,
      message: `Device with the id '${deviceId}' does not exist.`,
    };
  }

  //delete selected record from db.
  try {
    DB.devices.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

export default {
  getAllDevices,
  getOneDevice,
  createNewDevice,
  updateOneDevice,
  deleteOneDevice,
};
