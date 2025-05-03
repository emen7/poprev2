import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ThemeProvider } from '../contexts/ThemeContext';
import { UserPreferencesProvider } from '../contexts/UserPreferencesContext';
import { HighlightProvider } from '../components/HighlightProvider';
import { DebugHelper } from '../components/debug/DebugHelper';
import '../styles/globals.css';
import '../styles/global.css'; // Import our new global CSS
import '../styles/header-variables.css'; // Import header variables first
import '../styles/themes/global.css'; // Import our centralized theme variables
import '../styles/theme-transitions.css'; // Import theme transition styles
import '../styles/themes/index.css'; // Import theme styles
import '../styles/highlighting/highlighting.css'; // Import highlighting styles
import '../styles/three-row-header.css'; // Import 3-row header styles
import '../styles/fixed-width-layout.css'; // Import fixed-width layout styles
import '../styles/desktop-pullup.css'; // Import desktop pullup styles
export const metadata = {
    title: 'UB Reader',
    description: 'A modern reader for The Urantia Book',
};
export default function RootLayout({ children }) {
    return (_jsxs("html", { lang: "en", children: [_jsxs("head", { children: [_jsx("link", { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" }), _jsx("meta", { name: "color-scheme", content: "light dark" }), _jsx("meta", { name: "theme-color", media: "(prefers-color-scheme: light)", content: "#ffffff" }), _jsx("meta", { name: "theme-color", media: "(prefers-color-scheme: dark)", content: "#222222" })] }), _jsx("body", { children: _jsx(UserPreferencesProvider, { children: _jsx(ThemeProvider, { children: _jsxs(HighlightProvider, { containerSelector: ".ub-paper", children: [_jsx("main", { className: "min-h-screen", children: children }), _jsx(DebugHelper, {})] }) }) }) })] }));
}
//# sourceMappingURL=layout.js.map