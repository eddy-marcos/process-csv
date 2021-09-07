/* eslint-disable no-undef */
import mongoose from 'mongoose';

/**
 * Car model schema.
 */
 const carSchema = new mongoose.Schema({
    uuid: { type: Number },
    vin: { type: String },
    make: { type: String },
    model: { type: String },
    mileage: { type: Number },
    year: { type: Number },
    price: { type: Number },
    zipcode: { type: Number },
    createdate: { type: Date },
    updatedate: { type: Date }
});

export default mongoose.model('car', carSchema);