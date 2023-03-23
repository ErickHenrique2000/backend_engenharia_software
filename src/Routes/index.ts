import express from 'express';
import { createUser, login } from '../Controllers/userController';

const router = express.Router();

router.get('/', (req, res) => {
    console.log('Olá mundo!');
    return res.status(202).send();
})

router.post('/user/create', (req, res) => {
    createUser(req, res);
})

router.post('/user/login', (req, res) => {
    login(req, res);
})

export default router;