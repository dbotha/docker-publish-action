const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");
const io = require("@actions/io");

async function main() {
    try {
        const dockerRegistry = core.getInput("docker-registry");
        const dockerImageName = core.getInput("docker-image-name");
        const dockerImageTagsString = core.getInput("docker-image-tags");
        const username = core.getInput("username");
        const password = core.getInput("password");
        const tags = dockerImageTagsString.split(",").map(tag => tag.trim());
        if (tags.length === 0) tags.push("latest");
        const out = await exec.exec(`docker image build -t ${dockerImageName}:${tags[0]} .`);
        const output = await exec.exec("docker image ls");
        // console.log(`Output: ${output}`);
    } catch (error) {
        core.setFailed(error.message);
    }
}

main();