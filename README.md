# strip-pragma-loader

A [webpack](http://webpack.github.io/) loader that strips code block from between requireJS `includeStart`/`excludeStart` pragma style comments using the [requireJS optimizer syntax](https://github.com/requirejs/r.js/blob/master/build/example.build.js?utm_campaign=improving-frontend-web-performance-using-requirejs-optimiser-2013-jun&utm_medium=post&utm_source=blog#L260).

For example, this loader would be used to strip out blocks of the following pattern:

```
//>>includeStart('debug', pragmas.debug);
console.log('Debugging...');
//>>includeEnd('debug');
```

## Installation

Install the loader with npm.

```
npm install strip-pragma-loader --save-dev
```

## Usage

In your webpack configuration object, you'll need to add `strip-pragma-loader` to your list of modules.

```
module: {
	rules: [{
		test: /\.js$/,
		enforce: pre,
		use: [{
			loader: 'strip-pragma-loader',
			options: {
				pragmas: {
					debug: true
				}
			}
		}]
	}]
}
```

## Options 

You can pass options to the loader using the [`options` property](https://webpack.js.org/configuration/module/#rule-options-rule-query).

The following options are supported:

 * `pragma`: Object with each pragma name and value. A `false` value will strip out and `includeStart` blocks, and a `true` value will strip out and `exlcudeStart` blocks. Defaults to an empty object.

For example, the following would strip out all blocks beginning with `//>>includeStart('debug', pragmas.debug);` and ending with `//>>includeEnd('debug');`:

```
module: {
	rules: [{
		test: /\.js$/,
		enforce: pre,
		use: [{
			loader: 'strip-pragma-loader',
			options: {
				pragmas: {
					debug: true
				}
			}
		}]
	}]
}
```

> See the [RequireJS configuration options](https://github.com/requirejs/r.js/blob/master/build/example.build.js?utm_campaign=improving-frontend-web-performance-using-requirejs-optimiser-2013-jun&utm_medium=post&utm_source=blog#L260) for more information on pragmas.

## Contributions

Pull requests are appreciated. Please use the same [Contributor License Agreement (CLA)](https://github.com/AnalyticalGraphicsInc/cesium/blob/master/CONTRIBUTING.md) used for [Cesium](https://cesiumjs.org/).

---

Developed by the Cesium team.

<a href="https://cesium.com/"><img alt="Cesium" src="doc/cesium.png" /></a>
