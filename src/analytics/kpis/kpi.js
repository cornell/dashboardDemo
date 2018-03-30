var Kpi = function(data) {
  var self = this;

  var mapping = {
    copy: ['Title'],
  };
  ko.mapping.fromJS(data, mapping, this);
};

export { Kpi };
