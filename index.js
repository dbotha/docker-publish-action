const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");
const io = require("@actions/io");

async function main() {
    try {
        const out = await exec.exec("ls");
        // const output = await exec.exec("docker --version");
        // console.log(`Output: ${output}`);
    } catch (error) {
        core.setFailed(error.message);
    }
}

main();