export interface Question {
    question: string;
    student: string;
    classStudent: string;
    tags: string;
}

export interface QuestionCreate {
    question: string;
    studentId: number;
    tags: string;
}
