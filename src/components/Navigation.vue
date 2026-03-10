<template>
    <nav class="navigation">
        <div class="nav-container">
            <div class="logo" @click="$emit('navigate', 'home')">
                🏠 我们的家
            </div>
            <div class="nav-links">
                <button
                    v-for="item in navItems"
                    :key="item.id"
                    class="nav-btn"
                    :class="{ active: currentSection === item.id }"
                    @click="$emit('navigate', item.id)"
                >
                    {{ item.label }}
                </button>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { navItems } from '../data/members.js';

defineProps({
    currentSection: {
        type: String,
        default: 'home'
    }
});

defineEmits(['navigate']);
</script>

<style scoped>
.navigation {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 15px 0;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary);
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.logo:hover {
    transform: scale(1.05);
}

.nav-links {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
}

.nav-btn {
    padding: 10px 20px;
    border: none;
    background: transparent;
    color: var(--text-light);
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    border-radius: 25px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 6px;
}

.nav-btn:hover,
.nav-btn.active {
    background: var(--primary);
    color: white;
    transform: translateY(-2px);
}

@media (max-width: 768px) {
    .nav-links {
        gap: 5px;
    }

    .nav-btn {
        padding: 8px 14px;
        font-size: 0.85rem;
    }
    
    .logo {
        font-size: 1.2rem;
    }
}
</style>
