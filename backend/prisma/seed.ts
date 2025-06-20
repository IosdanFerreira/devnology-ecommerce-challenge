import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Criptografa a senha
  const hashedPassword = await bcrypt.hash('Root12!@', 10);

  await prisma.user.create({
    data: {
      name: 'root',
      email: 'root@example.com',
      password: hashedPassword,
      phone: '(11) 99999-9999',
      address:
        'Rua Exemplo, 123, Bairro Exemplo, Cidade Exemplo, Estado Exemplo',
      privacy_consent: true,
    },
  });

  console.log('Seed executada com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
