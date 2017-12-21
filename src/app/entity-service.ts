import { Injectable } from '@angular/core';

@Injectable()
export class EntityService {
  // Die Fehlermeldung anhand des Namens der fehlerhaften Entity suchen
  // Momentan nur zum testen
  getError(name: string): string {
    return 'Fehler gefunden';
  }
}
