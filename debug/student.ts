export class Student {
  // Properties
  name: string;
  age: number;

  // Constructor
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // Method
  greet(courseName: string) {
    console.log(
      `Welcome, ${this.name}!, Glad to have you here in this ${courseName}`,
    );
  }
}
