'use strict';

/* Filters */

angular.module('piathome.filters', []).
    filter('truncate', function () {
        return function (text, length) {
            if (isNaN(length))
                length = 60;

            var end = "...";

            if (text == null || text.length == 0)
                return null;

            if (!angular.isString(text))
                return text;

            if (text.length <= length) {
                return text;
            }
            else {
                return String(text).substring(0, length-end.length) + end;
            }

        };
    });
