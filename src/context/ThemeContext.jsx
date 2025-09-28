import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { THEME_CONFIG } from '../constants';

const ThemeContext = createContext({
    mode: 'light',
    toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
    const [mode, setMode] = useThemeStorage();

    const theme = useMemo(() => {
        const themeColors = mode === 'light' ? THEME_CONFIG.LIGHT : THEME_CONFIG.DARK;
        
        return createTheme({
            palette: {
                mode,
                ...themeColors,
            },
            typography: THEME_CONFIG.TYPOGRAPHY,
            shape: {
                borderRadius: THEME_CONFIG.BORDER_RADIUS.medium,
            },
            shadows: [
                'none',
                THEME_CONFIG.SHADOWS.light,
                THEME_CONFIG.SHADOWS.medium,
                THEME_CONFIG.SHADOWS.heavy,
                THEME_CONFIG.SHADOWS.card,
                THEME_CONFIG.SHADOWS.modal,
                ...Array(19).fill('none'),
            ],
            components: {
                MuiButton: {
                    styleOverrides: {
                        root: {
                            borderRadius: THEME_CONFIG.BORDER_RADIUS.medium,
                            textTransform: 'none',
                            fontWeight: 600,
                            padding: '8px 24px',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: THEME_CONFIG.SHADOWS.medium,
                            },
                        },
                        contained: {
                            background: `linear-gradient(135deg, ${themeColors.primary.main} 0%, ${themeColors.primary.light} 100%)`,
                            boxShadow: `0 4px 15px ${themeColors.primary.main}40`,
                            '&:hover': {
                                background: `linear-gradient(135deg, ${themeColors.primary.light} 0%, ${themeColors.primary.main} 100%)`,
                                boxShadow: `0 6px 20px ${themeColors.primary.main}60`,
                            },
                        },
                        outlined: {
                            borderWidth: 2,
                            '&:hover': {
                                borderWidth: 2,
                                background: `${themeColors.primary.main}10`,
                            },
                        },
                    },
                },
                MuiTextField: {
                    styleOverrides: {
                        root: {
                            '& .MuiOutlinedInput-root': {
                                borderRadius: THEME_CONFIG.BORDER_RADIUS.medium,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: themeColors.primary.main,
                                    },
                                },
                                '&.Mui-focused': {
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: themeColors.primary.main,
                                        borderWidth: 2,
                                    },
                                },
                            },
                        },
                    },
                },
                MuiPaper: {
                    styleOverrides: {
                        root: {
                            borderRadius: THEME_CONFIG.BORDER_RADIUS.large,
                            boxShadow: THEME_CONFIG.SHADOWS.card,
                            transition: 'all 0.3s ease',
                        },
                        elevation1: {
                            boxShadow: THEME_CONFIG.SHADOWS.light,
                        },
                        elevation2: {
                            boxShadow: THEME_CONFIG.SHADOWS.medium,
                        },
                        elevation3: {
                            boxShadow: THEME_CONFIG.SHADOWS.heavy,
                        },
                    },
                },
                MuiCard: {
                    styleOverrides: {
                        root: {
                            borderRadius: THEME_CONFIG.BORDER_RADIUS.large,
                            boxShadow: THEME_CONFIG.SHADOWS.card,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: THEME_CONFIG.SHADOWS.heavy,
                            },
                        },
                    },
                },
                MuiChip: {
                    styleOverrides: {
                        root: {
                            borderRadius: THEME_CONFIG.BORDER_RADIUS.medium,
                            fontWeight: 600,
                        },
                    },
                },
                MuiAvatar: {
                    styleOverrides: {
                        root: {
                            boxShadow: THEME_CONFIG.SHADOWS.light,
                        },
                    },
                },
                MuiIconButton: {
                    styleOverrides: {
                        root: {
                            borderRadius: THEME_CONFIG.BORDER_RADIUS.medium,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.1)',
                            },
                        },
                    },
                },
                MuiFab: {
                    styleOverrides: {
                        root: {
                            boxShadow: THEME_CONFIG.SHADOWS.medium,
                            '&:hover': {
                                boxShadow: THEME_CONFIG.SHADOWS.heavy,
                                transform: 'scale(1.05)',
                            },
                        },
                    },
                },
                MuiAppBar: {
                    styleOverrides: {
                        root: {
                            boxShadow: THEME_CONFIG.SHADOWS.light,
                        },
                    },
                },
                MuiDrawer: {
                    styleOverrides: {
                        paper: {
                            boxShadow: THEME_CONFIG.SHADOWS.heavy,
                        },
                    },
                },
                MuiModal: {
                    styleOverrides: {
                        root: {
                            backdropFilter: 'blur(4px)',
                        },
                    },
                },
                MuiTooltip: {
                    styleOverrides: {
                        tooltip: {
                            borderRadius: THEME_CONFIG.BORDER_RADIUS.medium,
                            fontSize: '0.875rem',
                            fontWeight: 500,
                        },
                    },
                },
                MuiSnackbar: {
                    styleOverrides: {
                        root: {
                            '& .MuiSnackbarContent-root': {
                                borderRadius: THEME_CONFIG.BORDER_RADIUS.medium,
                            },
                        },
                    },
                },
            },
        });
    }, [mode]);

    const toggleTheme = () => {
        setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
    };

    const value = {
        mode,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            <MuiThemeProvider theme={theme}>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// Custom hook for theme storage
const useThemeStorage = () => {
    const [mode, setMode] = useState(() => {
        const savedMode = localStorage.getItem('barterNest_theme');
        return savedMode || 'light';
    });

    useEffect(() => {
        localStorage.setItem('barterNest_theme', mode);
    }, [mode]);

    return [mode, setMode];
}; 