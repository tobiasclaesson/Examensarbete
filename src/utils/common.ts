import { IAnswers, IOption, IPoll, IResult, IComment } from './types';

import schulze from 'schulze-method';

export function checkArrayForDuplicates(arr: IOption[]): boolean {
  const array: string[] = [];
  arr.forEach((a) => {
    array.push(a.title);
  });
  return new Set(array).size !== array.length;
}

export function runSchulzesMethod(poll: IPoll): IResult[] {
  type ConvertAnswerArrayType = Array<number[]>;
  const convertUserAnswers = (answers: IAnswers[]): ConvertAnswerArrayType => {
    const convertedAnswerArray: ConvertAnswerArrayType = [];
    let convertedAnswer: number[] = [];

    answers.forEach((ans) => {
      poll.options.forEach((opt, j) => {
        ans.rankingList.forEach((rl, k) => {
          if (rl === opt.title) {
            convertedAnswer.push(k);
          }
          if (k + 1 === poll.options.length && j + 1 === poll.options.length) {
            convertedAnswerArray.push(convertedAnswer);
            convertedAnswer = [];
          }
        });
      });
    });

    return convertedAnswerArray;
  };

  return schulze.run(poll.options.length, convertUserAnswers(poll.answers));
}

export function bubbleSortCommentsDescendingByDate(
  array: IComment[]
): IComment[] {
  let swap;
  let n = array.length - 1;
  const x = array;
  do {
    swap = false;
    for (let i = 0; i < n; i++) {
      if (x[i].date > x[i + 1].date) {
        const temp = x[i];
        x[i] = x[i + 1];
        x[i + 1] = temp;
        swap = true;
      }
    }
    n--;
  } while (swap);
  return x;
}
