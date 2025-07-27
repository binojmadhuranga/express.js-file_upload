const express = require('express')
const app = express()
const port = 3000
app.use(express.urlencoded())
app.use(express.json())
const cors = require('cors');

const authRoutes = require('./routers/auth-routes');
const customerRoutes = require('./routers/customer-routes');
const imageRoutes = require('./routers/imageRoute');
const path = require('path');

app.use(cors());
app.use('/api/v1/customer', customerRoutes);
app.use('/api/auth', authRoutes);
// Serve uploads folder statically if needed
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Routes
app.use('/api/images', imageRoutes);





app.listen(port, () => {
  console.log(`This app listening on port ${port}`)
})


 

