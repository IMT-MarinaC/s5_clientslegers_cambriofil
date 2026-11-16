export default function Loader({ label = 'Repérage en cours' }: { label?: string }) {
    return (
        <p role="status" className="loader">
            {label}
        </p>
    );
}