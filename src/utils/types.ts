export interface IPoll {
  title: string;
  options: string[];
  usersHaveVoted: number[];
  answers: IAnswers[];
}

export interface IAnswers {
  rankingList: string[];
}
