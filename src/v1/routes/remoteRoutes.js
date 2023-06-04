import express from "express";
import remoteController from "../../controllers/remoteController.js";
const router = express.Router();

/**
 * @openapi
 * /api/v1/remotes:
 *   get:
 *     description: Returns all remotes
 *     summary: Find all remotes
 *     operationId: getAllRemotes
 *     tags:
 *       - Remotes
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Remote"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */
router.get("/", remoteController.getAllRemotes);

/**
 * @openapi
 * /api/v1/remotes/{remoteId}:
 *   get:
 *     description: Returns a remote based on ID
 *     summary: Find a remote by ID
 *     operationId: getOneRemote
 *     tags:
 *       - Remotes
 *     parameters:
 *       - in: path
 *         name: remoteId
 *         schema:
 *           type: string
 *         description: Id of a remote
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: "#/components/schemas/Remote"
 *       '400':
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Remote with the id '11b60f45-bb31-4478-b59f-e316e03fa430' does not exist."
 *       '5XX':
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */
router.get("/:remoteId", remoteController.getOneRemote);

/**
 * @openapi
 * /api/v1/remotes/{remoteId}/devices:
 *   get:
 *     description: Returns all devices assigned to a given remote
 *     summary: Find all devices in a remote
 *     operationId: getDevicesForRemote
 *     tags:
 *       - Remotes
 *     parameters:
 *       - in: path
 *         name: remoteId
 *         schema:
 *           type: string
 *         description: Id of a remote
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       slotId:
 *                         type: int
 *                         example: 1
 *                       deviceId:
 *                         type: string
 *                         example: 0fd2cda0-fece-4ef9-bdea-a1935eb233f5
 *                       state:
 *                         type: string
 *                         example: ON
 *       '400':
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Remote with the id '11b60f45-bb31-4478-b59f-e316e03fa430' does not exist."
 *       '5XX':
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */
router.get("/:remoteId/devices", remoteController.getDevicesForRemote);

/**
 * @openapi
 * /api/v1/remotes/{remoteId}/devices/{slotId}:
 *   get:
 *     description: Returns the device assigned to a given slot in a remote
 *     summary: Find a device in a slot of a remote
 *     operationId: getDeviceInOneSlotOfRemote
 *     tags:
 *       - Remotes
 *     parameters:
 *       - in: path
 *         name: remoteId
 *         schema:
 *           type: string
 *         description: Id of a remote
 *       - in: path
 *         name: slotId
 *         schema:
 *           type: integer
 *         description: Id of a slot
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     slotId:
 *                       type: int
 *                       example: 1
 *                     deviceId:
 *                       type: string
 *                       example: 0fd2cda0-fece-4ef9-bdea-a1935eb233f5
 *                     state:
 *                       type: string
 *                       example: ON
 *       '400':
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Remote with the id '11b60f45-bb31-4478-b59f-e316e03fa430' does not exist."
 *       '5XX':
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */
router.get(
  "/:remoteId/devices/:slotId",
  remoteController.getDeviceInOneSlotOfRemote
);

/**
 * @openapi
 * /api/v1/remotes:
 *   post:
 *     description: Create a new remote in the hub with form data
 *     summary: Create a remote with form data
 *     operationId: createNewRemote
 *     tags:
 *       - Remotes
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               brand:
 *                 description: Brand of a remote
 *                 type: string
 *               numberOfSlots:
 *                 description: Total number of slots that devices can be assigned
 *                 type: integer
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *                     brand:
 *                       type: string
 *                       example: Samsung HomePlus
 *                     numberOfSlots:
 *                       type: int
 *                       example: 8
 *                     createdAt:
 *                       type: string
 *                       example: 02/06/2023, 1:43:23 pm
 *                     updatedAt:
 *                       type: string
 *                       example: 03/06/2023, 1:43:23 pm
 *       '400':
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "One or all of following keys are missing or is empty in request body. 'brand', 'numberOfSlots'"
 *       '5XX':
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */
router.post("/", remoteController.createNewRemote);

/**
 * @openapi
 * /api/v1/remotes/{remoteId}/devices:
 *   put:
 *     description: Assign a device to a slot in remote
 *     summary: Assign a device to a slot in remote
 *     operationId: assignDeviceToRemote
 *     tags:
 *       - Remotes
 *     parameters:
 *       - in: path
 *         name: remoteId
 *         schema:
 *           type: string
 *         description: Id of a remote
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               slotId:
 *                 description: The slot that device needs to be added in. If blank, next free slot will be selected.
 *                 type: integer
 *               deviceId:
 *                 description: ID of the device
 *                 type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: "#/components/schemas/Remote"
 *       '400':
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Remote with the id '11b60f45-bb31-4478-b59f-e316e03fa430' does not have free slots to add new devices"
 *       '5XX':
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */
router.put("/:remoteId/devices", remoteController.assignDeviceToRemote);

router.patch("/:remoteId", remoteController.updateOneRemote);

/**
 * @openapi
 * /api/v1/remotes/{remoteId}/undo:
 *   patch:
 *     description: Undo last operation in a remote
 *     summary: Undo last operation in a remote
 *     operationId: undoLastActionInOneRemote
 *     tags:
 *       - Remotes
 *     parameters:
 *       - in: path
 *         name: remoteId
 *         schema:
 *           type: string
 *         description: Id of a remote
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: "#/components/schemas/Remote"
 *       '400':
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Remote with the id '11b60f45-bb31-4478-b59f-e316e03fa430' does not have free slots to add new devices"
 *       '5XX':
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */
router.patch("/:remoteId/undo", remoteController.undoLastActionInOneRemote);

/**
 * @openapi
 * /api/v1/remotes/{remoteId}/devices/{slotId}:
 *   patch:
 *     description: Turn a device on/off using a remote
 *     summary: Turn on/off a device
 *     operationId: operateDeviceInOneSlotOfRemote
 *     tags:
 *       - Remotes
 *     parameters:
 *       - in: path
 *         name: remoteId
 *         schema:
 *           type: string
 *         description: Id of a remote
 *       - in: path
 *         name: slotId
 *         schema:
 *           type: string
 *         description: Id of a slot
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               state:
 *                 description: Desired operation (final state) of the device. ie. 'ON' or 'OFF'.
 *                 type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     slotId:
 *                       type: int
 *                       example: 1
 *                     deviceId:
 *                       type: string
 *                       example: 0fd2cda0-fece-4ef9-bdea-a1935eb233f5
 *                     state:
 *                       type: string
 *                       example: ON
 *       '400':
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Remote with the id '11b60f45-bb31-4478-b59f-e316e03fa430' does not have free slots to add new devices"
 *       '5XX':
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */
router.patch(
  "/:remoteId/devices/:slotId/",
  remoteController.operateDeviceInOneSlotOfRemote
);

router.delete("/:remoteId", remoteController.deleteOneRemote);

//router.delete("/:remoteId/devices", remoteController.removeDeviceFromRemote); //

export default router;
