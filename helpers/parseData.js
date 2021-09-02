import difference from 'lodash';

    export default function parseData({ csvData, headers, columns }) {
        const requiredColumns = [];
        const newData = [];

        headers.forEach((value, index) => {
            if (columns.includes(value)) {
                requiredColumns.push(index);
            }
        })

        for (let i = 0; i < csvData.length; i++) {
            let newRow = [];
            for (let j = 0; j < csvData[i].length; j++) {
                if (requiredColumns.includes(j)) {
                    newRow.push(csvData[i][j]);
                }
            }
            if (newRow.length < columns.length) {
                if (i === 0) {
                    let headerDifference = difference(columns, newRow);
                    for (let k = 0; k < headerDifference.length; k++) {
                        newRow.push(headerDifference[k]);
                    }
                }

                let differenceColumn = columns.length - newRow.length;

                for (let k = 0; k < differenceColumn; k++) {
                    newRow.push(null);
                }
            }
            
            newData.push(newRow);
        }

        return newData;
    }
