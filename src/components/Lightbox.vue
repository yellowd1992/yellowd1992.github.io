<template>
    <Teleport to="body">
        <div 
            v-if="isOpen"
            class="lightbox"
            @click="close"
        >
            <span class="lightbox-close">&times;</span>
            <img :src="imageSrc" alt="放大查看">
        </div>
    </Teleport>
</template>

<script setup>
import { watch, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    },
    imageSrc: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['close']);

function close() {
    emit('close');
}

function handleKeydown(e) {
    if (e.key === 'Escape') {
        close();
    }
}

watch(() => props.isOpen, (newVal) => {
    document.body.style.overflow = newVal ? 'hidden' : 'auto';
});

onMounted(() => {
    document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 2000;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: zoom-out;
    animation: fadeIn 0.3s ease;
}

.lightbox img {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.lightbox-close {
    position: absolute;
    top: 20px;
    right: 30px;
    font-size: 2.5rem;
    color: white;
    cursor: pointer;
    z-index: 2001;
    transition: transform 0.3s ease;
}

.lightbox-close:hover {
    transform: scale(1.2);
}
</style>
