import { DynamoDB } from "aws-sdk";

const options = {
  region: "localhost",
  endpoint: "http://localhost:8000", // porta padrão dynamo local
  accessKeyId: "x", // credenciais da aws necessarias caso nao seja local
  secretAccessKey: "x", // credenciais da aws necessarias caso nao seja local
};

const isOffline = () => {
  return process.env.IS_OFFLINE;
};

export const document = isOffline()
  ? new DynamoDB.DocumentClient(options)
  : new DynamoDB.DocumentClient();
