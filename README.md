# Microlith Template

> wth is a microlith?
>
> -- <cite>Marty McFly</cite>

[The Majestic Monolith](https://m.signalvnoise.com/the-majestic-monolith/) built
with IaC using serverless cloud services.

## Install

```sh
brew bundle --no-lock
nodenv install -s
yarn install
```

## Prepare

Initial infra/stack deployment (inits `samconfig.toml`):

```sh
sam build
sam deploy --guided
```

(Initial deployment can take up to 20 minutes due to CloudFront distribution.)

Add outputs to `.env.(dev.local|staging|prod)` (select accordingly):

```sh
AWS_REGION=<value>
AWS_DISTRIBUTION_ID=<CfDistributionId>
AWS_WEBSITE_BUCKET_NAME=<WebsiteBucketName>
```

where values, `CfDistributionId`, and `WebsiteBucketName`, can be queried by substituting the `OutputKey` value below:

```sh
aws cloudformation describe-stacks --stack-name <value> --query "Stacks[0].Outputs[?OutputKey=='...'].OutputValue" --output text
```

## Deploy

```sh
# `ENV` represents your deployment stage (typically, `dev`, `staging` or `prod`).
ENV=<value> yarn run-s build deploy
```
