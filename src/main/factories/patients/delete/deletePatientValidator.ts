import { ObjectValidatorAdapter } from '@/infra/validators'
import { InputValidation } from '@/presentation/protocols'
import { DeletePatientValidation } from '@/validation/validators/patients/deletePatientValidator'

export const makeDeletePatientValidation = (): InputValidation => {
  return new DeletePatientValidation(new ObjectValidatorAdapter())
}
