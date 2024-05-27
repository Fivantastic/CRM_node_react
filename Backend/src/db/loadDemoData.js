import { fakerES as faker } from "@faker-js/faker";
import bcrypt from 'bcrypt';
import chalk from 'chalk';
import { ADMIN_PASSWORD } from "../../env.js";
import { generarNIF } from "../utils/generateNIF.js";
import { selectInvoiceByIdSale } from "./loadDataModels/selectInvoiceByIdSale.js";
import { selectPaymentByIdInvoice } from "./loadDataModels/selectPaymentByIdInvoice.js";
import { selectDeliveryNoteByIdSale } from "./loadDataModels/selectDeliveryNoteByIdSale.js";
import { selectShipmentByIdDeliveryNote } from "./loadDataModels/selectShipmentByIdDeliveryNote.js";
import { selectUserByIdVisit } from "./loadDataModels/selectUserByIdVisit.js";
import { generateReference3DigitsFromRef } from "../utils/generateReference3Digits.js";
import { generateReference5DigitsFromRef } from "../utils/generateReference5Digits.js";
import { getMaxReference3Digits, getMaxReference5Digits } from "../models/getMaxReference.js";

export async function loadDemoData(db) {
  try {
    console.log(chalk.bold.blue(`->✏️ Insertando datos en tabla Addresses...`));
    const addressData = [];
    for (let i = 0; i < 250; i++) {
      const calle = faker.location.street();
      const address = {
        id_address: faker.string.uuid(),
        address: `Calle ${calle}`,	
        number: faker.number.int(300),
        floor: faker.number.int(10), 
        letter_number: faker.number.int(4),
        city: faker.location.city(),
        zip_code: faker.location.zipCode(),
        country: 'España'
      };
      addressData.push(address);
    }
    await db.query(
      `INSERT INTO Addresses (id_address, address, number, floor, letter_number, city, zip_code, country) VALUES ?`,
      [addressData.map(address => Object.values(address))]
    );
    console.log(chalk.bold.green(`✅ Datos insertados en tabla Addresses.`));

    console.log(chalk.bold.blue(`->✏️ Insertando datos en tabla Users...`));
    const userData = [];
    let currentRefUser = 'US-UA000';

    for (let i = 0; i < 80; i++) {
      const id_user = faker.string.uuid();
      const password = ADMIN_PASSWORD;
      const hashedPassword = await bcrypt.hash(password, 12);
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();

      currentRefUser = generateReference3DigitsFromRef('US', 'U', currentRefUser);

      const user = {
        id_user: id_user,
        ref_US: currentRefUser,
        name: firstName,
        last_name: lastName,
        email: faker.internet.email({ 
          firstName: firstName,
          lastName: lastName,
          provider: 'cosmic.com',
         }),
        phone: faker.phone.number(), 
        password: hashedPassword,
        address_id: addressData[i].id_address,
        role: faker.helpers.arrayElement(['salesAgent', 'deliverer']),
        active: faker.datatype.boolean(),
        registration_code: faker.string.uuid(),
        avatar: `https://i.pravatar.cc/150?u=` + id_user,
        biography: faker.lorem.paragraph(),
      };
      userData.push(user);
    }
    await db.query(
      `INSERT INTO Users (id_user, ref_US, name, last_name, email, phone, password, address_id, role, active, registration_code, avatar, biography) VALUES ?`,
      [userData.map(user => Object.values(user))]
    );
    console.log(chalk.bold.green(`✅ Datos insertados en tabla Users.`));

    console.log(chalk.bold.blue(`->✏️ Insertando datos en tabla Customers...`));
    const customerData = [];
    let currentRefCustomer = await getMaxReference3Digits('Customers', 'ref_CT') || 'CT-CA000';
    
    for (let i = 0; i < 100; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const NIF_completo = generarNIF();

      currentRefCustomer = generateReference3DigitsFromRef('CT', 'C', currentRefCustomer);

      const customer = {
        id_customer: faker.string.uuid(),
        ref_CT: currentRefCustomer,
        name: firstName,
        last_name: lastName,
        email: faker.internet.email({ 
          firstName: firstName,
          lastName: lastName,
        }),
        phone: faker.phone.number(),
        company_name: faker.company.name(),
        NIF: NIF_completo,
        address_id: addressData[i + 100].id_address
      };
      customerData.push(customer);
    }
    await db.query(
      `INSERT INTO Customers (id_customer, ref_CT, name, last_name, email, phone, company_name, NIF, address_id) VALUES ?`,
      [customerData.map(customer => Object.values(customer))]
    );
    console.log(chalk.bold.green(`✅ Datos insertados en tabla Customers.`));

    console.log(chalk.bold.blue(`->✏️ Insertando datos en tabla Products...`));
    const productData = [];
    let currentRefProduct = await getMaxReference5Digits('Products', 'ref_PR')  || 'PR-AA00000';

    for (let i = 0; i < 300; i++) {
      currentRefProduct = await generateReference5DigitsFromRef('PR', currentRefProduct);

      const product = {
        id_product: faker.string.uuid(),
        ref_PR: currentRefProduct,
        name: faker.commerce.product(),
        description: faker.lorem.paragraph(),
        price: faker.commerce.price({min: 10, max: 150}),
        stock: faker.number.int({min: 5, max: 1000}), 
        active: faker.datatype.boolean(),
      };
      productData.push(product);
    }
    await db.query(
      `INSERT INTO Products (id_product, ref_PR, name, description, price, stock, active) VALUES ?`,
      [productData.map(product => Object.values(product))]
    );
    console.log(chalk.bold.green(`✅ Datos insertados en tabla Products.`));

    console.log(chalk.bold.blue(`->✏️ Insertando datos en tabla SalesProducts...`));
    const salesProductData = [];
    for (let i = 0; i < 100; i++) {
      const saleProduct = {
        id_saleProduct: faker.string.uuid(),
        product_id: productData[i].id_product,
        quantity: faker.number.int({min: 1, max: 10}), 
        description: faker.lorem.sentence(),
      };
      salesProductData.push(saleProduct);
    }
    await db.query(
      `INSERT INTO SalesProducts (id_saleProduct, product_id, quantity, description) VALUES ?`,
      [salesProductData.map(saleProduct => Object.values(saleProduct))]
    );
    console.log(chalk.bold.green(`✅ Datos insertados en tabla SalesProducts.`));

    console.log(chalk.bold.blue(`->✏️ Insertando datos en tabla Sales...`));
    const salesData = [];
    let currentRefSale = await getMaxReference5Digits('Sales', 'ref_SL') || 'SL-AA00000';

    for (let i = 0; i < 50; i++) {
      currentRefSale = generateReference5DigitsFromRef('SL', currentRefSale);

      const sale = {
        id_sale: faker.string.uuid(),
        ref_SL: currentRefSale,
        user_id: userData[i % 80].id_user,
        saleProduct_id: salesProductData[i].id_saleProduct,
        customer_id: customerData[i].id_customer,
        operation_status: faker.helpers.arrayElement(['open', 'processing', 'cancelled', 'closed']),
      };
      salesData.push(sale);
    }
    await db.query(
      `INSERT INTO Sales (id_sale, ref_SL, user_id, saleProduct_id, customer_id, operation_status) VALUES ?`,
      [salesData.map(sale => Object.values(sale))]
    );
    console.log(chalk.bold.green(`✅ Datos insertados en tabla Sales.`));

    console.log(chalk.bold.blue(`->✏️ Insertando datos en tabla Visits...`));
    const visitData = [];
    let currentRefVisit = await getMaxReference5Digits('Visits', 'ref_VT') || 'VT-AA00000';

    for (let i = 0; i < 50; i++) {
      currentRefVisit = generateReference5DigitsFromRef('VT', currentRefVisit);

      const visit = {
        id_visit: faker.string.uuid(),
        ref_VT: currentRefVisit,
        user_id: userData[i % 80].id_user,
        customer_id: customerData[i].id_customer,
        visit_status: faker.helpers.arrayElement(['scheduled','cancelled', 'completed']),
        visit_date: faker.date.past(),
        observations: faker.lorem.sentence(),
      };
      visitData.push(visit);
    }
    await db.query(
      `INSERT INTO Visits (id_visit, ref_VT, user_id, customer_id, visit_status, visit_date, observations) VALUES ?`,
      [visitData.map(visit => Object.values(visit))]
    );
    console.log(chalk.bold.green(`✅ Datos insertados en tabla Visits.`));

    console.log(chalk.bold.blue(`->✏️ Insertando datos en tabla DeliveryNotes...`));
    const deliveryNoteData = [];
    let currentRefDeliveryNote = await getMaxReference5Digits('DeliveryNotes', 'ref_DN') || 'DN-AA00000';

    for (let i = 0; i < 50; i++) {
      currentRefDeliveryNote = generateReference5DigitsFromRef('DN', currentRefDeliveryNote);

      const deliveryNote = {
        id_note: faker.string.uuid(),
        ref_DN: currentRefDeliveryNote,
        sale_id: salesData[i].id_sale,
        deliverer_id: userData[i % 80].id_user,
        delivery_status: faker.helpers.arrayElement(['pending', 'delivering', 'delivered']),
        customer_id: customerData[i].id_customer,
        address_id: addressData[i].id_address,
        saleProduct_id: salesProductData[i].id_saleProduct,
        delivery_date: faker.date.soon({ days: 5 }),
      };
      deliveryNoteData.push(deliveryNote);
    }
    await db.query(
      `INSERT INTO DeliveryNotes (id_note, ref_DN, sale_id, deliverer_id, delivery_status, customer_id, address_id, saleProduct_id, delivery_date) VALUES ?`,
      [deliveryNoteData.map(deliveryNote => Object.values(deliveryNote))]
    );
    console.log(chalk.bold.green(`✅ Datos insertados en tabla DeliveryNotes.`));

    console.log(chalk.bold.blue(`->✏️ Insertando datos en tabla Shipments...`));
    const shipmentData = [];
    let currentRefShipment = await getMaxReference5Digits('Shipments', 'ref_SH') || 'SH-AA00000';

    for (let i = 0; i < 50; i++) {
      currentRefShipment = generateReference5DigitsFromRef('SH', currentRefShipment);

      const shipment = {
        id_shipment: faker.string.uuid(),
        ref_SH: currentRefShipment,
        customer_id: customerData[i].id_customer,
        address_id: addressData[i].id_address,
        deliveryNote_id: deliveryNoteData[i].id_note,
        shipment_status: faker.helpers.arrayElement(['pending', 'inTransit', 'delivered', 'delayed', 'cancelled']),
        tracking_number: faker.string.alphanumeric(10),
        additional_notes: faker.lorem.sentence(),
      };
      shipmentData.push(shipment);
    }
    await db.query(
      `INSERT INTO Shipments (id_shipment, ref_SH, customer_id, address_id, deliveryNote_id, shipment_status, tracking_number, additional_notes) VALUES ?`,
      [shipmentData.map(shipment => Object.values(shipment))]
    );
    console.log(chalk.bold.green(`✅ Datos insertados en tabla Shipments.`));

    console.log(chalk.bold.blue(`->✏️ Insertando datos en tabla Invoices...`));
    const invoiceData = [];
    let currentRefInvoice = await getMaxReference5Digits('Invoices', 'ref_IN') || 'IN-AA00000';

    for (let i = 0; i < 50; i++) {
      let totalPrice = productData[i].price * salesProductData[i].quantity;
      let includingTax = totalPrice * 0.21;
      let totalAmount = totalPrice + includingTax;

      currentRefInvoice = generateReference5DigitsFromRef('IN', currentRefInvoice);

      const invoice = {
        id_invoice: faker.string.uuid(),
        ref_IN: currentRefInvoice,
        agentUser_id: userData[i].id_user,
        sale_id: salesData[i].id_sale,
        customer_id: customerData[i].id_customer,
        company_name: customerData[i].company_name,
        NIF: customerData[i].NIF,
        address: addressData[i].address,
        total_price: totalPrice.toFixed(2), 
        including_tax: includingTax.toFixed(2), 
        total_amount: totalAmount,
        payment_method: faker.helpers.arrayElement(['cash', 'card', 'transfer']),
        invoice_status: faker.helpers.arrayElement(['pending', 'paid', 'overdue', 'partially_paid', 'cancelled', 'refunded', 'disputed', 'sent']),
        due_date: faker.date.future(),
      };
      invoiceData.push(invoice);
    }
    await db.query(
      `INSERT INTO Invoices (id_invoice, ref_IN, agentUser_id, sale_id, customer_id, company_name, NIF, address, total_price, including_tax, total_amount, payment_method, invoice_status, due_date) VALUES ?`,
      [invoiceData.map(invoice => Object.values(invoice))]
    );
    console.log(chalk.bold.green(`✅ Datos insertados en tabla Invoices.`));

    console.log(chalk.bold.blue(`->✏️ Insertando datos en tabla Payments...`));
    const paymentData = [];
    let currentRefPayment = await getMaxReference5Digits('Payments', 'ref_PM') || 'PM-AA00000';

    for (let i = 0; i < 50; i++) {
      currentRefPayment = generateReference5DigitsFromRef('PM', currentRefPayment);

      const payment = {
        id_payment: faker.string.uuid(),
        ref_PM: currentRefPayment,
        invoice_id: invoiceData[i].id_invoice,
        payment_status: faker.helpers.arrayElement(['pending', 'cancelled', 'paid']),
        payment_date: faker.date.past(),
      };
      paymentData.push(payment);
    }
    await db.query(
      `INSERT INTO Payments (id_payment, ref_PM, invoice_id, payment_status, payment_date) VALUES ?`,
      [paymentData.map(payment => Object.values(payment))]
    );
    console.log(chalk.bold.green(`✅ Datos insertados en tabla Payments.`));

    console.log(chalk.bold.blue(`->✏️ Insertando datos en tabla Modules...`));
    const moduleData = [];
    let currentRefModule = await getMaxReference5Digits('Modules', 'ref_MD') || 'MD-AA00000';

    for (let i = 0; i < 100; i++) {
      currentRefModule = generateReference5DigitsFromRef('MD', currentRefModule);

      let agentUser_id = null;
      let deliveryUser_id = null;
      let service_type = null;
      let sale_id = null;
      let visit_id = null;
      let deliveryNote_id = null;
      let invoice_id = null;
      let payment_id = null;
      let shipment_id = null;

      if (salesData[i] && salesData[i].id_sale) {
        service_type = 'sale';
        sale_id = salesData[i].id_sale;

        const invoice = await selectInvoiceByIdSale(sale_id);
        invoice_id = invoice.id_invoice;
        agentUser_id = invoice.agentUser_id;

        const payment = await selectPaymentByIdInvoice(invoice_id);
        payment_id = payment.id_payment;

        const deliveryNote = await selectDeliveryNoteByIdSale(sale_id);
        deliveryNote_id = deliveryNote.id_note;
        deliveryUser_id  = deliveryNote.deliverer_id;

        const shipment = await selectShipmentByIdDeliveryNote(deliveryNote_id);
        shipment_id = shipment.id_shipment;

      } else {
        service_type = 'visit';
        visit_id = visitData[i - salesData.length].id_visit;
        const user = await selectUserByIdVisit(visit_id);
        agentUser_id = user.user_id;
      }

      const module = {
        id_module: faker.string.uuid(),
        ref_MD: currentRefModule,
        agentUser_id: agentUser_id,
        deliveryUser_id: deliveryUser_id,
        service_type: service_type,
        sale_id: sale_id,
        visit_id: visit_id,
        deliveryNote_id: deliveryNote_id,
        invoice_id: invoice_id,
        payment_id: payment_id,
        shipment_id: shipment_id,
        rating_module: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
        rating_comment: faker.lorem.paragraph(),
      };
      moduleData.push(module);
    }

    await db.query(
      `INSERT INTO Modules (id_module, ref_MD, agentUser_id, deliveryUser_id, service_type, sale_id, visit_id, deliveryNote_id, invoice_id, payment_id, shipment_id, rating_module, rating_comment) VALUES ?`,
      [moduleData.map(module => Object.values(module))]
    );
    console.log(chalk.bold.green(`✅ Datos insertados en tabla Modules.`));

    console.log(chalk.bold.green(`✅ Base de datos inicializada con éxito...`));

  } catch (error) {
    console.error(chalk.bold.red(`❌ Error al insertar datos ficticios: ${error.message}`));
  }
}
