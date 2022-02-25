/*
 * This program was written by Tim Sullivan
 */

import { Observable, fromEvent } from 'rxjs';
import { first, map } from 'rxjs/operators'
import { QuestionFormat } from './get_questions';

export class FormDriver {
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
    answer.querySelector('input')?.focus();

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

  public showNewQuestions(questions: Array<QuestionFormat>, size: number) {
    // show 45 questions
    for (let i = 0; i < size; i++) {
      const clone = this.cardItemTemplate.content.cloneNode(true) as ParentNode;
      const [ question ] = Array.from(clone.querySelectorAll('p')!);
      const [ first, operator, last ] = questions[i];
      question.textContent = `${first} ${operator} ${last}`;
      this.cardsBody.appendChild(clone);
    }
  }
}
