import 'dotenv/config';

export const {
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PORT,
  MYSQL_PASSWORD,

  PORT,
  UPLOADS_DIR,
  JWT_SECRET,
} = process.env;
