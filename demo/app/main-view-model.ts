import {Observable} from 'data/observable';
import {NativescriptAzureStorage} from 'nativescript-azure-storage';

export class HelloWorldModel extends Observable {
  public message: string;
  public azureStorageConnectionString =
    `DefaultEndpointsProtocol=https;` +
    `AccountName=fmmobile;` +
    `AccountKey=Q8nTz/8b6TVMoPVAij2mAIw0yQVTfZhTklcvK8b4kWnMHvHGIQYOdqbsSxVDq1sdWqjuMzYwFj276ydg8Z8wKQ==`;

  constructor() {
    super();

    let azureStorage = new NativescriptAzureStorage(this.azureStorageConnectionString);
    console.log(azureStorage.connectionString);
    azureStorage.addRow('checkout', { delivered: false }, 'teste', 'teste')
    .then(() => console.log('okokok'))
    .catch((err) => console.log(err));
  }
}