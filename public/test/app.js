//Вопросы отмечены знаком вопроса(?)
//Правильно понял отмечены реторическим вопросом (?!) - да или не так
//Для удобства встроены цифры после вопросов





export class component
{
    constructor(params)
    {
        this.params=params;//Содержит параметры собираемого объекта
        this.component=document.createElement('div');
    }
    /**Видоизменяемый */
    render()
    {
        return `<div></div>`
    }
    /**Вертуальный*/
    beforemount(){}
    mount(place,target)
    {
        this.beforemount();
        this.component.innerHTML=this.render();
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

export class Student extends component
{
    constructor(params)
    {
        super(params);
        this.type="student";
        this.img="/"+params.photo;
        this.fullname=params.fullname || (params.lastname)?(params.name+" "+params.lastname):params.name ||params.title|| "no name";
    }

    render()
    {
        return`<div class="card_person">
            <img class="card__img" src="${this.img}">
            <p>Студень ${this.fullname}</p>
        </div>`
    }
}

const test=new Student({
    name:"Alexsandr",
    lastname: "Navar",
    photo:'img/ava01.jpg'
});
test.mount('beforeend',document.body);
//test.destroy();