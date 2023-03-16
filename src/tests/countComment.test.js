import countComments from "../modules/countComments.js";

describe('number of comments', ()=>{
    

    test ('Test if the number of comments are three', ()=>{
        const CommentsArray1= [{"comment":"Movie You should watch","creation_date":"2023-03-15","username":"Nafees"},{"comment":"Like it","creation_date":"2023-03-16","username":"Martin"},{"comment":"Nice movie","creation_date":"2023-03-16","username":"Shafi"}];
        expect (countComments(CommentsArray1)).toBe(3);
    });
    test ('Test if there are no comments', ()=>{
        const CommentsArray2= [];
        expect (countComments(CommentsArray2)).toBe(0);
    });
});