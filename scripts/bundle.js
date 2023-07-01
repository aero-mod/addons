import path from "path";
import fs from "fs";

const dirname = path.dirname(new URL(import.meta.url).pathname);

const pluginDir = path.resolve(dirname, "../plugin");
const themeDir = path.resolve(dirname, "../theme");

const pluginFiles = fs.readdirSync(pluginDir).filter((file) => file.endsWith(".json"));
const themeFiles = fs.readdirSync(themeDir).filter((file) => file.endsWith(".json"));

let plugins = [];
let themes = [];

for (const file of pluginFiles) {
    const plugin = JSON.parse(fs.readFileSync(path.resolve(pluginDir, file)));
    plugins.push(plugin);
}

for (const file of themeFiles) {
    const theme = JSON.parse(fs.readFileSync(path.resolve(themeDir, file)));
    themes.push(theme);
}

fs.writeFileSync(path.resolve(dirname, "../_plugins.json"), JSON.stringify(plugins));
fs.writeFileSync(path.resolve(dirname, "../_themes.json"), JSON.stringify(themes));

console.log("Bundled plugins and themes");
