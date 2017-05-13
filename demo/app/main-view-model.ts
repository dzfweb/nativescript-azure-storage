import {Observable} from 'data/observable';
import { NativescriptAzureStorage } from 'nativescript-azure-storage';

export class HelloWorldModel extends Observable {
    azureStorageConnectionString = 'DefaultEndpointsProtocol=http;AccountName=x;AccountKey=x;'
    constructor() {
        super();

    }


    public onTap() {
        let azureStorage = new NativescriptAzureStorage(this.azureStorageConnectionString);

        azureStorage.listTables()
        .then((tables) => {
            tables.forEach((table) => {
                console.log(`Table:${table}`);
            });
        })
        .catch((err) => console.log(`Error getting tables: ${err}`));

        azureStorage.listRows('table')
        .then((rows) => {
            rows.forEach((row) => {
                console.log(`Row:${row.partitionKey} | ${row.rowKey} | ${row.getTimestamp() }`);
            });
        })
        .catch((err) => console.log(`Error getting tables: ${err}`));

        // azureStorage.createTable('table')
        // .then(() => console.log(`Table Created!`))
        // .catch((err) => console.log(`Error creating table: ${err}`));

        // azureStorage.downloadBlob('checkouthomolog')
        // .then((result) => {
        //     result.forEach((el) => console.log(el));
        // })
        // .catch((err) => console.log(`Error getting blob: ${err}`));
    }

}
