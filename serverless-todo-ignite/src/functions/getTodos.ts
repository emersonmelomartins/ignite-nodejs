import { APIGatewayProxyHandler } from "aws-lambda";
import { dynamodbClient } from "../../utils/dynamodbClient";

export const handler: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;

  const todos = await dynamodbClient.query({
    TableName: "todos",
    KeyConditionExpression: "user_id = :user_id",
    ExpressionAttributeValues: {
      ":user_id": user_id
    }
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(todos.Items),
  };
};
