import fs from 'fs';
import path from 'path';

const logName = `BACKEND-DASHBOARD-logs-${new Date().toLocaleString().replaceAll('/', '-').split(' ')[0]}.log`

function verifyPath(){
    var dir = path.resolve('./logs')
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

export function defaultMessage(message: string){
    verifyPath();
    console.log(`[\x1b[34m${new Date().toLocaleString()}\x1b[0m] ${message}\x1b[0m`)
    fs.appendFile(path.resolve('./logs', logName), `[${new Date().toLocaleString()}] ${message} \n`, (err) =>{
        if(err) throw err;
    })
}

export function errorMessage(message: any){
    verifyPath()
    console.log(`[\x1b[34m${new Date().toLocaleString()}\x1b[0m] \x1b[31m${message}\x1b[0m`)
    fs.appendFile(path.resolve('./logs', logName), `[${new Date().toLocaleString()}] ${message} \n`, (err) =>{
        if(err) throw err;
    })
}