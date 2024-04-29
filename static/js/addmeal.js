$(document).on('submit','#meal-form', function(e){
    // e.preventDefault();

    $.ajax({
        type:'POST',
        url:'/send',
        data: {
            user:$('#username').val(),
            date:$('#date').val(),
            type:$('#type').val(),
            calo:$('#sum-calo').val(),
            carb:$('#sum-carb').val(),
            fat:$('#sum-fat').val(),
            protein:$('#sum-protein').val(),
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
        },
        success: function(data) {
            alert(data)
        }
    });
});
