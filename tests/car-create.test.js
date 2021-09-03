const dbHandler = require('./db-handler');
const carService = require('../services/car');
const carModel = require('../models/car');
const validateFile = require('./validate-file');

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
    await dbHandler.connect();
});

/**
 * Clear all test data after every test.
 */
afterEach(async () => {
    await dbHandler.clearDatabase();
});

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
    await dbHandler.closeDatabase();
});

/**
 * Car create test suite.
 */
describe('car create ', () => {
    /**
     * Tests that a valid car can be created through the carService without throwing any errors.
     */
    it('can be created correctly', async () => {
        expect(async () => {
            await carService.create(carComplete);
        })
            .not
            .toThrow();
    });

      /**
     * Car should exist after being created.
     */
       it('exists after being created', async () => {
        await carService.create(carComplete);

        const createdCar = await carModel.findOne();

        expect(createdCar.vin)
            .toBe(carComplete.vin);
    });

    it('If no provider, throw an error', () => {
        expect(validateFile({ file: { path: {} }, providerName: null })).toEqual(invalidProvider)
    });

});

const carComplete = {
    uuid: 1,
    vin: '5FNYF6H91MB005416',
    make: 'Honda',
    model: 'Civic',
    mileage: '100000',
    year: 2010,
    price: 15000,
    zipcode: 10001,
    createdate: '11/1/2018',
    updatedate: '9/2/2021'
};

const invalidProvider = {
    errors: { providerName: 'provider name is required' },
    isValid: false
}
