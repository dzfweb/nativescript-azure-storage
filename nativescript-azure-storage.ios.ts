declare const AZSCloudBlob, AZSCloudBlobContainer, AZSCloudStorageAccount, NSError;

export class NativeScriptAzureStorage {
    private storageAccount;
    private blobClient;
    private connectionString;
    private error = new interop.Reference();
    constructor(connectionString: string) {
        this.connectionString = connectionString;
        this.storageAccount = AZSCloudStorageAccount.accountFromConnectionStringError(this.connectionString, this.error);
        this.blobClient = this.storageAccount.getBlobClient();
    }
    uploadBlob(containerName: string, blobName: string, blobValue: any): Promise<any> {
        try {
            let container = this.blobClient.containerReferenceFromName(containerName);
            let blob = container.blockBlobReferenceFromName(blobName);
            blob.uploadFromTextCompletionHandler(blobValue, null);
            return Promise.resolve(true);
        } catch (ex) {
            return Promise.reject(ex);
        }
    }
    deleteBlob(containerName: string, blobName: string): Promise<any> {
        try {
            let container = this.blobClient.containerReferenceFromName(containerName);
            let blob = container.blockBlobReferenceFromName(blobName);
            blob.deleteWithCompletionHandler(null);
            return Promise.resolve(true);
        } catch (ex) {
            return Promise.reject(ex);
        }
    }
    downloadBlob(containerName: string, blobName: string): Promise<any> {
        try {
            let container = this.blobClient.containerReferenceFromName(containerName);
            let blob = container.blockBlobReferenceFromName(blobName);
            blob.downloadToTextWithCompletionHandler(null);
            return Promise.resolve(null);
        } catch (ex) {
            return Promise.reject(ex);
        }
    }
    deleteBlobContainer(containerName: string): Promise<any> {
        try {
            let container = this.blobClient.containerReferenceFromName(containerName);
            container.deleteContainerIfExistsWithCompletionHandler(null);
            return Promise.resolve(true);
        } catch (ex) {
            return Promise.reject(ex);
        }
    }
    createBlobContainer(containerName: string): Promise<any> {
        try {
            let container = this.blobClient.containerReferenceFromName(containerName);
            container.createContainerIfNotExistsWithCompletionHandler(null);
            return Promise.resolve(true);
        } catch (ex) {
            return Promise.reject(ex);
        }
    }
}
