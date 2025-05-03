import React from 'react';
interface ListItem {
    id: string | number;
    content: string;
    children?: ListItem[];
}
interface UBNumberedListProps {
    items: ListItem[];
    withDots?: boolean;
    className?: string;
}
/**
 * Component for displaying a numbered list with support for Modern and Traditional themes
 * Numbers are included directly in the text content for better copy-paste functionality
 * Visual alignment is handled with CSS while maintaining good copy behavior
 */
export declare const UBNumberedList: React.FC<UBNumberedListProps>;
export default UBNumberedList;
//# sourceMappingURL=UBNumberedList.d.ts.map