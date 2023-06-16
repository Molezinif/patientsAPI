import { DbCreatePatient } from '@/data/usecases'
import { PatientPrismaRepository } from '@/infra/db/prisma/patitentRepository/patient'

export const makeCreatePatientsRepository = () => {
  return new DbCreatePatient(new PatientPrismaRepository())
}
