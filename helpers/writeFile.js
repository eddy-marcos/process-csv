import fs from 'fs';

export default function writeFile(data) {
        const resultFile = fs.createWriteStream('./result.txt');
        resultFile.write(JSON.stringify(data));
        resultFile.end();
    } 
 