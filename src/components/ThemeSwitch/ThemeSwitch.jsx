import React from 'react';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useTheme as useCustomTheme } from '../../context/ThemeContext';

export const ThemeSwitch = () => {
    const theme = useTheme();
    const { mode, toggleTheme } = useCustomTheme();

    return (
        <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton
                onClick={toggleTheme}
                sx={{
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.1)' 
                        : 'rgba(0, 0, 0, 0.05)',
                    borderRadius: 2,
                    p: 1.5,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        backgroundColor: theme.palette.mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.2)' 
                            : 'rgba(0, 0, 0, 0.1)',
                        transform: 'scale(1.1)',
                    },
                }}
            >
                {mode === 'light' ? (
                    <DarkMode sx={{ fontSize: 24 }} />
                ) : (
                    <LightMode sx={{ fontSize: 24 }} />
                )}
            </IconButton>
        </Tooltip>
    );
};
