import { faker } from '@faker-js/faker';

export interface PatientTestData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  phone: string;
}

export class TestDataBuilder {
  static buildPatient(overrides: Partial<PatientTestData> = {}): PatientTestData {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email({ provider: 'ameyatest.com' }),
      password: `Test@${faker.number.int({ min: 1000, max: 9999 })}!`,
      dateOfBirth: faker.date
        .birthdate({ min: 18, max: 70, mode: 'age' })
        .toISOString()
        .split('T')[0],
      phone: faker.phone.number(),
      ...overrides,
    };
  }

  static buildSurveyAnswers(questionCount: number): string[] {
    const options = ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'];
    return Array.from({ length: questionCount }, () =>
      faker.helpers.arrayElement(options)
    );
  }

  static buildMealEntry(): { name: string; calories: number; protein: number } {
    return {
      name: faker.helpers.arrayElement(['Oatmeal', 'Chicken Salad', 'Brown Rice', 'Greek Yogurt']),
      calories: faker.number.int({ min: 150, max: 800 }),
      protein: faker.number.int({ min: 5, max: 50 }),
    };
  }
}
