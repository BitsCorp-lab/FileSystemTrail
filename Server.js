const express = require("express");
const cors = require("cors");
const fs = require("fs");
const {zip} = require("zip-a-folder")

const app = express();

app.use(cors());
app.use(express.json());
const baseFilePath = "./ProjectsDatabase";
const PORT = process.env.PORT

app.post("/api/v1/create", (req, res) => {
  const directoryName = req.body.projectName;
  const directoryPath = `${baseFilePath}/${directoryName}`;
  fs.mkdir(directoryPath, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Directory Created Successfully");
    }
  });
});

app.post("/api/v1/createFile", (req, res) => {
  const directoryName = req.body.projectName;
  const directoryPath = `${baseFilePath}/${directoryName}`;
  const content = "helooo this is me";
  try {
    fs.writeFileSync(`${directoryPath}/some.txt`, content);
    res.send("File Created Successfully");
  } catch (err) {
    res.send(err);
  }
});

const DownloadProject = async (projectName) => {
  const projectNameString = String(projectName);
  return new Promise(async (resolve, reject) => {
    try {
      await zip(
        `${baseFilePath}/${projectNameString}`,
        `${baseFilePath}/CompressedProjects/${projectNameString}.zip`
      );
      resolve();
    } catch (err) {
      console.log(err);
      reject();
    }
  });
};

app.get("/api/v1/download", async (req, res) => {
  const directoryName = req.query.projectName;
  await DownloadProject(directoryName)
    .then(() =>
      res.download(`${baseFilePath}/CompressedProjects/${directoryName}.zip`)
    )
    .catch((err) => console.log(err));
});
app.listen(PORT, () => console.log("Server is running"));
