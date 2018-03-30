export default function Filter(reference, title, id, value) {
    var self = this;
    self.reference = reference;
    self.id = ko.observable(id);
    self.title = title;
    self.value = ko.observable(value);
}
