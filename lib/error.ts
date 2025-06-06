export class WPAPIError extends Error {
    constructor(message: string, status: number, enpoint?: string) {
        super(message);
        this.name = 'WPAPIError';
    }
}
