
export class Person {
    constructor(params)
    {
        this.fullname=params.fullname;
        this.photo=params.photoUrl;
        this.birthday=params.birthDate;
    }
    get age() {
        let now= new Date();
        return now.getUTCFullYear()-this.birthday.getUTCFullYear();
    }
}


export class Student extends Person {
    constructor(params)
    {
        super(params);
        this.university=params.university;
        this.course=params.course;
    }
}

export class Teacher extends Person{
    constructor(params)
    {
        super(params)
        this.university=params.university;
        this.type=params.type;
    }
}

export class Factory
{
    constructor(){}
    /*create(who)
    {
        
        if(who.type=='Teacher')
            {
                let tmp= new Teacher(who);
                appendStudentBlock(tmp);
                return tmp;
            }
        else
        if(who.type=='Student')
        {
            let tmp= new Student(who);
            appendStudentBlock(tmp);
            return tmp;
        }
            else return new Person(who);
    }*/

    createStudent(student)
    {
        let tmp= new Student(student);
        //appendStudentBlock(tmp);
        return tmp;
    }

    createTeacher(teacher)
    {
        let tmp= new Teacher(teacher);
        //appendStudentBlock(tmp);
        return tmp;
    }

}