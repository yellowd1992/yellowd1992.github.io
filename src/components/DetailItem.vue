<template>
    <div class="detail-item">
        <span class="detail-icon">{{ icon }}</span>
        <div class="detail-content">
            <h4>{{ title }}</h4>
            <p>{{ content }}</p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    icon: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});
</script>

<style scoped>
.detail-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 15px;
    background: var(--bg-warm);
    border-radius: 12px;
    transition: transform 0.3s ease;
}

.detail-item:hover {
    transform: translateX(5px);
}

.detail-icon {
    font-size: 1.5rem;
}

.detail-content h4 {
    font-size: 0.85rem;
    color: var(--text-light);
    margin-bottom: 3px;
}

.detail-content p {
    font-weight: 600;
    color: var(--text-dark);
}
</style>
