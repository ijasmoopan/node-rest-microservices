import express from "express";
import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";

const jwtSecret = "my-secret-key";

const app = express();

const port = process.env.PORT || 3002;

app.post("/inventory/auth", (req, res) => {
  const token = jwt.sign({ user: "inventory-service" }, jwtSecret, {
    expiresIn: "1h",
  });
  res.send({ token });
});

app.use(
  expressjwt({ secret: jwtSecret, algorithms: ["HS256"] }).unless({
    path: ["/inventory/auth"],
  })
);

app.get("/inventory", (req, res) => {
  res.send("Hello from the Inventory Microservice!");
});

app.listen(port, () => {
  console.log(`Inventory Microservice listening on port ${port}`);
});
