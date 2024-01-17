export interface comment{
id:string;
content:string;
likes:number;
dislikes:number;

blogId:string;
userId:string;
creationDate:string;
author: {
  
    id: string;
    userName: string;
  };
}