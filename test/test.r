env <- Sys.getenv("renv");

if (env == "v1") {
  print(12)
  print(13)
  Sys.sleep(1)
  print(14)
}

if (env == "v2") 12 + 13

if (env == "v3") cat(12 + 13)

if (env == "v4") cat('[{"foo":12}]') # mimic json output

if (env == "v5") {
  args <- commandArgs(trailingOnly = TRUE)
  cat(c(args))
}