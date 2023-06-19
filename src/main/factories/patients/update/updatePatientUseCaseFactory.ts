import { DbUpdatePatient } from '@/data/usecases'
import { PatientPrismaRepository } from '@/infra/db/prisma/patitentRepository/patient'

export const makeUpdatePatientRepository = () => {
  return new DbUpdatePatient(new PatientPrismaRepository())
}
