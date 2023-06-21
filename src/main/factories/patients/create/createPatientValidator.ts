import { ObjectValidatorAdapter } from '@/infra/validators'
import { InputValidation } from '@/presentation/protocols'
import { CreatePatientsValidation } from '@/validation/validators/patients/createPatientsValidator'

export const makeCreatePatientValidation = (): InputValidation => {
  return new CreatePatientsValidation(new ObjectValidatorAdapter())
}
