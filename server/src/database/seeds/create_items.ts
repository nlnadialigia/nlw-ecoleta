import {Knex} from "knex";

async function seed(knex:Knex) {
  await knex("items").insert([
    {tittle: "Lâmpadas", image: "lampadas.svg"},
    {tittle: "Pilhas e baterias", image: "baterias.svg"},
    {tittle: "Papéis e Papelão", image: "papeis-papelao.svg"},
    {tittle: "Resíduos Eletrônicos", image: "eletronicos.svg"},
    {tittle: "Resíduos Orgânicos", image: "organicos.svg"},
    {tittle: "Óleo de Cozinha", image: "oleo.svg"}
  ])
}

export {seed};
