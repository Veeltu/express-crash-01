const express = require("express")
const path = require("path")
const posts = require("./routes/posts");
const logger = require("./middleware/logger");
const errorHangler = require("./middleware/error");
const notFoundHandler = require("./middleware/notFound");
const envPort = process.env.PORT || 8000;
const myPort = 8000;

const app = express(); // initiate express

// Body parser middleware

// Middleware to parse JSON payloads
app.use(express.json());
// Middleware to parse URL-encoded payloads
app.use(express.urlencoded({ extended: false }))

// Logger middleware
app.use(logger)

// setup static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/api/posts', posts);


// Error handler
app.use(errorHangler)
    // if no endpoing
app.use(notFoundHandler)


app.listen(myPort, () => console.log(`server is on port ${myPort}`))

