import * as core from '@actions/core';
import { GitHub, context} from '@actions/github'
import { createBranch } from './create-branch';

async function run() {
  try {
    const branch = core.getInput('branch');
    const from_tag = core.getInput('from_tag');
    core.debug(`Creating branch ${branch}`);
    await createBranch(GitHub, context, branch, from_tag)
  } catch (error) {
    core.setFailed(error.message);
  }
}
run();
