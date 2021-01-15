import { BehaviorSubject, Observable } from 'rxjs'
import { distinctUntilChanged, map } from 'rxjs/operators'
import { attr$, Stream$, VirtualDOM } from '@youwol/flux-view'


export namespace Switch {


    export class State {

        value$ : BehaviorSubject<boolean>
        
        constructor( value$ : BehaviorSubject<boolean> | boolean = false){
            this.value$ = (value$ instanceof BehaviorSubject)
                ? value$ 
                : new BehaviorSubject<boolean>(value$ as boolean)
        }
        toggle() {
            this.value$.next( !this.value$.getValue())
        }
    }


    export class View implements VirtualDOM {

        static defaultClass = "fv-switch"
        static defaultRadius = 15

        static defaultInnerStyle = { 
            width:`${2*View.defaultRadius}px`, 
            height: `${View.defaultRadius}px`, 
            position:'relative',
            transition: 'background-color 1s',
            'border-radius': '50rem'
        }

        public readonly state : State
        public readonly className : string | Stream$<unknown, string>
        public readonly style : Object | Stream$<unknown, Object>
        public readonly tag = 'div'
        public readonly children : [VirtualDOM | Stream$<unknown, VirtualDOM> ]
        public readonly onclick : (ev:MouseEvent) => void
        
        constructor({   
                state,
                className,
                style,
                ...rest
            }:
            {   
                state?: State,
                className?:  (State) => string | Stream$<unknown, string>,
                style?:  (State) => { [key:string]:string } | Stream$<unknown, {[key:string]:string}>
            } = {}) {
            
            Object.assign(this, rest)
            this.state = state || new State()
            this.className = className ? className(this.state) : View.defaultClass
            this.style = style ? style(this.state) : {}
            
            let valueDistinct$ = this.state.value$.pipe( distinctUntilChanged())    
            let radius = View.defaultRadius
            let styleCursorBase = {
                transition: 'left 0.5s',
                height:`${radius}px`, 
                width:`${radius}px`, 
                position:'absolute'
            }
            let innerContent = {
                class:  attr$(
                    valueDistinct$,
                    value => value? 'fv-bg-focus': 'fv-bg-disabled'
                ),
                style:{ 
                    width:`${2*radius}px`, 
                    height: `${radius}px`, 
                    position:'relative',
                    transition: 'background-color 1s',
                    'border-radius': '50rem'
                },
                children:[
                    {
                        class: "fv-cursor fv-bg-primary fv-rounded-circle", 
                        style: attr$(
                            valueDistinct$, 
                            value => ({left: value ? `${radius}px` : '0px'}),
                            { 
                                wrapper: (d) => ({...styleCursorBase,...d}) 
                            }
                        )
                    }
                ]
            }
            
            this.children = [innerContent]

            this.onclick = (ev: MouseEvent) => { ev.stopPropagation(); this.state.toggle()}
        }
    }


}