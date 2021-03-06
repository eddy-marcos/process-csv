import carModel from '../models/car.js'; 

/**
 * Stores a new car into the database.
 * @param {Object} car car object to create.
 * @throws {Error} If the car is not provided.
 */

export default async function create (car) {
    if (!car)
        throw new Error('Missing car');

    await carModel.create(car); 
}; 
