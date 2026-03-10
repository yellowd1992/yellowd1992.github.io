<template>
    <div 
        class="family-card"
        :class="member.theme"
        @click="$emit('click')"
    >
        <img 
            v-if="member.avatar"
            :src="member.avatar" 
            :alt="member.name"
            class="card-avatar"
            @error="handleImageError"
        >
        <div 
            v-else 
            class="card-avatar emoji-avatar"
            :style="{ background: member.coverGradient }"
        >
            {{ member.avatarEmoji }}
        </div>
        <h3 class="card-name">{{ member.name }}</h3>
        <p class="card-role">{{ member.cardTitle }}</p>
        <div class="card-tags">
            <span 
                v-for="(tag, index) in member.tags" 
                :key="index"
                class="tag"
                :class="tag.class"
            >
                {{ tag.text }}
            </span>
        </div>
    </div>
</template>

<script setup>
defineProps({
    member: {
        type: Object,
        required: true
    }
});

defineEmits(['click']);

function handleImageError(e) {
    const memberName = e.target.alt;
    const colors = {
        '窝窝': 'ff8c42',
        '伊伊': '6b5b95'
    };
    const color = colors[memberName] || '888888';
    e.target.src = `https://placehold.co/120x120/${color}/ffffff?text=${memberName}`;
}
</script>

<style scoped>
.family-card {
    background: var(--card-bg);
    border-radius: 20px;
    padding: 25px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: var(--shadow);
    position: relative;
    overflow: hidden;
}

.family-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
}

.family-card.wo::before { background: linear-gradient(90deg, #ff8c42, #ffb380); }
.family-card.yi::before { background: linear-gradient(90deg, #6b5b95, #9b8bc5); }
.family-card.blue::before { background: linear-gradient(90deg, #3498db, #5dade2); }
.family-card.pink::before { background: linear-gradient(90deg, #e91e63, #f06292); }

.family-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-hover);
}

.card-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin: 0 auto 20px;
    object-fit: cover;
    border: 4px solid;
    transition: transform 0.3s ease;
}

.family-card.wo .card-avatar { border-color: var(--primary-light); }
.family-card.yi .card-avatar { border-color: #9b8bc5; }
.family-card.blue .card-avatar { border-color: #5dade2; }
.family-card.pink .card-avatar { border-color: #f06292; }

.family-card:hover .card-avatar {
    transform: scale(1.05) rotate(3deg);
}

.emoji-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
}

.card-name {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 8px;
}

.card-role {
    color: var(--text-light);
    font-size: 0.9rem;
    margin-bottom: 15px;
}

.card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
}

.tag {
    padding: 5px 12px;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 500;
}

.tag.wo { background: #ffe8d6; color: #e67e22; }
.tag.yi { background: #e8e4f0; color: #6b5b95; }
.tag.blue { background: #d4e6f1; color: #2980b9; }
.tag.pink { background: #f8bbd9; color: #c2185b; }
</style>
