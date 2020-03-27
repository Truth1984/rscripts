var { TaskLanguage } = require("tasklanguage");
var R = require("../");
let r = new R({ silence: true });

let task = new TaskLanguage(false);
let quick = env => {
  process.env.renv = env;
  return r.exec(__dirname + "/test.r");
};
let testing = (env, result, reject) => () => quick(env).then(data => (data == result ? true : Promise.reject(reject)));

task.ADDCommand(
  task.MARK("output test"),
  testing("v1", "[1] 14\n", "output not match"),
  task.MARK("result test"),
  testing("v2", "[1] 25\n", "result not match"),
  task.MARK("cat test"),
  testing("v3", "25", "cat not match"),
  task.MARK("json test"),
  () => quick("v4").then(data => (JSON.parse(data)[0].foo == 12 ? true : Promise.reject("json not match"))),
  task.MARK("argument test"),
  () => {
    process.env.renv = "v5";
    return new R({ silence: true })
      .exec(__dirname + "/test.r", "!@#$%^&*", "()_+`~'")
      .then(data => (data == '!@#$%^&* ()_+`~"' ? true : Promise.reject("argument not matches")));
  }
);

task
  .RUN()
  .then(() => console.log("all tests passed"))
  .catch(e => console.log(e));
