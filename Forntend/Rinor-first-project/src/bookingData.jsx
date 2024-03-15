import { faker } from '@faker-js/faker';

    export const data = [...Array(30)].map((_, index) => ({
    id: index + 1,
    avatar: faker.image.avatar (),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    mobile: faker.phone.number(),
    arrive: faker.date.future().toLocaleDateString(),
    depart: faker.date.future().toLocaleDateString(),
    isPaid: faker.datatype.boolean(),
    // You can add more fields here if needed
  }));