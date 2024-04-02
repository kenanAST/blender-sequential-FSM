const blender_state = {
  isOn: false,
  speed: 0,
};

// Using spread operator to create a new object
const new_blender_state_spread = { ...blender_state };
new_blender_state_spread.isOn = true;

// Assigning reference to the same object
// const new_blender_state_reference = blender_state;
// new_blender_state_reference.speed = 2;
// new_blender_state_reference.isOn = true;

console.log(blender_state); // Output: { isOn: false, speed: 2 }
console.log(new_blender_state_spread); // Output: { isOn: false, speed: 2 }
