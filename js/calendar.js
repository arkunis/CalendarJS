document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    let MaDate = new Date();
    let Jour = MaDate.getDate();
    let Mois = MaDate.getMonth();
    Mois = Mois + 1;
    let Annee = MaDate.getFullYear();
    EventJourF();
    async function EventJourF(){
        const reponse = await fetch("_json/JourFerier.json");
        const JourF = await reponse.json();
        console.log(JourF);
    if (let i=0; i<JourF.length; i++){
        calendar.addEvent(events[JourF]);
    }
    }


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
        select: function (arg) {
            var title = prompt('Titre de l\'évènement:');
            if (title) {
                calendar.addEvent({
                    title: title,
                    start: arg.start,
                    end: arg.end,
                    allDay: arg.allDay
                })
            }
            calendar.unselect()
        },
        eventClick: function (arg) {
            if (confirm('Supprimer cet évènement ?')) {
                arg.event.remove()
            }
        },
        editable: true,
        dayMaxEvents: true, // allow "more" link when too many events
        events: [
            {
                title: 'Projet JS',
                start: '2023-10-30',
                end: '2023-11-04',
            },
            {
                title: 'Férier',
                start: '2023-11-01',
                color: '#f50202',
                display: "background"
            },
            {
                groupId: 999,
                title: 'Repeating Event',
                start: '2023-10-30T16:00:00',
                backgroundColor: 'black'
            },
            {
                groupId: 999,
                title: 'Repeating Event',
                start: '2023-10-30T16:00:00',
                backgroundColor: 'black'
            },
            {
                groupId: 999,
                title: 'Test',
                start: '2023-10-05T16:00:00',
                backgroundColor: 'black'
            }
        ]
    });
    calendar.render();
    calendar.setOption('locale', 'fr');
});
