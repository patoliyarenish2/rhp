(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7b936a0a"],{"35aa":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"login-main"},[s("nav-bar"),s("section",{staticClass:"order-details-start"},[s("div",{staticClass:"review-container review-main text-capitalize position-relative"},[s("div",{staticClass:"row"},t._l(t.ordersDetail,(function(e,a){return s("div",{key:a,staticClass:"col-md-12 p-0"},[s("div",{staticClass:"resturant-details plr15 order-id"},[s("h4",{staticClass:"text-left"},[t._v("Order #"+t._s(e.order_id))])]),s("div",{staticClass:"orders-inner-main plr15 mt-2"},[s("div",{staticClass:"orders-lst"},[s("div",{staticClass:"order-item d-flex align-items-start pb-4"},[s("img",{attrs:{src:e.restaurant_image}}),s("div",{staticClass:"order-data ml-3 d-flex align-items-start justify-content-between w-100"},[s("div",{staticClass:"orderid-main"},[s("h6",{staticClass:"mb-0"},[t._v(t._s(e.restaurant_name))]),s("p",{staticClass:"mt-1"},[t._v(t._s(e.cuisine_name.join(", ")))]),s("a",{staticClass:"mt-2 d-inline-block",attrs:{href:"tel:"+e.support_contact_number}},[s("i",{staticClass:"fas fa-phone-alt"}),t._v(" Call ")])])])]),s("div",{staticClass:"inner-data"},[s("h6",{staticClass:"mb-1 mt-3"},[t._v("Your Order")]),t._l(e.restaurant_item_details,(function(e,a){return s("div",{key:a,staticClass:"order-history-main"},[s("div",{staticClass:"order-histry d-flex justify-content-between align-items-start"},[s("div",{staticClass:"histry-name item-heading delivery-link"},[0==e.item_type?s("div",{staticClass:"veg"},[s("span")]):1==e.item_type?s("div",{staticClass:"non-veg"},[s("span")]):2==e.item_type?s("div",[s("span")]):t._e(),s("p",{staticClass:"mb-0"},[t._v(t._s(e.restaurant_menu_item_name))]),s("span",[t._v(t._s(e.quantity)+" item")])]),s("div",{staticClass:"histry-price"},[s("span",{domProps:{innerHTML:t._s(t.currencys)}}),t._v(" "),s("span",[t._v(t._s(parseFloat(e.amount).toFixed(2)))])])])])})),s("div",{staticClass:"billing-data border-0 mt-2"},[s("h6",{staticClass:"mb-2"},[t._v("Billing Details")]),s("ul",[s("li",{staticClass:"d-flex justify-content-between"},[t._v(" SubTotal "),s("div",[s("span",{domProps:{innerHTML:t._s(t.currencys)}}),t._v(" "),s("span",[t._v(t._s(parseFloat(e.sub_total).toFixed(2)))])])]),s("li",{staticClass:"d-flex justify-content-between"},[t._v(" Delivery Charges "),s("div",[s("span",{domProps:{innerHTML:t._s(t.currencys)}}),t._v(" "),s("span",[t._v(t._s(parseFloat(e.delivery_fee).toFixed(2)))])])]),s("li",{staticClass:"d-flex justify-content-between"},[t._v(" GST "),s("div",[s("span",{domProps:{innerHTML:t._s(t.currencys)}}),t._v(" "),s("span",[t._v(t._s(parseFloat(e.service_fee).toFixed(2)))])])]),e.discount_price?s("li",{staticClass:"d-flex justify-content-between discount-price"},[t._v(" Discount "),s("div",[s("span",{domProps:{innerHTML:t._s(t.currencys)}}),t._v(" "),s("span",[t._v(t._s(parseFloat(e.discount_price).toFixed(2)))])])]):t._e(),s("li",{staticClass:"d-flex justify-content-between bold"},[t._v(" Total Paid "),s("div",[s("span",{domProps:{innerHTML:t._s(t.currencys)}}),t._v(" "),s("span",[t._v(t._s(parseFloat(e.total_amount).toFixed(2)))])])])])]),s("div",{staticClass:"billing-data border-0 mt-2"},[s("h6",{staticClass:"mb-2"},[t._v("Order Details")]),s("ul",[s("li",{staticClass:"d-flex justify-content-between"},[t._v(" Order Number "),s("span",[t._v("#"+t._s(e.order_id))])]),s("li",{staticClass:"d-flex justify-content-between"},[t._v(" Placed Date "),s("span",[t._v(t._s(t.moment(e.order_date).format("DD/MM/Y hh:mm A")))])]),s("li",{staticClass:"d-flex justify-content-between"},[t._v(" Order Type "),s("span",[t._v(t._s(e.delivery_pickup_types))])]),s("li",{staticClass:"d-flex justify-content-between"},[t._v(" Payment Mode "),s("span",[t._v(t._s(e.payment_method))])]),s("li",{staticClass:"d-flex justify-content-between delivery-locality"},[t._v(" Delivery Address "),s("span",[t._v(t._s(e.locality+", "+e.delivery_address))])])])])],2)])]),s("div",{staticClass:"tab-pane tab-box",attrs:{id:"past"}})])})),0)])])],1)},i=[],n=s("5530"),r=(s("ac1f"),s("1276"),s("d000")),l=s("2f62"),o=s("c1df"),A=s.n(o),c={components:{NavBar:r["a"]},data:function(){return{ordersDetail:[],moment:A.a,currencys:""}},computed:Object(n["a"])(Object(n["a"])(Object(n["a"])({},Object(l["c"])("order",["orderDetail"])),Object(l["c"])("setting",["settings"])),Object(l["d"])({currency:function(t){return t.setting.settings.currency}})),mounted:function(){this.orderDetails(),this.currencys=this.currency},methods:Object(n["a"])(Object(n["a"])({},Object(l["b"])("order",["viewOrderDetail"])),{},{orderDetails:function(){var t=this;this.viewOrderDetail({vendor_id:window.location.pathname.split("/")[2],order_id:this.$route.params.order_id,is_langauge:"en"}).then((function(e){200==e.code&&(t.ordersDetail=e.Result)}))}})},d=c,v=s("2877"),u=Object(v["a"])(d,a,i,!1,null,null,null);e["default"]=u.exports},"710d":function(t,e,s){t.exports=s.p+"img/deonde-icon.f1eed54d.svg"},"89a7":function(t,e){t.exports="data:image/png;base64,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"},c4cb:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL8AAAA4CAMAAACbgdlUAAAC1lBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////Nz0A8nAEBAT9/f37+/sODg5AQEACAgEGBgYICAhYWFjv7+/j4+N8fHwA0f/W1taqqqoAxf/s7OwcHBwYGBgUFBR4eHguLi4dHR0A3v9iYmJERERJSUkSEhL5+fm2trYnJycMDQ0LCwsA2v8A1v8Aw//39/fp6ena2trIyMgA3P8AyP/19fXMzMxycnJSUlJPT08Ay/8Ayv/x8fFVVVUQEBAA4P8A0/8Az/8Azf/z8/Pd3d1oaGgA2P+xsbGkpKSDg4NgYGBMTEwA1f/f39/Pz8/AwMCLi4s6OjoA4f9cXFwyMjL/1QD/yQD/wwAAx//l5eWdnZ0Aipybm5uWlpaHh4c9PT02NjYrKyv/zAC8vLx/f39sbGxlZWX/zgD/xwANuPLExMS4uLiNjY0A73T/0QDh4eHc3Ny+vr4AiJwB7HckJCQhISH/2gAA4v+6urq1tbWtra2np6eRkZF1dXUB7W36NjsjIyP+sgMYs+wfsObT09MA5M8A5sejo6Ofn58AgZ0AhZzNUGE4ODji4uIAztwA19kA3tUAfp0L7mkAw1pGRkb+TS6yJiutzhoAHA05DA0ACgQA4/8lrOEAe50A4mm/VWjFU2UA1GLUTVzYSlkAsFEAjEHxNDoAeTj+UC4AVSeKHiEAQh+m0xtPERMnCAkbBwYOAwP00AD/vwDQsgCslABvWgAqIwAXEwAQDQAAg50Aep0AdJYAfIu0WW+2V2wAUmy5V2utcV3cSFUARU0An0qdOkblMTfjMTbYLzTNLDEAZzAAXC7AKi4AUyaeIiadIiZ3Gh0ANhlhFRgALhZ1jRDwrALwwADpvwDbsQDFowC1nACVeABjUQBXSgBCOQBCNwD/Uw/dAAAAGXRSTlPphlilADEZCdOYjYJvYUT58vDgxa9N97kgNSI2aQAACHFJREFUaN7lmgWXElEYhu3u/l6dGRZQFEUQlFAsUFHs7u7u7u7u7u7u7u7u7voH3rkzYqCiGEf0OYedvcPMnueruXt2iRaLESdJooTRI4uEiWPHldVl/8QptBR5JE0ZW/FPEIn2MslSy/6JIlWfKHnsWNHiRKPIJVWsaDEogkmeLloCimSSRItJkUyM/9pfn7FN9UVEgj8Xo2HGXPxApK1ZIyoXx0oMd4021e1aIkeN9kR5ci2isAntL9zcvH0FfSftvGD0z643glHRBJlSREIhjAQnBxG1rQ1GbrO2Lgq5qQtyU0jC9784JUOGhbfpuxjkgbd6m+YuP/PPXa1aq9bV6qBftVbcv021rBKyVqtJZM2EOp3qedAxb12Io3+3/6mVU3pnyLDpPn0HU9E/L5GtMjH/diSTAy2IuL+DNAWhIcY05NYTtfegeF3AZf3N/i1XDmUVyDDm0jIKhd6LKCpenVHTiB7Dh3cK9udXSXZijELrujCgZ+ff7D906FC5AhnWbA0VQZm+UntqBcY0I+/wL/rnbe5qpJQma10Uay4O+93+DRo0mJxBZv0Ngb6FUAc1qGbmzEb0MqKYw9Eu2J9/L+YiRlVUrwt/F+A3+zP9smUnswowFu7U0tdhtiaHpkxGl2g3orjNll0I8udXiYYot7OYy2dl/pT7j/jn5BVgY7DpIX0dfVW4KtWWMCqvEaUyZapt+6K/pi67arYodhJkf2up3+1flunnzMkqwBmz+RtjkLdNbV9Fbw6dvr+BYbRR59o1uH9VQxS5+xncylWjZvsqTupClNngIOpkmEqhCd9f0S9ceB4PgA/yN/azMnkGueWDheEUSM9eMhqLjshpIRVnnnF52UEnnxUsGgpN+P6qfr588wZmUFnPduS/lWB/Vb9KfqUC6iDTX8rn/gMC+rXKzWUVUFnw6Aj9lQT5c/0qVWT/LHPfV2DMriZPXh6lv5Bgf559rp+lvFqBBbu6NenQ9enhYxSMuWG1SQbjiFw2+gHMdnuZoJNWO6cRH3u93T44LH+leRT9CiXmyAGMWdpU9u/T+OBr+gxdDgMUPJm19N1kBKKCTmYFRzS0dhJlBzKH5f+JfskiLIAFS5uq/o2HvPi0iZwjALFS7qlVvRLQ+qf9RZ/PV1AE6pjD9+ejG9DPlm3OwKUHPvgPOUQfkXc4UMkvd4LbUcc46Kf9M+VhtB0B5BbC9Z+hZD+gX6D7+fEf+x+kjxgNFDKTQhkz/bw/Pwo94bOG7f+5/un028Z/8N//5uMpzITmIYYsHH9aBGQM2z9//nIf659Jnz794vGq//5Dn+wCxYBOFIS+ffHS7TSkIOSpWbq+M7Ao7m8vOLNbuL/6bru8Qf5tgYaqv3tWxob1NUQam02vlNlmc3/T/9Psn0vPYBXg/s/fauljhgHjgvTr9ygISN4ufNGoY0VArJ1DIIatKlv4RmQ1dRS4v3JCKlr/c/8WcNVX/GsaJUD0NiS7x6SUo6rJ1Ohb/scD+s2Y/lrZnlegSYdnrz61J503kLB6Cm3MVNoF0WOQgHoCi8UEmAwuYJqOKM9sIJOBBYeiOu5v6wd4KhVExbYB/zIMW3URRfXcv7gEydCcfSmtN8LjJvZDSqHHN/tnerA+D+Bx8Oal7wcDcTpDQWpn8yBTw+wWuxGSn5x94Spms8zqAbEyCR0hVR9smVXnvb+2KlDdpmnnhbGM4s8qxTCxqKzE/aN6empazH42ZnkrQ6xBRJkBx7f9P+hPWBfQ33JnLwWhrQOX0pQ1KsmY4GqUA1JGYowzoaO2MjCaz3lzGHRRQGutvDCp/u0rohWRrTOrQmnVX6Fgf2tg/zK3dzjydIZUX98XHQUSjJjkDuEf6P0P+kuW05doBdRUOkkj0wmlBvVAX2Ueq6GifiRMyhzXg2TtxV7KXap/aaB+25EmwFvMrPr7ijFqWAV67++v4wJ8/SDWpE5wWak4z8g3/QPZn/ne/vpu+jJ2EcN0H8pRCF5dJRQlThvA0hNG5W1W/KhqkJx8kVn1ZycrAaWG+4XP5peh+meUUNBYyCtBLE7jMqE1DUMpy7f953+uf/XBPvoK2p6QOgdWDUX0oo/y72P5z+R+n/9Go97nv/WH/MOQOY+W6Gv++jow1NdT3mKyP01FxaiKaEMh/BX9iar+lh3M/qs0MkEarfgKpTPBZCa1/9mfFlm7VhZRjPe/gfW/nYXH+9+j+rNHyST5XqGm5iv+ZTLJE0K6qty/vQuVUGpcKP+Psz/27h76Jv6CEOvkmDXYWrkjKzUbQ/b8MVXWa+XnT2lyGuDL4aZ2PQD2/KmLgm2c1Kho4PmTFWjBflFrJRVt/2X/vEbUbkfmaSL3p6oAsmpD+K/m2d/A7W8tp1BEefEej58YGSsCBUsB0igtUVsT4GILsZpAZDWws5nYQvUnZx22KCUChZxf6f8cIsAu8Cj+NSWIdgrlH9C/tltLobEUUyIw9Rqs7mWFwGheQ+ANNkyU3yum5z1VlS3EkcNRVN1/za0lAL5ezq/Nry5HRQD9Syv+ThMKCaH8T2QrsGojs79yT6DvxFqjc8O2uo/WuSpHBW7O07CyI29gUaOLlbVBXRI0GoFHX7qy30kqeo2bAmg1Gp18gb9GfS3pdHIqS4ssjFD+JwtMZPpjd+ylX425UxQxhOZsKMNB2x9GN31KsP/ZVRfSj12yh345bAP1WoncrYHiFA71ReSgzwj2d18eu2S5ln4DXSSU6jnCKCK3QOHQEz4zBcH9/wzFTGBIuS0UDo186EVB/El/Gty5RbXqUXoKC5vDERz4v/D/3/gUyaSOlogimKSxo8VOQ5FLvLjRYqWiiEWbmH3+Kk48ilTi88+/xUkrUCSSLEFc7h8rbpL48aJFGClSJowdi/EOcHiAmMcVwq4AAAAASUVORK5CYII="},d000:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("header",{staticClass:"index-header header-start"},[s("div",{staticClass:"fixed-top header-main"},[s("nav",{staticClass:"navbar navbar-light bg-white"},[t._m(0),s("side-bar"),s("nav-right")],1)])])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex align-items-center"},[a("button",{staticClass:"navbar-toggler navbar-toggler-right border-0 p-0",attrs:{type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"}},[a("span",{staticClass:"navbar-toggler-icon"})]),a("div",{staticClass:"delivery-pickup-main d-flex align-items-center"},[a("div",{staticClass:"delivery-pickup-lnk"},[a("a",{staticClass:"active",attrs:{href:"#"}},[t._v("Delivery")]),a("a",{attrs:{href:"#"}},[t._v("Pickup")])]),a("a",{staticClass:"delivery-link",attrs:{href:"javascript:void(0)","data-toggle":"modal","data-target":"#deliverylocation"}},[t._v(" Delivery At "),a("span",[t._v('"Ahmedabad"')])])]),a("div",{staticClass:"logo-main"},[a("a",{staticClass:"desktop-logo",attrs:{href:"index.shtml"}},[a("img",{staticClass:"nav-logo",attrs:{src:s("e347")}})]),a("a",{staticClass:"mobi-logo",attrs:{href:"index.shtml"}},[a("img",{staticClass:"nav-logo",attrs:{src:s("710d")}})])])])}],n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"collapse navbar-collapse",attrs:{id:"navbarSupportedContent"}},[t._m(0),s("ul",{staticClass:"navbar-nav mr-auto"},[t._l(t.menus,(function(e,a){return s("router-link",{key:a,attrs:{to:{name:e.link},custom:""},scopedSlots:t._u([{key:"default",fn:function(a){var i=a.href,n=a.navigate,r=a.isActive;return[s("li",{class:[r?"nav-item active":"nav-item"]},[e.show||e.condition==!(t.login&&t.login.token&&""!==t.login.token)?s("a",{staticClass:"nav-link",attrs:{href:i},on:{click:n}},[t._v(" "+t._s(e.title)+" "),s("span",{staticClass:"sr-only"},[t._v("(current)")])]):t._e()])]}}],null,!0)})})),s("li",{staticClass:"nav-item logout-nav"},[s("a",{staticClass:"nav-link",attrs:{target:"_blank",href:this.privacy_policy_url}},[t._v("Privacy Policy")])]),s("li",{staticClass:"nav-item logout-nav"},[s("a",{staticClass:"nav-link",attrs:{target:"_blank",href:this.terms_condition_url}},[t._v("Terms & conditions")])]),s("li",{staticClass:"nav-item logout-nav",on:{click:t.LogOut}},[t.login&&t.login.token&&""!==t.login.token?s("a",{staticClass:"nav-link"},[t._v("Logout")]):t._e()])],2),t._m(1)])},r=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("button",{staticClass:"navbar-toggler navbar-toggler-right close-btn border-0",attrs:{type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"}},[s("span",[s("i",{staticClass:"fas fa-times"})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"store-btns d-flex align-items-center mt-4"},[a("a",{attrs:{href:"https://itunes.apple.com/in/app/deonde/id1449714698?mt=8"}},[a("img",{attrs:{src:s("89a7")}})]),a("a",{attrs:{href:"https://play.google.com/store/apps/details?id=com.deonde.ordering"}},[a("img",{attrs:{src:s("c4cb")}})])])}],l=s("5530"),o=(s("ac1f"),s("1276"),s("2f62")),A={data:function(){return{menus:[]}},computed:Object(l["a"])(Object(l["a"])(Object(l["a"])({},Object(o["c"])("user",["login","logout"])),Object(o["c"])("setting",["settings"])),Object(o["d"])({})),mounted:function(){this.sideMenu()},methods:Object(l["a"])(Object(l["a"])({},Object(o["b"])("user",["checkLogout"])),{},{LogOut:function(){var t=this;this.checkLogout({user_id:this.login.user_id,devicetype:"I",devicetoken:this.login.token,unquie_id:"",vendor_id:window.location.pathname.split("/")[2],is_langauage:"E"}).then((function(e){200==e.code&&confirm("Are you sure you want to logout?")&&(window.localStorage.removeItem("vuex"),t.$toasted.success("Logout successfully",{duration:5e3}),t.$router.push({name:"sign-in"}))}))},sideMenu:function(){this.menus=[{title:"Home",link:"Home",show:!0,condition:!0},{title:"Login",link:"sign-in",show:!1,
//!(this.login && this.login.token && this.login.token !== '')
condition:!0},{title:"Address",link:"address",show:!1,
//!!(this.login && this.login.token && this.login.token !== '')
condition:!1},{title:"Orders",link:"orders",show:!1,
//!!(this.login && this.login.token && this.login.token !== '')
condition:!1},{title:"My Profile",link:"profile",show:!1,
//!!(this.login && this.login.token && this.login.token !== '')
condition:!1},{title:"Promocode",link:"promo-code",show:!0,condition:!0},{title:"FAQ",link:"faq",show:!0,condition:!0}]}})},c=A,d=s("2877"),v=Object(d["a"])(c,n,r,!1,null,null,null),u=v.exports,m=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("form",{staticClass:"form-inline menu-links my-2 my-lg-0"},[s("div",{staticClass:"search-cart d-flex align-items-center"},t._l(t.links,(function(e){return s("div",{key:e.title,staticClass:"form-group has-search mb-0 mr-4"},[s("router-link",{staticClass:"nav-lnk d-flex align-items-center",attrs:{to:{name:"review-order"}}},[s("span",{class:e.icon}),s("span",{staticClass:"lnk-text"},[t._v(t._s(e.title))])])],1)})),0)])},g=[],p={data:function(){return{links:[{title:"Search",icon:"fas fa-search"},{title:"Cart",icon:"fas fa-shopping-cart"}]}}},f=p,b=Object(d["a"])(f,m,g,!1,null,null,null),h=b.exports,C={components:{SideBar:u,NavRight:h}},w=C,y=Object(d["a"])(w,a,i,!1,null,null,null);e["a"]=y.exports},e347:function(t,e,s){t.exports=s.p+"img/logo.df3bd715.svg"}}]);
//# sourceMappingURL=chunk-7b936a0a.0f2a311b.js.map