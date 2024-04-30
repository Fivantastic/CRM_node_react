import { selectAddressCustomerByIdModel } from "../models/customer/selectAdressCustomerByIdModel.js";

export const extractFullAddress = async (address) => {
    const addressTable = await selectAddressCustomerByIdModel(address);

    // Concatenamos la direccion
    const addressComplete = `${addressTable.address}, ${addressTable.number}, ${addressTable.floor}, ${addressTable.letter_number}, ${addressTable.city}, ${addressTable.zip_code}, ${addressTable.country}`;

    return addressComplete;
}