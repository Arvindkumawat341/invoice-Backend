import invoiceModel from "../models/InvoiceModel.js";
import libre from "libreoffice-convert";
import { promisify } from "util";

libre.convertAsync = promisify(libre.convert);

class invoiceController {
  //Invoice
  // static createInvoice = async (req, res) => {
  //   try {
  //     const {
  //       name,
  //       address,
  //       city,
  //       postalCode,
  //       country,
  //       contact,
  //       description,
  //       firmname,
  //       cinNo,
  //       gstNo,
  //       panNo,
  //       items,
  //       totalAmount,
  //       status,
  //       overallDiscount,
  //     } = req.body;

  //     let newInvoiceNumber;
  //     const lastInvoice = await invoiceModel.findOne().sort({ _id: -1 }).limit(1);

  //     if (lastInvoice && lastInvoice.invoiceNumber) {
  //       const lastNumericPart = parseInt(lastInvoice.invoiceNumber.substring(3));
  //       const nextNumericPart = lastNumericPart + 1;
  //       const paddedNumericPart = String(nextNumericPart).padStart(3, '0');
  //       newInvoiceNumber = `INV${paddedNumericPart}`;
  //     } else {
  //       newInvoiceNumber = "INV001";
  //     }

  //     const invoice = new invoiceModel({
  //       invoiceNumber: newInvoiceNumber,
  //       name,
  //       address,
  //       city,
  //       postalCode,
  //       country,
  //       contact,
  //       description,
  //       firmname,
  //       cinNo,
  //       gstNo,
  //       panNo,
  //       items,
  //       totalAmount,
  //       status,
  //       overallDiscount,
  //     });

  //     await invoice.save();

  //     return res.status(201).json({ message: "Invoice created successfully!", invoiceNumber: newInvoiceNumber });
  //   } catch (error) {
  //     console.error("Invoice creation error:", error);
  //     return res.status(500).send("Failed to create invoice!");
  //   }
  // };

static createInvoice = async (req, res) => {
  try {
    const {
      customerId, // only customerId required
      items,
      totalAmount,
      status,
     
    } = req.body;

    let newInvoiceNumber;
    const lastInvoice = await invoiceModel.findOne().sort({ _id: -1 }).limit(1);

    if (lastInvoice && lastInvoice.invoiceNumber) {
      const lastNumericPart = parseInt(lastInvoice.invoiceNumber.substring(3));
      const nextNumericPart = lastNumericPart + 1;
      const paddedNumericPart = String(nextNumericPart).padStart(3, "0");
      newInvoiceNumber = `INV${paddedNumericPart}`;
    } else {
      newInvoiceNumber = "INV001";
    }

    const invoice = new invoiceModel({
      invoiceNumber: newInvoiceNumber,
      customerId, // saved as reference
      items,
      totalAmount,
      status,
    });

    await invoice.save();

    return res.status(201).json({
      message: "Invoice created successfully!",
      invoiceNumber: newInvoiceNumber,
    });
  } catch (error) {
    console.error("Invoice creation error:", error);
    return res.status(500).send("Failed to create invoice!");
  }
};

  static getInvoice = async (req, res) => {
  try {
    const data = await invoiceModel.find().populate("customerId");
    return res.status(200).send({ message: "Fetch successfully!", data });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Failed to fetch");
  }
};


  static getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await invoiceModel.findById(id).populate("customerId");
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    return res.status(200).json({ data: invoice });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch invoice" });
  }
};

  static updateInvoice = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        name,
        address,
        city,
        postalCode,
        country,
        contact,
        description,
        firmname,
        cinNo,
        gstNo,
        panNo,
        items,
        totalAmount,
        status,
       
      } = req.body;

      const updatedInvoice = await invoiceModel.findByIdAndUpdate(
        id,
        {
          name,
          address,
          city,
          postalCode,
          country,
          contact,
          description,
          firmName: firmname,
          cinNo,
          gstNo,
          panNo,
          items,
          totalAmount,
          status,
       
        },
        { new: true } // return updated doc
      );

      if (!updatedInvoice) {
        return res.status(404).json({ message: "Invoice not found" });
      }

      return res.status(200).json({
        message: "Invoice updated successfully!",
        data: updatedInvoice,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Failed to update invoice");
    }
  };

  //Items
  static createItems = async (req, res) => {
    try {
      const { id } = req.params;
      const { itemId, itemName, description, price } = req.body;

      //Check data is already exist
      const existdata = await invoiceModel.findOne({ itemName });
      if (existdata) {
        return res.status(400).send("Data already exist");
      }

      // Create new
      const item = await invoiceModel.updateOne(
        { _id: id },
        {
          $push: {
            items: [{ itemId, itemName, description, price }],
          },
        }
      );
      return res.status(200).send({
        item,
        message: "Item added successfully!",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send("Failed to create!");
    }
  };

  static updateItem = async (req, res) => {
    try {
      const { invoiceId, itemId } = req.params;
      const { itemName, itemDescription, quantity, price, discount, amount } =
        req.body;

      const updatedInvoice = await invoiceModel.findOneAndUpdate(
        { _id: invoiceId, "item.itemId": itemId },
        {
          $set: {
            "item.$.itemName": itemName,
            "item.$.itemDescription": itemDescription,
            "item.$.quantity": quantity,
            "item.$.price": price,
            "item.$.discount": discount,
            "item.$.amount": amount,
          },
        },
        { new: true }
      );

      if (!updatedInvoice) {
        return res.status(404).json({ message: "Item not found in invoice" });
      }

      return res.status(200).json({
        message: "Item updated successfully!",
        data: updatedInvoice,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Failed to update item");
    }
  };
}

export default invoiceController;
