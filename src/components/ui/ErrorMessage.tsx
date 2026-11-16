interface ErrorMessageProps {
    message?: string;
    onRetry?: () => void;
}

const DEFAULT_MESSAGE = 'La sécurité a coupé la ligne : impossible de joindre le musée.';

export default function ErrorMessage({ message = DEFAULT_MESSAGE, onRetry }: ErrorMessageProps) {
    return (
        <div role="alert" className="sketch error-box">
            <p>{message}</p>
            {onRetry && (
                <button type="button" className="btn" onClick={onRetry}>
                    Réessayer
                </button>
            )}
        </div>
    );
}