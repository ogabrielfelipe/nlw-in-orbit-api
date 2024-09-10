import { client, db } from '.'
import { goalCompletions, goals } from './schema'
import dayjs from 'dayjs'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const resultGoals = await db
    .insert(goals)
    .values([
      { title: 'Acordar Cedo', desiredWeekFrequency: 5 },
      { title: 'Meditar', desiredWeekFrequency: 2 },
      { title: 'Me exercitar', desiredWeekFrequency: 6 },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    { goalId: resultGoals[0].id, createdAt: startOfWeek.toDate() },
    {
      goalId: resultGoals[1].id,
      createdAt: startOfWeek.add(1, 'day').toDate(),
    },
  ])
}

seed().finally(() => {
  client.end()
})
