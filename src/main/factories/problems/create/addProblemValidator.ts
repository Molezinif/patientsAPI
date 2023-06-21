import { ObjectValidatorAdapter } from '@/infra/validators'
import { InputValidation } from '@/presentation/protocols'
import { AddProblemValidation } from '@/validation/validators/problems/addProblemValidator'

export const makeAddProblemValidation = (): InputValidation => {
  return new AddProblemValidation(new ObjectValidatorAdapter())
}
