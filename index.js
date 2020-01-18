const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");

async function main() {
    try {
        const output = await exec.exec("docker --version");
        console.log(`Output: ${output}`);
    } catch (error) {
        core.setFailed(error.message);
    }
}

main();