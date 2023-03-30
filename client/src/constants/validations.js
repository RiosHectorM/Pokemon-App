export default function validations(input) {
  let error = {};
  let RegExpString = /^[a-zA-Z\s]*$/;
  let RegExpNumber = /^([0-9])*$/;

  //Validations of Name Imput
  if (!input.name) {
    error.name = 'A name is required';
  }
  if (!RegExpString.test(input.name)) {
    error.name = 'No Numbers or Special Characters';
  }
  if (input.name.length > 16) {
    error.name = `16 Characters Maximum`;
  }

  //Validations of Weight Imput
  if (!RegExpNumber.test(input.weight)) {
    error.weight = 'Only numbers please';
  }
  if (input.weight < 1 || input.weight > 1000) {
    if (input.weight < 1) {
      error.weight = 'Must be higher than 1gr';
    }
    if (input.weight > 1000) {
      error.weight = 'Must be less than 1000gr';
    }
  }

  //Validations of Height Imput
  if (!RegExpNumber.test(input.height)) {
    error.height = 'Only numbers please';
  }
  if (input.height < 1 || input.height > 50) {
    if (input.height < 1) {
      error.height = 'Must be higher than 1dm';
    }
    if (input.height > 50) {
      error.height = 'Must be less than 50dm';
    }
  }

  //Validations of HP Imput
  if (!RegExpNumber.test(input.hp)) {
    error.hp = 'Only numbers please';
  }
  if (input.hp < 1 || input.hp > 150) {
    if (input.hp < 1) {
      error.hp = 'Must be higher than 1';
    }
    if (input.hp > 150) {
      error.hp = 'Must be less than 150';
    }
  }

  //Validations of Attack Imput
  if (!RegExpNumber.test(input.attack)) {
    error.attack = 'Only numbers please';
  }
  if (input.attack < 1 || input.attack > 150) {
    if (input.attack < 1) {
      error.attack = 'Must be higher than 1';
    }
    if (input.attack > 150) {
      error.attack = 'Must be less than 150';
    }
  }

  //Validations of Defense Imput
  if (!RegExpNumber.test(input.defense)) {
    error.defense = 'Only numbers please';
  }
  if (input.defense < 1 || input.defense > 150) {
    if (input.defense < 1) {
      error.defense = 'Must be higher than 1';
    }
    if (input.defense > 150) {
      error.defense = 'Must be less than 150';
    }
  }

  //Validations of Speed Imput
  if (!RegExpNumber.test(input.speed)) {
    error.speed = 'Only numbers please';
  }
  if (input.speed < 1 || input.speed > 150) {
    if (input.speed < 1) {
      error.speed = 'Must be higher than 1';
    }
    if (input.speed > 150) {
      error.speed = 'Must be less than 150';
    }
  }

  //Validations of Types Imput
  if (!input.types.length) {
    error.types = 'Choose at least one type';
  }
  if (input.types.length > 2) {
    error.types = `only two Types at most`;
  }

  //retorno del objeto error
  return error;
}
