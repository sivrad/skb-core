// Core class.
// March 2021
import { Collection } from '@skb/collection';
import { CollectionDuplicate, UnexpectedBehavior } from './errors';

/**
 * The core class for a Sivrad Knowledgebase instance.
 */
export class SivradKnowledgebaseCore {
    private collections: Collection[] = [];

    /**
     * Constructor for a SKB core.
     * @param {Collection[]} collections List of collections.
     */
    constructor(collections: Collection[]) {
        this.setCollections(collections);
    }

    /**
     * Set the internal value of `collections`.
     *
     * This method verifies each collection before adding it to `collections`.
     * @function setCollections
     * @memberof SivradKnowledgebaseCore
     * @param {Collection[]} collections The collections to set.
     * @returns {void}
     */
    private setCollections(collections: Collection[]): void {
        for (const collection of collections) {
            if (this.verifyCollection(collection)) {
                this.collections.push(collection);
            }
        }
    }

    /**
     * Verify a collection against all existing collections.
     * @function verifyCollection
     * @memberof SivradKnowledgebaseCore
     * @param {Collection} collection Collection to verify.
     * @returns {boolean} `true` if the collection is valid, `false` if not.
     */
    private verifyCollection(collection: Collection): boolean {
        // Check for duplicates.
        if (this.collectionExists(collection.identifier))
            throw new CollectionDuplicate(collection);
        return true;
    }

    /**
     * Check if a collection exists.
     * @function collectionExists
     * @memberof SivradKnowledgebaseCore
     * @param {string} identifier Identifier of the collection.
     * @returns {boolean} `true` if the collection exists.
     */
    collectionExists(identifier: string): boolean {
        return this.getCollection(identifier) != null;
    }

    /**
     * Get a `Collection` from its `identifier`.
     * @function getCollection
     * @memberof SivradKnowledgebaseCore
     * @param {string} identifier Identifier of the collection.
     * @returns {Collection | null} Collection instance if exists, `null` if it was not found.
     */
    getCollection(identifier: string): Collection | null {
        return (
            this.collections.find(
                (collection) => collection.identifier == identifier,
            ) || null
        );
    }
}
