const express = require('express');
const app = express();
app.use(express.json());
app.listen(3003, () => {
    console.log("Running at port 3003");
})
let books = [
    { "id": 1, "title": "title1", "author": "author1", "name": "name1" },
    { "id": 2, "title": "title2", "author": "author2", "name": "name2" }
];

//GET Method
app.get('/books', (req, res) => {
    res.json(books);
})


//POST method
app.post('/books', (req, res) => {
    console.log(req.body); //request's body....whatever I give in the data

    const newBook = req.body; // whatever I give in the body is stored here.
    newBook.id = books.length + 1; //increment Id by book length+1

    books.push(newBook); //finally we push newBook in the /book url
    res.status(201).json(books); //and return the json response with udated data.
})
//UPDATE 

app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedbook = req.body;
    console.log(updatedbook);
    const index = books.findIndex(books => books.id === id);
    console.log(index);
    if (index !== -1) {
        books[index] = { ...books[index], ...updatedbook };
        res.json(books[index]);
    }
    else {
        res.status[404].json({ error: ' Book Not Updated' });
    }
})


//DELETE
app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(books => books.id === id);
    if (index !== -1) {
        const deletedBook = books[index];
        books.splice(index, 1);
        res.json(deletedBook);
    }
    else {
        res.status(404).json({ error: 'Not Deleted' });
    }
})