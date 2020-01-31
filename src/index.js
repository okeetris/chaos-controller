const express = require("express");
const fs = require("fs");
const exec = require("child_process").exec;

const app = express();
const port = process.env.PORT || "8080";

app.get("/file1", (req, res) => {
  fs.chmod("./test.sh", 0o777, err => {
    if (err) throw err;
    console.log('The permissions for file "my_file.txt" have been changed!');
    exec("sh ./test.sh", (error, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      if (error !== null) {
        console.log(`exec error: ${error}`);
      }
    });
  });

  res.status(200).send("DONE");
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
