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
  name: string;
  comment: string;
  rankingList: string[];
  date: Date;
}

export interface IResult {
  indexes: number[];
  place: number;
}

export interface IComment {
  author: string;
  text: string;
  date: Date;
}
