export interface IPoll {
  id?: string;
  title: string;
  options: IOption[];
  usersHaveVoted: number[];
  answers: IAnswers[];
}

export interface IOption {
  id?: string;
  title: string;
}

export interface IAnswers {
  rankingList: string[];
}
