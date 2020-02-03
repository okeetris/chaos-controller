const express = require("express");
const fs = require("fs");
const exec = require("child_process").exec;

const app = express();
const port = process.env.PORT || "8080";

const filePaths = [
  {
    name: "bp-con-7min-demo",
    path: "/jmeter/boilerplate-concurrency-7min-demo.jmx"
  },
  { name: "bp-con-demo", path: "/jmeter/boilerplate-concurrency-demo.jmx" },
  { name: "bp-db", path: "/jmeter/boilerplate-db.jmx" },
  { name: "bp-spike-demo", path: "/jmeter/boilerplate-spike-demo.jmx" },
  { name: "boilerplate", path: "/jmeter/boilerplate.jmx" },
  { name: "cloudssky", path: "/jmeter/cloudssky.jmx" },
  { name: "defra", path: "/jmeter/defra.jmx" },
  { name: "graphresults", path: "/jmeter/graphresults.jmx" },
  { name: "test", path: "/jmeter/testScript.jmx" }
];

app.get("/file/:fileId", (req, res) => {
  const filePath = filePaths.find(x => x.name === req.params.fileId).path;
  let master_pod = "";
  exec(
    `oc get pod  | grep jmeter-master | awk '{print $1}'`,
    (error, stdout, stderr) => {
      console.log(stdout);
      master_pod = stdout.trim();
      exec(
        // "oc get pods",
        `oc exec -ti ${master_pod} -- /bin/bash /jmeter/load_test ${filePath}`,
        (error, stdout, stderr) => {
          console.log(stdout);
          console.log(stderr);
          if (error !== null) {
            console.log(`exec error: ${error}`);
          }
        }
      );

      console.log(stderr);
      if (error !== null) {
        console.log(`exec error: ${error}`);
      }
    }
  );

  res.status(200).send("DONE");
});

app.listen(port, () => {
  console.log(`Listening to requests on port:${port}`);
});
