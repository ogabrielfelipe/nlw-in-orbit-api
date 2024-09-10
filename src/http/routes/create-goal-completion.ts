import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoalCompletions } from '../../services/create-goal-completion'

export const createGoalCompletionRoute: FastifyPluginAsyncZod = async app => {
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
}
