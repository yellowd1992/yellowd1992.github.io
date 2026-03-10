<template>
    <section class="home-section">
        <div class="home-hero">
            <h1>欢迎来到我们的家 👋</h1>
            <p>一个充满爱与温暖的四口之家 · 两只猫咪 + 两位铲屎官</p>
            
            <div class="family-grid">
                <FamilyCard
                    v-for="member in membersList"
                    :key="member.id"
                    :member="member"
                    @click="$emit('navigate', member.id)"
                />
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';
import { members } from '../data/members.js';
import FamilyCard from './FamilyCard.vue';

const membersList = computed(() => Object.values(members));

defineEmits(['navigate']);
</script>

<style scoped>
.home-section {
    max-width: 1000px;
    margin: 0 auto;
    padding: 40px 20px;
    animation: fadeIn 0.5s ease;
}

.home-hero {
    text-align: center;
    padding: 60px 20px;
}

.home-hero h1 {
    font-size: 3rem;
    margin-bottom: 15px;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.home-hero p {
    font-size: 1.2rem;
    color: var(--text-light);
    margin-bottom: 40px;
}

.family-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 25px;
    margin-top: 40px;
}

@media (max-width: 768px) {
    .home-hero h1 {
        font-size: 2rem;
    }
    
    .home-hero {
        padding: 30px 10px;
    }
}
</style>
