var React     = require('react'),
    immstruct = require('immstruct'),
    component = require('omniscient');
var Table = require('reactable').Table;
var NameInput = component(function (props) {
  var onChange = function (e) {
    props.cursor.update('name', function (name) {
      return e.currentTarget.value;
    });
  };
  return React.DOM.input({ value: props.cursor.get('name'), onChange: onChange });
});

var PageListing = component(function (props) {

  return React.DOM.tr({},
      React.DOM.td({}, "t"),
      React.DOM.td({}, "e"),
      React.DOM.td({}, "s"),
      React.DOM.td({}, "t")
    );
});


var OtherListing = component(function (props) {

  return Table({  
    className:'pure-table',
    data:[
        { name: 'Row one', content: 'These are regular data rows' },
        { name: 'Row two', othercontent: 'They work like above' }
    ]
  })
});



var Pages = component(function (props) {

  return OtherListing({});
});


var Welcome = component(function (props) {
  var cursor = props.cursor;

  var guest = cursor.get('guest');
  var name = guest.get('name') ? ", " + guest.get('name') : "";
  return React.DOM.section({},
                           React.DOM.div({}, cursor.get('greeting'), name, "!"),
                           React.DOM.div({}, NameInput(guest)));
});
var pages = [{title:'',}];
var structure = immstruct({ greeting: 'Welcome', guest: { name: '' } });
var el = document.getElementById('container');
render();
  structure.on('next-animation-frame', render);

function render () {
    React.render(Pages(structure.cursor()), el);
};



