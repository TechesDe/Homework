//Вопросы устарели или уже отвечены, не удалил боюсь запутаться и удалить то что хочу оставить
export class Sch
{
    constructor()
    {
        this.list=[];
        //this.factory=new Factory();
    }
    add(member)
    {
        this.list.push(member);
    }
    createmember(params)
    {
        this.list.push(this.factory.create(params));
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
    appendStudentBlock(student, doom)
    {
        let img = new Image();
        img.src=student.photo;
        let name=document.createElement('p')
        name.append(student.fullname);
        let kyrs=document.createElement('p')
        kyrs.append(`${student.university} ${student.course}`);
        kyrs.setAttribute('id','sheer');
        let div=document.createElement('div');
        if(student.photo)
            div.appendChild(img);
        if(student.fullname)
            div.appendChild(name);
        if(student.university)
            div.appendChild(kyrs);
        div.setAttribute('class','Banner');
        doom.append(div);
        div.addEventListener('click',(event) => {
            //Как сделать срабатывание по нажатии только на Banner без всех элементов внутри carto4ka 
            //alert(event.currentTarget.classList);
            //if(event.currentTarget.classList.contains('carto4ka')==false)
        this.onClick(student,event)
        });
    }

    onClick(element,targ)
    {
        //Create cross
        let cross=document.createElement('div');
        cross.setAttribute('class','js-crosscd');
        let txt=document.createTextNode('\u2716');
        cross.append(txt);
        //create info
        let div2=document.createElement('div')
        let name=document.createElement('h2');
        name.append(element.fullname);
        if(element.birthday)
        {
            let brstinfo=document.createElement('p');
            brstinfo.append(`День рождения: ${element.birthday.getUTCDate()}.${element.birthday.getUTCMonth()}.${element.birthday.getUTCFullYear()},${element.age} лет`);
            div2.appendChild(brstinfo);
        }
        let edu=document.createElement('p');
        edu.append(`Учится\t${element.university}, ${element.course} Курс`);
        div2.appendChild(cross);
        if(element.fullname)
            div2.appendChild(name);
            
        if(element.university)
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
        if(element.photo)
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
    
    appendToDom(doom)
    {
        this.list.forEach((item)=>{
            this.appendStudentBlock(item,doom);
        })
    }

}