import {reset, seed} from "drizzle-seed"
import { client, db } from "./connection.ts"
import { schema } from "./schema/index.ts"
import { questions } from "./schema/questions.ts"
import { count } from "console"

await reset(db, schema)

await seed(db, schema).refine(f => {
    return {
        rooms: {
            count: 20,
            columns: {
                name: f.companyName(),
                description: f.loremIpsum()
            }
        }, questions: {
            count: 20
        }
    }
})

await client.end()

console.log("data base seeded")