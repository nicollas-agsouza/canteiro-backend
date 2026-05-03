const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'API do Canteiro funcionando.' }));

app.use('/api/plants', require('./routes/plantRoutes'));

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/canteiro')
  .then(() =>
    app.listen(process.env.PORT || 3000, () =>
      console.log(`Servidor Canteiro rodando na porta ${process.env.PORT || 3000}`)
    )
  )
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));
