<template>
    <div>
        <div class="flex flex-col items-center md:flex-row">
            <div class="px-10 py-1 mb-4 text-xs tracking-wider me-0 md:me-4 md:mb-0" :class="color">
                <slot name="name"></slot>
            </div>
            <p class="mb-4 text-xs md:mb-0">
                <slot name="content"></slot>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['color']
}
</script>
