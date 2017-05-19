export declare class NativeScriptAzureStorage {
    private storageAccount;
    private blobClient;
    private connectionString;
    private error;
    constructor(connectionString: string);
    uploadBlob(containerName: string, blobName: string, blobValue: any): Promise<any>;
    deleteBlob(containerName: string, blobName: string): Promise<any>;
    downloadBlob(containerName: string): Promise<any>;
    deleteBlobContainer(containerName: string): Promise<any>;
    createBlobContainer(containerName: string): Promise<any>;
}
