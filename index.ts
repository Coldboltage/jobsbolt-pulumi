import * as pulumi from '@pulumi/pulumi';

const stack = pulumi.getStack();
if (stack === 'local') {
  console.log("fired local")
  require('./env/local/testing/index');
} else if (stack === 'dev') {
  console.log("fired dev")
  require('./env/dev/index');
} else {
  throw new Error(`Unknown stack: ${stack}`);
}