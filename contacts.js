const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadContacts = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);

    return contacts;
}


const simpanContact = (nama, email, noHP) => {
    const contact = {
        nama,
        email,
        noHP
    };

    const contacts = loadContacts();

    const duplikat = contacts.find(
        (contact) => contact.nama === nama
    )
    if (duplikat) {
        console.log(
            chalk.magenta.bold('Contact sudah terdaftar, gunakan nama lain')
        );
        return false;
    }

    if (email) {
        if (!validator.isEmail(email)) {
            console.log(
                chalk.magenta.bold('Email Tidak valid')
            );
            return false;
        }
    }
    if (!validator.isMobilePhone(noHP, 'id-ID')) {
        console.log(
            chalk.magenta.bold('No HP Tidak valid')
        );
        return false;
    }

    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    console.log(
        chalk.green.bold('terimakasih sudah memasukan data.')
    )

}

const listContact = () => {
    const contacts = loadContacts();
    console.log(chalk.cyan.bold('Daftar Kontak : '));
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
    });
}

const detailContact = (nama) => {
    const contacts = loadContacts();
    const contact = contacts.find(
        (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
    )

    if (!contact) {
        console.log(chalk.red.bold(`${nama} tidak ditemukan`));
        return false;
    }

    console.log(chalk.cyan.bold(contact.nama));
    console.log(contact.noHP);
    if(contact.email){
        console.log(contact.email);
    }
}

const deleteContact= (nama)=>{
    const contacts = loadContacts();
    const newContact = contacts.filter(
        (contact)=> contact.nama.toLowerCase() !== nama.toLowerCase()
    );

    if (contacts.length === newContact.length) {
        console.log(chalk.red.bold(`${nama} tidak ditemukan`));
        return false;
    }

    fs.writeFileSync('data/contacts.json',JSON.stringify(newContact));
    console.log(chalk.green.bold(`${nama} berhasil dihapus`));
}

module.exports = {
    simpanContact,
    listContact,
    detailContact,
    deleteContact
}