import isEqual from 'lodash';
import fs from 'fs';
import writeFile from '../../helpers/writeFile.js';
import fileCheck from '../../helpers/fileCheck.js';
import readFile from '../../helpers/readFile.js';
import parseData from '../../helpers/parseData.js';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import VehicleData from '../../models/car.js';

const mongod = new MongoMemoryServer({ instance: { dbName: "uploads" } });

const uri = mongod.getUri();

/* Process CSV, and save to in memory database  */
 export async function parseCsv(req, res) {
    const { params: { providerName = null }, file = {} } = req;
    const { path = null } = file;

    const { isCorrect, errors } = fileCheck({
        providerName,
        file
    });

    if (!isCorrect) {
        return res.status(400).json(errors);
    }

    let csvData = [];

    const columns = [
        'UUID',
        'VIN',
        'Make',
        'Model',
        'Mileage',
        'Year',
        'Price',
        'Zip Code',
        'Create Date',
        'Update Date'
    ];

    try {
        csvData = await readFile(path);
    }
    catch (error) {
        console.log('Error reading the file', error);
        
        res.status(400).json({
            messsage: 'Error reading the file' + error
        });
    }

    try {
        const [headers = []] = csvData;
        let newData = [];
    
        if (isEqual(headers, columns)) {
            newData = csvData;
        }
    
        else {
            newData = parseData({ csvData, headers, columns });
        }
       
        writeFile(newData);

        await mongoose.connect(await uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });

          // Create data model object from POST data
          const vehicleData = new VehicleData({
            vehicleData: csvData
          });

          vehicleData.save((err, result) => {
            if (err) return res.status(400).send(err);
            mongoose.disconnect();

            res.status(200).json({
                messsage: 'CSV successfully processed and stored!'
            });

            // remove temp csv file stored on server
            // fs.unlink(req.file.path, () => {});
            
            console.log('Final Data', newData);
          });

    } catch (error) {
        mongoose.disconnect();
        return res.status(500).send("Server Error", err);
    }

}