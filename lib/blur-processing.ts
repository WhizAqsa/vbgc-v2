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

interface UploadResponse {
    success?: boolean;
    result?: string;
    message?: string;
    [key: string]: unknown;
}

interface ProcessBlurParams {
    videoName: string;
    intensity: number;
    serverUrl: string;
    hasPaid?: boolean;
    timeout?: number;
}

interface BlurResponse {
    status: string;
    message?: string;
    [key: string]: unknown;
}

interface VideoStatusResponse {
    status: string;
    [key: string]: unknown;
}

/**
 * Upload video blob to server
 */
export async function uploadVideoToServer(
    videoBlob: Blob,
    videoName: string,
    serverUrl: string
): Promise<UploadResponse> {
    try {
        console.log("[Upload] Uploading video to server:", videoName);

        const formData = new FormData();
        formData.append("video", videoBlob, videoName);
        formData.append("videoName", videoName);

        const response = await fetch(`${serverUrl}uploadVideoV2`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `Upload failed: ${response.status} ${response.statusText}. ${errorText}`
            );
        }

        const data = await response.json();
        console.log("[Upload] Success:", data);
        return data;
    } catch (error) {
        console.error("[Upload] Failed:", error);
        throw error;
    }
}

/**
 * Process video with blur effect
 */
export async function processVideoForBlur({
    videoName,
    intensity,
    serverUrl,
    hasPaid = false,
    timeout = 1380000,
}: ProcessBlurParams): Promise<BlurResponse> {
    try {
        console.log(
            `[Blur Processing] Starting blur with intensity: ${intensity} for video: ${videoName}`
        );

        const url = new URL(`${serverUrl}processVideoForBlur`);
        url.searchParams.append("value", intensity.toString());
        url.searchParams.append("videoName", videoName);
        url.searchParams.append("has_paid", hasPaid ? "yes" : "no");

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url.toString(), {
                method: "GET",
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(
                    `Blur processing failed: ${response.status} ${response.statusText}. ${errorText}`
                );
            }

            const data = await response.json();
            console.log("[Blur Processing] Success:", data);
            return data;
        } catch (error) {
            clearTimeout(timeoutId);
            if (error instanceof Error && error.name === "AbortError") {
                throw new Error("Blur processing timeout");
            }
            throw error;
        }
    } catch (error) {
        console.error("[Blur Processing] Failed:", error);
        throw error;
    }
}

interface CheckVideoStatusParams {
    videoName: string;
    serverUrl: string;
    onStatusUpdate?: (status: VideoStatusResponse) => void;
    onComplete?: (data: VideoStatusResponse) => void;
    onError?: (error: Error) => void;
    maxAttempts?: number;
}


export function checkVideoStatus({
    videoName,
    serverUrl,
    onStatusUpdate,
    onComplete,
    onError,
    maxAttempts = 60,
}: CheckVideoStatusParams): NodeJS.Timeout {
    let attempts = 0;
    const interval = setInterval(async () => {
        try {
            console.log(
                `[Video Status] Checking status for: ${videoName} (attempt ${attempts + 1}/${maxAttempts})`
            );

            const url = new URL(`${serverUrl}getVideoStatus`);
            url.searchParams.append("videoName", videoName);

            const response = await fetch(url.toString(), {
                method: "GET",
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(
                    `Status check failed: ${response.status} ${response.statusText}. ${errorText}`
                );
            }

            const data = await response.json();
            console.log("[Video Status] Response:", data);

            onStatusUpdate?.(data);

            // Check if processing is complete
            if (data.status === "1" || data.status === "complete") {
                clearInterval(interval);
                console.log("[Video Status] Processing complete!");
                onComplete?.(data);
            } else if (attempts >= maxAttempts) {
                clearInterval(interval);
                console.warn("[Video Status] Status check timed out");
                onError?.(new Error("Processing timed out. Please try again."));
            }

            attempts++;
        } catch (error) {
            console.error("[Video Status] Error:", error);
            attempts++;

            // Only throw after max attempts
            if (attempts >= maxAttempts) {
                clearInterval(interval);
                onError?.(error instanceof Error ? error : new Error(String(error)));
            }
        }
    }, 2000); // Check every 2 seconds

    return interval;
}

interface CheckCompressionStatusParams {
    videoName: string;
    serverUrl: string;
    onStatusUpdate?: (status: VideoStatusResponse) => void;
    onComplete?: (data: VideoStatusResponse) => void;
    onError?: (error: Error) => void;
    maxAttempts?: number;
}


export function checkCompressionStatus({
    videoName,
    serverUrl,
    onStatusUpdate,
    onComplete,
    onError,
    maxAttempts = 300,
}: CheckCompressionStatusParams): NodeJS.Timeout {
    let attempts = 0;
    const interval = setInterval(async () => {
        try {
            console.log(
                `[Compression Status] Checking status for: ${videoName} (attempt ${attempts + 1}/${maxAttempts})`
            );

            const url = new URL(`${serverUrl}getCompressionStatus`);
            url.searchParams.append("videoName", videoName);

            const response = await fetch(url.toString(), {
                method: "GET",
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(
                    `Compression check failed: ${response.status} ${response.statusText}. ${errorText}`
                );
            }

            const data = await response.json();
            console.log("[Compression Status] Response:", data);

            onStatusUpdate?.(data);

            // Check if compression is complete
            if (data.status === "1" || data.status === "complete") {
                clearInterval(interval);
                console.log("[Compression Status] Compression complete!");
                onComplete?.(data);
            } else if (attempts >= maxAttempts) {
                clearInterval(interval);
                console.warn("[Compression Status] Status check timed out");
                onError?.(new Error("Compression timed out. Please try again."));
            }

            attempts++;
        } catch (error) {
            console.error("[Compression Status] Error:", error);
            attempts++;

            // Only throw after max attempts
            if (attempts >= maxAttempts) {
                clearInterval(interval);
                onError?.(error instanceof Error ? error : new Error(String(error)));
            }
        }
    }, 2000); // Check every 2 seconds

    return interval;
}

interface ApplyBlurToVideoParams {
    videoName: string;
    selectedIntensity: string;
    customIntensity: number;
    serverUrl: string;
    hasPaid?: boolean;
    onStatusUpdate?: (status: string) => void;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}


export async function applyBlurToVideo({
    videoName,
    selectedIntensity,
    customIntensity,
    serverUrl,
    hasPaid = false,
    onStatusUpdate,
    onSuccess,
    onError,
}: ApplyBlurToVideoParams): Promise<NodeJS.Timeout | undefined> {
    try {
        if (selectedIntensity === "none") {
            console.log("[Blur Apply] Skipping blur (intensity: none)");
            onSuccess?.();
            return;
        }

        const intensity = getIntensityValue(selectedIntensity, customIntensity);
        const label = getIntensityLabel(selectedIntensity, customIntensity);

        onStatusUpdate?.(`Applying ${label} blur effect...`);

        // Process video with blur
        await processVideoForBlur({
            videoName,
            intensity,
            serverUrl,
            hasPaid,
        });

        onStatusUpdate?.("Processing video...");

        // Poll for completion
        const statusInterval = checkVideoStatus({
            videoName,
            serverUrl,
            onComplete: () => {
                onStatusUpdate?.("Blur effect applied successfully!");
                onSuccess?.();
            },
            onError,
            maxAttempts: 60,
        });

        return statusInterval;
    } catch (error) {
        console.error("[Apply Blur] Error:", error);
        onError?.(error instanceof Error ? error : new Error(String(error)));
    }
}
