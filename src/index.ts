import express from "express";
import { defaultMessage } from "./Logger";
import router from "./Routes";

const api = express();

const port = 8000

api.use(express.json());

api.use(function (req, res, next){
    res.contentType('aplication/json');
    next();
})

api.use(router);

api.listen(port, () => {
    defaultMessage(`Api está rodando na porta ${port}`);
})