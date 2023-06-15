import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.patient.create({
    data: {
      name: 'John Doe',
      email: 'example@email.com',
      medicalRecord: '1',
    },
  })

  await prisma.problem.create({
    data: {
      code: 'A00',
      description: 'Cholera',
    },
  })

  await prisma.patientProblem.create({
    data: {
      patientId: 1,
      problemId: 1,
    },
  })
}

main()
