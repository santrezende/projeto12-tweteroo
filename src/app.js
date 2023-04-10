import express from "express";

const app = express();
app.use(express.json());

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
    if (!req.body.username || !req.body.avatar || typeof req.body.username !== "string" || typeof req.body.avatar !== "string") {
        return res.status(400).send("Todos os campos são obrigatórios!");
    };
    users.push({
        username: req.body.username,
        avatar: req.body.avatar
    });
    res.status(201).send("CREATED");
});

app.post("/tweets", (req, res) => {
    if (!req.headers.user || !req.body.tweet || typeof req.headers.user !== "string" || typeof req.body.tweet !== "string") {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }
    const userTweet = users.find(user => user.username === req.headers.user);
    if (userTweet) {
        const userAvatar = userTweet.avatar;
        tweets.push({
            username: req.headers.user,
            avatar: userAvatar,
            tweet: req.body.tweet
        });
        res.status(201).send("CREATED");
    } else {
        res.status(401).send("UNAUTHORIZED");
    };
});

app.get("/tweets", (req, res) => {
    const page = parseInt((req.query.page) * 10);
    if (page && page >= 1) {
        const tweetsPage = tweets.slice((page - 10), page);
        return res.status(200).send(tweetsPage);
    } else if (page < 1) {
        return res.status(400).send("Informe uma página válida!");
    }
    const lastTweets = tweets.slice(-10);
    res.send(lastTweets);
});

app.get("/tweets/:username", (req, res) => {
    const username = req.params.username;
    const userTweets = tweets.filter(tweet => tweet.username === username);
    res.status(200).send(userTweets);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));