import {
  CreatePatientInterface,
  DeletePatientInterface,
  FindPatientInterface,
  FindPatientsInterface,
  UpdatePatientInterface,
} from '@/domain/usecases'

export const mockPatients = [
  {
    id: 29,
    email: 'examplee12@gmail.com.br',
    name: 'Gabriel',
    medicalRecord: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    problems: [
      {
        id: 2054,
        code: 'A00',
        description: 'Cólera',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2133,
        code: 'A92',
        description: 'Outras febres virais transmitidas por mosquitos',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
]

export const mockUpdatedPatient = {
  id: 29,
  email: 'examplee12@gmail.com.br',
  name: 'Gabriel',
  medicalRecord: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
}

export class FindPatientsSpy implements FindPatientsInterface {
  async findMany(): Promise<FindPatientsInterface.Result> {
    return mockPatients
  }
}

export class FindUniquePatientSpy implements FindPatientInterface {
  async findUnique(
    patient: FindPatientInterface.Params
  ): Promise<FindPatientInterface.Result> {
    return mockPatients[0]
  }
}

export class UpdatePatientSpy implements UpdatePatientInterface {
  async update(
    patient: UpdatePatientInterface.Params
  ): Promise<UpdatePatientInterface.Result> {
    return mockUpdatedPatient
  }
}

export class CreatePatientSpy implements CreatePatientInterface {
  async create(): Promise<CreatePatientInterface.Result> {
    return mockPatients[0]
  }
}

export class DeletePatientSpy implements DeletePatientInterface {
  async delete(): Promise<DeletePatientInterface.Result> {
    return true
  }
}
