import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/matches", async (req, res) => {
    try {

        const response = await fetch("https://www.hltv.org/matches");

        const html = await response.text();

        // jednoduchý hack: vytáhneme názvy týmů z HTML
        const matches = [];

        const regex = /team-name[^>]*>([^<]+)<\/div>/g;

        let match;
        const teams = [];

        while ((match = regex.exec(html)) !== null) {
            teams.push(match[1].trim());
        }

        // spárujeme po dvojicích
        for (let i = 0; i < teams.length; i += 2) {
            if (teams[i + 1]) {
                matches.push({
                    team1: teams[i],
                    team2: teams[i + 1],
                    live: false
                });
            }
        }

        res.json(matches.slice(0, 10));

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to load matches" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("running"));
