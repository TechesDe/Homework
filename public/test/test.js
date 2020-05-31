import {component, Student} from "../test/app.js";
describe("Тестим component", function() {
   'use strict';
    it('Рендерим', function() {
        // arrange
        

        // act
        let comp=new component({});

        //assert
        assert.equal(comp.render(), '<div></div>');
    })
    it('Монтируем', function() {
        // arrange
        let comp=new component({});
        let elem=document.createElement('div');
        // act
        comp.mount('beforeend',elem);

        //assert
        assert.equal(elem.innerHTML, '<div><div></div></div>');
    })
    it('Уничтожаем', function() {
        // arrange
        let comp=new component({});
        let elem=document.createElement('div');
        comp.mount('beforeend',elem);

        // act
        comp.destroy();
        //assert
        assert.equal(elem.innerHTML, '');
    })
    describe("Тестим Student", function() {
        it('Рундерим Студента', function() {
            // arrange
            
    
            // act
            let stud=new Student({});
    
            //assert
            assert.equal(stud.render(),  `<div class="card_person">
            <img class="card__img" src="/undefined">
            <p>Студень no name</p>
        </div>`);
        })
    
    });
});


mocha.run();
