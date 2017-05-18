import {Observable} from 'data/observable';
import { NativeScriptAzureStorage } from 'nativescript-azure-storage';

export class HelloWorldModel extends Observable {
    azureStorageConnectionString = 'DefaultEndpointsProtocol=http;AccountName=x;AccountKey=x;'
    constructor() {
        super();

    }


    public onTap() {
        let azureStorage = new NativeScriptAzureStorage(this.azureStorageConnectionString);

        // azureStorage.deleteBlobContainer('abcd')
        // .then(() => {
        //     console.log('ok');
        // })
        // .catch((err) => {
        //     console.log('nao ok');
        // })

        // azureStorage.createTable('table')
        // .then(() => console.log(`Table Created!`))
        // .catch((err) => console.log(`Error creating table: ${err}`));

        // azureStorage.listTables()
        // .then((tables) => {
        //     tables.forEach((table) => {
        //         console.log(`Table:${table}`);
        //     });
        // })
        // .catch((err) => console.log(`Error getting tables: ${err}`));

        // azureStorage.listRows('table')
        // .then((rows) => {
        //     rows.forEach((row) => {
        //         console.log(`Row:${row.partitionKey} | ${row.rowKey} | ${row.getTimestamp() }`);
        //     });
        // })
        // .catch((err) => console.log(`Error getting tables: ${err}`));
    }

}
