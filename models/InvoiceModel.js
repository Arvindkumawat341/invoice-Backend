import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "customer", required: true },
  items: [
    {
      itemId: { type: String, required: true },
      itemName: { type: String, required: true },
      itemDescription: { type: String },
      quantity: { type: String, required: true },
      gstPercentage: { type: String, required: true },
      total: { type: String, required: true },
      price: { type: String, required: true },
      discount: { type: String, required: true },
      amount: { type: String, required: true },
    },
  ],
  totalAmount: { type: String, required: true },
  status: { type: String, required: true },
 
});

const invoiceModel = mongoose.model("invoice", invoiceSchema);

export default invoiceModel;
