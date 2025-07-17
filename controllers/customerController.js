import customerModel from "../models/customerModel.js";

class customerController {

    //Create customer
    static createCustomer = async (req, res) => {
        try {
            const { name, address, city, postalCode,state, country, contact, description, firmname, cinNo, gstNo, panNo } = req.body;

            //check the data is already exist or not..
            const existData = await customerModel.findOne({ name })

            if (existData) {
                return res.status(400).send("Name is alredy exist!")
            }

            //Create new
            const customer = new customerModel({
                name: name,
                address: address,
                city: city,
                postalCode: postalCode,
                state: state,
                country: country,
                contact: contact,
                description: description,
                firmname: firmname,
                cinNo: cinNo,
                gstNo: gstNo,
                panNo: panNo
            })
            await customer.save();
            return res.status(200).json({message:"Data created successfully!"});

        } catch (error) {
            console.log(error);
            return res.status(400).json({message:"Customer create failed!"});
        }
    }

    //Get all customer
    static getAllCustomer = async (req, res) => {
        try {
            const data = await customerModel.find();
            return res.status(200).send(data)
        } catch (error) {
            console.log(error);
            return res.status(400).send("Failed to fetch!");
        }
    }

    static getCustomerById = async (req, res) => {
        try {
            const { id } = req.params;
            const customer = await customerModel.findById(id);
            if (!customer) {
                return res.status(404).send("Customer not found!");
            }
            return res.status(200).send(customer);
        } catch (error) {
            console.log(error);
            return res.status(400).send("Failed to fetch customer!");
        }
    }

    static updateCustomer = async (req, res) => {
        try {
            const { id } = req.params;
            const { name, address, city, postalCode, state, country, contact, description, firmname, cinNo, gstNo, panNo } = req.body;

            //Update customer
            const updatedCustomer = await customerModel.findByIdAndUpdate(id, {
                name: name,
                address: address,
                city: city,
                postalCode: postalCode,
                country: country,
                contact: contact,
                description: description,
                firmname: firmname,
                cinNo: cinNo,
                gstNo: gstNo,
                panNo: panNo,
                state: state,
            }, { new: true });

            return res.status(200).json({message:"Customer updated successfully!", data: updatedCustomer});
        } catch (error) {
            console.log(error);
            return res.status(400).send("Failed to update customer!");
        }
    }

    static deleteCustomer = async (req, res) => {
        try {
            const { id } = req.params;
        
            await customerModel.findByIdAndDelete(id);
            return res.status(200).send("Customer deleted successfully!");
        } catch (error) {
            console.log(error);
            return res.status(400).send("Failed to delete customer!");
        }
    }
}

export default customerController;