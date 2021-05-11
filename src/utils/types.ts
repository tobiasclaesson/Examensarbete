export interface IPoll {
  id?: string;
  title: string;
  options: IOption[];
  usersHaveVoted: string[];
  //answers: string[];
  answers: IAnswers[];
}

export interface IOption {
  id?: string;
  title: string;
}

export interface IAnswers {
  rankingList: string[];
}
