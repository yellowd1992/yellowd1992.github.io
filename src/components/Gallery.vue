<template>
    <div class="gallery">
        <h3 class="gallery-title">{{ title }}</h3>
        <p class="gallery-subtitle">{{ subtitle }}</p>
        <div class="gallery-grid">
            <div
                v-for="(image, index) in images"
                :key="index"
                class="gallery-item"
                @click="$emit('open-image', image.src)"
            >
                <img 
                    :src="image.src" 
                    :alt="image.alt"
                    @error="handleImageError($event, image.alt)"
                >
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        default: ''
    },
    images: {
        type: Array,
        required: true
    }
});

defineEmits(['open-image']);

function handleImageError(e, alt) {
    const colors = ['e91e63', 'f39c12', '9b59b6', 'e74c3c', '27ae60', '3498db'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    e.target.src = `https://placehold.co/300x300/${color}/ffffff?text=${encodeURIComponent(alt)}`;
}
</script>

<style scoped>
.gallery {
    margin-top: 40px;
    padding-top: 40px;
    border-top: 1px solid #eee;
}

.gallery-title {
    font-size: 1.3rem;
    margin-bottom: 10px;
    color: var(--text-dark);
}

.gallery-subtitle {
    color: #666;
    margin-bottom: 20px;
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
}

.gallery-item {
    aspect-ratio: 1;
    border-radius: 15px;
    overflow: hidden;
    cursor: zoom-in;
    transition: transform 0.3s ease;
}

.gallery-item:hover {
    transform: scale(1.03);
}

.gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

@media (max-width: 768px) {
    .gallery-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
