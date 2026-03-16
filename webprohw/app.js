const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const app = express();
const port = 8000;

app.use(express.json()); 
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const BookSchema = {
    id: 'number',
    name: 'string',
    year: 'string',
    price: 'number',
    stock: 'number'
};

let books = [
    { id: 1, name: "Turtle and Rabbit", year: "2000", price: 550, stock: 20 },
    { id: 2, name: "Alevel Math Advance", year: "2024", price: 1200, stock: 10 },
    { id: 3, name: "Alevel Math Beginer", year: "2024", price: 800, stock: 12 },
    { id: 4, name: "Physics for Alevel", year: "2023", price: 950, stock: 15 },
    { id: 5, name: "Chemistry 101", year: "2021", price: 700, stock: 8 },
    { id: 6, name: "Biology Basics", year: "2022", price: 650, stock: 5 },
    { id: 7, name: "History of Art", year: "2019", price: 400, stock: 18 },
    { id: 8, name: "World Geography", year: "2020", price: 500, stock: 22 },
    { id: 9, name: "Computer Science Intro", year: "2023", price: 1100, stock: 14 },
    { id: 10, name: "English Literature", year: "2021", price: 600, stock: 9 }
];
let counter = 10; 

app.get('/books', (req, res) => {
    let result = [...books];
    const { search, sortBy, order } = req.query;

    if (search) {
        result = result.filter(book =>
            book.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (sortBy) {
        result.sort((a, b) => {
            if (order === 'desc') {
                return a[sortBy] < b[sortBy] ? 1 : -1;
            }
            return a[sortBy] > b[sortBy] ? 1 : -1;
        });
    }

    const bookList = result.map(book => {
        return {
            id: book.id,
            name: book.name,
            year: book.year,
            priceDisplay: `฿${book.price}`
        };
    });

    res.status(200).json(bookList);
});

app.post('/books', (req, res) => {
    let newBook = req.body;

    if (!newBook.name || !newBook.price) {
        return res.status(400).json({ message: "Name and Price are required" });
    }

    newBook.id = counter++;
    books.push(newBook);

    res.status(201).json({
        message: "Book added to inventory",
        data: newBook
    });
});

app.get('/books/:id', (req, res) => {
    let id = Number(req.params.id);
    let book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
});

app.put('/books/:id', (req, res) => {
    let id = Number(req.params.id);
    let updateData = req.body;
    let index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    books[index].name = updateData.name || books[index].name;
    books[index].year = updateData.year || books[index].year;
    books[index].price = updateData.price || books[index].price;
    books[index].stock = updateData.stock || books[index].stock;

    res.status(200).json({
        message: "Update book complete",
        data: books[index]
    });
});

app.delete('/books/:id', (req, res) => {
    let id = Number(req.params.id);
    let index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    books.splice(index, 1);

    res.status(200).json({
        message: "Deleted book from inventory successfully",
        indexDeleted: index
    });
});

app.listen(port, () => {
    console.log(`Book Store API & Docs is running:`);
    console.log(`- API: http://localhost:${port}`);
    console.log(`- Docs: http://localhost:${port}/api-docs`);
});
