import express from "express";

const app = express();
app.use(express.json());

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {

    users.push({
        username: req.body.username,
        avatar: req.body.avatar
    });

    res.send("OK");

});

app.post("/tweets", (req, res) => {

    const usernameTweet = users.find(user => user.username === req.body.username);

    if (usernameTweet) {
        const userAvatar = usernameTweet.avatar;
        tweets.push({
            username: req.body.username,
            avatar: userAvatar,
            tweet: req.body.tweet
        });
        console.log(tweets);
        res.send("OK");
    } else {
        res.send("UNAUTHORIZED");
    };

});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));