const express = require("express");
const connection = require("./config");
const cors = require("cors");

const api = express();

api.use(cors());
api.use(express.json());

api.get("/clients", (req, res) => {
  connection.query(
    "SELECT * from clients WHERE isDeleted = 'N'",
    (err, result) => {
      if (err) res.send("error");
      else res.send(result);
    }
  );
}); //read clients

api.get("/projects", (req, res) => {
  connection.query(
    "SELECT * from projects WHERE isDeleted = 'N'",
    (err, result) => {
      if (err) res.send("error");
      else res.send(result);
    }
  );
}); //read projects

api.get("/clients/:id", (req, res) => {
  connection.query(
    "select * from clients WHERE isDeleted = 'N' AND ID =" + req.params.id,
    (err, result) => {
      if (err) res.send("error");
      else res.send(result);
    }
  );
}); //read particular client

api.get("/projects/:id", (req, res) => {
  connection.query(
    "select * from projects WHERE isDeleted = 'N' AND ProjID =" + req.params.id,
    (err, result) => {
      if (err) {
        return res.status(403).json({ mesage: err.sqlMessage });
      } else res.send(result);
    }
  );
}); //read particular project

api.post("/clients", (req, res) => {
  const data = req.body;
  connection.query("Insert INTO clients SET ?", data, (err, result) => {
    if (err) err;
    res.send(result);
  });
}); //create client

api.post("/projects", (req, res) => {
  const data = req.body;
  connection.query("Insert INTO projects SET ?", data, (err, result) => {
    if (err) err;
    res.send(result);
  });
}); //create project

api.put("/update/clients/:id", (req, res) => {
  const data = [req.body.Name, req.body.Email, req.body.Contact];

  connection.query(
    "UPDATE clients SET Name=?, Email=?, Contact=? WHERE ID = " + req.params.id,
    data,
    (err, result) => {
      if (err) {
        return res.status(403).json({ mesage: err.sqlMessage });
      }
      res.send(result);
    }
  );
}); //update client

api.put("/update/projects/:id", (req, res) => {
  const data = [
    req.body.Name,
    req.body.Description,
    req.body.Status,
    req.body.ClientID,
  ];

  connection.query(
    "UPDATE projects SET Name=?, Description=?, Status=?, ClientID=? WHERE ProjID = " +
      req.params.id,
    data,
    (err, result) => {
      if (err) {
        return res.status(403).json({ mesage: err.sqlMessage });
      }
      res.send(result);
    }
  );
}); //update project

api.put("/delete/client/:id", (req, res) => {
  connection.query(
    "UPDATE clients SET isDeleted = 'Y' WHERE ID = " + req.params.id,

    (err, result) => {
      if (err) return res.status(403).json({ mesage: err.sqlMessage });
      res.send(result);
    }
  );
}); //delete client

api.put("/delete/project/:id", (req, res) => {
  connection.query(
    "UPDATE projects SET isDeleted = 'Y' WHERE ProjID = " + req.params.id,

    (err, result) => {
      if (err) return res.status(403).json({ mesage: err.sqlMessage });
      res.send(result);
    }
  );
}); //delete project

api.listen(3006);
