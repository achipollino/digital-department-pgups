$(document).ready(function () {
    //open/close primary navigation
    $('.menu-link').on('click', function (e) {
        e.preventDefault();
        $('.menu-line').toggleClass('is-clicked');
        $('.navigation').toggleClass('is-visible');
    });

    $('.menu-items a').click((e) => {
        $('.menu-line').removeClass('is-clicked');
        $('.navigation').removeClass('is-visible');
    });

    new WOW({
        animateClass: "animate__animated",
    }).init();

    $('.ui-accordion .ui-accordion-header').click(function () {
        $(this).next().toggle('slow');
        $(this).toggleClass('ui-accordion-header-active');
        return false;
    }).next().hide();

    let popup = $('.popup');
    $('.order').click(() => {
        popup.show();
    });

    $('.close').click(() => {
        popup.hide();
        $('.form-input').val('');
    });

    $('.header-btn').click(() => {
        popup.show();
    });

    $('.program-btn').click(function () {
        popup.show();
        let section = $(this).closest('.program').attr('id');
        $('#program').val(section);
    });

    let formLabel = $('.form-label');
    let labelColor = formLabel.css('color');
    let formInputs = $('.form-input');
    let formLabelText = [];
    for (let label of formLabel) {
        formLabelText.push($(label).text());
    }

    let checkboxInput = $('.checkbox-input');
    let labelCheckboxColor = checkboxInput.next().css('color');

    $('.form-button').click(function () {
        formInputs.blur(function () {
            validForm();
        });

        if (!validForm()) {
            $.ajax({
                type: 'post',
                url: 'mail.php',
                data: 'name=' + $(formInputs[0]).val() + '&university=' + $(formInputs[1]).val() + '&direction=' + $(formInputs[2]).val() + '&program=' + $('#program option:selected').text() + '&phone=' + $(formInputs[4]).val() + '&email=' + $(formInputs[5]).val(),
                success: () => {
                    console.log('Письмо отправлено');
                    $('.popup-form').hide();
                    $('.popup-thanks').show();
                },
                error: () => {
                    console.log('Ошибка');
                }
            });
        }
    });

    function validForm() {
        let hasError = false;
        checkboxInput.next().css('color', labelCheckboxColor);

        for (let i = 0; i < formLabel.length; i++) {
            $(formLabel[i]).text(formLabelText[i]);
            $(formLabel[i]).css('color', labelColor);
        }

        for (let input of formInputs) {
            let element = $(input);
            if (!element.val()) {
                element.next().text('Введите данные: ' + element.next().text());
                element.next().css('color', 'red');
                hasError = true;
            }
        }

        for (let checkbox of checkboxInput) {
            let element = $(checkbox);
            if (!element.prop("checked")) {
                element.next().css('color', 'red');
                hasError = true;
            }
        }

        return hasError;
    }
});