import express from 'express';
import { addUser } from '../services/user.js';

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
 * /add_user:
 *   post:
 *     summary: Add a new user to the database
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
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
 *         description: User add status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 */
router.post('/add_user', (req, res) => {

    addUser(req.body).then(resp => res.json({status: resp}));

});

export default router;