import { AddProblemInterface, FindProblemsInterface } from '@/domain/usecases'

export const mockProblems = [
  {
    id: 2054,
    code: 'A00',
    description: 'Cólera',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2055,
    code: 'A01',
    description: 'Febres tifóide e paratifóide',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2056,
    code: 'A02',
    description: 'Outras infecções por Salmonella',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2057,
    code: 'A03',
    description: 'Shiguelose',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2058,
    code: 'A04',
    description: 'Outras infecções intestinais bacterianas',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2059,
    code: 'A05',
    description:
      'Outras intoxicações alimentares bacterianas, não classificadas em outra parte',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export class FindProblemsSpy implements FindProblemsInterface {
  async findMany(): Promise<FindProblemsInterface.Result> {
    return mockProblems
  }
}

export class AddProblemSpy implements AddProblemInterface {
  async add(): Promise<AddProblemInterface.Result> {
    return mockProblems[0]
  }
}
