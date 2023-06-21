import { InputValidation } from '@/presentation/protocols'
import { ObjectValidatorAdapter } from '@/infra/validators'

export class CreatePatientsValidation implements InputValidation {
  constructor(
    private readonly objectValidatorAdapter: ObjectValidatorAdapter
  ) {}

  validate(input: Record<string, unknown> | unknown[]): string[] | null {
    const { validator, isValid } = this.objectValidatorAdapter
    const findPatientSchema = validator.object({
      name: validator.string().required(),
      email: validator.string().required(),
      medicalRecord: validator.string().required(),
      patientProblems: validator.array().items(
        validator.object({
          problemId: validator.number().required(),
        })
      ),
    })

    return isValid(findPatientSchema, input)
  }
}
