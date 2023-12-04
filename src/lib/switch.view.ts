import { BehaviorSubject } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'
import {
    CSSAttribute,
    AttributeLike,
    ChildrenLike,
    VirtualDOM,
} from '@youwol/rx-vdom'

export namespace Switch {
    export class State {
        value$: BehaviorSubject<boolean>

        constructor(value$: BehaviorSubject<boolean> | boolean = false) {
            this.value$ =
                value$ instanceof BehaviorSubject
                    ? value$
                    : new BehaviorSubject<boolean>(value$)
        }

        toggle() {
            this.value$.next(!this.value$.getValue())
        }
    }

    export class View implements VirtualDOM<'div'> {
        static defaultClass = 'fv-switch'
        static defaultRadius = 15

        public readonly state: State
        public readonly className: AttributeLike<string>
        public readonly style: CSSAttribute
        public readonly tag = 'div'
        public readonly children: ChildrenLike
        public readonly onclick: (ev: MouseEvent) => void

        constructor({
            state,
            className,
            style,
            ...rest
        }: {
            state?: State
            className?: (State) => AttributeLike<string>
            style?: (State) => CSSAttribute
            [_key: string]: unknown
        } = {}) {
            Object.assign(this, rest)

            this.state = state || new State()
            this.className = className
                ? className(this.state)
                : View.defaultClass
            this.style = style ? style(this.state) : {}

            const valueDistinct$ = this.state.value$.pipe(
                distinctUntilChanged(),
            )
            const radius = View.defaultRadius
            const styleCursorBase: CSSAttribute = {
                transition: 'left 0.5s',
                height: `${radius}px`,
                width: `${radius}px`,
                position: 'absolute',
            }
            const innerContent: VirtualDOM<'div'> = {
                tag: 'div',
                class: {
                    source$: valueDistinct$,
                    vdomMap: (value: boolean) =>
                        value ? 'fv-bg-focus' : 'fv-bg-disabled',
                },
                style: {
                    width: `${2 * radius}px`,
                    height: `${radius}px`,
                    position: 'relative',
                    transition: 'background-color 1s',
                    borderRadius: '50rem',
                },
                children: [
                    {
                        tag: 'div',
                        class: 'fv-cursor fv-bg-primary fv-rounded-circle',
                        style: {
                            source$: valueDistinct$,
                            vdomMap: (value) => ({
                                left: value ? `${radius}px` : '0px',
                            }),

                            wrapper: (d) => ({ ...styleCursorBase, ...d }),
                        },
                    },
                ],
            }

            this.children = [innerContent]

            this.onclick = (ev: MouseEvent) => {
                ev.stopPropagation()
                this.state.toggle()
            }
        }
    }
}
