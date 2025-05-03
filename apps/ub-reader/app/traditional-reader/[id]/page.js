import { jsx as _jsx } from "react/jsx-runtime";
import TraditionalReader from '../../../components/traditional-reader/TraditionalReader';
/**
 * Traditional Reader Page
 *
 * This page renders the TraditionalReader component with the specified paper ID.
 */
export default function TraditionalReaderPage({ params }) {
    const paperId = parseInt(params.id, 10) || 1;
    return _jsx(TraditionalReader, { paperId: paperId });
}
//# sourceMappingURL=page.js.map