import { Injectable } from '@angular/core';
import { AllEntities } from './DataTypes/Entity';

@Injectable()
export class EntityService {


  getShortName(long: string): string {
    for (let i = 0; i < AllEntities.length; i++) {
      if (AllEntities[i].long === long) {
        return AllEntities[i].short;
      }
    }
    console.log('No short name found for: ' + long);
    return long;
  }

  getLongName(short: string): string {
    for (let i = 0; i < AllEntities.length; i++) {
      if (AllEntities[i].short === short) {
        return AllEntities[i].long;
      }
    }
    console.log('No long name found for: ' + short);
    return short;
  }
}

