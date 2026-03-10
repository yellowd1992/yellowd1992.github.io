<template>
    <div class="app">
        <Navigation 
            :current-section="currentSection"
            @navigate="navigateTo"
        />
        
        <main>
            <HomeSection
                v-if="currentSection === 'home'"
                @navigate="navigateTo"
            />
            
            <ProfileSection
                v-else
                :member="currentMember"
                @navigate="navigateTo"
                @open-image="openLightbox"
            />
        </main>
        
        <Footer />
        
        <Lightbox
            :is-open="lightboxOpen"
            :image-src="lightboxImage"
            @close="closeLightbox"
        />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { members } from './data/members.js';
import Navigation from './components/Navigation.vue';
import HomeSection from './components/HomeSection.vue';
import ProfileSection from './components/ProfileSection.vue';
import Footer from './components/Footer.vue';
import Lightbox from './components/Lightbox.vue';

const currentSection = ref('home');
const lightboxOpen = ref(false);
const lightboxImage = ref('');

const currentMember = computed(() => members[currentSection.value]);

function navigateTo(sectionId) {
    currentSection.value = sectionId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openLightbox(imageSrc) {
    lightboxImage.value = imageSrc;
    lightboxOpen.value = true;
}

function closeLightbox() {
    lightboxOpen.value = false;
}
</script>

<style scoped>
.app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

main {
    padding-top: 80px;
    flex: 1;
}
</style>
