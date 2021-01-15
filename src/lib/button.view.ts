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
        public readonly state : State
        public readonly className : string | Stream$<unknown, string>
        public readonly style : Object | Stream$<unknown, Object>
        public readonly tag = 'button'
        public readonly type = 'button'
        public readonly children : [VirtualDOM | Stream$<unknown, VirtualDOM> ]
        public readonly onclick : (ev:MouseEvent) => void

        constructor(
                {   
                    state,
                    className,
                    style,
                    contentView,
                    ...rest
                } :
                {   
                    state?: State,
                    className?:  (State) => string | Stream$<unknown, string>,
                    style?:  (State) => { [key:string]:string } | Stream$<unknown, {[key:string]:string}>,
                    contentView: (State) => VirtualDOM | Stream$<unknown, VirtualDOM>
                }) {
            
            Object.assign(this, rest)
            this.state = state || new State()
            this.className = className ? className(this.state) : View.defaultClass
            this.style = style ? style(this.state) : {}
            this.children = [contentView(this.state)]
            this.onclick = (ev) => this.state.click$.next(ev)
        }

    }


}