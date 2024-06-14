import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Budgets=pgTable("budget", {
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    amount:varchar('amount').notNull(),
    icon:varchar('icon'),
    creactedBy:varchar('createdBy').notNull()
})
