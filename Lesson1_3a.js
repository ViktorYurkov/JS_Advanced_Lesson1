let data = $('table');
var t = [];
var hod = true;
console.log(data.tr);

data.mousedown(function () {
    let findClick = event.target;
    if (findClick.tagName != 'TD') return;
    if (!findClick.classList.contains("null") & !findClick.classList.contains("krest")) {
        console.log(findClick.classList.contains("null"));
        console.log(findClick.classList.contains("krest"));
        if (hod) {
            findClick.classList.add("krest");
            hod = false;
            console.log(hod);
        } else {
            findClick.classList.add("null");
            hod = true;
            console.log(hod);
        }

    }

});
data.mouseup(function () {
    var game = false;
    $('td').each(function () {
        if (this.className != 'krest' && this.className != 'null') {
            game = true;
        }
    });
    if (!game) {
        alert('Кінець гри . Нічія');
        end();
        begin();
    } else if (result("krest")) {
        alert('Кінець гри . Виграв Chip');
        end();
        begin();
    } else if (result("null")) {
        alert('Кінець гри . Виграв Deil');
        end();
        begin();
    } else if (!hod) {
        step('.chip', '.deil');
    } else {
        step('.deil', '.chip');
    };



    function result(nameClass) {
        var t = $('td').map(function () {
            return (this.className == nameClass ? true : false);
        }).toArray();

        if (t[0] & t[1] & t[2] || t[0] & t[3] & t[6] || t[0] & t[4] & t[8] ||
            t[1] & t[4] & t[7] || t[2] & t[5] & t[8] || t[3] & t[4] & t[5] ||
            t[2] & t[4] & t[6] || t[6] & t[7] & t[8]) {
            return true;
        }
        //console.log(t);
        return false;
    }
});

function begin() {
    if (confirm("Грають Чіп і Дейл. Першим ходить Чіп?")) {
        hod = true;
        step('.deil', '.chip');
    } else {
        hod = false;
        step('.chip', '.deil');
    }
}

function step(gamer1, gamer2) {
    $(gamer1).css({
        "background-image": "url('Чип_и_Дейл.jpg')"
    });
    $(gamer2).css({
        "background-image": "none"
    });
};

function end() {
    $('td').each(function () {
        this.classList.remove("null");
        this.classList.remove("krest");
    });
};

$(function () {
    begin();
});
