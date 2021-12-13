export interface Answer {
    answer: string;
}

export interface AnswerToCreate {
    answer: string;
    userId: number;
    questionId: number;
}

export interface AnswerDB {
    id: number;
    answer: string;
}
