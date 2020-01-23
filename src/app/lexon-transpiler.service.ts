import { Injectable } from '@angular/core';
import { LexonWasm } from 'lexon-wasm';

@Injectable({
  providedIn: 'root'
})
export class LexonTranspilerService {

  constructor() { }

  private compile(code: string): string {
    return LexonWasm.call("compile", [code]);
  }

  toSophia(code: string): string {
    const r = this.compile(code);
    console.log('Compile result: ' + r);
    
    const sophia = LexonWasm.call("sophia");
    console.log('Generated Sophia: ' + sophia);

    return sophia;
  }
}
