import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoal } from '../../services/create-goal'

export const createGoalRoute: FastifyPluginAsyncZod = async app => {
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
}
