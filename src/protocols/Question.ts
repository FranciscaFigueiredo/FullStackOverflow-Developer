export interface Question {
    question: string;
    student: string;
    classStudent: string;
    tags: string;
}

export interface QuestionDB {
    id: number;
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
