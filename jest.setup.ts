import { execSync } from 'child_process'

console.log('🔄 Resetando o banco de dados de teste...')

execSync('npx prisma migrate reset --force --skip-seed --schema=./prisma/schema.prisma', {
  env: {
    ...process.env,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: 'test',
  },
})
