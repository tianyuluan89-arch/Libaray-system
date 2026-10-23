const express = require('express');
const app = express();
app.use(express.json());

let books = [
    { id: 1, title: "Clean Code", status: "AVAILABLE" },
    { id: 2, title: "Design Patterns", status: "BORROWED" }
];

app.get('/api/books', (req, res) => {
    res.status(200).json(books);
});

app.post('/api/borrow', (req, res) => {
    const bookId = req.body.bookId;
    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }
    if (book.status === "BORROWED") {
        return res.status(409).json({ error: "Book already borrowed" });
    }

    book.status = "BORROWED";
    res.status(200).json({ message: "Successfully borrowed", book: book });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});
