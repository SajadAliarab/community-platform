<script setup lang="ts">
import type { Category } from '~/models/CategoryModel';
import type { Topic } from '~/models/TopicModel';
import { getCategoriesBySlug } from '~/services/CategoryService';
import { getTopicsByCategoryId } from '~/services/TopicService';

const route = useRoute();
const categorySlug = route.params.slug as string;
const category = ref<Category | null>(null);
const children = ref<Category[]>([]);
const topics = ref<Topic[]>([]);
const loading = ref(true);

const getTopics = async (categoryId: number) => {
    if (category.value) {
        const res = await getTopicsByCategoryId(category.value.id);
        try {
            if (res.status === 200) {
                const data = await res.json();
                topics.value = data.data;
            } else {
                console.error('Error fetching topics:', res.statusText);
            }
        } catch (error) {
            console.error('Error fetching topics:', error);
        }
    }
}
const getCategories = async () => {
    if (categorySlug) {
        const res = await getCategoriesBySlug(categorySlug);
        try {
            if (res.status === 200) {
                const data = await res.json();
                category.value = Array.isArray(data.data) ? data.data[0] : data.data;
                if (category.value?.children && Array.isArray(category.value.children) && category.value.children.length > 0) {
                    children.value = category.value.children;
                } else {
                    children.value = [];

                    if (category.value && category.value.id) {
                        await getTopics(category.value.id);
                    }
                }
            } else {
                console.error('Error fetching categories:', res.statusText);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }
}
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};

const truncateContent = (content: string, length = 150) => {
    return content.length > length ? content.slice(0, length) + '...' : content;
};

getCategories();

</script>
<template>
    <UContainer class="mt-4">
        <div v-if="children.length > 0">
            <h1 class="text-2xl font-bold mb-4">Categories</h1>
            <div class="flex flex-wrap gap-4">
                <UCard v-for="category in children" :key="category.id" class="mb-4 flex-1 basis-1/2 md:basis-1">
                    <ULink :to="'/categories/' + category.slug">
                        <div class="w-full aspect-video mb-2 rounded-md overflow-hidden">
                            <img :src="`https:coapi.sajad.uk/storage/${category.image}`" alt="Category Image"
                                class="w-full h-48 object-cover" />
                        </div>
                        <h2 class="text-lg font-semibold">{{ category.name }}</h2>
                        <p>{{ category.description }}</p>
                    </ULink>
                </UCard>
            </div>
        </div>
        <div v-else>
            <h1 class="text-2xl font-bold mb-4">Topics</h1>
            <div class="flex flex-col">
                <UCard v-for="topic in topics" :key="topic.id" class="flex-1 basis-1/2 md:basis-1 relative">
                    <ULink :to="'/topics/' + topic.id" class="block h-full">
                        <div class=" h-full flex flex-col justify-between">
                            <div>
                                <h2 class="text-lg font-bold mb-2">{{ topic.title }}</h2>
                                <p class="mb-2">{{ truncateContent(topic.content, 150) }}</p>
                            </div>
                            <p class="text-sm text-gray-500 absolute bottom-2 right-4">
                                Created at: {{ formatDate(topic.created_at) }}
                            </p>
                        </div>
                    </ULink>
                    </UCard>
            </div>
        </div>
    </UContainer>
</template>