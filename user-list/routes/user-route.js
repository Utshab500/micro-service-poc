import express from 'express';
import { getAlluser, getUser } from '../services/user.js';

const router = express.Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags:
 *       - Health
 *     description: Returns OK if the service is running.
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: OK!
 */
router.get('/health', (req, res) => {
  res.send('OK!')
});

/**
 * @swagger
 * /list_all_user:
 *   get:
 *     summary: Get a list of all users
 *     tags:
 *       - User
 *     description: Returns a list of all users in the database.
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: John Doe
 *                       email:
 *                         type: string
 *                         example: john@example.com
 *                       asignedTaskIds:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["task_id1", "task_id2"]
 */
router.get('/list_all_user', (req, res) => {

    getAlluser().then(resp => res.json({status: resp}));

});

/**
 * @swagger
 * /list_user:
 *   get:
 *     summary: Get a user by filter
 *     tags:
 *       - User
 *     description: Returns user(s) matching the provided filter fields (e.g., email, name).
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               asignedTaskIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["task_id1", "task_id2"]
 *     responses:
 *       200:
 *         description: User(s) matching the filter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: boolean
 *                       example: true
 *                     result:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: John Doe
 *                           email:
 *                             type: string
 *                             example: john@example.com
 *                           asignedTaskIds:
 *                             type: array
 *                             items:
 *                               type: string
 *                             example: ["task_id1", "task_id2"]
 */
router.get('/list_user', (req, res) => {

    getUser(req.body).then(resp => res.json({status: resp}));

});

export default router;