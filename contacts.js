const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

const dirPath='./data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}
const dataPath='./data/contacts.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath,'[]','utf-8');
}


const simpanContact = (nama,email,noHP) =>{
    const contact       = {nama,email,noHP};
    const fileBuffer    = fs.readFileSync('data/contacts.json','utf-8');
    const contacts = JSON.parse(fileBuffer);
    
    const duplikat = contacts.find(
        (contact) =>contact.nama === nama
    )
    if(duplikat){
        console.log(
            chalk.magenta.bold('Contact sudah terdaftar, gunakan nama lain')
        );
        return false;
    }

    if(email){
        if(!validator.isEmail(email)){
            console.log(
                chalk.magenta.bold('Email Tidak valid')
            );
            return false;
        }
    }
    if(!validator.isMobilePhone(noHP,'id-ID')){
        console.log(
            chalk.magenta.bold('No HP Tidak valid')
        );
        return false;
    }

    contacts.push(contact);

    fs.writeFileSync('data/contacts.json',JSON.stringify(contacts));

    console.log(
        chalk.green.bold('terimakasih sudah memasukan data.')
    )
        
}

module.exports = {simpanContact}