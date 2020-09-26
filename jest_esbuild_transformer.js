const fs = require("fs")
const path = require("path")
const esbuild = require("esbuild")
const crypto = require("crypto")

module.exports = {
    getCacheKey(fileContent, filePath, _jestConfigStr) {
        return crypto
            .createHash("sha256")
            .update(fileContent)
            .update(filePath)
            .update(_jestConfigStr)
            .digest()
            .toString("hex")
    },
    process(source, filename) {
        console.log(filename)
        const result = esbuild.transformSync(source, {
            loader: filename.endsWith(".tsx") ? "tsx" : "ts",
            sourcemap: false,
            format: "cjs",
            jsxFactory: "React.createElement",
            jsxFragment: "React.Fragment",
        })
        if (result.warnings.length > 0) {
            console.warn("WARN", filename, result.warnings)
        }
        return {code: result.js, map: result.jsSourceMap}
    },
}

