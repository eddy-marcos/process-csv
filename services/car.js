const carModel = require('../models/car');

/**
 * Stores a new car into the database.
 * @param {Object} car car object to create.
 * @throws {Error} If the car is not provided.
 */
module.exports.create = async (car) => {
    if (!car)
        throw new Error('Missing car');

    await carModel.create(car);
};
