//>>built
define("dijit/_KeyNavMixin","dojo/_base/array dojo/_base/declare dojo/dom-attr dojo/keys dojo/_base/lang dojo/on dijit/registry dijit/_FocusMixin".split(" "),function(t,q,l,f,d,g,n,r){return q("dijit._KeyNavMixin",r,{tabIndex:"0",childSelector:null,postCreate:function(){this.inherited(arguments);l.set(this.domNode,"tabIndex",this.tabIndex);if(!this._keyNavCodes){var a=this._keyNavCodes={};a[f.HOME]=d.hitch(this,"focusFirstChild");a[f.END]=d.hitch(this,"focusLastChild");a[this.isLeftToRight()?f.LEFT_ARROW:
f.RIGHT_ARROW]=d.hitch(this,"_onLeftArrow");a[this.isLeftToRight()?f.RIGHT_ARROW:f.LEFT_ARROW]=d.hitch(this,"_onRightArrow");a[f.UP_ARROW]=d.hitch(this,"_onUpArrow");a[f.DOWN_ARROW]=d.hitch(this,"_onDownArrow")}var b=this;a="string"==typeof this.childSelector?this.childSelector:d.hitch(this,"childSelector");this.own(g(this.domNode,"keypress",d.hitch(this,"_onContainerKeypress")),g(this.domNode,"keydown",d.hitch(this,"_onContainerKeydown")),g(this.domNode,"focus",d.hitch(this,"_onContainerFocus")),
g(this.containerNode,g.selector(a,"focusin"),function(c){b._onChildFocus(n.getEnclosingWidget(this),c)}))},_onLeftArrow:function(){},_onRightArrow:function(){},_onUpArrow:function(){},_onDownArrow:function(){},focus:function(){this.focusFirstChild()},_getFirstFocusableChild:function(){return this._getNextFocusableChild(null,1)},_getLastFocusableChild:function(){return this._getNextFocusableChild(null,-1)},focusFirstChild:function(){this.focusChild(this._getFirstFocusableChild())},focusLastChild:function(){this.focusChild(this._getLastFocusableChild())},
focusChild:function(a,b){a&&(this.focusedChild&&a!==this.focusedChild&&this._onChildBlur(this.focusedChild),a.set("tabIndex",this.tabIndex),a.focus(b?"end":"start"))},_onContainerFocus:function(a){a.target!==this.domNode||this.focusedChild||this.focus()},_onFocus:function(){l.set(this.domNode,"tabIndex","-1");this.inherited(arguments)},_onBlur:function(a){l.set(this.domNode,"tabIndex",this.tabIndex);this.focusedChild&&(this.focusedChild.set("tabIndex","-1"),this.lastFocusedChild=this.focusedChild,
this._set("focusedChild",null));this.inherited(arguments)},_onChildFocus:function(a){a&&a!=this.focusedChild&&(this.focusedChild&&!this.focusedChild._destroyed&&this.focusedChild.set("tabIndex","-1"),a.set("tabIndex",this.tabIndex),this.lastFocused=a,this._set("focusedChild",a))},_searchString:"",multiCharSearchDuration:1E3,onKeyboardSearch:function(a,b,c,h){a&&this.focusChild(a)},_keyboardSearchCompare:function(a,b){var c=a.domNode;a=(a.label||(c.focusNode?c.focusNode.label:"")||c.innerText||c.textContent||
"").replace(/^\s+/,"").substr(0,b.length).toLowerCase();return b.length&&a==b?-1:0},_isFormElement:function(a){return"INPUT"===a.tagName||"TEXTAREA"===a.tagName||"SELECT"===a.tagName||"BUTTON"===a.tagName},_onContainerKeydown:function(a){if(!this._isFormElement(document.activeElement)){var b=this._keyNavCodes[a.keyCode];b?(b(a,this.focusedChild),a.stopPropagation(),a.preventDefault(),this._searchString=""):a.keyCode!=f.SPACE||!this._searchTimer||a.ctrlKey||a.altKey||a.metaKey||(a.stopImmediatePropagation(),
a.preventDefault(),this._keyboardSearch(a," "))}},_onContainerKeypress:function(a){this._isFormElement(document.activeElement)||a.charCode<=f.SPACE||a.ctrlKey||a.altKey||a.metaKey||(a.preventDefault(),a.stopPropagation(),this._keyboardSearch(a,String.fromCharCode(a.charCode).toLowerCase()))},_keyboardSearch:function(a,b){var c=null,h,m=0;d.hitch(this,function(){this._searchTimer&&this._searchTimer.remove();this._searchString+=b;var k=/^(.)\1*$/.test(this._searchString)?1:this._searchString.length;
h=this._searchString.substr(0,k);this._searchTimer=this.defer(function(){this._searchTimer=null;this._searchString=""},this.multiCharSearchDuration);var e=this.focusedChild||null;if(1==k||!e)if(e=this._getNextFocusableChild(e,1),!e)return;k=e;do{var p=this._keyboardSearchCompare(e,h);p&&0==m++&&(c=e);if(-1==p){m=-1;break}e=this._getNextFocusableChild(e,1)}while(e&&e!=k)})();this.onKeyboardSearch(c,a,h,m)},_onChildBlur:function(){},_getNextFocusableChild:function(a,b){var c=a;do{if(a)a=this._getNext(a,
b);else if(a=this[0<b?"_getFirst":"_getLast"](),!a)break;if(null!=a&&a!=c&&a.isFocusable())return a}while(a!=c);return null},_getFirst:function(){return null},_getLast:function(){return null},_getNext:function(a,b){if(a)for(a=a.domNode;a;)if((a=a[0>b?"previousSibling":"nextSibling"])&&"getAttribute"in a){var c=n.byNode(a);if(c)return c}return null}})});