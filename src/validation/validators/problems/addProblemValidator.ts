import { InputValidation } from '@/presentation/protocols'
import { ObjectValidatorAdapter } from '@/infra/validators'

export class AddProblemValidation implements InputValidation {
  constructor(
    private readonly objectValidatorAdapter: ObjectValidatorAdapter
  ) {}

  validate(input: Record<string, unknown> | unknown[]): string[] | null {
    const { validator, isValid } = this.objectValidatorAdapter
    const findPatientSchema = validator.object({
      code: validator.string().required(),
      description: validator.string().required(),
    })

    return isValid(findPatientSchema, input)
  }
}
