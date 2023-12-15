$(document).ready(function() {

    $('#login-form').on('submit', function (e) {
        e.preventDefault();

        let username = $('input[name="username"]').val();
        let password = $('input[name="password"]').val();

        $.ajax({
            url: APP.env.API_URL,
            method: 'POST',
            dataType: 'json',
            data: {
                username,
                password
            },
            success: function (data) {
                console.log(data);
            },
            error: function (err) {
                console.log(err);
            }
        })

    })

})

