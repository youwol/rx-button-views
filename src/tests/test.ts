import { ChildLike, render, VirtualDOM } from '@youwol/rx-vdom'
import { interval } from 'rxjs'
import { Button } from '../lib/button.view'

test('button with className attr$', () => {
    const timer$ = interval(1000)

    const class$ = {
        source$: timer$,
        vdomMap: (count: number) => (count % 2 ? 'fv-btn even' : 'fv-btn odd'),
    }
    const vDom: VirtualDOM<'div'> = {
        tag: 'div',
        class: 'd-flex align-items-center',
        children: [
            { tag: 'div', innerText: 'The button:' },
            new Button.View({
                contentView: () => ({ tag: 'div', innerText: 'click' }),
                class: class$,
            }),
        ],
    }
    const div = render(vDom)
    document.body.appendChild(div)

    // TODO
    const button = document.querySelector('button')
    expect(button).toBeTruthy()
})

test('button with custom contentView$', () => {
    const timer$ = interval(1000)

    const content$: ChildLike = {
        source$: timer$,
        vdomMap: (count: number) =>
            count % 2
                ? { tag: 'i' as const, innerText: 'even Bttn' }
                : { tag: 'label' as const, innerText: 'odd Bttn' },
    }

    const vDom: VirtualDOM<'div'> = {
        tag: 'div',
        class: 'd-flex align-items-center',
        children: [
            { tag: 'div', innerText: 'The button:' },
            new Button.View({ contentView: () => content$ }),
        ],
    }
    const div = render(vDom)
    document.body.appendChild(div)

    // TODO
    const button = document.querySelector('button')
    expect(button).toBeTruthy()
})
