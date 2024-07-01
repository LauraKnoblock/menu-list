import { ListTablesCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { 
    UpdateCommand, 
    PutCommand, 
    DynamoDBDocumentClient, 
    ScanCommand, 
    DeleteCommand
 } from "@aws-sdk/lib-dynamodb";
 import crypto from "crypto";


 const client = new DynamoDBClient({ region: "us-east-2"});
 const docClient = DynamoDBDocumentClient.from(client);

 export const fetchItems = async () => {
    const command = new ScanCommand({
        ExpressionAttributeNames: { "#name": "name"},
        ProjectionExpression: "id, #name, vegan",
        TableName: "Items",
    });

    const response = await docClient.send(command);

    return response;
};

     export const createItems = async ({name, vegan}) => {
        const uuid = crypto.randomUUID();
        const command = new PutCommand({
        TableName: "Items",
        Item: {
          id: uuid,
          name,
          vegan
        }
    });
    const response = await docClient.send(command);

    return response;

};
    export const updateItems = async ({id, name, vegan}) => {
     const command = new UpdateCommand({
        TableName: "Items",
        Key: {
            id
        },
        ExpressionAttributeNames: {
            "#name": "name"
        },
        UpdateExpression: "set #name = :n, vegan = :v",
        ExpressionAttributeValues: {
            ":n": name,
            ":v": vegan
        },
        ReturnValues: "ALL_NEW"
        
    });
    const response = await docClient.send(command);

    return response;

};
    export const deleteItems = async (id) => {
        const command = new DeleteCommand({
            TableName: "Items",
            Key: {
                id
            }
        
    });
    const response = await docClient.send(command);

    return response;

};



