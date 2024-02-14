import { AladhanApiStrategy } from './aladhan/aladhan-api.strategy';

export class OnlineClient extends AladhanApiStrategy {
  constructor() {
    console.log('OnlineClient');
    super();
  }
}
