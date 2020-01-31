const express = require("express");
const fs = require("fs");
const exec = require("child_process").exec;

const app = express();
const port = process.env.PORT || "8080";

const filePaths = [
  { name: "bp-con-7min-demo", path: "boilerplate-concurrency-7min-demo.jmx" },
  { name: "bp-con-demo", path: "boilerplate-concurrency-demo.jmx" },
  { name: "bp-db", path: "boilerplate-db.jmx" },
  { name: "bp-spike-demo", path: "boilerplate-spike-demo.jmx" },
  { name: "boilerplate", path: "boilerplate.jmx" },
  { name: "cloudssky", path: "cloudssky.jmx" },
  { name: "defra", path: "defra.jmx" },
  { name: "graphresults", path: "graphresults.jmx" }
];

app.get("/file/:fileId", (req, res) => {
  const filePath = filePaths.find(x => x.name === req.params.fileId).path;

  exec(
    `oc exec -ti $master_pod -- /bin/bash /jmeter/load_test ${filePath}`,
    (error, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      if (error !== null) {
        console.log(`exec error: ${error}`);
      }
    }
  );

  res.status(200).send("DONE");
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
