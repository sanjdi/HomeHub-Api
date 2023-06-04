import express from "express";
import deviceController from "../../controllers/deviceController.js";
const router = express.Router();

/**
 * @openapi
 * /api/v1/devices:
 *   get:
 *     description: Returns all devices
 *     summary: Find all devices
 *     operationId: getAllDevices
 *     tags:
 *       - Devices
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
 *                     $ref: "#/components/schemas/Device"
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
router.get("/", deviceController.getAllDevices);

/**
 * @openapi
 * /api/v1/devices/{deviceId}:
 *   get:
 *     description: Returns a device based on ID
 *     summary: Find a device by ID
 *     operationId: getOneDevice
 *     tags:
 *       - Devices
 *     parameters:
 *       - in: path
 *         name: deviceId
 *         schema:
 *           type: string
 *         description: Id of a device
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
 *                   $ref: "#/components/schemas/Device"
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
 *                       example: "Device with the id '11b60f45-bb31-4478-b59f-e316e03fa430' does not exist."
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
router.get("/:deviceId", deviceController.getOneDevice);

/**
 * @openapi
 * /api/v1/devices:
 *   post:
 *     description: Create a new device in the hub with form data
 *     summary: Create a device with form data
 *     operationId: createNewDevice
 *     tags:
 *       - Devices
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 description: Name of a device
 *                 type: string
 *               brand:
 *                 description: Brand of a device
 *                 type: string
 *               state:
 *                 description: Run state of a device
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
 *                   $ref: "#/components/schemas/Device"
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
 *                       example: "One or all of following keys are missing or is empty in request body. 'name'"
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
router.post("/", deviceController.createNewDevice);

router.patch("/:deviceId", deviceController.updateOneDevice);

router.delete("/:deviceId", deviceController.deleteOneDevice);

export default router;
