# Lexon-WASM integration

Development notes for integrating the lexon-wasm compiler into the fire-editor. Kind of messy now, will be made tidy later.

## Prepare WASM

### Compile and install lexon WASM
[Repo](https://gitlab.com/lexon-foundation/lexon-rust)

### Link the library
    cd pkg
    npm link

## Prepare project

### Install wasm support into project (depricated)
    npm install @types/webassembly-js-api --only-dev --save

### Create service
    ng generate service wasm

    import { Injectable } from '@angular/core'
    import { Observable, BehaviorSubject } from 'rxjs'
    import { filter, map } from 'rxjs/operators'

    import * as Module from './../../wasm/fibonacci.js'
    import '!!file-loader?name=wasm/fibonacci.wasm!../../wasm/fibonacci.wasm'

    @Injectable()
    class WasmService {
        module: any

        wasmReady = new BehaviorSubject<boolean>(false)

        constructor() {
            this.instantiateWasm('wasm/fibonacci.wasm')
        }

        private async instantiateWasm(url: string) {
            // fetch the wasm file
            const wasmFile = await fetch(url)

            // convert it into a binary array
            const buffer = await wasmFile.arrayBuffer()
            const binary = new Uint8Array(buffer)

            // create module arguments
            // including the wasm-file
            const moduleArgs = {
            wasmBinary: binary,
            onRuntimeInitialized: () => {
                this.wasmReady.next(true)
            },
            }

            // instantiate the module
            this.module = Module(moduleArgs)
        }

        public fibonacci(input: number): Observable<number> {
            return this.wasmReady.pipe(filter(value => value === true)).pipe(
            map(() => {
                return this.module._fibonacci(input)
            })
            )
        }
    }

### Install lexon-wasm into project
    npm link lexon-wasm
    npm install lexon-wasm

### Load wasm
    componentDidMount(){
        if(!this.state.wasm)
        {
        import('lexon-wasm').then((wasm)=>{
            this.setState({wasm:new wasm.LexonWasm()})
            }
        )
        }
    }

### Compiling
    let error=this.state.wasm.compile(codeStr)
      let solidity=error
      let english=""
      let sophia=error
      if(error==="ok"){
        solidity=this.state.wasm.solidity()
        english=this.state.wasm.english()
        sophia=this.state.wasm.sophia()

## Resources

- https://stackoverflow.com/questions/56216125/implement-webassembly-in-my-angular-project
- https://malcoded.com/posts/web-assembly-angular/