export interface Answer {
    answer: string;
}

export interface AnswerToCreate {
    answer: string;
    userId: number;
}

export interface AnswerDB {
    id: number;
    answer: string;
}
