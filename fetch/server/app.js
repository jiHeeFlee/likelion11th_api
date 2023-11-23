const express = require('express')
const app = express()

const cors = require('cors');
app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

let id = 2;
const diaryList = [
    {
        id: 1,
        title: "Frontend",
        content: "얼래벌래?이렇게 하는건가?",
        date: "2023-11-24",
        mood: "야호~",
    },
];

app.get('/', function (req, res) {
    res.send('Hello World!!')
})

app.get("/api/diary", function (req, res) {
    res.json(diaryList);
});

app.post("/api/diary", (req, res) => {
    const { title, content, date, mood } = req.body;
    console.log("Received data:", { title, content, date, mood });

    diaryList.push({
        id: id++,
        title,
        content,
        date,
        mood,
    });

    return res.send({ success: true, diary: diaryList[diaryList.length - 1] });
});

app.delete("/api/diary/:id", (req, res) => {
    const targetId = parseInt(req.params.id);
    const index = diaryList.findIndex((diary) => diary.id === targetId);

    if (index !== -1) {
        diaryList.splice(index, 1);
        return res.send("success");
    } else {
        return res.status(404).send("Not Found");
    }
});

app.listen(4000, () => {
    console.log("server start!")
})