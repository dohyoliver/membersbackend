import { payment, PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
 

  const amountOfUsers = 15;

  const pay: payment[] = [];

  for (let i = 0; i < amountOfUsers; i++) {
 

    const pays: payment = {
        id:i,
        member_id: faker.number.int({ min: 1, max: 10 }),
        amount: faker.number.int({ min:5000, max:5000 }),
        paid_at: faker.date.anytime(),

     
    };

    pay.push(pays);
  }

  const addpayment = async () => await prisma.payment.createMany({ data: pay });

  addpayment();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });