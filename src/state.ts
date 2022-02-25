/*
 * This program was written by Tim Sullivan
 */

import { QuestionFormat } from './get_questions';

export class GameState {
  private _name?: string;
  private _questions?: Array<QuestionFormat>;
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

  public set questions(questions: Array<QuestionFormat>) {
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
