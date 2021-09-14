const core = require('@actions/core');
const github = require('@actions/github');
const format = require('date-fns/formatDistance');

async function run() {
  try {
    const github_token = core.getInput('GITHUB_TOKEN');
    const { context = {} } = github;
    const { pull_request } = context.payload;

    const createdAt = new Date(pull_request.created_at);
    const closedAt = new Date(pull_request.closed_at);
    const timeDifference = closedAt - createdAt;
    const time = formatDistance(0, timeDifference * 1000, { includeSeconds: true });
    const message = `This PR took ${time} to close`;

    const octokit = new github.GitHub(github_token);
    const new_comment = octokit.issues.createComment({
        ...context.repo,
        issue_number: pull_request.number,
        body: message
      });

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
