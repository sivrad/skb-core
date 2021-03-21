import { Collection } from '@skb/collection';

/**
 * Base Sivrad Knowledgebase Error.
 * @abstract
 */
export abstract class SivradKnowledgebaseError extends Error {
    /**
     * Constructor for a Sivrad Knowledgebase Error.
     * @param {string} name    Name of the error.
     * @param {string} message Message of the error.
     */
    constructor(name: string, message: string) {
        super(`${name}: ${message}`);
    }
}

/**
 * Error for unexpected behavior.
 */
export class UnexpectedBehavior extends SivradKnowledgebaseError {
    /**
     * Constructor for unexpected behavior.
     * @param {number} id Id of the expected behavior.
     */
    constructor(id: number) {
        super('Unexpected Behavior', `Case #${id}`);
    }
}

/**
 * Duplicate collection error.
 */
export class CollectionDuplicate extends SivradKnowledgebaseError {
    /**
     * Constructor for a duplicate collection error.
     * @param {Collection} duplicateCollection The duplicate collection.
     */
    constructor(public duplicateCollection: Collection) {
        super(
            'CollectionDuplicate',
            `A collection with the id '${duplicateCollection.identifier}' was already given to SKB core.`,
        );
    }
}
