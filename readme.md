[![N|Solid](https://github.com/satya-500/create-branch-from-tag/blob/master/iamnight.gif)](https://500apps.com)
# Create Branch From TAG GitHub Action

This action creates a new branch from a specific tag.

## Inputs

### `branch`

**Optional** The name of the branch to create. Default `"release-candidate"`.

### `from`

**Required** 
The name of the tag/branch from which new branch will be created.

tag should be prefix with tags/your-tag.

branch you can provide directly.

## Example usage

create branch from tag
```
- name: creating rc branch
  uses: satya-500/create-branch@v1.0
  env:
   GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  with:
   branch: release
   tag: tags/v0.0.7
```

create branch from specific ref (branch)
```
- name: creating rc branch
  uses: satya-500/create-branch@v1.0
  env:
   GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  with:
   branch: release
   tag: test
```
