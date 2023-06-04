/**
 * @openapi
 * components:
 *   schemas:
 *     Remote:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         brand:
 *           type: string
 *           example: Samsung HomePlus
 *         numberOfSlots:
 *           type: int
 *           example: 8
 *         slots:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               slotId:
 *                 type: int
 *                 example: 1
 *               deviceId:
 *                 type: string
 *                 example: 0fd2cda0-fece-4ef9-bdea-a1935eb233f5
 *               deviceName:
 *                 type: string
 *                 example: Washing mechine
 *               state:
 *                 type: string
 *                 example: ON
 *         createdAt:
 *           type: string
 *           example: 02/06/2023, 1:43:23 pm
 *         updatedAt:
 *           type: string
 *           example: 03/06/2023, 1:43:23 pm
 */

import DB from "./db.json" assert { type: "json" };
import saveToDatabase from "./utils.js";

const getAllRemotes = () => {
  try {
    return DB.remotes;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const getOneRemote = (remoteId) => {
  //if remote is already in the list, then return a rerefence. Otherwise throw status code 400.
  let remote;
  try {
    remote = DB.remotes.find((remote) => remote.id === remoteId);
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
  if (!remote) {
    throw {
      status: 400,
      message: `Remote with the id '${remoteId}' does not exist.`,
    };
  }
  return remote;
};

const createNewRemote = (newRemote) => {
  //insert new record to db and return a reference.
  //if any errors, throw status code 500.
  try {
    DB.remotes.push(newRemote);
    saveToDatabase(DB);
    return newRemote;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const updateOneRemote = (remoteId, data) => {
  //if remote is not in the list, then throw status code 400.
  const indexForUpdate = DB.remotes.findIndex(
    (remote) => remote.id === remoteId
  );
  if (indexForUpdate === -1) {
    throw {
      status: 400,
      message: `Remote with the id '${remoteId}' does not exist.`,
    };
  }

  //update selected record with new data and return a reference.
  const updatedRemote = {
    ...DB.remotes[indexForUpdate],
    ...data,
    updatedAt: new Date().toLocaleString("en-AU"),
  };
  try {
    DB.remotes[indexForUpdate] = updatedRemote;
    saveToDatabase(DB);
    return updatedRemote;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const deleteOneRemote = (remoteId) => {
  //if remote is not in the list, then throw status code 400.
  const indexForDeletion = DB.remotes.findIndex(
    (remote) => remote.id === remoteId
  );
  if (indexForDeletion === -1) {
    throw {
      status: 400,
      message: `Remote with the id '${remoteId}' does not exist.`,
    };
  }

  //delete selected record from db.
  try {
    DB.remotes.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const getSlots = (remoteId) => {
  //if remote is already in the list, then return a rerefence. Otherwise throw status code 400.
  try {
    const remote = getOneRemote(remoteId);
    return remote.slots;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

export default {
  getAllRemotes,
  getOneRemote,
  createNewRemote,
  updateOneRemote,
  deleteOneRemote,
  getSlots,
};
