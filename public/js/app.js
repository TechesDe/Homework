//Вопросы отмечены знаком вопроса(?)
//Правильно понял отмечены реторическим вопросом (?!) - да или не так
//Для удобства встроены цифры после вопросов

class component
{
    constructor(params)
    {
        this.params=params;//Содержит параметры собираемого объекта
        this.component=document.createElement('div');//Содержит то что нужно разместить?!   1
    }
    //Т.е. его надо переписывать... исользование super() приведет к завершению или всетаки код потомка продолжит работу?    2
    /**Видоизменяемый */
    render()
    {
        return `<div></div>`
    }
    //Он ведь вертуальный (не описан в родителе но может быть описан в потомке)?!   3
    /**Вертуальный*/
    beforemount(){}
    mount(place,target)//place -до после, где-то внутри; target - компонент с которым взаимодействую;?! 4
    {
        this.beforemount();
        this.component.innerHTML=this.render();//Чем заменить innerHTML?    5
        target.insertAdjacentElement(place,this.component);
        this.aftermount();
    }
    /**Вертуальный*/
    aftermount(){}
    /**Вертуальный*/
    beforedestroy(){}
    destroy()
    {
        this.component.remove();
    }
    /**Вертуальный*/
    afterdestroy(){}
}

class Student extends component
{
    constructor(params)
    {
        super(params);
        this.type="student";
        this.img=params.img;//Теперь поля потомка this.img==this.params.img, вожно ли как-то в params занести все которые не будут использованы потомком?   6
        this.fullname=params.fullname || (params.lastname)?(params.name+" "+params.lastname):params.name || "no name";
    }

    render()
    {
        return`<div>
            <img class="card__img_round" src="${this.img}">
            <p>Студень ${this.fullname}</p>
        </div>`
    }
}

const test=new Student({
    name:"Alexsandr",
    lastname: "Navar",
    img:'/img/ava01.jpg'
});
test.mount('beforeend',document.body);
//test.destroy();