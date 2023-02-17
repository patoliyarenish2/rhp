<template>
  <div>
    <a href="javascript:void(0)" @click="openFilters" class="fltr-srt-cls">Filter/Sort</a>
    <div class="modal fade custmization-modal orders-tab-main sortfiler-main" id="filter"
      tabindex="-1" aria-labelledby="filterLabel" aria-hidden="true" ref="filterModal" >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="filterLabel">Sort/Filter</h4>
            <a data-dismiss="modal" class="lnk" @click="clearFilter()">Clear All</a>
          </div>
          <div class="modal-body">
            <ul class="nav nav-tabs border-0 mb-3">
              <li class="nav-item">
                <a href="#sort" class="nav-link navbar-default active" data-toggle="tab">Sort</a>
              </li>
              <li class="nav-item">
                <a href="#cusines" class="nav-link navbar-default" data-toggle="tab">Cuisines</a>
              </li>
            </ul>
            <form action="#">
            <div class="tab-content">
              <div id="sort" class="tab-pane active tab-box">
                <div class="customize-type mb-4">
                    <div class="form__group">
                      <div class="form__radio-group">
                        <input type="radio" v-model="sortType" name="size" id="classic1" class="form__radio-input" @click="e => updateFilterSort(e.target.value)" :checked="filters.sort == '0'" value="0"/>
                        <label class="form__label-radio" for="classic1">
                          <span class="form__radio-button"></span>Relevance
                        </label>
                      </div>
                      <div class="form__radio-group">
                        <input type="radio" v-model="sortType" name="size" id="classic2" class="form__radio-input" @click="e => updateFilterSort(e.target.value)" :checked="filters.sort == '1'" value="1" />
                        <label class="form__label-radio" for="classic2">
                          <span class="form__radio-button"></span>Cost for two
                        </label>
                      </div>
                      <div class="form__radio-group">
                        <input type="radio" v-model="sortType" name="sortType" id="classic3" class="form__radio-input" @click="e => updateFilterSort(e.target.value)" :checked="filters.sort == '2'" value="2"/>
                        <label class="form__label-radio" for="classic3">
                          <span class="form__radio-button"></span>Delivery Time
                        </label>
                      </div>
                      <div class="form__radio-group">
                        <input type="radio" v-model="sortType" name="sortType" id="classic4" class="form__radio-input" @click="e => updateFilterSort(e.target.value)" :checked="filters.sort == '3'" value="3"/>
                        <label class="form__label-radio" for="classic4">
                          <span class="form__radio-button"></span>Rating
                        </label>
                      </div>
                    </div>
                  <!-- </form> -->
                </div>
              </div>
              <div id="cusines" class="tab-pane tab-box">
                <div class="customize-type custom-checkbox">
                  <div class="form-group" v-for="(cuisine,index) in cuisines" :key="index">
                    <div>
                      <input type="checkbox" v-model="selected[index]" :id="cuisine.cuisine_id" @click="$event => checkedCuisine($event,cuisine.cuisine_id)"/>
                      <label :for="cuisine.cuisine_id">{{cuisine.cuisine_name}}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </form>
          </div>
          <div class="modal-footer full-btn d-block">
            <button @click="setFilterData()">Apply</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data(){
    return{
        filter: false,
        cusinesIDs:'',
        sortType:'0',
        selected:[],
    }
  },
  computed:{ 
      ...mapGetters("restaurant",["cuisines","filters"]),
  },
  mounted(){
    this.getCuisine();
    this.updateFilterCuisines([]);
  },
  methods:{
    ...mapActions("restaurant",["getCuisines","updateFilterSort","updateFilterCuisines"]),

    openFilters(){
      window.$(this.$refs.filterModal).modal()
    },
    
    getCuisine(){
      this.getCuisines({
          vendor_id: this.$auth.getVendorId(),
          is_langauge : 'en'
      })
    },

    checkedCuisine(e,id){
      var filters = { ...this.filters }
      if(e.target.checked)
      {
        filters.cuisine_id.push(id)
      }else{
        filters.cuisine_id.splice(filters.cuisine_id.indexOf(id),1)
      }
      this.cusinesIDs = filters.cuisine_id;
      this.updateFilterCuisines(filters.cuisine_id)
    },

    setFilterData(){
      let getFilter = {"sort" : this.sortType,'cusinesIds': this.cusinesIDs};
      this.$emit("getFilterData", getFilter);
      window.$('#filter').modal('toggle');
    },

    clearFilter(){
      this.cusinesIDs = '';
      this.sortType = '0';
      this.selected = [];
      let getFilter = {"sort" : this.sortType,'cusinesIds': this.cusinesIDs};
      this.$emit("getFilterData", getFilter);
    }

  }
};
</script>