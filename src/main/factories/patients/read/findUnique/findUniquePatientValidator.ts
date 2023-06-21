import { ObjectValidatorAdapter } from '@/infra/validators'
import { InputValidation } from '@/presentation/protocols'
import { FindUniquePatientValidation } from '@/validation/validators/patients/findUniquePatientValidation'

export const makeFindUniquePatientValidation = (): InputValidation => {
  return new FindUniquePatientValidation(new ObjectValidatorAdapter())
}
