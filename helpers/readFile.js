import fs from 'fs';
import csv from 'csv-parse'; 

    export default function readFile(path) {
        const csvData = [];

        return new Promise((resolve, reject) => {
            fs.createReadStream(path)
                .pipe(csv({ delimiter: ';' }))
                .on('data', function (row) {
                    csvData.push(row);
                })
                .on('end', function () {
                    resolve(csvData)
                })
                .on('error', function (error) {
                    reject(error)
                });
        });
    }
