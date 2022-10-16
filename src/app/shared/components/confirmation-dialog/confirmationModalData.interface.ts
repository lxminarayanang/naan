export interface confirmationDialogData
{
    title?: string;
    message?: string;
    icon?: {
        show?: boolean;
        class?: string;
        color?:
            | 'error'
            | 'basic'
            | 'info'
            | 'success'
            | 'warn';
    };
    actions?: {
        confirm?: {
            show?: boolean;
            label?: string;
            color?:
                | 'info'
                | 'danger';
        };
        cancel?: {
            show?: boolean;
            label?: string;
        };
    };
}
