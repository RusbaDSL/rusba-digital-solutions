import React, { useState, useEffect } from 'react';
import './VideoPlayer.css';

interface VideoPlayerProps {
    url: string | null | undefined;
    title: string;
    className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title, className = '' }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
    }, [url]);

    if (!url?.trim()) {
        console.warn('VideoPlayer: No URL provided');
        return null;
    }

    const handleLoadedData = () => {
        console.log('Video loaded successfully:', url);
        setIsLoading(false);
    };

    const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        const target = e.target as HTMLVideoElement;
        console.error('Video loading error:', {
            url,
            error: target.error?.message || 'Unknown error'
        });
        setError('Failed to load video');
        setIsLoading(false);
    };

    return (
        <div className={`video-container ${className}`}>
            {isLoading && <div className="video-loading">Loading video...</div>}
            {error && <div className="video-error">{error}</div>}
            <video
                controls
                playsInline
                controlsList="nodownload"
                className="video-player"
                onLoadedData={handleLoadedData}
                onError={handleError}
                poster={`${url.split('upload/')[0]}upload/w_800,h_450,c_fill,g_center/${url.split('upload/')[1]}`}
            >
                {/* Original quality MP4 */}
                <source
                    src={url}
                    type="video/mp4"
                />
                {/* Auto-converted WebM version (if available on Cloudinary) */}
                <source
                    src={url.replace('/upload/', '/upload/f_webm/')}
                    type="video/webm"
                />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPlayer;
