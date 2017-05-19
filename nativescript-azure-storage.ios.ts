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
        return Promise.resolve('ok');
    }
    deleteBlob(containerName: string, blobName: string): Promise<any> {
        return Promise.resolve('ok');
    }
    downloadBlob(containerName: string): Promise<any> {
        return Promise.resolve('ok');
    }
    deleteBlobContainer(containerName: string): Promise<any> {
        return Promise.resolve('ok');
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
