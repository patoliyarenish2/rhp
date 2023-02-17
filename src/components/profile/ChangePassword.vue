<template>
     <div id="changepass" class="tab-pane tab-box">
        <div class="mt-4">
            <div class="mt-4 position-relative">
                <h6 class="mb-2">Password</h6>
                <input
                    class="form-control mb-0 h50"
                    type="Password"
                    placeholder="Password"
                    aria-label="Password"
                    v-model="$v.typeform.password_current.$model"
                    :class="{
                        'is-invalid': $v.typeform.password_current.$error,
                    }"
                />
                <div v-if="$v.typeform.password_current.$error" class="invalid-feedback">
                    <span v-if="!$v.typeform.password_current.required">
                        Please enter old password
                    </span>
                </div>
            </div>
            <div class="mt-4 position-relative">
                <h6 class="mb-2">New Password</h6>
                <input
                    class="form-control mb-0 h50"
                    type="Password"
                    placeholder="New Password"
                    aria-label="New Password"
                    v-model="$v.typeform.password.$model"
                    :class="{
                        'is-invalid': $v.typeform.password.$error,
                    }"
                />
                <div v-if="$v.typeform.password.$error" class="invalid-feedback">
                    <span v-if="!$v.typeform.password.required">
                        Please enter new password
                    </span>
                </div>
            </div>
            <div class="mt-4 position-relative">
                <h6 class="mb-2">Repeat Password</h6>
                <input
                    class="form-control mb-0 h50"
                    type="Password"
                    placeholder="Repeat Password"
                    aria-label="Repeat Password"
                    v-model="$v.typeform.confirm_password.$model"
                    :class="{
                        'is-invalid': $v.typeform.confirm_password.$error,
                    }"
                />
                <div v-if="$v.typeform.confirm_password.$error" class="invalid-feedback">
                    <span v-if="!$v.typeform.confirm_password.required">
                        Please re enter your password
                    </span>
                    <span v-else-if="!$v.typeform.confirm_password.sameAsPassword">
                        Passwords must match
                    </span>
                </div>
            </div>
        </div>
        <div class="delivery-address border-0">
            <div class="full-btn" id="changepass">
                <button @click="updatePassword">Change</button>
            </div>
        </div>
    </div>
</template>
<script>

import { mapActions, mapGetters } from "vuex";
import {
    required,
    sameAs,
    minLength,
} from "vuelidate/lib/validators";
export default {
    
    data() {
        return {
           typeform: {
                password_current: "",
                password: "",
                confirm_password: "",
            },
        };
    },
    validations: {
        typeform: {
            password_current: {
                required,
            },
            password: {
                required,
                minLength: minLength(6),
            },
            confirm_password: {
                required,
                sameAsPassword: sameAs("password"),
            },
        },
    },
    methods: {
        ...mapActions("user",["changePassword"]),
        
        updatePassword() {
            this.$v.$touch();
            if (this.$v.typeform.$invalid) {
                return;
            } else {
                this.changePassword({
                    password_current: this.typeform.password_current,
                    password: this.typeform.password,
                    confirm_password: this.typeform.confirm_password,
                    is_langauge: 'en'
                }).then((data) => {
                    if (data.code == 200) {
                        this.$toasted.success(data.msg, { duration: 5000 });
                        this.typeform = {
                            password_current: "",
                            password: "",
                            confirm_password: "",
                        };
                        this.$v.typeform.$reset();
                    } else {
                        this.$toasted.error(data.msg, { duration: 5000 });
                    }
                });
            }
        },
    }
}
</script>