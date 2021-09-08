import mongoose from 'mongoose';

/**
 * Car model schema.
 */
const uploadSchema = new mongoose.Schema({
  vehicleData: [{
    UUID: String,
    VIN: String,
    Make: String,
    Model: String,
    Mileage: Number,
    Year: Number,
    Price: Number,
    'Zip Code': String,
    'Create Date': { type: Date, default: Date.now },
    'Update Date': { type: Date, default: Date.now },
  }],
  uploadDate: { type: Date, default: Date.now },
}, { strict: true, retainKeyOrder: true });


const VehicleData = mongoose.model('VehicleData', uploadSchema);


export default VehicleData;

