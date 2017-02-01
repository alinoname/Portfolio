$(function() {
    const main = $('#main_container ');
    const submit = $('.btn-primary');
    const panelBody = $('.panel-body');
    const chatRoom = $('.chatRoom');
    const send = $('.send');
    const chatMessages = $('.chatMessages');
    //łączenie i stworzenie połączenia w czasie rzeczywistym:
    const socket = io('http://192.168.1.35:3001');
    //odpowiedz na zdarzenie chat message i wtedy uruchom callback:
    socket.on('chat message', function(ans) {
        console.log(ans);
        chatMessages.append($('<li class="nazwa">').text(ans)).scrollTop(9999999999);

    });

    //wyślij dane na serwer - zdarzenie 'chat message' i prześlij wiadomosć:

    chatRoom.hide();

    submit.on('click', function() {
        const name = $('#name').val();
        event.preventDefault();
        panelBody.hide();
        chatRoom.show().find($('label').text(name + ":"));
    });
    send.on('click', function() {
        const name = $('#name').val();
        const msg = $('#msg').val();
        event.preventDefault();
        socket.emit('chat message', name + ": " + msg)
    });
});
