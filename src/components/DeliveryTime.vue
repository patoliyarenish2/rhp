<template>
  <div>
    <a href="javascript:void(0)" class="lnk" @click="openTime">Change</a>
    <div
      class="modal fade deliverytime-main"
      id="changetime"
      tabindex="-1"
      aria-labelledby="changetimeLabel"
      aria-hidden="true"
      ref="TimeModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="changetimeLabel">When Do You Want Your {{(isDelivery == 1 || isDelivery == -1) ? 'Delivery' : 'Takeaway'}}?</h4>
            <a data-dismiss="modal" class="lnk lnk-close">Close</a>
          </div>
          <div class="modal-body p-0">
            <div class="d-flex align-content-start">
              <ul v-if="!isLoading" class="nav nav-tabs flex-column border-0">
                <li class="nav-item" v-for="(day,index) in allDays" :key="index">
                  <a href="javascript:void(0);" @click="selectDate(day.date, day.fulldayname, day.isToday)" class="nav-link navbar-default" data-toggle="tab" :class="{'active':(selectedDate == day.date)}">
                    {{(day.isToday) ? 'Today' : ((day.isTomorrow) ? 'Tomorrow' : day.dayname)}}
                  </a>
                </li>
              </ul>
              <div v-if="!isLoading" class="tab-content">
                <div id="tab1" class="tab-pane active tab-box">
                  <form class="boxed d-flex flex-column">
                    <div class="asap" v-if="isToday && isAsapEnable && !restaurantData.restaurant_on_off">
                      <input type="radio" id="asap" name="time" value="asap" v-model="selectedTime"/>
                      <label for="asap">As Soon As Possible</label>
                    </div>
                    <!-- <div v-else> -->
                      <div v-if="times.length">
                        <template v-for="(t,i) in times">
                        <template v-for="(time,index) in t">
                          <div class="timeslots" v-if="index+1 !== t.length" :key="i+''+index">
                            <input type="radio" :id="'time_'+i+'_'+index" name="time" :value="t[index]" v-model="selectedTime" @click="setSecondaryTime(t[index+1])"/>
                            <label :for="'time_'+i+'_'+index">
                              {{moment(t[index],timeFormat).format('hh:mm A')}} - 
                              {{moment(t[index+1],timeFormat).format('hh:mm A')}}
                            </label>
                          </div>
                        </template>
                      </template>
                      </div>
                      <div v-else class="notimeslot">
                        <img src="@/assets/images/no-time-slot.svg" />
                        <p>No time slot available</p>
                      </div>
                    <!-- </div> -->
                    
                  </form>
                </div>
              </div>
              <div class="loaderdiv h-100 d-flex justify-content-center align-items-center" v-if="isLoading">
                <b-spinner class="align-middle"></b-spinner>
              </div>
            </div>
          </div>
          <div v-if="!isLoading" class="modal-footer full-btn d-block">
            <a href="javascript:void(0);" @click="setTime()">Set {{(isDelivery == 1 || isDelivery == -1) ? 'Delivery' : 'Takeaway'}} time</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions } from "vuex";
import moment from "moment";
export default {
  props:['restaurantId', 'restaurantData', 'isDelivery'],
  data() {
    return {
      moment:moment,
      isLoading:false,
      selectedDate:'',
      times:[],
      selectedTime:'',
      selectedSecondaryTime:'',
      isToday: false,
      isAsapEnable: false,
      timeFormat: 'HH:mm:ss',
      dateFormat: 'YYYY-MM-DD',
      defaultDayname: '',
      time_slots:0,
      store_delivery_time: [],
      store_takeaway_time: [],
      system_start_time: '',
      system_end_time: '',
      is_same_day_delivery:0,
      is_enable_schedule_order_after_business_hours:0,
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      currentDate: new Date(),
      currentTime: new Date().toLocaleTimeString(),
      currentMinute: new Date().getMinutes(),
      currentDay: '',
      allDays: [],
      opencloseTimes: [],
      statTimeSlot: [],
      restaurantTimingList: []
    }
  },
  mounted() {
    this.currentDay = this.days[this.currentDate.getDay()];
  },
  methods: {
    ...mapActions("restaurant", [ "getRestaurantTimingData"]), //To get restaurant timings
    // To re-init all the data
    openTime() {
      if (this.restaurantData) {
        this.time_slots = this.restaurantData.time_slots;
      }
      if (this.$auth.setting) {
        this.system_start_time = (this.$auth.setting && this.$auth.setting.system_start_time != '') ? this.$auth.setting.system_start_time.split(' ').pop() : '00:00:00';
        this.system_end_time = (this.$auth.setting.system_end_time != '') ? this.$auth.setting.system_end_time.split(' ').pop() : '23:59:00';
        this.is_same_day_delivery = this.$auth.setting.is_same_day_delivery;
        this.is_enable_schedule_order_after_business_hours = this.$auth.setting.is_enable_schedule_order_after_business_hours;
      }
      this.store_delivery_time = [];
      this.store_takeaway_time = [];
      this.selectedDate = '';
      this.selectedTime = '';
      this.selectedSecondaryTime = '';
      this.defaultDayname = '';
      //this.currentTime = new Date().toLocaleTimeString();
      this.currentTime = moment().format(this.timeFormat);
      this.currentMinute = new Date().getMinutes();
      this.opencloseTimes = [];
      this.times = [];
      this.isToday = false;
      this.isAsapEnable = false;
      this.isLoading = true;
      window.$(this.$refs.TimeModal).modal();
      let beforeTime = moment(this.system_start_time, this.timeFormat);
      let afterTime = moment(this.system_end_time, this.timeFormat);
      if (moment(this.currentTime, this.timeFormat).isBetween(beforeTime, afterTime)) {
        this.isAsapEnable = true;
      } else {
        this.isAsapEnable = false;
      }
      //Get restaurant timings
      this.getRestaurantTiming();
    },
    // To create left side days list
    createDays() {
      this.allDays = [];
      let daysToCalculate = 15;
      let dayId = 1;
      if (this.is_same_day_delivery) {
        let dayname = this.shortDays[this.currentDate.getDay()];
        let fulldayname = this.days[this.currentDate.getDay()];
        let monthname = this.currentDate.toLocaleString('default', { month: 'short' });
        let monthdaynumber = this.currentDate.getDate();
        let calDayName = dayname + ', ' + monthname + ' ' + monthdaynumber;
        let date = this.currentDate.getFullYear() + '-' + (this.currentDate.getMonth()+1) + '-' + this.currentDate.getDate();
        let dayData = {id: dayId, dayname: calDayName, date: moment(date).format(this.dateFormat), fulldayname: fulldayname, isToday: true, isTomorrow: false};
        this.allDays.push(dayData);
        this.selectedDate = moment(date).format(this.dateFormat);
        dayId++;
        daysToCalculate = (daysToCalculate - 1);
      }
      for (let day = 1; day <= daysToCalculate; day++) {
        let currentCalDate = new Date();
        let fulldate = new Date(currentCalDate.setDate(currentCalDate.getDate() + day));
        let dayname = this.shortDays[fulldate.getDay()];
        let fulldayname = this.days[currentCalDate.getDay()];
        let monthname = fulldate.toLocaleString('default', { month: 'short' });
        let monthdaynumber = fulldate.getDate();
        let calDayName = dayname + ', ' + monthname + ' ' + monthdaynumber;
        let date = currentCalDate.getFullYear() + '-' + (currentCalDate.getMonth()+1) + '-' + currentCalDate.getDate();
        let dayData = {id: dayId, dayname: calDayName, date: moment(date).format(this.dateFormat), fulldayname: fulldayname, isToday: false, isTomorrow: (day == 1) ?true : false};
        this.allDays.push(dayData);
        if (!this.is_same_day_delivery && day == 1) {
          this.selectedDate = moment(date).format(this.dateFormat);
          this.defaultDayname = fulldayname;
        }
        dayId++;
      }
      this.createTimes();
    },
    // To create static time slot from system start and end date
    createTimes() {
      let openTime = '';
      let closeTime = '';
      if (this.isDelivery == 1 || this.isDelivery == -1) { //For Delivery
        if (this.store_delivery_time.length > 0) {
          this.store_delivery_time.forEach((elm) => {
            if (this.system_start_time > elm.open_time) {
              openTime = this.system_start_time;
            } else {
              openTime = elm.open_time;
            }
            if (this.system_end_time > elm.close_time) {
              closeTime = elm.close_time;
            } else {
              closeTime = this.system_end_time;
            }
            this.opencloseTimes.push({openTime: openTime, closeTime: closeTime, day: elm.day});
          });
        } else {
          openTime = this.system_start_time;
          closeTime = this.system_end_time;
          this.opencloseTimes.push({openTime: openTime, closeTime: closeTime, day: this.currentDay});
        }
      } else { //For TakeAway
        if (this.store_takeaway_time.length > 0) {
          this.store_takeaway_time.forEach((elm) => {
            if (this.system_start_time > elm.open_time) {
              openTime = this.system_start_time;
            } else {
              openTime = elm.open_time;
            }
            if (this.system_end_time > elm.close_time) {
              closeTime = elm.close_time;
            } else {
              closeTime = this.system_end_time;
            }
            this.opencloseTimes.push({openTime: openTime, closeTime: closeTime, day: elm.day});
          });
        } else {
          openTime = this.system_start_time;
          closeTime = this.system_end_time;
          this.opencloseTimes.push({openTime: openTime, closeTime: closeTime, day: this.currentDay});
        }
      }
      let startTime = this.system_start_time;
      let endTime = (this.system_end_time == '00:00:00') ? '23:59:00' : this.system_end_time;
      let convOpenTime = moment(startTime,this.timeFormat);
      do {
        this.statTimeSlot.push(convOpenTime.format(this.timeFormat));
        convOpenTime.add(this.time_slots,'minutes');
      } while(moment(endTime,this.timeFormat).isAfter(convOpenTime));
      if (this.statTimeSlot.length > 1) {
        let sTime = moment(this.statTimeSlot[this.statTimeSlot.length-1], this.timeFormat);
        let eTime = moment(endTime, this.timeFormat);
        let dur = moment.duration(eTime.diff(sTime));
        // let hrs = parseInt(dur.asHours());
        let min = parseInt(dur.asMinutes());//-hrs*60;
        if (min > 0) {
          this.statTimeSlot.push(sTime.add(min, 'minutes').format(this.timeFormat));
        }
      }
      if (this.is_same_day_delivery) {
        this.selectDate(this.selectedDate, this.currentDay, true);
      } else {
        this.selectDate(this.selectedDate, this.defaultDayname, false);
      }
    },
    // To get restaurnat delivery and pickup timings
    getRestaurantTiming() {
      this.getRestaurantTimingData({
        vendor_id: this.$auth.getVendorId(),
        restaurant_id:this.restaurantId,
        is_langauge: "en",
      }).then((data) => {
        if (data.code == 200) {
          this.restaurantTimingList = data.Result;
          if (this.restaurantTimingList) {
            if (this.restaurantTimingList.delivery_timing) { //For Delivery
              this.restaurantTimingList.delivery_timing.forEach((elm) => {
                if (elm.status == 1) {
                  this.store_delivery_time.push(elm);
                }
              });
            }
            if (this.restaurantTimingList.pickup_timing) { //For Takeaway
              this.restaurantTimingList.pickup_timing.forEach((elm) => {
                if (elm.status == 1) {
                  this.store_takeaway_time.push(elm);
                }
              });
            }
          }
          this.createDays();
          this.isLoading = false;
        } else {
          this.isLoading = false;
          alert((data.msg != '') ? data.msg : 'Something went wrong, Please try again.');
        }
      }).catch(function() {
        this.isLoading = false;
        alert('Something went wrong, Please try again.');
      });
    },
    // On click on day this function will call to retrive all timings
    selectDate(date, fulldayname, isToday) {
      this.times = [];
      this.selectedDate = date;
      this.isToday = isToday;
      this.selectedTime = (isToday && this.isAsapEnable) ? 'asap' : '';
      this.selectedSecondaryTime = '';
      
      let time = this.opencloseTimes.filter((el) => el.day == fulldayname);
      if (time) {
        if (time.length > 0) {
          time.forEach((elm,ind) => {
            this.times[ind] = [];
            if (!isToday) {
              let result = [];
              let openTime = elm.openTime;
              let closeTime = (elm.closeTime == '00:00:00') ? '23:59:00' : elm.closeTime;
              let convOpenTime = moment(openTime,this.timeFormat);
              do {
                result.push(convOpenTime.format(this.timeFormat));
                convOpenTime.add(this.time_slots,'minutes');
              } while(moment(closeTime,this.timeFormat).isAfter(convOpenTime));
              if (result.length > 1) {
                let startTime = moment(result[result.length-1], this.timeFormat);
                let endTime = moment(closeTime, this.timeFormat);
                let duration = moment.duration(endTime.diff(startTime));
                // let hours = parseInt(duration.asHours());
                let minutes = parseInt(duration.asMinutes());//-hours*60;
                if (minutes > 0) {
                  result.push(startTime.add(minutes, 'minutes').format(this.timeFormat));
                }
              }
              result.forEach((el) => {
                this.times[ind].push(el);
              });
            } else {
              let firstEl = this.statTimeSlot.find(el => el >= this.currentTime);
              let firstEldone = false;
              let result = [];
              let openTime = elm.openTime;
              let closeTime = (elm.closeTime == '00:00:00') ? '23:59:00' : elm.closeTime;
              let convOpenTime = moment(openTime,this.timeFormat);
              do {
                if (!firstEldone && firstEl && this.isAsapEnable) {
                  firstEldone = true;
                  result.push(moment(this.currentTime,this.timeFormat).format(this.timeFormat));
                  result.push(moment(firstEl,this.timeFormat).format(this.timeFormat));
                }
                let formconvOpenTime = convOpenTime.format(this.timeFormat)
                result.push(formconvOpenTime);
                convOpenTime.add(this.time_slots,'minutes');
              } while(moment(closeTime,this.timeFormat).isAfter(convOpenTime));
              let minutes = 0;
              if (result.length > 1) {
                let startTime = moment(result[result.length-1], this.timeFormat);
                let endTime = moment(closeTime, this.timeFormat);
                let duration = moment.duration(endTime.diff(startTime));
                // let hours = parseInt(duration.asHours());
                minutes = parseInt(duration.asMinutes());//-hours*60;
                if (minutes > 0) {
                  result.push(startTime.add(minutes, 'minutes').format(this.timeFormat));
                }
              }
              if (firstEl && this.isAsapEnable) {
                let temp = result.filter((el) => firstEl < el);
                this.times[ind].push(moment(this.currentTime,this.timeFormat).format(this.timeFormat));
                this.times[ind].push(moment(firstEl,this.timeFormat).format(this.timeFormat));
                temp.forEach((el) => {
                  this.times[ind].push(el);
                });
                if (result.length > 1 && minutes > 0) {
                  let st = moment(result[result.length-1], this.timeFormat);
                  if (!moment(result[result.length-1], this.timeFormat).isSame(st)) {
                    this.times[ind].push(st.format(this.timeFormat));
                  }
                }
              } else {
                result.forEach((el) => {
                  this.times[ind].push(el);
                });
              }
            }
          });
        }
      }
    },
    
    // To set end time
    setSecondaryTime(time) {
      this.selectedSecondaryTime = time;
    },
    // On click on set delivery/pickup time this will handle and pass data
    setTime() {
      if (this.selectedDate != '' && this.selectedTime != '') {
        let selMoment = moment(this.selectedDate);
        let day = selMoment.format('ddd');
        let monthname = selMoment.format('MMM');
        let daynum = selMoment.format('D');
        let stTime = moment(this.selectedDate + ' ' + this.selectedTime).format('LT');
        let edTime = moment(this.selectedDate + ' ' + this.selectedSecondaryTime).format('LT');
        let todayTomm = '';
        switch(this.selectedDate){
          case moment().format(this.dateFormat):
            todayTomm = 'Today';
            break;
          case moment().add(1,'day').format(this.dateFormat):
            todayTomm = 'Tomorrow';
            break;
          default:
            todayTomm = day + ', ' + monthname + '-' + (daynum > 9 ? daynum : '0'+daynum);
            break;
        }
        let displayText = todayTomm + ', ' + stTime + ' - ' + edTime;
        this.$emit("setOrderTime", {date: this.selectedDate, time: this.selectedTime, displayText: displayText});
        window.$(this.$refs.TimeModal).modal('hide');
      } else {
        alert("Please select date and time both");
      }      
    }
  },
};
</script>
<style scoped>
/* To set loader on center of modle */
.loaderdiv { 
  width: 100%;
  position: absolute;
}
</style>