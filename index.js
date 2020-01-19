const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");
const io = require("@actions/io");

function getInputs() {
    const dockerRegistry = core.getInput("docker-registry");
    const dockerImageName = core.getInput("docker-image-name");
    const dockerImageTagsString = core.getInput("docker-image-tags");
    const username = core.getInput("username");
    const password = core.getInput("password");
    const tags = dockerImageTagsString.split(",").map(tag => tag.trim());
    if (tags.length === 0) tags.push("latest");
    return {dockerRegistry, dockerImageName, username, password, tags};
}

async function dockerLogin(registry, username, password) {
    await exec.exec(`docker login -u ${username} -p ${password} ${registry}`);
}

async function dockerBuildImage(registry, imageName) {
    await exec.exec(`docker image build -t ${registry}/${imageName}:action-image .`);
}

async function dockerPushAndTagImage(registry, imageName, tags) {
    for (const tag of tags) {
        const newTag = `${registry}/${imageName}:${tag}`;
        await exec.exec(`docker tag ${registry}/${imageName}:action-image ${newTag}`);
        await exec.exec(`docker push ${newTag}`);
    }
}

async function main() {
    try {
        const {dockerRegistry, dockerImageName, username, password, tags} = getInputs();
        await dockerLogin(dockerRegistry, username, password);
        await dockerBuildImage(dockerRegistry, dockerImageName);
        await dockerPushAndTagImage(dockerRegistry, dockerImageName, tags);
    } catch (error) {
        core.setFailed(error.message);
    }
}

main();