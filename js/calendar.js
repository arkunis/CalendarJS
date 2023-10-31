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
    async function EventJourF(){
        const reponse = await fetch("_json/JourFerier.json");
        const JourF = await reponse.json();
        console.log(JourF);
    for (let i=0; i<JourF.length; i++){
        calendar.addEvent(JourF[i]);
        console.log(JourF[i]);
    }
}

    EventNormal();
    async function EventNormal(){
        const reponse = await fetch("_json/Event.json");
        const EventNormal = await reponse.json();
        console.log(EventNormal);
    for (let i=0; i<EventNormal.length; i++){
        calendar.addEvent(EventNormal[i]);
        console.log(EventNormal[i]);
    }
    
    }
    calendar.render();
    calendar.setOption('locale', 'fr');
});
