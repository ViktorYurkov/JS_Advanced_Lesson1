//доступи до потрібних елементів html
const cacheDom = (function () {
    this.clickDelName = false;
    this.clickAddName = false;
    this.focusInputName = false;
    
    //видаляти потрібне ім’я з масиву
    function delName(onOff) {
        this.clickDelName = onOff;
    }
    
    //добавляти нове ім’я у масив
    function addName(onOff) {
        this.clickAddName = onOff;
    }

    function inputName(onOff) {
        this.focusInputName = onOff;
    }
    return {
        delName: delName,
        addName: addName,
        inputName: inputName
    }
})();

//модуль з масивом імен людей
const People = (function () {
    const db = [
        'Petro', 'Vasil', 'Alla', 'Ivan',
        'Nazar', 'Olga', 'Kiril', 'Tolia'
    ];

    function addPersonName(userName) {
        if (userName) {
          //  console.log(`addPersonName ${userName}`)
            db.push(userName);
        }
    }

    function delPersonName(id) {
        if (userName) {
         //   console.log(`delPersonName ${id}`);
            db.splice(id, 1);
        }
    }

    function getdDB() { //виведення 
        if (db.length) {
            return db;
        }
    };

    return {
        addPersonName: addPersonName,
        getdDB: getdDB,
        delPersonName: delPersonName
    }
})();

//події на елементи html
const bindEvent = (function () {
    function clickDelName() {
        if (this.clickDelName) {
            init[3].cacheDom.delName('false');
            $('input').on('click', function () {
                var thisId = this.id;
                if (thisId.includes('x')) {
                    thisId = +thisId.slice(1);
                    init[0].people.delPersonName(thisId); //видалення імені з масиву
                    const user = init[0].people.getdDB(); // отримання масиву імен з видаленим іменем
                    init[1].render.viewData(user); //виведення масиву імен
                    
                }

            });
            init[3].cacheDom.delName('true');
        };

    };

    function clickAddName() {
        if (this.clickAddName) {
            init[3].cacheDom.addName('false');
            $('#addName').on('click', function () {
                var thisId = this.id;
                if (thisId.includes('addName')) {
                    init[0].people.addPersonName($('#userName').val()); //додавання імені в масив
                    $('#userName').val('');
                    const user = init[0].people.getdDB(); // отримання масиву імен з доданим іменем
                    init[1].render.viewData(user); //виведення масиву імен
                }

            });
            init[3].cacheDom.addName(true);
        };

    };
    return {
        clickAddName: clickAddName,
        clickDelName: clickDelName
    }
})();

// функція оновлення html документу
const render = (function (user) {
    function viewData(user) {
        //console.log(`viewData ${user}`);
        var textHTML = '';
        _.each(user, function (data, id) {
            textHTML += `<input type="button" value=" x " id="x${id}"> ` + data + '<br>'
        });
        document.getElementById("user").innerHTML = textHTML;

        init[2].bindEvent.clickDelName(); //обновлення призначень клік
    }
    return {
        viewData: viewData
    }

})();

//запуск усіх головних функцій модуля та обробки html
const init = (function () {
    let repositories = [];
    const repolist = [
        {
            name: 'people',
            source: People
        },
        {
            name: 'render',
            source: render
        },
        {
            name: 'bindEvent',
            source: bindEvent
        },
        {
            name: 'cacheDom',
            source: cacheDom
        }

    ];

    repositories = repolist.map(function callback(People) {
        return {
        [People.name]: People.source
        }
    });

    return repositories;
})();

const user = init[0].people.getdDB(); // запит до масиву імен і створення масиву виведення
//console.log(init);
//console.log(user);
init[1].render.viewData(user); // виведення масиву імен
$(function () {
    this.clickDelName = true;
    this.clickAddName = true;
    this.focusInputName = true;
    init[2].bindEvent.clickAddName(); // назначення кліку на кнопку додавання імені
    init[2].bindEvent.clickDelName(); // назначення кліку на кнопку видалення імені
});
