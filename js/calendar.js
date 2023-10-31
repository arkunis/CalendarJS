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
        eventClick: async function GetInfoCard(info) {
            var eventObj = info.event;
            if (eventObj.extendedProps.tous === true) {
                // alert(eventObj.extendedProps.description);
                const reponse = await fetch("_json/data.json");
                const InfoPerso = await reponse.json();
                document.getElementById('CarteInfo').innerHTML = "";
                for (let i = 0; i < InfoPerso.length; i++) {
                    // calendar.addEvent({ id: "InfoPerso", title: `Anniv. ${InfoPerso[i].nom} ${InfoPerso[i].prenom}`, start: `${Annee}-${InfoPerso[i].anniv}`, color: 'purple' });
                    const InfoPersoCarte = document.getElementById('CarteInfo');
                    const InfoPersoDoc = document.createElement('article');
                    InfoPersoDoc.innerHTML = `<p>${InfoPerso[i].prenom}</p>`;
                    InfoPersoCarte.appendChild(InfoPersoDoc);
                }
            }
        },
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
    });

    EventJourF();
    async function EventJourF() {
        const reponse = await fetch("_json/JourFerier.json");
        const JourF = await reponse.json();
        for (let i = 0; i < JourF.length; i++) {
            calendar.addEvent({ title: JourF[i].title, start: `${Annee}-${JourF[i].start}`, color: JourF[i].color, display: JourF[i].display });
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
            calendar.addEvent({title: `Anniv. ${InfoPerso[i].nom} ${InfoPerso[i].prenom}`, start: `${Annee}-${InfoPerso[i].anniv}`, color: 'purple' });

        }
    }
    calendar.render();
    calendar.setOption('locale', 'fr');

});
