// Shared design tokens used across the app.
// Import from here to keep colours and spacing consistent.

export const colors = {
    primary: '#1a1a2e',       // dark navy — main buttons, headings
    primaryLight: '#16213e',  // slightly lighter navy
    accent: '#e94560',        // red accent for delete / errors
    background: '#f7f8fa',    // screen background
    card: '#ffffff',          // card background
    border: '#dde1e7',        // input / card borders
    textPrimary: '#1a1a2e',
    textSecondary: '#666',
    textMuted: '#aaa',
    success: '#27ae60',
    warning: '#f39c12',
    error: '#e74c3c',
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
};

export const radius = {
    sm: 6,
    md: 10,
    lg: 16,
    full: 999,
};

export const typography = {
    heading: { fontSize: 22, fontWeight: '700' as const, color: colors.textPrimary },
    subheading: { fontSize: 18, fontWeight: '600' as const, color: colors.textPrimary },
    body: { fontSize: 15, color: colors.textPrimary },
    caption: { fontSize: 13, color: colors.textSecondary },
    label: { fontSize: 14, fontWeight: '600' as const, color: colors.textSecondary },
};
