// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/3.35/esri/copyright.txt for details.
//>>built
require({cache:{"esri/layers/vectorTiles/tasks/operations/pbfQueryUtils":function(){define("require exports ../../core/Error ../../core/Logger ../../core/pbf ../../layers/graphics/optimizedFeatures".split(" "),function(S,w,C,h,p,r){function n(t){if(t>=l.length){var B=new C("query:parsing-pbf","Error while parsing FeatureSet PBF payload. Unknown GeometryType");ea.error(B)}return l[t]}function E(t){var B,m=B||(B={});m[m.STRING=1]="STRING";m[m.FLOAT=2]="FLOAT";m[m.DOUBLE=3]="DOUBLE";m[m.SINT32=4]="SINT32";
m[m.UINT32=5]="UINT32";m[m.INT64=6]="INT64";m[m.UINT64=7]="UINT64";m[m.SINT64=8]="SINT64";for(m[m.BOOL=9]="BOOL";t.next();)switch(t.tag()){case B.STRING:return t.getString();case B.FLOAT:return t.getFloat();case B.DOUBLE:return t.getDouble();case B.SINT32:return t.getSInt32();case B.UINT32:return t.getUInt32();case B.INT64:return t.getInt64();case B.UINT64:return t.getUInt64();case B.SINT64:return t.getSInt64();case B.BOOL:return t.getBool();default:return t.skip(),null}return null}function M(t){var B,
m=B||(B={});m[m.NAME=1]="NAME";m[m.TYPE=2]="TYPE";m[m.ALIAS=3]="ALIAS";m[m.SQL_TYPE=4]="SQL_TYPE";m[m.DOMAIN=5]="DOMAIN";m[m.DEFAULT_VALUE=6]="DEFAULT_VALUE";for(m={type:f[0]};t.next();)switch(t.tag()){case B.NAME:m.name=t.getString();break;case B.TYPE:m.type=f[t.getEnum()];break;case B.ALIAS:m.alias=t.getString();break;case B.SQL_TYPE:m.sqlType=D[t.getEnum()];break;case B.DOMAIN:t.skip();break;case B.DEFAULT_VALUE:t.skip();break;default:t.skip()}return m}function aa(t,B){var m,N=m||(m={});N[N.ATTRIBUTES=
1]="ATTRIBUTES";N[N.GEOMETRY=2]="GEOMETRY";N[N.CENTROID=4]="CENTROID";N=new r.OptimizedFeature;for(var V=0;t.next();)switch(t.tag()){case m.ATTRIBUTES:var W=t.getMessage(),L=B[V++].name;N.attributes[L]=E(W);break;case m.GEOMETRY:W=void 0;L=t.getMessage();var F=W||(W={});F[F.TYPE=1]="TYPE";F[F.LENGTHS=2]="LENGTHS";F[F.COORDS=3]="COORDS";F=new r.OptimizedGeometry;for(var P=F.coords,G=F.lengths;L.next();)switch(L.tag()){case W.LENGTHS:var J=L.getUInt32();for(J=L.pos()+J;L.pos()<J;)G.push(L.getUInt32());
break;case W.COORDS:J=L.getUInt32();J=L.pos()+J;for(var T=0;L.pos()<J;)P[T++]=L.getSInt64();break;default:L.skip()}N.geometry=F;break;case m.CENTROID:W=void 0;L=t.getMessage();F=W||(W={});F[F.TYPE=1]="TYPE";F[F.LENGTHS=2]="LENGTHS";F[F.COORDS=3]="COORDS";F=new r.OptimizedGeometry;for(P=F.coords;L.next();)switch(L.tag()){case W.COORDS:G=L.getUInt32();G=L.pos()+G;for(J=0;L.pos()<G;)P[J++]=L.getSInt64();break;default:L.skip()}N.centroid=F;break;default:t.skip()}return N}function Y(t){var B,m=B||(B={});
m[m.X=1]="X";m[m.Y=2]="Y";m[m.M=3]="M";m[m.Z=4]="Z";for(m=[0,0];t.next();)switch(t.tag()){case B.X:m[0]=t.getDouble();break;case B.Y:m[1]=t.getDouble();break;case B.M:m.push(t.getDouble());break;case B.Z:m.push(t.getDouble());break;default:t.skip()}return m}function ha(t){var B,m=B||(B={});m[m.X=1]="X";m[m.Y=2]="Y";m[m.M=3]="M";m[m.Z=4]="Z";for(m=[0,0];t.next();)switch(t.tag()){case B.X:m[0]=t.getDouble();break;case B.Y:m[1]=t.getDouble();break;case B.M:m.push(t.getDouble());break;case B.Z:m.push(t.getDouble());
break;default:t.skip()}return m}Object.defineProperty(w,"__esModule",{value:!0});var ea=h.getLogger("esri.tasks.operations.pbfQueryUtils"),f="esriFieldTypeSmallInteger esriFieldTypeInteger esriFieldTypeSingle esriFieldTypeDouble esriFieldTypeString esriFieldTypeDate esriFieldTypeOID esriFieldTypeGeometry esriFieldTypeBlob esriFieldTypeRaster esriFieldTypeGUID esriFieldTypeGlobalID esriFieldTypeXML".split(" "),D="sqlTypeBigInt sqlTypeBinary sqlTypeBit sqlTypeChar sqlTypeDate sqlTypeDecimal sqlTypeDouble sqlTypeFloat sqlTypeGeometry sqlTypeGUID sqlTypeInteger sqlTypeLongNVarchar sqlTypeLongVarbinary sqlTypeLongVarchar sqlTypeNChar sqlTypeNVarchar sqlTypeOther sqlTypeReal sqlTypeSmallInt sqlTypeSqlXml sqlTypeTime sqlTypeTimestamp sqlTypeTimestamp2 sqlTypeTinyInt sqlTypeVarbinary sqlTypeVarchar".split(" "),
l=["esriGeometryPoint","esriGeometryMultipoint","esriGeometryPolyline","esriGeometryPolygon"],I=["upperLeft","lowerLeft"];w.parsePBFFeatureQuery=function(t){try{var B,m=B||(B={});m[m.QUERY_RESULT=2]="QUERY_RESULT";for(var N=new p(new Uint8Array(t),new DataView(t)),V;N.next();)switch(N.tag()){case B.QUERY_RESULT:t=void 0;var W=N.getMessage(),L=t||(t={});L[L.FEATURE_RESULT=1]="FEATURE_RESULT";for(m={};W.next();)switch(W.tag()){case t.FEATURE_RESULT:var F=void 0,P=W.getMessage(),G=F||(F={});G[G.OBJECT_ID_NAME=
1]="OBJECT_ID_NAME";G[G.UNIQUE_ID_NAME=2]="UNIQUE_ID_NAME";G[G.GLOBAL_ID_NAME=3]="GLOBAL_ID_NAME";G[G.GEOHASH_NAME=4]="GEOHASH_NAME";G[G.GEOMETRY_PROPERTIES=5]="GEOMETRY_PROPERTIES";G[G.SERVER_GENS=6]="SERVER_GENS";G[G.GEOMETRY_TYPE=7]="GEOMETRY_TYPE";G[G.SPATIAL_REFERENCE=8]="SPATIAL_REFERENCE";G[G.EXCEEDED_TRANSFER_LIMIT=9]="EXCEEDED_TRANSFER_LIMIT";G[G.HAS_Z=10]="HAS_Z";G[G.HAS_M=11]="HAS_M";G[G.TRANSFORM=12]="TRANSFORM";G[G.FIELDS=13]="FIELDS";G[G.FEATURES=15]="FEATURES";var J=new r.OptimizedFeatureSet;
for(J.geometryType=n(0);P.next();)switch(P.tag()){case F.OBJECT_ID_NAME:J.objectIdFieldName=P.getString();break;case F.GLOBAL_ID_NAME:J.globalIdFieldName=P.getString();break;case F.GEOHASH_NAME:J.geohashFieldName=P.getString();break;case F.GEOMETRY_PROPERTIES:var T=void 0,ca=P.getMessage(),ba=T||(T={});ba[ba.AREA_FIELD_NAME=1]="AREA_FIELD_NAME";ba[ba.LENGTH_FIELD_NAME=2]="LENGTH_FIELD_NAME";ba[ba.UNITS=3]="UNITS";for(var U={};ca.next();)switch(ca.tag()){case T.AREA_FIELD_NAME:U.shapeAreaFieldName=
ca.getString();break;case T.LENGTH_FIELD_NAME:U.shapeLengthFieldName=ca.getString();break;case T.UNITS:U.units=ca.getString();break;default:ca.skip()}var ia=U;J.geometryProperties=ia;break;case F.GEOMETRY_TYPE:J.geometryType=n(P.getEnum());break;case F.SPATIAL_REFERENCE:T=void 0;var fa=P.getMessage(),Q=T||(T={});Q[Q.WKID=1]="WKID";Q[Q.LASTEST_WKID=2]="LASTEST_WKID";Q[Q.VCS_WKID=3]="VCS_WKID";Q[Q.LATEST_VCS_WKID=4]="LATEST_VCS_WKID";Q[Q.WKT=5]="WKT";for(U={};fa.next();)switch(fa.tag()){case T.WKID:U.wkid=
fa.getUInt32();break;case T.WKT:U.wkt=fa.getString();break;default:fa.skip()}var da=U;J.spatialReference=da;break;case F.HAS_Z:J.hasZ=P.getBool();break;case F.HAS_M:J.hasM=P.getBool();break;case F.TRANSFORM:var a=U=T=void 0,b=P.getMessage(),c=a||(a={});c[c.ORIGIN_POSTION=1]="ORIGIN_POSTION";c[c.SCALE=2]="SCALE";c[c.TRANSLATE=3]="TRANSLATE";for(var d=I[0];b.next();)switch(b.tag()){case a.ORIGIN_POSTION:d=I[b.getEnum()];break;case a.SCALE:U=Y(b.getMessage());break;case a.TRANSLATE:T=ha(b.getMessage());
break;default:b.skip()}var g={originPosition:d,scale:U,translate:T};J.transform=g;break;case F.EXCEEDED_TRANSFER_LIMIT:var e=P.getBool();J.exceededTransferLimit=e;break;case F.FIELDS:var k=P.getMessage();J.fields.push(M(k));break;case F.FEATURES:var q=P.getMessage();J.features.push(aa(q,J.fields));break;default:P.skip()}m.featureResult=J;break;default:W.skip()}V=m;break;default:N.skip()}return V.featureResult}catch(u){return B=new C("query:parsing-pbf","Error while parsing FeatureSet PBF payload",
{error:u}),ea.error(B),new r.OptimizedFeatureSet}}})},"esri/layers/vectorTiles/core/Error":function(){define(["require","exports","./tsSupport/extendsHelper","./lang","./Message"],function(S,w,C,h,p){S=function(r){function n(E,M,aa){var Y=r.call(this,E,M,aa)||this;return Y instanceof n?Y:new n(E,M,aa)}C(n,r);n.prototype.toJSON=function(){return{name:this.name,message:this.message,details:h.clone(this.details),dojoType:this.dojoType}};n.fromJSON=function(E){var M=new n(E.name,E.message,E.details);
null!=E.dojoType&&(M.dojoType=E.dojoType);return M};return n}(p);S.prototype.type="error";return S})},"esri/layers/vectorTiles/core/tsSupport/extendsHelper":function(){define([],function(){return function(){var S=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(w,C){w.__proto__=C}||function(w,C){for(var h in C)C.hasOwnProperty(h)&&(w[h]=C[h])};return function(w,C){function h(){this.constructor=w}S(w,C);w.prototype=null===C?Object.create(C):(h.prototype=C.prototype,new h)}}()})},"esri/layers/vectorTiles/core/lang":function(){define("dojo/_base/kernel dojo/_base/lang dojo/date dojo/number dojo/date/locale dojo/i18n!../nls/common".split(" "),
function(S,w,C,h,p,r){function n(f){return void 0!==f&&null!==f}function E(f){return n(f)?f:""}function M(f,D,l){var I=l.match(/([^\(]+)(\([^\)]+\))?/i),t=w.trim(I[1]);l=D[f];I=JSON.parse((I[2]?w.trim(I[2]):"{}").replace(/^\(/,"{").replace(/\)$/,"}").replace(/([{,])\s*([0-9a-zA-Z_]+)\s*:/gi,'$1"$2":').replace(/"\s*:\s*'/gi,'":"').replace(/'\s*(,|\})/gi,'"$1'));var B=I.utcOffset;if(-1===ha.indexOf(t))t=w.getObject(t),w.isFunction(t)&&(l=t(l,f,D,I));else if("number"===typeof l||"string"===typeof l&&
l&&!isNaN(Number(l)))switch(l=Number(l),t){case "NumberFormat":f=w.mixin({},I);D=parseFloat(f.places);if(isNaN(D)||0>D)f.places=Infinity;return h.format(l,f);case "DateString":l=new Date(l);if(I.local||I.systemLocale)return I.systemLocale?l.toLocaleDateString()+(I.hideTime?"":" "+l.toLocaleTimeString()):l.toDateString()+(I.hideTime?"":" "+l.toTimeString());l=l.toUTCString();I.hideTime&&(l=l.replace(/\s+\d\d:\d\d:\d\d\s+(utc|gmt)/i,""));return l;case "DateFormat":return l=new Date(l),n(B)&&(l=C.add(l,
"minute",l.getTimezoneOffset()-B)),p.format(l,I)}return E(l)}function aa(f,D){var l;if(D)for(l in f)f.hasOwnProperty(l)&&(void 0===f[l]?delete f[l]:f[l]instanceof Object&&aa(f[l],!0));else for(l in f)f.hasOwnProperty(l)&&void 0===f[l]&&delete f[l];return f}function Y(f){if(!f||"object"!=typeof f||w.isFunction(f))return f;if(f instanceof Int8Array||f instanceof Uint8Array||f instanceof Uint8ClampedArray||f instanceof Int16Array||f instanceof Int32Array||f instanceof Uint16Array||f instanceof Uint32Array||
f instanceof Float32Array||f instanceof Float64Array||f instanceof Date)return new f.constructor(f);if(f instanceof ArrayBuffer)return f.slice(0,f.byteLength);if("function"===typeof f.clone)f=f.clone();else if("function"===typeof f.map&&"function"===typeof f.forEach)f=f.map(Y);else if("function"===typeof f.notifyChange&&"function"===typeof f.watch)f=f.clone();else{var D={},l,I={};for(l in f){var t=f[l];var B=!(l in I)||I[l]!==t;if(!(l in D)||D[l]!==t&&B)D[l]=Y?Y(t):t}f=D}return f}var ha=["NumberFormat",
"DateString","DateFormat"],ea=/<\/?[^>]+>/g;return{equals:function(f,D){return f===D||"number"===typeof f&&isNaN(f)&&"number"===typeof D&&isNaN(D)||w.isFunction((f||{}).getTime)&&w.isFunction((D||{}).getTime)&&f.getTime()==D.getTime()||w.isFunction((f||{}).equals)&&f.equals(D)||w.isFunction((D||{}).equals)&&D.equals(f)||!1},mixin:w.mixin,valueOf:function(f,D){for(var l in f)if(f[l]==D)return l;return null},stripTags:function(f){if(f){var D=typeof f;if("string"===D)f=f.replace(ea,"");else if("object"===
D)for(var l in f)(D=f[l])&&"string"===typeof D&&(D=D.replace(ea,"")),f[l]=D}return f},substitute:function(f,D,l){if(n(l))if(w.isObject(l)){var I=l.first;var t=l.dateFormat;var B=l.numberFormat}else I=l;if(D&&"{*}"!==D)return w.replace(D,w.hitch({obj:f},function(N,V){N=V.split(":");return 1<N.length?(V=N[0],N.shift(),M(V,this.obj,N.join(":"))):t&&-1!==(t.properties||[]).indexOf(V)?M(V,this.obj,t.formatter||"DateString"):B&&-1!==(B.properties||[]).indexOf(V)?M(V,this.obj,B.formatter||"NumberFormat"):
E(this.obj[V])}));D=[];var m;D.push('\x3ctable class\x3d"esri-widget__table" summary\x3d"'+r.fieldsSummary+'"\x3e\x3ctbody\x3e');for(m in f)if(l=f[m],t&&-1!==(t.properties||[]).indexOf(m)?l=M(m,f,t.formatter||"DateString"):B&&-1!==(B.properties||[]).indexOf(m)&&(l=M(m,f,B.formatter||"NumberFormat")),D.push("\x3ctr\x3e\x3cth\x3e"+m+"\x3c/th\x3e\x3ctd\x3e"+E(l)+"\x3c/td\x3e\x3c/tr\x3e"),I)break;D.push("\x3c/tbody\x3e\x3c/table\x3e");return D.join("")},filter:function(f,D,l){D=[w.isString(f)?f.split(""):
f,l||S.global,w.isString(D)?new Function("item","index","array",D):D];l={};var I;f=D[0];for(I in f)D[2].call(D[I],f[I],I,f)&&(l[I]=f[I]);return l},startsWith:function(f,D,l){l=l||0;return f.indexOf(D,l)===l},endsWith:function(f,D,l){if("number"!==typeof l||!isFinite(l)||Math.floor(l)!==l||l>f.length)l=f.length;l-=D.length;f=f.indexOf(D,l);return-1!==f&&f===l},isDefined:n,fixJson:aa,clone:Y}})},"esri/layers/vectorTiles/core/Message":function(){define(["require","exports","dojo/string"],function(S,
w,C){return function(){function h(p,r,n){this instanceof h&&(this.name=p,this.message=r&&C.substitute(r,n,function(E){return null==E?"":E})||"",this.details=n)}h.prototype.toString=function(){return"["+this.name+"]: "+this.message};return h}()})},"esri/layers/vectorTiles/core/Logger":function(){define(["require","exports","dojo/has"],function(S,w,C){var h={info:0,warn:1,error:2};S=function(){function p(r){void 0===r&&(r={});this.module=r.module||"";this.writer=r.writer||null;this.level=r.level||null;
null!=r.enabled&&(this.enabled=!!r.enabled);p._loggers[this.module]=this;r=this.module.lastIndexOf(".");-1!==r&&(this.parent=p.getLogger(this.module.slice(0,r)))}p.prototype.log=function(r){for(var n=[],E=1;E<arguments.length;E++)n[E-1]=arguments[E];this._isEnabled()&&this._matchLevel(r)&&(E=this._inheritedWriter())&&E.apply(void 0,[r,this.module].concat(n))};p.prototype.error=function(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];this.log.apply(this,["error"].concat(r))};p.prototype.warn=
function(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];this.log.apply(this,["warn"].concat(r))};p.prototype.info=function(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];this.log.apply(this,["info"].concat(r))};p.prototype.getLogger=function(r){return p.getLogger(this.module+"."+r)};p.getLogger=function(r){var n=p._loggers[r];n||(n=new p({module:r}));return n};p.prototype._parentWithMember=function(r,n){for(var E=this;E&&null==E[r];)E=E.parent;return E?E[r]:n};p.prototype._inheritedWriter=
function(){return this._parentWithMember("writer",this._consoleWriter)};p.prototype._consoleWriter=function(r,n){for(var E=[],M=2;M<arguments.length;M++)E[M-2]=arguments[M];console[r].apply(console,["["+n+"]"].concat(E))};p.prototype._matchLevel=function(r){return h[this._parentWithMember("level","error")]<=h[r]};p.prototype._isEnabled=function(){return this._parentWithMember("enabled",!0)};p._loggers={};return p}();w=S.getLogger("esri");C("dojo-debug-messages")?w.level="info":w.level="warn";return S})},
"esri/layers/vectorTiles/core/pbf":function(){define(["require","exports"],function(S,w){return function(){function C(h,p,r,n){this._tag=0;this._dataType=99;this._data=h;this._dataView=p;this._pos=r||0;this._end=n||h.byteLength}C.prototype.clone=function(){return new C(this._data,this._dataView,this._pos,this._end)};C.prototype.pos=function(){return this._pos};C.prototype.next=function(h){for(;;){if(this._pos===this._end)return!1;var p=this._decodeVarint();this._tag=p>>3;this._dataType=p&7;if(!h||
h===this._tag)break;this.skip()}return!0};C.prototype.empty=function(){return this._pos>=this._end};C.prototype.tag=function(){return this._tag};C.prototype.getInt32=function(){return this._decodeVarint()};C.prototype.getInt64=function(){return this._decodeVarint()};C.prototype.getUInt32=function(){var h=4294967295;h=(this._data[this._pos]&127)>>>0;if(128>this._data[this._pos++])return h;h=(h|(this._data[this._pos]&127)<<7)>>>0;if(128>this._data[this._pos++])return h;h=(h|(this._data[this._pos]&127)<<
14)>>>0;if(128>this._data[this._pos++])return h;h=(h|(this._data[this._pos]&127)<<21)>>>0;if(128>this._data[this._pos++])return h;h=(h|(this._data[this._pos]&15)<<28)>>>0;if(128>this._data[this._pos++])return h};C.prototype.getUInt64=function(){return this._decodeVarint()};C.prototype.getSInt32=function(){var h=this.getUInt32();return h>>>1^-(h&1)|0};C.prototype.getSInt64=function(){return this._decodeSVarint()};C.prototype.getBool=function(){var h=0!==this._data[this._pos];this._skip(1);return h};
C.prototype.getEnum=function(){return this._decodeVarint()};C.prototype.getFixed64=function(){var h=this._dataView,p=this._pos;h=h.getUint32(p,!0)+4294967296*h.getUint32(p+4,!0);this._skip(8);return h};C.prototype.getSFixed64=function(){var h=this._dataView,p=this._pos;h=h.getUint32(p,!0)+4294967296*h.getInt32(p+4,!0);this._skip(8);return h};C.prototype.getDouble=function(){var h=this._dataView.getFloat64(this._pos,!0);this._skip(8);return h};C.prototype.getFixed32=function(){var h=this._dataView.getUint32(this._pos,
!0);this._skip(4);return h};C.prototype.getSFixed32=function(){var h=this._dataView.getInt32(this._pos,!0);this._skip(4);return h};C.prototype.getFloat=function(){var h=this._dataView.getFloat32(this._pos,!0);this._skip(4);return h};C.prototype.getString=function(){var h=this._getLength(),p=this._pos;p=this._toString(this._data,p,p+h);this._skip(h);return p};C.prototype.getBytes=function(){var h=this._getLength(),p=this._pos;p=this._toBytes(this._data,p,p+h);this._skip(h);return p};C.prototype.getMessage=
function(){var h=this._getLength(),p=this._pos;p=new C(this._data,this._dataView,p,p+h);this._skip(h);return p};C.prototype.skip=function(){switch(this._dataType){case 0:this._decodeVarint();break;case 1:this._skip(8);break;case 2:this._skip(this._getLength());break;case 5:this._skip(4);break;default:throw Error("Invalid data type!");}};C.prototype._skip=function(h){if(this._pos+h>this._end)throw Error("Attempt to skip past the end of buffer!");this._pos+=h};C.prototype._decodeVarint=function(){var h=
this._data,p=this._pos,r=0;if(10<=this._end-p){var n=h[p++];r|=n&127;if(0!==(n&128)&&(n=h[p++],r|=(n&127)<<7,0!==(n&128)&&(n=h[p++],r|=(n&127)<<14,0!==(n&128)&&(n=h[p++],r|=(n&127)<<21,0!==(n&128)&&(n=h[p++],r+=268435456*(n&127),0!==(n&128)&&(n=h[p++],r+=34359738368*(n&127),0!==(n&128)&&(n=h[p++],r+=4398046511104*(n&127),0!==(n&128)&&(n=h[p++],r+=562949953421312*(n&127),0!==(n&128)&&(n=h[p++],r+=72057594037927936*(n&127),0!==(n&128)&&(n=h[p++],r+=0x7fffffffffffffff*(n&127),0!==(n&128)))))))))))throw Error("Varint too long!");
}else{for(var E=1;p!==this._end;){n=h[p];if(0===(n&128))break;++p;r+=(n&127)*E;E*=128}if(p===this._end)throw Error("Varint overrun!");++p;r+=n*E}this._pos=p;return r};C.prototype._decodeSVarint=function(){var h=this._decodeVarint();return h%2?-(h+1)/2:h/2};C.prototype._getLength=function(){if(2!==this._dataType)throw Error("Not a delimited data type!");return this._decodeVarint()};C.prototype._toString=function(h,p,r){var n="",E="";for(r=Math.min(this._end,r);p<r;++p){var M=h[p];M&128?E+="%"+M.toString(16):
(n+=decodeURIComponent(E)+String.fromCharCode(M),E="")}E.length&&(n+=decodeURIComponent(E));return n};C.prototype._toBytes=function(h,p,r){r=Math.min(this._end,r);return new Uint8Array(h.buffer,p,r-p)};return C}()})},"esri/layers/vectorTiles/layers/graphics/optimizedFeatures":function(){define(["require","exports","../../core/Error","../../core/Logger"],function(S,w,C,h){function p(a,b){return Math.round((b-a.translate[0])/a.scale[0])}function r(a,b){return Math.round((a.translate[1]-b)/a.scale[1])}
function n(a,b){return b*a.scale[0]+a.translate[0]}function E(a,b){return a.translate[1]-b*a.scale[1]}function M(a){a=a.coords;return{x:a[0],y:a[1]}}function aa(a){var b=new Q;b.coords[0]=a.x;b.coords[1]=a.y;return b}function Y(a){a=a.coords;return{x:a[0],y:a[1],z:a[2]}}function ha(a){var b=new Q;b.coords[0]=a.x;b.coords[1]=a.y;b.coords[2]=a.z;return b}function ea(a){a=a.coords;return{x:a[0],y:a[1],m:a[2]}}function f(a){var b=new Q;b.coords[0]=a.x;b.coords[1]=a.y;b.coords[2]=a.m;return b}function D(a){a=
a.coords;return{x:a[0],y:a[1],z:a[2],m:a[3]}}function l(a){var b=new Q;b.coords[0]=a.x;b.coords[1]=a.y;b.coords[2]=a.z;b.coords[3]=a.m;return b}function I(a,b,c){for(var d=b?c?4:3:c?3:2,g=[],e=0;e<a.coords.length;e+=d){for(var k=[],q=0;q<d;q++)k.push(a.coords[e+q]);g.push(k)}return b?c?{points:g,hasZ:b,hasM:c}:{points:g,hasZ:b}:c?{points:g,hasM:c}:{points:g}}function t(a,b,c){var d=b?c?4:3:c?3:2,g=a.coords,e=[],k=0,q=0;for(a=a.lengths;q<a.length;q++){for(var u=a[q],x=[],z=0;z<u;z++){for(var v=[],
y=0;y<d;y++)v.push(g[k++]);x.push(v)}e.push(x)}return b?c?{paths:e,hasZ:b,hasM:c}:{paths:e,hasZ:b}:c?{paths:e,hasM:c}:{paths:e}}function B(a,b,c){var d=b?c?4:3:c?3:2,g=a.coords,e=[],k=0,q=0;for(a=a.lengths;q<a.length;q++){for(var u=a[q],x=[],z=0;z<u;z++){for(var v=[],y=0;y<d;y++)v.push(g[k++]);x.push(v)}e.push(x)}return b?c?{rings:e,hasZ:b,hasM:c}:{rings:e,hasZ:b}:c?{rings:e,hasM:c}:{rings:e}}function m(a,b,c,d){if(!b)return[];switch(b){case "esriGeometryPoint":b=aa;d&&c?b=l:d?b=ha:c&&(b=f);c=[];
for(d=0;d<a.length;d++){var g=a[d],e=g.geometry;g=g.attributes;e=e?b(e):void 0;c.push(new da(e,g))}return c;case "esriGeometryMultipoint":b=c?d?4:3:d?3:2;c=[];for(d=0;d<a.length;d++){e=a[d];var k=e.geometry;e=e.attributes;g=void 0;if(k){g=new Q;g.lengths[0]=k.points.length;var q=g.coords,u=0,x=0;for(k=k.points;x<k.length;x++)for(var z=k[x],v=0;v<b;v++)q[u++]=z[v]}c.push(new da(g,e))}return c;case "esriGeometryPolyline":b=c?d?4:3:d?3:2;c=[];for(d=0;d<a.length;d++){e=a[d];z=e.geometry;e=e.attributes;
g=void 0;if(z)for(g=new Q,q=g.lengths,u=g.coords,k=x=0,z=z.paths;k<z.length;k++){v=z[k];for(var y=0,A=v;y<A.length;y++)for(var H=A[y],K=0;K<b;K++)u[x++]=H[K];q.push(v.length)}c.push(new da(g,e))}return c;case "esriGeometryPolygon":b=c?d?4:3:d?3:2;c=[];for(d=0;d<a.length;d++){g=a[d];v=g.geometry;e=g.centroid;g=g.attributes;q=void 0;if(v)for(q=new Q,u=q.lengths,x=q.coords,z=k=0,v=v.rings;z<v.length;z++){y=v[z];A=0;for(H=y;A<H.length;A++){K=H[A];for(var O=0;O<b;O++)x[k++]=K[O]}u.push(y.length)}e?c.push(new da(q,
g,aa(e))):c.push(new da(q,g))}return c;default:return T.error("convertToFeatureSet:unknown-geometry",new C("Unable to parse unknown geometry type "+b)),[]}}function N(a,b,c,d,g,e){g=ca[g];var k=b.coords;b=b.lengths;var q=c?d?4:3:d?3:2;c=c?d?ia:U:d?U:ba;a.lengths.length=0;a.coords.length=0;if(!k.length)return a;if(!b.length)return c(a.coords,k,0,0,p(e,k[0]),r(e,k[1])),a.lengths.length=0,a.coords.length=q,a;for(var u,x,z,v=0,y,A=0,H=0;H<b.length;H++){var K=b[H];if(!(K<g)){var O=0;y=A;x=d=p(e,k[v]);
z=u=r(e,k[v+1]);c(a.coords,k,y,v,x,z);O++;v+=q;y+=q;for(var X=1;X<K;X++,v+=q)if(x=p(e,k[v]),z=r(e,k[v+1]),x!==d||z!==u)c(a.coords,k,y,v,x-d,z-u),y+=q,O++,d=x,u=z;O>=g&&(a.lengths.push(O),A=y)}}a.coords.length=A;return a.coords.length?a:null}function V(a,b,c,d,g){var e=b.coords;b=b.lengths;var k=c?d?ia:U:d?U:ba;c=c?d?4:3:d?3:2;if(!e.length)return a.lengths.length=0,a.coords.length=0,a;if(!b.length)return k(a.coords,e,0,0,n(g,e[0]),E(g,e[1])),a.lengths.length=0,a.coords.length=c,a;var q=g.scale;d=q[0];
q=q[1];for(var u=0,x=0;x<b.length;x++){var z=b[x];a.lengths[x]=z;var v=n(g,e[u]),y=E(g,e[u+1]);k(a.coords,e,u,u,v,y);u+=c;for(var A=1;A<z;A++,u+=c)v+=e[u]*d,y-=e[u+1]*q,k(a.coords,e,u,u,v,y)}a.lengths.length=b.length;a.coords.length=e.length;return a}function W(a,b,c,d,g,e){e=g?e?4:3:e?3:2;var k=c,q=c+e,u=0,x=0,z=c=0,v=0,y=0;for(--d;y<d;y++,k+=e,q+=e){var A=b[k],H=b[k+1],K=b[k+2],O=b[q],X=b[q+1],Z=b[q+2],R=A*X-O*H;z+=R;u+=(A+O)*R;x+=(H+X)*R;g&&(R=A*Z-O*K,c+=(K+Z)*R,v+=R);A<a[0]&&(a[0]=A);A>a[1]&&
(a[1]=A);H<a[2]&&(a[2]=H);H>a[3]&&(a[3]=H);g&&(K<a[4]&&(a[4]=K),K>a[5]&&(a[5]=K))}0<z&&(z*=-1);0<v&&(v*=-1);if(!z)return null;a=[u,x,.5*z];g&&(a[3]=c,a[4]=.5*v);return a}function L(a,b,c,d,g){g=d?g?4:3:g?3:2;for(var e=b,k=b+g,q=0,u=0,x=0,z=0,v=0,y=c-1;v<y;v++,e+=g,k+=g){var A=a[e],H=a[e+1],K=a[e+2],O=a[k],X=a[k+1],Z=a[k+2],R=d?P(A,H,K,O,X,Z):F(A,H,O,X);R&&(q+=R,d?(A=J(A,H,K,O,X,Z),u+=R*A[0],x+=R*A[1],z+=R*A[2]):(A=G(A,H,O,X),u+=R*A[0],x+=R*A[1]))}return 0<q?d?[u/q,x/q,z/q]:[u/q,x/q]:0<c?d?[a[b],a[b+
1],a[b+2]]:[a[b],a[b+1]]:null}function F(a,b,c,d){a=c-a;b=d-b;return Math.sqrt(a*a+b*b)}function P(a,b,c,d,g,e){a=d-a;b=g-b;c=e-c;return Math.sqrt(a*a+b*b+c*c)}function G(a,b,c,d){return[a+.5*(c-a),b+.5*(d-b)]}function J(a,b,c,d,g,e){return[a+.5*(d-a),b+.5*(g-b),c+.5*(e-c)]}Object.defineProperty(w,"__esModule",{value:!0});var T=h.getLogger("esri.tasks.support.optimizedFeatureSet"),ca={esriGeometryPoint:0,esriGeometryPolyline:2,esriGeometryPolygon:3,esriGeometryMultipoint:0},ba=function(a,b,c,d,g,
e){a[c]=g;a[c+1]=e},U=function(a,b,c,d,g,e){a[c]=g;a[c+1]=e;a[c+2]=b[d+2]},ia=function(a,b,c,d,g,e){a[c]=g;a[c+1]=e;a[c+2]=b[d+2];a[c+3]=b[d+3]};w.quantizeX=p;w.quantizeY=r;w.hydrateX=n;w.hydrateY=E;var fa=function(){return function(){this.spatialReference=this.geometryType=this.geometryProperties=this.geohashFieldName=this.globalIdFieldName=this.objectIdFieldName=null;this.hasM=this.hasZ=!1;this.features=[];this.fields=[];this.transform=null;this.exceededTransferLimit=!1}}();w.OptimizedFeatureSet=
fa;var Q=function(){return function(a,b){void 0===a&&(a=[]);void 0===b&&(b=[]);this.lengths=a;this.coords=b}}();w.OptimizedGeometry=Q;var da=function(){return function(a,b,c){void 0===a&&(a=null);void 0===b&&(b={});this.geometry=a;this.attributes=b;c&&(this.centroid=c)}}();w.OptimizedFeature=da;w.convertToPoint=function(a,b,c){return b?c?D(a):Y(a):c?ea(a):M(a)};w.convertToMultipoint=I;w.convertToPolyline=t;w.convertToPolygon=B;w.convertFromFeatures=m;w.convertToFeatureSet=function(a){var b=[],c=a.objectIdFieldName,
d=a.spatialReference,g=a.transform,e=a.fields,k=a.hasM,q=a.hasZ,u=a.features,x=a.geometryType;a=a.exceededTransferLimit;switch(x){case "esriGeometryPoint":b=M;k&&q?b=D:k?b=Y:q&&(b=ea);for(var z=[],v=0;v<u.length;v++){var y=u[v],A=y.geometry;y=y.attributes;A=A?b(A):null;z.push({attributes:y,geometry:A})}b=z;break;case "esriGeometryMultipoint":b=[];for(z=0;z<u.length;z++)A=u[z],v=A.geometry,A=A.attributes,y=void 0,v&&(y=I(v,q,k)),b.push({attributes:A,geometry:y});break;case "esriGeometryPolyline":b=
[];for(z=0;z<u.length;z++)A=u[z],v=A.geometry,A=A.attributes,y=void 0,v&&(y=t(v,q,k)),b.push({attributes:A,geometry:y});break;case "esriGeometryPolygon":b=[];for(z=0;z<u.length;z++){y=u[z];A=y.geometry;v=y.attributes;var H=y.centroid;y=void 0;A&&(y=B(A,q,k));H?(A=M(H),b.push({attributes:v,centroid:A,geometry:y})):b.push({attributes:v,geometry:y})}break;default:T.error("convertToFeatureSet:unknown-geometry",new C("Unable to parse unknown geometry type "+x))}c={features:b,fields:e,geometryType:x,objectIdFieldName:c,
spatialReference:d};g&&(c.transform=g);a&&(c.exceededTransferLimit=a);k&&(c.hasM=k);q&&(c.hasZ=q);return c};w.convertFromFeatureSet=function(a){var b=new fa,c=a.hasM,d=a.hasZ,g=a.features,e=a.objectIdFieldName,k=a.spatialReference,q=a.geometryType,u=a.exceededTransferLimit,x=a.transform;b.fields=a.fields;b.geometryType=q;b.objectIdFieldName=e;b.spatialReference=k;b.features=m(g,q,d,c);u&&(b.exceededTransferLimit=u);c&&(b.hasM=c);d&&(b.hasZ=d);x&&(b.transform=x);return b};w.hydrateOptimizedFeatureSet=
function(a){var b=a.transform,c=a.hasM,d=a.hasZ;if(!b)return a;for(var g=0,e=a.features;g<e.length;g++){var k=e[g];V(k.geometry,k.geometry,c,d,b);k.centroid&&V(k.centroid,k.centroid,c,d,b)}a.transform=null;return a};w.quantizeOptimizedFeatureSet=function(a,b){var c=b.geometryType,d=b.features,g=b.hasM,e=b.hasZ;if("esriGeometryEnvelope"===c)return T.error(new C("optimized-features:invalid-geometry-type",'FeatureSet with geometry type "'+c+'" is not supported')),b;if(!a)return b;for(var k=0;k<d.length;k++){var q=
d[k],u=new da(new Q,q.attributes);N(u.geometry,q.geometry,g,e,c,a);q.centroid&&(u.centroid=new Q,N(u.centroid,q.centroid,g,e,"esriGeometryPoint",a));d[k]=u}b.transform=a;return b};w.quantizeOptimizedGeometry=N;w.quantizeOptimizedGeometryRemoveCollinear=function(a,b,c,d,g,e){g=ca[g];var k=b.coords;b=b.lengths;var q=c?d?4:3:d?3:2;c=c?d?ia:U:d?U:ba;a.lengths.length=0;a.coords.length=0;if(!k.length)return a;if(!b.length)return c(a.coords,k,0,0,p(e,k[0]),r(e,k[1])),a.lengths.length=0,a.coords.length=q,
a;for(var u,x,z,v=0,y,A=0,H=0;H<b.length;H++){var K=b[H];if(!(K<g)){var O=0;y=A;d=u=p(e,k[v]);z=x=r(e,k[v+1]);c(a.coords,k,y,v,d,z);O++;v+=q;for(var X=!1,Z=0,R=0,ja=1;ja<K;ja++,v+=q)if(d=p(e,k[v]),z=r(e,k[v+1]),d!==u||z!==x)u=d-u,x=z-x,X&&(0===Z&&0===u||0===R&&0===x)?(Z+=u,R+=x):(X=!0,Z=u,R=x,y+=q,O++),c(a.coords,k,y,v,Z,R),u=d,x=z;X&&(y+=q,c(a.coords,k,y,v,Z,R));O>=g&&(a.lengths.push(O),A=y)}}a.coords.length=A;return a.coords.length?a:null};w.getBoundsOptimizedGeometry=function(a,b,c,d){c=c?d?4:
3:d?3:2;b=b.coords;for(var g=d=Number.POSITIVE_INFINITY,e=Number.NEGATIVE_INFINITY,k=Number.NEGATIVE_INFINITY,q=0;q<b.length;q+=c){var u=b[q],x=b[q+1];d=Math.min(d,u);e=Math.max(e,u);g=Math.min(g,x);k=Math.max(k,x)}a[0]=d;a[1]=g;a[2]=e;a[3]=k;return a};w.getQuantizedBoundsOptimizedGeometry=function(a,b,c,d){c=c?d?4:3:d?3:2;d=b.coords;var g=Number.POSITIVE_INFINITY,e=Number.POSITIVE_INFINITY,k=Number.NEGATIVE_INFINITY,q=Number.NEGATIVE_INFINITY,u=0,x=0;for(b=b.lengths;x<b.length;x++){var z=b[x],v=
d[u],y=d[u+1];g=Math.min(v,g);e=Math.min(y,e);k=Math.max(v,k);q=Math.max(y,q);u+=c;for(var A=1;A<z;A++,u+=c){var H=d[u],K=d[u+1];v+=H;y+=K;0>H&&(g=Math.min(g,v));0<H&&(k=Math.max(k,v));0>K?e=Math.min(e,y):0<K&&(q=Math.max(q,y))}}a[0]=g;a[1]=e;a[2]=k;a[3]=q;return a};w.hydrateOptimizedGeometry=V;w.getCentroidOptimizedGeometry=function(a,b,c,d){if(!b||!b.lengths.length)return null;a.lengths.length=0;a.coords.length=0;for(var g=a.coords,e=[],k=c?[Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY,
Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY]:[Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY],q=b.lengths,u=b.coords,x=c?d?4:3:d?3:2,z=0,v=0;v<q.length;v++){var y=q[v],A=W(k,u,z,y,c,d);A&&e.push(A);z+=y*x}e.sort(function(H,K){var O=H[2]-K[2];0===O&&c&&(O=H[4]-K[4]);return O});e.length&&(x=6*e[0][2],g[0]=e[0][0]/x,g[1]=e[0][1]/x,c&&(x=6*e[0][4],g[2]=0!==x?e[0][3]/x:0),g[0]<k[0]||g[0]>k[1]||g[1]<k[2]||g[1]>k[3]||c&&
(g[2]<k[4]||g[2]>k[5]))&&(g.length=0);if(!g.length)if(b=b.lengths[0]?L(u,0,q[0],c,d):null)g[0]=b[0],g[1]=b[1],c&&2<b.length&&(g[2]=b[2]);else return null;return a};w.lineCentroid=L;w.getLength2D=F;w.getLength3D=P;w.getMidpoint2D=G;w.getMidpoint3D=J})},"*now":function(S){S(['dojo/i18n!*preload*esri/tasks/support/nls/pbfDeps*["ar","bs","ca","cs","da","de","de-ch","el","en-au","en-ca","en-gb","en-us","es","es-mx","et","fi","fr","fr-ch","he","hr","hu","id","it","it-ch","ja","ko","lt","lv","nl","nb","pl","pt","pt-br","pt-pt","ro","ru","sk","sl","sr","sv","th","tr","uk","vi","zh-cn","zh-hk","zh-tw","ROOT"]'])},
"*noref":1}});define("esri/tasks/support/pbfDeps",["../../layers/vectorTiles/tasks/operations/pbfQueryUtils","../../layers/vectorTiles/layers/graphics/optimizedFeatures"],function(S,w){return{pbfQueryUtils:S,optimizedFeatures:w}});