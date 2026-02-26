import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const workouts = sqliteTable('workouts', {
    id: text('id').primaryKey(),
    type: text('type').notNull(), // course, musculation, vélo
    duration: integer('duration').notNull(),
    intensity: text('intensity').notNull(), // faible, moyenne, élevée
    date: text('date').notNull(), // stored as ISO string
    notes: text('notes'),
});
