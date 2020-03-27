/**
 * Author : Awada
 */

const { spawn, spawnSync } = require("child_process");

let cmd = (cmdline, consolelog = true, exit = false) => {
  if (!cmdline || !cmdline.split) return Promise.reject("command line not valid, A ");
  return new Promise((resolve, reject) => {
    let cmdarray = cmdline.split(" ");
    let result = "";
    let error = "";
    let child = spawn(cmdarray.shift(), cmdarray, { shell: true, env: process.env });
    process.stdin.pipe(child.stdin);
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stderr.on("data", data => {
      if (consolelog) process.stdout.write(data.toString());
      error = data.toString();
    });
    child.stdout.on("data", data => {
      if (consolelog) process.stdout.write(data.toString());
      result = data.toString();
    });
    child.on("close", code => {
      code == 0 ? resolve(result) : reject(error);
      if (exit) process.exit(1);
    });
  });
};

let cmdSync = (scripts, log) => {
  if (log) console.log(scripts);
  if (!scripts || !scripts.split) return Promise.reject("command line not valid, S ");
  let cmdarray = scripts.split(" ");
  return spawnSync(cmdarray.shift(), cmdarray, {
    shell: true,
    stdio: "inherit",
    encoding: "utf-8",
    env: process.env
  });
};

module.exports = { cmd, cmdSync };
