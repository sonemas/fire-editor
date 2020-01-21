import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditorSettingsService {
  language = new Subject<string>();
  
  constructor() { }
}
