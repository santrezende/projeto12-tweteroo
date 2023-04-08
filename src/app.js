import express from "express";

const app = express();
app.use(express.json());

const users = [];

app.post("/sign-up", (req, res) => {
    users.push(req.body.username);
    console.log(users);
    res.send("OK");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));