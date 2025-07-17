import servicesModel from "../models/servicesModel.js";
import axios from "axios";

class serviceController {

  static createService = async (req, res) => {
    try {
      const { itemName, description, price, gstPercentage, total } = req.body;

      const existdata = await servicesModel.findOne({ itemName });
      if (existdata) {
        return res.status(400).send("Item name already created!");
      }

      let newItemId;
      const lastService = await servicesModel.findOne().sort({ _id: -1 }).limit(1);

      if (lastService && lastService.itemId) {
        const lastNumericPart = parseInt(lastService.itemId.substring(3));
        const nextNumericPart = lastNumericPart + 1;
        const paddedNumericPart = String(nextNumericPart).padStart(3, '0');
        newItemId = `INC${paddedNumericPart}`;
      } else {
        newItemId = "INC001";
      }

      const service = new servicesModel({
        itemId: newItemId, 
        itemName: itemName,
        description: description,
        price: price,
        gstPercentage: gstPercentage,
        total: total,
      });

      await service.save();
      return res.status(200).json("Service created successfully!");
    } catch (error) {
      console.error("Error creating service:", error);
      return res.status(500).send("Failed to create service!");
    }
  };

  static getAllService = async (req, res) => {
    try {
      const data = await servicesModel.find();
      return res.status(200).send({ message: "Fetch successfully", data });
    } catch (error) {
      console.log(error);
      return res.status(400).send("Failed to fetch!");
    }
  };

  static getServiceById = async (req, res) => {
    try {
      const { id } = req.params;
      const service = await servicesModel.findById(id);
      if (!service) {
        return res.status(404).send("Service not found!");
      }
      return res.status(200).send(service);
    } catch (error) {
      console.log(error);
      return res.status(400).send("Failed to fetch service!");
    }
  }

  static deleteService = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await servicesModel.findByIdAndDelete(id);
      return res.status(200).send("Service deleted successfully!");
    } catch (error) {
      console.log(error);
      return res.status(400).send("Failed to delete service!");
    }
  };

  static updateService = async (req, res) => {
    try {
      const { id } = req.params;
      const { itemId, itemName, description, price, gstPercentage, total } =
        req.body;

      //Update service
      const updatedService = await servicesModel.findByIdAndUpdate(id, {
        itemId: itemId,
        itemName: itemName,
        description: description,
        price: price,
        gstPercentage: gstPercentage,
        total: total,
      });
      return res.status(200).json("Service updated successfully!");
    } catch (error) {
      console.log(error);
      return res.status(400).send("Failed to update service!");
    }
  };
}

export default serviceController;
