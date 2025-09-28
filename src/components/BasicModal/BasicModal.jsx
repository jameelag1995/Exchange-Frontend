import * as React from "react";
import { 
    Box, 
    Typography, 
    Modal, 
    Button, 
    Paper,
    IconButton,
    Fade,
    Backdrop
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";

const getModalStyle = (type = 'info') => {
    const baseStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: '90%', sm: 400, md: 500 },
        maxWidth: 500,
        bgcolor: "background.paper",
        borderRadius: 3,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
        p: 0,
        outline: 'none',
        animation: 'modalSlideIn 0.3s ease-out',
        '@keyframes modalSlideIn': {
            from: {
                opacity: 0,
                transform: 'translate(-50%, -60%) scale(0.9)',
            },
            to: {
                opacity: 1,
                transform: 'translate(-50%, -50%) scale(1)',
            },
        },
    };

    const typeStyles = {
        success: {
            borderTop: '4px solid #4caf50',
        },
        error: {
            borderTop: '4px solid #f44336',
        },
        warning: {
            borderTop: '4px solid #ff9800',
        },
        info: {
            borderTop: '4px solid #2196f3',
        },
    };

    return { ...baseStyle, ...typeStyles[type] };
};

const getIcon = (type = 'info') => {
    const iconProps = { sx: { fontSize: 40 } };
    
    switch (type) {
        case 'success':
            return <CheckCircleIcon color="success" {...iconProps} />;
        case 'error':
            return <ErrorIcon color="error" {...iconProps} />;
        case 'warning':
            return <WarningIcon color="warning" {...iconProps} />;
        default:
            return <InfoIcon color="info" {...iconProps} />;
    }
};

const getTypeFromMessage = (msg) => {
    if (!msg) return 'info';
    
    const title = msg.title?.toLowerCase() || '';
    const message = msg.message?.toLowerCase() || '';
    
    if (title.includes('error') || title.includes('failed') || message.includes('error')) {
        return 'error';
    }
    if (title.includes('success') || title.includes('updated') || title.includes('created')) {
        return 'success';
    }
    if (title.includes('warning') || title.includes('caution')) {
        return 'warning';
    }
    
    return 'info';
};

export default function BasicModal({ msg, setMsg }) {
    const [open, setOpen] = React.useState(true);
    
    const handleClose = () => {
        setMsg("");
        setOpen(false);
    };

    const handleConfirm = () => {
        handleClose();
    };

    const type = getTypeFromMessage(msg);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
                sx: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(4px)',
                }
            }}
        >
            <Fade in={open}>
                <Paper sx={getModalStyle(type)}>
                    {/* Header */}
                    <Box sx={{ 
                        p: 3, 
                        pb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            {getIcon(type)}
                            <Typography 
                                id="modal-modal-title" 
                                variant="h6" 
                                component="h2"
                                sx={{ fontWeight: 600 }}
                            >
                                {msg?.title || 'Notification'}
                            </Typography>
                        </Box>
                        <IconButton
                            onClick={handleClose}
                            sx={{
                                color: 'text.secondary',
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                }
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Content */}
                    <Box sx={{ px: 3, pb: 3 }}>
                        <Typography 
                            id="modal-modal-description" 
                            variant="body1"
                            sx={{ 
                                mb: 3,
                                lineHeight: 1.6,
                                color: 'text.secondary'
                            }}
                        >
                            {msg?.message || 'No message provided'}
                        </Typography>

                        {/* Actions */}
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'flex-end',
                            gap: 2
                        }}>
                            <Button 
                                variant="outlined" 
                                onClick={handleClose}
                                sx={{ minWidth: 80 }}
                            >
                                Close
                            </Button>
                            {type === 'success' && (
                                <Button 
                                    variant="contained" 
                                    onClick={handleConfirm}
                                    sx={{ minWidth: 80 }}
                                >
                                    OK
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Paper>
            </Fade>
        </Modal>
    );
}
