function getToggledPasswordValue(field) {
    return field.filter(function(){ return !$(this).prop("disabled")}).val();
}

function togglePassword(field) {
    field.change(function() {
        var _this = $(this);
        var isChecked = (_this.is(':checked'));

        var passwordShow = $(_this.attr("type_target"));
        var passwordHidden = $(_this.attr("password_target"));

        var target = isChecked ? passwordShow : passwordHidden;
        var src = isChecked ? passwordHidden : passwordShow;

        target.prop("disabled", false);
        target.show();

        target.val(src.val());

        src.prop("disabled", true);
        src.hide();
    });
}
