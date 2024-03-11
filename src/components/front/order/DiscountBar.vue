<template>
    <div>
        <div class="flex items-center">
            <div class="px-10 py-1 mb-0 text-xs tracking-wider me-4 " :class="color">
                <slot name="name"></slot>
            </div>
            <p class="mb-0 text-xs">
                <slot name="content"></slot>
            </p>
        </div>
    </div>
</template>

<script>
export default {
  props: ['color'],
};
</script>
