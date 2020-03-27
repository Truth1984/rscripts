# rscripts

Simple connector between nodejs and R

## prerequisite

```bash
node -v # recommanded version > 10
Rscript --version # Rscript command exist in PATH
```

## Notice

#### - The result of `exec` is the final output of R, mass `print` / `cat` / ... or other logging methods at the same time may clog the message pipe, thus better use `Sys.sleep()` before output the final result

#### - exec(path, ...args): the proper way to pass data between application is through `process.env`, passing data through `...args` is highly UNRECOMMANDED, because it will transfer data through command line, and the program will sanitize the input first for security reasons, but such method destroys the data integrity, i.e. the program is going to replace `'` with `"`

## example

#### JS:

```js
const R = require("rscripts");
var r = new R({ silence: false });
process.env.renv = "1"; # env can only be string
r.exec("test.r")
  .then(console.log)
  .catch(console.log);
process.env.renv = "2";
r.exec("test.r")
  .then(console.log)
  .catch(console.log);
process.env.renv = "3"
r.exec("test.r","passing","data",100, "unrecommanded")
```

#### R:

```R
if (Sys.getenv("renv") == "1") cat(Sys.getenv("renv"));
if (Sys.getenv("renv") == "2") {
  print(10);
  print(20);
  Sys.sleep(1); # nessasary method, prevent pipe clogging
  cat(30);
}
if(Sys.getenv("renv") == 3) {
  args <- commandArgs(TRUE);
  cat(args);
}
```

### option

    new R({silence: false})

silence: silence `print` / `cat` ... globally.
