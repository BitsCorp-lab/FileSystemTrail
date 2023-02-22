const express = require("express");
const cors = require("cors")
const fs = require('fs')



const app = express();
let corsConfig = {
    "origin": "*",
	"methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
	"preflightContinue": false,
	"optionsSuccessStatus": 200
}
app.use(cors(corsConfig));
app.use(express.json());

app.post("/api/v1/create", (req, res) => {
    const baseFilePath = "./ProjectsDatabase/"



    const directoryName = req.body.projectName
    const directoryPath = `${baseFilePath}/${directoryName}`
     fs.mkdir(directoryPath, (err) => {
        if (err) {
            res.send(err)
        }else {
            res.send("Directory Created Successfully");
        }
    })

});

app.listen(4000, () => console.log("Server is running"));
