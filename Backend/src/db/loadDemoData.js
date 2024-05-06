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

export async function loadDemoData(db) {
  try {
    // Insertar datos en la tabla Addresses
    console.log(chalk.bold.blue(`->✏️ Insertando datos en tabla Addresses...`));
    const addressData = [];
    for (let i = 0; i < 40; i++) {
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

    // Insertar datos en la tabla Users
    console.log(chalk.bold.blue(`->✏️ Insertando datos en tabla Users...`));
    const userData = [];
    for (let i = 0; i < 20; i++) {
      const id_user = faker.string.uuid();
      const password = ADMIN_PASSWORD;
      const hashedPassword = await bcrypt.hash(password, 12);
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const user = {
        id_user: id_user,
        name: firstName,
        last_name: lastName,
        email: faker.internet.email({ 
          firstName: firstName,
          lastName: lastName,
          provider: 'cosmic.com' }),
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
      `INSERT INTO Users (id_user, name, last_name, email, phone, password, address_id, role, active, registration_code, avatar, biography) VALUES ?`,
      [userData.map(user => Object.values(user))]
    );
    console.log(chalk.bold.green(`✅ Datos insertados en tabla Users.`));

    // Insertar datos en la tabla Customers
    console.log(chalk.bold.blue(`->✏️ Insertando datos en tabla Customers...`));
    const customerData = [];
    for (let i = 20; i < 30; i++) {
      const firstName = faker.person.firstName();
      const NIF_completo = generarNIF();
      const customer = {
        id_customer: faker.string.uuid(),
        name: firstName,
        email: faker.internet.email({firstName}),
        phone: faker.phone.number(),
        company_name: faker.company.name(),
        NIF: NIF_completo,
        address_id: addressData[i].id_address
      };
      customerData.push(customer);
    }
    await db.query(
      `INSERT INTO Customers (id_customer, name, email, phone, company_name, NIF, address_id) VALUES ?`,
      [customerData.map(customer => Object.values(customer))]
    );
    console.log(chalk.bold.green(`✅ Datos insertados en tabla Customers.`));

    // Insertar datos en la tabla Products
    console.log(chalk.bold.blue(`->✏️ Insertando datos en tabla Products...`));
    const productData = [];
    for (let i = 0; i < 30; i++) {
      const product = {
        id_product: faker.string.uuid(),
        name: faker.commerce.product(),
        description: faker.lorem.paragraph(),
        price: faker.commerce.price(),
        stock: faker.number.int(1000), 
        product_status: faker.helpers.arrayElement(['active', 'inactive']),
      };
      productData.push(product);
    }
    await db.query(
      `INSERT INTO Products (id_product, name, description, price, stock, product_status) VALUES ?`,
      [productData.map(product => Object.values(product))]
    );
    console.log(chalk.bold.green(`✅ Datos insertados en tabla Products.`));

    // Insertar datos en la tabla SalesProducts
    console.log(chalk.bold.blue(`->✏️ Insertando datos en tabla SalesProducts...`));
    const salesProductData = [];
    for (let i = 0; i < 10; i++) {
      const saleProduct = {
        id_saleProduct: faker.string.uuid(),
        product_id: productData[i].id_product,
        quantity: faker.number.int(10), 
        description: faker.lorem.sentence(),
      };
      salesProductData.push(saleProduct);
    }
    await db.query(
      `INSERT INTO SalesProducts (id_saleProduct, product_id, quantity, description) VALUES ?`,
      [salesProductData.map(saleProduct => Object.values(saleProduct))]
    );
    console.log(chalk.bold.green(`✅ Datos insertados en tabla SalesProducts.`));

    // Insertar datos en la tabla Sales
    console.log(chalk.bold.blue(`->✏️ Insertando datos en tabla Sales...`));
    const salesData = [];
    for (let i = 0; i < 5; i++) {
      const sale = {
        id_sale: faker.string.uuid(),
        user_id: userData[i].id_user,
        saleProduct_id: salesProductData[i].id_saleProduct,
        customer_id: customerData[i].id_customer,
        operation_status: faker.helpers.arrayElement(['open', 'closed']),
      };
      salesData.push(sale);
    }
    await db.query(
      `INSERT INTO Sales (id_sale, user_id, saleProduct_id, customer_id, operation_status) VALUES ?`,
      [salesData.map(sale => Object.values(sale))]
    );
    console.log(chalk.bold.green(`✅ Datos insertados en tabla Sales.`));

    // Insertar datos en la tabla Visits
    console.log(chalk.bold.blue(`->✏️ Insertando datos en tabla Visits...`));
    const visitData = [];
    for (let i = 3; i < 8; i++) {
      const visit = {
        id_visit: faker.string.uuid(),
        user_id: userData[i].id_user,
        customer_id: customerData[i].id_customer,
        visit_status: faker.helpers.arrayElement(['scheduled', 'completed']),
        visit_date: faker.date.past(),
        observations: faker.lorem.sentence(),
        rating_visit: faker.helpers.arrayElement([null, null, null, '1', '2', '3', '4', '5']),
        rating_comment: faker.lorem.paragraph(),
      };
      visitData.push(visit);
    }
    await db.query(
      `INSERT INTO Visits (id_visit, user_id, customer_id, visit_status, visit_date, observations, rating_visit, rating_comment) VALUES ?`,
      [visitData.map(visit => Object.values(visit))]
    );
    console.log(chalk.bold.green(`✅ Datos insertados en tabla Visits.`));

    // Insertar datos en la tabla DeliveryNotes
    console.log(chalk.bold.blue(`->✏️ Insertando datos en tabla DeliveryNotes...`));
    const deliveryNoteData = [];
    for (let i = 0; i < 5; i++) {
      const deliveryNote = {
        
        id_note: faker.string.uuid(),
        sale_id: salesData[i].id_sale,
        deliverer_id: userData[i].id_user,
        delivery_status: faker.helpers.arrayElement(['pending', 'delivering', 'delivered','pending','pending','pending','pending','pending',]),
        address_id: addressData[i].id_address,
        saleProduct_id: salesProductData[i].id_saleProduct,
        delivery_date: faker.date.soon({ days: 3 }),
      };
      deliveryNoteData.push(deliveryNote);
    }
    await db.query(
      `INSERT INTO DeliveryNotes (id_note, sale_id, deliverer_id, delivery_status, address_id, saleProduct_id, delivery_date) VALUES ?`,
      [deliveryNoteData.map(deliveryNote => Object.values(deliveryNote))]
    );
    console.log(chalk.bold.green(`✅ Datos insertados en tabla DeliveryNotes.`));

    console.log(chalk.bold.blue(`->✏️ Insertando datos en tabla Shipments...`));
    const shipmentData = [];
    for (let i = 0; i < 5; i++) {
      const shipment = {
        id_shipment: faker.string.uuid(),
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
      `INSERT INTO Shipments (id_shipment, customer_id, address_id, deliveryNote_id, shipment_status, tracking_number, additional_notes) VALUES ?`,
      [shipmentData.map(shipment => Object.values(shipment))]
    );
    console.log(chalk.bold.green(`✅ Datos insertados en tabla Shipments.`));
  
    // Insertar datos en la tabla Invoices
    console.log(chalk.bold.blue(`->✏️ Insertando datos en tabla Invoices...`));
    const invoiceData = [];
    for (let i = 0; i < 5; i++) {
      const invoice = {
        id_invoice: faker.string.uuid(),
        agentUser_id: userData[i].id_user,
        sale_id: salesData[i].id_sale,
        customer_id: customerData[i].id_customer,
        company_name: customerData[i].company_name,
        NIF: customerData[i].NIF,
        address: addressData[i].address,
        total_price: faker.finance.amount(),
        including_tax: faker.finance.amount(),
        total_amount: faker.finance.amount(),
        payment_method: faker.helpers.arrayElement(['cash', 'card', 'transfer']),
        invoice_status: faker.helpers.arrayElement(['pending', 'pending', 'pending', 'pending', 'pending', 'pending', 'pending', 'pending', 'paid', 'paid', 'paid', 'paid', 'paid', 'paid', 'paid', 'paid', 'overdue', 'partially_paid', 'cancelled', 'refunded', 'disputed', 'sent']),
        due_date: faker.date.future(),
      };
      invoiceData.push(invoice);
    }
    await db.query(
      `INSERT INTO Invoices (id_invoice, agentUser_id, sale_id, customer_id, company_name, NIF, address, total_price, including_tax, total_amount, payment_method, invoice_status, due_date) VALUES ?`,
      [invoiceData.map(invoice => Object.values(invoice))]
    );
    console.log(chalk.bold.green(`✅ Datos insertados en tabla Invoices.`));
  
    // Insertar datos en la tabla Payments
    console.log(chalk.bold.blue(`->✏️ Insertando datos en tabla Payments...`));
    const paymentData = [];
    for (let i = 0; i < 5; i++) {
      const payment = {
        id_payment: faker.string.uuid(),
        invoice_id: invoiceData[i].id_invoice,
        amount: faker.finance.amount(),
        payment_status: faker.helpers.arrayElement(['pending', 'cancelled', 'paid']),
        payment_date: faker.date.past(),
      };
      paymentData.push(payment);
    }
    await db.query(
      `INSERT INTO Payments (id_payment, invoice_id, amount, payment_status, payment_date) VALUES ?`,
      [paymentData.map(payment => Object.values(payment))]
    );
    console.log(chalk.bold.green(`✅ Datos insertados en tabla Payments.`));
  
    // Insertar datos en la tabla Modules
    console.log(chalk.bold.blue(`->✏️ Insertando datos en tabla Modules...`));
    const moduleData = [];
    for (let i = 0; i < 10; i++) {

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

        // obtener id de factura
        const invoice = await selectInvoiceByIdSale(sale_id);
        invoice_id = invoice.id_invoice;
        agentUser_id = invoice.agentUser_id;

        //obtener id pago de la factura
        const payment = await selectPaymentByIdInvoice(invoice_id);
        payment_id = payment.id_payment;

        //obtener id de delivery note de la venta
        const deliveryNote = await selectDeliveryNoteByIdSale(sale_id);
        deliveryNote_id = deliveryNote.id_note;
        deliveryUser_id  = deliveryNote.deliverer_id;

        //obtener id de shipment del albaran
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
        agentUser_id: agentUser_id,
        deliveryUser_id: deliveryUser_id,
        service_type: service_type,
        sale_id: sale_id,
        visit_id: visit_id,
        deliveryNote_id: deliveryNote_id,
        invoice_id: invoice_id,
        payment_id: payment_id,
        shipment_id: shipment_id,
        rating_module: faker.helpers.arrayElement([1, 2, 3, 4, 5, 5, 5, 5, 5, 5]),
        rating_comment: faker.lorem.paragraph(),
      };
      moduleData.push(module);
    }

    await db.query(
      `INSERT INTO Modules (id_module, agentUser_id, deliveryUser_id, service_type, sale_id, visit_id, deliveryNote_id, invoice_id, payment_id, shipment_id, rating_module, rating_comment) VALUES ?`,
      [moduleData.map(module => Object.values(module))]
    );

    console.log(chalk.bold.green(`✅ Datos insertados en tabla Modules.`));
  
    console.log(chalk.bold.green(`✅ Base de datos inicializada con éxito...`));
  
  } catch (error) {
    console.error(chalk.bold.red(`❌ Error al insertar datos ficticios: ${error.message}`));
  }
}
