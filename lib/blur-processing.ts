"use client";

import axios from "axios";

/**
 * Intensity levels with their corresponding values
 */
export const INTENSITY_LEVELS = {
    none: 0,
    low: 25,
    medium: 50,
    high: 75,
    custom: (value: number) => value,
} as const;

/**
 * Map numeric intensity to string level that backend expects
 */
export function mapIntensityToLevel(intensity: number): string {
    if (intensity < 30) return "low";
    if (intensity < 65) return "medium";
    return "high";
}

/**
 * Get the numeric intensity value based on selected intensity level
 */
export function getIntensityValue(
    selectedIntensity: string,
    customValue?: number
): number {
    if (selectedIntensity === "custom") {
        return customValue || 50;
    }
    return INTENSITY_LEVELS[selectedIntensity as keyof typeof INTENSITY_LEVELS] as number;
}

/**
 * Get human-readable intensity label
 */
export function getIntensityLabel(
    selectedIntensity: string,
    customValue?: number
): string {
    const labels: Record<string, string> = {
        none: "None",
        low: "Low (25%)",
        medium: "Medium (50%)",
        high: "High (75%)",
        custom: `Custom (${customValue || 50}%)`,
    };
    return labels[selectedIntensity] || "Unknown";
}

interface CheckVideoStatusParams {
    videoName: string;
    serverUrl: string;
    onProgressUpdate?: (progress: number) => void;
    onStatusUpdate?: (status: string) => void;
    onComplete?: () => void;
    onError?: (error: Error) => void;
}

interface CheckCompressionStatusParams {
    videoName: string;
    serverUrl: string;
    onComplete?: () => void;
    onError?: (error: Error) => void;
}

/**
 * Check video processing status and update progress
 * This is the main function that polls the server for processing status
 */
export function checkVideoStatus({
    videoName,
    serverUrl,
    onProgressUpdate,
    onStatusUpdate,
    onComplete,
    onError,
}: CheckVideoStatusParams): NodeJS.Timeout {
    let attempts = 0;
    const maxAttempts = 120; // 120 * 3 seconds = 360 seconds = 6 minutes
    let progressValue = 0;

    const interval = setInterval(async () => {
        attempts++;

        try {
            console.log(`[Video Status] Checking (${attempts}/${maxAttempts}): ${videoName}`);

            // Call the status endpoint
            const response = await axios.get(`${serverUrl}getStatus`, {
                params: { videoName },
                timeout: 10000,
            });

            const { status } = response.data;

            console.log(`[Video Status] Status: ${status}`);

            // Status "1" means processing complete
            if (status === "1") {
                clearInterval(interval);
                console.log("[Video Status] Processing complete!");
                onProgressUpdate?.(100);
                onStatusUpdate?.("Processing complete!");
                onComplete?.();
            }
            // Status "-1" means error
            else if (status === "-1") {
                clearInterval(interval);
                console.log("[Video Status] Processing failed!");
                onError?.(new Error(response.data.message || "Video processing failed"));
            }
            // Still processing - increment progress
            else {
                // Increment progress more slowly for longer videos
                const increment = progressValue < 50 ? 5 : 2;
                progressValue = Math.min(progressValue + increment, 95);
                onProgressUpdate?.(progressValue);
                onStatusUpdate?.(`Processing video: ${progressValue}%`);
            }

            // Check for timeout
            if (attempts >= maxAttempts) {
                clearInterval(interval);
                console.log("[Video Status] Timeout reached");
                onError?.(new Error("Processing timed out after 6 minutes. Please try again."));
            }

        } catch (error) {
            console.error("[Video Status] Error checking status:", error);

            // Continue trying unless we've reached max attempts
            if (attempts >= maxAttempts) {
                clearInterval(interval);
                onError?.(new Error("Failed to check video status. Please try again."));
            }
        }
    }, 3000); // Check every 3 seconds

    return interval;
}

/**
 * Check compression status and then trigger blur processing
 */
export function checkCompressionStatus({
    videoName,
    serverUrl,
    onComplete,
    onError,
}: CheckCompressionStatusParams): NodeJS.Timeout {
    let attempts = 0;
    const maxAttempts = 300; // 300 * 2 seconds = 600 seconds = 10 minutes

    const interval = setInterval(async () => {
        attempts++;

        try {
            console.log(`[Compression Status] Checking (${attempts}/${maxAttempts})`);

            const response = await axios.get(`${serverUrl}getCompressionStatus`, {
                params: { videoName },
                timeout: 10000,
            });

            const { status } = response.data;

            console.log(`[Compression Status] Status: ${status}`);

            // Status "1" means compression complete
            if (status === "1") {
                clearInterval(interval);
                console.log("[Compression Status] Complete!");
                onComplete?.();
            }
            // Timeout
            else if (attempts >= maxAttempts) {
                clearInterval(interval);
                console.log("[Compression Status] Timeout - continuing anyway");
                // Don't error on compression timeout, just continue
                onComplete?.();
            }

        } catch (error) {
            console.error("[Compression Status] Error:", error);

            if (attempts >= maxAttempts) {
                clearInterval(interval);
                // Don't fail on compression errors, continue
                onComplete?.();
            }
        }
    }, 2000);

    return interval;
}

/**
 * Upload video to server (simplified version)
 */
export async function uploadVideoToServer(
    videoBlob: Blob,
    videoName: string,
    serverUrl: string
): Promise<void> {
    try {
        console.log("[Upload] Uploading video:", videoName);

        const formData = new FormData();
        formData.append("file", videoBlob, videoName);
        formData.append("check", "web");

        const response = await axios.post(`${serverUrl}uploadVideoV2`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            timeout: 300000, // 5 minutes timeout for upload
        });

        console.log("[Upload] Success:", response.data);

    } catch (error) {
        console.error("[Upload] Failed:", error);
        throw new Error("Failed to upload video to server");
    }
}

/**
 * Process video with blur effect
 */
export async function processVideoForBlur(
    videoName: string,
    intensityLevel: string,
    serverUrl: string,
    hasPaid: boolean = false
): Promise<void> {
    try {
        console.log(`[Blur] Processing with intensity: ${intensityLevel}`);

        const response = await axios.get(`${serverUrl}processVideoForBlur`, {
            params: {
                value: intensityLevel,
                videoName: videoName,
                has_paid: hasPaid ? "yes" : "no",
            },
            timeout: 30000, // 30 seconds timeout for processing initiation
        });

        console.log("[Blur] Initiated:", response.data);

    } catch (error) {
        console.error("[Blur] Failed:", error);
        throw new Error("Failed to initiate blur processing");
    }
}

/**
 * Download processed video
 */
export async function downloadProcessedVideo(
    videoName: string,
    serverUrl: string,
    hasPaid: boolean = false
): Promise<Blob> {
    try {
        console.log("[Download] Downloading video:", videoName);

        const response = await axios.get(`${serverUrl}downloadVideoT`, {
            params: {
                videoName: videoName,
                check: "web",
                has_paid: hasPaid ? "yes" : "no",
            },
            responseType: "blob",
            timeout: 300000, // 5 minutes timeout for download
        });

        if (!response.data || response.data.size === 0) {
            throw new Error("Downloaded video is empty");
        }

        console.log("[Download] Success, size:", response.data.size);
        return response.data;

    } catch (error) {
        console.error("[Download] Failed:", error);
        throw new Error("Failed to download processed video");
    }
}

/**
 * Complete blur application flow using callbacks (simpler approach)
 */
export async function applyBlurAndMonitor(
    videoName: string,
    intensityLevel: string,
    serverUrl: string,
    hasPaid: boolean,
    callbacks: {
        onProgress?: (progress: number) => void;
        onStatus?: (status: string) => void;
        onComplete?: (videoBlob: Blob) => void;
        onError?: (error: Error) => void;
    }
): Promise<void> {
    let statusInterval: NodeJS.Timeout | null = null;

    try {
        // Step 1: Process with blur
        callbacks.onStatus?.("Applying blur effect...");
        await processVideoForBlur(videoName, intensityLevel, serverUrl, hasPaid);

        // Step 2: Wait for processing to complete
        callbacks.onStatus?.("Processing video, please wait...");

        await new Promise<void>((resolve, reject) => {
            statusInterval = checkVideoStatus({
                videoName,
                serverUrl,
                onProgressUpdate: (progress) => {
                    callbacks.onProgress?.(progress);
                },
                onStatusUpdate: (status) => {
                    callbacks.onStatus?.(status);
                },
                onComplete: () => {
                    resolve();
                },
                onError: (error) => {
                    reject(error);
                },
            });
        });

        // Step 3: Download processed video
        callbacks.onStatus?.("Downloading processed video...");
        const videoBlob = await downloadProcessedVideo(videoName, serverUrl, hasPaid);

        callbacks.onStatus?.("Complete!");
        callbacks.onComplete?.(videoBlob);

    } catch (error) {
        console.error("[Apply Blur] Error:", error);
        callbacks.onError?.(error instanceof Error ? error : new Error(String(error)));
    } finally {
        if (statusInterval) {
            clearInterval(statusInterval);
        }
    }
}