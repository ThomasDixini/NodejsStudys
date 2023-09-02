import knex from "knex"

export const k = knex({
    client: 'sqlite',
    connection: {
        filename: './tmp/app.db'
    }
})