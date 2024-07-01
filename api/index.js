import express from 'express';
import { createItems, updateItems, fetchItems, deleteItems } from './item';
import serverless from "serverless-http";
import cors from "cors";
const app = express();
const port = 3001;

app.use(express.json());
if (process.env.DEVELOPMENT){
    app.use(cors());
}

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/item', async (req, res) => {
    try {
        const items = await fetchItems();
        res.send(items.Items)
    } catch (err) {
        res.status(400).send("Error fetching items: ${err}")
    }
  });

  app.post('/item', async (req, res) => {
    try {
        const items = req.body;
        const response = await createItems(items);
        res.send(response);
    } catch (err) {
        res.status(400).send("Error creating items: ${err}")
    }
  });

  app.put('/item', async (req, res) => {
    try {
        const items = req.body;
        const response = await updateItems(items);
        res.send(response);
    } catch (err) {
        res.status(400).send("Error updating items: ${err}")
    }
  });

  app.delete('/item/id', async (req, res) => {
    try {
        const {id} = req.params;
        const response = await deleteItems(id);
        res.send(response);
    } catch (err) {
        res.status(400).send("Error deleting items: ${err}")
    }
  });
if (process.env.DEVELOPMENT){
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      });
}


export const handler = serverless(app);