import * as core from '@actions/core';
import { GitHub, context} from '@actions/github'
import { createBranch } from './create-branch';

async function run() {
  try {
    const branch = core.getInput('branch');
    const from = core.getInput('from');
    core.debug(`Creating branch ${branch}`);
    await createBranch(GitHub, context, branch, from)
  } catch (error) {
    core.setFailed(error.message);
  }
}
run();
