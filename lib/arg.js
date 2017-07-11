function Arg(argName) {

  for (let i = 0, l = process.argv.length; i < l; i++) {

    let arg = process.argv[i];

    if (arg.indexOf(`--${argName}`) === 0) {

      let splitted = arg.split('=');

      if (splitted.length === 1) {
        throw new Error(`argument ${argName} must provide value`);
      }

      return splitted[1];

    }

  }

  throw new Error(`argument ${argName} must be passed`);

}

module.exports = Arg;
