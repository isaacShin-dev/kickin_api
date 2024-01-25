<script setup lang="ts">
const props = defineProps({
  titles: {
  type: Array,
  required: true,
  },
});

const titleAnchor = (title: string) => {
  return '/#'+title;
};

</script>

<template>
    <v-navigation-drawer location="right"
                         mobile-breakpoint="lg"
                         :width="255"
                         floating
    >
        <v-list :lines="false"
                density="compact">
                <span class="text-overline ml-2">
                        <v-icon>mdi-format-list-bulleted</v-icon>
                    TABLE OF CONTENTS
                </span>
            <p class="text-caption ml-6 my-2 pointer"
                v-for="title in titles"
                :key="title"

            ><a :href="titleAnchor(title)">{{ title }}</a></p>

        </v-list>
    </v-navigation-drawer>
</template>

<style scoped>
a{
    text-decoration: none;
    color: inherit;
}
.pointer{
    cursor: pointer;
}
.pointer:hover{
    color: #979595;
}
</style>