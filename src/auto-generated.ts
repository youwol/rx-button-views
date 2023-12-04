
const runTimeDependencies = {
    "externals": {
        "rxjs": "^7.5.6",
        "@youwol/rx-vdom": "^1.0.1"
    },
    "includedInBundle": {}
}
const externals = {
    "rxjs": {
        "commonjs": "rxjs",
        "commonjs2": "rxjs",
        "root": "rxjs_APIv7"
    },
    "@youwol/rx-vdom": {
        "commonjs": "@youwol/rx-vdom",
        "commonjs2": "@youwol/rx-vdom",
        "root": "@youwol/rx-vdom_APIv1"
    },
    "rxjs/operators": {
        "commonjs": "rxjs/operators",
        "commonjs2": "rxjs/operators",
        "root": [
            "rxjs_APIv7",
            "operators"
        ]
    }
}
const exportedSymbols = {
    "rxjs": {
        "apiKey": "7",
        "exportedSymbol": "rxjs"
    },
    "@youwol/rx-vdom": {
        "apiKey": "1",
        "exportedSymbol": "@youwol/rx-vdom"
    }
}

const mainEntry : {entryFile: string,loadDependencies:string[]} = {
    "entryFile": "./index.ts",
    "loadDependencies": [
        "rxjs",
        "@youwol/rx-vdom"
    ]
}

const secondaryEntries : {[k:string]:{entryFile: string, name: string, loadDependencies:string[]}}= {}

const entries = {
     '@youwol/rx-button-views': './index.ts',
    ...Object.values(secondaryEntries).reduce( (acc,e) => ({...acc, [`@youwol/rx-button-views/${e.name}`]:e.entryFile}), {})
}
export const setup = {
    name:'@youwol/rx-button-views',
        assetId:'QHlvdXdvbC9yeC1idXR0b24tdmlld3M=',
    version:'0.2.0-wip',
    shortDescription:"Button's type of widgets using rx-vdom.",
    developerDocumentation:'https://platform.youwol.com/applications/@youwol/cdn-explorer/latest?package=@youwol/rx-button-views&tab=doc',
    npmPackage:'https://www.npmjs.com/package/@youwol/rx-button-views',
    sourceGithub:'https://github.com/youwol/rx-button-views',
    userGuide:'',
    apiVersion:'02',
    runTimeDependencies,
    externals,
    exportedSymbols,
    entries,
    secondaryEntries,
    getDependencySymbolExported: (module:string) => {
        return `${exportedSymbols[module].exportedSymbol}_APIv${exportedSymbols[module].apiKey}`
    },

    installMainModule: ({cdnClient, installParameters}:{
        cdnClient:{install:(unknown) => Promise<WindowOrWorkerGlobalScope>},
        installParameters?
    }) => {
        const parameters = installParameters || {}
        const scripts = parameters.scripts || []
        const modules = [
            ...(parameters.modules || []),
            ...mainEntry.loadDependencies.map( d => `${d}#${runTimeDependencies.externals[d]}`)
        ]
        return cdnClient.install({
            ...parameters,
            modules,
            scripts,
        }).then(() => {
            return window[`@youwol/rx-button-views_APIv02`]
        })
    },
    installAuxiliaryModule: ({name, cdnClient, installParameters}:{
        name: string,
        cdnClient:{install:(unknown) => Promise<WindowOrWorkerGlobalScope>},
        installParameters?
    }) => {
        const entry = secondaryEntries[name]
        if(!entry){
            throw Error(`Can not find the secondary entry '${name}'. Referenced in template.py?`)
        }
        const parameters = installParameters || {}
        const scripts = [
            ...(parameters.scripts || []),
            `@youwol/rx-button-views#0.2.0-wip~dist/@youwol/rx-button-views/${entry.name}.js`
        ]
        const modules = [
            ...(parameters.modules || []),
            ...entry.loadDependencies.map( d => `${d}#${runTimeDependencies.externals[d]}`)
        ]
        return cdnClient.install({
            ...parameters,
            modules,
            scripts,
        }).then(() => {
            return window[`@youwol/rx-button-views/${entry.name}_APIv02`]
        })
    },
    getCdnDependencies(name?: string){
        if(name && !secondaryEntries[name]){
            throw Error(`Can not find the secondary entry '${name}'. Referenced in template.py?`)
        }
        const deps = name ? secondaryEntries[name].loadDependencies : mainEntry.loadDependencies

        return deps.map( d => `${d}#${runTimeDependencies.externals[d]}`)
    }
}
