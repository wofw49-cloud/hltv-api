import express from "express";
import cors from "cors";
import { HLTV } from "hltv";

const app = express();

app.use(cors());

app.get("/matches", async (req, res) => {

    try {

        const matches = await HLTV.getMatches();

        const formatted = matches.map(match => ({
            id: match.id,
            team1: match.team1?.name || "TBD",
            team2: match.team2?.name || "TBD",
            event: match.event?.name || "Unknown",
            live: match.live
        }));

        res.json(formatted);

    } catch (err) {

        res.status(500).json({
            error: "Failed"
        });

    }

});

app.listen(3000);