import { integer, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Budgets=pgTable("budget", {
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    amount:numeric('amount').notNull(),
    icon:varchar('icon'),
    creactedBy:varchar('createdBy').notNull()
})

export const Expenses=pgTable("expenses", {
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    amount:numeric('amount').notNull(),
    budgetId:integer('budgetId').references(()=>Budgets.id),
    creactedAt:varchar('createdAt').notNull()
})