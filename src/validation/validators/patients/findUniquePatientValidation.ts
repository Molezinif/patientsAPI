import { InputValidation } from '@/presentation/protocols'
import { ObjectValidatorAdapter } from '@/infra/validators'

export class FindUniquePatientValidation implements InputValidation {
  constructor(
    private readonly objectValidatorAdapter: ObjectValidatorAdapter
  ) {}

  validate(input: Record<string, unknown> | unknown[]): string[] | null {
    const { validator, isValid } = this.objectValidatorAdapter
    const findPatientSchema = validator.object({
      id: validator.number().required(),
    })

    return isValid(findPatientSchema, input)
  }
}
