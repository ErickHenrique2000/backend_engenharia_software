import { Request } from "express";

export interface User{
    id?: number;
    name: string;
    password: string;
    username: string;
    cargo: string;
}

export interface Item{
    id?: number;
    nome: string
    qtd: number
    qtd_alert_stock?: number
    qtd_alert_stand?: number
    qtd_stand: number
}

export interface SuperRequest extends Request{
    token: string,
    client: string
}

export interface Tokens{
    token: string;
    refreshToken: string;
}