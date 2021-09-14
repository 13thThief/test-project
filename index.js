const core = require('@actions/core');
const github = require('@actions/github');
const formatDistance = require('date-fns/formatDistance');
const { Octokit } = require("@octokit/rest");

const { createActionAuth } = require("@octokit/auth-action");

async function run() {
  try {
    const auth = createActionAuth();
    const authentication = await auth();
    const github_token = core.getInput('GITHUB_TOKEN');
    const octokit = new Octokit({
      authStrategy: createActionAuth
    });
    const { context = {} } = github;
    const { pull_request } = context.payload;
    //console.log(context)

    const createdAt = new Date(pull_request.created_at);
    const closedAt = new Date(pull_request.closed_at);
    const timeDifference = closedAt - createdAt;
    const time = formatDistance(0, timeDifference, { includeSeconds: true });
    const message = `This PR took ${time} to close`;

    await octokit.rest.issues.createComment({
      owner: '13thThief',
      repo: 'test-project',
      issue_number: pull_request.number,
      body: message,
    });


    // const new_comment = octokit.issues.createComment({
    //     ...context.repo,
    //     issue_number: pull_request.number,
    //     body: message
    //   });

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

