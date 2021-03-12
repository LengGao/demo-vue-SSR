<template>
    <div>
        {{ item.title }}        
    </div>
</template>
<script>
export default {
    asyncData({store, route}) {
        return store.dispatch('fetchItem')
    },
    computed: {
    }
}
</script>
