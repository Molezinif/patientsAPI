import { DbAddProblems } from '@/data/usecases/problems'
import { ProblemPrismaRepository } from '@/infra/db/prisma/problemsRepository/problem'

export const makeAddProblemControllerFactory = () => {
  return new DbAddProblems(new ProblemPrismaRepository())
}
