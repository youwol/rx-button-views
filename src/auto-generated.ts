const runTimeDependencies = {
    load: {
        rxjs: '^6.5.5',
        '@youwol/flux-view': '^1.0.0',
    },
    differed: {},
    includedInBundle: [],
}
const externals = {
    rxjs: 'rxjs_APIv6',
    '@youwol/flux-view': '@youwol/flux-view_APIv1',
    'rxjs/operators': {
        commonjs: 'rxjs/operators',
        commonjs2: 'rxjs/operators',
        root: ['rxjs_APIv6', 'operators'],
    },
}
export const setup = {
    name: '@youwol/fv-button',
    assetId: 'QHlvdXdvbC9mdi1idXR0b24=',
    version: '0.1.0',
    shortDescription: "Button's type of widgets using flux-view.",
    developerDocumentation:
        'https://platform.youwol.com/applications/@youwol/cdn-explorer/latest?package=@youwol/fv-button',
    npmPackage: 'https://www.npmjs.com/package/@youwol/fv-button',
    sourceGithub: 'https://github.com/youwol/fv-button',
    userGuide: 'https://l.youwol.com/doc/@youwol/fv-button',
    apiVersion: '01',
    runTimeDependencies,
    externals,
}
