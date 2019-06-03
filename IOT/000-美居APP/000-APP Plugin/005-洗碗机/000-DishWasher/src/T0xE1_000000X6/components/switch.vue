<template>
    <div>
        <image :src="icon" @click="onchange" :style="{'width':width+'px','height':height+'px'}"
        />
    </div>
</template>
<style scoped>
</style>
<script>
export default {
    props: {
        value: {
            type: Number,
            default: -1
        },
        // 是否选中
        iconOn: {
            type: String,
            default: './assets/img/switch_on.png'
        },
        iconOff: {
            type: String,
            default: './assets/img/switch_off.png'
        },
        width: {
            type: String,
            default: '100',
        },
        height: {
            type: String,
            default: '50',
        },
        checked: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            myChecked: this.checked,
        }
    },
    computed: {
        icon() {
            return this.myChecked ? this.iconOn : this.iconOff;
        }
    },
    methods: {
        onchange(event) {
            this.myChecked = !this.myChecked;
            this.$emit('change', { value: this.myChecked })
        },
    }
}
</script>


