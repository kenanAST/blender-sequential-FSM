const prompt = require('prompt-sync')();

blender_state = {
  isOn: false,
  speed: 0,
};

program_run = true;

commands = ['on', 'off', 'speed [X] // X is values (1 to 4)'];

const displayCommands = () => {
  console.log('Current Available Commands: ');
  commands.map((command, index) => {
    console.log(`${index + 1}: ${command}`);
  });
};

const displayBlenderState = () => {
  console.log('Blender State: ', blender_state);
};

const validateCommand = (command) => {
  //Speed: To make a command valid the blender should be turned on and it should have one argument. The argument should be (1to4)
  let preparatoryCommand = command.split(' ')[0];
  if (preparatoryCommand === 'speed') {
    speed = parseInt(command.split(' ')[1]);
    if (blender_state.isOn === false) {
      console.log('Blender is current turned off. Turn it on first');
      return false;
    }

    if (command.split(' ').length !== 2 || speed < 1 || speed > 4) {
      console.log('Invalid Command');
      console.log(`Proper Speed command: ${commands[2]}`);
      return false;
    }
  }

  if (preparatoryCommand == 'on') {
    if (blender_state.isOn === true) {
      console.log('Blender is already on.');
      return false;
    }
  }

  if (preparatoryCommand == 'off') {
    if (blender_state.isOn === false) {
      console.log('Blender is already off.');
      return false;
    }
  }
  return true;
};

displayCommands();

while (program_run) {
  displayBlenderState();
  let command = prompt('Command: ');

  //Checks if the command is valid
  if (!validateCommand(command)) {
    continue;
  }

  let preparatoryCommand = command.split(' ')[0];
  switch (preparatoryCommand) {
    case 'speed':
      speed = command.split(' ')[1];
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
    default:
      console.log('Invalid Command');
      break;
  }
}

console.log('Program Ended');