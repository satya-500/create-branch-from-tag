[![N|Solid](https://github.com/agilecrm/infinity-crawler/blob/master/iamnight.gif)](https://500apps.com)
# Create Branch From TAG GitHub Action

This action creates a new branch from a specific tag.

## Inputs

### `branch`

**Optional** The name of the branch to create. Default `"release-candidate"`.

### `from_tag`

**Required** The name of the tag from which new branch will be created.

## Example usage

```
- name: creating rc branch
	uses: satya-500/create-branch@v1.0
	env:
	  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
	with:
	  branch: release
	  from_tag: ${{ github.event.inputs.version }}
```
