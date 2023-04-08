import express from "express";

const app = express();
const aloo = {
    name: "san",
    idade: 23
}

app.get("/teste", (req, res) => {
    res.send(aloo)
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));