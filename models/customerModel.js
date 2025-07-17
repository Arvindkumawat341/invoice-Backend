import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    name: { type: String, require: true },
    address: { type: String, require: true },
    city: { type: String, require: true },
    state: { type: String, require: true },
    postalCode: { type: String, require: true },
    country: { type: String, require: true },
    contact: { type: String, require: true },
    description: { type: String, require: true },
    firmname: { type: String },
    cinNo: { type: String },
    gstNo: { type: String },
    panNo: { type: String },
})

const customerModel = new mongoose.model('customer', customerSchema);

export default customerModel;