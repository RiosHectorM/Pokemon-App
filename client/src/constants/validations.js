export default function validations(input) {
  let error = {};
  let RegExpString = /^[a-zA-Z\s]*$/;

  if (!input.name) {
    error.name = 'A name is required';
  }
  if (!RegExpString.test(input.name)) {
    error.name = 'Numbers or special characters are not allowed';
  }
  if (input.name.length > 18) {
    error.name = `The name can't be longer than 18 characters`;
  }

  if (input.hp < 1 || input.hp > 150) {
    if (input.hp < 1) {
      error.hp = 'The life of the Pokemon must be higher than 1';
    }
    if (input.hp > 150) {
      error.hp = 'The life of the Pokemon must be less than 150';
    }
  }
  if (input.attack < 1 || input.attack > 200) {
    if (input.attack < 1) {
      error.attack = 'The attack of the Pokemon must be higher than 1';
    }
    if (input.attack > 200) {
      error.attack = 'The attack of the Pokemon must be less than 200';
    }
  }
  if (input.defense < 1 || input.defense > 200) {
    if (input.defense < 1) {
      error.defense = 'The defense of the Pokemon must be higher than 1';
    }
    if (input.defense > 200) {
      error.defense = 'The defense of the Pokemon must be less than 200';
    }
  }
  if (input.speed < 1 || input.speed > 100) {
    if (input.speed < 1) {
      error.speed = 'The speed of the Pokemon must be higher than 1';
    }
    if (input.speed > 100) {
      error.speed = 'The speed of the Pokemon must be less than 100';
    }
  }
  if (input.weight < 1 || input.weight > 1500) {
    if (input.weight < 1) {
      error.weight = 'The weight of the Pokemon must be higher than 1';
    }
    if (input.weight > 1500) {
      error.weight = 'The weight of the Pokemon must be less than 1500';
    }
  }
  if (input.height < 1 || input.height > 80) {
    if (input.height < 1) {
      error.height = 'The height of the Pokemon must be higher than 1 dam';
    }
    if (input.height > 80) {
      error.height = 'The height of the Pokemon must be less than 80 dam';
    }
  }

  if (!input.types.length) {
    error.types = 'Must choose a pokemon type';
  }
  if (input.types.length > 2) {
    error.types = `You can't choose more than 2 types per Pokemon`;
  }

  return error;
}
