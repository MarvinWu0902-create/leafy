<template>
    <div>
        <h3 class="p-4 bg-gray-400/10">填寫訂購資訊</h3>
        <div class="p-4">
            <Form v-slot="{ errors }" @submit="onSubmit">
                <div class="flex flex-col mb-2">
                    <label class="mb-2" for="email">
                        <span class="text-red-400">*</span>
                        E-mail
                    </label>
                    <Field
                        class="p-2 mb-2 border focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary/30"
                        id="email" name="email" type="email" :class="{ 'is-invalid': errors['email'] }"
                        placeholder="請輸入 Email" rules="email|required" v-model="user.email">
                    </Field>
                    <ErrorMessage name="email" class="text-sm text-red-400 invalid-feedback"></ErrorMessage>
                </div>

                <div class="flex flex-col mb-2">
                    <label class="mb-2" for="consignee">
                        <span class="text-red-400">*</span>
                        收件人姓名
                    </label>
                    <Field
                        class="p-2 mb-2 border focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary/30"
                        id="consignee" name="姓名" type="text" :class="{ 'is-invalid': errors['姓名'] }" placeholder="請輸入 姓名"
                        rules="required" v-model="user.name">
                    </Field>
                    <ErrorMessage name="姓名" class="text-sm text-red-400 invalid-feedback"></ErrorMessage>
                </div>
                <!-- phone -->
                <div class="flex flex-col mb-2">
                    <label class="mb-2" for="phone">
                        <span class="text-red-400">*</span>
                        連絡電話
                    </label>
                    <Field
                        class="p-2 mb-2 border focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary/30"
                        id="phone" name="電話" type="text" :class="{ 'is-invalid': errors['電話'] }" placeholder="請輸入 電話"
                        :rules="isPhone" v-model="user.tel">
                    </Field>
                    <ErrorMessage name="電話" class="text-sm text-red-400 invalid-feedback"></ErrorMessage>
                </div>
                <!-- Address -->
                <div class="flex flex-col mb-2">
                    <label class="mb-2" for="address">
                        <span class="text-red-400">*</span>
                        收件地址
                    </label>
                    <Field
                        class="p-2 mb-2 border focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary/30"
                        id="address" name="地址" type="text" :class="{ 'is-invalid': errors['地址'] }" placeholder="請輸入 地址"
                        rules="required" v-model="user.address">
                    </Field>
                    <ErrorMessage name="地址" class="text-sm text-red-400 invalid-feedback"></ErrorMessage>
                </div>
                <!-- Remark -->
                <div class="flex flex-col mb-2">
                    <label class="mb-2" for="remark">
                        備註
                    </label>
                    <textarea
                        class="p-2 mb-2 border focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary/30"
                        name="備註" id="remark" rows="3" v-model="message"></textarea>
                </div>
                <button type="submit"
                    class="w-full py-2 text-white transition duration-300 rounded bg-primary hover:bg-primary-darker"
                    :class="{ 'cursor-wait': orderLoading.post}"
                    :disabled="orderLoading.post">建立訂單
                    <font-awesome-icon :icon="['fas', 'spinner']" spin-pulse class="text-white"
                        v-show="orderLoading.post" />
                </button>
            </Form>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { Field, Form, ErrorMessage } from 'vee-validate';

import orderStore from '@/stores/order.js'

export default {
    components: {
        Field,
        Form,
        ErrorMessage
    },
    data() {
        return {
            user: {
                email: '',
                name: '',
                tel: '',
                address: ''
            },
            message: ''
        }
    },
    computed: {
        ...mapState(orderStore, ['orderStatus', 'orderLoading']),
    },
    methods: {
        isPhone(value) {
            const phoneNumber = /^(09)[0-9]{8}$/
            return phoneNumber.test(value) ? true : '需要正確的電話號碼'
        },
        onSubmit() {
            this.postOrder(this.user, this.message)
        },
        ...mapActions(orderStore, ['orderChange', 'postOrder']),
    }
}
</script>
