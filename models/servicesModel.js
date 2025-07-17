import mongoose from 'mongoose';

const servicesSchema = new mongoose.Schema({
    itemId:{type:String, require:true},
    itemName:{type:String, require:true},
    description:{type:String, require:true},
    price:{type:String, require:true},
    gstPercentage:{type:String, require:true},
    total:{type:String, require:true}
});

const servicesModel = new mongoose.model('service',servicesSchema);

export default servicesModel;
