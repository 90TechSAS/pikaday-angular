'use strict';

angular.module('zenlabs.directives', [])
  .directive('zlPikaday', function() {
  return {
    restrict: 'A',
    scope: {
      zlPikaday: '=',
    },
    link: function (scope, elem, attrs) {

      var picker = new Pikaday({

        field: elem[0],
        trigger: document.getElementById(attrs.triggerId),
        bound: attrs.bound !== 'false',
        position: attrs.position || '',
        format: attrs.format || 'ddd MMM D YYYY', // Requires Moment.js for custom formatting
        defaultDate: new Date(attrs.defaultDate),
        setDefaultDate: attrs.setDefaultDate === 'true',
        firstDay: attrs.firstDay ? parseInt(attrs.firstDay) : 1,
        minDate: new Date(attrs.minDate),
        maxDate: new Date(attrs.maxDate),
        yearRange: attrs.yearRange ? JSON.parse(attrs.yearRange) : 10, // Accepts int (10) or 2 elem array ([1992, 1998]) as strings
        isRTL: attrs.isRTL === 'true',
        i18n: {
          previousMonth : 'Mois Précédent',
          nextMonth     : 'Mois Suivant',
          months        : ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
          weekdays      : ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
          weekdaysShort : ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam']
        },
        yearSuffix: attrs.yearSuffix || '',
        showMonthAfterYear: attrs.showMonthAfterYear === 'true',

        onSelect: function () {
          setTimeout(function(){
            scope.$apply();
          });
        }
      });
      scope.zlPikaday = picker;

      scope.$on('$destroy', function () {
        picker.destroy();
      });
    }
  };
});
