import { ObjectValidatorAdapter } from '@/infra/validators'
import { InputValidation } from '@/presentation/protocols'
import { UpdatePatientValidation } from '@/validation/validators/patients/updatePatientValidator'

export const makeUpdatePatientValidation = (): InputValidation => {
  return new UpdatePatientValidation(new ObjectValidatorAdapter())
}
