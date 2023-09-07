import express from "express";

const app = express()

app.get("/users", (request, response) => {
  console.log("Listagem de usuário")

  response.json(["Diego", "Nadia", "Ligia"])
})

app.listen(3333, () => {
  console.log("APP is running!")
})