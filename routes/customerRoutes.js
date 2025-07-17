import express from 'express';
import customerController from '../controllers/customerController.js';
import serviceController from '../controllers/serviceController.js';
import invoiceController from '../controllers/invoiceController.js';
const router = express.Router();

//Customer
router.post('/createcustomer', customerController.createCustomer);
router.get('/getcustomer', customerController.getAllCustomer);
router.get('/getcustomer/:id', customerController.getCustomerById);
router.delete('/deletecustomer/:id', customerController.deleteCustomer);
router.put('/updatecustomer/:id', customerController.updateCustomer);

//Services
router.post('/createservice', serviceController.createService);
router.get('/getservice', serviceController.getAllService)
router.get('/getservice/:id', serviceController.getServiceById);
router.put('/updateservice/:id', serviceController.updateService);
router.delete('/deleteservice/:id', serviceController.deleteService);

//Invoice
router.post('/createinvoice', invoiceController.createInvoice)
router.get('/getinvoice', invoiceController.getInvoice)
router.get("/getinvoice/:id", invoiceController.getInvoiceById);
router.post('/createitem/:id', invoiceController.createItems)
router.put("/updateinvoice/:id", invoiceController.updateInvoice);
router.put("/updateitem/:invoiceId/:itemId", invoiceController.updateItem);

export default router