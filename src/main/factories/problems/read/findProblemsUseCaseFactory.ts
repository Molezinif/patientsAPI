import { DbFindProblems } from '@/data/usecases/problems'
import { ProblemPrismaRepository } from '@/infra/db/prisma/problemsRepository/problem'

export const makeFindProblemsControllerFactory = () => {
  return new DbFindProblems(new ProblemPrismaRepository())
}
