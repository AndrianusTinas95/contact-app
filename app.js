const yargs = require("yargs");
const contacts = require("./contacts");


yargs.command({
    command: 'add',
    describe: 'menambahkan kontak',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string'
        },
        noHP: {
            describe: 'No Handphone',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        contacts.simpanContact(argv.nama, argv.email, argv.noHP);
    }
}).demandCommand();

// menampilkan semua list contact 
yargs.command({
    command:'list',
    describe:'Menampilkan semua nama & nomor hp',
    handler(){
        contacts.listContact();
    }
})

yargs.parse()