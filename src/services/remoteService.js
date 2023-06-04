import Remote from "../database/Remote.js";
import deviceService from "../services/deviceService.js";
import { v4 as uuid4 } from "uuid";

const getAllRemotes = () => {
  try {
    const allRemotes = Remote.getAllRemotes();
    return allRemotes;
  } catch (error) {
    throw error;
  }
};

const getOneRemote = (remoteId) => {
  try {
    const remote = Remote.getOneRemote(remoteId);
    return remote;
  } catch (error) {
    throw error;
  }
};

const createNewRemote = (newRemote) => {
  //populate id, createdAt and updatedAt fields before inserting to db.
  const remoteToInsert = {
    ...newRemote,
    id: uuid4(),
    createdAt: new Date().toLocaleString("en-AU"),
    updatedAt: new Date().toLocaleString("en-AU"),
  };

  //insert to db.
  try {
    const createdRemote = Remote.createNewRemote(remoteToInsert);
    return createdRemote;
  } catch (error) {
    throw error;
  }
};

const updateOneRemote = (remoteId, data) => {
  try {
    const updatedRemote = Remote.updateOneRemote(remoteId, data);
    return updatedRemote;
  } catch (error) {
    throw error;
  }
};

const deleteOneRemote = (remoteId) => {
  try {
    Remote.deleteOneRemote(remoteId);
  } catch (error) {
    throw error;
  }
};

const getDevicesForRemote = (remoteId) => {
  try {
    const remote = Remote.getOneRemote(remoteId);
    return remote.slots;
  } catch (error) {
    throw error;
  }
};

const getDeviceInOneSlotOfRemote = (remoteId, slotId) => {
  try {
    const slots = getDevicesForRemote(remoteId);
    return slots.find((s) => s.slotId === parseInt(slotId));
  } catch (error) {
    throw error;
  }
};

const assignDeviceToRemote = (remoteId, data) => {
  try {
    const updatedRemote = Remote.getOneRemote(remoteId);
    if (!updatedRemote.slots) {
      updatedRemote.slots = [];
    }
    if (updatedRemote.numberOfSlots === updatedRemote.slots.length) {
      throw {
        status: 400,
        message: `Remote with the id '${remoteId}' does not have free slots to add new devices.`,
      };
    }
    //console.log(`remoteId =${remoteId}`);
    //console.log(`data.slotId =${data.slotId}`);

    const slotId = data.slotId
      ? parseInt(data.slotId)
      : getNextFreeSlotNumber(updatedRemote.slots);

    //get device object so that its name and runState can be used in later stages.
    const assignedDevice = deviceService.getOneDevice(data.deviceId);

    //populate a slot object with relevant details.
    const newSlot = {
      slotId: slotId,
      deviceId: data.deviceId,
      deviceName: assignedDevice.name,
      state: assignedDevice.runState,
    };
    updatedRemote.slots.push(newSlot);
    updatedRemote.slots.sort((s1, s2) =>
      s1.slotId > s2.slotId ? 1 : s1.slotId < s2.slotId ? -1 : 0
    );
    //console.log(`updatedRemote =${JSON.stringify(updatedRemote)}`);
    return Remote.updateOneRemote(remoteId, updatedRemote);
  } catch (error) {
    throw error;
  }
};

const getNextFreeSlotNumber = (slots) => {
  slots.sort((s1, s2) =>
    s1.slotId > s2.slotId ? 1 : s1.slotId < s2.slotId ? -1 : 0
  );
  let counter = 1;
  for (let index in slots) {
    if (slots[index].slotId != counter) {
      return counter;
    }
    counter++;
  }
  return counter;
};

const removeDeviceFromRemote = (remoteId, deviceId) => {};

const operateDeviceInOneSlotOfRemote = (remoteId, slotId, state) => {
  try {
    const updatedRemote = getOneRemote(remoteId);
    const updatedSlotIndex = updatedRemote.slots.findIndex(
      (slot) => slot.slotId === parseInt(slotId)
    );
    console.log(`updatedRemote =${JSON.stringify(updatedRemote)}`);
    console.log(`updatedSlotIndex =${updatedSlotIndex}`);
    if (updatedSlotIndex === -1) {
      throw {
        status: 400,
        message: `Remote with the id '${remoteId}' does not have free a device assigned to slot ${slotId}.`,
      };
    }

    if (updatedRemote.slots[updatedSlotIndex].state === state) {
      throw {
        status: 400,
        message: `${updatedRemote.slots[updatedSlotIndex].deviceName} is already ${state}.`,
      };
    }

    //first change device runState
    deviceService.updateOneDevice(
      updatedRemote.slots[updatedSlotIndex].deviceId,
      { runState: state }
    );

    //then change state in remote slot
    updatedRemote.slots[updatedSlotIndex].state = state;
    updatedRemote.previousActionSlotId =
      updatedRemote.slots[updatedSlotIndex].slotId;
    return Remote.updateOneRemote(remoteId, updatedRemote).slots[
      updatedSlotIndex
    ];
  } catch (error) {
    throw error;
  }
};

const undoLastActionInOneRemote = (remoteId) => {
  try {
    const updatedRemote = getOneRemote(remoteId);
    const previousActionSlotId = updatedRemote.previousActionSlotId;
    const updatedSlotIndex = updatedRemote.slots.findIndex(
      (slot) => slot.slotId === parseInt(previousActionSlotId)
    );
    console.log(`updatedRemote =${JSON.stringify(updatedRemote)}`);
    console.log(`updatedSlotIndex =${updatedSlotIndex}`);
    if (updatedSlotIndex === -1) {
      return; //TODO
    }

    const currentState = updatedRemote.slots[updatedSlotIndex].state.toUpperCase();
    let newState;
    switch (currentState) {
      case "ON": {
        newState = "OFF";
        break;
      }
      case "OFF": {
        newState = "ON";
        break;
      }
      case "OPEN": {
        newState = "CLOSED";
        break;
      }
      case "CLOSED": {
        newState = "OPEN";
        break;
      }
    }

    //first change device runState
    deviceService.updateOneDevice(
      updatedRemote.slots[updatedSlotIndex].deviceId,
      { runState: newState }
    );

    //then change state in remote slot
    updatedRemote.slots[updatedSlotIndex].state = newState;
    return Remote.updateOneRemote(remoteId, updatedRemote).slots;
  } catch (error) {
    throw error;
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
  removeDeviceFromRemote,
  operateDeviceInOneSlotOfRemote,
  undoLastActionInOneRemote,
};
