import { DbFindPatients } from '@/data/usecases'
import { PatientPrismaRepository } from '@/infra/db/prisma/patitentRepository/patient'

export const makeFindPatientsRepository = () => {
  return new DbFindPatients(new PatientPrismaRepository())
}
