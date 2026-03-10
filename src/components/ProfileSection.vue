<template>
    <section class="profile-section">
        <button class="back-btn" @click="$emit('navigate', 'home')">
            ← 返回首页
        </button>
        
        <div class="profile-container">
            <div class="profile-header">
                <img 
                    v-if="member.avatar"
                    :src="member.avatar" 
                    :alt="member.name"
                    class="profile-cover"
                    @error="handleCoverError"
                >
                <div 
                    v-else 
                    class="profile-cover emoji-cover"
                    :style="{ background: member.coverGradient }"
                >
                    {{ member.emoji }}
                </div>
                <div class="profile-cover-gradient"></div>
                <div class="profile-avatar-container">
                    <img 
                        v-if="member.avatar"
                        :src="member.avatar" 
                        :alt="member.name"
                        class="profile-avatar floating"
                        @error="handleAvatarError"
                    >
                    <div 
                        v-else 
                        class="profile-avatar floating emoji-avatar-large"
                        :style="{ background: member.coverGradient }"
                    >
                        {{ member.avatarEmoji }}
                    </div>
                </div>
            </div>

            <div class="profile-body">
                <h2 class="profile-name" :style="nameStyle">{{ member.name }} {{ member.emoji }}</h2>
                <p class="profile-role">{{ member.role }}</p>

                <div class="profile-stats">
                    <div v-for="(stat, index) in member.stats" :key="index" class="stat">
                        <div class="stat-value" :style="statValueStyle">{{ stat.value }}</div>
                        <div class="stat-label">{{ stat.label }}</div>
                    </div>
                </div>

                <p class="profile-bio" v-html="member.bio"></p>

                <div class="profile-details">
                    <DetailItem
                        v-for="(detail, index) in member.details"
                        :key="index"
                        :icon="detail.icon"
                        :title="detail.title"
                        :content="detail.content"
                    />
                </div>

                <div class="traits-container">
                    <TraitBar
                        v-for="(trait, index) in member.traits"
                        :key="index"
                        :name="trait.name"
                        :value="trait.value"
                        :theme="trait.color || member.theme"
                    />
                </div>

                <Gallery
                    v-if="member.gallery"
                    :title="member.gallery.title"
                    :subtitle="member.gallery.subtitle"
                    :images="member.gallery.images"
                    @open-image="$emit('open-image', $event)"
                />
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';
import DetailItem from './DetailItem.vue';
import TraitBar from './TraitBar.vue';
import Gallery from './Gallery.vue';

const props = defineProps({
    member: {
        type: Object,
        required: true
    }
});

defineEmits(['navigate', 'open-image']);

const nameStyle = computed(() => {
    if (props.member.theme === 'blue') return { color: 'var(--accent-blue)' };
    if (props.member.theme === 'pink') return { color: 'var(--accent-pink)' };
    return {};
});

const statValueStyle = computed(() => {
    if (props.member.theme === 'blue') return { color: 'var(--accent-blue)' };
    if (props.member.theme === 'pink') return { color: 'var(--accent-pink)' };
    return {};
});

function handleCoverError(e) {
    e.target.style.display = 'none';
    e.target.parentElement.style.background = props.member.coverGradient;
}

function handleAvatarError(e) {
    const memberName = e.target.alt;
    const colors = {
        '窝窝': 'ff8c42',
        '伊伊': '6b5b95'
    };
    const color = colors[memberName] || '888888';
    e.target.src = `https://placehold.co/150x150/${color}/ffffff?text=${memberName}`;
}
</script>

<style scoped>
.profile-section {
    max-width: 1000px;
    margin: 0 auto;
    padding: 40px 20px;
    animation: fadeIn 0.5s ease;
}

.back-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    margin-bottom: 30px;
    transition: all 0.3s ease;
}

.back-btn:hover {
    background: #e67e22;
    transform: translateX(-5px);
}

.profile-container {
    background: var(--card-bg);
    border-radius: 30px;
    overflow: hidden;
    box-shadow: var(--shadow);
}

.profile-header {
    position: relative;
    height: 280px;
    overflow: hidden;
}

.profile-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.emoji-cover {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 5rem;
}

.profile-cover-gradient {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 150px;
    background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
}

.profile-avatar-container {
    position: absolute;
    bottom: -60px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
}

.profile-avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 6px solid white;
    object-fit: cover;
    box-shadow: var(--shadow);
}

.emoji-avatar-large {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
}

.profile-body {
    padding: 80px 40px 40px;
    text-align: center;
}

.profile-name {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 8px;
}

.profile-role {
    color: var(--text-light);
    font-size: 1.1rem;
    margin-bottom: 25px;
}

.profile-stats {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-bottom: 30px;
    flex-wrap: wrap;
}

.stat {
    text-align: center;
}

.stat-value {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--primary);
}

.stat-label {
    color: var(--text-light);
    font-size: 0.9rem;
}

.profile-bio {
    max-width: 600px;
    margin: 0 auto 30px;
    line-height: 1.8;
    color: var(--text-light);
    font-size: 1.05rem;
}

.profile-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    max-width: 600px;
    margin: 0 auto 30px;
    text-align: left;
}

.traits-container {
    margin-top: 30px;
}

@media (max-width: 768px) {
    .profile-body {
        padding: 70px 20px 30px;
    }

    .profile-name {
        font-size: 1.6rem;
    }

    .profile-stats {
        gap: 20px;
    }
    
    .profile-header {
        height: 220px;
    }
}
</style>
