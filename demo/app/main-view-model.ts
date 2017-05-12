import {Observable} from 'data/observable';
import {NativescriptAzureStorage} from 'nativescript-azure-storage';

export class HelloWorldModel extends Observable {
  public message: string;
  private nativescriptAzureStorage: NativescriptAzureStorage;

  constructor() {
    super();

    this.nativescriptAzureStorage = new NativescriptAzureStorage();
    this.message = this.nativescriptAzureStorage.message;
    console.log(this.message);
  }
}