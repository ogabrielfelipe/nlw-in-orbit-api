import { db } from '../db'
import { goals } from '../db/schema'

interface CreateGoalRequest {
  title: string
  desiredWeekFrequency: number
}

export async function createGoal({
  title,
  desiredWeekFrequency,
}: CreateGoalRequest) {
  const result = await db
    .insert(goals)
    .values({
      title,
      desiredWeekFrequency,
    })
    .returning()

  return {
    goal: result[0],
  }
}
