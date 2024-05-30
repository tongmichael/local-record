<template>
    <div>
        <base-set v-if="!currentNode.children" :title="currentNode.label" />
        <book-set v-else />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import BaseSet from './cpns/BaseSet.vue'
import BookSet from './cpns/BookSet.vue'

@Component({
    components: {
        BaseSet,
        BookSet
    }
})
export default class SettingBar extends Vue {
    get currentNode() {
        return this.$store.state.record.currentNode
    }
}
</script>

<style lang="scss" scoped>

</style>
