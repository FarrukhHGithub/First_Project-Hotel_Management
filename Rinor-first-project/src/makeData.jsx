import { faker } from '@faker-js/faker';

export const data = [...Array(30)].map((_, index) => ({
  id: index + 1,
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  avatar: faker.image.avatar (),
  username: faker.internet.userName(),
  isAdmin: faker.datatype.boolean(),
}));