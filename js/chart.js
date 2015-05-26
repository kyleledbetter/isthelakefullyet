// Chartist chart
new Chartist.Bar('.ct-chart', {
  labels: ['Level'],
  series: [
    {
      name: 'Current',
      data: [655.38]
    },
    {
      name: 'Remaining',
      data: [25.62]
    }
  ]
}, {
  stackBars: true,
  labelInterpolationFnc: function(value) {
    return value[0]
  },
  height: 300,
  axisY: {
    showLabel: true,
    labelPosition: 'inside',
    labelInterpolationFnc: function(value) {
      return (value) + 'ft';
    }
  }
}, [
// Options override for media > 400px
['(max-width: 400px) and (max-height: 785px)', {
  height: 150
}]
]).on('draw', function(data) {
  if(data.type === 'bar') {
    data.element.attr({
      style: 'stroke-width: 100px'
    });
  }
});

var $chart = $('.ct-chart');

var $toolTip = $chart
  .append('<div class="tooltip"></div>')
  .find('.tooltip')
  .hide();

$chart.on('mouseenter', '.ct-point', function() {
  var $point = $(this),
    value = $point.attr('ct:value'),
    seriesName = $point.parent().attr('ct:series-name');
  $toolTip.html(seriesName + '<br>' + value).show();
});

$chart.on('mouseleave', '.ct-point', function() {
  $toolTip.hide();
});

$chart.on('mousemove', function(event) {
  $toolTip.css({
    left: (event.offsetX || event.originalEvent.layerX) - $toolTip.width() / 2 - 10,
    top: (event.offsetY || event.originalEvent.layerY) - $toolTip.height() - 40
  });
});
