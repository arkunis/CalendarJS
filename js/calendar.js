document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    let MaDate = new Date();
    let Jour = MaDate.getDate();
    let Mois = MaDate.getMonth();
    Mois = Mois + 1;
    let Annee = MaDate.getFullYear();

    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialDate: '' + Annee + '-' + Mois + '-' + Jour + '',
        navLinks: true, // can click day/week names to navigate views
        selectable: true,
        selectMirror: true,
        // select: function (arg) {
        //     var title = prompt('Titre de l\'évènement:');
        //     if (title) {
        //         calendar.addEvent({
        //             title: title,
        //             start: arg.start,
        //             end: arg.end,
        //             allDay: arg.allDay
        //         })
        //     }
        //     calendar.unselect()
        // },
        // eventClick: function (arg) {
        //     if (confirm('Supprimer cet évènement ?')) {
        //         arg.event.remove()
        //     }
        // },
        editable: true,
        dayMaxEvents: true, // allow "more" link when too many events
    });

    EventJourF();
    async function EventJourF() {
        const reponse = await fetch("_json/JourFerier.json");
        const JourF = await reponse.json();
        for (let i = 0; i < JourF.length; i++) {
            calendar.addEvent({title: JourF[i].title, start: `${Annee}-${JourF[i].start}`, color: JourF[i].color, display: JourF[i].display});
        }
    }

    EventNormal();
    async function EventNormal() {
        const reponse = await fetch("_json/Event.json");
        const EventNormal = await reponse.json();
        for (let i = 0; i < EventNormal.length; i++) {
            calendar.addEvent(EventNormal[i]);
        }
    }

    InfoPerso();
    async function InfoPerso() {
        const reponse = await fetch("_json/data.json");
        const InfoPerso = await reponse.json();
        for (let i = 0; i < InfoPerso.length; i++) {
            calendar.addEvent({id: "InfoPerso", title: `Anniv. ${InfoPerso[i].nom} ${InfoPerso[i].prenom}`, start: `${Annee}-${InfoPerso[i].anniv}`, color:'purple'});
            // document.getElementById('InfoPerso').addEventListener('click', ()=>{GetInfoCard(i);});
        }
    }
    calendar.render();
    calendar.setOption('locale', 'fr');

 async function GetInfoCard(index){
    let i = index;
        const reponse = await fetch("_json/data.json");
        const InfoPerso = await reponse.json();
        document.getElementById('CarteInfo').innerHTML = "";

        const ArticleCard = document.getElementById('CarteInfo');
        const ArticleCardCreat = document.createElement('article');
        ArticleCardCreat.classList.add('w-full');
        ArticleCardCreat.innerHTML = `<p>${InfoPerso[i].prenom}</p>`;
        ArticleCard.appendChild(ArticleCardCreat);
        console.log(ArticleCard);
    }
});
