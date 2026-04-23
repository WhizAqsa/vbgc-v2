// indexeddb-utils.ts

// Database version - increment this when you change the schema
const DB_VERSION = 6;
const DB_NAME = "VideoPreviewsDB";
const STORE_NAME = "userVideos";

// Open database connection (reusable)
const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const db = (event.target as IDBOpenDBRequest).result;
            const oldVersion = event.oldVersion;

            console.log(`Upgrading database from version ${oldVersion} to ${DB_VERSION}`);

            // Check if store exists and delete if needed (for schema changes)
            if (db.objectStoreNames.contains(STORE_NAME)) {
                db.deleteObjectStore(STORE_NAME);
            }

            // Create object store with compound key path
            const store = db.createObjectStore(STORE_NAME, {
                keyPath: ["userEmail", "videoName", "type"]
            });

            // Create indexes for efficient queries
            store.createIndex("by_user_and_type", ["userEmail", "type"]);
            store.createIndex("by_user", "userEmail");
            store.createIndex("by_video_name", "videoName");
            store.createIndex("by_timestamp", "timestamp");
        };

        request.onsuccess = (event: Event) => {
            resolve((event.target as IDBOpenDBRequest).result);
        };

        request.onerror = (event: Event) => {
            const error = (event.target as IDBOpenDBRequest).error;
            console.error("Database open failed:", error);
            reject(error);
        };
    });
};

// Store video preview in IndexedDB
export const storeVideoPreview = async (
    userEmail: string | null,
    videoName: string,
    videoBlob: Blob,
    type: "original" | "edited"
): Promise<void> => {
    if (!userEmail) {
        console.warn("No user email provided, skipping storage");
        return;
    }

    try {
        const db = await openDB();

        // Convert blob to array buffer for storage
        const arrayBuffer = await videoBlob.arrayBuffer();

        const transaction = db.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);

        const record = {
            userEmail: userEmail,
            videoName: videoName,
            type: type,
            fileBuffer: arrayBuffer,
            fileType: videoBlob.type,
            timestamp: Date.now(),
            expiration: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days expiry
        };

        const request = store.put(record);

        request.onsuccess = () => {
            console.log(`Video stored successfully: ${videoName} (${type})`);
            db.close();
        };

        request.onerror = () => {
            console.error("Failed to store video:", request.error);
            db.close();
        };

    } catch (error) {
        console.error("Error storing video preview:", error);
    }
};

// Get video preview from IndexedDB by userEmail, videoName, and type
export const getVideoPreview = async (
    userEmail: string | null,
    videoName: string,
    type: "original" | "edited"
): Promise<Blob | null> => {
    if (!userEmail) {
        console.warn("No user email provided");
        return null;
    }

    try {
        const db = await openDB();

        const transaction = db.transaction([STORE_NAME], "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const key = [userEmail, videoName, type];
        const request = store.get(key);

        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                const result = request.result;
                if (result && result.fileBuffer && result.expiration > Date.now()) {
                    const mimeType = result.fileType || "video/mp4";
                    const blob = new Blob([new Uint8Array(result.fileBuffer)], { type: mimeType });
                    db.close();
                    resolve(blob);
                } else {
                    db.close();
                    resolve(null);
                }
            };

            request.onerror = () => {
                db.close();
                reject(request.error);
            };
        });

    } catch (error) {
        console.error("Error getting video preview:", error);
        return null;
    }
};

// Delete video preview from IndexedDB
export const deleteVideoPreview = async (
    userEmail: string | null,
    videoName: string
): Promise<void> => {
    if (!userEmail) {
        console.warn("No user email provided");
        return;
    }

    try {
        const db = await openDB();

        const transaction = db.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);

        // Delete both original and edited versions
        store.delete([userEmail, videoName, "original"]);
        store.delete([userEmail, videoName, "edited"]);

        db.close();
        console.log(`Deleted video: ${videoName}`);

    } catch (error) {
        console.error("Error deleting video preview:", error);
    }
};

// Get video from IndexedDB by videoName (no userEmail check)
export const getVideoFromIndexedDB = async (videoName: string): Promise<Blob | null> => {
    try {
        const db = await openDB();

        const transaction = db.transaction([STORE_NAME], "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const index = store.index("by_video_name");
        const request = index.get(videoName);

        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                const result = request.result;
                if (result && result.fileBuffer && result.expiration > Date.now()) {
                    const mimeType = result.fileType || "video/mp4";
                    const blob = new Blob([new Uint8Array(result.fileBuffer)], { type: mimeType });
                    db.close();
                    resolve(blob);
                } else {
                    db.close();
                    resolve(null);
                }
            };

            request.onerror = () => {
                db.close();
                reject(request.error);
            };
        });

    } catch (error) {
        console.error("Error getting video from IndexedDB:", error);
        return null;
    }
};

// Get the latest uploaded video (most recent by timestamp)
export const getLatestVideoFromIndexedDB = async (): Promise<{ videoName: string; blob: Blob } | null> => {
    try {
        const db = await openDB();

        const transaction = db.transaction([STORE_NAME], "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const index = store.index("by_timestamp");
        const request = index.openCursor(null, "prev"); // "prev" for descending order

        return new Promise((resolve, reject) => {
            request.onsuccess = (event: Event) => {
                const cursor = (event.target as IDBRequest).result;
                if (cursor) {
                    const record = cursor.value;
                    if (record.fileBuffer && record.expiration > Date.now()) {
                        const mimeType = record.fileType || "video/mp4";
                        const blob = new Blob([new Uint8Array(record.fileBuffer)], { type: mimeType });
                        db.close();
                        resolve({ videoName: record.videoName, blob });
                    } else {
                        // Try next cursor if this one is expired
                        cursor.continue();
                    }
                } else {
                    db.close();
                    resolve(null);
                }
            };

            request.onerror = () => {
                db.close();
                reject(request.error);
            };
        });

    } catch (error) {
        console.error("Error getting latest video from IndexedDB:", error);
        return null;
    }
};

// Get all videos for a user
export const getAllUserVideos = async (userEmail: string | null): Promise<Array<{
    videoName: string;
    type: string;
    blob: Blob;
    timestamp: number;
}>> => {
    if (!userEmail) {
        return [];
    }

    try {
        const db = await openDB();

        const transaction = db.transaction([STORE_NAME], "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const index = store.index("by_user");
        const request = index.getAll(userEmail);

        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                const results = request.result;
                const videos = results
                    .filter(record => record.expiration > Date.now())
                    .map(record => ({
                        videoName: record.videoName,
                        type: record.type,
                        blob: new Blob([new Uint8Array(record.fileBuffer)], { type: record.fileType || "video/mp4" }),
                        timestamp: record.timestamp
                    }));
                db.close();
                resolve(videos);
            };

            request.onerror = () => {
                db.close();
                reject(request.error);
            };
        });

    } catch (error) {
        console.error("Error getting all user videos:", error);
        return [];
    }
};

// Clean up expired videos (call this periodically)
export const cleanupExpiredVideos = async (): Promise<void> => {
    try {
        const db = await openDB();

        const transaction = db.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.openCursor();

        request.onsuccess = (event: Event) => {
            const cursor = (event.target as IDBRequest).result;
            if (cursor) {
                const record = cursor.value;
                if (record.expiration < Date.now()) {
                    cursor.delete();
                }
                cursor.continue();
            }
        };

        db.close();

    } catch (error) {
        console.error("Error cleaning up expired videos:", error);
    }
};

// Clear all videos for a user
export const clearAllUserVideos = async (userEmail: string | null): Promise<void> => {
    if (!userEmail) {
        return;
    }

    try {
        const db = await openDB();

        const transaction = db.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const index = store.index("by_user");
        const request = index.openCursor(IDBKeyRange.only(userEmail));

        request.onsuccess = (event: Event) => {
            const cursor = (event.target as IDBRequest).result;
            if (cursor) {
                cursor.delete();
                cursor.continue();
            }
        };

        db.close();

    } catch (error) {
        console.error("Error clearing user videos:", error);
    }
};

// Check if a video with this filename already exists in cache
export const checkVideoInCache = async (
    userEmail: string | null,
    originalFileName: string
): Promise<{ videoName: string; blob: Blob } | null> => {
    if (!userEmail) {
        console.warn("[CACHE] ⚠️ No user email provided");
        return null;
    }

    try {
        console.log(`[CACHE] 🔍 Checking if video exists: ${originalFileName}`);
        const db = await openDB();

        const transaction = db.transaction([STORE_NAME], "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const index = store.index("by_user");
        const request = index.getAll(userEmail);

        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                const results = request.result;
                // Find the most recent video with this filename
                const matchingVideo = results
                    .filter(record => {
                        // Check if video name ends with the original filename
                        // e.g., "1234567890__video.mp4" ends with "video.mp4"
                        return record.videoName.includes(originalFileName) &&
                            record.type === "original" &&
                            record.expiration > Date.now();
                    })
                    .sort((a, b) => b.timestamp - a.timestamp) // Sort by most recent
                    .at(0);

                if (matchingVideo && matchingVideo.fileBuffer && matchingVideo.expiration > Date.now()) {
                    const mimeType = matchingVideo.fileType || "video/mp4";
                    const blob = new Blob([new Uint8Array(matchingVideo.fileBuffer)], { type: mimeType });
                    console.log(`[CACHE] ✅ CACHE HIT! Found: ${matchingVideo.videoName} (${(blob.size / 1024 / 1024).toFixed(2)} MB)`);
                    db.close();
                    resolve({ videoName: matchingVideo.videoName, blob });
                } else {
                    console.log("[CACHE] ❌ No matching video found in cache");
                    db.close();
                    resolve(null);
                }
            };

            request.onerror = () => {
                db.close();
                reject(request.error);
            };
        });

    } catch (error) {
        console.error("[CACHE] ❌ Error checking cache:", error);
        return null;
    }
};