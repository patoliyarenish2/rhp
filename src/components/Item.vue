<template>
<div :class="'rest-item-list'+webVendorLayout">
  <router-link :to="{name:'vendor', params:{restaurant_name: item.slug}}" v-if="webVendorLayout == 1">
    <div v-if="!right" class="resturant-item d-flex align-items-start">
      <div :class="{'Schedule':(isSchedule == '1') , 'closed':(isSchedule != '1')}"  v-if="item.restaurant_on_off == '0'">
        <div class="img-cls">
        <img :src="item.icon_image" />
        </div>
      </div>
      <div v-else>
        <div class="img-cls">
        <img :src="item.icon_image" />
        </div>
      </div>
      <div class="resturant-data ml-3">
        <h4>{{item.name}}</h4>
        <span>{{item.cuisine_name.join(', ')}}</span>
        <div class="res-price-main mt-2 d-flex">
          <div class="star-rate" :class="(parseFloat(item.rating).toFixed(1) > 2.0 || parseFloat(item.rating).toFixed(1) == 0.0 ? 'green-cls':'red-cls')">
            <i class="fas fa-star mr-2"></i>
            <span v-if="item.rating == 0">{{parseFloat(item.rating).toFixed(1)}}</span>
            <span v-else>{{parseFloat(item.rating).toFixed(1)}}</span>
          </div>
          <ul class="time-price d-flex justify-content-center mb-0 ml-3">
            <li>{{item.delivery_time}}</li>
            <div v-if="item.two_person_price == 0"></div>
            <li v-else><span v-html="$auth.setting && $auth.setting.currency"></span>{{parseFloat(item.two_person_price).toFixed(1)}} for two</li>
          </ul>
        </div>
        <div class="offer-lbl" v-if="item.discount_text"><p>{{item.discount_text}}</p></div>
      </div>
    </div>
  </router-link>

  <router-link :to="{name:'vendor', params:{restaurant_name: item.slug}}" v-if="webVendorLayout == 2">
    <div v-if="!right" class="resturant-item-layout2 d-flex align-items-start">
      <div :class="{'Schedule':(isSchedule == '1') , 'closed':(isSchedule != '1')}"  v-if="item.restaurant_on_off == '0'" class="itemimg-thumb">
        <div class="img-cls itemimg-thumb">
        <p>{{item.delivery_time}}</p>
        <div class="offer-lbl" v-if="item.discount_text"><p>{{item.discount_text}}</p></div>
        <img :src="item.icon_image" />
        </div>
      </div>
      <div v-else class="itemimg-thumb">
        <div class="offer-lbl" v-if="item.discount_text"><p>{{item.discount_text}}</p></div>
        <div class="img-cls">
        <p>{{item.delivery_time}}</p>
        <img :src="item.icon_image" />
        </div>
      </div>
    </div>
    <div class="resturant-data-name resdata-nw">
      <div class="reting-name-nw">
        <h4>{{item.name}}</h4>
        <div class="star-rate" :class="(parseFloat(item.rating).toFixed(1) > 2.0 || parseFloat(item.rating).toFixed(1) == 0.0 ? 'green-cls':'red-cls')">
          <i class="fas fa-star mr-2"></i>
          <span v-if="item.rating == 0">{{parseFloat(item.rating).toFixed(1)}}</span>
          <span v-else>{{parseFloat(item.rating).toFixed(1)}}</span>
        </div>
      </div>
      <div class="res-price-main mt-2 d-flex justify-content-between">
          <p class="item-name-nw">{{item.cuisine_name.join(', ')}}</p>
          <div class="time-price d-flex justify-content-center mb-0 ml-3">
            <div v-if="item.two_person_price == 0"></div>
            <p v-else><span v-html="$auth.setting && $auth.setting.currency"></span>{{parseFloat(item.two_person_price).toFixed(1)}} for two</p>
          </div>
        </div>
    </div>
    
  </router-link>

</div>
</template>

<script>
export default {
    props: ['item','right','isPickupDelivery','isSchedule','webVendorLayout'],
};
</script>