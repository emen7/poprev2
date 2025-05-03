/**
 * Sample document with both Traditional and Modern formatting examples
 */
export const mockDocument = {
    id: 'mock-document-1',
    title: 'Sample Document for Testing',
    sections: [
        {
            id: 'section-1',
            number: '1',
            title: 'Introduction',
            paragraphs: [
                {
                    id: 'para-1-1',
                    number: '1.1',
                    text: 'This is the first paragraph of the introduction. It demonstrates basic paragraph rendering with <em>emphasized text</em> and <strong>strong text</strong>.',
                    metadata: {},
                },
                {
                    id: 'para-1-2',
                    number: '1.2',
                    text: 'This is the second paragraph which includes a topic change.',
                    metadata: {
                        isTopicChange: true,
                    },
                },
                {
                    id: 'para-1-3',
                    number: '1.3',
                    text: 'This paragraph demonstrates indentation.',
                    metadata: {
                        isIndented: true,
                    },
                },
            ],
            metadata: {},
        },
        {
            id: 'section-2',
            number: '2',
            title: 'Lists and Tables',
            paragraphs: [
                {
                    id: 'para-2-1',
                    number: '2.1',
                    text: 'Below is an example of a numbered list:',
                    metadata: {},
                },
                {
                    id: 'para-2-2',
                    number: '2.2',
                    text: 'First item in the list',
                    metadata: {
                        isList: true,
                        listType: 'numbered',
                    },
                },
                {
                    id: 'para-2-3',
                    number: '2.3',
                    text: 'Second item in the list',
                    metadata: {
                        isList: true,
                        listType: 'numbered',
                    },
                },
                {
                    id: 'para-2-4',
                    number: '2.4',
                    text: 'Third item in the list',
                    metadata: {
                        isList: true,
                        listType: 'numbered',
                    },
                },
                {
                    id: 'para-2-5',
                    number: '2.5',
                    text: 'Below is an example of a simple table:',
                    metadata: {},
                },
                {
                    id: 'para-2-6',
                    number: '2.6',
                    text: `<table>
            <thead>
              <tr>
                <th>Header 1</th>
                <th>Header 2</th>
                <th>Header 3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Row 1, Cell 1</td>
                <td>Row 1, Cell 2</td>
                <td>Row 1, Cell 3</td>
              </tr>
              <tr>
                <td>Row 2, Cell 1</td>
                <td>Row 2, Cell 2</td>
                <td>Row 2, Cell 3</td>
              </tr>
            </tbody>
          </table>`,
                    metadata: {
                        isTable: true,
                    },
                },
            ],
            metadata: {},
        },
        {
            id: 'section-3',
            number: '3',
            title: 'Special Formatting',
            paragraphs: [
                {
                    id: 'para-3-1',
                    number: '3.1',
                    text: 'This section demonstrates special formatting options.',
                    metadata: {},
                },
                {
                    id: 'para-3-2',
                    number: '3.2',
                    text: 'This paragraph would be highlighted when its ID is included in the highlightedParagraphs array.',
                    metadata: {},
                },
                {
                    id: 'para-3-3',
                    number: '3.3',
                    text: 'This is a bulleted list item.',
                    metadata: {
                        isList: true,
                        listType: 'bulleted',
                    },
                },
                {
                    id: 'para-3-4',
                    number: '3.4',
                    text: 'This is another bulleted list item.',
                    metadata: {
                        isList: true,
                        listType: 'bulleted',
                    },
                },
            ],
            metadata: {
                hasSpecialFormatting: true,
                specialFormattingType: 'example',
            },
        },
    ],
};
export default mockDocument;
//# sourceMappingURL=mockDocument.js.map