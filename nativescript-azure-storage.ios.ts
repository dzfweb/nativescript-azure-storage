declare var AZSCloudBlob, AZSCloudBlobContainer, AZSCloudStorageAccount;

export class NativeScriptAzureStorage {
    private storageAccount;
    private blobClient;
    private connectionString;
    constructor(connectionString: string) {
        this.connectionString = connectionString;
        this.storageAccount = AZSCloudStorageAccount(this.connectionString);
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
            let container = this.blobClient.containerReference(containerName);
            container.createContainerIfNotExists();
            return Promise.resolve(true);
        } catch (ex) {
            return Promise.reject(ex);
        }
    }
}
