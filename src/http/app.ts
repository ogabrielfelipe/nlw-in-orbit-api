import fastify from 'fastify'
import { createGoal } from '../services/create-goal'
import z from 'zod'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { getWeekPendingGoals } from '../services/get-week-pending-goals'
import { createGoalCompletions } from '../services/create-goal-completion'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.post(
  '/goals',
  {
    schema: {
      body: z.object({
        title: z.string(),
        desiredWeekFrequency: z.number({ coerce: true }).min(1).max(7),
      }),
    },
  },
  async (req, rep) => {
    const { title, desiredWeekFrequency } = req.body

    const create = await createGoal({ title, desiredWeekFrequency })

    return rep.status(201).send({
      goal: create.goal,
    })
  }
)

app.get('/pending-goals', async () => {
  const { pendingGoals } = await getWeekPendingGoals()

  return {
    pendingGoals,
  }
})

app.post(
  '/completions',
  {
    schema: {
      body: z.object({
        goalId: z.string(),
      }),
    },
  },
  async (req, rep) => {
    const { goalId } = req.body

    const result = await createGoalCompletions({
      goalId,
    })

    return rep.status(201).send()
  }
)
