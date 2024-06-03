const express = require('express')
const connectDB = require('./config/db.js')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

// Connect to MongoDB
connectDB();

// middelwares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

const roleRouter = require('./routes/role.router.js')
const userRouter = require('./routes/user.router.js')
const authRouter = require('./routes/auth.router.js')

app.use('/api/role', roleRouter)
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

// Define routes
app.get('/', (req, res) => res.send('Hello World!'));

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));