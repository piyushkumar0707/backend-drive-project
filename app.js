const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();
const connectDB = require('./config/db');
connectDB();
const indexRouter = require('./routes/index.routes');
app.set('view engine', 'ejs');



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', indexRouter);
app.use('/users', userRoutes);



app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
}); 