import { Injectable } from '@angular/core';
import { LexonWasm } from 'lexon-wasm';

@Injectable({
  providedIn: 'root'
})
export class LexonTranspilerService {
  private wasm: any;

  constructor() { 
    this.wasm = new LexonWasm();
  }

  private compile(code: string): string {
    return this.wasm.compile(code);
  }

  toSophia(code: string): string {
    const r = this.compile(code);
    console.log('Compile result: ' + r);
    
    const sophia = this.wasm.sophia();
    console.log('Generated Sophia: ' + sophia);

    return sophia;
  }
}
