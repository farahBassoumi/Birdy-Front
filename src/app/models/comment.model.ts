export interface comment{
Id:string;
content:string;
likes:number;
dislikes:number;

blogId:string;
userId:string;
date:string;
author: {
  
    id: string;
    userName: string;
  };
}