import {Observable} from 'data/observable';
import { NativescriptAzureStorage } from 'nativescript-azure-storage';

export class HelloWorldModel extends Observable {
    azureStorageConnectionString =
    `DefaultEndpointsProtocol=https;` +
    `AccountName=x;` +
    `AccountKey=x`;
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

        azureStorage.createTable('table')
        .then(() => console.log(`Table Created!`))
        .catch((err) => console.log(`Error creating table: ${err}`));
    }

}
