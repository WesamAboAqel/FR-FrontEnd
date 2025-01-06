export interface AccessLog {
    logID: number;
    cameraID: number; // Assuming you want to store the camera ID
    accessTime: string; // Use string to handle LocalDateTime
    accessGranted: boolean;
    accountType: string;
    personName: string;
} 