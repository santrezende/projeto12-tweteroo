import express from "express";

const app = express();
app.use(express.json());

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
    if (!req.body.username || !req.body.avatar || typeof req.body.username !== "string" || typeof req.body.avatar !== "string") {
        res.status(400).send("Todos os campos são obrigatórios!");
        return;
    }
    users.push({
        username: req.body.username,
        avatar: req.body.avatar
    });
    res.status(201).send("CREATED");
});

app.post("/tweets", (req, res) => {
    if (!req.body.username || !req.body.tweet || typeof req.body.username !== "string" || typeof req.body.tweet !== "string") {
        res.status(400).send("Todos os campos são obrigatórios!");
        return;
    }
    const userTweet = users.find(user => user.username === req.body.username);
    if (userTweet) {
        const userAvatar = userTweet.avatar;
        tweets.push({
            username: req.body.username,
            avatar: userAvatar,
            tweet: req.body.tweet
        });
        res.status(201).send("CREATED");
    } else {
        res.status(401).send("UNAUTHORIZED");
    };
});

app.get("/tweets", (req, res) => {
    const lastTweets = tweets.slice(-10);
    res.send(lastTweets);
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));