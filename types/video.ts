export type VideoStatus = 'uploading' | 'processing' | 'ready' | 'error';

export interface VideoItem {
    id: string;
    title: string;
    thumbnail: string;
    duration: string;
    status: VideoStatus;
    uploadDate: string;
    size: string;
}

export interface UploadProgress {
    [key: string]: number;
}