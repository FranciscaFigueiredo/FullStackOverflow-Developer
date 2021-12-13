class UnauthorizedAccess extends Error {
    constructor(message?: string) {
        super(message);
        this.name = 'UnauthorizedAccess';
    }
}

export default UnauthorizedAccess;
