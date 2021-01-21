import { attr$, child$, render } from "@youwol/flux-view"
import { interval } from "rxjs"
import { Button } from "../lib/button.view"



/*
test('simplest button', () => {

    let vDom = {
        class: 'd-flex align-items-center',
        children:[
            { innerText: 'The button:'},
            new Button.View('click')
        ]
    }
    let div = render(vDom)
    
})
*/
test('button with className attr$', () => {

    let timer$ = interval(1000)

    let class$ = attr$( timer$, (count) => count%2 ? 'fv-btn even' : 'fv-btn odd')
    let vDom = {
        class: 'd-flex align-items-center',
        children:[
            { innerText: 'The button:'},
            new Button.View({contentView: () => ({innerText:'click'}), class: class$ } as any)
        ]
    }
    let div = render(vDom)
})

test('button with custom contentView$', () => {

    let timer$ = interval(1000)

    let content$ = child$( timer$, (count) => count%2 
        ? { tag:'i' , innerText: "even Bttn"}
        : { tag:'label', innerText: "odd Bttn"} 
    )
    let vDom = {
        class: 'd-flex align-items-center',
        children:[
            { innerText: 'The button:'},
            new Button.View({contentView: () => content$})
        ]
    }
    let div = render(vDom)
    
})



