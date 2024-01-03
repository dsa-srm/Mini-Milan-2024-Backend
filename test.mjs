import pg from "pg";

const rdsProxyEndpoint = process.env.RDS_PROXY_ENDPOINT;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbPort = 5432;

const createPostgresClient = () => {
  return new pg.Pool({
    user: dbUser,
    password: dbPassword,
    host: rdsProxyEndpoint,
    database: dbName,
    port: dbPort,
    ssl: true,
  });
};

export const handler = async (event) => {
  const client = createPostgresClient();

  for (const record of event.Records) {
    await processMessage(client, record);
  }
  console.log(`returning status 200`);
  return {
    statusCode: 200,
  };
};

const processMessage = async (client, record) => {
  let user;
  try {
    await client.connect();
    const messageBody = JSON.parse(record.body);

    if (messageBody) {
      const {
        id,
        ticket_type,
        user_id,
        payment_id,
        ticket_id,
        payment_status,
        ticket_status,
        offline_ticket_issued,
      } = messageBody;

      user = user_id; //for printing it in catch block

      const response = await client.query(
        `SELECT user_id FROM bookings WHERE user_id = '${user_id}' `
      );

      if (response.rows[0]) {
        console.log(`duplicate for ${user_id}`);
        return;
      }
      await client.query("BEGIN");

      const updated_at = new Date();
      const created_at = new Date();
      const insertResponse = await client.query(
        `
        INSERT INTO bookings (
          id,
          ticket_type,
          user_id,
          payment_id,
          ticket_id,
          payment_status,
          ticket_status,
          offline_ticket_issued,
          created_at,
          updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `,
        [
          id,
          ticket_type,
          user_id,
          payment_id,
          ticket_id,
          payment_status,
          ticket_status,
          offline_ticket_issued,
          created_at,
          updated_at,
        ]
      );
      if (insertResponse) {
        const users_updated_at = new Date();
        await client.query(
          `UPDATE users SET is_ticket_issued = true , updated_at = $1 WHERE id = $2;`,
          [users_updated_at, user_id]
        );
        console.log(`bookings and users updated for ${user_id}`);
      }
      await client.query("COMMIT");
      await client.end();
    }
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(
      `Error inserting into PostgreSQL for user_id ${user} and \n error->: ${error}`
    );
    throw new Error(error);
  }
};
