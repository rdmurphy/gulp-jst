this["ns"] = this["ns"] || {};
this["ns"]["JST"] = this["ns"]["JST"] || {};
this["ns"]["JST"]["hello"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += 'Hello ' +
((__t = ( name )) == null ? '' : __t) +
'!';

}
return __p
}