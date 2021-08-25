import { Context } from "@actions/github/lib/context";
import { GitHub } from "@actions/github";

const childProcess = require('child_process');

export async function createBranch(github: any, context: Context, branch: string, from_tag: string) {
  const toolkit : GitHub = new github(githubToken());
    let branchExists;
    // Sometimes branch might come in with refs/heads already
    branch = branch.replace('refs/heads/', '');
    
    // throws HttpError if branch already exists.
    try {
      await toolkit.repos.getBranch({
        ...context.repo,
        branch
      })

      branchExists = true;
    } catch(error) {
      if(error.name === 'HttpError' && error.status === 404) {
        const longSHA = childProcess.execSync('git rev-list -n 1 tags/'+from_tag).toString().trim();
        await toolkit.git.createRef({
          ref: `refs/heads/${branch}`,
          sha: longSHA,
          ...context.repo
        })
      } else {
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
