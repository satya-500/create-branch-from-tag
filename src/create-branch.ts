import {Context} from "@actions/github/lib/context";
import {GitHub} from "@actions/github";
import * as core from '@actions/core';

const childProcess = require('child_process');

export async function createBranch(github: any, context: Context, branch: string, from: string) {
    const toolkit: GitHub = new github(githubToken());
    let branchExists;
    // Sometimes branch might come in with refs/heads already
    branch = branch.replace('refs/heads/', '');

    // Check to see if the branch already exists - if it does catch the error and create the branch
    try {
        core.debug(`Trying to get branch ${branch} from ${context.repo.owner}/${context.repo.repo}`)

        let branchResponse = await toolkit.repos.getBranch({
            ...context.repo,
            branch
        })

        core.debug(`Response: ${branchResponse.status}`)
        core.debug(`Branch ${branch} data: ${branchResponse.data}`);

        // If the branch exists we skip the catch block and continue finish this action.
        branchExists = true;
        
    } catch (error) {
        // Error was found - this is likely `Error: "HttpError": 404 - Branch not found`
        core.debug(`Error: "${error.name}": ${error.status} - ${error.message}`);
        if (error.name == 'HttpError' && error.status == 404) {
            // Get the latest full SHA of the tag (from)
            const longSHA = childProcess.execSync('git rev-list -n 1 ' + from).toString().trim();
            core.debug(`Creating branch ${branch} from ${from} with SHA ${longSHA}`);
            await toolkit.git.createRef({
                ref: `refs/heads/${branch}`,
                sha: longSHA,
                ...context.repo
            })
        } else {
            // If the error is not a 404 HttpError, we throw it
            throw Error(error)
        }
    }
}

function githubToken(): string {
    const token = process.env.GITHUB_TOKEN;
    if (!token)
        throw ReferenceError('No token defined in the environment variables');
    return token;
}
