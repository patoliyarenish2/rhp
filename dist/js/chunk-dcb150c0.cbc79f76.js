(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dcb150c0"],{"0118":function(e,t,a){"use strict";var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("input",{directives:[{name:"model",rawName:"v-model",value:e.autocompleteText,expression:"autocompleteText"}],ref:"autocomplete",class:e.classname,attrs:{type:"text",id:e.id,placeholder:e.placeholder,disabled:e.disabled},domProps:{value:e.autocompleteText},on:{focus:function(t){return e.onFocus()},blur:function(t){return e.onBlur()},change:e.onChange,keypress:e.onKeyPress,keyup:e.onKeyUp,input:function(t){t.target.composing||(e.autocompleteText=t.target.value)}}})},i=[],r=(a("a4d3"),a("e01a"),a("d3b7"),a("d28b"),a("3ca3"),a("ddb0"),a("06c5"));function s(e,t){var a="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!a){if(Array.isArray(e)||(a=Object(r["a"])(e))||t&&e&&"number"===typeof e.length){a&&(e=a);var o=0,i=function(){};return{s:i,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,n=!0,l=!1;return{s:function(){a=a.call(e)},n:function(){var e=a.next();return n=e.done,e},e:function(e){l=!0,s=e},f:function(){try{n||null==a["return"]||a["return"]()}finally{if(l)throw s}}}}a("caad"),a("2532"),a("99af");var n={subpremise:"short_name",street_number:"short_name",route:"long_name",locality:"long_name",administrative_area_level_1:"short_name",administrative_area_level_2:"long_name",country:"long_name",postal_code:"short_name"},l=["locality","administrative_area_level_3"],d=["locality","sublocality","postal_code","country","administrative_area_level_1","administrative_area_level_2"],c=["address_components","adr_address","alt_id","formatted_address","geometry","icon","id","name","permanently_closed","photo","place_id","scope","type","url","utc_offset","vicinity"],u={name:"VueGoogleAutocomplete",props:{id:{type:String,required:!0},classname:String,placeholder:{type:String,default:"Start typing"},disabled:{type:Boolean,default:!1},types:{type:String,default:"address"},fields:{type:Array,default:function(){return c}},country:{type:[String,Array],default:null},enableGeolocation:{type:Boolean,default:!1},geolocationOptions:{type:Object,default:null}},data:function(){return{autocomplete:null,autocompleteText:"",geolocation:{geocoder:null,loc:null,position:null}}},watch:{autocompleteText:function(e,t){this.$emit("inputChange",{newVal:e,oldVal:t},this.id)},country:function(e,t){this.autocomplete.setComponentRestrictions({country:null===this.country?[]:this.country})}},mounted:function(){var e={};this.types&&(e.types=[this.types]),this.country&&(e.componentRestrictions={country:this.country}),this.autocomplete=new google.maps.places.Autocomplete(document.getElementById(this.id),e),this.autocomplete.setFields(this.fields),this.autocomplete.addListener("place_changed",this.onPlaceChanged)},methods:{onPlaceChanged:function(){var e=this.autocomplete.getPlace();e.geometry?void 0!==e.address_components&&(this.$emit("placechanged",this.formatResult(e),e,this.id),this.autocompleteText=document.getElementById(this.id).value,this.onChange()):this.$emit("no-results-found",e,this.id)},onFocus:function(){this.biasAutocompleteLocation(),this.$emit("focus")},onBlur:function(){this.$emit("blur")},onChange:function(){this.$emit("change",this.autocompleteText)},onKeyPress:function(e){this.$emit("keypress",e)},onKeyUp:function(e){this.$emit("keyup",e)},clear:function(){this.autocompleteText=""},focus:function(){this.$refs.autocomplete.focus()},blur:function(){this.$refs.autocomplete.blur()},update:function(e){this.autocompleteText=e},updateCoordinates:function(e){var t=this;(e||e.lat||e.lng)&&(this.geolocation.geocoder||(this.geolocation.geocoder=new google.maps.Geocoder),this.geolocation.geocoder.geocode({location:e},(function(e,a){"OK"===a?(e=t.filterGeocodeResultTypes(e),e[0]?(t.$emit("placechanged",t.formatResult(e[0]),e[0],t.id),t.update(e[0].formatted_address)):t.$emit("error","no result for provided coordinates")):t.$emit("error","error getting address from coords")})))},geolocate:function(){var e=this;this.updateGeolocation((function(t,a){e.updateCoordinates(t)}))},updateGeolocation:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if(navigator.geolocation){var a={};this.geolocationOptions&&Object.assign(a,this.geolocationOptions),navigator.geolocation.getCurrentPosition((function(a){var o={lat:a.coords.latitude,lng:a.coords.longitude};e.geolocation.loc=o,e.geolocation.position=a,t&&t(o,a)}),(function(t){e.$emit("error","Cannot get Coordinates from navigator",t)}),a)}},biasAutocompleteLocation:function(){var e=this;this.enableGeolocation&&this.updateGeolocation((function(t,a){var o=new google.maps.Circle({center:t,radius:a.coords.accuracy});e.autocomplete.setBounds(o.getBounds())}))},formatResult:function(e){for(var t={},a=0;a<e.address_components.length;a++){var o=e.address_components[a].types[0];if(n[o]){var i=e.address_components[a][n[o]];t[o]=i}}return t["latitude"]=e.geometry.location.lat(),t["longitude"]=e.geometry.location.lng(),t},filterGeocodeResultTypes:function(e){if(!e||!this.types)return e;var t=[],a=[this.types];a.includes("(cities)")&&(a=a.concat(l)),a.includes("(regions)")&&(a=a.concat(d));var o,i=s(e);try{for(i.s();!(o=i.n()).done;){var r,n=o.value,c=s(n.types);try{for(c.s();!(r=c.n()).done;){var u=r.value;if(a.includes(u)){t.push(n);break}}}catch(p){c.e(p)}finally{c.f()}}}catch(p){i.e(p)}finally{i.f()}return t}}},p=u,m=a("2877"),f=Object(m["a"])(p,o,i,!1,null,null,null);t["a"]=f.exports},2532:function(e,t,a){"use strict";var o=a("23e7"),i=a("5a34"),r=a("1d80"),s=a("ab13");o({target:"String",proto:!0,forced:!s("includes")},{includes:function(e){return!!~String(r(this)).indexOf(i(e),arguments.length>1?arguments[1]:void 0)}})},"2c1b":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"login-main"},[a("nav-bar"),a("section",{staticClass:"add-address-main"},[a("div",{staticClass:"review-container review-main text-capitalize position-relative"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12 p-0"},[a("div",{staticClass:"resturant-details d-flex align-items-center justify-content-between plr15"},[a("div",{staticClass:"del-address"},[a("h4",{},[e._v("Add Delivery Address")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.typeform.address,expression:"typeform.address"}],staticClass:"mb-0",attrs:{type:"hidden"},domProps:{value:e.typeform.address},on:{input:function(t){t.target.composing||e.$set(e.typeform,"address",t.target.value)}}}),e._v(" "+e._s(this.typeform.address)+" ")]),a("a",{directives:[{name:"b-modal",rawName:"v-b-modal.scaleModal",modifiers:{scaleModal:!0}}],staticClass:"lnk change-address",on:{click:function(t){e.scaleModal=!0}}},[e._v("Change")]),a("b-modal",{attrs:{id:"scaleModal",tabindex:"-1","hide-header":"","hide-footer":""}},[a("div",{staticClass:"position-relative"},[a("div",{staticClass:"search-box d-inline-block"},[a("div",{staticClass:"position-relative"},[e.googleLoaded?a("vue-google-autocomplete",{staticClass:"form-control",attrs:{id:"map",type:"text",placeholder:"Search Location"},on:{placechanged:e.getAddressData},model:{value:e.typeform.address,callback:function(t){e.$set(e.typeform,"address",t)},expression:"typeform.address"}}):e._e(),a("i",{staticClass:"fas fa-search search-icon"})],1)]),a("b-button",{staticClass:"close",on:{click:function(t){e.scaleModal=!1}}},[e._v("Cancel")])],1)])],1),a("div",{staticClass:"responsive-map mt-3"},[a("GmapMap",{ref:"mapRef",staticStyle:{width:"100%",height:"300px"},attrs:{center:e.center,zoom:18,"map-style-id":"roadmap",options:e.mapOptions},on:{click:e.handleMapClick}},[a("GmapMarker",{attrs:{position:e.marker.position,clickable:!0,draggable:!0},on:{drag:e.handleMarkerDrag,click:e.panToMarker}})],1)],1),a("div",{staticClass:"plr15"},[a("div",{staticClass:"review-boxs mt-4"},[a("div",{staticClass:"mt-4 position-relative"},[a("h6",{staticClass:"mb-2"},[e._v("House/Building Name")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.$v.typeform.house_name.$model,expression:"$v.typeform.house_name.$model"}],staticClass:"form-control mb-0 h50",class:{"is-invalid":e.$v.typeform.house_name.$error},attrs:{type:"text",placeholder:"Enter House/Building Name","aria-label":"House/Building Name"},domProps:{value:e.$v.typeform.house_name.$model},on:{input:function(t){t.target.composing||e.$set(e.$v.typeform.house_name,"$model",t.target.value)}}}),e.$v.typeform.house_name.$error?a("div",{staticClass:"invalid-feedback"},[e.$v.typeform.house_name.required?e._e():a("span",[e._v("Enter House/Building Name.")])]):e._e()]),a("div",{staticClass:"mt-4 position-relative"},[a("h6",{staticClass:"mb-2"},[e._v("Flat Number/Floor")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.$v.typeform.flat_no.$model,expression:"$v.typeform.flat_no.$model"}],staticClass:"form-control mb-0 h50",class:{"is-invalid":e.$v.typeform.flat_no.$error},attrs:{type:"text",placeholder:"Enter Flat/ Floor Number","aria-label":"Flat Number/ Floor"},domProps:{value:e.$v.typeform.flat_no.$model},on:{input:function(t){t.target.composing||e.$set(e.$v.typeform.flat_no,"$model",t.target.value)}}}),e.$v.typeform.flat_no.$error?a("div",{staticClass:"invalid-feedback"},[e.$v.typeform.flat_no.required?e.$v.typeform.flat_no.numeric?e._e():a("span",[e._v("This value should be a number")]):a("span",[e._v("Enter Flat/ Floor Number")])]):e._e()]),a("div",{staticClass:"mt-4 position-relative"},[a("h6",{staticClass:"mb-2"},[e._v("Landmark")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.typeform.landmark,expression:"typeform.landmark"}],staticClass:"form-control mb-0 h50",attrs:{type:"text",placeholder:"Enter Landmark","aria-label":"Landmark"},domProps:{value:e.typeform.landmark},on:{input:function(t){t.target.composing||e.$set(e.typeform,"landmark",t.target.value)}}})])]),a("div",{staticClass:"mt-4 mb-4"},[a("h6",{staticClass:"mb-3"},[e._v("Set tag for Address")]),a("form",{staticClass:"boxed d-flex"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.typeform.address_clarification,expression:"typeform.address_clarification"}],attrs:{type:"radio",id:"home",name:"Home",value:"Home"},domProps:{checked:e._q(e.typeform.address_clarification,"Home")},on:{change:function(t){return e.$set(e.typeform,"address_clarification","Home")}}}),a("label",{attrs:{for:"home"}},[e._v("Home")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.typeform.address_clarification,expression:"typeform.address_clarification"}],attrs:{type:"radio",id:"office",name:"office",value:"Office"},domProps:{checked:e._q(e.typeform.address_clarification,"Office")},on:{change:function(t){return e.$set(e.typeform,"address_clarification","Office")}}}),a("label",{attrs:{for:"office"}},[e._v("Office")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.typeform.address_clarification,expression:"typeform.address_clarification"}],attrs:{type:"radio",id:"other",name:"other",value:"Other"},domProps:{checked:e._q(e.typeform.address_clarification,"Other")},on:{change:function(t){return e.$set(e.typeform,"address_clarification","Other")}}}),a("label",{attrs:{for:"other"}},[e._v("Other")])])])]),a("div",{staticClass:"delivery-address border-0"},[a("div",{staticClass:"full-btn"},[a("button",{on:{click:e.geoAddress}},[e._v("Update Address")])])])])])])])],1)},i=[],r=a("5530"),s=(a("ac1f"),a("1276"),a("4de4"),a("a9e3"),a("2f62")),n=a("d000"),l=a("b5ae"),d=a("0118"),c={name:"GoogleMap",components:{NavBar:n["a"],VueGoogleAutocomplete:d["a"]},data:function(){return{googleLoaded:!1,marker:{position:{lat:10,lng:10}},center:{lat:10,lng:10},scaleModal:!1,mapOptions:{disableDefaultUI:!0},select_address:"",typeform:{city:"",address_clarification:"Home",landmark:"",address:"",is_langauge:"",state:"",vendor_id:window.location.pathname.split("/")[2],flat_no:"",house_name:"",latitude:"",zip_code:"",longitude:"",shiping_id:this.$route.params.shiping_id}}},validations:{typeform:{address:{required:l["required"]},house_name:{required:l["required"]},flat_no:{required:l["required"],numeric:l["numeric"]}}},computed:Object(r["a"])({},Object(s["c"])("address",["addAddress","addressList"])),mounted:function(){var e=this;this.geolocate(),this.select_address=this.addressList.filter((function(t){return t.shiping_id==e.$route.params.shiping_id})),this.typeform={city:this.select_address[0].city,address_clarification:this.select_address[0].adress_clarification,landmark:this.select_address[0].landmark,address:this.select_address[0].Shiping_address,is_langauge:"",state:this.select_address[0].state,vendor_id:window.location.pathname.split("/")[2],flat_no:this.select_address[0].flat_no,house_name:this.select_address[0].house_name,latitude:this.select_address[0].latitude,zip_code:this.select_address[0].zip_code,longitude:this.select_address[0].longitude,shiping_id:this.select_address[0].shiping_id},this.$gmapApiPromiseLazy().then((function(){e.googleLoaded=!0}))},methods:Object(r["a"])(Object(r["a"])({},Object(s["b"])("address",["newAddress"])),{},{geolocate:function(){var e=this;navigator.geolocation.getCurrentPosition((function(t){""==e.typeform.latitude&&""==e.typeform.longitude?e.marker.position={lat:t.coords.latitude,lng:t.coords.longitude}:e.marker.position={lat:Number(e.typeform.latitude),lng:Number(e.typeform.longitude)},e.panToMarker(),""==e.typeform.latitude&&""==e.typeform.longitude?e.locateAddress(t.coords.latitude,t.coords.longitude):e.locateAddress(e.typeform.latitude,e.typeform.longitude)}))},handleMarkerDrag:function(e){this.marker.position={lat:e.latLng.lat(),lng:e.latLng.lng()},this.locateAddress(e.latLng.lat(),e.latLng.lng())},locateAddress:function(e,t){var a=this,o=new window.google.maps.Geocoder;o.geocode({location:{lat:e,lng:t}},(function(e,t){if("OK"===t){a.typeform.address=e[0].formatted_address;var o=a.typeform.address.split(", "),i=a.typeform.address.split(" "),r=o.length,s=i.length;a.typeform.state=i[s-3],a.typeform.city=o[r-3],a.typeform.zip_code=i[s-2],a.typeform.latitude=a.marker.position.lat,a.typeform.longitude=a.marker.position.lng}}))},panToMarker:function(){this.$refs.mapRef.panTo(this.marker.position)},handleMapClick:function(e){this.marker.position={lat:e.latLng.lat(),lng:e.latLng.lng()},this.locateAddress(e.latLng.lat(),e.latLng.lng())},getAddressData:function(e,t){this.typeform.address=t.formatted_address,this.typeform.latitude=e.latitude,this.typeform.longitude=e.longitude,this.marker.position={lat:e.latitude,lng:e.longitude},this.$refs.mapRef.panTo(this.marker.position),this.$bvModal.hide("scaleModal")},geoAddress:function(){var e=this;if(this.$v.$touch(),!this.$v.typeform.$invalid){var t=new FormData;t.append("city",this.typeform.city),t.append("address_clarification",this.typeform.address_clarification),t.append("landmark",this.typeform.landmark),t.append("address",this.typeform.address),t.append("is_langauge",this.typeform.is_langauge),t.append("state",this.typeform.state),t.append("vendor_id",this.typeform.vendor_id),t.append("flat_no",this.typeform.flat_no),t.append("house_name",this.typeform.house_name),t.append("latitude",this.typeform.latitude),t.append("zip_code",this.typeform.zip_code),t.append("longitude",this.typeform.longitude),t.append("shiping_id",this.typeform.shiping_id),this.newAddress(t).then((function(t){200==t.code&&(e.$toasted.success("Address updated successfully",{duration:5e3}),e.$router.push({name:"address"}))}))}}})},u=c,p=a("2877"),m=Object(p["a"])(u,o,i,!1,null,null,null);t["default"]=m.exports},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,a){var o=a("1d80"),i=a("5899"),r="["+i+"]",s=RegExp("^"+r+r+"*"),n=RegExp(r+r+"*$"),l=function(e){return function(t){var a=String(o(t));return 1&e&&(a=a.replace(s,"")),2&e&&(a=a.replace(n,"")),a}};e.exports={start:l(1),end:l(2),trim:l(3)}},"5a34":function(e,t,a){var o=a("44e7");e.exports=function(e){if(o(e))throw TypeError("The method doesn't accept regular expressions");return e}},7156:function(e,t,a){var o=a("861d"),i=a("d2bb");e.exports=function(e,t,a){var r,s;return i&&"function"==typeof(r=t.constructor)&&r!==a&&o(s=r.prototype)&&s!==a.prototype&&i(e,s),e}},a9e3:function(e,t,a){"use strict";var o=a("83ab"),i=a("da84"),r=a("94ca"),s=a("6eeb"),n=a("5135"),l=a("c6b6"),d=a("7156"),c=a("c04e"),u=a("d039"),p=a("7c73"),m=a("241c").f,f=a("06cf").f,h=a("9bf2").f,g=a("58a8").trim,v="Number",y=i[v],_=y.prototype,b=l(p(_))==v,$=function(e){var t,a,o,i,r,s,n,l,d=c(e,!1);if("string"==typeof d&&d.length>2)if(d=g(d),t=d.charCodeAt(0),43===t||45===t){if(a=d.charCodeAt(2),88===a||120===a)return NaN}else if(48===t){switch(d.charCodeAt(1)){case 66:case 98:o=2,i=49;break;case 79:case 111:o=8,i=55;break;default:return+d}for(r=d.slice(2),s=r.length,n=0;n<s;n++)if(l=r.charCodeAt(n),l<48||l>i)return NaN;return parseInt(r,o)}return+d};if(r(v,!y(" 0o1")||!y("0b1")||y("+0x1"))){for(var C,k=function(e){var t=arguments.length<1?0:e,a=this;return a instanceof k&&(b?u((function(){_.valueOf.call(a)})):l(a)!=v)?d(new y($(t)),a,k):$(t)},x=o?m(y):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),w=0;x.length>w;w++)n(y,C=x[w])&&!n(k,C)&&h(k,C,f(y,C));k.prototype=_,_.constructor=k,s(i,v,k)}},ab13:function(e,t,a){var o=a("b622"),i=o("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(a){try{return t[i]=!1,"/./"[e](t)}catch(o){}}return!1}},caad:function(e,t,a){"use strict";var o=a("23e7"),i=a("4d64").includes,r=a("44d2");o({target:"Array",proto:!0},{includes:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),r("includes")}}]);
//# sourceMappingURL=chunk-dcb150c0.cbc79f76.js.map