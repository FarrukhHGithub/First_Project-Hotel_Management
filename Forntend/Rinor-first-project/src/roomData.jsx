import { faker } from '@faker-js/faker';

export const Roomdata = [...Array(30)].map((_, index) => ({
  id: index + 1,
  title: faker.commerce.productName(),
  price: faker.commerce.price(1000, 11000), // Generate price between Rs. 1000 and 11000
  maxPeople: Math.floor(Math.random() * 4) + 1, // Max people between 1 and 4
  description: faker.lorem.sentences(3), // Generate 3 sentences for description
  roomNumber: faker.random.numeric(3), // 3 digit room number
}));
