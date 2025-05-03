/**
 * Content Service
 *
 * This service provides functions for loading and accessing content from the content repository.
 * This version uses hardcoded data for Next.js compatibility.
 */
// Hardcoded content index
const contentIndex = {
    title: 'The Urantia Book',
    description: 'The Urantia Book is a spiritual, philosophical, and religious book that originated in Chicago sometime between 1924 and 1955.',
    version: '1.0.0',
    lastUpdated: '2025-04-14',
    parts: [
        {
            number: 1,
            title: 'THE CENTRAL AND SUPERUNIVERSES',
            papers: [
                {
                    number: 1,
                    title: 'The Universal Father',
                    author: 'a Divine Counselor',
                    sections: [
                        "The Father's Name",
                        'The Reality of God',
                        'God is a Universal Spirit',
                        'The Mystery of God',
                        'Personality of the Universal Father',
                        'Personality in the Universe',
                        'Spiritual Value of the Personality Concept',
                    ],
                    path: 'papers/paper-1.json',
                    available: true,
                },
                {
                    number: 2,
                    title: 'The Nature of God',
                    author: 'a Divine Counselor',
                    sections: [
                        'The Infinity of God',
                        "The Father's Eternal Perfection",
                        'Justice and Righteousness',
                        'The Divine Mercy',
                        'The Love of God',
                        'The Goodness of God',
                        'Divine Truth and Beauty',
                    ],
                    path: 'papers/paper-2.json',
                    available: false,
                },
            ],
        },
    ],
    contentStructure: {
        paper: {
            properties: ['number', 'title', 'author', 'sections'],
        },
        section: {
            properties: ['number', 'title', 'paragraphs'],
        },
        paragraph: {
            properties: ['number', 'text'],
        },
    },
};
// Hardcoded Paper 1 data
const paper1Data = {
    number: 1,
    title: 'The Universal Father',
    author: 'a Divine Counselor',
    sections: [
        {
            number: 1,
            title: "The Father's Name",
            paragraphs: [
                {
                    number: 1,
                    text: "Of all the names by which God the Father is known throughout the universes, those which designate him as the First Source and the Universe Center are most often encountered. The First Father is known by various names in different universes and in different sectors of the same universe. The names which the creature assigns to the Creator are much dependent on the creature's concept of the Creator. The First Source and Universe Center has never revealed himself by name, only by nature. If we believe that we are the children of this Creator, it is only natural that we should eventually call him Father. But this is the name of our own choosing, and it grows out of the recognition of our personal relationship with the First Source and Center.",
                },
                {
                    number: 2,
                    text: "The Universal Father never imposes any form of arbitrary recognition, formal worship, or slavish service upon the intelligent will creatures of the universes. The evolutionary inhabitants of the worlds of time and space must of themselves—in their own hearts—recognize, love, and voluntarily worship him. The Creator refuses to coerce or compel the submission of the spiritual free wills of his material creatures. The affectionate dedication of the human will to the doing of the Father's will is man's choicest gift to God; in fact, such a consecration of creature will constitutes man's only possible gift of true value to the Paradise Father.",
                },
            ],
        },
        {
            number: 2,
            title: 'The Reality of God',
            paragraphs: [
                {
                    number: 1,
                    text: 'God is a universal spiritual reality; he is not merely the supreme idea of the universe. The idea of God cannot be creative unless God is a personality who can thus think and create. God is much more than a personality as personality is understood by the human mind; he is even far more than any possible concept of a superpersonality. But it is utterly futile to discuss such incomprehensible concepts of divine personality with the minds of material creatures whose maximum concept of the reality of being consists in the idea and ideal of personality.',
                },
                {
                    number: 2,
                    text: "The material mortal is unable to perceive the goodness of God because of the material nature and the handicaps of finite mind. God's goodness can be properly recognized only by those who possess spiritual insight resulting from spirit indwelling, and who have developed the capacity to perceive spiritual values and recognize spiritual meanings.",
                },
            ],
        },
        {
            number: 3,
            title: 'God is a Universal Spirit',
            paragraphs: [
                {
                    number: 1,
                    text: '"God is spirit." He is a universal spiritual presence. The Universal Father is an infinite spiritual reality; he is "the sovereign, eternal, immortal, invisible, and only true God." Even though you are "the offspring of God," you ought not to think that the Father is like yourselves in form and physique because you are said to be created "in his image"—indwelt by Mystery Monitors dispatched from the central abode of his eternal presence. Spirit beings are real, notwithstanding they are invisible to human eyes; even though they have not flesh and blood.',
                },
                {
                    number: 2,
                    text: 'Said the seer of old: "Lo, he goes by me, and I see him not; he passes on also, but I perceive him not." We may constantly observe the works of God, we may be highly conscious of the material evidences of his majestic conduct, but rarely may we gaze upon the visible manifestation of his divinity, not even to behold the presence of his delegated spirit of human indwelling.',
                },
            ],
        },
        {
            number: 4,
            title: 'The Mystery of God',
            paragraphs: [
                {
                    number: 1,
                    text: 'The infinity of the perfection of God is such that it eternally constitutes him mystery. And the greatest of all the unfathomable mysteries of God is the phenomenon of the divine indwelling of mortal minds. The manner in which the Universal Father sojourns with the creatures of time is the most profound of all universe mysteries; the divine presence in the mind of man is the mystery of mysteries.',
                },
                {
                    number: 2,
                    text: 'The physical bodies of mortals are "the temples of God." Notwithstanding that the Sovereign Creator Sons come near the creatures of their inhabited worlds and "draw all men to themselves"; though they "stand at the door" of consciousness "and knock" and delight to come in to all who will "open the doors of their hearts"; although there does exist this intimate personal communion between the Creator Sons and their mortal creatures, nevertheless, mortal men have something from God himself which actually dwells within them; and its presence is divine, even as the fragment of God which indwells the mind of man is a part of God.',
                },
            ],
        },
        {
            number: 5,
            title: 'Personality of the Universal Father',
            paragraphs: [
                {
                    number: 1,
                    text: 'The Universal Father is the acme of divine personality; he is the origin and destiny of personality throughout all creation. God is both infinite and personal; he is an infinite personality. The Father is truly a personality, notwithstanding that the infinity of his person places him forever beyond the full comprehension of material and finite beings.',
                },
                {
                    number: 2,
                    text: "God is much more than a personality as personality is conceived by the human mind; he is even far more than any possible concept of a superpersonality. But it is utterly futile to discuss such incomprehensible concepts of divine personality with the minds of material creatures whose maximum concept of the reality of being consists in the idea and ideal of personality. The material creature's highest possible concept of the Universal Creator is embraced within the spiritual ideals of the exalted idea of divine personality.",
                },
            ],
        },
        {
            number: 6,
            title: 'Personality in the Universe',
            paragraphs: [
                {
                    number: 1,
                    text: 'Human personality is the time-space image-shadow cast by the divine Creator personality. And no actuality can ever be adequately comprehended by an examination of its shadow. Shadows should be interpreted in terms of the true substance.',
                },
                {
                    number: 2,
                    text: "God is to science a cause, to philosophy an idea, to religion a person, even the loving heavenly Father. God is to the scientist a primal force, to the philosopher a hypothesis of unity, to the religionist a living spiritual experience. Man's inadequate concept of the personality of the Universal Father can be improved only by man's spiritual progress in the universe and will become truly adequate only when the pilgrims of time and space finally attain the divine embrace of the living God on Paradise.",
                },
            ],
        },
        {
            number: 7,
            title: 'Spiritual Value of the Personality Concept',
            paragraphs: [
                {
                    number: 1,
                    text: 'When Jesus talked about "the living God," he referred to a personal Deity—the Father in heaven. The concept of the personality of Deity facilitates fellowship; it favors intelligent worship; it promotes refreshing trustfulness. Interactions can be had between nonpersonal things, but not fellowship. The fellowship relation of father and son, as between God and man, cannot be enjoyed unless both are persons. Only personalities can commune with each other, albeit this personal communion may be greatly facilitated by the presence of just such an impersonal entity as the Thought Adjuster.',
                },
                {
                    number: 2,
                    text: 'Man does not achieve union with God as a drop of water might find unity with the ocean. Man attains divine union by progressive reciprocal spiritual communion, by personality intercourse with the personal God, by increasingly attaining the divine nature through wholehearted conformity to the divine will. Such a sublime relationship can exist only between personalities.',
                },
            ],
        },
    ],
};
// Cache for papers
const paperCache = {
    1: paper1Data,
};
/**
 * Load the content index
 */
export async function loadContentIndex() {
    return contentIndex;
}
/**
 * Get paper metadata by number
 */
export async function getPaperMetadata(paperNumber) {
    try {
        // Find the paper in the content index
        for (const part of contentIndex.parts) {
            const paper = part.papers.find(p => p.number === paperNumber);
            if (paper) {
                return paper;
            }
        }
        return null;
    }
    catch (error) {
        console.error(`Error getting metadata for paper ${paperNumber}:`, error);
        return null;
    }
}
/**
 * Check if a paper is available in the content repository
 */
export async function isPaperAvailable(paperNumber) {
    try {
        // Get the paper metadata
        const paperMetadata = await getPaperMetadata(paperNumber);
        // Return whether the paper is available
        return (paperMetadata === null || paperMetadata === void 0 ? void 0 : paperMetadata.available) || false;
    }
    catch (error) {
        console.error(`Error checking availability for paper ${paperNumber}:`, error);
        return false;
    }
}
/**
 * Load a paper from the content repository
 */
export async function loadPaper(paperNumber) {
    // Return cached paper if available
    if (paperCache[paperNumber]) {
        return paperCache[paperNumber];
    }
    try {
        // Get the paper metadata
        const paperMetadata = await getPaperMetadata(paperNumber);
        // If the paper is not available, return null
        if (!paperMetadata || !paperMetadata.available) {
            return null;
        }
        // For now, we only have Paper 1 hardcoded
        if (paperNumber === 1) {
            return paper1Data;
        }
        return null;
    }
    catch (error) {
        console.error(`Error loading paper ${paperNumber}:`, error);
        return null;
    }
}
/**
 * Clear the content cache
 */
export function clearContentCache() {
    // Reset the cache to just the hardcoded papers
    Object.keys(paperCache).forEach(key => {
        if (Number(key) !== 1) {
            delete paperCache[Number(key)];
        }
    });
}
//# sourceMappingURL=ContentService.js.map