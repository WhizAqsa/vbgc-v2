// Get video from IndexedDB by videoName
export const getVideoFromIndexedDB = async (videoName: string): Promise<Blob | null> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("VideoPreviewsDB", 4);

        request.onsuccess = (event: Event) => {
            const db = (event.target as IDBOpenDBRequest)?.result;
            if (!db) {
                reject(new Error("Failed to get database instance"));
                return;
            }

            const transaction = db.transaction(["userVideos"], "readonly");
            const store = transaction.objectStore("userVideos");
            const getRequest = store.index("videoName").get(videoName);

            getRequest.onsuccess = () => {
                const result = getRequest.result;
                if (result && result.fileBuffer) {
                    // Convert ArrayBuffer back to Blob
                    const blob = new Blob([result.fileBuffer], { type: result.fileType });
                    db.close();
                    resolve(blob);
                } else {
                    db.close();
                    resolve(null);
                }
            };

            getRequest.onerror = () => {
                db.close();
                reject(getRequest.error);
            };
        };

        request.onerror = (event: Event) => {
            const error = (event.target as IDBOpenDBRequest)?.error;
            reject(error || new Error("Failed to open database"));
        };
    });
};

// Get the latest uploaded video
export const getLatestVideoFromIndexedDB = async (): Promise<{ videoName: string; blob: Blob } | null> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("VideoPreviewsDB", 4);

        request.onsuccess = (event: Event) => {
            const db = (event.target as IDBOpenDBRequest)?.result;
            if (!db) {
                reject(new Error("Failed to get database instance"));
                return;
            }

            const transaction = db.transaction(["userVideos"], "readonly");
            const store = transaction.objectStore("userVideos");
            const index = store.index("by_timestamp");
            const request = index.openCursor(null, "prev");

            request.onsuccess = (event: Event) => {
                const cursor = (event.target as IDBRequest).result;
                if (cursor) {
                    const record = cursor.value;
                    if (record.fileBuffer) {
                        const blob = new Blob([record.fileBuffer], { type: record.fileType });
                        db.close();
                        resolve({ videoName: record.videoName, blob });
                    } else {
                        db.close();
                        resolve(null);
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
        };

        request.onerror = (event: Event) => {
            const error = (event.target as IDBOpenDBRequest)?.error;
            reject(error || new Error("Failed to open database"));
        };
    });
};
