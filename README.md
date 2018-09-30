# Serverless Framework w/ TypeScript, Jest & Webpack + sane defaults.

This framework has been developed to provide a solid starting point for 'serverless' NodeJS projects. Big thanks to Postlight NY for inspiring this project with their [Serverless Babel Starter](https://github.com/postlight/serverless-babel-starter).

Note: Currently, this starter kit specifically targets AWS.

## Development

Creating and deploying a new function takes two steps, which you can see in action with this repo's default Hello World function (if you're already familiar with Serverless, you're probably familiar with these steps).

#### 1. Add your function to `serverless.yml`

In the functions section of [`./serverless.yml`](./serverless.yml), you have to add your new function like so:

```yaml
# Declare REST endpoints, or event (SNS,SQS,S3 etc.) handlers here.
functions:
  ping:
    handler: src/ping.default
    events:
      - http:
          path: ping
          method: get
      # Ping every 5 minutes to avoid cold starts
      - schedule:
          rate: rate(5 minutes)
          enabled: true
```

This is a single function declaration that creates a GET endpoint at `/ping`, which runs the default export from [`./src/ping.ts`](./src/ping.ts).

Event - `http` creates the an AWS API Gateway endpoint.
Event - `schedule` pings the function once every 5 minutes in order to prevent cold starts.


#### 2. Create your function

This starter kit's Hello World function is a ping/pong (which you will of course get rid of). Found at [`./src/ping.ts`](./src/ping.ts). There you can see a basic function that's intended to work in conjunction with API Gateway (i.e., it is web-accessible). 

Like most Serverless functions, the `ping` function accepts an: 
- event `Object`
- context `Object`
- callback `Function`

When your function is completed, you execute the callback with your response. (If you've never used Serverless, have a read through [their docs](https://serverless.com/framework/docs/).

---

You can develop and test your lambda functions locally in a few different ways.

### Live-reloading functions

To run the hello function with the event data defined in [`fixtures/event.json`](fixtures/event.json) (with live reloading), run:

```bash
yarn watch:hello
```

### API Gateway-like local dev server

To spin up a local dev server that will more closely match the API Gateway endpoint/experience:

```bash
yarn serve
```

### Adding new functions/files to Webpack

When you add a new function to your serverless config, you don't need to also add it as a new entry
for Webpack. The `serverless-webpack` plugin allows us to follow a simple convention in our `serverless.yml`
file which is uses to automatically resolve your function handlers to the appropriate file:

```yaml
functions:
  ping:
    handler: src/ping.default
```

As you can see, the path to the file with the function has to explicitly say where the handler
file is. (If your function weren't the default export of that file, you'd do something like:
`src/ping.notDefault` instead.)

### Run your Lambda functions 🔥

Lambda functions will go "cold" if they haven't been invoked for a certain period of time (estimates vary, and AWS doesn't offer a clear answer). From the [Serverless blog](https://serverless.com/blog/keep-your-lambdas-warm/):

> Cold start happens when you execute an inactive (cold) function for the first time. It occurs while your cloud provider provisions your selected runtime container and then runs your function. This process, referred to as cold start, will increase your execution time considerably.

A frequently running function won't have this problem, but you can keep your function running hot by scheduling a regular ping to your lambda function. Here's what that looks like in your `serverless.yml`:

```yaml
functions:
  ping:
    handler: src/ping.default
    events:
      # Ping every 5 minutes to avoid cold starts
      - schedule:
          rate: rate(5 minutes)
          enabled: true
```
Once you have configured the ping in your `serverless.yml` file; You can use the runWarm HOF to wrap your function.

```javascript
import runWarm from './utils'

const myFunc = (event, context, callback) => {
  // Your function logic
}

export default runWarm(myFunc)
```

## Deploy

Assuming you've already set up your default AWS credentials (or have set a different AWS profile via [the profile field](serverless.yml#L25)):

```bash
sls deploy --stage $STAGE --service $SERVICE
```

After you've deployed, the output of the deploy script will give you the API endpoint
for your deployed function(s), so you should be able to test the deployed API via that URL.
