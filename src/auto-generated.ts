
const runTimeDependencies = {
    "load": {
        "rxjs": "^6.5.5",
        "@youwol/flux-view": "^1.0.3"
    },
    "differed": {},
    "includedInBundle": []
}
const externals = {
    "rxjs": {
        "commonjs": "rxjs",
        "commonjs2": "rxjs",
        "root": "rxjs_APIv6"
    },
    "@youwol/flux-view": {
        "commonjs": "@youwol/flux-view",
        "commonjs2": "@youwol/flux-view",
        "root": "@youwol/flux-view_APIv1"
    },
    "rxjs/operators": {
        "commonjs": "rxjs/operators",
        "commonjs2": "rxjs/operators",
        "root": [
            "rxjs_APIv6",
            "operators"
        ]
    }
}
const exportedSymbols = {
    "rxjs": {
        "apiKey": "6",
        "exportedSymbol": "rxjs"
    },
    "@youwol/flux-view": {
        "apiKey": "1",
        "exportedSymbol": "@youwol/flux-view"
    }
}
export const setup = {
    name:'@youwol/fv-button',
        assetId:'QHlvdXdvbC9mdi1idXR0b24=',
    version:'0.2.0-wip',
    shortDescription:"Button's type of widgets using flux-view.",
    developerDocumentation:'https://platform.youwol.com/applications/@youwol/cdn-explorer/latest?package=@youwol/fv-button',
    npmPackage:'https://www.npmjs.com/package/@youwol/fv-button',
    sourceGithub:'https://github.com/youwol/fv-button',
    userGuide:'',
    apiVersion:'02',
    runTimeDependencies,
    externals,
    exportedSymbols,
    getDependencySymbolExported: (module:string) => {
        return `${exportedSymbols[module].exportedSymbol}_APIv${exportedSymbols[module].apiKey}`
    }
}
