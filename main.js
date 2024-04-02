const prompt = require('prompt-sync')();

const displayCommands = (commands) => {
  console.log('Current Available Commands: ');
  commands.map((command, index) => {
    console.log(`${index + 1}: ${command}`);
  });
};

const displayBlenderState = (blender_state) => {
  console.log('Blender State: ', blender_state);
};

const validateSpeedCommand = (command, blender_state, commands) => {
  const speed = parseInt(command.split(' ')[1]);
  if (blender_state.isOn === false) {
    console.log('Blender is current turned off. Turn it on first');
    return false;
  }

  if (command.split(' ').length !== 2 || speed < 1 || speed > 4) {
    console.log('Invalid Command');
    console.log(`Proper Speed command: ${commands[2]}`);
    return false;
  }
  return true;
};

const validateOnCommand = (blender_state) => {
  if (blender_state.isOn) {
    console.log('Blender is already on.');
    return false;
  }
  return true;
};

const validateOffCommand = (blender_state) => {
  if (!blender_state.isOn) {
    console.log('Blender is already off.');
    return false;
  }
  return true;
};

const validateQuitCommand = (command) => {
  return command.split(' ').length !== 1 ? false : true;
};

const validateCommand = (command, blender_state, commands) => {
  //Speed: To make a command valid the blender should be turned on and it should have one argument. The argument should be (1to4)
  let preparatoryCommand = command.split(' ')[0];
  let isCommandValid = false;

  switch (preparatoryCommand) {
    case 'speed':
      isCommandValid = validateSpeedCommand(command, blender_state, commands);
      break;
    case 'on':
      isCommandValid = validateOnCommand(blender_state);
      break;
    case 'off':
      isCommandValid = validateOffCommand(blender_state);
      break;
    case 'quit':
      isCommandValid = validateQuitCommand(command);
      break;
    default:
      console.log('Command Invalid');
  }
  return isCommandValid;
};

const updateState = (command, blender_state) => {
  let preparatoryCommand = command.split(' ')[0];
  switch (preparatoryCommand) {
    case 'speed':
      const speed = command.split(' ')[1];
      blender_state.speed = parseInt(speed);
      break;
    case 'on':
      blender_state.isOn = true;
      blender_state.speed = 1;
      break;
    case 'off':
      blender_state.isOn = false;
      blender_state.speed = 0;
      break;
    case 'quit':
      blender_state.isOn = false;
      blender_state.speed = 0;
      break;
    default:
      console.log('Invalid Command');
      break;
  }
};

const isQuitProgram = (command) => {
  return command === 'quit' ? false : true;
};

const main = () => {
  const blender_state = {
    isOn: false,
    speed: 0,
  };

  let program_run = true;

  const commands = ['on', 'off', 'speed [X] // X is values (1 to 4)', 'quit'];

  displayCommands(commands);

  while (program_run) {
    displayBlenderState(blender_state);
    let command = prompt('Command: ');

    //Checks if the command is valid
    if (validateCommand(command, blender_state, commands)) {
      program_run = isQuitProgram(command);
      updateState(command, blender_state);
    }
  }

  console.log('Program Ended');
};

main();
