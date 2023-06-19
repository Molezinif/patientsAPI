import { DbFindPatient } from '@/data/usecases'
import { PatientPrismaRepository } from '@/infra/db/prisma/patitentRepository/patient'

export const makeFindPatientRepository = () => {
  return new DbFindPatient(new PatientPrismaRepository())
}
