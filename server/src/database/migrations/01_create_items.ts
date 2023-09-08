import {Knex} from "knex";

async function up(knex: Knex) {
  return knex.schema.createTable("items", table => {
    table.increments("id").primary()
    table.string("image").notNullable()
    table.string("tittle").notNullable()
  })
}

async function down(knex: Knex) {
  return knex.schema.dropTable("items")
}

export {down, up};
