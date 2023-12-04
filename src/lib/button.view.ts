import { Subject } from 'rxjs'
import { ChildLike, ChildrenLike, VirtualDOM } from '@youwol/rx-vdom'

export namespace Button {
    export class State {
        constructor(
            public readonly click$: Subject<MouseEvent> = new Subject<MouseEvent>(),
        ) {}
    }

    export function simpleTextButton(text: string) {
        return new View({
            contentView: () => ({ tag: 'div', innerText: text }),
        })
    }

    export class View implements VirtualDOM<'button'> {
        static defaultClass = 'fv-btn fv-btn-primary'
        public readonly class: string
        public readonly state: State
        public readonly tag = 'button'
        public readonly type = 'button'
        public readonly children: ChildrenLike
        public readonly onclick: (ev: MouseEvent) => void

        constructor({
            state,
            contentView,
            ...rest
        }: {
            state?: State
            contentView: (State) => ChildLike
            [_key: string]: unknown
        }) {
            Object.assign(this, rest)

            if (!(rest['className'] || rest['class'])) {
                this.class = View.defaultClass
            }

            this.state = state || new State()
            this.children = [contentView(this.state)]
            this.onclick = (ev) => this.state.click$.next(ev)
        }
    }
}
