
import {
    SQSClient,
    ReceiveMessageCommand,
    DeleteMessageCommand,
  } from "@aws-sdk/client-sqs";
  import pg from "pg";
  
  const rdsProxyEndpoint = process.env.RDS_PROXY_ENDPOINT;
  const dbName = process.env.DB_NAME;
  const dbUser = process.env.DB_USERNAME;
  const dbPassword = process.env.DB_PASSWORD;
  const dbPort = 5432; 
  const sqsQueueUrl = process.env.SQS_QUEUE_URL;
  
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
  
  const createSQSClient = () => {
    return new SQSClient({ region: "ap-south-1" }); 
  };
  
  
  export const handler = async (event) => {
    const sqsClient = createSQSClient();
    const batchItemFailures = [];
    
    const client = createPostgresClient();
    
    let flag=0;
  
    for (const record of event.Records) {
      try {
        if(flag===1){
          batchItemFailures.push({ itemIdentifier: record.messageId });
          continue;
        }
        processMessage(client, record);
        // await deleteMessageFromQueue(sqsClient, record);
        // console.log(`after deleting record`);
      }
      catch (error) {
        flag=1;
        batchItemFailures.push({ itemIdentifier: record.messageId }); 
        console.error(`Error-->: ${error}`);
      } 
    }
    console.log(`ending client`);
    // await client.end();
    console.log(`returning status 200`);
    console.log(`batch item failures: ${batchItemFailures}`);
    return {
      statusCode: 200,
      body: JSON.stringify({ batchItemFailures }),
    };
  };
  
  
  
  const processMessage = async (client, record) => {
    await client.connect();
    // Extract data from SQS message
  
    try {
      const messageBody = JSON.parse(record.body);
      
      console.log(`Message body: ${messageBody}`);
    
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
          created_at,
          updated_at,
        } = messageBody;
        
        console.log(`this is message body`);
  
        // Insert data into PostgreSQL
          const response = await client.query(
            `SELECT user_id FROM bookings WHERE user_id = '${user_id}'`
          );
        
        console.log('before logging response');
        
        console.log(`Response: ${response}`);
        if (response) {
          return;
        }
  
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
        
        console.log(`Insert Response: ${insertResponse}`);
        return;
      } else {
        console.error("Error: messageBody is undefined.");
        // throw new Error("messageBody is undefined.");
      }
    } catch (error) {
      console.error(
        `Error inserting into PostgreSQL for user_id  and \n error->: ${error}`
      );
      return error;
    }
    return;
  };
  
  
  const deleteMessageFromQueue = async (sqsClient, record) => {
    try {
      const { receiptHandle } = record;
      await sqsClient.send(
        new DeleteMessageCommand({
          QueueUrl: process.env.SQS_QUEUE_URL,
          ReceiptHandle: receiptHandle,
        })
      );
  
      console.log("Done Deleting");
    } catch (error) {
      console.error(`Error deleting message from SQS: ${error}`);
      return error;
      // Handle or log the error as needed
    }
  };
  