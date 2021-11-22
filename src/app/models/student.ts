export class Student {
  classId?: string;
  name: string;
  studentId: string;
  typeAnswer: string;
  email: string;
}

export enum TypeAnswer {
  PLUS = "+",
  MINUS = "-",
}

export class ExportCsvStudentDto {
  className: string;
  studentName: string;
  typeAnswer: string;
  email: string;
}
