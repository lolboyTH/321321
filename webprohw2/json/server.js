const express = require('express');
const UserSerializer = require('./serializers/user.serializer');
const BookSerializer = require('./serializers/book.serializer');
const app = express();

app.get('/api/users/:id', (req, res) => {
    const userData = {
        id: req.params.id,
        firstName: 'Somsak',
        lastName: 'Dev',
        email: 'somsak@example.com',
        occupation: 'Software Engineer'
    };

    const jsonApiData = UserSerializer.serialize(userData);
    
    res.set('Content-Type', 'application/vnd.api+json');
    res.send(jsonApiData);
});

//
app.get('/api/books/:id', (req, res) => {
    const bookData = {
        id: req.params.id,
        title: 'Turtle and Rabbit',
        isbn: '9781441564252',
        author: 'Fereshteh Ajdari',
        category: ['Children']
    };

    const jsonApiData = BookSerializer.serialize(bookData);
    
    res.set('Content-Type', 'application/vnd.api+json');
    res.send(jsonApiData);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`JSON:API Server is running on http://localhost:${PORT}`);
});