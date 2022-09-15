// localStorage.clear();



var token = $('meta[name="csrf-token"]').attr('content');
var url = window.location.href.split('/');

//localStorage userId
if (localStorage.getItem('userId') === null) {
    var id = uniqueId();
    localStorage.setItem('userId', id);
}

if (localStorage.getItem('aco_token_v1') === null) {
    $.ajax({
        url: '/localChat',
        type: 'POST',
        data: {
            _token: token,
            token: 0
        },
        success: function(e) {
            localStorage.setItem('aco_token_v1', e);
            console.log(e)
        },
        error: function(e) {
            console.log(e)
        }
    });
} else {
    $.ajax({
        url: '/localChat',
        type: 'POST',
        data: {
            _token: token,
            token: localStorage.getItem('aco_token_v1')
        },
        success: function(e) {
            console.log(e)
        },
        error: function(e) {
            console.log(e)
        }
    });
}

function uniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}