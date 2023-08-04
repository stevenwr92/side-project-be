import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const data = require('./data.json');
import * as argon from 'argon2';
async function main() {
  try {
    for (const userData of data.users) {
      const hash = await argon.hash(userData.password);
      userData.password = hash;
      await prisma.user.create({
        data: userData, // Pass userData directly to the create function
      });
    }

    for (const outletData of data.outlets) {
      await prisma.outlet.create({
        data: outletData,
      });
    }

    for (const machineData of data.machines) {
      await prisma.machine.create({
        data: machineData,
      });
    }

    console.log('Data seeding completed successfully.');
  } catch (e) {
    console.error('Error seeding data:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
