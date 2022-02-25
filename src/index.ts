/*
 * This program was written by Tim Sullivan
 */

import { firstValueFrom, Observable, fromEvent } from 'rxjs';
import { first, map } from 'rxjs/operators'

if ('content' in document.createElement('template')) {
  document.addEventListener('DOMContentLoaded', main)
} else {
  window.alert('Sorry, this browser is not supported.');
}

class FormDriver {
  private cardsBody: Element;
  private cardItemTemplate: HTMLTemplateElement;
  private helloTemplate: HTMLTemplateElement;

  constructor() {
    this.cardsBody = document.querySelector('.cards')!;
    this.cardItemTemplate = document.querySelector('#cardItemTemplate')!;
    this.helloTemplate = document.querySelector('#helloTemplate')!;
  }

  public clear() {
    this.cardsBody.innerHTML = '';
  }

  public askName(): Observable<string> {
    const clone = this.cardItemTemplate.content.cloneNode(true) as ParentNode;
    const [ question, answer, submit ] = Array.from(clone.querySelectorAll('p')!);
    question.textContent = 'Question 1: What is your name?';

    const button = document.createElement('input');
    button.type = 'submit';
    button.value = 'Go';
    submit.appendChild(button);

    this.cardsBody.appendChild(clone);

    return fromEvent(submit.querySelector('input')!, 'click').pipe(first(), map(() => {
      const name = answer.querySelector('input')?.value || 'unknown';
      return name;
    }));
  }

  public addHello(name: string): void {
    const clone = this.helloTemplate.content.cloneNode(true) as ParentNode;
    const p = clone.querySelector('p')!;
    p.innerText = `Hello, ${name}!`;
    this.cardsBody.append(clone);
  }

  public showNewQuestions(questions: Array<[number, string, number]>) {
    // show 45 questions
    const iterator = new Array(45);
    for (let i = 0; i < iterator.length; i++) {
      const clone = this.cardItemTemplate.content.cloneNode(true) as ParentNode;
      const [ question ] = Array.from(clone.querySelectorAll('p')!);
      const [ first, operator, last ] = questions[i];
      question.textContent = `${first} ${operator} ${last}`;
      this.cardsBody.appendChild(clone);
    }
  }
}

class GameState {
  private _name?: string;
  private _questions?: Array<[number, string, number]>;
  private _gameAnswers?: number[];

  public set name(name: string) {
    this._name = name;
  }

  public get name() {
    if (!this._name) {
      throw new Error('name is not set');
    }
    return this._name;
  }

  public set questions(questions: Array<[number, string, number]>) {
    this._questions = questions;
  }

  public get questions() {
    if (!this._questions) {
      throw new Error('questions are not set');
    }
    return this._questions;
  }

  public set gameAnswers(gameAnswers: number[]) {
    this._gameAnswers = gameAnswers;
  }

  public get gameAnswers() {
    if (!this._gameAnswers) {
      throw new Error('gameAnswers are not set');
    }
    return this._gameAnswers;
  }
}

async function main() {
  const form = new FormDriver();
  form.clear();

  const state = new GameState();

  // Ask their name
  state.name = await firstValueFrom(form.askName());

  // Say hello
  form.clear();
  form.addHello(state.name);

  // Make some questions
  [ state.gameAnswers, state.questions ] = getNewQuestions();
  form.showNewQuestions(state.questions);

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

function getNewQuestions(): [number[], Array<[number, string, number]>] {
  const questions: Array<[number, string, number]> = [
    [5, '*', 8],
    [5, '/', 8],
    [5, '+', 8],
    [5, '-', 8],
    [5, '*', 9],
    [5, '*', 8],
    [5, '/', 8],
    [5, '+', 8],
    [5, '-', 8],
    [5, '*', 9],
    [5, '*', 8],
    [5, '/', 8],
    [5, '+', 8],
    [5, '-', 8],
    [5, '*', 9],
    [5, '*', 8],
    [5, '/', 8],
    [5, '+', 8],
    [5, '-', 8],
    [5, '*', 9],
    [5, '*', 8],
    [5, '/', 8],
    [5, '+', 8],
    [5, '-', 8],
    [5, '*', 9],
    [5, '*', 8],
    [5, '/', 8],
    [5, '+', 8],
    [5, '-', 8],
    [5, '*', 9],
    [5, '*', 8],
    [5, '/', 8],
    [5, '+', 8],
    [5, '-', 8],
    [5, '*', 9],
    [5, '*', 8],
    [5, '/', 8],
    [5, '+', 8],
    [5, '-', 8],
    [5, '*', 9],
    [5, '*', 8],
    [5, '/', 8],
    [5, '+', 8],
    [5, '-', 8],
    [5, '*', 9],
  ];

  const answers = [
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
  ];

  return [answers, questions];
}
