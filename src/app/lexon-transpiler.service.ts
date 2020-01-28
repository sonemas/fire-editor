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
    const r = this.wasm.compile(code);
    return r;
  }

  toSophia(code: string): string {
    const r = this.compile(code);
    if (r != 'ok') throw r;
    return this.wasm.sophia();
  }
}
