
class Person {
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


class Student extends Person {
    constructor(params)
    {
        super(params);
        this.university=params.university;
        this.course=params.course;
    }
}

class Teacher extends Person{
    constructor(params)
    {
        super(params)
        this.university=params.university;
        this.type=params.type;
    }
}

class Factory
{
    constructor(){}
    create(who)
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
    }
}

class School {
    constructor()
    {
        this.list=[];
        this.counter=0;
        this.factory=new Factory;
    }
    createmember(params)
    {
        this.list[this.counter]=this.factory.create(params);
        this.counter++;
    }
    deletemember(element)//удаление по номеру
    {
        if(!isNaN(element))
            this.list.splice(element,1);
        else
            alert('Element not found');
    }
    find(name)
    {
        this.list.forEach((item)=>{
            if (item.fullname=name)
                    return item;
        });
    }
}


function onClick(element,targ)
{
    //Create cross
    let cross=document.createElement('div');
    cross.setAttribute('class','js-crosscd');
    let txt=document.createTextNode('\u2716');
    cross.append(txt);
    //create info
    let name=document.createElement('h2');
    name.append(element.fullname);
    let brstinfo=document.createElement('p');
    brstinfo.append(`День рождения: ${element.birthday.getUTCDate()}.${element.birthday.getUTCMonth()}.${element.birthday.getUTCFullYear()},${element.age} лет`)
    let edu=document.createElement('p');
    edu.append(`Учится\t${element.university}, ${element.course} Курс`);
    let div2=document.createElement('div');
    div2.appendChild(cross);
    div2.appendChild(name);
    div2.appendChild(brstinfo);
    div2.appendChild(edu);
    //Create IMG
    let img = new Image();
    img.src=element.photo;
    img.setAttribute('id','cartimg')
    //construct card
    let div=document.createElement('div');
    div.setAttribute('class','carto4ka');
    //div childs
    div.appendChild(div2);
    div.appendChild(img);
    div.addEventListener('click',(event) => {
    if(event.target.classList.contains('js-crosscd'))
        {
            event.currentTarget.remove();
        }
    });
    //Insert
    targ.currentTarget.appendChild(div);
}


function appendStudentBlock(student)
{
    let img = new Image();
    img.src=student.photo;
    let name=document.createElement('p')
    name.append(student.fullname);
    let kyrs=document.createElement('p')
    kyrs.append(`${student.university} ${student.course}`);
    kyrs.setAttribute('id','sheer');
    let div=document.createElement('div');
    div.appendChild(img);
    div.appendChild(name);
    div.appendChild(kyrs);
    div.setAttribute('class','Banner');
    document.getElementById('Users').append(div);
    div.addEventListener('click',(event) => {
        //Как сделать срабатывание по нажатии только на Banner без всех элементов внутри carto4ka 
        //alert(event.currentTarget.classList);
        //if(event.currentTarget.classList.contains('carto4ka')==false)
            onClick(student,event)
    });
}

function init(){
    const studentArr= [
        {
            fullname: 'Маша Иванова',
            university: 'УГАТУ',
            course: 2,
            birthDate: new Date(2000,1,2),
            photoUrl:'/images/ava01.jpg',
            type:'Student'
        },
        {
            fullname: 'Павел',
            university: 'ПТУ',
            course: 1,
            birthDate: new Date(2000,3,7),
            photoUrl:'/images/ava02.jpg',
            type:'Student'
        },
        {
            fullname: 'Кирилл',
            university: 'КГТУ',
            course: 5,
            birthDate: new Date(2000,6,5),
            photoUrl:'/images/ava03.jpg',
            type:'Student'
        }
        ]
    var school= new School();
    studentArr.forEach((item)=>{
        
        school.createmember(item);
        
    });
}