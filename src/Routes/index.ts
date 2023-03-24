import express from 'express';
import authenticationController from '../Controllers/authenticationController';
import { createItem, deletarItem, listItens, modificarItem } from '../Controllers/itemController';
import { createUser, login } from '../Controllers/userController';
import { SuperRequest } from '../Interfaces';

const router = express.Router();

router.get('/', (req, res) => {
    console.log('Olá mundo!');
    return res.status(202).send();
})

router.all('/api/*', async (req, res, next) => {
    if(!req.headers.authorization){
        next()
    }else{
        await authenticationController(req, res, next)
    }
})

router.get('/api/teste', (req, res) => {
    console.log('Olá mundo!');
    return res.status(201).send({message: 'tudo em ordem'});
})

router.post('/api/item', (req, res) => {
    createItem(req as SuperRequest, res)
})

router.get('/api/itens', (req, res) => {
    listItens(req as SuperRequest, res)
})

router.put('/api/atualizarItem', (req, res) => {
    modificarItem(req as SuperRequest, res)
})

router.delete('/api/deletarItem', (req, res) => {
    deletarItem(req as SuperRequest, res)
})

router.post('/user/create', (req, res) => {
    createUser(req, res);
})

router.post('/user/login', (req, res) => {
    login(req, res);
})

export default router;