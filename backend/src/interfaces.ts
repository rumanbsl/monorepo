export interface Ipost {
  id: string;
  title: string;
  imageUrl: string;
  catagories: string[];
  description: string;
  createdDate: string;
  likes: number;
  createdBy: string;
  messages: Array<Imessage["id"]>;
}
export interface Iuser {
  id: string;
  userName: string;
  email: string;
  password: string;
  avatar: string;
  joinDate: string;
  favourites: Array<Iuser["id"]>;
}
export interface Imessage {
  id: string;
  messageBody: string;
  messageDate: string;
  messageUser: string;
}
