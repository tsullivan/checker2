/*
 * This program was written by Tim Sullivan
 */

import { firstValueFrom } from 'rxjs';
import { FormDriver } from './form';
import { GameState } from './state';
import { getNewQuestions } from './get_questions';

if ('content' in document.createElement('template')) {
  document.addEventListener('DOMContentLoaded', main)
} else {
  window.alert('Sorry, this browser is not supported.');
}


async function main() {
  const form = new FormDriver();
  form.clear();

  const state = new GameState();

  // Ask their name
  state.name = await firstValueFrom(form.askName());

  // Say hello
  form.clear();
  form.addHello(state.name, state.startTime);

  // Make some questions
  [ state.gameAnswers, state.questions ] = getNewQuestions(46);
  form.showNewQuestions(state.questions, 46);

  form.addSave();

  // Let them save
  //
  // Clear the screen
  //
  // Show their answers
  //
  // Let them save again (double check)
  //
  // Show a scorecard with their name

  // Remove saved data from sessionStorage
  //sessionStorage.removeItem('key');

  // Remove all saved data from sessionStorage
  //sessionStorage.clear();
}
