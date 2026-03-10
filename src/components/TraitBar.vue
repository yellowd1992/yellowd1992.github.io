<template>
    <div class="trait">
        <div class="trait-header">
            <span class="trait-name">{{ name }}</span>
            <span class="trait-value">{{ value }}%</span>
        </div>
        <div class="trait-bar">
            <div 
                class="trait-progress" 
                :class="theme"
                :style="{ width: `${value}%` }"
            ></div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    theme: {
        type: String,
        default: 'wo'
    }
});
</script>

<style scoped>
.trait {
    margin-bottom: 20px;
}

.trait-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
}

.trait-name {
    font-weight: 600;
}

.trait-value {
    color: var(--primary);
    font-weight: 700;
}

.trait-bar {
    height: 10px;
    background: #eee;
    border-radius: 5px;
    overflow: hidden;
}

.trait-progress {
    height: 100%;
    border-radius: 5px;
    transition: width 1s ease;
}

.trait-progress.wo { background: linear-gradient(90deg, var(--primary), var(--primary-light)); }
.trait-progress.yi { background: linear-gradient(90deg, var(--secondary), #9b8bc5); }
.trait-progress.blue { background: linear-gradient(90deg, var(--accent-blue), #5dade2); }
.trait-progress.pink { background: linear-gradient(90deg, var(--accent-pink), #f06292); }
.trait-progress.gold { background: linear-gradient(90deg, #f39c12, #f7dc6f); }
</style>
