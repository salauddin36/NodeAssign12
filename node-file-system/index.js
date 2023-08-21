import {readFile, writeFile} from 'fs/promises'

let template;

try{
    template = await readFile('./example.html', 'utf-8');
    const data = {
        Name : 'Mohammed Salauddin Ayubi',
        Age : 24,
        City : 'Mysore',
    };
    for(const e of Object.entries(data)) {
        const [key, value] = e;
        template = template.replace(`{${key}}`, value);
    }
    await writeFile('./index.html', template);
}
catch(error){
    console.log(error);
}