const { join } = require('node:path');
const { wrieFile ,readFile} = require('node:fs/promises');

const filePath = join ('./users.json');

const write = async (data) =>{
    try {
        await writeFile(filePath, json.strigify(data, null, 2));
    }catch (error){
        console.log(`faylga yozishda xatolik yuz berdi ,${error.massage}`)
    }
}
const read = async () => {
    try {
        const data = await readFile(filePath, 'utf8');
        return JSON.parse(data);
    }catch (error){
        console.log(`faylni o'qishda xatolik yuz berdi ,${error.massage}`)
    }
}
module.exports ={
    write, read
}