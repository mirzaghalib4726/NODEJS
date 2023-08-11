const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
];

app.head('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
  
    const index = items.findIndex(item => item.id === itemId);
    if (index !== -1)
    {
      const item = items[index];
      res.set('Item-ID', item.id); // Set a custom header
      res.set('Item-Name', item.name);
      res.sendStatus(200); // Send only headers with a status code
    } 
    else 
    {
      res.status(404).json({ message: 'Item not found' });
    }
});

app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  const data = req.body;
  res.json(data);
});

app.put('/items/:id', (req, res) => {
    let itemId = parseInt(req.params.id);
    const updatedItem = req.body;
    
    const index = items.findIndex(item => item.id === itemId);
    if (index !== -1) 
    {
        items[index] = { ...updatedItem, id: itemId };
        res.json(items[index]);
    } 
    else 
    {
        res.status(404).json({ message: 'Item not found' });
    }
});

app.delete('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
  
    const index = items.findIndex(item => item.id === itemId);
    if (index !== -1) 
    {
        const deletedItem = items.splice(index, 1);
        res.json(deletedItem);
    } 
    else 
    {
        res.status(404).json({ message: 'Item not found' });
    }
});

app.patch('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const updatedFields = req.body;

    const index = items.findIndex(item => item.id === itemId);
    if (index!== -1)
    {
        items[index] = {...items[index], ...updatedFields };
        res.json(items[index]);
    }
    else
    {
        res.status(404).json({ message: 'Item not found' });
    }
});

app.options('/items/', (req, res) => {
    res.header('Allow', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});