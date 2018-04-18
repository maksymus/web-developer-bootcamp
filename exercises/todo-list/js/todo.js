// click toggles if done
$("ul").on("click", "li", function () {
    $(this).toggleClass("done")
});

// click deletes item if done
$("ul").on("click", "span", function (event) {
    $(this).parent().fadeOut(200, function () {
        $(this).remove();
    });
    event.stopPropagation();
});

// enter creates new todo
$("input[type='text']").on("keypress", function (event) {
    if (event.keyCode === 13 && $(this).val().trim()) {
        var value = $(this).val().trim();
        $("ul").append('<li><span class="del-todo"><i class="fas fa-trash-alt"></i></span> ' + value + '</li>');
        $(this).val("");
    }
});

$("span.add-todo").on("click", function () {
    $("input").fadeToggle(0.1);
});