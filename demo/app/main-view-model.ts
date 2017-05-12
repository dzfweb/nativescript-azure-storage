import {Observable} from 'data/observable';
import {NativescriptAzureStorage} from 'nativescript-azure-storage';

export class HelloWorldModel extends Observable {
  public message: string;
  public azureStorageConnectionString =
    `DefaultEndpointsProtocol=https;` +
    `AccountName=accountName;` +
    `AccountKey=accountKey`;

  constructor() {
    super();

    let azureStorage = new NativescriptAzureStorage(this.azureStorageConnectionString);
    console.log(azureStorage.connectionString);
    azureStorage.addRow('tableName', { delivered: false }, 'teste', 'teste')
    .then(() => console.log('ok'))
    .catch((err) => console.log(err));
  }
}