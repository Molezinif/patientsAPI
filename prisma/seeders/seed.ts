import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import csv from 'csv-parser'
const prisma = new PrismaClient()

async function main() {
  try {
    const results: any[] = []

    fs.createReadStream('prisma/seeders/CID.CSV')
      .pipe(csv({ separator: ';' }))
      .on('data', (data) => {
        if (data.CAT === 'CAT') return
        results.push({
          code: data.CAT,
          description: data.DESCRICAO,
        })
      })
      .on('end', async () => {
        for (const item of results) {
          await prisma.problem.create({
            data: {
              code: item.code,
              description: item.description,
            },
          })
        }
      })
    console.log('Import CSV into database successfully!')
  } catch (error) {
    console.error('Something went wrong...', error)
    process.exit(1)
  }
}

main()
