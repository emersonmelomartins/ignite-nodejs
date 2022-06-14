import { DynamoDB } from "aws-sdk";

export const dynamodbClient = new DynamoDB.DocumentClient({
  region: "localhost",
  endpoint: "http://localhost:8000",
  accessKeyId: "x",
  secretAccessKey: "x",
});
