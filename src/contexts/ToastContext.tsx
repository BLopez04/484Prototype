import { createContext, type ReactNode, useContext, useState } from "react";
import { Snackbar, Alert, type AlertColor } from "@mui/material";

interface ToastContextType {
    showToast: (message: string, severity?: AlertColor) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<AlertColor>("success");
    const [toastKey, setToastKey] = useState(0);

    const showToast = (msg: string, sev: AlertColor = "success") => {
        setOpen(false); // Close any existing toast first
        setTimeout(() => {
            setMessage(msg);
            setSeverity(sev);
            setToastKey(prev => prev + 1); // Increment key to force new toast
            setOpen(true);
        }, 0);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Snackbar 
                key={toastKey}
                open={open} 
                autoHideDuration={3000} 
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{ 
                    top: '20px !important',
                    maxWidth: '390px',
                    left: '50%',
                    right: 'auto',
                    transform: 'translateX(-50%)'
                }}
            >
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    sx={{
                        width: '100%',
                        maxWidth: '390px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        borderRadius: '12px',
                        border: '1px solid',
                        borderColor: severity === 'success' ? '#4caf50' : '#ff9800',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
                        fontSize: '14px',
                        fontWeight: 600,
                        backgroundColor: severity === 'success' ? '#4caf50' : '#ff9800',
                        color: '#ffffff',
                        '& .MuiAlert-icon': {
                            color: '#ffffff'
                        },
                        '& .MuiAlert-action': {
                            color: '#ffffff',
                            marginRight: '-8px'
                        }
                    }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
}

