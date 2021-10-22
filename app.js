
const {tulispertanyaan,simpanContact} = require('./contacts');


const main = async() => {
    const nama = await tulispertanyaan('masukan nama anda:');
    const email = await tulispertanyaan('masukan email anda:');
    const noHp = await tulispertanyaan('masukan no hp anda:');

    simpanContact(nama,email,noHp);
}

main();


