interface ArtworkImageProps {
    src: string;
    alt: string;
    surveillance?: boolean; //en noir et blanc façon photo de repérage
}

export default function ArtworkImage({ src, alt, surveillance = true }: ArtworkImageProps) {
    if (!src) {
        return (
            <div className="image-placeholder" role="img" aria-label={`${alt} (pas de photo)`}>
                Pas de photo
            </div>
        );
    }
    return <img src={src} alt={alt} loading="lazy" className={surveillance ? 'surveillance-photo' : undefined} />;
}