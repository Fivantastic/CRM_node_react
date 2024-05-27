import { fakerES as faker } from "@faker-js/faker";
import bcrypt from 'bcrypt';
import chalk from 'chalk';
import { ADMIN_PASSWORD } from "../../env.js";
import { generarNIF } from "../utils/generateNIF.js";
import { selectUserByIdVisit } from "./loadDataModels/selectUserByIdVisit.js";
import { generateReference3DigitsFromRef } from "../utils/generateReference3Digits.js";
import { generateReference5DigitsFromRef } from "../utils/generateReference5Digits.js";
import { getMaxReference3Digits, getMaxReference5Digits } from "../models/getMaxReference.js";

export async function loadMinusData(db) {
  try {
    console.log(chalk.bold.blue(`->✏️ Insertando datos en tabla Addresses...`));
    const addressData = [];
    for (let i = 0; i < 200; i++) {
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

    for (let i = 0; i < 30; i++) {
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
        email: `${firstName}.${lastName.split(' ')[0]}@cosmic.com`,
        phone: `6${faker.number.int(10000000, 99999999)}`,
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
    const companyNames = [
      'Pinturas Martinez SA', 'Colores Vivientes SL', 'Polvos y Pigmentos SCP', 'Autonomo Juan Garcia',
      'Tonos y Texturas SL', 'Polvos Pigmentados SA', 'Color y Vida Autonomo', 'Acabados Perfectos SCP',
      'Pigmentos Naturales SL', 'Tonos Profesionales SA', 'Pigmentos Finos SL', 'Acabados de Calidad SA',
      'Polvos Coloridos SCP', 'Polvos y Acabados SL', 'Colores y Mas SA', 'Pinturas Garcia SL',
      'Pigmentos Garcia SA', 'Tonos de Vida SCP', 'Colores Perfectos SL', 'Polvos de Calidad SA',
      'Pinturas Delgado SL', 'Acabados y Tonos SL', 'Pigmentos Artísticos SA', 'Polvos Duraderos SCP',
      'Colores Maravillosos SL', 'Pigmentos Innovadores SA', 'Tonos y Colores SCP', 'Polvos y Pinturas SL',
      'Colores de Ensueño SA', 'Pigmentos Duraderos SL', 'Polvos Creativos SCP', 'Acabados y Colores SA',
      'Pinturas y Polvos SL', 'Tonos Únicos SCP', 'Pigmentos y Colores SL', 'Colores Garcia SA',
      'Acabados y Polvos SL', 'Pigmentos de Lujo SA', 'Tonos y Acabados SCP', 'Colores Creativos SL'
    ];
    let currentRefCustomer = await getMaxReference3Digits('Customers', 'ref_CT') || 'CT-CA000';
    
    for (let i = 0; i < 80; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const NIF_completo = generarNIF();
      const company_name = companyNames[i % companyNames.length];

      currentRefCustomer = generateReference3DigitsFromRef('CT', 'C', currentRefCustomer);

      const customer = {
        id_customer: faker.string.uuid(),
        ref_CT: currentRefCustomer,
        name: firstName,
        last_name: lastName,
        email: `${firstName}.${lastName.split(' ')[0]}@${faker.helpers.arrayElement(['gmail.com', 'hotmail.com', 'yahoo.es'])}`,
        phone: `6${faker.number.int(10000000, 99999999)}`,
        company_name: company_name,
        NIF: NIF_completo,
        address_id: addressData[i + 30].id_address
      };
      customerData.push(customer);
    }
    await db.query(
      `INSERT INTO Customers (id_customer, ref_CT, name, last_name, email, phone, company_name, NIF, address_id) VALUES ?`,
      [customerData.map(customer => Object.values(customer))]
    );
    console.log(chalk.bold.green(`✅ Datos insertados en tabla Customers.`));

    console.log(chalk.bold.blue(`->✏️ Insertando 50 productos en la tabla Products...`));
    const productNamesAndDescriptions = [
  { name: 'Pintura Epoxi Blanca', description: 'Pintura epoxi blanca de alta calidad para acabados perfectos en cualquier superficie.' },
  { name: 'Pintura Epoxi Negra', description: 'Pintura epoxi negra ideal para revestimientos con un acabado elegante y duradero.' },
  { name: 'Pintura Epoxi Roja', description: 'Pintura epoxi roja para un acabado vibrante y duradero en todo tipo de superficies.' },
  { name: 'Pintura Epoxi Azul', description: 'Pintura epoxi azul, perfecta para interiores y exteriores con alta resistencia.' },
  { name: 'Pintura Epoxi Verde', description: 'Pintura epoxi verde, ideal para crear ambientes frescos y naturales.' },
  { name: 'Pintura Epoxi Amarilla', description: 'Pintura epoxi amarilla de alta cobertura y durabilidad para diversos usos.' },
  { name: 'Pintura Epoxi Naranja', description: 'Pintura epoxi naranja, excelente para destacar áreas y crear efectos llamativos.' },
  { name: 'Pintura Epoxi Morada', description: 'Pintura epoxi morada, proporciona un acabado profundo y elegante.' },
  { name: 'Pintura Epoxi Rosa', description: 'Pintura epoxi rosa, perfecta para decoraciones vibrantes y juveniles.' },
  { name: 'Pintura Epoxi Marrón', description: 'Pintura epoxi marrón, ideal para acabados naturales y cálidos.' },
  { name: 'Pintura Epoxi Gris', description: 'Pintura epoxi gris, excelente para acabados modernos y sofisticados.' },
  { name: 'Pintura Epoxi Plateada', description: 'Pintura epoxi plateada, proporciona un acabado metálico y brillante.' },
  { name: 'Pintura Epoxi Dorada', description: 'Pintura epoxi dorada, ideal para acabados lujosos y llamativos.' },
  { name: 'Pintura Epoxi Beige', description: 'Pintura epoxi beige, perfecta para ambientes cálidos y acogedores.' },
  { name: 'Pintura Epoxi Turquesa', description: 'Pintura epoxi turquesa, ideal para decoraciones frescas y energéticas.' },
  { name: 'Pintura Epoxi Lila', description: 'Pintura epoxi lila, proporciona un acabado suave y relajante.' },
  { name: 'Pintura Epoxi Coral', description: 'Pintura epoxi coral, excelente para ambientes vibrantes y cálidos.' },
  { name: 'Pintura Epoxi Oliva', description: 'Pintura epoxi oliva, ideal para acabados naturales y terrosos.' },
  { name: 'Pintura Epoxi Caqui', description: 'Pintura epoxi caqui, perfecta para acabados discretos y elegantes.' },
  { name: 'Pintura Epoxi Celeste', description: 'Pintura epoxi celeste, ideal para decoraciones frescas y luminosas.' },
  { name: 'Pintura Epoxi Violeta', description: 'Pintura epoxi violeta, proporciona un acabado profundo y sofisticado.' },
  { name: 'Pintura Epoxi Magenta', description: 'Pintura epoxi magenta, ideal para acabados vibrantes y modernos.' },
  { name: 'Pintura Epoxi Ocre', description: 'Pintura epoxi ocre, perfecta para acabados cálidos y naturales.' },
  { name: 'Pintura Epoxi Antracita', description: 'Pintura epoxi antracita, ideal para acabados oscuros y elegantes.' },
  { name: 'Pintura Epoxi Cian', description: 'Pintura epoxi cian, perfecta para acabados frescos y energéticos.' },
  { name: 'Pintura Epoxi Índigo', description: 'Pintura epoxi índigo, proporciona un acabado profundo y sereno.' },
  { name: 'Pintura Epoxi Lavanda', description: 'Pintura epoxi lavanda, ideal para decoraciones suaves y relajantes.' },
  { name: 'Pintura Epoxi Pistacho', description: 'Pintura epoxi pistacho, perfecta para acabados frescos y naturales.' },
  { name: 'Pintura Epoxi Mostaza', description: 'Pintura epoxi mostaza, ideal para acabados cálidos y vibrantes.' },
  { name: 'Pintura Epoxi Siena', description: 'Pintura epoxi siena, proporciona un acabado terroso y natural.' },
  { name: 'Pintura Epoxi Terracota', description: 'Pintura epoxi terracota, ideal para acabados cálidos y acogedores.' },
  { name: 'Pintura Epoxi Marfil', description: 'Pintura epoxi marfil, perfecta para acabados suaves y elegantes.' },
  { name: 'Pintura Epoxi Fucsia', description: 'Pintura epoxi fucsia, ideal para acabados vibrantes y juveniles.' },
  { name: 'Pintura Epoxi Esmeralda', description: 'Pintura epoxi esmeralda, proporciona un acabado profundo y lujoso.' },
  { name: 'Pintura Epoxi Topacio', description: 'Pintura epoxi topacio, ideal para acabados cálidos y brillantes.' },
  { name: 'Pintura Epoxi Granate', description: 'Pintura epoxi granate, perfecta para acabados elegantes y sofisticados.' },
  { name: 'Pintura Epoxi Rubí', description: 'Pintura epoxi rubí, proporciona un acabado profundo y vibrante.' },
  { name: 'Pintura Epoxi Perla', description: 'Pintura epoxi perla, ideal para acabados suaves y luminosos.' },
  { name: 'Pintura Epoxi Grafito', description: 'Pintura epoxi grafito, perfecta para acabados oscuros y modernos.' },
  { name: 'Pintura Epoxi Marengo', description: 'Pintura epoxi marengo, ideal para acabados oscuros y sofisticados.' },
  { name: 'Pintura Epoxi Arcoíris', description: 'Pintura epoxi arcoíris, proporciona un acabado colorido y llamativo.' },
  { name: 'Pintura Epoxi Neón', description: 'Pintura epoxi neón, ideal para acabados brillantes y modernos.' },
  { name: 'Pintura Epoxi Pastel', description: 'Pintura epoxi pastel, perfecta para acabados suaves y acogedores.' },
  { name: 'Pintura Epoxi Multicolor', description: 'Pintura epoxi multicolor, ideal para acabados creativos y únicos.' },
  { name: 'Pintura Epoxi Fluorescente', description: 'Pintura epoxi fluorescente, proporciona un acabado brillante y llamativo.' },
  { name: 'Pintura Epoxi Brillante', description: 'Pintura epoxi brillante, ideal para acabados luminosos y elegantes.' },
  { name: 'Pintura Epoxi Mate', description: 'Pintura epoxi mate, perfecta para acabados suaves y discretos.' },
  { name: 'Pintura Epoxi Satinada', description: 'Pintura epoxi satinada, proporciona un acabado suave y elegante.' },
  { name: 'Pintura Epoxi Metálica', description: 'Pintura epoxi metálica, ideal para acabados brillantes y sofisticados.' },
  { name: 'Pintura Epoxi Translúcida', description: 'Pintura epoxi translúcida, perfecta para acabados suaves y luminosos.' },

  { name: 'Pintura Acrílica Blanca', description: 'Pintura acrílica blanca de alta calidad para un acabado liso y duradero.' },
  { name: 'Pintura Acrílica Negra', description: 'Pintura acrílica negra, ideal para un acabado sofisticado en interiores y exteriores.' },
  { name: 'Pintura Acrílica Roja', description: 'Pintura acrílica roja, perfecta para añadir un toque vibrante a cualquier superficie.' },
  { name: 'Pintura Acrílica Azul', description: 'Pintura acrílica azul, adecuada para ambientes frescos y relajantes.' },
  { name: 'Pintura Acrílica Verde', description: 'Pintura acrílica verde, ideal para crear un ambiente natural y sereno.' },
  { name: 'Pintura Acrílica Amarilla', description: 'Pintura acrílica amarilla, perfecta para destacar áreas y dar luminosidad.' },
  { name: 'Pintura Acrílica Naranja', description: 'Pintura acrílica naranja, excelente para decoraciones llamativas y alegres.' },
  { name: 'Pintura Acrílica Morada', description: 'Pintura acrílica morada, proporciona un acabado elegante y distintivo.' },
  { name: 'Pintura Acrílica Rosa', description: 'Pintura acrílica rosa, ideal para espacios femeninos y juveniles.' },
  { name: 'Pintura Acrílica Marrón', description: 'Pintura acrílica marrón, adecuada para un acabado cálido y acogedor.' },
  { name: 'Pintura Acrílica Gris', description: 'Pintura acrílica gris, perfecta para un acabado moderno y neutral.' },
  { name: 'Pintura Acrílica Plateada', description: 'Pintura acrílica plateada, proporciona un acabado metálico sofisticado.' },
  { name: 'Pintura Acrílica Dorada', description: 'Pintura acrílica dorada, ideal para un acabado lujoso y brillante.' },
  { name: 'Pintura Acrílica Beige', description: 'Pintura acrílica beige, perfecta para ambientes cálidos y neutros.' },
  { name: 'Pintura Acrílica Turquesa', description: 'Pintura acrílica turquesa, ideal para decoraciones frescas y energéticas.' },
  { name: 'Pintura Acrílica Lila', description: 'Pintura acrílica lila, proporciona un acabado suave y relajante.' },
  { name: 'Pintura Acrílica Coral', description: 'Pintura acrílica coral, excelente para ambientes vibrantes y cálidos.' },
  { name: 'Pintura Acrílica Oliva', description: 'Pintura acrílica oliva, ideal para acabados naturales y terrosos.' },
  { name: 'Pintura Acrílica Caqui', description: 'Pintura acrílica caqui, perfecta para acabados discretos y elegantes.' },
  { name: 'Pintura Acrílica Celeste', description: 'Pintura acrílica celeste, ideal para decoraciones frescas y luminosas.' },
  { name: 'Pintura Acrílica Violeta', description: 'Pintura acrílica violeta, proporciona un acabado profundo y sofisticado.' },
  { name: 'Pintura Acrílica Magenta', description: 'Pintura acrílica magenta, ideal para acabados vibrantes y modernos.' },
  { name: 'Pintura Acrílica Ocre', description: 'Pintura acrílica ocre, perfecta para acabados cálidos y naturales.' },
  { name: 'Pintura Acrílica Antracita', description: 'Pintura acrílica antracita, ideal para acabados oscuros y elegantes.' },
  { name: 'Pintura Acrílica Cian', description: 'Pintura acrílica cian, perfecta para acabados frescos y energéticos.' },
  { name: 'Pintura Acrílica Índigo', description: 'Pintura acrílica índigo, proporciona un acabado profundo y sereno.' },
  { name: 'Pintura Acrílica Lavanda', description: 'Pintura acrílica lavanda, ideal para decoraciones suaves y relajantes.' },
  { name: 'Pintura Acrílica Pistacho', description: 'Pintura acrílica pistacho, perfecta para acabados frescos y naturales.' },
  { name: 'Pintura Acrílica Mostaza', description: 'Pintura acrílica mostaza, ideal para acabados cálidos y vibrantes.' },
  { name: 'Pintura Acrílica Siena', description: 'Pintura acrílica siena, proporciona un acabado terroso y natural.' },
  { name: 'Pintura Acrílica Terracota', description: 'Pintura acrílica terracota, ideal para acabados cálidos y acogedores.' },
  { name: 'Pintura Acrílica Marfil', description: 'Pintura acrílica marfil, perfecta para acabados suaves y elegantes.' },
  { name: 'Pintura Acrílica Fucsia', description: 'Pintura acrílica fucsia, ideal para acabados vibrantes y juveniles.' },
  { name: 'Pintura Acrílica Esmeralda', description: 'Pintura acrílica esmeralda, proporciona un acabado profundo y lujoso.' },
  { name: 'Pintura Acrílica Topacio', description: 'Pintura acrílica topacio, ideal para acabados cálidos y brillantes.' },
  { name: 'Pintura Acrílica Granate', description: 'Pintura acrílica granate, perfecta para acabados elegantes y sofisticados.' },
  { name: 'Pintura Acrílica Rubí', description: 'Pintura acrílica rubí, proporciona un acabado profundo y vibrante.' },
  { name: 'Pintura Acrílica Perla', description: 'Pintura acrílica perla, ideal para acabados suaves y luminosos.' },
  { name: 'Pintura Acrílica Grafito', description: 'Pintura acrílica grafito, perfecta para acabados oscuros y modernos.' },
  { name: 'Pintura Acrílica Marengo', description: 'Pintura acrílica marengo, ideal para acabados oscuros y sofisticados.' },
  { name: 'Pintura Acrílica Arcoíris', description: 'Pintura acrílica arcoíris, proporciona un acabado colorido y llamativo.' },
  { name: 'Pintura Acrílica Neón', description: 'Pintura acrílica neón, ideal para acabados brillantes y modernos.' },
  { name: 'Pintura Acrílica Pastel', description: 'Pintura acrílica pastel, perfecta para acabados suaves y acogedores.' },
  { name: 'Pintura Acrílica Multicolor', description: 'Pintura acrílica multicolor, ideal para acabados creativos y únicos.' },
  { name: 'Pintura Acrílica Fluorescente', description: 'Pintura acrílica fluorescente, proporciona un acabado brillante y llamativo.' },
  { name: 'Pintura Acrílica Brillante', description: 'Pintura acrílica brillante, ideal para acabados luminosos y elegantes.' },
  { name: 'Pintura Acrílica Mate', description: 'Pintura acrílica mate, perfecta para acabados suaves y discretos.' },
  { name: 'Pintura Acrílica Satinada', description: 'Pintura acrílica satinada, proporciona un acabado suave y elegante.' },
  { name: 'Pintura Acrílica Metálica', description: 'Pintura acrílica metálica, ideal para acabados brillantes y sofisticados.' },
  { name: 'Pintura Acrílica Translúcida', description: 'Pintura acrílica translúcida, perfecta para acabados suaves y luminosos.' },

  { name: 'Pintura Poliuretano Blanca', description: 'Pintura de poliuretano blanca de alta calidad para acabados perfectos en cualquier superficie.' },
  { name: 'Pintura Poliuretano Negra', description: 'Pintura de poliuretano negra ideal para revestimientos con un acabado elegante y duradero.' },
  { name: 'Pintura Poliuretano Roja', description: 'Pintura de poliuretano roja para un acabado vibrante y duradero en todo tipo de superficies.' },
  { name: 'Pintura Poliuretano Azul', description: 'Pintura de poliuretano azul, perfecta para interiores y exteriores con alta resistencia.' },
  { name: 'Pintura Poliuretano Verde', description: 'Pintura de poliuretano verde, ideal para crear ambientes frescos y naturales.' },
  { name: 'Pintura Poliuretano Amarilla', description: 'Pintura de poliuretano amarilla de alta cobertura y durabilidad para diversos usos.' },
  { name: 'Pintura Poliuretano Naranja', description: 'Pintura de poliuretano naranja, excelente para destacar áreas y crear efectos llamativos.' },
  { name: 'Pintura Poliuretano Morada', description: 'Pintura de poliuretano morada, proporciona un acabado profundo y elegante.' },
  { name: 'Pintura Poliuretano Rosa', description: 'Pintura de poliuretano rosa, perfecta para decoraciones vibrantes y juveniles.' },
  { name: 'Pintura Poliuretano Marrón', description: 'Pintura de poliuretano marrón, ideal para acabados naturales y cálidos.' },
  { name: 'Pintura Poliuretano Gris', description: 'Pintura de poliuretano gris, excelente para acabados modernos y sofisticados.' },
  { name: 'Pintura Poliuretano Plateada', description: 'Pintura de poliuretano plateada, proporciona un acabado metálico y brillante.' },
  { name: 'Pintura Poliuretano Dorada', description: 'Pintura de poliuretano dorada, ideal para acabados lujosos y llamativos.' },
  { name: 'Pintura Poliuretano Beige', description: 'Pintura de poliuretano beige, perfecta para ambientes cálidos y acogedores.' },
  { name: 'Pintura Poliuretano Turquesa', description: 'Pintura de poliuretano turquesa, ideal para decoraciones frescas y energéticas.' },
  { name: 'Pintura Poliuretano Lila', description: 'Pintura de poliuretano lila, proporciona un acabado suave y relajante.' },
  { name: 'Pintura Poliuretano Coral', description: 'Pintura de poliuretano coral, excelente para ambientes vibrantes y cálidos.' },
  { name: 'Pintura Poliuretano Oliva', description: 'Pintura de poliuretano oliva, ideal para acabados naturales y terrosos.' },
  { name: 'Pintura Poliuretano Caqui', description: 'Pintura de poliuretano caqui, perfecta para acabados discretos y elegantes.' },
  { name: 'Pintura Poliuretano Celeste', description: 'Pintura de poliuretano celeste, ideal para decoraciones frescas y luminosas.' },

  { name: 'Pintura Vinílica Blanca', description: 'Pintura vinílica blanca de alta calidad para un acabado liso y duradero.' },
  { name: 'Pintura Vinílica Negra', description: 'Pintura vinílica negra, ideal para un acabado sofisticado en interiores y exteriores.' },
  { name: 'Pintura Vinílica Roja', description: 'Pintura vinílica roja, perfecta para añadir un toque vibrante a cualquier superficie.' },
  { name: 'Pintura Vinílica Azul', description: 'Pintura vinílica azul, adecuada para ambientes frescos y relajantes.' },
  { name: 'Pintura Vinílica Verde', description: 'Pintura vinílica verde, ideal para crear un ambiente natural y sereno.' },
  { name: 'Pintura Vinílica Amarilla', description: 'Pintura vinílica amarilla, perfecta para destacar áreas y dar luminosidad.' },
  { name: 'Pintura Vinílica Naranja', description: 'Pintura vinílica naranja, excelente para decoraciones llamativas y alegres.' },
  { name: 'Pintura Vinílica Morada', description: 'Pintura vinílica morada, proporciona un acabado elegante y distintivo.' },
  { name: 'Pintura Vinílica Rosa', description: 'Pintura vinílica rosa, ideal para espacios femeninos y juveniles.' },
  { name: 'Pintura Vinílica Marrón', description: 'Pintura vinílica marrón, adecuada para un acabado cálido y acogedor.' }
];

    let currentRefProduct = await getMaxReference5Digits('Products', 'ref_PR')  || 'PR-AA00000';
    const productData = [];

    for (let i = 0; i < 100; i++) {
      const { name, description } = productNamesAndDescriptions[i];
      const price = faker.commerce.price({ min: 10, max: 60 });
      const stock = faker.number.int({ min: 100, max: 1000 });
      currentRefProduct = generateReference5DigitsFromRef('PR', currentRefProduct);

      const product = {
        id_product: faker.string.uuid(),
        ref_PR: currentRefProduct,
        name: name,
        description: description,
        price: price,
        stock: stock,
        active: true
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
    for (let i = 0; i < 40; i++) {
      const saleProduct = {
        id_saleProduct: faker.string.uuid(),
        product_id: productData[i].id_product,
        quantity: faker.number.int({ min: 1, max: 10 }),
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
    
    for (let i = 0; i < 40; i++) {
      currentRefSale = generateReference5DigitsFromRef('SL', currentRefSale);
    
      const saleDate = faker.date.recent({ days: 60 }); // Generar fechas en los últimos 2 meses
    
      const sale = {
        id_sale: faker.string.uuid(),
        ref_SL: currentRefSale,
        user_id: userData[i % 30].id_user,
        saleProduct_id: salesProductData[i].id_saleProduct,
        customer_id: customerData[i % 80].id_customer,
        operation_status: 'open',
        create_at: saleDate,
        update_at: null
      };
      salesData.push(sale);
    }
    await db.query(
      `INSERT INTO Sales (id_sale, ref_SL, user_id, saleProduct_id, customer_id, operation_status, create_at, update_at) VALUES ?`,
      [salesData.map(sale => Object.values(sale))]
    );
    console.log(chalk.bold.green(`✅ Datos insertados en tabla Sales.`));
    
    
    console.log(chalk.bold.blue(`->✏️ Insertando datos en tabla Visits...`));
    const visitData = [];
    let currentRefVisit = await getMaxReference5Digits('Visits', 'ref_VT') || 'VT-AA00000';
    
    for (let i = 0; i < 30; i++) {
      currentRefVisit = generateReference5DigitsFromRef('VT', currentRefVisit);
    
      // Generar fechas aleatorias en los últimos 5 meses
      const randomDaysAgo = faker.date.past({ days: 150 });
    
      const visit = {
        id_visit: faker.string.uuid(),
        ref_VT: currentRefVisit,
        user_id: userData[i % 30].id_user,
        customer_id: customerData[i % 80].id_customer,
        visit_status: faker.helpers.arrayElement(['scheduled', 'completed']),
        visit_date: randomDaysAgo,
        observations: faker.lorem.sentence(),
        creation_at: randomDaysAgo,
        update_at: null
      };
      visitData.push(visit);
    }
    await db.query(
      `INSERT INTO Visits (id_visit, ref_VT, user_id, customer_id, visit_status, visit_date, observations, creation_at, update_at) VALUES ?`,
      [visitData.map(visit => Object.values(visit))]
    );
    console.log(chalk.bold.green(`✅ Datos insertados en tabla Visits.`));
    
    

    console.log(chalk.bold.blue(`->✏️ Insertando datos en tabla Modules...`));
    const moduleData = [];
    let currentRefModule = await getMaxReference5Digits('Modules', 'ref_MD') || 'MD-AA00000';

    for (let i = 0; i < 70; i++) {
      currentRefModule = generateReference5DigitsFromRef('MD', currentRefModule);

      let agentUser_id = null;
      let service_type = null;
      let sale_id = null;
      let visit_id = null;

      if (i < 40) {
        service_type = 'sale';
        sale_id = salesData[i].id_sale;
        agentUser_id = salesData[i].user_id;
      } else {
        service_type = 'visit';
        visit_id = visitData[i - 40].id_visit;
        const user = await selectUserByIdVisit(visit_id);
        agentUser_id = user.user_id;
      }

      const module = {
        id_module: faker.string.uuid(),
        ref_MD: currentRefModule,
        agentUser_id: agentUser_id,
        service_type: service_type,
        sale_id: sale_id,
        visit_id: visit_id,
        rating_module: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
        rating_comment: faker.lorem.paragraph(),
      };
      moduleData.push(module);
    }

    await db.query(
      `INSERT INTO Modules (id_module, ref_MD, agentUser_id, service_type, sale_id, visit_id, rating_module, rating_comment) VALUES ?`,
      [moduleData.map(module => Object.values(module))]
    );
    console.log(chalk.bold.green(`✅ Datos insertados en tabla Modules.`));

    console.log(chalk.bold.green(`✅ Base de datos inicializada con éxito...`));

  } catch (error) {
    console.error(chalk.bold.red(`❌ Error al insertar datos ficticios: ${error.message}`));
  }
}
