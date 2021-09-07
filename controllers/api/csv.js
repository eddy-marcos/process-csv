import isEqual from 'lodash';
import writeFile from '../../helpers/writeFile.js';
import fileCheck from '../../helpers/fileCheck.js';
import readFile from '../../helpers/readFile.js';
import parseData from '../../helpers/parseData.js';
import carService from '../../services/car.js';

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

    const [headers = []] = csvData;
    let newData = [];

    if (isEqual(headers, columns)) {
        newData = csvData;
    }

    else {
        newData = parseData({ csvData, headers, columns });
    }

    writeFile(newData);
    console.log('Final Data', newData);

    res.status(200).json({
        messsage: 'CSV successfully processed and stored!'
    });

}