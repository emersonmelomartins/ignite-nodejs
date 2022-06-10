import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";

interface ICreateCertificate {
  id: string;
  name: string;
  grade: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  // id, name, grade
  const { id, name, grade } = JSON.parse(event.body) as ICreateCertificate;

  // insere dados na tabela criado em serverless.ts
  // put nao retorna dados
  await document
    .put({
      TableName: "users_certificate",
      Item: {
        id,
        name,
        grade,
        created_at: new Date().getTime(),
      },
    })
    .promise();

  // busca informação, sempre retorna um array dentro de Items
  const response = await document
    .query({
      TableName: "users_certificate",
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": id,
      },
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify(response.Items[0]),
  };
};
