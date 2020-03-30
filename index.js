const { cmd } = require("./_cmd");

module.exports = class R {
  /**
   *
   * @param {{silence:false}} option
   */
  constructor(option = {}) {
    let defaultOption = { silence: false };
    this.option = Object.assign(defaultOption, option);
    this._args = `Rscript --vanilla `;
  }

  /**
   *
   * @param {String} path
   * @param  {...String} args will pass args into command line, so stringify it first
   */
  exec(path, ...args) {
    args = args.map(value => value.toString().replace("'", '"')).join("' '");
    args = " '" + args.toString() + "'";
    return cmd(this._args + path + args, !this.option.silence);
  }
};
