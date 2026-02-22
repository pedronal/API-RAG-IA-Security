export class StoredDocument {
    constructor(
        readonly id: string,
        readonly content: string,
        readonly hash: string,
        readonly createdAt: Date,

    ) {
        if (!content.trim()) {
            throw new Error('Invalid content (Must not be empty)');
        }
    }
}