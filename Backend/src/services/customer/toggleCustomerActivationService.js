import { selectCustomerByIdModel } from "../../models/customer/selectCustomerByIdModel.js";
import { toggleCustomerActiveModel } from "../../models/customer/toggleCustomerActiveModel.js";

export const toggleCustomerActivationService = async (id_customer) => {
    const customer = await selectCustomerByIdModel(id_customer);
    if (!customer) {
        notFoundError('Cliente');
    }
    const newStatus = customer.active === 0 ? true : false
    await toggleCustomerActiveModel(id_customer, newStatus);
    const updatedCustomer = await selectCustomerByIdModel(id_customer);
    return updatedCustomer;
}
