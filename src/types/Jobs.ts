
export interface Errorpage{
    error:Error;
}

export interface SearchJobs{
    searchParams :{
        job? : string;
        location? : string
    }
}

export interface Jobs{
    id:number;
    title:string;
    description :string;
    location:string;
    salary:number;
    type:string;
    created_at:string;
}