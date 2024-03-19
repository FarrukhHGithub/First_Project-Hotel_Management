import { faker } from '@faker-js/faker';

export const data = [...Array(30)].map((_, index) => ({
  id: index + 1,
  // Removed firstName and lastName
  hotelId: faker.datatype.number(), // Generate random hotel ID
  roomId: faker.datatype.number(), // Generate random room ID
  mobile: faker.phone.number(),
  arrive: faker.date.future().toLocaleDateString(),
  depart: faker.date.future().toLocaleDateString(),
  avatar: faker.image.avatar (),
  // isPaid: faker.datatype.boolean(),
  // You can add more fields here if needed
}));