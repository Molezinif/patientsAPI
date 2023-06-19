import { DbDeletePatient } from '@/data/usecases'
import { PatientPrismaRepository } from '@/infra/db/prisma/patitentRepository/patient'

export const makeDeletePatientRepository = () => {
  return new DbDeletePatient(new PatientPrismaRepository())
}
