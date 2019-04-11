import { IToast, IUser } from "../interfaces/form.interface";

export const initUserList: IUser[] = [
  {
    id: 1,
    name: "Garry",
    occupation: "Software Engineer"
  },
  {
    id: 2,
    name: "Isabel",
    occupation: "Everything Person"
  },
  {
    id: 3,
    name: "John",
    occupation: "Salesman"
  },
  {
    id: 4,
    name: "Efi",
    occupation: "Insurance"
  },
  {
    id: 5,
    name: "Oliver",
    occupation: "Miau"
  }
];

export const toastDefault: IToast = {
  showToast: false,
  type: ""
};

export const languages: object = {
  en: {
    name: "English"
  },
  es: {
    name: "Español"
  }
};

export const views: object = {
  posts: {
    link: "/posts",
    name: "Posts"
  },
  users: {
    link: "/",
    name: "Users"
  }
};
