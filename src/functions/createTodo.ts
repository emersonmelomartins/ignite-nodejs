import { APIGatewayProxyHandler } from "aws-lambda";
import { dynamodbClient } from "../../utils/dynamodbClient";
import {v4 as uuid} from 'uuid';

interface ICreateTodo {
  user_id: string;
  title: string;
  deadline: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const { title, deadline } = JSON.parse(event.body) as ICreateTodo;

  const { user_id } = event.pathParameters;

  const todo = {
    id: uuid(),
    user_id,
    title,
    deadline,
    done: false,
  };

  await dynamodbClient
    .put({
      TableName: "todos",
      Item: todo,
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify(todo),
  };
};
