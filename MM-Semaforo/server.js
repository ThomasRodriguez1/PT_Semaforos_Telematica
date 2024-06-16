const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/getCiclosSemaforos', async (req, res) => {
    try {
        const response = await axios.get('https://pyns33w295.execute-api.us-east-2.amazonaws.com/dev');
        console.log("API Response:", response.data); // Añade esto para depurar
        
        const bodyParsed = JSON.parse(response.data.body);
        
        const datos = {
            ultimoCiclo: bodyParsed.ultimoCiclo,
            timestamp: bodyParsed.timestamp,
            cicloMilisegundos: bodyParsed.cicloMilisegundos,
            ambulanciaNorte: bodyParsed.ambulancias.NORTE,
            ambulanciaSur: bodyParsed.ambulancias.SUR,
            ambulanciaEste: bodyParsed.ambulancias.ESTE,
            ambulanciaOeste: bodyParsed.ambulancias.OESTE,
        };

        res.json(datos);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Failed to fetch data', error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));