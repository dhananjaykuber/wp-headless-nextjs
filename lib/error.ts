export class WPAPIError extends Error {
    status: number;
    endpoint?: string;

    constructor(message: string, status: number, enpoint?: string) {
        super(message);
        this.name = 'WPAPIError';
        this.status = status;
        this.endpoint = enpoint;
    }
}
