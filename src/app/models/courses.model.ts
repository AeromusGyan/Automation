export interface Courses{
    cId:number,
    course_type:string,
    course_name: string,
    start_date: string,
    end_date: string,
    month:string,
    start_time: string,
    end_time:string,
    contact_session_timing:string,
    no_of_slots:string,
    venue:string,
    location:string;
    course_mode:string,
    registration_link:string,
    status:boolean,
    educator:{
        id:number,
        educator_name:string
    },
}