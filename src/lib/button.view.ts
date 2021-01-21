import { Subject } from 'rxjs'
import { VirtualDOM, Stream$ } from '@youwol/flux-view'

export namespace Button {


    export class State {
        constructor(public readonly click$: Subject<MouseEvent> = new Subject<MouseEvent>()) {
        }
    }

    export function simpleTextButton( text: string){
        return new View({contentView: () => ({innerText: text}) })
    }
    
    export class View implements VirtualDOM {

        static defaultClass = "fv-btn fv-btn-primary"
        public readonly class : string
        public readonly state : State
        public readonly tag = 'button'
        public readonly type = 'button'
        public readonly children : [VirtualDOM | Stream$<unknown, VirtualDOM> ]
        public readonly onclick : (ev:MouseEvent) => void

        constructor(
                {   
                    state,
                    contentView,
                    ...rest
                } :
                {   
                    state?: State,
                    contentView: (State) => VirtualDOM | Stream$<unknown, VirtualDOM>
                }) {
            
            Object.assign(this, rest)

            if( !(rest['className'] || rest['class'])) 
                this.class = View.defaultClass

            this.state = state || new State()
            this.children = [contentView(this.state)]
            this.onclick = (ev) => this.state.click$.next(ev)
        }

    }


}