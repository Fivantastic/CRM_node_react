import { fakerES as faker } from "@faker-js/faker";
import bcrypt from 'bcrypt';
import chalk from 'chalk';
import { ADMIN_PASSWORD } from "../../env.js";

export async function loadDemoData(db) {
  try {
    // Insertar datos en la tabla Addresses
    console.log(chalk.bold.blue(`->✏️ Insertando datos en tabla Addresses...`));
    const addressData = [];
    for (let i = 0; i < 30; i++) {
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
    for (let i = 0; i < 10; i++) {
      const password = ADMIN_PASSWORD;
      const hashedPassword = await bcrypt.hash(password, 12);
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const user = {
        id_user: faker.string.uuid(),
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
        avatar: faker.image.avatarLegacy(),
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
    for (let i = 0; i < 10; i++) {
      const firstName = faker.person.firstName();
      const customer = {
        id_customer: faker.string.uuid(),
        name: firstName,
        email: faker.internet.email({firstName}),
        phone: faker.phone.number(),
        address_id: addressData[i].id_address,
      };
      customerData.push(customer);
    }
    await db.query(
      `INSERT INTO Customers (id_customer, name, email, phone, address_id) VALUES ?`,
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
    for (let i = 0; i < 10; i++) {
      const sale = {
        id_sale: faker.string.uuid(),
        user_id: userData[i].id_user,
        saleProdut_id: salesProductData[i].id_saleProduct,
        customer_id: customerData[i].id_customer,
        operation_status: faker.helpers.arrayElement(['open', 'closed']),
      };
      salesData.push(sale);
    }
    await db.query(
      `INSERT INTO Sales (id_sale, user_id, saleProdut_id, customer_id, operation_status) VALUES ?`,
      [salesData.map(sale => Object.values(sale))]
    );
    console.log(chalk.bold.green(`✅ Datos insertados en tabla Sales.`));

    // Insertar datos en la tabla Visits
    console.log(chalk.bold.blue(`->✏️ Insertando datos en tabla Visits...`));
    const visitData = [];
    for (let i = 0; i < 10; i++) {
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
    for (let i = 0; i < 10; i++) {
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

// Insertar datos en la tabla Modules
console.log(chalk.bold.blue(`->✏️ Insertando datos en tabla Modules...`));
const moduleData = [];
for (let i = 0; i < 10; i++) {
  const serviceType = faker.helpers.arrayElement(['visit', 'sale', 'deliveryNote']);
  let serviceId = null;

  if (serviceType === 'visit') {
    serviceId = visitData[i].id_visit;
  } else if (serviceType === 'sale') {
    serviceId = salesData[i].id_sale;
  } else if (serviceType === 'deliveryNote') {
    serviceId = deliveryNoteData[i].id_note;
  }

  const module = {
    id_module: faker.string.uuid(),
    user_id: userData[i].id_user,
    service_type: serviceType,
    sale_id: serviceType === 'sale' ? serviceId : null,
    visit_id: serviceType === 'visit' ? serviceId : null,
    deliveryNote_id: serviceType === 'deliveryNote' ? serviceId : null,
  };
  moduleData.push(module);
}
await db.query(
  `INSERT INTO Modules (id_module, user_id, service_type, sale_id, visit_id, deliveryNote_id) VALUES ?`,
  [moduleData.map(module => Object.values(module))]
);
console.log(chalk.bold.green(`✅ Datos insertados en tabla Modules.`));

    console.log(chalk.bold.green(`✅ Todos los datos ficticios insertados con éxito.`));
  } catch (error) {
    console.error(chalk.bold.red(`❌ Error al insertar datos ficticios: ${error.message}`));
  }
}
