import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const app = express();
app.use(express.json());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'Birth')));

app.post('/chat', async (req, res) => {
    const { message, personality } = req.body;

    try {
        const response = await fetch('https://api.awanllm.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.AWAN_API_KEY}`
            },
            body: JSON.stringify({
                model: 'Awanllm-Llama-3-8B-Cumulus',
                messages: [
                    { role: 'system', content: personality },
                    { role: 'user', content: message }
                ]
            })
        });

        const data = await response.json();

        if (data.error) {
            console.error("API Error:", data.error);
            return res.json({ reply: `Error from AI API: ${data.error.message || 'Unknown error'}` });
        }

        if (!data.choices?.[0]?.message) {
            console.error("Unexpected API response:", data);
            return res.json({ reply: "Hmm, I couldn't think of a reply!" });
        }

        res.json({ reply: data.choices[0].message.content });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Birth', 'index.html'));
});

app.listen(5000, () => console.log('Server running on port 5000'));
